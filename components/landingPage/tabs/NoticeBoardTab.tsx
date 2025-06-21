"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Bell,
  ArrowLeft,
  Search,
  Filter,
  Building2,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle,
  Eye,
  Download,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { useNotice } from "@/lib/react-query/hooks/useNotice"


const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

export default function NoticeBoardPage() {
  // Remove the mockNotices array and replace with:
  const { data: notices, isLoading, error } = useNotice({})
  const noticesData = notices?.toReversed() || []

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const isDeadlineSoon = (deadline: string) => {
    const deadlineDate = new Date(deadline)
    const now = new Date()
    const diffTime = deadlineDate.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 7 && diffDays > 0
  }

  const isOverdue = (deadline: string) => {
    return new Date(deadline) < new Date()
  }


  const filteredNotices = noticesData.filter((notice:any) => {
    const matchesSearch =
      notice.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.message?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || notice.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const noticeStats = [
    {
      title: "Total Notices",
      value: noticesData.length.toString(),
      icon: Bell,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Active Notices",
      value: noticesData.filter((n:any) => n.is_active).length.toString(),
      icon: CheckCircle,
      color: "text-green-600",
      bg: "bg-green-50",
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Notice Board</h1>
              <p className="text-gray-600">Stay updated with the latest announcements and important notices</p>
            </div>
            <Bell className="h-8 w-8 text-blue-600" />
          </div>
        </motion.div>

        {/* Notice Stats */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          {noticeStats.map((stat, index) => (
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

        {/* Search and Filter */}
        <motion.div className="mb-8" variants={fadeInUp} initial="initial" animate="animate">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search notices..."
                className="pl-10 h-12 border-gray-200 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
            {/* Notices List */}
            <motion.div className="space-y-6" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Latest Announcements</h2>
              </div>

              {isLoading && (
                <div className="space-y-6">
                  {[...Array(3)].map((_, i) => (
                    <Card key={i} className="border-0 shadow-lg">
                      <CardHeader>
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-1/2" />
                      </CardHeader>
                      <CardContent>
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-2/3" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {error && (
                <div className="text-center py-12">
                  <Bell className="h-12 w-12 text-red-300 mx-auto mb-4" />
                  <p className="text-red-500 mb-4">Error loading notices: {error.message}</p>
                  <Button onClick={() => window.location.reload()} variant="outline">
                    Try Again
                  </Button>
                </div>
              )}

              {!isLoading &&
                !error &&
                filteredNotices.map((notice:any, index:any) => (
                  <motion.div
                    key={notice.id || notice.college_id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.01 }}
                  >
                    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-2">
                              <Building2 className="h-4 w-4 text-gray-500" />
                              <span className="text-sm font-medium text-gray-600">{notice.college_id}</span>
                              {notice.category && <Badge variant="outline">{notice.category}</Badge>}
                            </div>
                            <CardTitle className="text-xl leading-relaxed text-gray-900 hover:text-blue-600 transition-colors">
                              {notice.title || `Notice #${notice.college_id}`}
                            </CardTitle>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Badge variant={notice.is_active ? "default" : "secondary"} className="text-xs">
                              {notice.is_active ? "Active" : "Inactive"}
                            </Badge>
                            {notice.priority === "high" && (
                              <Badge variant="destructive" className="text-xs">
                                High Priority
                              </Badge>
                            )}
                            {notice.deadline && isOverdue(notice.deadline) && notice.is_active && (
                              <Badge variant="destructive" className="text-xs">
                                Overdue
                              </Badge>
                            )}
                            {notice.deadline &&
                              isDeadlineSoon(notice.deadline) &&
                              !isOverdue(notice.deadline) &&
                              notice.is_active && (
                                <Badge variant="outline" className="text-xs border-orange-500 text-orange-600">
                                  Due Soon
                                </Badge>
                              )}
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <div className="prose prose-sm max-w-none">
                          <p className="text-gray-700 leading-relaxed">{notice.message}</p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-100">
                          {notice.deadline && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Calendar className="h-4 w-4" />
                              <span className="font-medium">Deadline:</span>
                              <span
                                className={`${
                                  isOverdue(notice.deadline)
                                    ? "text-red-600 font-medium"
                                    : isDeadlineSoon(notice.deadline)
                                      ? "text-orange-600 font-medium"
                                      : ""
                                }`}
                              >
                                {formatDate(notice.deadline)}
                              </span>
                            </div>
                          )}

                          {notice.created_at && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Clock className="h-4 w-4" />
                              <span className="font-medium">Published:</span>
                              <span>{formatDateTime(notice.created_at)}</span>
                            </div>
                          )}

                          {notice.views && (
                            <div className="flex items-center gap-2 text-sm text-gray-600 ml-auto">
                              <Eye className="h-4 w-4" />
                              <span>{notice.views} views</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}

              {!isLoading && !error && filteredNotices.length === 0 && (
                <div className="text-center py-12">
                  <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No notices found matching your criteria.</p>
                </div>
              )}
            </motion.div>
          </div>

          <div className="space-y-6">

            {/* Recent Activity */}
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {noticesData.slice(0, 3).map((notice:any, index:any) => (
                    <div key={notice.id || notice.college_id} className="flex items-start space-x-3 p-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 line-clamp-1">
                          {notice.title || `Notice #${notice.college_id}`}
                        </p>
                        <p className="text-xs text-gray-500">
                          {notice.created_at ? formatDateTime(notice.created_at) : "Recently"}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-600 to-blue-700 text-white">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
                  <p className="text-blue-100 text-sm mb-4">
                    Subscribe to get notifications for important announcements and deadlines.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
