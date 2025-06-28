"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Calendar, CalendarDays, GraduationCap } from "lucide-react";
import {
  useAcademicCalender,
  AcademicCalender,
} from "@/lib/react-query/hooks/useAcademicCalender";
import { useEffect, useState } from "react";
import StatusManagement from "./StatusManagement";

const formatDate = (dateString: string | undefined) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default function AcademicCalenderTab() {
  const {
    data: academicCalenders,
    isLoading,
    error,
    refetch,
  } = useAcademicCalender();
  const [currentAcademicYearId, setCurrentAcademicYearId] = useState<
    string | null
  >(
    typeof window !== "undefined"
      ? localStorage.getItem("academicYearId")
      : null
  );

  useEffect(() => {
    // Function to handle storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "academicYearId") {
        setCurrentAcademicYearId(e.newValue);
        refetch();
      }
    };

    // Function to check local storage directly
    const checkLocalStorage = () => {
      const storedId = localStorage.getItem("academicYearId");
      if (storedId !== currentAcademicYearId) {
        setCurrentAcademicYearId(storedId);
        refetch();
      }
    };

    // Add event listeners
    window.addEventListener("storage", handleStorageChange);
    // Check periodically for changes within the same tab
    const interval = setInterval(checkLocalStorage, 1000);

    // Initial check
    checkLocalStorage();

    // Cleanup
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, [currentAcademicYearId, refetch]);

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
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <h2 className="text-3xl font-bold text-gray-900 relative">
                      {calendar.name} Academic Year
                      <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-green-500 rounded-full transform scale-x-0 animate-expand" />
                    </h2>
                    {/* Academic Year Status */}
                    <div className="flex items-center gap-2">
                      <div
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold shadow-lg transition-all duration-300 ${
                          calendar.status === "OPEN"
                            ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white animate-pulse"
                            : "bg-gradient-to-r from-red-500 to-rose-500 text-white"
                        }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${
                            calendar.status === "OPEN" ? "bg-white" : "bg-white"
                          } animate-ping`}
                        />
                        {calendar.status === "OPEN" ? "Open" : "Closed"}
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Important academic dates and deadlines for students and
                  faculty members.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Status Management */}
                <div className="lg:col-span-1">
                  <StatusManagement
                    academicYearId={calendar.id}
                    academicYearStatus={calendar.status}
                    semesters={calendar.semesters}
                  />
                </div>

                {/* Academic Year Overview */}
                <Card className="lg:col-span-2 bg-gradient-to-br from-blue-50 to-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden group">
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
                      <div className="h-px bg-gray-200" />
                      {/* Semester Status Overview */}
                      <div>
                        <p className="text-sm text-gray-500 mb-3">
                          Semester Status
                        </p>
                        <div className="flex gap-3">
                          {calendar.semesters.map((semester, index) => (
                            <div
                              key={semester.id}
                              className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
                                semester.status === "OPEN"
                                  ? "bg-green-50 border-green-200"
                                  : semester.status === "UPCOMING"
                                  ? "bg-blue-50 border-blue-200"
                                  : "bg-gray-50 border-gray-200"
                              }`}
                            >
                              <div
                                className={`w-2 h-2 rounded-full ${
                                  semester.status === "OPEN"
                                    ? "bg-green-500 animate-pulse"
                                    : semester.status === "UPCOMING"
                                    ? "bg-blue-500 animate-pulse"
                                    : "bg-gray-400 opacity-60"
                                }`}
                              />
                              <span
                                className={`text-sm font-medium ${
                                  semester.status === "OPEN"
                                    ? "text-green-700"
                                    : semester.status === "UPCOMING"
                                    ? "text-blue-700"
                                    : "text-gray-600"
                                }`}
                              >
                                Sem {semester.name}: {semester.status}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Semester Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {calendar.semesters.map((semester, index) => {
                  const isFirstSemester = semester.name === "I";
                  const cardColorClass = isFirstSemester
                    ? "bg-gradient-to-br from-green-50 to-white"
                    : "bg-gradient-to-br from-purple-50 to-white";
                  const iconColorClass = isFirstSemester
                    ? "text-green-600"
                    : "text-purple-600";
                  const statusColorClass =
                    semester.status === "OPEN"
                      ? isFirstSemester
                        ? "bg-gradient-to-r from-green-400 to-green-500 text-white"
                        : "bg-gradient-to-r from-purple-400 to-purple-500 text-white"
                      : semester.status === "UPCOMING"
                      ? "bg-gradient-to-r from-blue-400 to-blue-500 text-white"
                      : "bg-gradient-to-r from-gray-400 to-gray-500 text-white";

                  return (
                    <Card
                      key={semester.id}
                      className={`${cardColorClass} border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden group`}
                    >
                      <div
                        className={`absolute inset-0 ${
                          isFirstSemester
                            ? "bg-gradient-to-r from-green-100/20"
                            : "bg-gradient-to-r from-purple-100/20"
                        } to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                      />
                      <CardContent className="p-6 relative">
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-3">
                            <GraduationCap
                              className={`h-6 w-6 ${iconColorClass}`}
                            />
                            <h3 className="text-xl font-semibold text-gray-900">
                              {semester.name === "I"
                                ? "First"
                                : semester.name === "II"
                                ? "Second"
                                : `Semester ${semester.name}`}{" "}
                              Semester
                            </h3>
                          </div>
                          <div
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-md transition-all duration-300 ${statusColorClass}`}
                          >
                            <div
                              className={`w-1.5 h-1.5 rounded-full ${
                                semester.status === "OPEN" ||
                                semester.status === "UPCOMING"
                                  ? "bg-white animate-pulse"
                                  : "bg-white opacity-60"
                              }`}
                            />
                            {semester.status}
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm text-gray-500">
                              Semester Duration
                            </p>
                            <p className="text-lg font-medium text-gray-900">
                              {formatDate(semester.startDate)} -{" "}
                              {formatDate(semester.endDate)}
                            </p>
                          </div>
                          <div className="h-px bg-gray-200" />
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <p className="text-sm text-gray-500">
                                Registration Period
                              </p>
                              <div
                                className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${
                                  semester.status === "OPEN"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-red-100 text-red-700"
                                }`}
                              >
                                <div
                                  className={`w-1 h-1 rounded-full ${
                                    semester.status === "OPEN"
                                      ? "bg-blue-500"
                                      : "bg-red-500"
                                  }`}
                                />
                                Registration{" "}
                                {semester.status === "OPEN" ? "Open" : "Closed"}
                              </div>
                            </div>
                            <p className="text-lg font-medium text-gray-900">
                              {formatDate(semester.registrationStartDate)} -{" "}
                              {formatDate(semester.registrationEndDate)}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Important Dates Timeline */}
{/*               <Card className="mt-8 bg-gradient-to-br from-orange-50 to-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden group">
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
                      {calendar.semesters.flatMap((semester) => {
                        const semesterName = semester.name === "I" ? "First" : semester.name === "II" ? "Second" : `Semester ${semester.name}`;
                        return [
                          {
                            date: semester.registrationStartDate,
                            event: `${semesterName} Semester Registration Begins`,
                          },
                          {
                            date: semester.startDate,
                            event: `${semesterName} Semester Classes Begin`,
                          },
                          {
                            date: semester.endDate,
                            event: `${semesterName} Semester Ends`,
                          },
                        ];
                      }).concat([
                        {
                          date: calendar.endDate,
                          event: "Academic Year Ends",
                        },
                      ])}
                        .sort((a, b) => {
                          if (!a.date || !b.date) return 0;
                          return (
                            new Date(a.date).getTime() -
                            new Date(b.date).getTime()
                          );
                        })
                        .map((timelineItem, timelineIndex) => (
                          <div
                            key={timelineIndex}
                            className="relative before:absolute before:left-[-1.67rem] before:top-2 before:w-3 before:h-3 before:bg-orange-500 before:rounded-full"
                          >
                            <p className="text-sm font-medium text-orange-600">
                              {formatDate(timelineItem.date)}
                            </p>
                            <p className="text-gray-900">{timelineItem.event}</p>
                          </div>
                        ))}
                    </div>
                  </div>
                </CardContent>
              </Card> */}

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
