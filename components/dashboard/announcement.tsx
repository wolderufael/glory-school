"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell, Search, Calendar, ArrowLeft } from "lucide-react"
import Link from "next/link"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

export default function AnnouncementsPage() {
  const announcements = [
    {
      id: 1,
      title: "New Academic Year Registration Opens",
      content:
        "Registration for the 2024-2025 academic year is now open. Students can register online through the student portal.",
      date: "2024-03-15",
      priority: "high",
      category: "Registration",
    },
    {
      id: 2,
      title: "Scholarship Applications Available",
      content:
        "Merit-based scholarships are now available for outstanding students. Application deadline is March 30, 2024.",
      date: "2024-03-10",
      priority: "medium",
      category: "Scholarships",
    },
    {
      id: 3,
      title: "Library Extended Hours",
      content: "The library will be open 24/7 during exam period from March 20-30, 2024.",
      date: "2024-03-08",
      priority: "low",
      category: "Facilities",
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Announcements</h1>
              <p className="text-gray-600">Stay updated with the latest news and announcements</p>
            </div>
            <Bell className="h-8 w-8 text-blue-600" />
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <motion.div className="mb-6" variants={fadeInUp} initial="initial" animate="animate">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search announcements..."
                  className="pl-10 h-12 border-gray-200 focus:border-blue-500"
                />
              </div>
            </motion.div>

            <div className="space-y-6">
              {announcements.map((announcement, index) => (
                <motion.div
                  key={announcement.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-xl text-gray-900 mb-2">{announcement.title}</CardTitle>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {announcement.date}
                            </div>
                            <Badge variant={announcement.priority === "high" ? "destructive" : "secondary"}>
                              {announcement.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 leading-relaxed">{announcement.content}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {["All", "Registration", "Scholarships", "Facilities", "Events"].map((category) => (
                  <Button
                    key={category}
                    variant="ghost"
                    className="w-full justify-start hover:bg-blue-50 hover:text-blue-600"
                  >
                    {category}
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-600 to-blue-700 text-white">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
                <p className="text-blue-100 text-sm mb-4">Subscribe to get notifications for important announcements</p>
               
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
