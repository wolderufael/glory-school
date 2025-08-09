"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  ArrowLeft,
  CheckCircle,
  Clock,
  List,
} from "lucide-react";
import Link from "next/link";

export default function AdmissionPage() {
  const admissionSteps = [
    {
      step: 1,
      title: "Application Submission",
      description:
        "Complete the application with student and parent/guardian information (online or in-person)",
      status: "active",
    },
    {
      step: 2,
      title: "Placement Assessment",
      description: "Take a placement test or attend an interview (if required)",
      status: "pending",
    },
    {
      step: 3,
      title: "Admission Decision",
      description: "View the admission decision and confirm your seat",
      status: "pending",
    },
    {
      step: 4,
      title: "Enrollment & Documents",
      description:
        "Submit report cards, birth certificate, transfer letter, and complete enrollment",
      status: "pending",
    },
  ];

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
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back & Header */}
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
                Admission
              </h1>
              <p className="text-gray-600">
                Apply for admission to our programs
              </p>
            </div>
            <GraduationCap className="h-8 w-8 text-blue-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <List className="h-6 w-6 text-white" />
                Application Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <p className="text-white text-lg font-medium">
                  Check your current admission progress
                </p>
              </div>
              <Link href="/admission/admitted">
                <Button className="w-full cursor-pointer text-white bg-white/20 hover:bg-white/30">
                  View Application Result
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mt-10">
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">
                    📋 Admission Process
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {admissionSteps.map((step) => (
                      <div
                        key={step.step}
                        className="flex items-start space-x-4"
                      >
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shadow ${
                            step.status === "active"
                              ? "bg-blue-600 text-white animate-pulse"
                              : step.status === "completed"
                              ? "bg-green-600 text-white"
                              : "bg-gray-300 text-gray-600"
                          }`}
                        >
                          {step.status === "completed" ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            step.step
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">
                            {step.title}
                          </h3>
                          <p className="text-gray-600 text-sm mt-1">
                            {step.description}
                          </p>
                        </div>
                        <Badge
                          variant={
                            step.status === "active"
                              ? "default"
                              : step.status === "completed"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {step.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
            {/*   <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">
                    🎓 Available Programs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {programs.map((program) => (
                      <div
                        key={program.name}
                        className="p-4 border rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {program.name}
                            </h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                              <span>📅 {program.duration}</span>
                              <span>🎓 {program.degree}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-600">
                              Available Seats
                            </div>
                            <div className="font-bold text-blue-600">
                              {program.seats}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card> */}
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="border-0 shadow-lg bg-gradient-to-br from-green-600 to-green-700 text-white">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    📄 Admission Requirements
                  </h3>
                  <ul className="space-y-2 text-green-100">
                    <li>• Grade 8 National Exam Result</li>
                    <li>• Entrance Exam Result</li>
                    <li>• 1–8 Transcripts</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
