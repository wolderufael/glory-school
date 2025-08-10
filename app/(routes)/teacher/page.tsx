"use client";

import React from "react";
import { SidebarInset } from "@/components/ui/sidebar";
/* import {
  TeacherDashboardHeader,
  TeacherStatsCards,
  TeacherQuickActions,
  TeacherRecentActivities,
} from "@/components/teacher"; */
import { TeacherDashboardHeader } from "@/components/teacher/dashboard-header";
import { TeacherStatsCards } from "@/components/teacher/stats-cards";
import { TeacherQuickActions } from "@/components/teacher/quick-actions";
import { TeacherRecentActivities } from "@/components/teacher/recent-activities";

const TeacherDashboard = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <SidebarInset className="flex-1">
        {/* Dashboard Header */}
        <TeacherDashboardHeader />

        <main className="flex-1 p-6 space-y-6">
          {/* Stats Cards */}
       {/*    <section>
            <TeacherStatsCards />
          </section> */}

          {/* Main Content Grid */}

          {/* Right Column - Quick Actions */}
          <div className="space-y-6">
            <TeacherQuickActions />
          </div>

          {/* Recent Activities */}
          <section>
            <TeacherRecentActivities />
          </section>
        </main>
      </SidebarInset>
    </div>
  );
};

export default TeacherDashboard;
