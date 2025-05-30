'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, GraduationCap } from 'lucide-react';
import { toast } from "sonner";
import { CreateSectionFormData, CreateSectionSchema } from '@/utils/createSection';
import { get } from 'http';

type sectionSchema = {
    studentCount: number;
};

const CreateSection = () => {

  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [studentCount, setStudentCount] = useState<number>(0);
  const [academicYear, setAcademicYear] = useState<{ id: string; name: string }>({ id: '', name: '' });
  const [numberOfSection, setNumberOfSection] = useState<number>(1);
  const [sections, setSections] = useState<sectionSchema[]>([]);
  
  
  const departmentId = 1

  const getStudentCount = async ()=>{
    try {
      // Simulate API call to get student count
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/students/count/by-department-section?departmentId=${departmentId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch student count');
      }
      const data = await response.json();
        if (!data || typeof data.count !== 'number') {
            throw new Error('Invalid response format');
        }
        
        return data.count;
    } catch (error) {
      console.error('Error fetching student count:', error);
      return 0; // Fallback to 0 if there's an error
    }

  }

  const getAcademicYear = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/academicyears/current-year`);
        if (!res.ok) {
            throw new Error('Failed to fetch academic year');
        }
        const data = await res.json();
        if (!data || typeof data.name !== 'string') {
            throw new Error('Invalid response format');
        }
        return data;
    } catch (error) {
        console.error('Error fetching academic year:', error);
        return ''; // Fallback to empty string if there's an error
    }
  };


  useEffect(() => {
    const fetchAcademicYear = async () => {
      const res = await getAcademicYear();
      if (res) {
        setAcademicYear(res);
        setFormData(prev => ({ ...prev, academicYear: res }));
      }
    };
   
    const fetchStudentCount = async () => {
      const res = await getStudentCount();
      if (res) {
        setStudentCount(res);
      }
    };
    fetchAcademicYear();
    fetchStudentCount();
  }, []);


  const [formData, setFormData] = useState<CreateSectionFormData>({
     academicYearId: academicYear.id,
     departmentId: 1,
     numberOfSection: 2
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'numberOfSection') {
      let numValue = Number(value);
      if (isNaN(numValue) || value === '') numValue = 1;
      setNumberOfSection(numValue);
      setFormData(prev => ({ ...prev, [name]: numValue }));

      if (numValue && studentCount > 0) {
        const n = numValue;
        if (n > 0) {
          const base = Math.floor(studentCount / n);
          const remainder = studentCount % n;
          const newSections: sectionSchema[] = Array.from({ length: n }, (_, idx) => ({
            studentCount: idx < remainder ? base + 1 : base
          }));
          setSections(newSections);
        } else {
          setSections([]);
        }
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = CreateSectionSchema.safeParse(formData);
    if (!parsed.success) {
      const filledErrors: Record<string, string> = {};
      parsed.error.errors.forEach(error => {
        filledErrors[error.path[0] as string] = error.message;
      });
      setErrors(filledErrors);
      return;
    }

    setIsLoading(true);
    
    try {
      const res  = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/sections/`, {
               method:"POST",
               body: JSON.stringify(formData),
               headers:{
                  'Content-Type': 'application/json'
               },
      })

      if(res){
      
      toast("Section Year Created",{
        description: "The section has been created successfully!",
      });
      
      setFormData({
        academicYearId: academicYear.id,
        departmentId: 1,
      });
    }
}
     catch (error) {
      toast("Error", {
        description: "Something went wrong. Please try again.",
        style: {
          backgroundColor: '#f8d7da',
          color: '#721c24',
          borderColor: '#f5c6cb',
        },
      });
    } finally {
      setIsLoading(false);
    }
  }


  const handleCheck = () => {
    const parsed = CreateSectionSchema.safeParse(formData);
    if (!parsed.success) {
      const filledErrors: Record<string, string> = {};
      parsed.error.errors.forEach(error => {
        filledErrors[error.path[0] as string] = error.message;
      });
      setErrors(filledErrors);
      return;
    }
    setAcademicYear(prev => ({ ...prev, id: formData.academicYearId }));
    setNumberOfSection(formData.numberOfSection ?? 1);
    const n = Number(formData.numberOfSection ?? 1);
    if (n > 0) {
      const base = Math.floor(studentCount / n);
      const remainder = studentCount % n;
      const fetchedSections: sectionSchema[] = Array.from({ length: n }, (_, idx) => ({
        studentCount: idx < remainder ? base + 1 : base
      }));
      setSections(fetchedSections);
    } else {
      setSections([]);
    }
  };

  return (
    <div className="min-h-screen w-full  bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-7xl mx-auto">
        <Card className="shadow-xl">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Create New Section </CardTitle>
            <CardDescription>
              Set up a new section within the academic year
            </CardDescription>
          </CardHeader>

            <CardContent className="px-6 flex flex-col items-center justify-center  py-4">
                <p className="text-sm text-gray-600 mb-4">
                   please fill out the form below and create an equal number of students for the section.
                </p>

                <p className="text-md text-gray-600 mb-4">
                  Total Students: <span className="font-semibold">{studentCount}</span>
                </p>
                <p className="text-xl text-gray-600 mb-4">
                  Academic Year <span className="font-semibold">{academicYear.name}</span>
                </p>
            </CardContent>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-8">
           
              <div className="space-y-4">

                <div className="flex items-center justify-center  gap-4">
                    <div className="space-y-2">
                    <Label htmlFor="numberOfSection" className="text-sm font-medium">
                      Number of Section <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="numberOfSection"
                      name="numberOfSection"
                      type="number"
                      placeholder="1"
                      value={formData.numberOfSection ?? 1}
                      onChange={handleChange}
                      className={errors.numberOfSection ? "border-red-500" : ""}
                      min={1}
                      max={20}
                    />
                    {errors.numberOfSection && (
                      <p className="text-red-500 text-sm">{errors.numberOfSection}</p>
                    )}
                  </div>

                   <Button onClick={handleCheck} className="space-y-2 flex items-center justify-center">
                          Check 
                    </Button>

                </div>
              </div>

               {sections.length > 0 && (
                <div className="space-y-4 mt-6">
                  <h3 className="text-lg font-semibold">Generated Sections</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sections.map((section, index) => (
                      <div key={index} className="p-4 bg-white rounded-lg shadow">
                        <h4 className="text-md font-medium">Section {index + 1}</h4>
                        <p className="text-sm text-gray-600">Student Count: {section.studentCount}</p>
                      </div>
                    ))}
                  </div>
                </div>
               )
            }
            
              <div className="flex justify-end gap-4 pt-6">
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="min-w-[120px]"
                >
                  {isLoading ? "Creating..." : "Create Section"}
                </Button>
              </div>
            </CardContent>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default CreateSection;