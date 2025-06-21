"use client";

import { AppSidebar } from "@/components/dashboard/sidebar";
import "@/app/globals.css";
import { TopNav } from "@/components/dashboard/top-nav";
import { SidebarProvider } from "@/components/ui/sidebar";
import {
  useAuthStore
  
 } from "@/lib/store/authStore";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuthStore();
  console.log("user", user);

  return (
    <SidebarProvider>
      <div className="min-h-screen min-w-full md:flex">
        <AppSidebar />
        <div className="flex-1 flex flex-col md:ml-8">
          <TopNav title={user?.firstName} studentId={user?.userMainId} />
          <main className="flex-1 no-scrollbar overflow-y-auto p-4">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
