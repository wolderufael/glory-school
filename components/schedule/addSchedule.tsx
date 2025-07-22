"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Upload,
  X,
  FileText,
  Users,
  GraduationCap,
  Building2,
  Send,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Eye,
} from "lucide-react"
import { getLocalStorage } from "@/utils/localStorage"
import { toast } from "sonner"
import { useSection } from "@/lib/react-query/hooks/useSection"

interface ScheduleFormData {
  departmentId: string;
  level: string;
  sectionId: number;
  scheduleFile: File | null;
}

interface Department {
  id: string
  name: string
  code: string
}

// Match the Section type from useSection query
interface Section {
  id: string | number;
  sectionName: string;
}

interface SelectedCombination {
  id: number;
  department: string;
  level: string;
  section: string;
  departmentId: string;
  levelValue: string;
  sectionId: number;
}

const LEVELS = [
  { value: "I", label: "Level I" },
  { value: "II", label: "Level II" },
  { value: "III", label: "Level III" },
  { value: "IV", label: "Level IV" },
] as const;


const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/plain",
  "image/jpeg",
  "image/png",
]

const CreateSchedule = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [departmentList, setDepartmentList] = useState<Department[]>([])
  // Remove unused local state for allSections
  const [filteredSections, setFilteredSections] = useState<Section[]>([])
  const [selectedCombinations, setSelectedCombinations] = useState<SelectedCombination[]>([])

  const [formData, setFormData] = useState<ScheduleFormData>({
    departmentId: '',
    level: "",
    sectionId: 100,
    scheduleFile: null,
  });

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


  // Fetch sections using selected department and level
  const { data: sections, isLoading: isSectionsLoading } = useSection(formData.departmentId, formData.level);

  useEffect(() => {
    fetchDepartments()
  }, [])

  // Always use sections from useSection for section selection
  useEffect(() => {
    setFilteredSections(sections ?? []);
  }, [sections]);

  // Update selected combination when selections change
  useEffect(() => {
    if (formData.departmentId && formData.level && formData.sectionId) {
      const department = departmentList.find((d) => d.id === formData.departmentId);
      const section = sections?.find((s) => Number(s.id) === formData.sectionId);
      setSelectedCombinations([
        {
          id: Date.now(),
          department: department?.name || "Unknown",
          level: `Level ${formData.level}`,
          section: section?.sectionName || "Unknown",
          departmentId: formData.departmentId,
          levelValue: formData.level,
          sectionId: formData.sectionId,
        },
      ]);
    } else {
      setSelectedCombinations([]);
    }
  }, [formData.departmentId, formData.level, formData.sectionId, departmentList, sections]);

  // Handle department selection (single)
  const handleDepartmentSelect = (departmentId: number) => {
    setFormData((prev) => ({ ...prev, departmentId: String(departmentId) }));
    setFilteredSections([]);
    setFormData((prev) => ({ ...prev, sectionId: 100 }));
  };

  // Handle level selection (single)
  const handleLevelSelect = (level: string) => {
    setFormData((prev) => ({ ...prev, level }));
    setFilteredSections([]);
    setFormData((prev) => ({ ...prev, sectionId: 100 }));
  };

  // Handle section selection (single)
  const handleSectionSelect = (sectionId: number) => {
    setFormData((prev) => ({ ...prev, sectionId }));
  };

  // Remove select all logic (single selection only)

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      toast.error("Please upload a valid document file (PDF, DOC, DOCX, XLS, XLSX, TXT, JPG, PNG)")
      return
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be less than 10MB")
      return
    }

    setFormData((prev) => ({ ...prev, scheduleFile: file }))
    toast.success("File uploaded successfully")
  }

  // Remove file
  const removeFile = () => {
    setFormData((prev) => ({ ...prev, scheduleFile: null }))
    toast.success("File removed")
  }

  // Form validation
  const isFormValid = () => {
    return (
      formData.departmentId.length > 0 &&
      formData.level &&
      formData.sectionId > 0 &&
      formData.scheduleFile
    );
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSubmit = new FormData();


      if (formData.scheduleFile) {
        formDataToSubmit.append(
          "schedule",
          formData.scheduleFile,
          formData.scheduleFile.name
        );
      }
      formDataToSubmit.append("sectionId", String(formData.sectionId));
      formDataToSubmit.append("academicYearId", getLocalStorage("academicYearId") || "");
      formDataToSubmit.append("academicSemesterId", getLocalStorage("academicSemesterId") || "");
      formDataToSubmit.append("departmentId", String(formData.departmentId));
      formDataToSubmit.append("level", formData.level);

            console.log('submiiting data', formDataToSubmit)

      const requestOptions: RequestInit = {
        method: "POST",
        body: formDataToSubmit,
        redirect: "follow" as RequestRedirect
      };

      const response = await fetch(
        "https://wsacollege.com/backend/api/upload/uploadSchedule",
        requestOptions
      );
      const result = await response.text();
      console.log("API result:", result);

      toast.success("Schedule published successfully!");
      resetForm();
    } catch (error) {
      console.error("Error publishing schedule:", error);
      toast.error("Failed to publish schedule");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      departmentId: '',
      level: "",
      sectionId: 0,
      scheduleFile: null,
    });
    setSelectedCombinations([]);
    toast.success("Form reset successfully");
  };

  const getFileIcon = (file: File) => {
    if (file.type.includes("pdf")) return "📄"
    if (file.type.includes("word")) return "📝"
    if (file.type.includes("excel") || file.type.includes("sheet")) return "📊"
    if (file.type.includes("image")) return "🖼️"
    return "📁"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
              <FileText className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Schedule Publisher</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Upload and publish schedule documents for specific departments, levels, and sections
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           

            {/* Right Column - Target Selection */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                  <CardTitle className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Select Target Audience
                  </CardTitle>
                  <CardDescription className="text-green-100">
                    Choose departments, levels, and sections that will have access to this schedule
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Departments - Single Select */}
                    <div>
                      <Label className="text-sm font-medium text-gray-700 flex items-center mb-4">
                        <Building2 className="w-4 h-4 mr-2 text-blue-600" /> Departments
                      </Label>
                      <div className="space-y-2 border rounded-md p-3 h-64 overflow-y-auto">
                        {departmentList.map((department) => (
                          <div key={department.id} className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name="department"
                              checked={formData.departmentId === String(department.id)}
                              onChange={() => handleDepartmentSelect(Number(department.id))}
                              className="accent-blue-600"
                            />
                            <Label className="flex-1 cursor-pointer text-sm">
                              <div className="font-medium">{department.name}</div>
                              <div className="text-xs text-gray-500">{department.code}</div>
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Levels - Single Select */}
                    <div>
                      <Label className="text-sm font-medium text-gray-700 flex items-center mb-4">
                        <GraduationCap className="w-4 h-4 mr-2 text-green-600" /> Levels
                      </Label>
                      <div className="space-y-2 border rounded-md p-3 h-64 overflow-y-auto">
                        {LEVELS.map((level) => (
                          <div key={level.value} className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name="level"
                              checked={formData.level === level.value}
                              onChange={() => handleLevelSelect(level.value)}
                              className="accent-green-600"
                            />
                            <Label className="cursor-pointer text-sm">{level.label}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Sections - Single Select */}
                    <div>
                      <Label className="text-sm font-medium text-gray-700 flex items-center mb-4">
                        <Users className="w-4 h-4 mr-2 text-purple-600" /> Sections
                      </Label>
                      <div className="space-y-2 border rounded-md p-3 h-64 overflow-y-auto">
                        {filteredSections.map((section) => (
                          <div key={section.id} className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name="section"
                              checked={formData.sectionId === Number(section.id)}
                              onChange={() => handleSectionSelect(Number(section.id))}
                              className="accent-purple-600"
                            />
                            <Label className="flex-1 cursor-pointer text-sm">
                              <div className="font-medium">{section.sectionName}</div>
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Selected Combinations Preview
              {selectedCombinations.length > 0 && (
                <Card className="shadow-lg border-0">
                  <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Selected Target Groups
                      </span>
                      <Badge variant="secondary" className="bg-white/20 text-white">
                        {selectedCombinations.length} combinations
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ScrollArea className="h-48">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {selectedCombinations.map((combination) => (
                          <div
                            key={combination.id}
                            className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-3"
                          >
                            <div className="font-medium text-sm text-blue-900">{combination.department}</div>
                            <div className="text-xs text-blue-700">
                              {combination.level} • {combination.section}
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              )} */}
            </div>

            
          </div>

           {/* Left Column - Basic Info & File Upload */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* File Upload */}
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                  <CardTitle className="flex items-center">
                    <Upload className="w-5 h-5 mr-2" />
                    Upload Schedule Document
                  </CardTitle>
                  <CardDescription className="text-purple-100">
                    Upload the schedule document that will be shared with selected groups
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {!formData.scheduleFile ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Document</h3>
                      <p className="text-gray-600 mb-4">Click to select or drag and drop your schedule file</p>
                      <div className="text-sm text-gray-500 mb-4">
                        Supported: only  PDF
                        <br />
                        Maximum size: 10MB
                      </div>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById("file-upload")?.click()}
                        className="border-purple-300 text-purple-700 hover:bg-purple-50"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Select File
                      </Button>
                    </div>
                  ) : (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">{getFileIcon(formData.scheduleFile)}</div>
                          <div>
                            <div className="font-medium text-green-900">{formData.scheduleFile.name}</div>
                            <div className="text-sm text-green-700">
                              {(formData.scheduleFile.size / 1024 / 1024).toFixed(2)} MB
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button type="button" variant="ghost" size="sm" className="text-green-700">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={removeFile}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

          {/* Validation Alerts */}
          {!isFormValid() && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Please complete all required fields:
                {selectedCombinations.length === 0 && " Target Groups,"}
                {!formData.scheduleFile && " Schedule Document"}
              </AlertDescription>
            </Alert>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={resetForm}
              className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset Form
            </Button>

            <Button
              type="submit"
              disabled={!isFormValid() || isSubmitting}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg px-8"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Publish Schedule
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateSchedule
