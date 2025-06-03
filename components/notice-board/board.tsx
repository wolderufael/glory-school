"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, Building2, Plus } from "lucide-react"


export function NoticeBoard() {
//   const [notices, setNotices] = useState<Notice[]>([])
//   const [colleges, setColleges] = useState<College[]>([])
  const [selectedCollege, setSelectedCollege] = useState<string>("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(true)
  
  const notices = [
     {
    notice_id: 1,
    college_id: 1,
    college_name: "Engineering College",
    message: "Notice about the upcoming engineering seminar.",
    deadline: "2023-11-30T23:59:59Z",
    published_at: "2023-11-01T10:00:00Z",
    is_active: true,
     },
     {
    notice_id: 2,
    college_id: 2,
    college_name: "Medical College",
    message: "Medical college notice regarding health camp.",
    deadline: "2023-12-05T23:59:59Z",
    published_at: "2023-11-02T10:00:00Z",
    is_active: true,
     }

  ]


const colleges = [
    { id: 1, name: "Engineering College" },
    { id: 2, name: "Medical College" },
    { id: 3, name: "Arts College" },
]




  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const isDeadlineSoon = (deadline: string) => {
    const deadlineDate = new Date(deadline)
    const today = new Date()
    const diffTime = deadlineDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 7 && diffDays >= 0
  }

  const isOverdue = (deadline: string) => {
    const deadlineDate = new Date(deadline)
    const today = new Date()
    return deadlineDate < today
  }

  if (loading) {
    return <div className="text-center py-8">Loading notices...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-4">
          <Select value={selectedCollege} onValueChange={setSelectedCollege}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select college" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Colleges</SelectItem>
              {colleges.map((college) => (
                <SelectItem key={college.id} value={college.id.toString()}>
                  {college.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {notices.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-500">No notices available at the moment.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {notices.map((notice) => (
            <Card key={notice.notice_id} className="relative">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-600">{notice.college_name}</span>
                    </div>
                    <CardTitle className="text-lg leading-relaxed">Notice #{notice.notice_id}</CardTitle>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge variant={notice.is_active ? "default" : "secondary"} className="text-xs">
                      {notice.is_active ? "Active" : "Inactive"}
                    </Badge>
                    {isOverdue(notice.deadline) && notice.is_active && (
                      <Badge variant="destructive" className="text-xs">
                        Overdue
                      </Badge>
                    )}
                    {isDeadlineSoon(notice.deadline) && !isOverdue(notice.deadline) && notice.is_active && (
                      <Badge variant="outline" className="text-xs border-orange-500 text-orange-600">
                        Due Soon
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{notice.message}</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span className="font-medium">Deadline:</span>
                    <span
                      className={`${isOverdue(notice.deadline) ? "text-red-600 font-medium" : isDeadlineSoon(notice.deadline) ? "text-orange-600 font-medium" : ""}`}
                    >
                      {formatDate(notice.deadline)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span className="font-medium">Published:</span>
                    <span>{formatDateTime(notice.published_at)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
