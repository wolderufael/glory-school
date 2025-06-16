"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Building2,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import Link from "next/link";
//import AcceptedStudents from "./acceptedStudents/AcceptedStudents";
import { useNotice } from "@/lib/react-query/hooks/useNotice";
import {
  formatDate,
  formatDateTime,
  isDeadlineSoon,
  isOverdue,
} from "@/utils/noticeUtils";
import { Badge } from "../ui/badge";
import { NoticeBoardTab } from "./tabs/NoticeBoardTab";
import AcceptedStudentsTab from "./tabs/AcceptedStudentsTab";
import AcademicCalenderTab from "./tabs/AcademicCakenderTab";
import { ProgramsTab } from "./tabs/CourseTab";
import { DepartmentsTab } from "./tabs/DepartmentsTab";

export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: notices, isLoading, error } = useNotice({});
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
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-[#0a2b5e] overflow-hidden mt-0 pt-8">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] -top-24 sm:-top-32 md:-top-48 -left-12 sm:-left-16 md:-left-24 bg-gradient-to-r from-blue-700 to-blue-400 rounded-full mix-blend-multiply opacity-60 animate-blob1" />
          <div className="absolute w-[250px] sm:w-[300px] md:w-[400px] h-[250px] sm:h-[300px] md:h-[400px] -bottom-16 sm:-bottom-24 md:-bottom-32 left-24 sm:left-32 md:left-48 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full mix-blend-multiply opacity-60 animate-blob2" />
          <div className="absolute w-[350px] sm:w-[450px] md:w-[600px] h-[350px] sm:h-[450px] md:h-[600px] -right-24 sm:-right-32 md:-right-48 -bottom-24 sm:-bottom-32 md:-bottom-48 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-full mix-blend-multiply opacity-60 animate-blob3" />
          {/* Animated lines */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.15) 0%, transparent 15%)",
            }}
          >
            <div className="absolute inset-0 bg-grid-white/[0.08] bg-grid animate-grid" />
          </div>
        </div>

        {/* Content */}
        <div className="relative pt-0 pb-8 sm:pb-12 md:pb-16">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center px-4 sm:px-6 lg:px-8">
            <div className="space-y-4 sm:space-y-6 text-center lg:text-left">
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <School className="h-8 w-8 sm:h-10 sm:w-10 text-blue-400" />
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                  Wolaita Sodo Agricultural College
                </h1>
              </div>
              <p className="text-lg sm:text-xl text-blue-200 max-w-2xl mx-auto lg:mx-0">
                Empowering the next generation of agricultural leaders through
                excellence in education
              </p>
              <div className="relative">
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  1,200+
                </div>
                <div className="text-sm sm:text-base text-blue-200 mt-1">
                  Students Enrolled
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute -top-8 -right-8 w-72 h-72 bg-blue-500/20 rounded-full blur-2xl" />
                <div className="relative bg-white/10 backdrop-blur-lg p-6 rounded-lg shadow-2xl border border-white/10">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <GraduationCap className="h-6 w-6 text-blue-400" />
                      <h3 className="text-lg font-semibold text-white">
                        Quick Access
                      </h3>
                    </div>
                    <div className="space-y-2">
                      <Link
                        href="/auth/login"
                        className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 text-blue-100 backdrop-blur-sm transition-all duration-300"
                      >
                        Student Portal
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      <Link
                        href="/auth/login"
                        className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 text-blue-100 backdrop-blur-sm transition-all duration-300"
                      >
                        Teacher Portal
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      <Link
                        href="/auth/login"
                        className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 text-blue-100 backdrop-blur-sm transition-all duration-300"
                      >
                        Registrar Portal
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Mobile Quick Access */}
            <div className="lg:hidden">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link
                  href="/auth/login"
                  className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 text-blue-100 backdrop-blur-sm transition-all duration-300"
                >
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    <span>Student</span>
                  </div>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/auth/login"
                  className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 text-blue-100 backdrop-blur-sm transition-all duration-300"
                >
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    <span>Teacher</span>
                  </div>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/auth/login"
                  className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 text-blue-100 backdrop-blur-sm transition-all duration-300"
                >
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    <span>Registrar</span>
                  </div>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      {/*       <div className="bg-white border-b">
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
      </div> */}

      {/* Main Content */}
      <div className="px-4 py-12">
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
            {/*             <TabsTrigger
              value="courses"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg px-6 py-2.5"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Programs
            </TabsTrigger> */}
            <TabsTrigger
              value="departments"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg px-6 py-2.5"
            >
              <Users className="h-4 w-4 mr-2" />
              Programs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="notice-board">
            <NoticeBoardTab />
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
                <AcceptedStudentsTab />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar">
            <AcademicCalenderTab />
          </TabsContent>

          <TabsContent value="courses">
            <ProgramsTab />
          </TabsContent>

          <TabsContent value="departments">
            <DepartmentsTab />
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer Section */}
      <div className="relative bg-[#0a2b5e] overflow-hidden px-4">
        {/* Animated background elements - same as hero but adjusted sizes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] -top-24 sm:-top-32 md:-top-48 -left-12 sm:-left-16 md:-left-24 bg-gradient-to-r from-blue-700 to-blue-400 rounded-full mix-blend-multiply opacity-60 animate-blob1" />
          <div className="absolute w-[250px] sm:w-[300px] md:w-[400px] h-[250px] sm:h-[300px] md:h-[400px] -bottom-16 sm:-bottom-24 md:-bottom-32 left-24 sm:left-32 md:left-48 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full mix-blend-multiply opacity-60 animate-blob2" />
          <div className="absolute w-[350px] sm:w-[450px] md:w-[600px] h-[350px] sm:h-[450px] md:h-[600px] -right-24 sm:-right-32 md:-right-48 -bottom-24 sm:-bottom-32 md:-bottom-48 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-full mix-blend-multiply opacity-60 animate-blob3" />
          {/* Animated lines */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.15) 0%, transparent 15%)",
            }}
          >
            <div className="absolute inset-0 bg-grid-white/[0.08] bg-grid animate-grid" />
          </div>
        </div>

        {/* Footer Content */}
        <div className="relative px-0 py-8 sm:py-10 md:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg sm:text-xl font-semibold text-white">
                Contact Us
              </h3>
              <div className="space-y-2 text-sm sm:text-base text-blue-100">
                <p>Wolaita Sodo Agricultural College</p>
                <p>Wolaita Sodo, Ethiopia</p>
                <p>Email: info@wsac.edu.et</p>
                <p>Phone: +251 123 456 789</p>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg sm:text-xl font-semibold text-white">
                Quick Links
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-1 gap-2">
                <Link
                  href="/about"
                  className="text-sm sm:text-base text-blue-100 hover:text-white transition-colors"
                >
                  About Us
                </Link>
                <Link
                  href="/programs"
                  className="text-sm sm:text-base text-blue-100 hover:text-white transition-colors"
                >
                  Academic Programs
                </Link>
                <Link
                  href="/admissions"
                  className="text-sm sm:text-base text-blue-100 hover:text-white transition-colors"
                >
                  Admissions
                </Link>
                <Link
                  href="/contact"
                  className="text-sm sm:text-base text-blue-100 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg sm:text-xl font-semibold text-white">
                Follow Us
              </h3>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="#"
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  <Facebook className="h-5 w-5 sm:h-6 sm:w-6" />
                </Link>
                <Link
                  href="#"
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  <Twitter className="h-5 w-5 sm:h-6 sm:w-6" />
                </Link>
                <Link
                  href="#"
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  <Instagram className="h-5 w-5 sm:h-6 sm:w-6" />
                </Link>
                <Link
                  href="#"
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  <Linkedin className="h-5 w-5 sm:h-6 sm:w-6" />
                </Link>
              </div>
              <p className="text-sm sm:text-base text-blue-100">
                Stay connected with us on social media
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-blue-400/20">
            <p className="text-center text-sm sm:text-base text-blue-100">
              © {new Date().getFullYear()} Wolaita Sodo Agricultural College.
              All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
