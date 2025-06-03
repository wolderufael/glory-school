"use client"

import { useState } from "react"
import {
  BookOpen,
  Calendar,
  CreditCard,
  FileText,
  GraduationCap,
  Home,
  MapPin,
  TrendingUp,
  User,
  Users,
  Award,
  DollarSign,
  Download,
  Star,
  AlertCircle,
  CheckCircle,
  Building,
  Briefcase,
  School,
  UserCheck,
  ClipboardList,
  BarChart3,
} from "lucide-react"
import { DashboardHeader } from "./dashboard-header"
import { DashboardContent } from "./dashboard-content"

const navigationItems = [
  {
    title: "Academic",
    items: [
      { title: "Dashboard", icon: Home, url: "#", isActive: true },
      { title: "Course Registration", icon: BookOpen, url: "#" },
      { title: "Academic Records", icon: FileText, url: "#" },
      { title: "Grades & Transcripts", icon: Award, url: "#" },
      { title: "Class Schedule", icon: Calendar, url: "#" },
      { title: "Assignments", icon: ClipboardList, url: "#" },
    ],
  },
  {
    title: "Student Services",
    items: [
      { title: "Profile Management", icon: User, url: "#" },
      { title: "Dormitory", icon: Building, url: "#" },
      { title: "Library Services", icon: BookOpen, url: "#" },
      { title: "Health Services", icon: UserCheck, url: "#" },
      { title: "Counseling", icon: Users, url: "#" },
    ],
  },
  {
    title: "Financial",
    items: [
      { title: "Billing & Payments", icon: CreditCard, url: "#" },
      { title: "Financial Aid", icon: DollarSign, url: "#" },
      { title: "Scholarships", icon: Star, url: "#" },
      { title: "Fee Structure", icon: BarChart3, url: "#" },
    ],
  },
  {
    title: "Career & Placement",
    items: [
      { title: "Job Opportunities", icon: Briefcase, url: "#" },
      { title: "Internships", icon: TrendingUp, url: "#" },
      { title: "Career Counseling", icon: School, url: "#" },
      { title: "Alumni Network", icon: Users, url: "#" },
    ],
  },
  {
    title: "Administrative",
    items: [
      { title: "Document Requests", icon: Download, url: "#" },
      { title: "Clearances", icon: CheckCircle, url: "#" },
      { title: "Transfers", icon: MapPin, url: "#" },
      { title: "Readmissions", icon: GraduationCap, url: "#" },
    ],
  },
]

const recentActivities = [
  {
    id: 1,
    type: "grade",
    title: "New Grade Posted",
    description: "History of Ethiopia - Grade: A",
    time: "2 hours ago",
    icon: Award,
    color: "text-green-600",
  },
  {
    id: 2,
    type: "assignment",
    title: "Assignment Due Soon",
    description: "Engineering Mathematics - Due in 2 days",
    time: "5 hours ago",
    icon: AlertCircle,
    color: "text-amber-600",
  },
  {
    id: 3,
    type: "payment",
    title: "Payment Reminder",
    description: "Semester fee payment due next week",
    time: "1 day ago",
    icon: CreditCard,
    color: "text-red-600",
  },
  {
    id: 4,
    type: "event",
    title: "Campus Event",
    description: "Annual Tech Symposium registration open",
    time: "2 days ago",
    icon: Calendar,
    color: "text-blue-600",
  },
]

const upcomingEvents = [
  {
    id: 1,
    title: "Midterm Examinations",
    date: "June 15-22, 2025",
    type: "Academic",
    color: "bg-red-100 text-red-800",
  },
  {
    id: 2,
    title: "Career Fair",
    date: "June 25, 2025",
    type: "Career",
    color: "bg-blue-100 text-blue-800",
  },
  {
    id: 3,
    title: "Alumni Meetup",
    date: "July 5, 2025",
    type: "Social",
    color: "bg-green-100 text-green-800",
  },
]

const quickStats = [
  {
    title: "Current GPA",
    value: "3.85",
    change: "+0.12",
    icon: TrendingUp,
    color: "text-green-600",
  },
  {
    title: "Credits Completed",
    value: "84/120",
    change: "70%",
    icon: BookOpen,
    color: "text-blue-600",
  },
  {
    title: "Attendance Rate",
    value: "94%",
    change: "+2%",
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    title: "Outstanding Balance",
    value: "$1,250",
    change: "-$500",
    icon: DollarSign,
    color: "text-red-600",
  },
]

export default function StudentPortal() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-rose-50">
      <SidebarProvider>
        <AppSidebar />
        <div className="flex-1">
          <DashboardHeader />
          <DashboardContent />
        </div>
      </SidebarProvider>
    </div>
  )
}
