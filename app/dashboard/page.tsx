"use client";

import { StudentInfoCard } from "@/components/dashboard/home/student-info-card";
import { CurrentCoursesCard } from "@/components/dashboard/home/current-courses-card";
import { QuickActionsCard } from "@/components/dashboard/home/quick-actions-card";

export default function DashboardPage() {
  return (
    <main className="flex-1 p-6">
      <StudentInfoCard />

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
