"use client";

import { useSlip } from "@/lib/react-query/hooks/useSlip";
import { RegistrationSlipCard } from "./registration-slip-card";

export interface Module {
  no: number;
  title: string;
  code: string;
  level: string;
  nominalHour: number;
}

export interface StudentRegistration {
  name: string;
  idNo: string;
  department: string;
  level: string;
  year: string;
  entryYear: string;
  academicYear: string;
  semester: string;
  sex: "M" | "F";
  mobilePhone: string;
  program: {
    isRegular: boolean;
    isCEP: boolean;
  };
  modules: Module[];
}

/* Mock data for testing
const mockSlips: StudentRegistration[] = [
  {
    name: "John Doe",
    idNo: "AMU/1234/12",
    department: "Computer Science",
    level: "III",
    year: "3",
    entryYear: "2021",
    academicYear: "2023/24",
    semester: "2",
    sex: "M",
    mobilePhone: "+251912345678",
    program: {
      isRegular: true,
      isCEP: false,
    },
    modules: [
      {
        no: 1,
        title: "Advanced Programming",
        code: "CS3021",
        level: "III",
        nominalHour: 4,
      },
      {
        no: 2,
        title: "Database Systems",
        code: "CS3022",
        level: "III",
        nominalHour: 3,
      },
      {
        no: 3,
        title: "Operating Systems",
        code: "CS3023",
        level: "III",
        nominalHour: 4,
      },
    ],
  },
  {
    name: "John Doe",
    idNo: "AMU/1234/12",
    department: "Computer Science",
    level: "III",
    year: "3",
    entryYear: "2021",
    academicYear: "2023/24",
    semester: "1",
    sex: "M",
    mobilePhone: "+251912345678",
    program: {
      isRegular: true,
      isCEP: false,
    },
    modules: [
      {
        no: 1,
        title: "Web Programming",
        code: "CS3011",
        level: "III",
        nominalHour: 4,
      },
      {
        no: 2,
        title: "Software Engineering",
        code: "CS3012",
        level: "III",
        nominalHour: 3,
      },
      {
        no: 3,
        title: "Computer Networks",
        code: "CS3013",
        level: "III",
        nominalHour: 4,
      },
    ],
  },
];
*/

interface CourseRegistrationProps {
  studentId: string;
}

export default function CourseRegistration({
  studentId,
}: CourseRegistrationProps) {
  const { data: slips, isLoading, error } = useSlip(studentId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading registration data</div>;
  }

  if (!slips || slips.length === 0) {
    return <div>No registration slips found</div>;
  }

  // Sort slips by date, assuming the most recent is first
  const sortedSlips = [...slips].sort((a, b) => {
    // Sort by academic year and semester
    const [aYear] = a.academicYear.split("/");
    const [bYear] = b.academicYear.split("/");
    const yearDiff = parseInt(bYear) - parseInt(aYear);
    if (yearDiff !== 0) return yearDiff;
    return parseInt(b.semester) - parseInt(a.semester);
  });

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Registration Slips</h2>
      <div className="space-y-8">
        {sortedSlips.map((slip, index) => (
          <RegistrationSlipCard key={index} slip={slip} />
        ))}
      </div>
    </div>
  );
}
