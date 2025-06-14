"use client";

import { useState, useEffect, useRef } from "react";
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

interface Department {
  id: number;
  name: string;
  code: string;
}

export function StudentForm() {
  const [students, setStudents] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    middleName: "",
    lastName: "",
    departmentId: 0,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [inputValue, setInputValue] = useState("");
  const [filteredDepartments, setFilteredDepartments] = useState<Department[]>(
    []
  );
  const [departmentList, setDepartmentList] = useState<Department[]>([]);
  const [isGeneratingIds, setIsGeneratingIds] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch departments from API on mount
  useEffect(() => {
    async function fetchDepartments() {
      try {
        //const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/departments`);
        //if (!res.ok) throw new Error('Failed to fetch departments');
        //const data = await res.json();
        const data = [
          { id: 1, name: "Animal Health", code: "AH" },
          { id: 2, name: "Animal Production", code: "ANP" },
          { id: 3, name: "Cooperative Accounting and Auditing", code: "CAA" },
          { id: 4, name: "Crop Production", code: "CRP" },
          { id: 5, name: "Drainage and Irrigation", code: "IRD" },
          {
            id: 6,
            name: "Natural Resource Conservation and Development",
            code: "NRDC",
          },
        ];
        setDepartmentList(data);
      } catch (e) {
        console.error("Error fetching departments:", e);
      }
    }
    fetchDepartments();
  }, []);

  // Fetch students from DB on mount
  useEffect(() => {
    async function fetchStudents() {
      try {
        //const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tempStudents`);
        //if (!res.ok) throw new Error('Failed to fetch students');
        //const data = await res.json();
        const data = [
          {
            id: 1,
            firstName: "John",
            middleName: "Doe",
            lastName: "Smith",
            departmentId: 1,
          },
          {
            id: 2,
            firstName: "Jane",
            middleName: "Doe",
            lastName: "Smith",
            departmentId: 2,
          },
          {
            id: 3,
            firstName: "John",
            middleName: "Doe",
            lastName: "Smith",
            departmentId: 3,
          },
          {
            id: 4,
            firstName: "Jane",
            middleName: "Doe",
            lastName: "Smith",
            departmentId: 4,
          },
        ];
        setStudents(data);
      } catch (e) {
        console.error("Error fetching students:", e);
      }
    }
    fetchStudents();
  }, []);

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
    try {
      // Validate only required fields
      if (!formData.firstName || !formData.lastName || !formData.departmentId) {
        const newErrors: Record<string, string> = {};
        if (!formData.firstName) newErrors.firstName = "First name is required";
        if (!formData.lastName) newErrors.lastName = "Last name is required";
        if (!formData.departmentId)
          newErrors.department = "Department is required";
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
        `${process.env.NEXT_PUBLIC_BASE_URL}/tempStudents`
      );
      if (!updatedRes.ok) {
        throw new Error("Failed to fetch updated students list");
      }
      const updatedStudents = await updatedRes.json();
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
      setIsGeneratingIds(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/tempstudents/generate-all-ids`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            studentIds: students.map((student) => student.id),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate IDs");
      }

      const updatedStudents = await response.json();
      setStudents(updatedStudents);
    } catch (error) {
      console.error("Error generating IDs:", error);
    } finally {
      setIsGeneratingIds(false);
    }
  };

  return (
    <div className="flex w-full h-auto p-8 gap-8">
      {/* Student Table */}
      <div className="flex-1 bg-white rounded-lg shadow-md p-6 overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Registered Students
          </h2>
          {students.length > 0 && (
            <Button
              onClick={handleGenerateAllIds}
              disabled={isGeneratingIds}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              {isGeneratingIds ? "Generating IDs..." : "Generate IDs"}
            </Button>
          )}
        </div>
        <Table className="min-w-full">
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="p-3 text-sm font-semibold text-gray-600">
                ID
              </TableHead>
              <TableHead className="p-3 text-sm font-semibold text-gray-600">
                First Name
              </TableHead>
              <TableHead className="p-3 text-sm font-semibold text-gray-600">
                Middle Name
              </TableHead>
              <TableHead className="p-3 text-sm font-semibold text-gray-600">
                Last Name
              </TableHead>
              <TableHead className="p-3 text-sm font-semibold text-gray-600">
                Department
              </TableHead>
              <TableHead className="p-3 text-sm font-semibold text-gray-600">
                Generated ID
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student, index) => (
              <TableRow key={index} className="hover:bg-gray-50">
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
                    departmentList.find((d) => d.id === student.departmentId)
                      ?.name ||
                    "N/A"}
                </TableCell>
                <TableCell className="p-3 text-sm text-gray-600">
                  {student.generatedId || "Not generated"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Registration Form */}
      <div className="w-96 bg-white rounded-lg shadow-md p-6 h-fit">
        <h1 className="text-xl font-semibold text-gray-800 mb-6">
          Student Registration
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name *
              </label>
              <input
                name="firstName"
                value={formData.firstName}
                required
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.middleName && (
                <p className="text-red-500 text-xs mt-1">{errors.middleName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name *
              </label>
              <input
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
              )}
            </div>

            <div className="relative" ref={dropdownRef}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={inputValue}
                  required
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search department..."
                />
                {filteredDepartments.length > 0 && (
                  <ul className="absolute z-10 w-full bg-white border rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto">
                    {filteredDepartments.map((dept) => (
                      <li
                        key={dept.id}
                        onClick={() => handleOptionClick(dept)}
                        className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-gray-700 transition-colors"
                      >
                        {dept.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {errors.department && (
                <p className="text-red-500 text-xs mt-1">{errors.department}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Register Student
          </button>
        </form>
      </div>
    </div>
  );
}
