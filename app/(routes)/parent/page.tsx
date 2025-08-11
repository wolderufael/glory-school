"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { WalletCards } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  User,
  Book,
  School,
  Bell,
  Calendar,
  CreditCard,
  BarChart,
  FileText,
  MessageSquare,
  Settings,
  HelpCircle,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

interface ChildStudent {
  id: string;
  name: string;
  program: string;
  class: number;
  year: string;
  semester: string;
  profileImg?: string;
}

interface CourseResult {
  courseCode: string;
  courseName: string;
  creditHours: number;
  grade: string;
  points: number;
}

interface SemesterResult {
  semester: string;
  academicYear: string;
  gpa: number;
  courses: CourseResult[];
}

interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  category: string;
}

const demoChildren: ChildStudent[] = [
  {
    id: "stu-1001",
    name: "Abel Mekonnen",
    program: "Computer Science",
    class: 12,
    year: "1",
    semester: "1",
    profileImg: "/avatars/student1.jpg",
  },
  {
    id: "stu-1002",
    name: "Sena Kebede",
    program: "Civil Engineering",
    class: 12,
    year: "2",
    semester: "1",
    profileImg: "/avatars/student2.jpg",
  },
];

const demoResults: Record<string, SemesterResult[]> = {
  "stu-1001": [
    {
      semester: "Semester I",
      academicYear: "2024/25",
      gpa: 3.72,
      courses: [
        {
          courseCode: "CS101",
          courseName: "Introduction to Programming",
          creditHours: 3,
          grade: "A",
          points: 4.0,
        },
        {
          courseCode: "MATH101",
          courseName: "Calculus I",
          creditHours: 3,
          grade: "A-",
          points: 3.7,
        },
        {
          courseCode: "ENG101",
          courseName: "Communication Skills",
          creditHours: 2,
          grade: "B+",
          points: 3.3,
        },
      ],
    },
    {
      semester: "Semester II",
      academicYear: "2024/25",
      gpa: 3.85,
      courses: [
        {
          courseCode: "CS102",
          courseName: "Data Structures",
          creditHours: 3,
          grade: "A",
          points: 4.0,
        },
        {
          courseCode: "MATH102",
          courseName: "Calculus II",
          creditHours: 3,
          grade: "A",
          points: 4.0,
        },
        {
          courseCode: "PHYS101",
          courseName: "Physics I",
          creditHours: 3,
          grade: "A-",
          points: 3.7,
        },
      ],
    },
  ],
  "stu-1002": [
    {
      semester: "Semester I",
      academicYear: "2024/25",
      gpa: 3.41,
      courses: [
        {
          courseCode: "CE101",
          courseName: "Engineering Drawing",
          creditHours: 3,
          grade: "B+",
          points: 3.3,
        },
        {
          courseCode: "PHYS101",
          courseName: "Physics I",
          creditHours: 3,
          grade: "A-",
          points: 3.7,
        },
        {
          courseCode: "MATH101",
          courseName: "Calculus I",
          creditHours: 3,
          grade: "B",
          points: 3.0,
        },
      ],
    },
    {
      semester: "Semester II",
      academicYear: "2024/25",
      gpa: 3.67,
      courses: [
        {
          courseCode: "CE102",
          courseName: "Structural Analysis",
          creditHours: 3,
          grade: "A-",
          points: 3.7,
        },
        {
          courseCode: "MATH202",
          courseName: "Differential Equations",
          creditHours: 3,
          grade: "B+",
          points: 3.3,
        },
        {
          courseCode: "GE101",
          courseName: "Geology",
          creditHours: 2,
          grade: "A",
          points: 4.0,
        },
      ],
    },
  ],
};

const announcements: Announcement[] = [
  {
    id: "ann-1",
    title: "Parent-Teacher Conference",
    content:
      "Join us for the quarterly parent-teacher conference on September 15th at the school auditorium.",
    date: "2024-09-01",
    category: "event",
  },
  {
    id: "ann-2",
    title: "Tuition Payment Deadline",
    content:
      "The deadline for tuition payment for the first semester is September 10th. Late payments incur a 5% fee.",
    date: "2024-08-25",
    category: "finance",
  },
  {
    id: "ann-3",
    title: "New School Portal Features",
    content:
      "We've added new features to the parent portal including grade tracking and attendance reports.",
    date: "2024-08-20",
    category: "update",
  },
  {
    id: "ann-4",
    title: "Sports Day Event",
    content:
      "Annual sports day will be held on October 5th. All parents are welcome to attend and cheer for students.",
    date: "2024-09-10",
    category: "event",
  },
];

function getGradeColor(grade: string) {
  switch (grade) {
    case "A":
    case "A-":
      return "text-green-600";
    case "B+":
    case "B":
    case "B-":
      return "text-blue-600";
    case "C+":
    case "C":
      return "text-yellow-600";
    default:
      return "text-red-600";
  }
}

const ParentDashboardContent = () => {
  const params = useSearchParams();
  const parentIdFromQuery = params.get("parentId");
  const parentId = parentIdFromQuery || "101";

  const [selectedStudentId, setSelectedStudentId] = useState<string>(
    demoChildren[0].id
  );
  const [selectedSemester, setSelectedSemester] = useState<string>("");
  const [activeTab, setActiveTab] = useState("dashboard");

  const selectedStudent = useMemo(
    () =>
      demoChildren.find((c) => c.id === selectedStudentId) || demoChildren[0],
    [selectedStudentId]
  );

  const resultsForStudent = useMemo(
    () => demoResults[selectedStudentId] || [],
    [selectedStudentId]
  );

  const semesterResults = useMemo(() => {
    if (!selectedSemester && resultsForStudent.length > 0) {
      return resultsForStudent[0];
    }
    return resultsForStudent.find((sem) => sem.semester === selectedSemester);
  }, [selectedSemester, resultsForStudent]);

  const upcomingEvents = announcements
    .filter((a) => a.category === "event")
    .slice(0, 3);
  const importantAnnouncements = announcements
    .filter((a) => a.category !== "event")
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <section className="mb-10">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 shadow-xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Welcome to Your Parent Portal!
                </h2>
                <p className="text-blue-100 max-w-2xl">
                  Stay connected with your children's academic journey. Track
                  performance, receive updates, and support their education all
                  in one place.
                </p>
                <div className="mt-6 flex gap-4">
                  <Button className="bg-white text-blue-700 hover:bg-blue-50">
                    <Calendar className="h-4 w-4 mr-2" /> View Calendar
                  </Button>
                  <Button
                    variant="outline"
                    className="text-blue-80 border-white hover:bg-blue-700"
                  >
                    <HelpCircle className="h-4 w-4 mr-2" /> Help Center
                  </Button>
                </div>
              </div>
              <div className="mt-6 md:mt-0">
                <div className="bg-blue-800/30 rounded-lg p-4">
                  <p className="text-blue-100 text-sm">Quick Stats</p>
                  <div className="flex gap-6 mt-3">
                    <div className="text-center">
                      <p className="text-white text-2xl font-bold">2</p>
                      <p className="text-blue-100 text-xs">Students</p>
                    </div>
                    <div className="text-center">
                      <p className="text-white text-2xl font-bold">4.0</p>
                      <p className="text-blue-100 text-xs">Avg. GPA</p>
                    </div>
                    <div className="text-center">
                      <p className="text-white text-2xl font-bold">3</p>
                      <p className="text-blue-100 text-xs">Upcoming Events</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Linked Students */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2 text-blue-600" />
                    Your Linked Students
                  </CardTitle>
                  <Select
                    value={selectedStudentId}
                    onValueChange={setSelectedStudentId}
                  >
                    <SelectTrigger className="w-[250px]">
                      <SelectValue placeholder="Select a student" />
                    </SelectTrigger>
                    <SelectContent>
                      {demoChildren.map((child) => (
                        <SelectItem key={child.id} value={child.id}>
                          {child.name} • {child.program}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {demoChildren.map((child) => (
                    <Card
                      key={child.id}
                      className={`border rounded-xl transition-all duration-300 ${
                        child.id === selectedStudentId
                          ? "border-blue-500 shadow-lg ring-2 ring-blue-500/10"
                          : "border-gray-200 hover:shadow-md"
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start">
                          <Avatar className="h-14 w-14">
                            <AvatarImage src={child.profileImg} />
                            <AvatarFallback>
                              {child.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="ml-4 flex-1">
                            <h3 className="font-semibold text-lg">
                              {child.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {child.program}
                            </p>
                            <div className="flex items-center mt-2">
                              <Badge variant="secondary" className="mr-2">
                                Class {child.class}
                              </Badge>
                              <Badge variant="secondary">
                                Year {child.year} • Sem {child.semester}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-3 mt-4">
                          <Link href="/parent/result">
                            <Button size="sm">View Results</Button>
                          </Link>
                          <Link href={`/parent/payment?studentId=${child.id}`}>
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                            >
                              Pay Fees
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Upcoming Events */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                  Upcoming Events
                </CardTitle>
                <CardDescription>
                  Important dates and school activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div
                      key={event.id}
                      className="border-l-4 border-blue-500 pl-4 py-2"
                    >
                      <h4 className="font-semibold">{event.title}</h4>
                      <p className="text-sm text-gray-600">{event.content}</p>
                      <div className="flex items-center mt-1">
                        <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                        <span className="text-xs text-gray-500">
                          {new Date(event.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-2">
                    View Full Calendar
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Announcements */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2 text-blue-600" />
                  School Announcements
                </CardTitle>
                <CardDescription>
                  Latest updates from the school administration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {importantAnnouncements.map((ann) => (
                    <div key={ann.id} className="p-4 bg-slate-50 rounded-lg">
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold">{ann.title}</h4>
                        <Badge variant="secondary" className="ml-2">
                          {ann.category === "finance" ? "Finance" : "Update"}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {ann.content}
                      </p>
                      <div className="mt-2 text-xs text-gray-500">
                        {new Date(ann.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                  ))}
                  <Button variant="ghost" className="w-full text-blue-600">
                    View All Announcements
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

const ParentDashboard = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 p-6 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading dashboard...</p>
          </div>
        </div>
      }
    >
      <ParentDashboardContent />
    </Suspense>
  );
};

export default ParentDashboard;
