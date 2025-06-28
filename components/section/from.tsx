"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
interface Department {
  id: number;
  name: string;
  code: string;
}

export function CreateSection() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [numberOfSection, setNumberOfSection] = useState<number>(1);
  const [sections, setSections] = useState<sectionSchema[]>([]);
  const [filteredDepartments, setFilteredDepartments] = useState<Department[]>(
    []
  );
  const [departmentList, setDepartmentList] = useState<Department[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState("");

  //Added to avoid hydration error
  const [academicYear, setAcademicYear] = useState<AcademicYear | null>(null);

  const [formData, setFormData] = useState<CreateSectionFormData>({
    academicYearId: 0,
    departmentId: 0,
    numberOfSection: numberOfSection,
  });

  const { data: studentCount, isLoading: isStudentCountLoading } =
    useDepartment(Number(formData.departmentId || 0));

  const { mutate: createSectionMutation, isPending: isCreatingSection } =
    useCreateSection();

  // Fetch departments from API on mount
  useEffect(() => {
    async function fetchDepartments() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/departments`
        );
        if (!res.ok) throw new Error("Failed to fetch departments");
        const data = await res.json();
        console.log("Departments:", data);

        setDepartmentList(data);
      } catch (e) {
        console.error("Error fetching departments:", e);
      }
    }
    fetchDepartments();
  }, []);

  useEffect(() => {
    const yearName = getLocalStorage("academicYearName");
    const yearId = getLocalStorage("academicYearId");
    setAcademicYear({ id: yearId || "", name: yearName || "Loading..." });
  }, []);

  useEffect(() => {
    if (academicYear?.id) {
      setFormData((prev) => ({
        ...prev,
        academicYearId: Number(academicYear.id),
      }));
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
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (value.trim() === "") {
      setFilteredDepartments([]);
      return;
    }
    const filtered = departmentList.filter((dept) =>
      dept.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredDepartments(filtered);
    // If exact match, set departmentId
    const exact = departmentList.find(
      (dept) => dept.name.toLowerCase() === value.toLowerCase()
    );
    setFormData((prev) => ({ ...prev, departmentId: exact ? exact.id : 0 }));
  };

  const handleOptionClick = (dept: Department) => {
    setInputValue(dept.name);
    setFormData((prev) => ({ ...prev, departmentId: dept.id }));
    setFilteredDepartments([]);
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
    console.log("numberOfSection", numberOfSection);
    console.log("academicYear", academicYear);
    console.log("departmentId", formData.departmentId);
    const payload = {
      academicYearId: Number(academicYear?.id),
      numberOfSections: numberOfSection,
      departmentId: Number(formData.departmentId),
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

          <CardContent className="px-4 sm:px-6 py-6">
            <p className="text-sm text-gray-600 mb-6 text-center">
              Please fill out the form below and create an equal number of
              students for the section.
            </p>

            {/* Department Selection and Student Count Row */}
            <div className="flex flex-col lg:flex-row items-start lg:items-end gap-4 mb-6">
              {/* Department Selection */}
              <div className="relative flex-1" ref={dropdownRef}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm"
                    placeholder="Search and select department..."
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
                {errors.department && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.department}
                  </p>
                )}
                {filteredDepartments.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-auto">
                    {filteredDepartments.map((dept) => (
                      <div
                        key={dept.id}
                        className="px-4 py-3 hover:bg-blue-50 cursor-pointer text-sm border-b border-gray-100 last:border-b-0 transition-colors duration-150"
                        onClick={() => handleOptionClick(dept)}
                      >
                        <div className="font-medium text-gray-900">
                          {dept.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          Code: {dept.code}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Student Count Display */}
              <div className="flex-shrink-0">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Students
                </label>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg px-6 py-3 min-w-[180px]">
                  <div className="flex items-center justify-center">
                    {!formData.departmentId ? (
                      <span className="text-gray-500 font-medium">
                        Select department
                      </span>
                    ) : isStudentCountLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-gray-600">Loading...</span>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {studentCount || 0}
                        </div>
                        <div className="text-xs text-gray-600">students</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Academic Year Display */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 bg-gray-50 rounded-lg px-4 py-2">
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-gray-600">Academic Year:</span>
                <span className="font-semibold text-gray-900">
                  {academicYear?.name || "Loading..."}
                </span>
              </div>
            </div>
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
