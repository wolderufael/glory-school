"use client";

import { StudentInfoCard } from "@/components/dashboard/home/student-info-card";
import { CurrentCoursesCard } from "@/components/dashboard/home/current-courses-card";
import { QuickActionsCard } from "@/components/dashboard/home/quick-actions-card";
import { useStudentInfo } from "@/lib/react-query/hooks/useStudentInfo";

export default function DashboardPage() {
  //const studentID = "1";
  const { data: studentInfo, isLoading } = useStudentInfo();
  console.log("studentInfoonDashboard", studentInfo);

  const studentInfoData = {
    department: studentInfo?.department?.name || "Not assigned",
    year: studentInfo?.currentStudyingYear || "Not assigned",
    section: studentInfo?.section?.name || "Not assigned",
    academicYear: studentInfo?.listOfSlip || "Not assigned",
    semester: `Semester ${
      studentInfo?.currentStudyingSemester || "Not assigned"
    }`,
    program: studentInfo?.program?.name || "Not assigned",
  };

  return (
    <main className="flex-1 p-6">
      <StudentInfoCard data={studentInfoData} isLoading={isLoading} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Current Courses */}
        <div className="lg:col-span-2 space-y-6">
          <CurrentCoursesCard />
        </div>

        {/* Right Column - Quick Links */}
        <div className="space-y-6">
          <QuickActionsCard />
        </div>
      </div>
    </main>
  );
}
