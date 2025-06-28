"use client";

import React from "react";
import { SidebarInset } from "@/components/ui/sidebar";
import {
  DepartmentDashboardHeader,
  DepartmentStatsCards,
  DepartmentQuickActions,
  DepartmentRecentActivities,
} from "@/components/department";

const DepartmentDashboard = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <SidebarInset className="flex-1">
        {/* Dashboard Header */}
        {/* <DepartmentDashboardHeader /> */}

        <main className="flex-1 p-6 space-y-6">
          {/* Stats Cards */}
          <section>
            <DepartmentStatsCards />
          </section>

          {/* Main Content Grid */}

          {/* Right Column - Quick Actions */}
          <div className="space-y-6">
            <DepartmentQuickActions />
          </div>

          {/* Recent Activities */}
          <section>
            <DepartmentRecentActivities />
          </section>
        </main>
      </SidebarInset>
    </div>
  );
};

export default DepartmentDashboard;
