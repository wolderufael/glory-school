"use client";

import React from "react";
import { useSlip } from "@/lib/react-query/hooks/useSlip";
import { RegistrationSlipCard } from "./registration-slip-card";
import { getLocalStorage } from "@/utils/localStorage";
import { Semester, AcademicYear } from "@/types/types";
import { romanToInt } from "@/utils/romanNumerals";

export interface Module {
  no: number;
  title: string;
  code: string;
  level: string;
  nominalHour: number;
}

export interface StudentRegistration {
  department: string;
  level: string;
  year: string;
  entryYear: string;
  semester_name: string;
  academicSemester: Semester;
  academicYear: AcademicYear;
  sex: "M" | "F";
  mobilePhone: string;
  program: {
    isRegular: boolean;
    isCEP: boolean;
  };
  modules: Module[];
}

export default function CourseRegistration() {
  const studentId = getLocalStorage("studentId")?.toString() || "";
  const { data: slips, isLoading, error } = useSlip(studentId);

  console.log("studentId:", studentId);
  console.log("slips:", slips);
  console.log("isLoading:", isLoading);
  console.log("error:", error);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading registration slips...</div>
      </div>
    );
  }

  if (error) {
    console.error("Error loading slips:", error);
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red-600">
          Error loading registration data: {error.message}
        </div>
      </div>
    );
  }

  if (!slips || slips.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">No registration slips found</div>
      </div>
    );
  }

  // Sort slips by level (Roman numerals) in descending order
  const sortedSlips = [...slips].sort((a, b) => {
    return romanToInt(b.level) - romanToInt(a.level);
  });

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Registration Slips</h2>
      <div className="space-y-8">
        {sortedSlips.map((slip: StudentRegistration, index: number) => (
          <RegistrationSlipCard key={index} slip={slip} />
        ))}
      </div>
    </div>
  );
}
