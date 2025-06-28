"use client";

import { useStudentFormStore } from "@/lib/store/studentFormStore";
import { StudentFullInfo } from "@/utils/typeSchema";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { FullInfo } from "@/utils/typeSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { getLocalStorage } from "@/utils/localStorage";
import Image from "next/image";

const initialPersonalInfo: StudentFullInfo = {
  student_id: 0,
  student_temp_id: "",
  firstName: "",
  fatherName: "",
  grandFather_Name: "",
  sex: "M",
  currentLevel: "",
  currentYear: "",
  currentSemester: "",
  nationality: "",
  phone_Number: "",
  email: "",
  place_of_birth_town: "",
  place_of_birth_zone: "",
  place_of_birth_region: "",
  date_of_birth: "",
  address_kebele: "",
  address_woreda: "",
  address_zone: "",
  address_region: "",
  address_town: "",
  phone_home: "",
  phone_mobile: "",
  phone_office: "",
  department_id: 1,
  // program_id: 1,
  admission_type_id: 1,
  // registration_date: '',
  MaritalStatus: "SINGLE",
  profilePicture: undefined,
};

interface FileUploadState {
  profilePicture: File | null;
}

export default function PersonalInfoForm({
  nextStep,
}: {
  nextStep: () => void;
}) {
  const { personalInfo, setPersonalInfo } = useStudentFormStore();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [departmentName, setDepartmentName] = useState<any>({});
  const [admissionTypeName, setAdmissionTypeName] = useState("regular");
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [files, setFiles] = useState<FileUploadState>({
    profilePicture: null,
  });
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function fetchAndFillStudentInfo() {
      setLoading(true);
      setFetchError(null);
      const userMainId = getLocalStorage("userMainId");
      if (!userMainId) {
        setFetchError("No userMainId found in localStorage.");
        setLoading(false);
        return;
      }
      try {
        // 1. Fetch admission type (REGULAR)
        const admissionTypeRes = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/admission-types`
        );
        if (!admissionTypeRes.ok)
          throw new Error("Failed to fetch admission types");
        const admissionTypes = await admissionTypeRes.json();
        const admissionType = admissionTypes.find(
          (type: any) => type.admission_type_id === "REGULAR"
        );
        let admissionTypeId = 1;
        if (admissionType) {
          setAdmissionTypeName(admissionType.name || "");
          admissionTypeId = admissionType.admission_type_id;
        }

  
        const departmentRes = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/tempstudents/student-main-id`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ studentMainId: userMainId }),
          }
        );
        if (!departmentRes.ok)
          throw new Error("Failed to fetch department information");

        const departmentData = await departmentRes.json();

        if (departmentData) {
          setDepartmentName(departmentData.department);
        }

        console.log("dn", departmentName);

        // 3. Fetch user info (main personal info)
        const userRes = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/users/main-id`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mainId: userMainId }),
          }
        );
        if (!userRes.ok) throw new Error("Failed to fetch user info");
        const userData = await userRes.json();
        setPersonalInfo({
          ...initialPersonalInfo,
          admission_type_id: admissionTypeId,
          student_temp_id: departmentData.id || "",
          department_id: departmentData.departmentId || 1,
          firstName: userData?.firstName || "",
          fatherName: userData?.middleName || "",
          grandFather_Name: userData?.lastName || "",
          student_id: userData?.userMainId || "",
          // program_id: userData?.program_id || '',
          // registration_date: userData?.registration_date || new Date().toISOString(),
          currentLevel: userData?.currentLevel || "1", // Default value
          currentYear: "1",
          //userData?.currentYear || new Date().getFullYear().toString(),
          currentSemester: "1",
          email: userData?.email || "",
          phone_mobile: userData?.phoneNumber || "",
          nationality: userData?.nationality || "",
          sex: userData?.gender || "M",
          date_of_birth: userData?.date_of_birth || "",
        });
      } catch (err: any) {
        setFetchError(err.message || "Failed to fetch student info");
      } finally {
        setLoading(false);
      }
    }
    fetchAndFillStudentInfo();
  }, [setPersonalInfo]);

  console.log("dn", departmentName);
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fileKey: keyof FileUploadState
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (fileKey === "profilePicture") {
        // Validate image file
        if (!file.type.startsWith("image/")) {
          toast.error("Please upload an image file");
          return;
        }
        // Create preview URL
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      } else {
        // Validate PDF for other files
        if (file.type !== "application/pdf") {
          toast.error("Please upload PDF files only");
          return;
        }
      }

      setFiles((prev) => ({
        ...prev,
        [fileKey]: file,
      }));
    }
  };

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Validate image file
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          profilePicture: "Please upload an image file",
        }));
        return;
      }

      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      // Update personalInfo with the file
      setPersonalInfo({
        ...personalInfo,
        profilePicture: file,
      });

      // Clear any previous errors
      if (errors.profilePicture) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.profilePicture;
          return newErrors;
        });
      }
    }
  };

  const handleProfilePictureClick = () => {
    fileInputRef.current?.click();
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("1. Form submission started");
    console.log("2. Current personal info:", personalInfo);

    try {
      console.log("3. Entering try block");
      console.log("4. About to validate with FullInfo schema");
      const validatedData = FullInfo.parse(personalInfo);
      console.log("5. Schema validation passed:", validatedData);

      console.log("6. Setting errors to empty");
      setErrors({});

      console.log("7. About to call nextStep");
      nextStep();
      console.log("8. nextStep called");
    } catch (error) {
      console.error("9. Error caught:", error);
      if (error instanceof z.ZodError) {
        console.log("10. Zod validation error");
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          console.log("11. Processing error:", err);
          if (err.path.length > 0) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        console.log("12. Setting validation errors:", newErrors);
        setErrors(newErrors);
      } else {
        console.error("13. Non-Zod error:", error);
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPersonalInfo({ ...personalInfo, [name]: value });
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const getValue = (field: keyof StudentFullInfo) => {
    const value = personalInfo[field];
    // If the value is a File object, return empty string for input value
    if (value instanceof File) {
      return "";
    }
    return value || "";
  };

  const getInputClassName = (fieldName: string, hasError: boolean = false) => {
    const baseClasses = "w-full transition-colors duration-200";
    const errorClasses = hasError
      ? "border-red-500 focus:ring-red-500"
      : "border-gray-300 focus:ring-blue-500";
    return `${baseClasses} ${errorClasses}`;
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Personal Information
          </h2>
          <p className="text-gray-600">
            Please fill in your personal details. Fields marked with{" "}
            <span className="text-red-500">*</span> are required.
          </p>
          {loading && (
            <div className="text-blue-600 mt-2">Loading student info...</div>
          )}
          {fetchError && <div className="text-red-600 mt-2">{fetchError}</div>}
        </div>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Profile Picture Upload Section */}
          <div className="flex flex-col items-center space-y-4 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Profile Picture
            </h3>
            <div
              className="relative w-40 h-40 rounded-full overflow-hidden cursor-pointer border-4 border-white shadow-lg hover:opacity-90 transition-opacity"
              onClick={handleProfilePictureClick}
            >
              {previewUrl || personalInfo.profilePicture ? (
                <Image
                  src={
                    previewUrl ||
                    URL.createObjectURL(personalInfo.profilePicture as File)
                  }
                  alt="Profile Preview"
                  fill
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
              className="hidden"
            />
            <p className="text-sm text-gray-600">
              Click to upload profile picture (JPG, PNG)
            </p>
            {errors.profilePicture && (
              <p className="text-sm text-red-600">{errors.profilePicture}</p>
            )}
          </div>
          {/* Student ID and Registration Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="student_id">Student ID</Label>
              <Input
                id="student_id"
                name="student_id"
                value={getValue("student_id")}
                readOnly
                className="bg-gray-50"
              />
            </div>
            {/* <div className="space-yGetValue-2">
              <Label htmlFor="registration_date">Registration Date</Label>
              <Input
                id="registration_date"
                type="date"
                name="registration_date"
                value={getValue('registration_date')}
                readOnly
                className="bg-gray-50"
              />
            </div> */}
          </div>

          {/* Personal Information Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">
                  First Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={getValue("firstName")}
                  className="bg-gray-50"
                  readOnly
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="fatherName">
                  Father's Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fatherName"
                  name="fatherName"
                  value={getValue("fatherName")}
                  className="bg-gray-50"
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
                  value={getValue("grandFather_Name")}
                  className="bg-gray-50"
                  readOnly
                />
                {errors.grandFather_Name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.grandFather_Name}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="sex">
                  Sex <span className="text-red-500">*</span>
                </Label>
                <select
                  id="sex"
                  name="sex"
                  value={getValue("sex")}
                  onChange={handleChange}
                  className={`${getInputClassName(
                    "sex"
                  )} h-10 px-3 py-2 border rounded-md focus:outline-none focus:ring-2`}
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
                  value={getValue("nationality")}
                  onChange={handleChange}
                  className={getInputClassName(
                    "nationality",
                    !!errors.nationality
                  )}
                  placeholder="Enter nationality"
                />
                {errors.nationality && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.nationality}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="date_of_birth">
                  Date of Birth <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="date_of_birth"
                  type="date"
                  name="date_of_birth"
                  value={getValue("date_of_birth")}
                  onChange={handleChange}
                  className={getInputClassName(
                    "date_of_birth",
                    !!errors.date_of_birth
                  )}
                />
                {errors.date_of_birth && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.date_of_birth}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Place of Birth Section */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Place of Birth
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="place_of_birth_town">Town</Label>
                <Input
                  id="place_of_birth_town"
                  name="place_of_birth_town"
                  value={getValue("place_of_birth_town")}
                  onChange={handleChange}
                  placeholder="Enter town"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="place_of_birth_zone">Zone</Label>
                <Input
                  id="place_of_birth_zone"
                  name="place_of_birth_zone"
                  value={getValue("place_of_birth_zone")}
                  onChange={handleChange}
                  placeholder="Enter zone"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="place_of_birth_region">Region</Label>
                <Input
                  id="place_of_birth_region"
                  name="place_of_birth_region"
                  value={getValue("place_of_birth_region")}
                  onChange={handleChange}
                  placeholder="Enter region"
                />
              </div>
            </div>
          </div>

          {/* Address Information Section */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Current Address
            </h3>
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
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="phone_mobile">
                  Mobile Phone <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone_mobile"
                  type="tel"
                  name="phone_mobile"
                  value={getValue("phone_mobile")}
                  onChange={handleChange}
                  className={getInputClassName(
                    "phone_mobile",
                    !!errors.phone_mobile
                  )}
                  placeholder="Enter mobile number"
                />
                {errors.phone_mobile && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone_mobile}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone_home">Home Phone</Label>
                <Input
                  id="phone_home"
                  type="tel"
                  name="phone_home"
                  value={getValue("phone_home")}
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
                  value={getValue("email")}
                  onChange={handleChange}
                  className={getInputClassName("email", !!errors.email)}
                  placeholder="Enter email address"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
            </div>
          </div>

          {/* Academic Information Section */}
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 rounded-lg border border-cyan-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Academic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="department_id">
                  Department <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="department_id"
                  name="department_id"
                  value={departmentName.name}
                  readOnly
                  className="bg-gray-50"
                />
                <input
                  type="hidden"
                  name="department_id"
                  value={getValue("department_id")}
                />
                {errors.department_id && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.department_id}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="admission_type_id">
                  Admission Type <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="admission_type_id"
                  name="admission_type_id"
                  value={admissionTypeName || getValue("admission_type_id")}
                  readOnly
                  className="bg-gray-50"
                />
                <input
                  type="hidden"
                  name="admission_type_id"
                  value={getValue("admission_type_id")}
                />
                {errors.admission_type_id && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.admission_type_id}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Marital Status Section */}
          <div className="bg-gradient-to-r from-gray-50 to-slate-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Personal Status
            </h3>
            <div className="space-y-2 max-w-md">
              <Label htmlFor="MaritalStatus">
                Marital Status <span className="text-red-500">*</span>
              </Label>
              <select
                id="MaritalStatus"
                name="MaritalStatus"
                value={getValue("MaritalStatus")}
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
