"use client";

import * as Tabs from "@radix-ui/react-tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { User, MapPin, GraduationCap, Loader2 } from "lucide-react";
import { BasicInformation } from "./basic-information";
//import { AddressContact } from "./address-contact";
import { EducationalBackground } from "./educational-background";
import { mockStudentData } from "./mock-data";
import { useStudentInfo } from "@/lib/react-query/hooks/useStudentInfo";
import { transformStudentInfo } from "@/lib/transforms/student-data";
//import { useAuth } from "@/context/AuthContext";

export function Profile() {
  const { data: studentInfo, isLoading, isError } = useStudentInfo();
  console.log("studentInfo", studentInfo);

  // Transform API data if available, otherwise fall back to mock data
  /*  const studentData = studentInfo
    ? transformStudentInfo(studentInfo)
    : mockStudentData; */

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100">
        <div className="flex items-center gap-2 text-blue-600">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="font-medium">Loading profile...</span>
        </div>
      </div>
    );
  }

  // If there's an error, we'll still show the UI with mock data
  if (isError) {
    console.error("Failed to load student info, using mock data");
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Card className="shadow-xl max-w-6xl mx-auto border border-indigo-100 rounded-2xl overflow-hidden">
          <CardHeader className="space-y-1 text-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-8">
            <div className="flex justify-center mb-3">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30">
                <User className="w-7 h-7 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold tracking-tight">
              Student Profile
            </CardTitle>
            <CardDescription className="text-blue-100 max-w-2xl mx-auto">
              View your personal, contact, and educational information
              {isError && " (Using cached data)"}
            </CardDescription>
            <div className="flex justify-center pt-4">
              <div className="w-24 h-1 bg-blue-300 rounded-full"></div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <Tabs.Root defaultValue="basic" className="w-full">
              <Tabs.List
                className="flex gap-2 mb-8"
                aria-label="Profile sections"
              >
                <Tabs.Trigger
                  value="basic"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200"
                >
                  <User className="w-4 h-4" />
                  Basic Information
                </Tabs.Trigger>
            {/*     <Tabs.Trigger
                  value="address"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200"
                >
                  <MapPin className="w-4 h-4" />
                  Address & Contact
                </Tabs.Trigger> */}
          {/*       <Tabs.Trigger
                  value="education"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200"
                >
                  <GraduationCap className="w-4 h-4" />
                  Educational Background
                </Tabs.Trigger> */}
              </Tabs.List>

              <div className="space-y-6">
                <Tabs.Content value="basic" className="focus:outline-none">
                  <BasicInformation studentData={studentInfo} />
                </Tabs.Content>

             {/*    <Tabs.Content value="address" className="focus:outline-none">
                  <AddressContact studentData={studentInfo} />
                </Tabs.Content> */}

{/*                 <Tabs.Content value="education" className="focus:outline-none">
                  <EducationalBackground studentData={studentInfo} />
                </Tabs.Content> */}
              </div>
            </Tabs.Root>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
