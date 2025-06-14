'use client';

import { useStudentFormStore } from '@/lib/store/studentFormStore';
import { StudentFullInfo } from '@/utils/typeSchema';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { FullInfo } from '@/utils/typeSchema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const initialPersonalInfo: StudentFullInfo = {
  student_id: '',
  student_temp_id: '',
  firstName: '',
  fatherName: '',
  grandFather_Name: '',
  sex: 'M',
  currentLevel:'',
  currentYear: '',
  currentSemester: '',
  nationality: '',
  phone_Number: '',
  email: '',
  place_of_birth_town: '',
  place_of_birth_zone: '',
  place_of_birth_region: '',
  date_of_birth: '',
  address_kebele: '',
  address_woreda: '',
  address_zone: '',
  address_region: '',
  address_town: '',
  phone_home: '',
  phone_mobile: '',
  phone_office: '',
  department_id: '',
  program_id: '',
  admission_type_id: '',
  registration_date: '',
  MaritalStatus: 'SINGLE'
};

export default function PersonalInfoForm({ nextStep }: { nextStep: () => void }) {
  const { personalInfo, setPersonalInfo } = useStudentFormStore();
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    async function fetchStudentData() {
      const userMainId = typeof window !== 'undefined' ? localStorage.getItem('userMainId') : null;
      if (!userMainId) return;
      try {
        // Get JWT token from cookies if available
        const token = typeof document !== 'undefined' ? document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1] : undefined;
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/main-id`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ mainId: userMainId }),
        });
        if (!res.ok) return;
        const data = await res.json();
        if (data) {
          setPersonalInfo({
            ...personalInfo,
            firstName: data.firstName || personalInfo.firstName || '',
            fatherName: data.middleName || personalInfo.fatherName || '',
            grandFather_Name: data.lastName || personalInfo.grandFather_Name || '',
            student_id: data.userMainId || personalInfo.student_id || '',
            student_temp_id: data.student_temp_id || personalInfo.student_temp_id || '',
            department_id: data.department_id || personalInfo.department_id || '',
            program_id: data.program_id || personalInfo.program_id || '',
            admission_type_id: data.admission_type_id || personalInfo.admission_type_id || '',
            registration_date: data.registration_date || personalInfo.registration_date || '',
            currentLevel: data.currentLevel || personalInfo.currentLevel || '',
            currentYear: data.currentYear || personalInfo.currentYear || '',
            currentSemester: data.currentSemester || personalInfo.currentSemester || '',
            email: data.email || personalInfo.email || '',
            phone_mobile: data.phoneNumber || personalInfo.phone_mobile || '',
            nationality: data.nationality || personalInfo.nationality || '',
            sex: data.gender || personalInfo.sex || '', 
            date_of_birth: data.date_of_birth || personalInfo.date_of_birth || '',
          });
        }
      } catch (err) {
        // Optionally handle error
      }
    }
    fetchStudentData();
  }, [setPersonalInfo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      FullInfo.parse(personalInfo);
      setErrors({});
      nextStep();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path.length > 0) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPersonalInfo({ ...personalInfo, [name]: value });
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const getValue = (field: keyof StudentFullInfo) => personalInfo[field] || '';

  const getInputClassName = (fieldName: string, hasError: boolean = false) => {
    const baseClasses = "w-full transition-colors duration-200";
    const errorClasses = hasError ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500";
    return `${baseClasses} ${errorClasses}`;
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
          <p className="text-gray-600">Please fill in your personal details. Fields marked with <span className="text-red-500">*</span> are required.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Student ID and Registration Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="student_id">Student ID</Label>
              <Input
                id="student_id"
                name="student_id"
                value={getValue('student_id')}
                readOnly
                className="bg-gray-50"
              />
            </div>
            <div className="space-ygetValue-2">
              <Label htmlFor="registration_date">Registration Date</Label>
              <Input
                id="registration_date"
                type="date"
                name="registration_date"
                value={getValue('registration_date')}
                readOnly
                className="bg-gray-50"
              />
            </div>
          </div>

          {/* Personal Information Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">
                  First Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={getValue('firstName')}
                   className='bg-gray-50'
                  readOnly
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="fatherName">Father's Name  <span className="text-red-500">*</span></Label>
                <Input
                  id="fatherName"
                  name="fatherName"
                  value={getValue('fatherName')}
                  className='bg-gray-50'
                  readOnly
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="grandFather_Name">
                  Grandfather's Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="grandFather_Name"
                  name="grandFather_Name"
                  value={getValue('grandFather_Name')}
                  className='bg-gray-50'
                  readOnly
                />
                {errors.grandFather_Name && (
                  <p className="text-red-500 text-sm mt-1">{errors.grandFather_Name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="sex">
                  Sex <span className="text-red-500">*</span>
                </Label>
                <select
                  id="sex"
                  name="sex"
                  value={getValue('sex')}
                  onChange={handleChange}
                  className={`${getInputClassName('sex')} h-10 px-3 py-2 border rounded-md focus:outline-none focus:ring-2`}
                >
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nationality">
                  Nationality <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="nationality"
                  name="nationality"
                  value={getValue('nationality')}
                  onChange={handleChange}
                  className={getInputClassName('nationality', !!errors.nationality)}
                  placeholder="Enter nationality"
                />
                {errors.nationality && <p className="text-red-500 text-sm mt-1">{errors.nationality}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="date_of_birth">
                  Date of Birth <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="date_of_birth"
                  type="date"
                  name="date_of_birth"
                  value={getValue('date_of_birth')}
                  onChange={handleChange}
                  className={getInputClassName('date_of_birth', !!errors.date_of_birth)}
                />
                {errors.date_of_birth && <p className="text-red-500 text-sm mt-1">{errors.date_of_birth}</p>}
              </div>
            </div>
          </div>

          {/* Place of Birth Section */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Place of Birth</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="place_of_birth_town">Town</Label>
                <Input
                  id="place_of_birth_town"
                  name="place_of_birth_town"
                  value={getValue('place_of_birth_town')}
                  onChange={handleChange}
                  placeholder="Enter town"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="place_of_birth_zone">Zone</Label>
                <Input
                  id="place_of_birth_zone"
                  name="place_of_birth_zone"
                  value={getValue('place_of_birth_zone')}
                  onChange={handleChange}
                  placeholder="Enter zone"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="place_of_birth_region">Region</Label>
                <Input
                  id="place_of_birth_region"
                  name="place_of_birth_region"
                  value={getValue('place_of_birth_region')}
                  onChange={handleChange}
                  placeholder="Enter region"
                />
              </div>
            </div>
          </div>

          {/* Address Information Section */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Current Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="address_kebele">Kebele</Label>
                <Input
                  id="address_kebele"
                  name="address_kebele"
                  value={getValue("address_kebele")}
                  onChange={handleChange}
                  placeholder="Enter kebele"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address_woreda">Woreda</Label>
                <Input
                  id="address_woreda"
                  name="address_woreda"
                  value={getValue("address_woreda")}
                  onChange={handleChange}
                  placeholder="Enter woreda"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address_zone">Zone</Label>
                <Input
                  id="address_zone"
                  name="address_zone"
                  value={getValue("address_zone")}
                  onChange={handleChange}
                  placeholder="Enter zone"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address_region">Region</Label>
                <Input
                  id="address_region"
                  name="address_region"
                  value={getValue("address_region")}
                  onChange={handleChange}
                  placeholder="Enter region"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address_town">Town</Label>
                <Input
                  id="address_town"
                  name="address_town"
                  value={getValue("address_town")}
                  onChange={handleChange}
                  placeholder="Enter town"
                />
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg border border-orange-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="phone_mobile">
                  Mobile Phone <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone_mobile"
                  type="tel"
                  name="phone_mobile"
                  value={getValue('phone_mobile')}
                  onChange={handleChange}
                  className={getInputClassName('phone_mobile', !!errors.phone_mobile)}
                  placeholder="Enter mobile number"
                />
                {errors.phone_mobile && <p className="text-red-500 text-sm mt-1">{errors.phone_mobile}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone_home">Home Phone</Label>
                <Input
                  id="phone_home"
                  type="tel"
                  name="phone_home"
                  value={getValue('phone_home')}
                  onChange={handleChange}
                  placeholder="Enter home phone"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={getValue('email')}
                  onChange={handleChange}
                  className={getInputClassName('email', !!errors.email)}
                  placeholder="Enter email address"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
            </div>
          </div>

          {/* Academic Information Section */}
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 rounded-lg border border-cyan-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Academic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="department_id">
                  Department <span className="text-red-500">*</span>
                </Label>
                  <Input
                  id="department_id"
                  name="department_id"
                  value={getValue('department_id')}
                  readOnly
                  className='bg-gray-50'
                  />

                {  /* <select
                  id="department_id"
                  name="department_id"
                  value={getValue('department_id')}
                  onChange={handleChange}
                  className={`${getInputClassName('department_id', !!errors.department_id)} h-10 px-3 py-2 border rounded-md focus:outline-none focus:ring-2`}
                >
                  <option value="">Select Department</option>
                  <option value="animal_health">Animal Health</option>
                  <option value="animal_production">Animal Production</option>
                  <option value="crop_production">Crop Production</option>
                  <option value="cooperative_accounting">Cooperative Accounting</option>
                  <option value="crop_protection">Crop Protection</option>
                  <option value="natural_resources">Natural Resources Conservation</option>
                </select> */}
                {errors.department_id && <p className="text-red-500 text-sm mt-1">{errors.department_id}</p>}
              </div>
              {/* <div className="space-y-2">
                <Label htmlFor="program_id">
                  Program ID <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="program_id"
                  name="program_id"
                  value={getValue('program_id')}
                  onChange={handleChange}
                  className={getInputClassName('program_id', !!errors.program_id)}
                  placeholder="Enter program ID"
                />
                {errors.program_id && <p className="text-red-500 text-sm mt-1">{errors.program_id}</p>}
              </div> */}
              <div className="space-y-2">
                <Label htmlFor="admission_type_id">
                  Admission Type <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="admission_type_id"
                  name="admission_type_id"
                  value={getValue('admission_type_id')}
                  readOnly
                  className='bg-gray-50'
                  // onChange={handleChange}
                  // className={getInputClassName('admission_type_id', !!errors.admission_type_id)}
                  // placeholder="Enter admission type"
                />
                {errors.admission_type_id && <p className="text-red-500 text-sm mt-1">{errors.admission_type_id}</p>}
              </div>
            </div>
          </div>

          {/* Marital Status Section */}
          <div className="bg-gradient-to-r from-gray-50 to-slate-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Status</h3>
            <div className="space-y-2 max-w-md">
              <Label htmlFor="MaritalStatus">
                Marital Status <span className="text-red-500">*</span>
              </Label>
              <select
                id="MaritalStatus"
                name="MaritalStatus"
                value={getValue('MaritalStatus')}
                onChange={handleChange}
                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="SINGLE">Single</option>
                <option value="MARRIED">Married</option>
                <option value="DIVORCED">Divorced</option>
                <option value="WIDOWED">Widowed</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between items-center pt-6 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              Step 1 of 5: Personal Information
            </div>
            <Button
              type="submit"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
            >
              Next Step →
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
