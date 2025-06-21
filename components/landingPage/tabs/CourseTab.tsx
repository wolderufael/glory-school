"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, ArrowLeft, GraduationCap, Clock, Users, Award, Calendar, FileText, ArrowRight } from "lucide-react"
import Link from "next/link"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

export default function ProgramsPage() {
  const programs = [
    {
      name: "Agricultural Engineering",
      code: "AGRE",
      level: "Bachelor's Degree",
      duration: "4 Years",
      credits: 120,
      students: 85,
      description:
        "Comprehensive program combining engineering principles with agricultural practices to develop sustainable farming solutions.",
      specializations: ["Irrigation Systems", "Farm Machinery", "Soil Management"],
      color: "blue",
      icon: BookOpen,
    },
    {
      name: "Animal Science",
      code: "ANSC",
      level: "Bachelor's Degree",
      duration: "4 Years",
      credits: 118,
      students: 72,
      description:
        "Study animal biology, nutrition, breeding, and management for livestock production and animal welfare.",
      specializations: ["Livestock Production", "Animal Nutrition", "Veterinary Care"],
      color: "green",
      icon: Users,
    },
    {
      name: "Plant Science",
      code: "PLSC",
      level: "Bachelor's Degree",
      duration: "4 Years",
      credits: 115,
      students: 68,
      description: "Focus on crop production, plant breeding, pest management, and sustainable agriculture practices.",
      specializations: ["Crop Production", "Plant Breeding", "Pest Management"],
      color: "emerald",
      icon: Award,
    },
    {
      name: "Agricultural Economics",
      code: "AGEC",
      level: "Bachelor's Degree",
      duration: "4 Years",
      credits: 122,
      students: 45,
      description: "Analyze economic principles in agriculture, farm management, and agricultural policy development.",
      specializations: ["Farm Management", "Agricultural Policy", "Market Analysis"],
      color: "purple",
      icon: FileText,
    },
    {
      name: "Food Science & Technology",
      code: "FSTC",
      level: "Bachelor's Degree",
      duration: "4 Years",
      credits: 125,
      students: 38,
      description: "Study food processing, preservation, safety, and nutrition to ensure food security and quality.",
      specializations: ["Food Processing", "Food Safety", "Nutrition Science"],
      color: "orange",
      icon: GraduationCap,
    },
    {
      name: "Environmental Science",
      code: "ENVS",
      level: "Bachelor's Degree",
      duration: "4 Years",
      credits: 120,
      students: 42,
      description:
        "Address environmental challenges in agriculture and develop sustainable solutions for ecosystem management.",
      specializations: ["Environmental Management", "Conservation", "Climate Change"],
      color: "teal",
      icon: BookOpen,
    },
  ]

  const admissionRequirements = [
    "High School Diploma or equivalent",
    "Minimum GPA of 3.0",
    "Mathematics and Science prerequisites",
    "English proficiency test",
    "Personal statement",
    "Letters of recommendation",
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Academic Programs</h1>
              <p className="text-gray-600">
                Explore our comprehensive range of undergraduate programs in agricultural sciences
              </p>
            </div>
            <BookOpen className="h-8 w-8 text-blue-600" />
          </div>
        </motion.div>

        {/* Program Stats */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          {[
            { title: "Total Programs", value: "6", icon: BookOpen, color: "text-blue-600", bg: "bg-blue-50" },
            { title: "Total Students", value: "350+", icon: Users, color: "text-green-600", bg: "bg-green-50" },
            { title: "Average Duration", value: "4 Years", icon: Clock, color: "text-purple-600", bg: "bg-purple-50" },
            { title: "Success Rate", value: "95%", icon: Award, color: "text-orange-600", bg: "bg-orange-50" },
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
          <div className="lg:col-span-2">
            {/* Programs Grid */}
            <motion.div className="mb-8" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Programs</h2>
              <div className="grid gap-6">
                {programs.map((program, index) => (
                  <motion.div
                    key={program.code}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="group"
                  >
                    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className={`p-3 rounded-lg bg-${program.color}-50`}>
                            <program.icon className={`h-6 w-6 text-${program.color}-600`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                  {program.name}
                                </h3>
                                <div className="flex items-center space-x-4 mt-2">
                                  <Badge variant="outline">{program.code}</Badge>
                                  <Badge variant="secondary">{program.level}</Badge>
                                </div>
                              </div>
                              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                Apply Now
                                <ArrowRight className="h-4 w-4 ml-1" />
                              </Button>
                            </div>
                            <p className="text-gray-600 mb-4">{program.description}</p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                              <div className="text-center">
                                <Clock className="h-4 w-4 text-gray-400 mx-auto mb-1" />
                                <p className="text-sm font-medium text-gray-900">{program.duration}</p>
                                <p className="text-xs text-gray-500">Duration</p>
                              </div>
                              <div className="text-center">
                                <FileText className="h-4 w-4 text-gray-400 mx-auto mb-1" />
                                <p className="text-sm font-medium text-gray-900">{program.credits}</p>
                                <p className="text-xs text-gray-500">Credits</p>
                              </div>
                              <div className="text-center">
                                <Users className="h-4 w-4 text-gray-400 mx-auto mb-1" />
                                <p className="text-sm font-medium text-gray-900">{program.students}</p>
                                <p className="text-xs text-gray-500">Students</p>
                              </div>
                              <div className="text-center">
                                <Award className="h-4 w-4 text-gray-400 mx-auto mb-1" />
                                <p className="text-sm font-medium text-gray-900">95%</p>
                                <p className="text-xs text-gray-500">Success</p>
                              </div>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900 mb-2">Specializations:</p>
                              <div className="flex flex-wrap gap-2">
                                {program.specializations.map((spec, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    {spec}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="space-y-6">
            {/* Admission Requirements */}
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-blue-600" />
                    Admission Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {admissionRequirements.map((requirement, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                      <p className="text-sm text-gray-700">{requirement}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Important Dates */}
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                    Important Dates
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Application Opens</span>
                    <span className="font-medium">March 1, 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Application Deadline</span>
                    <span className="font-medium">May 15, 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Entrance Exam</span>
                    <span className="font-medium">June 10, 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Classes Begin</span>
                    <span className="font-medium">September 1, 2024</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-600 to-blue-700 text-white">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Ready to Apply?</h3>
                  <p className="text-blue-100 text-sm mb-4">
                    Start your journey in agricultural sciences with our comprehensive programs.
                  </p>
                  <div className="space-y-3">
                    <Button className="w-full bg-white text-blue-600 hover:bg-blue-50">Start Application</Button>
                    <Button variant="outline" className="w-full border-white text-white hover:bg-white/10">
                      Download Brochure
                    </Button>
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
