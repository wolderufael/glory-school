"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  ArrowLeft,
  Search,
  Filter,
  Download,
  Eye,
  Star,
  Clock,
  Users,
  FileText,
  Video,
  Headphones,
} from "lucide-react"
import Link from "next/link"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

export default function LibraryPage() {
  const resources = [
    {
      title: "Sustainable Agriculture Practices",
      author: "Dr. Sarah Johnson",
      type: "E-Book",
      category: "Agriculture",
      rating: 4.8,
      downloads: 1250,
      pages: 324,
      icon: BookOpen,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Plant Pathology Research Methods",
      author: "Prof. Michael Chen",
      type: "Research Paper",
      category: "Research",
      rating: 4.6,
      downloads: 890,
      pages: 45,
      icon: FileText,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      title: "Modern Farming Techniques",
      author: "Agricultural Institute",
      type: "Video Course",
      category: "Education",
      rating: 4.9,
      downloads: 2100,
      pages: "12 hours",
      icon: Video,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      title: "Soil Science Fundamentals",
      author: "Dr. Emily Rodriguez",
      type: "Audio Book",
      category: "Science",
      rating: 4.7,
      downloads: 670,
      pages: "8 hours",
      icon: Headphones,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
  ]

  const categories = [
    { name: "All Resources", count: 1250, active: true },
    { name: "E-Books", count: 450 },
    { name: "Research Papers", count: 320 },
    { name: "Video Courses", count: 180 },
    { name: "Audio Books", count: 95 },
    { name: "Journals", count: 205 },
  ]

  const recentlyViewed = [
    { title: "Agricultural Economics", time: "2 hours ago" },
    { title: "Crop Management Systems", time: "1 day ago" },
    { title: "Environmental Science", time: "3 days ago" },
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Digital Library</h1>
              <p className="text-gray-600">Access thousands of academic resources and research materials</p>
            </div>
            <BookOpen className="h-8 w-8 text-blue-600" />
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div className="mb-8" variants={fadeInUp} initial="initial" animate="animate">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search books, papers, videos, and more..."
                className="pl-10 h-12 border-gray-200 focus:border-blue-500"
              />
            </div>
            <Button className="h-12 px-6 bg-blue-600 hover:bg-blue-700">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            {/* Featured Resources */}
            <motion.div className="mb-8" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Resources</h2>
              <div className="grid gap-6">
                {resources.map((resource, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="group"
                  >
                    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className={`p-3 rounded-lg ${resource.bg}`}>
                            <resource.icon className={`h-6 w-6 ${resource.color}`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                  {resource.title}
                                </h3>
                                <p className="text-gray-600 mt-1">by {resource.author}</p>
                                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                                  <Badge variant="outline">{resource.type}</Badge>
                                  <Badge variant="secondary">{resource.category}</Badge>
                                  <div className="flex items-center">
                                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                                    {resource.rating}
                                  </div>
                                  <div className="flex items-center">
                                    <Download className="h-4 w-4 mr-1" />
                                    {resource.downloads}
                                  </div>
                                  <span>
                                    {resource.pages} {typeof resource.pages === "string" ? "" : "pages"}
                                  </span>
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <Button size="sm" variant="outline" className="group-hover:bg-blue-50">
                                  <Eye className="h-4 w-4 mr-1" />
                                  Preview
                                </Button>
                                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                  <Download className="h-4 w-4 mr-1" />
                                  Access
                                </Button>
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
            {/* Categories */}
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {categories.map((category, index) => (
                    <Button
                      key={index}
                      variant={category.active ? "default" : "ghost"}
                      className="w-full justify-between hover:bg-blue-50 hover:text-blue-600"
                    >
                      <span>{category.name}</span>
                      <Badge variant="secondary">{category.count}</Badge>
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Recently Viewed */}
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    Recently Viewed
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentlyViewed.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.title}</p>
                        <p className="text-xs text-gray-500">{item.time}</p>
                      </div>
                      <Eye className="h-4 w-4 text-gray-400" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Library Stats */}
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
              <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-600 to-emerald-700 text-white">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Library Statistics
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-emerald-100">Total Resources</span>
                      <span className="font-bold">12,500+</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-emerald-100">Active Users</span>
                      <span className="font-bold">3,200</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-emerald-100">Downloads Today</span>
                      <span className="font-bold">450</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-emerald-100">New This Week</span>
                      <span className="font-bold">25</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Access */}
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Access</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { name: "My Bookmarks", icon: Star },
                    { name: "Reading List", icon: BookOpen },
                    { name: "Download History", icon: Download },
                    { name: "Request Resource", icon: FileText },
                  ].map((item, index) => (
                    <motion.div key={item.name} whileHover={{ x: 5 }}>
                      <Link
                        href="#"
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group"
                      >
                        <item.icon className="h-5 w-5 text-blue-600" />
                        <span className="text-gray-700 group-hover:text-blue-600">{item.name}</span>
                      </Link>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
