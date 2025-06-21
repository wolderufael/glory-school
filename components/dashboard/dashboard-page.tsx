"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BarChart3,
  ArrowLeft,
  Calendar,
  BookOpen,
  Clock,
  TrendingUp,
  Award,
  Bell,
  Download,
  FileText,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

export default function DashboardPage() {
  const courses = [
    {
      name: "Agricultural Engineering",
      code: "AGRE 301",
      progress: 75,
      grade: "A-",
      nextClass: "Today, 2:00 PM",
      status: "active",
    },
    {
      name: "Plant Pathology",
      code: "PLPA 205",
      progress: 60,
      grade: "B+",
      nextClass: "Tomorrow, 10:00 AM",
      status: "active",
    },
    {
      name: "Soil Science",
      code: "SOIL 102",
      progress: 90,
      grade: "A",
      nextClass: "Friday, 9:00 AM",
      status: "completed",
    },
  ]

  const assignments = [
    {
      title: "Research Paper on Sustainable Farming",
      course: "Agricultural Engineering",
      dueDate: "2024-03-25",
      status: "pending",
      priority: "high",
    },
    {
      title: "Lab Report - Soil Analysis",
      course: "Soil Science",
      dueDate: "2024-03-22",
      status: "submitted",
      priority: "medium",
    },
    {
      title: "Plant Disease Identification",
      course: "Plant Pathology",
      dueDate: "2024-03-28",
      status: "pending",
      priority: "low",
    },
  ]

  const recentActivities = [
    {
      action: "Grade posted",
      course: "Soil Science",
      time: "2 hours ago",
      type: "grade",
    },
    {
      action: "New assignment",
      course: "Agricultural Engineering",
      time: "1 day ago",
      type: "assignment",
    },
    {
      action: "Class cancelled",
      course: "Plant Pathology",
      time: "2 days ago",
      type: "announcement",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Dashboard</h1>
              <p className="text-gray-600">Welcome back, John! Here's your academic overview</p>
            </div>
            <BarChart3 className="h-8 w-8 text-blue-600" />
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          {[
            { title: "Current GPA", value: "3.85", icon: Award, color: "text-green-600", bg: "bg-green-50" },
            { title: "Credits Earned", value: "45/120", icon: BookOpen, color: "text-blue-600", bg: "bg-blue-50" },
            { title: "Attendance", value: "94%", icon: Calendar, color: "text-purple-600", bg: "bg-purple-50" },
            { title: "Assignments Due", value: "3", icon: Clock, color: "text-orange-600", bg: "bg-orange-50" },
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-full ${stat.bg}`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Current Courses */}
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                    Current Courses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {courses.map((course, index) => (
                      <div key={index} className="p-4 border rounded-lg hover:bg-blue-50 transition-colors">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-gray-900">{course.name}</h3>
                            <p className="text-sm text-gray-600">{course.code}</p>
                          </div>
                          <div className="text-right">
                            <Badge variant={course.status === "active" ? "default" : "secondary"}>
                              Grade: {course.grade}
                            </Badge>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                          <p className="text-sm text-gray-600">Next class: {course.nextClass}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Assignments */}
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-blue-600" />
                    Upcoming Assignments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {assignments.map((assignment, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{assignment.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">{assignment.course}</p>
                            <p className="text-sm text-gray-500 mt-1">Due: {assignment.dueDate}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={assignment.status === "submitted" ? "secondary" : "destructive"}>
                              {assignment.status}
                            </Badge>
                            <Badge variant="outline">{assignment.priority}</Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { name: "View Grades", icon: TrendingUp, href: "/grades" },
                    { name: "Class Schedule", icon: Calendar, href: "/schedule" },
                    { name: "Download Transcript", icon: Download, href: "/transcript" },
                    { name: "Course Catalog", icon: BookOpen, href: "/catalog" },
                  ].map((action, index) => (
                    <motion.div key={action.name} whileHover={{ x: 5 }}>
                      <Link
                        href={action.href}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 transition-colors group"
                      >
                        <div className="flex items-center space-x-3">
                          <action.icon className="h-5 w-5 text-blue-600" />
                          <span className="text-gray-700 group-hover:text-blue-600">{action.name}</span>
                        </div>
                        <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600" />
                      </Link>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Bell className="h-5 w-5 mr-2" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-2">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${
                          activity.type === "grade"
                            ? "bg-green-500"
                            : activity.type === "assignment"
                              ? "bg-blue-500"
                              : "bg-orange-500"
                        }`}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-600">{activity.course}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Performance Chart */}
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-600 to-blue-700 text-white">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Academic Performance
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-blue-100">This Semester</span>
                      <span className="font-bold">3.85 GPA</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-100">Overall</span>
                      <span className="font-bold">3.72 GPA</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-100">Class Rank</span>
                      <span className="font-bold">15/120</span>
                    </div>
                    <div className="mt-4 p-3 bg-white/10 rounded-lg">
                      <p className="text-sm text-blue-100">🎉 Great job! You're in the top 15% of your class.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
