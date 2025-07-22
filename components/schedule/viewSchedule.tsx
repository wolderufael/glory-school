"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Download,
  Eye,
  Calendar,
  Clock,
  FileText,
  Users,
  GraduationCap,
  Building2,
  Filter,
  RefreshCw,
  BookOpen,
} from "lucide-react"
import { getLocalStorage } from "@/utils/localStorage"
import { toast } from "sonner"
import { format } from "date-fns"
import { useSection } from "@/lib/react-query/hooks/useSection"

interface Department {
  id: string
  name: string
  code: string
}

interface Section {
  id: string
  sectionName: string
  level: string
  departmentId: string
}

interface Schedule {
  id: string
  title: string
  description: string
  fileName: string
  fileSize: number
  fileType: string
  uploadedBy: string
  uploadedAt: string
  departmentId: string
  departmentName: string
  level: string
  sectionId: string
  sectionName: string
  scheduleType: string
  isActive: boolean
}

interface FilterCriteria {
  departmentId: string
  level: string
  sectionId: string
  searchQuery: string
  scheduleType: string
}

const LEVELS = [
  { value: "I", label: "Level I" },
  { value: "II", label: "Level II" },
  { value: "III", label: "Level III" },
  { value: "IV", label: "Level IV" },
] as const;

const SCHEDULE_TYPES = [
  { value: "", label: "All Types" },
  { value: "exam", label: "Exam Schedule" },
  { value: "class", label: "Class Schedule" },
  { value: "event", label: "Event Schedule" },
  { value: "assignment", label: "Assignment Schedule" },
] as const

const ViewSchedule = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [departmentList, setDepartmentList] = useState<Department[]>([])
  const [schedules, setSchedules] = useState<Schedule[]>([])
  const [filteredSchedules, setFilteredSchedules] = useState<Schedule[]>([])

  const [filters, setFilters] = useState<FilterCriteria>({
    departmentId: "",
    level: "",
    sectionId: "",
    searchQuery: "",
    scheduleType: "",
  })

  // Fetch departments
  const fetchDepartments = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/departments`)
      if (!res.ok) throw new Error("Failed to fetch departments")
      const data = await res.json()
      setDepartmentList(data)
    } catch (e) {
      console.error("Error fetching departments:", e)
      toast.error("Failed to fetch departments")
    }
  }

  // Fetch schedules from API using selected filters
  const fetchSchedules = async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams()
      if (filters.departmentId) params.append("departmentId", filters.departmentId)
      if (filters.level) params.append("level", filters.level)
      if (filters.sectionId) params.append("sectionId", filters.sectionId)
      if (filters.scheduleType) params.append("scheduleType", filters.scheduleType)

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/schedules?${params.toString()}`)
      if (!res.ok) throw new Error("Failed to fetch schedules")
      const data = await res.json()
      setSchedules(data)
      setFilteredSchedules(data) // Initialize filtered schedules
    } catch (e) {
      console.error("Error fetching schedules:", e)
      toast.error("Failed to fetch schedules")
    } finally {
      setIsLoading(false)
    }
  }

  // Define clearFilters function to reset all filters
  const clearFilters = () => {
    setFilters({
      departmentId: "",
      level: "",
      sectionId: "",
      searchQuery: "",
      scheduleType: "",
    })
    toast.success("Filters cleared successfully")
  }

  useEffect(() => {
    fetchDepartments()
  }, [])

  const { data: sections, isLoading: isSectionsLoading } = useSection(
    filters.departmentId, 
    filters.level
  )

  // Reset section selection if current selection is not in filtered results
  useEffect(() => {
    if (filters.sectionId && sections && !sections.find(s => s.id === filters.sectionId)) {
      setFilters((prev) => ({ ...prev, sectionId: "" }))
    }
  }, [sections, filters.sectionId])

  // Filter schedules based on criteria
  useEffect(() => {
    let filtered = schedules

    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      filtered = filtered.filter(
        (schedule) =>
          schedule.title.toLowerCase().includes(query) ||
          schedule.description.toLowerCase().includes(query) ||
          schedule.fileName.toLowerCase().includes(query) ||
          schedule.uploadedBy.toLowerCase().includes(query),
      )
    }

    setFilteredSchedules(filtered)
  }, [schedules, filters.searchQuery])

  // Fetch schedules when filters change
  useEffect(() => {
    if (filters.departmentId || filters.level || filters.sectionId || filters.scheduleType) {
      fetchSchedules()
    }
  }, [filters.departmentId, filters.level, filters.sectionId, filters.scheduleType])

  const handleFilterChange = (key: keyof FilterCriteria, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleDownload = (schedule: Schedule) => {
    toast.success(`Downloading ${schedule.fileName}...`)
    // Add actual download logic here
  }

  const handlePreview = (schedule: Schedule) => {
    toast.success(`Opening ${schedule.fileName} for preview...`)
    // Add actual preview logic here
  }

  const getFileIcon = (fileType: string) => {
    if (fileType.includes("pdf")) return "📄"
    if (fileType.includes("word")) return "📝"
    if (fileType.includes("excel") || fileType.includes("sheet")) return "📊"
    if (fileType.includes("image")) return "🖼️"
    return "📁"
  }

  const getScheduleTypeColor = (type: string) => {
    switch (type) {
      case "exam":
        return "bg-red-100 text-red-800 border-red-200"
      case "class":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "event":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "assignment":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Schedule Viewer</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg border-0 sticky top-8">
              <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <CardTitle className="flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filters
                </CardTitle>
                <CardDescription className="text-indigo-100">Refine your schedule search</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {/* Search */}
                <div>
                  <Label className="text-sm font-medium text-gray-700">Search</Label>
                  <div className="relative mt-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search schedules..."
                      value={filters.searchQuery}
                      onChange={(e) => handleFilterChange("searchQuery", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Department */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 flex items-center">
                    <Building2 className="w-4 h-4 mr-2 text-blue-600" />
                    Department
                  </Label>
                  <Select
                    value={filters.departmentId}
                    onValueChange={(value) => handleFilterChange("departmentId", value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Departments</SelectItem>
                      {departmentList.map((dept) => (
                        <SelectItem key={dept.id} value={dept.id}>
                          {dept.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Level */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 flex items-center">
                    <GraduationCap className="w-4 h-4 mr-2 text-green-600" />
                    Level
                  </Label>
                  <Select value={filters.level} onValueChange={(value) => handleFilterChange("level", value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Levels</SelectItem>
                      {LEVELS.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Section */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 flex items-center">
                    <Users className="w-4 h-4 mr-2 text-purple-600" />
                    Section
                  </Label>
                  <Select 
                    value={filters.sectionId} 
                    onValueChange={(value) => handleFilterChange("sectionId", value)}
                    disabled={isSectionsLoading}
                  >
                    <SelectTrigger className="mt-1">
                      {isSectionsLoading ? (
                        <span>Loading sections...</span>
                      ) : (
                        <SelectValue placeholder="Select section" />
                      )}
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Sections</SelectItem>
                      {sections && sections.length > 0 ? (
                        sections.map((section) => (
                          <SelectItem key={section.id} value={section.id}>
                            {section.sectionName}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="" disabled>No sections available</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                {/* Schedule Type */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-orange-600" />
                    Schedule Type
                  </Label>
                  <Select
                    value={filters.scheduleType}
                    onValueChange={(value) => handleFilterChange("scheduleType", value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {SCHEDULE_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Clear Filters Button */}
                <Button 
                  variant="outline" 
                  onClick={clearFilters} 
                  className="w-full"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Schedules List */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-indigo-600" />
                  <p className="text-gray-600">Loading schedules...</p>
                </div>
              </div>
            ) : filteredSchedules.length === 0 ? (
              <Card className="shadow-lg border-0">
                <CardContent className="text-center py-12">
                  <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Schedules Found</h3>
                  <p className="text-gray-600 mb-4">
                    No schedules match your current filter criteria. Try adjusting your filters or check back later.
                  </p>
                  <Button variant="outline" onClick={clearFilters}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Clear All Filters
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {filteredSchedules.map((schedule) => (
                  <Card key={schedule.id} className="shadow-lg border-0 hover:shadow-xl transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="text-3xl">{getFileIcon(schedule.fileType)}</div>
                            <div>
                              <h3 className="text-xl font-semibold text-gray-900">{schedule.title}</h3>
                              <p className="text-gray-600 text-sm">{schedule.description}</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                            <div className="flex items-center space-x-2">
                              <Building2 className="w-4 h-4 text-blue-600" />
                              <span className="text-sm text-gray-700">{schedule.departmentName}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <GraduationCap className="w-4 h-4 text-green-600" />
                              <span className="text-sm text-gray-700">Level {schedule.level}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Users className="w-4 h-4 text-purple-600" />
                              <span className="text-sm text-gray-700">{schedule.sectionName}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge className={getScheduleTypeColor(schedule.scheduleType)}>
                                {schedule.scheduleType.charAt(0).toUpperCase() + schedule.scheduleType.slice(1)}
                              </Badge>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1">
                                <FileText className="w-4 h-4" />
                                <span>{schedule.fileName}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <span>{formatFileSize(schedule.fileSize)}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1">
                                <span>{schedule.uploadedBy}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{format(new Date(schedule.uploadedAt), "MMM dd, yyyy")}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col space-y-2 ml-6">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePreview(schedule)}
                            className="flex items-center"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Preview
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleDownload(schedule)}
                            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewSchedule