"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Clock, GraduationCap } from "lucide-react";
import {
  CreateSectionFormData,
  CreateSectionSchema,
} from "@/utils/createSection";
import { useDepartment } from "@/lib/react-query/hooks/useDepartment";
//import { useGetSection } from "@/lib/react-query/hooks/useAcademicYear";
import { useCreateSection } from "@/lib/react-query/mutations/Section";
import { getLocalStorage } from "@/utils/localStorage";

type AcademicYear = {
  id: string;
  name: string;
};

type sectionSchema = {
  studentCount: number;
};

const departmentId = getLocalStorage("departmentId");
console.log("departmentId", departmentId);

export function CreateSection() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [numberOfSection, setNumberOfSection] = useState<number>(1);
  const [sections, setSections] = useState<sectionSchema[]>([]);

  //Added to avoid hydration error
  const [academicYear, setAcademicYear] = useState<AcademicYear | null>(null);

  const { data: studentCount, isLoading: isStudentCountLoading } =
    useDepartment(Number(departmentId));

  const { mutate: createSectionMutation, isPending: isCreatingSection } =
    useCreateSection();

  const [formData, setFormData] = useState<CreateSectionFormData>({
    academicYearId: Number(academicYear?.id),
    departmentId: Number(departmentId),
    numberOfSection: numberOfSection,
  });

  useEffect(() => {
    const yearName = getLocalStorage("academicYearName");
    const yearId = getLocalStorage("academicYearId");
    setAcademicYear({ id: yearId || "", name: yearName || "Loading..." });
  }, []);

  useEffect(() => {
    if (academicYear?.id) {
      setFormData((prev) => ({ ...prev, academicYearId: Number(academicYear.id) }));
    }
  }, [academicYear]);

  useEffect(() => {
    if (studentCount > 0 && numberOfSection > 0) {
      const n = numberOfSection;
      const base = Math.floor(studentCount / n);
      const remainder = studentCount % n;
      const newSections: sectionSchema[] = Array.from(
        { length: n },
        (_, idx) => ({
          studentCount: idx < remainder ? base + 1 : base,
        })
      );
      setSections(newSections);
    } else {
      setSections([]);
    }
  }, [studentCount, numberOfSection]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "numberOfSection") {
      const numValue = Math.max(1, Number(value) || 1);
      setNumberOfSection(numValue);
      setFormData((prev) => ({ ...prev, [name]: numValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Clear errors for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleValidate = () => {
    const parsed = CreateSectionSchema.safeParse(formData);

    if (!parsed.success) {
      const filledErrors: Record<string, string> = {};
      parsed.error.errors.forEach((error) => {
        filledErrors[error.path[0] as string] = error.message;
      });
      setErrors(filledErrors);
      console.log("filledErrors", filledErrors);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("formData", formData);
    const payload = {
      academicYearId: Number(academicYear?.id),
      numberOfSections: numberOfSection ,
      departmentId: Number(departmentId)  ,
    };

    if (!handleValidate()) return;

    createSectionMutation(payload, {
      onSuccess: () => {
        setNumberOfSection(1);
        setSections([]);
      },
    });
  };

  useMemo(() => {
    if (academicYear?.id) {
      setFormData({ academicYearId: Number(academicYear.id) });
    }
  }, [academicYear, setFormData]);

  const handlePreview = () => {
    if (handleValidate()) {
      setNumberOfSection(formData.numberOfSection ?? 1);
    }
  };

  return (
    <div className="w-full p-4 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-xl">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">
              Create New Section
            </CardTitle>
            <CardDescription>
              Set up a new section within the academic year
            </CardDescription>
          </CardHeader>

          <CardContent className="px-4 sm:px-6 flex flex-col items-center justify-center py-4">
            <p className="text-sm text-gray-600 mb-4 text-center">
              please fill out the form below and create an equal number of
              students for the section.
            </p>

            <p className="text-md text-gray-600 mb-4">
              Total Students:{" "}
              <span className="font-semibold">{studentCount}</span>
            </p>
            <p className="text-xl text-gray-600 mb-4">
              Academic Year{" "}
              <span className="font-semibold">
                {academicYear?.name || "Loading..."}
              </span>
            </p>
          </CardContent>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6 px-4 sm:px-6">
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <div className="space-y-2 w-full sm:w-auto">
                    <Label
                      htmlFor="numberOfSection"
                      className="text-sm font-medium"
                    >
                      Number of Section <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="numberOfSection"
                      name="numberOfSection"
                      type="number"
                      placeholder="1"
                      value={formData.numberOfSection ?? 1}
                      onChange={handleChange}
                      className={`${
                        errors.numberOfSection ? "border-red-500" : ""
                      } w-full sm:w-48`}
                      min={1}
                      max={20}
                    />
                    {errors.numberOfSection && (
                      <p className="text-red-500 text-sm">
                        {errors.numberOfSection}
                      </p>
                    )}
                  </div>

                  <Button
                    type="button"
                    onClick={handlePreview}
                    className="w-full sm:w-auto mt-2 sm:mt-8"
                  >
                    Preview
                  </Button>
                </div>
              </div>

              {sections.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Generated Sections</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sections.map((section, index) => (
                      <div
                        key={index}
                        className="p-4 bg-white rounded-lg shadow"
                      >
                        <h4 className="text-md font-medium">
                          Section {index + 1}
                        </h4>
                        <p className="text-sm text-gray-600">
                          Student Count: {section.studentCount}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-4 pt-6">
                <Button
                  type="submit"
                  disabled={isCreatingSection}
                  className="w-full sm:w-auto min-w-[120px]"
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
}

//export default CreateSection;
