"use client"

import type React from "react"

import { getLocalStorage } from "@/utils/localStorage"
import { useEffect, useState } from "react"
import { Calendar } from "../ui/calendar"
import { useAddMessage } from "@/lib/react-query/mutations/addMessage"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"

import {
  Send,
  Users,
  GraduationCap,
  Building2,
  CalendarIcon,
  Clock,
  X,
  Search,
  Eye,
  Save,
  Upload,
  Paperclip,
  MessageSquare,
  Target,
  Loader2,
} from "lucide-react"
import { format } from "date-fns"
import { Toaster } from "../ui/sonner"
import { toast } from "sonner"
import { Alert, AlertDescription } from "../ui/alert"

// Updated interface to match your payload structure
interface MessagePayload {
  title: string
  message: string
  deadline?: string
  is_active?: boolean
  authorId: number
  senderType: "Registrar" | "Department" | "Teacher"
  targetType: "Student" | "Teacher" 
  targetIds: number[] 
}

interface Department {
  id: number
  name: string
  code: string
}

interface Teacher {
  id: number
  user: {
    firstName: string
    lastName:string
    email: string
  }
 
}

interface Section {
  id: number
  name: string
  grade: string
  studentCount: number
}

interface MessageFormData {
  title: string
  message: string
  deadline?: Date | undefined
  priority: "low" | "medium" | "high"
  isUrgent: boolean
  requiresResponse: boolean
}

const AddMessage = () => {
  const [targetType, setTargetType] = useState<"Student" | "Teacher" >("Student")
  const [targetIds, setTargetIds] = useState<number[]>([])
  const [selectedTargets, setSelectedTargets] = useState<any[]>([])
//   const [departmentList, setDepartmentList] = useState<Department[]>([])
  const [sectionList, setSectionList] = useState<Section[]>([])
  const [teacherList, setTeacherList] = useState<Teacher[]>([])
  const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>([])
  const [filteredSections, setFilteredSections] = useState<Section[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState<number>()

  const [formData, setFormData] = useState<MessageFormData>({
    title: "",
    message: "",
    deadline: undefined,
    priority: "medium",
    isUrgent: false,
    requiresResponse: false,

  })

 

  const userType = typeof window !== "undefined" ? getLocalStorage("userType") : undefined
  const userIdRaw = typeof window !== "undefined" ? getLocalStorage("userId") : undefined
  const userId = userIdRaw !== undefined && userIdRaw !== null ? Number(userIdRaw) : undefined
  const teacherId = typeof window !== 'undefined' ? getLocalStorage('teacherId') : undefined

  const departmentId = typeof window !== 'undefined' ? getLocalStorage('departmentId') : undefined

  // Map user type to sender type
  const getSenderType = (userType: string): "Registrar" | "Department" | "Teacher" => {
    switch (userType?.toLowerCase()) {
      case "registrar":
        return "Registrar"
      case "department":
      case "department_head":
        return "Department"
      case "teacher":
      case "instructor":
        return "Teacher"
      default:
        return "Teacher" 
    }
  }

 


//   async function fetchDepartments() {
//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/departments`)
//       if (!res.ok) throw new Error("Failed to fetch departments")
//       const data = await res.json()
//       setDepartmentList(data)
//     } catch (e) {
//       // fallback to mock data
//       setDepartmentList(mockDepartments)
//       console.error("Error fetching departments, using mock data:", e)
//       toast("Error",{
//         description: "Failed to fetch departments, using demo data.",
//         className: 'text-yellow-500'
//       })
//     }
//   }

  const fetchAllClasses = async (teacherId?: number) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/sections/by-teacher/${teacherId}`

      const res = await fetch(url)
      if (!res.ok) throw new Error("Failed to fetch classes")
      const data = await res.json()
      setSectionList(data)
      setFilteredSections(data)
    } catch (e) {
      console.error("Error fetching classes, using mock data:", e)
      toast("Error",{
        description: "Failed to fetch classes, using demo data.",
        className: 'text-yellow-500'
      })
    }
  }

  const fetchAllTeachers = async (departmentId?: number) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/teachers/by-department-id/${departmentId}`
      const res = await fetch(url)
      if (!res.ok) throw new Error("Failed to fetch teachers")
      const data = await res.json()
      setTeacherList(data)
      setFilteredTeachers(data)
    } catch (e) {
      console.error("Error fetching teachers, using mock data:", e)
      toast("Error",{
        description: "Failed to fetch teachers, using demo data.",
        className: 'text-yellow-500'
      })
    }
  }

  useEffect(() => {
    Promise.all([
      fetchAllClasses(teacherId !== undefined && teacherId !== null ? Number(teacherId) : undefined),
      fetchAllTeachers(departmentId !== undefined && departmentId !== null ? Number(departmentId) : undefined)
    ]).catch((error) => {
      console.error("Error fetching initial data:", error)
    })
  }, [userId])

  // Filter functions
  useEffect(() => {
    if (targetType === "Teacher") {
      let filtered = teacherList
     
      if (searchQuery) {
        filtered = filtered.filter(
          (teacher) =>
            teacher.user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            teacher.user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            teacher.user.email.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      }
      setFilteredTeachers(filtered)
    } else if (targetType === "Student") {
      let filtered = sectionList
      if (searchQuery) {
        filtered = filtered.filter(
          (section) =>
            section.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            section.grade.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      }
      setFilteredSections(filtered)
    }
  }, [targetType, selectedDepartment, searchQuery, teacherList, sectionList])

  const { mutate, isError, isPending, isSuccess } = useAddMessage()

  // Handle target selection
  const handleTargetSelection = (id: number, item: any) => {
    const isSelected = targetIds.includes(id)
    if (isSelected) {
      setTargetIds(targetIds.filter((targetId) => targetId !== id))
      setSelectedTargets(selectedTargets.filter((target) => target.id !== id))
    } else {
      setTargetIds([...targetIds, id])
      setSelectedTargets([...selectedTargets, item])
    }
  }

  // Select all functionality
  const handleSelectAll = () => {
    let allItems: any[] = []
    let allIds: number[] = []

   if (targetType === "Teacher") {
      allItems = filteredTeachers
      allIds = filteredTeachers.map((teacher) => teacher.id)
    } else if (targetType === "Student") {
      allItems = filteredSections
      allIds = filteredSections.map((section) => section.id)
    }

    const allSelected = allIds.every((id) => targetIds.includes(id))

    if (allSelected) {
      // Deselect all
      setTargetIds([])
      setSelectedTargets([])
    } else {
      // Select all
      setTargetIds(allIds)
      setSelectedTargets(allItems)
    }
  }




  // Simple validation for single-step form
  const isFormValid =
    targetType &&
    targetIds.length > 0 &&
    formData.title.trim() &&
    formData.message.trim() &&
    formData.deadline

  // Handle form submission with correct payload structure
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!targetType || targetIds.length === 0 || !formData.deadline || userId === undefined) {
      toast("Validation Error",{
        description: "Please fill in all required fields",
       className: 'text-red-500'
      })
      return
    }

    if (!userType) {
      toast( "Authentication Error",{
        description: "User type not found. Please log in again.",
        className: 'text-red-500'
      })
      return
    }


    console.log('target', targetType)
 

    // Create payload according to your interface
    const payload: MessagePayload = {
      title: formData.title,
      message: formData.message,
      deadline: formData.deadline?.toISOString() || "",
      is_active: true,
      authorId: userId,
      senderType: getSenderType(userType),
      targetType: targetType,
      targetIds: targetIds ?? [],
    }

    console.log("Submitting payload:", payload)

    mutate(payload)
  }


  const getTargetIcon = (type: string) => {
    switch (type) {
      case "Students":
        return <GraduationCap className="w-4 h-4 mr-2" />
      case "Teachers":
        return <Users className="w-4 h-4 mr-2" />
      case "Departments":
        return <Building2 className="w-4 h-4 mr-2" />
      default:
        return <Target className="w-4 h-4" />
    }
  }


  useEffect(() => {
    if (isSuccess) {
      toast("Success!",{
        description: "Message sent successfully",
      })

      setFormData({
        title: "",
        message: "",
        deadline: undefined,
        priority: "medium",
        isUrgent: false,
        requiresResponse: false,
      })
      setTargetIds([])
      setSelectedTargets([])
 

    }
  }, [isSuccess, toast])

  useEffect(() => {
    if (isError) {
      toast("Error",{
      
        description: "Failed to send message. Please try again.",
      className:'text-red-500'
      })
    }
  }, [isError, toast])



  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Compose Message</h1>
          <p className="text-gray-600 mt-1">Send messages to students, teachers, or departments</p>
          <div className="flex items-center mt-2 text-sm text-gray-500">
            <span className="font-medium">Sending as:</span>
            <Badge variant="outline" className="ml-2">
              {getSenderType(userType || "")}
            </Badge>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Recipients Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Select Recipients</CardTitle>
            <CardDescription>Choose who will receive this message</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Target Type Selection */}
            <div>
              <Label>Target Type</Label>
              <Select
                value={targetType}
                onValueChange={(value: any) => {
                  setTargetType(value)
                  setTargetIds([])
                  setSelectedTargets([])
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select target type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Student">
                    <div className="flex items-center">
                      <GraduationCap className="w-4 h-4 mr-2" />
                      Sections
                    </div>
                  </SelectItem>
                  {userType != 'Teacher' ?  (<>
                  <SelectItem value="Teacher">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      Teachers
                    </div>
                  </SelectItem>
                  {/* <SelectItem value="Departments">
                    <div className="flex items-center">
                      <Building2 className="w-4 h-4 mr-2" />
                      Departments
                    </div>
                  </SelectItem> */}
                  </>
                 )
                : null}
                </SelectContent>
              </Select>
            </div>

            <div className="flex space-x-2">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder={`Search ${targetType.toLowerCase()}...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              {/* {targetType === "Teachers" && (
                <Select
                  value={selectedDepartment?.toString() || "0"}
                  onValueChange={(value) => setSelectedDepartment(value ? Number(value) : undefined)}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Departments</SelectItem>
                    {departmentList.map((dept) => (
                      <SelectItem key={dept.id} value={dept.id.toString()}>
                        {dept.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              <Button type="button" variant="outline" onClick={handleSelectAll}>
                {targetIds.length > 0 ? "Deselect All" : "Select All"}
              </Button> */}
            </div>

            {/* Recipients List */}
            <ScrollArea className="h-64 border rounded-md p-4">
              <div className="space-y-2">
                {/* {targetType === "Departments" &&
                  departmentList.map((department) => (
                    <div
                      key={department.id}
                      className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md"
                    >
                      <Checkbox
                        checked={targetIds.includes(department.id)}
                        onCheckedChange={() => handleTargetSelection(department.id, department)}
                      />
                      <Building2 className="w-4 h-4 text-gray-500" />
                      <div className="flex-1">
                        <p className="font-medium">{department.name}</p>
                        <p className="text-sm text-gray-500">Code: {department.code}</p>
                      </div>
                    </div>
                  ))} */}

                {targetType === "Teacher" &&
                  filteredTeachers.map((teacher) => (
                    <div
                      key={teacher.id}
                      className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md"
                    >
                      <Checkbox
                        checked={targetIds.includes(teacher.id)}
                        onCheckedChange={() => handleTargetSelection(teacher.id, teacher)}
                      />
                      <Users className="w-4 h-4 text-gray-500" />
                      <div className="flex-1">
                        <p className="font-medium">{teacher?.user?.firstName}</p>
                        <p className="text-sm text-gray-500">{teacher?.user?.email}</p>
                      </div>
                    </div>
                  ))}

                {targetType === "Student" &&
                  filteredSections.map((section) => (
                    <div
                      key={section.id}
                      className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md"
                    >
                      <Checkbox
                        checked={targetIds.includes(section.id)}
                        onCheckedChange={() => handleTargetSelection(section.id, section)}
                      />
                      <GraduationCap className="w-4 h-4 text-gray-500" />
                      <div className="flex-1">
                        <p className="font-medium">{section.name}</p>
                        <p className="text-sm text-gray-500">
                          Grade {section.grade} • {section.studentCount} students
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Message Content */}
        <Card>
          <CardHeader>
            <CardTitle>Compose Message</CardTitle>
            <CardDescription>Write your message content and set deadline</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Message Title */}
            <div>
              <Label htmlFor="title">Message Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Enter message title"
                className="mt-1"
                maxLength={100}
              />
              <p className="text-xs text-gray-500 mt-1">{formData.title.length}/100 characters</p>
            </div>

            {/* Message Content */}
            <div>
              <Label htmlFor="message">Message Content *</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                placeholder="Enter your message here..."
                rows={6}
                className="mt-1"
                maxLength={1000}
              />
              <p className="text-xs text-gray-500 mt-1">{formData.message.length}/1000 characters</p>
            </div>

            {/* Deadline */}
            <div>
              <Label>Deadline </Label>
              <div className="mt-2">
                <Calendar
                  mode="single"
                  selected={formData.deadline}
                  onSelect={(date) => setFormData((prev) => ({ ...prev, deadline: date }))}
                  className="rounded-md border shadow-sm"
                  captionLayout="dropdown"
                  disabled={(date) => date < new Date()}
                />
              </div>
            </div>

            {formData.deadline && (
              <Alert>
                <Clock className="h-4 w-4" />
                <AlertDescription>
                  Message will be delivered immediately with deadline set for{" "}
                  <strong>{format(formData.deadline, "PPP")}</strong>
                </AlertDescription>
              </Alert>
            )}

            {/* Summary before sending */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Message Summary</h4>
              <div className="space-y-1 text-sm text-blue-800">
                <p>
                  <strong>Recipients:</strong> {selectedTargets.length} {targetType === 'Student' ? "Section" :  targetType.toLowerCase()}
                </p>
                <p>
                  <strong>Title:</strong> {formData.title || "Untitled"}
                </p>
                <p>
                  <strong>Sender Type:</strong> {getSenderType(userType || "")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button type="submit" disabled={!isFormValid || isPending}>
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  ) 
}


export default AddMessage
