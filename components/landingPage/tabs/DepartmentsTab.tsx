"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Users,
  ArrowLeft,
  Stethoscope,
  BookOpen,
  Leaf,
  Droplets,
  TreePine,
  Dog,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Building2,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Department {
  id: number;
  collegeId: number;
  name: string;
  code: string;
  createdAt: string;
}

// Map of department codes to icons and colors for a high school
const departmentConfig = {
  MTH: {
    icon: BookOpen,
    color: "blue",
    fullName: "Mathematics",
    description: "Algebra, geometry, and advanced problem-solving",
  },
  SCI: {
    icon: Droplets,
    color: "green",
    fullName: "Science",
    description: "Biology, chemistry, and physics fundamentals",
  },
  ENG: {
    icon: BookOpen,
    color: "purple",
    fullName: "English Language",
    description: "Reading, writing, and communication skills",
  },
  SOC: {
    icon: Building2,
    color: "yellow",
    fullName: "Social Studies",
    description: "History, civics, and geography",
  },
  ICT: {
    icon: Phone,
    color: "cyan",
    fullName: "ICT",
    description: "Computer literacy, coding, and digital citizenship",
  },
  ART: {
    icon: Leaf,
    color: "emerald",
    fullName: "Arts",
    description: "Visual arts, music, and performing arts",
  },
} as const;

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export default function DepartmentsPage() {
  const [departments] = useState<Department[]>([
    {
      id: 1,
      collegeId: 0,
      name: "Mathematics",
      code: "MTH",
      createdAt: "2024-01-01",
    },
    {
      id: 2,
      collegeId: 0,
      name: "Science",
      code: "SCI",
      createdAt: "2024-01-01",
    },
    {
      id: 3,
      collegeId: 0,
      name: "English Language",
      code: "ENG",
      createdAt: "2024-01-01",
    },
    {
      id: 4,
      collegeId: 0,
      name: "Social Studies",
      code: "SOC",
      createdAt: "2024-01-01",
    },
    { id: 5, collegeId: 0, name: "ICT", code: "ICT", createdAt: "2024-01-01" },
    { id: 6, collegeId: 0, name: "Arts", code: "ART", createdAt: "2024-01-01" },
  ]);

  const departmentStats = [
    {
      title: "Departments",
      value: departments.length.toString(),
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Teachers",
      value: "85",
      icon: BookOpen,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      title: "Students Enrolled",
      value: "2000+",
      icon: Stethoscope,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Our Departments
              </h1>
              <p className="text-gray-600">
                Explore our high school departments and subject areas that build
                a strong academic foundation
              </p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </motion.div>

        {/* Department Stats */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          {departmentStats.map((stat, index) => (
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
                      <p className="text-2xl font-bold text-gray-900">
                        {stat.value}
                      </p>
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

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            {/* Departments Grid */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Academic Departments
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {departments.length === 0 ? (
                  // Loading skeletons
                  [...Array(6)].map((_, i) => (
                    <Card key={i} className="border-0 shadow-lg">
                      <CardContent className="p-6">
                        <Skeleton className="h-12 w-12 rounded-lg mb-4" />
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-full mb-4" />
                        <Skeleton className="h-4 w-1/4" />
                      </CardContent>
                    </Card>
                  ))
                ) : departments.length > 0 ? (
                  // Actual department cards
                  departments.map((dept: Department, index: number) => {
                    const config =
                      departmentConfig[
                        dept.code as keyof typeof departmentConfig
                      ];
                    const Icon = config?.icon || BookOpen;
                    const color = config?.color || "blue";
                    const fullName = config?.fullName || dept.name;
                    const description =
                      config?.description ||
                      `Specialized education and research in ${dept.name.toLowerCase()}`;

                    return (
                      <motion.div
                        key={dept.id}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        className="group"
                      >
                        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                          <CardContent className="p-6">
                            <div className="flex items-start space-x-4">
                              <div
                                className={`p-3 rounded-lg bg-${color}-50 group-hover:scale-110 transition-transform`}
                              >
                                <Icon className={`h-6 w-6 text-${color}-600`} />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-start justify-between mb-3">
                                  <div>
                                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                      {fullName}
                                    </h3>
                                    <Badge variant="outline" className="mt-1">
                                      {dept.code}
                                    </Badge>
                                  </div>
                                </div>
                                <p className="text-gray-600 text-sm mb-4">
                                  {description}
                                </p>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                                    <div className="flex items-center">
                                      <Users className="h-3 w-3 mr-1" />
                                      <span>15 Teachers</span>
                                    </div>
                                    <div className="flex items-center">
                                      <BookOpen className="h-3 w-3 mr-1" />
                                      <span>8 Classes</span>
                                    </div>
                                  </div>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="group-hover:bg-blue-50 group-hover:text-blue-600"
                                  >
                                    Learn More
                                    <ArrowRight className="h-3 w-3 ml-1" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })
                ) : (
                  // No departments found
                  <div className="col-span-full text-center text-gray-500 py-8">
                    <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No departments found.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          <div className="space-y-6">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Address
                      </p>
                      <p className="text-xs text-gray-600">
                        Addis Ababa, Ethiopia
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Phone</p>
                      <p className="text-xs text-gray-600">+251 123 456 789</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Email</p>
                      <p className="text-xs text-gray-600">
                        departments@gloryschool.edu.et
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
