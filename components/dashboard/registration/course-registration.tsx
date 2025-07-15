"use client";

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
  const {
    data: slips,
    isLoading,
    error,
  } = useSlip(getLocalStorage("studentId")?.toString() || "");

  console.log("slips", slips);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading registration data</div>;
  }

  if (!slips || slips.length === 0) {
    return <div>No registration slips found</div>;
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
