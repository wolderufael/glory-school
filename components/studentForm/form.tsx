"use client";

import { useState, useEffect, useRef, ChangeEvent } from "react";
import { Student, StudentSchema } from "@/utils/typeSchema";
import z from "zod";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getLocalStorage } from "@/utils/localStorage";
import { Upload } from "lucide-react";
import * as XLSX from "xlsx";

interface Department {
  id: number;
  name: string;
  code: string;
}

interface TempStudent {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  departmentId: number;
  generatedId?: string;
  studentMainId?: string;
  department?: {
    name: string;
  };
}

export function StudentForm() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [registrarId, setRegistrarId] = useState<number | null>(null);
  //const [isSubmitted, setIsSubmitted] = useState(false);

  const userId = getLocalStorage("currentUserId");
  const academicYearId = getLocalStorage("academicYearId");
  const academicYearName = getLocalStorage("academicYearName");

  const [formData, setFormData] = useState({
    registerId: Number(getLocalStorage("currentUserId")),
    academicYearId: Number(academicYearId),
    firstName: "",
    middleName: "",
    lastName: "",
    departmentId: 0,
    academicYear: new Date().getFullYear().toString(),
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [inputValue, setInputValue] = useState("");
  const [filteredDepartments, setFilteredDepartments] = useState<Department[]>(
    []
  );
  const [departmentList, setDepartmentList] = useState<Department[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [refreshTrigger, setRefreshTrigger] = useState(0);

  console.log("Registrar ID1111:", registrarId);

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

  // Fetch students whenever refreshTrigger changes
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/tempStudents?academicYearId=${academicYearId}`
        );
        if (!res.ok) throw new Error("Failed to fetch students");
        const data = await res.json();
        setStudents(data);
      } catch (e) {
        console.error("Error fetching students:", e);
        toast.error("Failed to fetch students");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [academicYearId, refreshTrigger]); // Add refreshTrigger as dependency

  // Add registrar fetching
  useEffect(() => {
    async function fetchRegistrarId() {
      if (!userId) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/registrars`
        );
        if (!response.ok) throw new Error("Failed to fetch registrars");

        const registrars = await response.json();
        const registrar = registrars.find(
          (reg: any) => reg.userId === Number(userId)
        );

        if (registrar) {
          setRegistrarId(registrar.id);
          setFormData((prev) => ({
            ...prev,
            registerId: registrar.id,
          }));
        }
      } catch (error) {
        console.error("Error fetching registrar ID:", error);
      }
    }

    fetchRegistrarId();
  }, [userId]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setFilteredDepartments([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data:", formData);
    try {
      // Validate only required fields
      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.departmentId ||
        !formData.registerId ||
        !formData.academicYearId
      ) {
        const newErrors: Record<string, string> = {};
        if (!formData.firstName) newErrors.firstName = "First name is required";
        if (!formData.lastName) newErrors.lastName = "Last name is required";
        if (!formData.departmentId)
          newErrors.department = "Department is required";
        if (!formData.registerId)
          newErrors.registerId = "Registrar ID is required";
        if (!formData.academicYearId)
          newErrors.academicYearId = "Academic Year ID is required";
        setErrors(newErrors);
        return;
      }
      setErrors({});
      // Post to DB
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/tempStudents`,
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        throw new Error("Failed to post data");
      }
      // Refetch the full list of students from DB
      const updatedRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/tempstudents?academicYearId=${academicYearId}`
      );
      if (!updatedRes.ok) {
        throw new Error("Failed to fetch updated students list");
      }
      const updatedStudents = await updatedRes.json();
      //setIsSubmitted(true);
      setStudents(updatedStudents);
      setFormData((prev) => ({
        ...prev,
        id: "",
        firstName: "",
        middleName: "",
        lastName: "",
        // departmentId stays the same
      }));
      // Set inputValue to current department name
      const selectedDepartment = departmentList.find(
        (dept) => dept.id === formData.departmentId
      );
      setInputValue(selectedDepartment?.name || "");
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenerateAllIds = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/tempstudents/generate-ids`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            academicYear: academicYearName,
            academicYearId: Number(academicYearId),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate IDs");
      }

      toast.success("Student IDs generated successfully");
      const updatedStudents = await response.json();

      const { students } = updatedStudents;

      setStudents(students);
    } catch (error) {
      toast.error("Failed to generate student IDs");
      console.error("Error generating IDs:", error);
    }
  };

  const handleBulkCreate = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const loadingToast = toast.loading("Processing Excel file...");

    try {
      // Read file as array buffer
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: "array" });

      // Get the second sheet (index 1)
      const sheetName = workbook.SheetNames[0];
      console.log("Sheet name:", sheetName);
      const worksheet = workbook.Sheets[sheetName];

      // Convert to JSON with headers
      const jsonData = XLSX.utils.sheet_to_json(worksheet, {
        raw: false,
        defval: "",
      });

      console.log("Extracted data:", jsonData);

      if (!jsonData || jsonData.length === 0) {
        toast.error("No data found in Excel file");
        return;
      }

      // Prepare the data for API with validation
      const studentsData = [];
      const errors = [];

      for (let i = 0; i < jsonData.length; i++) {
        const row: any = jsonData[i];
        const rowNumber = i + 2; // +2 because Excel rows start at 1 and we skip header

        const departmentName = row["Department"]?.toString().trim();

        if (!departmentName) {
          errors.push(`Row ${rowNumber}: Department name is empty`);
          continue;
        }

        // Case-insensitive department matching
        const matchedDepartment = departmentList.find(
          (dept) => dept.name.toLowerCase() === departmentName.toLowerCase()
        );

        if (!matchedDepartment) {
          // Show available department names for reference
          const availableDepts = departmentList.map((d) => d.name).join(", ");
          errors.push(
            `Row ${rowNumber}: Department "${departmentName}" not found. Available departments: ${availableDepts}`
          );
          continue;
        }

        studentsData.push({
          registerId: Number(getLocalStorage("registrarId")),
          academicYearId: Number(academicYearId),
          firstName: row["First Name"]?.toString().trim() || "",
          middleName: row["Middle Name"]?.toString().trim() || "",
          lastName: row["Last Name"]?.toString().trim() || "",
          departmentId: matchedDepartment.id,
        });
      }

      // If there are validation errors, show them and stop processing
      if (errors.length > 0) {
        const errorMessage = `Found ${errors.length} error(s):\n${errors.join(
          "\n"
        )}`;
        toast.error(errorMessage);
        console.error("Validation errors:", errors);
        return;
      }

      console.log("Processed data for API:", { students: studentsData });

      // Send to API with correct format
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/tempStudents/bulk-create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ students: studentsData }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to upload students");
      }

      // Trigger a refresh of the student list
      setRefreshTrigger((prev) => prev + 1);
      toast.success("Students uploaded successfully");
    } catch (error) {
      console.error("Error processing file:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to process Excel file"
      );
    } finally {
      event.target.value = "";
      toast.dismiss(loadingToast);
    }
  };

  return (
    <div className="space-y-6 p-4 max-w-[95%] mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter first name"
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Middle Name
              </label>
              <input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter middle name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter last name"
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
              )}
            </div>

            <div className="relative" ref={dropdownRef}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Search department"
              />
              {errors.department && (
                <p className="text-red-500 text-xs mt-1">{errors.department}</p>
              )}
              {filteredDepartments.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-auto">
                  {filteredDepartments.map((dept) => (
                    <div
                      key={dept.id}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                      onClick={() => handleOptionClick(dept)}
                    >
                      {dept.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
            <Button
              type="button"
              variant="outline"
              className="flex items-center gap-2 text-blue-600 border-blue-200 hover:bg-blue-50"
              onClick={() => document.getElementById("fileUpload")?.click()}
            >
              <Upload className="h-4 w-4" />
              Upload From File
            </Button>
            <input
              id="fileUpload"
              type="file"
              accept=".csv,.xlsx,.xls"
              className="hidden"
              onChange={handleBulkCreate}
            />
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Add Student
            </Button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Student List</h2>
          <Button
            onClick={handleGenerateAllIds}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            Generate All IDs
          </Button>
        </div>

        <div className="overflow-auto max-h-[calc(100vh-24rem)]">
          <Table>
            <TableHeader className="sticky top-0 bg-gray-50">
              <TableRow>
                <TableHead className="p-3 text-sm font-semibold text-gray-600 whitespace-nowrap">
                  ID
                </TableHead>
                <TableHead className="p-3 text-sm font-semibold text-gray-600 whitespace-nowrap">
                  First Name
                </TableHead>
                <TableHead className="p-3 text-sm font-semibold text-gray-600 whitespace-nowrap">
                  Middle Name
                </TableHead>
                <TableHead className="p-3 text-sm font-semibold text-gray-600 whitespace-nowrap">
                  Last Name
                </TableHead>
                <TableHead className="p-3 text-sm font-semibold text-gray-600 whitespace-nowrap">
                  Department
                </TableHead>
                <TableHead className="p-3 text-sm font-semibold text-gray-600 whitespace-nowrap">
                  Generated ID
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-sm text-gray-500 py-4"
                  >
                    Loading students...
                  </TableCell>
                </TableRow>
              ) : students.length > 0 ? (
                students.map((student: TempStudent) => (
                  <TableRow key={student.id} className="hover:bg-gray-50">
                    <TableCell className="p-3 text-sm text-gray-600">
                      {student.id}
                    </TableCell>
                    <TableCell className="p-3 text-sm text-gray-600">
                      {student.firstName}
                    </TableCell>
                    <TableCell className="p-3 text-sm text-gray-600">
                      {student.middleName}
                    </TableCell>
                    <TableCell className="p-3 text-sm text-gray-600">
                      {student.lastName}
                    </TableCell>
                    <TableCell className="p-3 text-sm text-gray-600">
                      {student.department?.name ||
                        departmentList.find(
                          (d) => d.id === student.departmentId
                        )?.name ||
                        "N/A"}
                    </TableCell>
                    <TableCell className="p-3 text-sm text-gray-600">
                      {student.studentMainId || "Not generated"}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-sm text-gray-500 py-4"
                  >
                    No students registered yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
