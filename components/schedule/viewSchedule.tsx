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
  User,
  Loader2,
} from "lucide-react"
import { getLocalStorage } from "@/utils/localStorage"
import { format } from "date-fns"
import { toast } from "sonner"

interface Department {
  id: number
  name: string
  code: string
}

interface Section {
  id: number
  sectionName: string
  level: string
  departmentId: number
  department?: string
}

interface Schedule {
  id: number
  sectionId: number
  academicYearId: number
  academicSemesterId: number
  departmentId: number
  level: string
  schedulePath: string
  createdAt: string
  // Derived fields for UI
  fileName?: string
  departmentName?: string
  sectionName?: string
}

interface FilterCriteria {
  departmentId: string
  level: string
  sectionId: string
  searchQuery: string
}

const LEVELS = [
  { value: "I", label: "Level I" },
  { value: "II", label: "Level II" },
  { value: "III", label: "Level III" },
  { value: "IV", label: "Level IV" },
  { value: "V", label: "Level V" },
] as const

const ViewSchedule = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [departmentList, setDepartmentList] = useState<Department[]>([])
  const [allSections, setAllSections] = useState<Section[]>([])
  const [filteredSections, setFilteredSections] = useState<Section[]>([])
  const [schedules, setSchedules] = useState<Schedule[]>([])
  const [filteredSchedules, setFilteredSchedules] = useState<Schedule[]>([])

  const [filters, setFilters] = useState<FilterCriteria>({
    departmentId: "all",
    level: "all",
    sectionId: "all",
    searchQuery: "",
  })

  // Get user info from localStorage
  const userType = typeof window !== "undefined" ? getLocalStorage("userType") : undefined
  const userId = typeof window !== "undefined" ? getLocalStorage("userId") : undefined
  const userDepartmentId = typeof window !== "undefined" ? getLocalStorage("userDepartmentId") : undefined

  // Fetch departments
  const fetchDepartments = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/departments`)
      if (!res.ok) throw new Error("Failed to fetch departments")
      const data = await res.json()
      setDepartmentList(data)
    } catch (e) {
      console.error("Error fetching departments:", e)
      toast("Error", {
        description: "Failed to fetch departments",
        className: 'text-red-50'
      })
    }
  }


  const fetchSections = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/sections`)
      if (!res.ok) throw new Error("Failed to fetch sections")
      const data = await res.json()
      setAllSections(data)
    } catch (e) {
      console.error("Error fetching sections:", e)
      toast("Error", {
        description: "Failed to fetch sections",
        className: 'text-red-50'
      })
    }
  }

  
  const fetchSchedules = async () => {
    setIsLoading(true)
    try {
  
      const params = new URLSearchParams()
      if (filters.departmentId && filters.departmentId !== "all") params.append("departmentId", filters.departmentId)
      if (filters.level && filters.level !== "all") params.append("level", filters.level)
      if (filters.sectionId && filters.sectionId !== "all") params.append("sectionId", filters.sectionId)
      // If all filters are 'all', send null for departmentId
      if (filters.departmentId === "all") params.append("departmentId", "null")
      if (filters.level === "all") params.append("level", "all")
      if (filters.sectionId === "all") params.append("sectionId", "all")

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/schedules?${params.toString()}`)
      const data = await response.json()
      // Add fileName for UI
      const schedulesWithFileName = data.map((item: Schedule) => ({
        ...item,
        fileName: item.schedulePath.split("/").pop() || item.schedulePath.split("\\").pop() || "Schedule.pdf",
      }))
      setSchedules(schedulesWithFileName)
    } catch (e) {
      console.error("Error fetching schedules:", e)
      toast("Error", {
        description: "Failed to fetch schedules",
        className: 'text-red-50'
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    Promise.all([fetchDepartments(), fetchSections(), fetchSchedules()]).catch((error) => {
      console.error("Error fetching initial data:", error)
    })
  }, [])

  // Filter sections based on selected department and level
  useEffect(() => {
    let filtered = allSections

    if (filters.departmentId && filters.departmentId !== "all") {
      filtered = filtered.filter((section) => section.departmentId === Number(filters.departmentId))
    }

    if (filters.level && filters.level !== "all") {
      filtered = filtered.filter((section) => section.level === filters.level)
    }

    setFilteredSections(filtered)

    // Reset section selection if current selection is not in filtered results
    if (filters.sectionId !== "all" && !filtered.find((s) => s.id === Number(filters.sectionId))) {
      setFilters((prev) => ({ ...prev, sectionId: "all" }))
    }
  }, [filters.departmentId, filters.level, allSections])


  useEffect(() => {
    let filtered = schedules

 
    if (filters.departmentId && filters.departmentId !== "all") {
      filtered = filtered.filter((schedule) => schedule.departmentId === Number(filters.departmentId))
    }


    if (filters.level && filters.level !== "all") {
      filtered = filtered.filter((schedule) => schedule.level === filters.level)
    }

 
    if (filters.sectionId && filters.sectionId !== "all") {
      filtered = filtered.filter((schedule) => schedule.sectionId === Number(filters.sectionId))
    }

    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      filtered = filtered.filter(
        (schedule) =>
          (schedule.fileName && schedule.fileName.toLowerCase().includes(query)) ||
          (schedule.departmentName && schedule.departmentName.toLowerCase().includes(query)) ||
          (schedule.sectionName && schedule.sectionName.toLowerCase().includes(query))
      )
    }

    setFilteredSchedules(filtered)
  }, [schedules, filters])

  const handleFilterChange = (key: keyof FilterCriteria, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      departmentId: "all",
      level: "all",
      sectionId: "all",
      searchQuery: "",
    })
    toast("Filters Cleared", {
      description: "All filters have been reset",
    })
  }
const normalizeSchedulePath = (schedulePath: string) => {
 
  if (schedulePath.includes("\\") || schedulePath.includes("C:") || schedulePath.includes("/home")) {
    return null // Invalid for public access
  }

  return schedulePath.startsWith("/") ? schedulePath : `/${schedulePath}`;
}

const handleDownload = (schedule: Schedule) => {
  const path = normalizeSchedulePath(schedule.schedulePath);
  if (!path) {
    toast.error("File not available for download");
    return;
  }

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}${path}`;
  window.open(url, "_blank");

  toast("Download Started", {
    description: `Downloading file...`,
  });
};

const handlePreview = (schedule: Schedule) => {
  const path = normalizeSchedulePath(schedule.schedulePath);
  if (!path) {
    toast.error("File not available for preview");
    return;
  }

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}${path}`;
  window.open(url, "_blank");

  toast("Opening Preview", {
    description: `Opening file...`,
  });
};


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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Schedule Viewer</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse and download academic schedules for your department, level, and section
          </p>
          <div className="flex items-center justify-center mt-4 space-x-4">
            {userType && (
              <Badge variant="outline" className="flex items-center">
                <User className="w-3 h-3 mr-1" />
                {userType.charAt(0).toUpperCase() + userType.slice(1)}
              </Badge>
            )}
            {filteredSchedules.length > 0 && (
              <Badge variant="secondary">{filteredSchedules.length} schedules found</Badge>
            )}
          </div>
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
                      <SelectItem value="all">All Departments</SelectItem>
                      {departmentList.map((dept) => (
                        <SelectItem key={dept.id} value={dept.id.toString()}>
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
                      <SelectItem value="all">All Levels</SelectItem>
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
                  <Select value={filters.sectionId} onValueChange={(value) => handleFilterChange("sectionId", value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select section" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sections</SelectItem>
                      {filteredSections.map((section) => (
                        <SelectItem key={section.id} value={section.id.toString()}>
                          {section.sectionName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Clear Filters */}
                <Button variant="outline" onClick={clearFilters} className="w-full bg-transparent">
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
                  <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-indigo-600" />
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
                            {/* <div className="text-3xl">{getFileIcon(schedule.fileType)}</div> */}
                            <div>
                              <h3 className="text-xl font-semibold text-gray-900">{schedule.fileName}</h3>
                              <p className="text-gray-600 text-sm">{schedule.level} Schedule</p>
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
                          </div>

                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1">
                                <FileText className="w-4 h-4" />
                                <span>{schedule.fileName}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1">
                                <User className="w-4 h-4" />
                                <span>{schedule.sectionId}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{format(new Date(schedule.createdAt), "MMM dd, yyyy")}</span>
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
