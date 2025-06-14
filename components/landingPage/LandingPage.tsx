"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Bell,
  Calendar,
  BookOpen,
  Users,
  ChevronRight,
  GraduationCap,
  School,
  FileText,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import AcceptedStudents from "./acceptedStudents/AcceptedStudents";
import { useNotice } from "@/lib/react-query/hooks/useNotice";

export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: notices, isLoading, error } = useNotice({});
  /*   const announcements = [
    {
      id: 1,
      title: "Registration Deadline Extended",
      date: "2024-03-15",
      content:
        "The deadline for course registration has been extended to March 20th, 2024.",
      type: "Important",
    },
    {
      id: 2,
      title: "New Department Heads Appointed",
      date: "2024-03-14",
      content:
        "Please welcome our newly appointed department heads for the academic year 2024.",
      type: "Announcement",
    },
    {
      id: 3,
      title: "Campus Maintenance Notice",
      date: "2024-03-13",
      content:
        "The main library will be closed for maintenance from March 16-17.",
      type: "Notice",
    },
  ]; */

  const upcomingEvents = [
    {
      id: 1,
      title: "Student Orientation",
      date: "2024-03-20",
      time: "9:00 AM",
    },
    {
      id: 2,
      title: "Faculty Meeting",
      date: "2024-03-22",
      time: "2:00 PM",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <School className="h-10 w-10" />
                <h1 className="text-3xl font-bold">
                  Wolaita Sodo Agricultural College
                </h1>
              </div>
              <p className="text-xl text-blue-100">
                Empowering the next generation of agricultural leaders through
                excellence in education
              </p>
              <div className="flex gap-4">
                <Button className="bg-white text-blue-600 hover:bg-blue-50">
                  Apply Now
                </Button>
                <Button
                  variant="outline"
                  className="text-white border-white hover:bg-white/10"
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute -top-8 -right-8 w-72 h-72 bg-blue-500 rounded-full opacity-20"></div>
                <div className="relative bg-white p-6 rounded-lg shadow-xl">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <GraduationCap className="h-6 w-6 text-blue-600" />
                      <h3 className="text-lg font-semibold text-gray-900">
                        Quick Access
                      </h3>
                    </div>
                    <div className="space-y-2">
                      <Link
                        href="/auth/login"
                        className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700"
                      >
                        Student Portal
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      <Link
                        href="/faculty-portal"
                        className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700"
                      >
                        Faculty Portal
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      <Link
                        href="/research"
                        className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700"
                      >
                        Research Center
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">1,200+</div>
              <div className="text-sm text-gray-600 mt-1">
                Students Enrolled
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">95%</div>
              <div className="text-sm text-gray-600 mt-1">
                Graduate Employment
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">50+</div>
              <div className="text-sm text-gray-600 mt-1">
                Research Projects
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">25</div>
              <div className="text-sm text-gray-600 mt-1">
                Partner Institutions
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue="notice-board" className="space-y-8">
          <TabsList className="bg-white border rounded-xl p-1 shadow-sm">
            <TabsTrigger
              value="notice-board"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg px-6 py-2.5"
            >
              <Bell className="h-4 w-4 mr-2" />
              Notice Board
            </TabsTrigger>
            <TabsTrigger
              value="accepted-students"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg px-6 py-2.5"
            >
              <GraduationCap className="h-4 w-4 mr-2" />
              Accepted Students
            </TabsTrigger>
            <TabsTrigger
              value="calendar"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg px-6 py-2.5"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Academic Calendar
            </TabsTrigger>
            <TabsTrigger
              value="courses"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg px-6 py-2.5"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Programs
            </TabsTrigger>
            <TabsTrigger
              value="departments"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg px-6 py-2.5"
            >
              <Users className="h-4 w-4 mr-2" />
              Departments
            </TabsTrigger>
          </TabsList>

          <TabsContent value="notice-board">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Latest Announcements
                  </h2>
                  <Button
                    variant="outline"
                    className="text-blue-600 border-blue-600 hover:bg-blue-50"
                  >
                    View All
                  </Button>
                </div>
                {notices?.map((announcement) => (
                  <Card
                    key={announcement.college_id}
                    className="hover:shadow-lg transition-shadow border-0 shadow-sm"
                  >
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <h3 className="text-lg font-medium text-gray-900">
                              {announcement.message}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {announcement.deadline}
                            </p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${
                              announcement.is_active
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {announcement.is_active ? "Active" : "Inactive"}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            Deadline:{" "}
                            {new Date(
                              announcement.deadline
                            ).toLocaleDateString()}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="ml-auto text-blue-600 hover:text-blue-700"
                          >
                            Read More <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="space-y-6">
                <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-600 to-blue-700 text-white">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">
                      Important Links
                    </h3>
                    <div className="space-y-3">
                      <Link
                        href="/admissions"
                        className="flex items-center justify-between p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                      >
                        Admissions
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      <Link
                        href="/library"
                        className="flex items-center justify-between p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                      >
                        Library Resources
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      <Link
                        href="/research"
                        className="flex items-center justify-between p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                      >
                        Research Publications
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Upcoming Events
                    </h3>
                    <div className="space-y-4">
                      {upcomingEvents.map((event) => (
                        <div key={event.id} className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-14 h-14 bg-blue-50 rounded-lg flex flex-col items-center justify-center">
                            <span className="text-sm font-medium text-blue-600">
                              {new Date(event.date).toLocaleDateString(
                                "en-US",
                                { month: "short" }
                              )}
                            </span>
                            <span className="text-lg font-bold text-blue-700">
                              {new Date(event.date).getDate()}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">
                              {event.title}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {event.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="accepted-students">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900">
                      Accepted Students
                    </h2>
                    <p className="text-gray-600 mt-1">
                      View the list of accepted students and their details
                    </p>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <FileText className="h-4 w-4 mr-2" />
                    Download List
                  </Button>
                </div>
                <AcceptedStudents />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Academic Calendar
                </h2>
                <div className="prose max-w-none">
                  <p className="text-gray-600">
                    View important academic dates, schedules, and deadlines for
                    the current academic year.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="courses">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Academic Programs
                </h2>
                <div className="prose max-w-none">
                  <p className="text-gray-600">
                    Explore our comprehensive range of undergraduate and
                    graduate programs in agricultural sciences.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="departments">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Our Departments
                </h2>
                <div className="prose max-w-none">
                  <p className="text-gray-600">
                    Learn about our specialized departments and their
                    contributions to agricultural education and research.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                About Us
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Our History
                  </Link>
                </li>
                <li>
                  <Link
                    href="/mission"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Mission & Vision
                  </Link>
                </li>
                <li>
                  <Link
                    href="/leadership"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Leadership
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                Academics
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link
                    href="/programs"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Programs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/research"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Research
                  </Link>
                </li>
                <li>
                  <Link
                    href="/library"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Library
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                Student Life
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link
                    href="/housing"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Housing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/activities"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Activities
                  </Link>
                </li>
                <li>
                  <Link
                    href="/support"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Support Services
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                Contact
              </h3>
              <ul className="mt-4 space-y-2">
                <li className="text-gray-600">123 College Road</li>
                <li className="text-gray-600">Wolaita Sodo, Ethiopia</li>
                <li className="text-gray-600">contact@wsac.edu.et</li>
                <li className="text-gray-600">+251 123 456 789</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-200 pt-8">
            <p className="text-sm text-gray-600 text-center">
              © {new Date().getFullYear()} Wolaita Sodo Agricultural College.
              All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
