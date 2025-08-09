"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
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
} from "lucide-react";
import { getLocalStorage } from "@/utils/localStorage";
import { format } from "date-fns";
import { toast } from "sonner";

interface Grade {
  id: number;
  name: string;
  code: string;
}

interface Section {
  id: number;
  sectionName: string;
  grade: string;
  gradeId: number;
  department?: string;
}

interface Schedule {
  id: number;
  sectionId: number;
  academicYearId: number;
  academicSemesterId: number;
  gradeId: number;
  grade: string;
  schedulePath: string;
  createdAt: string;
  // Derived fields for UI
  fileName?: string;
  gradeName?: string;
  sectionName?: string;
}

interface FilterCriteria {
  gradeId: string;
  sectionId: string;
  searchQuery: string;
}

const GRADES = [
  { value: "9", label: "Grade 9" },
  { value: "10", label: "Grade 10" },
  { value: "11", label: "Grade 11" },
  { value: "12", label: "Grade 12" },
] as const;

const ViewSchedule = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [gradeList, setGradeList] = useState<Grade[]>([]);
  const [allSections, setAllSections] = useState<Section[]>([]);
  const [filteredSections, setFilteredSections] = useState<Section[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [filteredSchedules, setFilteredSchedules] = useState<Schedule[]>([]);

  const [filters, setFilters] = useState<FilterCriteria>({
    gradeId: "all",
    sectionId: "all",
    searchQuery: "",
  });

  // Get user info from localStorage
  const userType =
    typeof window !== "undefined" ? getLocalStorage("userType") : undefined;
  const userId =
    typeof window !== "undefined" ? getLocalStorage("userId") : undefined;

  // Mock data initialization
  const initializeMockData = () => {
    setIsLoading(true);

    // Mock grades data
    const mockGrades: Grade[] = [
      { id: 9, name: "Grade 9", code: "GR9" },
      { id: 10, name: "Grade 10", code: "GR10" },
      { id: 11, name: "Grade 11", code: "GR11" },
      { id: 12, name: "Grade 12", code: "GR12" },
    ];

    // Mock sections data
    const mockSections: Section[] = [
      { id: 1, sectionName: "9-A", grade: "9", gradeId: 9 },
      { id: 2, sectionName: "9-B", grade: "9", gradeId: 9 },
      { id: 3, sectionName: "9-C", grade: "9", gradeId: 9 },
      { id: 4, sectionName: "10-A", grade: "10", gradeId: 10 },
      { id: 5, sectionName: "10-B", grade: "10", gradeId: 10 },
      { id: 6, sectionName: "10-C", grade: "10", gradeId: 10 },
      { id: 7, sectionName: "11-A", grade: "11", gradeId: 11 },
      { id: 8, sectionName: "11-B", grade: "11", gradeId: 11 },
      { id: 9, sectionName: "11-C", grade: "11", gradeId: 11 },
      { id: 10, sectionName: "12-A", grade: "12", gradeId: 12 },
      { id: 11, sectionName: "12-B", grade: "12", gradeId: 12 },
      { id: 12, sectionName: "12-C", grade: "12", gradeId: 12 },
    ];

    // Mock schedules data
    const mockSchedules: Schedule[] = [
      {
        id: 1,
        sectionId: 4,
        academicYearId: 1,
        academicSemesterId: 2,
        gradeId: 10,
        grade: "10",
        schedulePath: "/schedule-grade10-a-semester2.pdf",
        createdAt: "2024-06-15T10:00:00Z",
        fileName: "Grade 10-A Second Semester Schedule.pdf",
        gradeName: "Grade 10",
        sectionName: "10-A",
      },
      {
        id: 2,
        sectionId: 5,
        academicYearId: 1,
        academicSemesterId: 2,
        gradeId: 10,
        grade: "10",
        schedulePath: "/schedule-grade10-b-semester2.pdf",
        createdAt: "2024-06-15T10:00:00Z",
        fileName: "Grade 10-B Second Semester Schedule.pdf",
        gradeName: "Grade 10",
        sectionName: "10-B",
      },
      {
        id: 3,
        sectionId: 6,
        academicYearId: 1,
        academicSemesterId: 2,
        gradeId: 10,
        grade: "10",
        schedulePath: "/schedule-grade10-c-semester2.pdf",
        createdAt: "2024-06-15T10:00:00Z",
        fileName: "Grade 10-C Second Semester Schedule.pdf",
        gradeName: "Grade 10",
        sectionName: "10-C",
      },
      {
        id: 4,
        sectionId: 1,
        academicYearId: 1,
        academicSemesterId: 2,
        gradeId: 9,
        grade: "9",
        schedulePath: "/schedule-grade9-a-semester2.pdf",
        createdAt: "2024-06-14T10:00:00Z",
        fileName: "Grade 9-A Second Semester Schedule.pdf",
        gradeName: "Grade 9",
        sectionName: "9-A",
      },
      {
        id: 5,
        sectionId: 2,
        academicYearId: 1,
        academicSemesterId: 2,
        gradeId: 9,
        grade: "9",
        schedulePath: "/schedule-grade9-b-semester2.pdf",
        createdAt: "2024-06-14T10:00:00Z",
        fileName: "Grade 9-B Second Semester Schedule.pdf",
        gradeName: "Grade 9",
        sectionName: "9-B",
      },
      {
        id: 6,
        sectionId: 7,
        academicYearId: 1,
        academicSemesterId: 2,
        gradeId: 11,
        grade: "11",
        schedulePath: "/schedule-grade11-a-semester2.pdf",
        createdAt: "2024-06-16T10:00:00Z",
        fileName: "Grade 11-A Second Semester Schedule.pdf",
        gradeName: "Grade 11",
        sectionName: "11-A",
      },
      {
        id: 7,
        sectionId: 8,
        academicYearId: 1,
        academicSemesterId: 2,
        gradeId: 11,
        grade: "11",
        schedulePath: "/schedule-grade11-b-semester2.pdf",
        createdAt: "2024-06-16T10:00:00Z",
        fileName: "Grade 11-B Second Semester Schedule.pdf",
        gradeName: "Grade 11",
        sectionName: "11-B",
      },
      {
        id: 8,
        sectionId: 10,
        academicYearId: 1,
        academicSemesterId: 2,
        gradeId: 12,
        grade: "12",
        schedulePath: "/schedule-grade12-a-semester2.pdf",
        createdAt: "2024-06-17T10:00:00Z",
        fileName: "Grade 12-A Second Semester Schedule.pdf",
        gradeName: "Grade 12",
        sectionName: "12-A",
      },
      {
        id: 9,
        sectionId: 11,
        academicYearId: 1,
        academicSemesterId: 2,
        gradeId: 12,
        grade: "12",
        schedulePath: "/schedule-grade12-b-semester2.pdf",
        createdAt: "2024-06-17T10:00:00Z",
        fileName: "Grade 12-B Second Semester Schedule.pdf",
        gradeName: "Grade 12",
        sectionName: "12-B",
      },
    ];

    // Simulate loading delay
    setTimeout(() => {
      setGradeList(mockGrades);
      setAllSections(mockSections);
      setSchedules(mockSchedules);
      setIsLoading(false);
      console.log("Mock data loaded:", {
        mockGrades,
        mockSections,
        mockSchedules,
      });
    }, 800);
  };

  useEffect(() => {
    initializeMockData();
  }, []);

  // Filter sections based on selected grade
  useEffect(() => {
    let filtered = allSections;

    if (filters.gradeId && filters.gradeId !== "all") {
      filtered = filtered.filter(
        (section) => section.gradeId === Number(filters.gradeId)
      );
    }

    setFilteredSections(filtered);

    // Reset section selection if current selection is not in filtered results
    if (
      filters.sectionId !== "all" &&
      !filtered.find((s) => s.id === Number(filters.sectionId))
    ) {
      setFilters((prev) => ({ ...prev, sectionId: "all" }));
    }
  }, [filters.gradeId, allSections]);

  useEffect(() => {
    let filtered = schedules;

    if (filters.gradeId && filters.gradeId !== "all") {
      filtered = filtered.filter(
        (schedule) => schedule.gradeId === Number(filters.gradeId)
      );
    }

    if (filters.sectionId && filters.sectionId !== "all") {
      filtered = filtered.filter(
        (schedule) => schedule.sectionId === Number(filters.sectionId)
      );
    }

    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (schedule) =>
          (schedule.fileName &&
            schedule.fileName.toLowerCase().includes(query)) ||
          (schedule.gradeName &&
            schedule.gradeName.toLowerCase().includes(query)) ||
          (schedule.sectionName &&
            schedule.sectionName.toLowerCase().includes(query))
      );
    }

    setFilteredSchedules(filtered);
  }, [schedules, filters]);

  const handleFilterChange = (key: keyof FilterCriteria, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      gradeId: "all",
      sectionId: "all",
      searchQuery: "",
    });
    toast("Filters Cleared", {
      description: "All filters have been reset",
    });
  };
  const normalizeSchedulePath = (schedulePath: string) => {
    if (
      schedulePath.includes("\\") ||
      schedulePath.includes("C:") ||
      schedulePath.includes("/home")
    ) {
      return null; // Invalid for public access
    }

    return schedulePath.startsWith("/") ? schedulePath : `/${schedulePath}`;
  };

  const handleDownload = (schedule: Schedule) => {
    // Mock download functionality
    toast("Download Started", {
      description: `Downloading ${schedule.fileName}...`,
    });

    // Simulate download process
    setTimeout(() => {
      toast("Download Complete", {
        description: `${schedule.fileName} has been downloaded successfully`,
      });
    }, 1500);
  };

  const handlePreview = (schedule: Schedule) => {
    // Mock preview functionality
    toast("Opening Preview", {
      description: `Opening ${schedule.fileName} for preview...`,
    });

    // Simulate opening a preview (you could open a modal or new window here)
    setTimeout(() => {
      toast("Preview Ready", {
        description: `${schedule.fileName} is now ready for viewing`,
      });
    }, 1000);
  };

  const getScheduleTypeColor = (type: string) => {
    switch (type) {
      case "exam":
        return "bg-red-100 text-red-800 border-red-200";
      case "class":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "event":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "assignment":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Schedule Viewer
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse and download academic schedules for your grade and section
          </p>
          <div className="flex items-center justify-center mt-4 space-x-4">
            {userType && (
              <Badge variant="outline" className="flex items-center">
                <User className="w-3 h-3 mr-1" />
                {userType.charAt(0).toUpperCase() + userType.slice(1)}
              </Badge>
            )}
            {filteredSchedules.length > 0 && (
              <Badge variant="secondary">
                {filteredSchedules.length} schedules found
              </Badge>
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
                <CardDescription className="text-indigo-100">
                  Refine your schedule search
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {/* Search */}
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Search
                  </Label>
                  <div className="relative mt-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search schedules..."
                      value={filters.searchQuery}
                      onChange={(e) =>
                        handleFilterChange("searchQuery", e.target.value)
                      }
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Grade */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 flex items-center">
                    <GraduationCap className="w-4 h-4 mr-2 text-blue-600" />
                    Grade
                  </Label>
                  <Select
                    value={filters.gradeId}
                    onValueChange={(value) =>
                      handleFilterChange("gradeId", value)
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Grades</SelectItem>
                      {gradeList.map((grade) => (
                        <SelectItem key={grade.id} value={grade.id.toString()}>
                          {grade.name}
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
                    onValueChange={(value) =>
                      handleFilterChange("sectionId", value)
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select section" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sections</SelectItem>
                      {filteredSections.map((section) => (
                        <SelectItem
                          key={section.id}
                          value={section.id.toString()}
                        >
                          {section.sectionName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Clear Filters */}
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="w-full bg-transparent"
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
                  <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-indigo-600" />
                  <p className="text-gray-600">Loading schedules...</p>
                </div>
              </div>
            ) : filteredSchedules.length === 0 ? (
              <Card className="shadow-lg border-0">
                <CardContent className="text-center py-12">
                  <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No Schedules Found
                  </h3>
                  <p className="text-gray-600 mb-4">
                    No schedules match your current filter criteria. Try
                    adjusting your filters or check back later.
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
                  <Card
                    key={schedule.id}
                    className="shadow-lg border-0 hover:shadow-xl transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="text-3xl">📅</div>
                            <div>
                              <h3 className="text-xl font-semibold text-gray-900">
                                {schedule.fileName}
                              </h3>
                              <p className="text-gray-600 text-sm">
                                {schedule.gradeName} Schedule
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                            <div className="flex items-center space-x-2">
                              <GraduationCap className="w-4 h-4 text-blue-600" />
                              <span className="text-sm text-gray-700">
                                {schedule.gradeName}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Users className="w-4 h-4 text-green-600" />
                              <span className="text-sm text-gray-700">
                                Section {schedule.sectionName}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4 text-purple-600" />
                              <span className="text-sm text-gray-700">
                                Second Semester
                              </span>
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
                                <span>
                                  {format(
                                    new Date(schedule.createdAt),
                                    "MMM dd, yyyy"
                                  )}
                                </span>
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
  );
};

export default ViewSchedule;
