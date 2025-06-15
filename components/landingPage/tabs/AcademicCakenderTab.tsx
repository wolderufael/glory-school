"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Calendar, CalendarDays, GraduationCap } from "lucide-react";
import {
  useAcademicCalender,
  AcademicCalender,
} from "@/lib/react-query/hooks/useAcademicCalender";

// Sample data - replace with actual data from your API
/* const academicCalendar: AcademicCalender = {
  name: "2023/24 Academic Year",
  startDate: "2023-09-11",
  endDate: "2024-07-26",
  semester1StartDate: "2023-09-11",
  semester1EndDate: "2024-01-26",
  semester2StartDate: "2024-02-12",
  semester2EndDate: "2024-07-26",
  semester1RegistrationStartDate: "2023-09-04",
  semester1RegistrationEndDate: "2023-09-08",
  semester2RegistrationStartDate: "2024-02-05",
  semester2RegistrationEndDate: "2024-02-09",
}; */

const formatDate = (dateString: string | undefined) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default function AcademicCalenderTab() {
  const { data: academicCalenders, isLoading, error } = useAcademicCalender();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-lg text-gray-600">Loading academic calendar...</p>
      </div>
    );
  }

  if (error || !academicCalenders || !Array.isArray(academicCalenders)) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-lg text-red-600">Error loading academic calendar</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-12 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200 rounded-full opacity-10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-green-200 rounded-full opacity-10 blur-3xl" />
      </div>

      {(academicCalenders as AcademicCalender[]).map(
        (calendar: AcademicCalender, calendarIndex: number) => (
          <div key={calendarIndex} className="space-y-8 relative">
            {/* Section background decoration */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-transparent backdrop-blur-sm rounded-3xl" />

            <div className="relative">
              <div className="text-center mb-12">
                <div className="inline-block">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4 relative">
                    {calendar.name} Academic Year
                    <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-green-500 rounded-full transform scale-x-0 animate-expand" />
                  </h2>
                </div>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Important academic dates and deadlines for students and
                  faculty members.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Academic Year Overview */}
                <Card className="bg-gradient-to-br from-blue-50 to-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="p-6 relative">
                    <div className="flex items-center gap-3 mb-6">
                      <Calendar className="h-6 w-6 text-blue-600" />
                      <h3 className="text-xl font-semibold text-gray-900">
                        Academic Year Overview
                      </h3>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500">Academic Year</p>
                        <p className="text-lg font-medium text-gray-900">
                          {formatDate(calendar.startDate)} -{" "}
                          {formatDate(calendar.endDate)}
                        </p>
                      </div>
                      <div className="h-px bg-gray-200" />
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">
                            Total Duration
                          </p>
                          <p className="text-lg font-medium text-gray-900">
                            42 Weeks
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">
                            Total Semesters
                          </p>
                          <p className="text-lg font-medium text-gray-900">2</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Semester Details */}
                <div className="space-y-6">
                  {/* First Semester */}
                  <Card className="bg-gradient-to-br from-green-50 to-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-100/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <CardContent className="p-6 relative">
                      <div className="flex items-center gap-3 mb-6">
                        <GraduationCap className="h-6 w-6 text-green-600" />
                        <h3 className="text-xl font-semibold text-gray-900">
                          First Semester
                        </h3>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-500">
                            Semester Duration
                          </p>
                          <p className="text-lg font-medium text-gray-900">
                            {formatDate(calendar.semester1StartDate)} -{" "}
                            {formatDate(calendar.semester1EndDate)}
                          </p>
                        </div>
                        <div className="h-px bg-gray-200" />
                        <div>
                          <p className="text-sm text-gray-500">
                            Registration Period
                          </p>
                          <p className="text-lg font-medium text-gray-900">
                            {formatDate(
                              calendar.semester1RegistrationStartDate
                            )}{" "}
                            -{" "}
                            {formatDate(calendar.semester1RegistrationEndDate)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Second Semester */}
                  <Card className="bg-gradient-to-br from-purple-50 to-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-100/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <CardContent className="p-6 relative">
                      <div className="flex items-center gap-3 mb-6">
                        <GraduationCap className="h-6 w-6 text-purple-600" />
                        <h3 className="text-xl font-semibold text-gray-900">
                          Second Semester
                        </h3>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-500">
                            Semester Duration
                          </p>
                          <p className="text-lg font-medium text-gray-900">
                            {formatDate(calendar.semester2StartDate)} -{" "}
                            {formatDate(calendar.semester2EndDate)}
                          </p>
                        </div>
                        <div className="h-px bg-gray-200" />
                        <div>
                          <p className="text-sm text-gray-500">
                            Registration Period
                          </p>
                          <p className="text-lg font-medium text-gray-900">
                            {formatDate(
                              calendar.semester2RegistrationStartDate
                            )}{" "}
                            -{" "}
                            {formatDate(calendar.semester2RegistrationEndDate)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Important Dates Timeline */}
              <Card className="mt-8 bg-gradient-to-br from-orange-50 to-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-100/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardContent className="p-6 relative">
                  <div className="flex items-center gap-3 mb-6">
                    <CalendarDays className="h-6 w-6 text-orange-600" />
                    <h3 className="text-xl font-semibold text-gray-900">
                      Important Dates Timeline
                    </h3>
                  </div>
                  <div className="space-y-6">
                    <div className="relative pl-8 before:absolute before:left-3 before:top-2 before:w-px before:h-full before:bg-orange-200">
                      {[
                        {
                          date: calendar.semester1RegistrationStartDate,
                          event: "First Semester Registration Begins",
                        },
                        {
                          date: calendar.semester1StartDate,
                          event: "First Semester Classes Begin",
                        },
                        {
                          date: calendar.semester1EndDate,
                          event: "First Semester Ends",
                        },
                        {
                          date: calendar.semester2RegistrationStartDate,
                          event: "Second Semester Registration Begins",
                        },
                        {
                          date: calendar.semester2StartDate,
                          event: "Second Semester Classes Begin",
                        },
                        {
                          date: calendar.semester2EndDate,
                          event: "Academic Year Ends",
                        },
                      ]
                        .sort((a, b) => {
                          if (!a.date || !b.date) return 0;
                          return (
                            new Date(a.date).getTime() -
                            new Date(b.date).getTime()
                          );
                        })
                        .map((item, index) => (
                          <div
                            key={index}
                            className="relative before:absolute before:left-[-1.67rem] before:top-2 before:w-3 before:h-3 before:bg-orange-500 before:rounded-full"
                          >
                            <p className="text-sm font-medium text-orange-600">
                              {formatDate(item.date)}
                            </p>
                            <p className="text-gray-900">{item.event}</p>
                          </div>
                        ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Divider between academic years */}
              {calendarIndex <
                (academicCalenders as AcademicCalender[]).length - 1 && (
                <div className="border-b border-gray-200 my-12 opacity-50" />
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
}

// Add these styles to your global CSS or use a styled-components approach
const styles = `
@keyframes expand {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

.animate-expand {
  animation: expand 0.5s ease-out forwards;
}
`;
