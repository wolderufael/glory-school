"use client";

import { StudentForm } from "@/components/studentForm/form";
//import { ExcelFileReader } from "@/components/studentForm/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus } from "lucide-react";

export default function RegistrarEnrollmentPage() {
  return (
    <div className="flex-1 h-full bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="h-full">
        <Card className="shadow-sm rounded-none">
          <CardHeader className="space-y-1 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
            <div className="flex items-center justify-center w-full">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <UserPlus className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">
                  Temporary Student Management
                </CardTitle>
              </div>
            </div>
          </CardHeader>
        </Card>
        <StudentForm />
        {/* <ExcelFileReader /> */}
       
      </div>
    </div>
  );
}
