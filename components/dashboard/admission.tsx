"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, ArrowLeft, CheckCircle, Clock } from "lucide-react"
import Link from "next/link"

export default function AdmissionPage() {
  const admissionSteps = [
    {
      step: 1,
      title: "Online Application",
      description: "Complete the online application form with your personal and academic information",
      status: "active",
    },
    {
      step: 2,
      title: "Document Submission",
      description: "Upload required documents including transcripts and certificates",
      status: "pending",
    },
    {
      step: 3,
      title: "Entrance Exam",
      description: "Take the entrance examination at designated test centers",
      status: "pending",
    },
    {
      step: 4,
      title: "Interview",
      description: "Attend the interview session with the admission committee",
      status: "pending",
    },
  ]

  const programs = [
    {
      name: "Agricultural Engineering",
      duration: "4 Years",
      degree: "Bachelor's",
      seats: 50,
    },
    {
      name: "Animal Science",
      duration: "4 Years",
      degree: "Bachelor's",
      seats: 40,
    },
    {
      name: "Plant Science",
      duration: "4 Years",
      degree: "Bachelor's",
      seats: 45,
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Admission</h1>
              <p className="text-gray-600">Apply for admission to our programs</p>
            </div>
            <GraduationCap className="h-8 w-8 text-blue-600" />
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Admission Process */}
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">Admission Process</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {admissionSteps.map((step, index) => (
                      <div key={step.step} className="flex items-start space-x-4">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            step.status === "active"
                              ? "bg-blue-600 text-white"
                              : step.status === "completed"
                                ? "bg-green-600 text-white"
                                : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {step.status === "completed" ? <CheckCircle className="h-4 w-4" /> : step.step}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{step.title}</h3>
                          <p className="text-gray-600 text-sm mt-1">{step.description}</p>
                        </div>
                        <Badge variant={step.status === "active" ? "default" : "secondary"}>{step.status}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Available Programs */}
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">Available Programs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {programs.map((program, index) => (
                      <div key={index} className="p-4 border rounded-lg hover:bg-blue-50 transition-colors">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-gray-900">{program.name}</h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                              <span>Duration: {program.duration}</span>
                              <span>Degree: {program.degree}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-600">Available Seats</div>
                            <div className="font-bold text-blue-600">{program.seats}</div>
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
            {/* Application Status */}
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Application Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <Clock className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                    <p className="text-gray-600">No active application</p>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                    Start New Application
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Important Dates */}
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Important Dates</CardTitle>
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
                    <span className="text-gray-600">Results Announcement</span>
                    <span className="font-medium">July 1, 2024</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Requirements */}
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
              <Card className="border-0 shadow-lg bg-gradient-to-br from-green-600 to-green-700 text-white">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Requirements</h3>
                  <ul className="space-y-2 text-green-100">
                    <li>• High School Diploma</li>
                    <li>• Minimum GPA of 3.0</li>
                    <li>• English Proficiency</li>
                    <li>• Medical Certificate</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
