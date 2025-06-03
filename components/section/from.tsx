'use client';

import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, GraduationCap } from 'lucide-react';
import { CreateSectionFormData, CreateSectionSchema } from '@/utils/createSection';
import { useDepartment } from '@/lib/react-query/hooks/useDepartment';
import { useGetSection } from '@/lib/react-query/hooks/useAcademicYear';
import { useCreateSection } from '@/lib/react-query/mutations/Section';
 
type sectionSchema = {
    studentCount: number;
};

  const departmentId = 1


const CreateSection = () => {

  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [numberOfSection, setNumberOfSection] = useState<number>(1);
  const [sections, setSections] = useState<sectionSchema[]>([]);
  
  
const {data: academicYear, isLoading: isAcademicYearLoading} = useGetSection();
const {data: studentCount, isLoading: isStudentCountLoading } = useDepartment(departmentId);

  const {mutate: createSectionMutation, isPending: isCreatingSection} = useCreateSection();


  const [formData, setFormData] = useState<CreateSectionFormData>({
     academicYearId: academicYear?.id || '',
     departmentId: 1,
     numberOfSection: 2
  });

  useEffect(() => {
    if (academicYear?.id) {
      setFormData(prev => ({ ...prev, academicYearId: academicYear.id }));
    }
  }, [academicYear]);


  useEffect(() => {
    if (studentCount > 0 && numberOfSection > 0) {
      const n = numberOfSection;
      const base = Math.floor(studentCount / n);
      const remainder = studentCount % n;
      const newSections: sectionSchema[] = Array.from({ length: n }, (_, idx) => ({
        studentCount: idx < remainder ? base + 1 : base
      }));
      setSections(newSections);
    } else {
      setSections([]);
    }
  }, [studentCount, numberOfSection]);



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'numberOfSection') {
      const numValue = Math.max(1, Number(value) || 1);
      setNumberOfSection(numValue);
      setFormData(prev => ({ ...prev, [name]: numValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear errors for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleValidate = () => {
    const parsed = CreateSectionSchema.safeParse(formData);
    
    if (!parsed.success) {
      const filledErrors: Record<string, string> = {};
      parsed.error.errors.forEach(error => {
        filledErrors[error.path[0] as string] = error.message;
      });
      setErrors(filledErrors);
      return false;
    }
    
    return true;
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

 if( !handleValidate()) return

    createSectionMutation(formData, {
      onSuccess: () => {
        setNumberOfSection(1);
        setSections([]);
      }
    });

  }



  useMemo(() => {
    if (academicYear?.id) {
      setFormData({ academicYearId: academicYear.id });
    }
  }, [academicYear, setFormData]);

const handlePreview = ()=>{
  if(handleValidate()){
    setNumberOfSection(formData.numberOfSection ?? 1);
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

                   <Button onClick={handlePreview} className="space-y-2 flex items-center justify-center">
                          Preview 
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
                  disabled={isCreatingSection }
                  className="min-w-[120px]"
                >
                  {isCreatingSection ? "Creating..." : "Create Section"}
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