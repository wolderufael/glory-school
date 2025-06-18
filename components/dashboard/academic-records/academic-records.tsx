"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function AcademicRecords() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Academic Records</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="grades" className="space-y-4">
            <TabsList>
              <TabsTrigger value="grades">Grades</TabsTrigger>
              <TabsTrigger value="transcript">Transcript</TabsTrigger>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
            </TabsList>

            <TabsContent value="grades" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Current Semester Grades</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Add grades table or content here */}
                  <div className="text-sm text-gray-500">
                    No grades available yet
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="transcript" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Academic Transcript</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Add transcript content here */}
                  <div className="text-sm text-gray-500">
                    Transcript not available yet
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="attendance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Attendance Records</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Add attendance records here */}
                  <div className="text-sm text-gray-500">
                    No attendance records available
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
