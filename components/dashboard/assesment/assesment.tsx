"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AssessmentTab from "./assessmentTable";
import { getLocalStorage } from "@/utils/localStorage";

export function Assesment() {
  const studentId = getLocalStorage("studentId");
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Current Semester Assessment</CardTitle>
        </CardHeader>
        <CardContent>
          <AssessmentTab studentId={Number(studentId)} />
        </CardContent>
      </Card>
    </div>
  );
}
