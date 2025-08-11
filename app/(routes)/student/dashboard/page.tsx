"use client";

import { StudentInfoCard } from "@/components/dashboard/home/student-info-card";
import { CurrentCoursesCard } from "@/components/dashboard/home/current-courses-card";
import { QuickActionsCard } from "@/components/dashboard/home/quick-actions-card";
import { useStudentInfo } from "@/lib/react-query/hooks/useStudentInfo";
import { useEffect } from "react";
import Reregistration from "@/components/dashboard/home/reregistration";
import { useReregistration } from "@/lib/react-query/hooks/useReregistration";
import { getLocalStorage } from "@/utils/localStorage";

export default function DashboardPage() {
  const studentId = getLocalStorage("studentId");
 /*  const {
    data: reregistrationData,
    isLoading,
    refetch: refetchReregistration,
  } = useReregistration(
    Number(studentId),
    Number(getLocalStorage("academicSemesterId")) || 0,
    Number(getLocalStorage("academicYearId")) || 0
  ); */
  const { data: studentInfo, refetch } = useStudentInfo();

  useEffect(() => {
    refetch();
  }, []);

  const studentInfoData = {
    department: studentInfo?.department?.name || "Not assigned",
    year: studentInfo?.currentStudyingYear || "Not assigned",
    section: studentInfo?.section?.name || "Not assigned",
    academicYear: studentInfo?.currentStudyingYear || "Not assigned",
    semester: `Semester ${
      studentInfo?.currentStudyingSemester || "Not assigned"
    }`,
    //program: studentInfo?.program?.name || "Not assigned",
  };

  // Check if should show reregistration component
  // Show component if:
  // 1. Data has loaded (not loading)
  // 2. AND (reregistrationData is null/undefined/empty OR reregistrationData exists AND hasPassed is not null/undefined)
  // Don't show if still loading OR reregistrationData exists AND hasPassed is null/undefined
 /*  const shouldShowReregistration =
    !isLoading &&
    (!reregistrationData ||
      Object.keys(reregistrationData).length === 0 ||
      (reregistrationData &&
        reregistrationData.hasPassed !== null &&
        reregistrationData.hasPassed !== undefined)); */


  return (
    <main className="flex-1 p-6 mt-4">
     {/*  {shouldShowReregistration && (
        <Reregistration onReregister={refetchReregistration} />
      )} */}
      <StudentInfoCard data={studentInfoData} isLoading={false} />

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
