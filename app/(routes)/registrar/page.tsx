"use client";

import React from "react";
import { SidebarInset } from "@/components/ui/sidebar";
import {
  RegistrarDashboardHeader,
  RegistrarStatsCards,
  RegistrarQuickActions,
  RegistrarRecentActivities,
} from "@/components/registrar";

const RegistrarDashboard = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <SidebarInset className="flex-1">
        {/* Dashboard Header */}
        <RegistrarDashboardHeader />

        <main className="flex-1 p-6 space-y-6">
          {/* Stats Cards */}
          <section>
            <RegistrarStatsCards />
          </section>

          {/* Main Content Grid */}

          {/* Right Column - Quick Actions */}
          <div className="space-y-6">
            <RegistrarQuickActions />
          </div>

          {/* Recent Activities */}
          <section>
            <RegistrarRecentActivities />
          </section>
        </main>
      </SidebarInset>
    </div>
  );
};

export default RegistrarDashboard;
