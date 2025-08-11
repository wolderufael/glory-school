"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Calendar, Clock, Users, BookOpen, Save, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

// Types
interface TimeSlot {
  id: string
  day: string
  period: string
  room: string
  startTime: string
  endTime: string
}

interface Course {
  id: string
  code: string
  name: string
  creditHours: number
}

interface Section {
  id: string
  name: string
  department: string
  level: string
  course: Course
  timeSlots: TimeSlot[]
  totalStudents: number
}

interface Student {
  id: string
  studentId: string
  firstName: string
  lastName: string
  email: string
  profileImage?: string
}

interface AttendanceRecord {
  studentId: string
  status: "present" | "absent" | "excused"
  timeSlotId: string
  notes?: string
}

interface AttendanceSession {
  id: string
  sectionId: string
  timeSlotId: string
  date: string
  records: AttendanceRecord[]
  isSubmitted: boolean
}

// Mock data for high school
const mockTeacherSections: Section[] = [
  {
    id: "sec-1",
    name: "Section A",
    department: "Science",
    level: "10th Grade",
    course: {
      id: "course-1",
      code: "SCI BIO 10 2025",
      name: "Biology: Plant and Animal Systems",
      creditHours: 4, // Replaced credit hours with periods per week
    },
    timeSlots: [
      {
        id: "ts-1",
        day: "Monday",
        period: "3-4",
        room: "Room B-12",
        startTime: "10:00",
        endTime: "11:30",
      },
      {
        id: "ts-2",
        day: "Thursday",
        period: "3-4",
        room: "Room B-12",
        startTime: "10:00",
        endTime: "11:30",
      },
    ],
    totalStudents: 25,
  },
  {
    id: "sec-2",
    name: "Section B",
    department: "Science",
    level: "10th Grade",
    course: {
      id: "course-2",
      code: "SCI CHEM 10 2025",
      name: "Chemistry: Basics of Matter",
      creditHours: 3,
    },
    timeSlots: [
      {
        id: "ts-3",
        day: "Tuesday",
        period: "3-4",
        room: "Room B-12",
        startTime: "10:00",
        endTime: "11:30",
      },
      {
        id: "ts-4",
        day: "Wednesday",
        period: "3-4",
        room: "Room B-12",
        startTime: "10:00",
        endTime: "11:30",
      },
    ],
    totalStudents: 28,
  },
  {
    id: "sec-3",
    name: "Section C",
    department: "Science",
    level: "11th Grade",
    course: {
      id: "course-3",
      code: "SCI PHY 11 2025",
      name: "Physics: Mechanics",
      creditHours: 5,
    },
    timeSlots: [
      {
        id: "ts-5",
        day: "Monday",
        period: "1-2",
        room: "Room C-15",
        startTime: "08:00",
        endTime: "09:30",
      },
      {
        id: "ts-6",
        day: "Wednesday",
        period: "1-2",
        room: "Room C-15",
        startTime: "08:00",
        endTime: "09:30",
      },
      {
        id: "ts-7",
        day: "Friday",
        period: "2-3",
        room: "Room C-15",
        startTime: "09:45",
        endTime: "11:15",
      },
    ],
    totalStudents: 22,
  },
];

const mockStudents: Student[] = [
  {
    id: "1",
    studentId: "HS/2025/001",
    firstName: "Abebe",
    lastName: "Kebede",
    email: "abebe.kebede@highschool.edu",
  },
  {
    id: "2",
    studentId: "HS/2025/002",
    firstName: "Almaz",
    lastName: "Tadesse",
    email: "almaz.tadesse@highschool.edu",
  },
  {
    id: "3",
    studentId: "HS/2025/003",
    firstName: "Dawit",
    lastName: "Yohannes",
    email: "dawit.yohannes@highschool.edu",
  },
  {
    id: "4",
    studentId: "HS/2025/004",
    firstName: "Hanan",
    lastName: "Mohammed",
    email: "hanan.mohammed@highschool.edu",
  },
  {
    id: "5",
    studentId: "HS/2025/005",
    firstName: "Kalkidan",
    lastName: "Assefa",
    email: "kalkidan.assefa@highschool.edu",
  },
  {
    id: "6",
    studentId: "HS/2025/006",
    firstName: "Meron",
    lastName: "Girma",
    email: "meron.girma@highschool.edu",
  },
  {
    id: "7",
    studentId: "HS/2025/007",
    firstName: "Natnael",
    lastName: "Bekele",
    email: "natnael.bekele@highschool.edu",
  },
  {
    id: "8",
    studentId: "HS/2025/008",
    firstName: "Ruth",
    lastName: "Haile",
    email: "ruth.haile@highschool.edu",
  },
  {
    id: "9",
    studentId: "HS/2025/009",
    firstName: "Samuel",
    lastName: "Tesfaye",
    email: "samuel.tesfaye@highschool.edu",
  },
  {
    id: "10",
    studentId: "HS/2025/010",
    firstName: "Tigist",
    lastName: "Wolde",
    email: "tigist.wolde@highschool.edu",
  },
  {
    id: "11",
    studentId: "HS/2025/011",
    firstName: "Yonas",
    lastName: "Desta",
    email: "yonas.desta@highschool.edu",
  },
  {
    id: "12",
    studentId: "HS/2025/012",
    firstName: "Zara",
    lastName: "Ahmed",
    email: "zara.ahmed@highschool.edu",
  },
  {
    id: "13",
    studentId: "HS/2025/013",
    firstName: "Bereket",
    lastName: "Solomon",
    email: "bereket.solomon@highschool.edu",
  },
  {
    id: "14",
    studentId: "HS/2025/014",
    firstName: "Eden",
    lastName: "Mulugeta",
    email: "eden.mulugeta@highschool.edu",
  },
  {
    id: "15",
    studentId: "HS/2025/015",
    firstName: "Fasil",
    lastName: "Getachew",
    email: "fasil.getachew@highschool.edu",
  },
  {
    id: "16",
    studentId: "HS/2025/016",
    firstName: "Gelila",
    lastName: "Negash",
    email: "gelila.negash@highschool.edu",
  },
  {
    id: "17",
    studentId: "HS/2025/017",
    firstName: "Henok",
    lastName: "Tadele",
    email: "henok.tadele@highschool.edu",
  },
  {
    id: "18",
    studentId: "HS/2025/018",
    firstName: "Iyasu",
    lastName: "Mekonnen",
    email: "iyasu.mekonnen@highschool.edu",
  },
  {
    id: "19",
    studentId: "HS/2025/019",
    firstName: "Kidist",
    lastName: "Alemayehu",
    email: "kidist.alemayehu@highschool.edu",
  },
  {
    id: "20",
    studentId: "HS/2025/020",
    firstName: "Liya",
    lastName: "Teshome",
    email: "liya.teshome@highschool.edu",
  },
  {
    id: "21",
    studentId: "HS/2025/021",
    firstName: "Mahlet",
    lastName: "Berhane",
    email: "mahlet.berhane@highschool.edu",
  },
  {
    id: "22",
    studentId: "HS/2025/022",
    firstName: "Natan",
    lastName: "Worku",
    email: "natan.worku@highschool.edu",
  },
  {
    id: "23",
    studentId: "HS/2025/023",
    firstName: "Rahel",
    lastName: "Shiferaw",
    email: "rahel.shiferaw@highschool.edu",
  },
  {
    id: "24",
    studentId: "HS/2025/024",
    firstName: "Saron",
    lastName: "Tilahun",
    email: "saron.tilahun@highschool.edu",
  },
  {
    id: "25",
    studentId: "HS/2025/025",
    firstName: "Temesgen",
    lastName: "Abera",
    email: "temesgen.abera@highschool.edu",
  },
];

export default function TeacherAttendance() {
  const [teacherId] = useState("teacher-001")
  const [teacherSections, setTeacherSections] = useState<Section[]>([])
  const [selectedSection, setSelectedSection] = useState<Section | null>(null)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null)
  const [students, setStudents] = useState<Student[]>([])
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([])
  const [attendanceDate, setAttendanceDate] = useState<string>(new Date().toISOString().split("T")[0])
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle")

  // Load teacher's assigned sections
  useEffect(() => {
    const loadTeacherSections = async () => {
      setIsLoading(true)
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setTeacherSections(mockTeacherSections)
      } catch (error) {
        console.error("Error loading teacher sections:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (teacherId) {
      loadTeacherSections()
    }
  }, [teacherId])

  // Load students when section is selected
  useEffect(() => {
    const loadStudents = async () => {
      if (!selectedSection) return

      setIsLoading(true)
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800))
        setStudents(mockStudents.slice(0, selectedSection.totalStudents))

        // Initialize attendance records
        const initialRecords: AttendanceRecord[] = mockStudents
          .slice(0, selectedSection.totalStudents)
          .map((student) => ({
            studentId: student.id,
            status: "present" as const,
            timeSlotId: selectedTimeSlot?.id || "",
            notes: "",
          }))
        setAttendanceRecords(initialRecords)
      } catch (error) {
        console.error("Error loading students:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadStudents()
  }, [selectedSection, selectedTimeSlot])

  const handleSectionChange = (sectionId: string) => {
    const section = teacherSections.find((s) => s.id === sectionId)
    setSelectedSection(section || null)
    setSelectedTimeSlot(null)
    setAttendanceRecords([])
  }

  const handleTimeSlotChange = (timeSlotId: string) => {
    if (!selectedSection) return
    const timeSlot = selectedSection.timeSlots.find((ts) => ts.id === timeSlotId)
    setSelectedTimeSlot(timeSlot || null)
  }

  const updateAttendanceStatus = (studentId: string, status: AttendanceRecord["status"]) => {
    setAttendanceRecords((prev) =>
      prev.map((record) =>
        record.studentId === studentId ? { ...record, status, timeSlotId: selectedTimeSlot?.id || "" } : record,
      ),
    )
  }

  const updateAttendanceNotes = (studentId: string, notes: string) => {
    setAttendanceRecords((prev) =>
      prev.map((record) => (record.studentId === studentId ? { ...record, notes } : record)),
    )
  }

  const handleSaveAttendance = async () => {
    if (!selectedSection || !selectedTimeSlot || attendanceRecords.length === 0) return

    setIsSaving(true)
    setSaveStatus("idle")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const attendanceSession: AttendanceSession = {
        id: `session-${Date.now()}`,
        sectionId: selectedSection.id,
        timeSlotId: selectedTimeSlot.id,
        date: attendanceDate,
        records: attendanceRecords,
        isSubmitted: true,
      }

      console.log("Saving attendance:", attendanceSession)
      setSaveStatus("success")

      // Reset form after successful save
      setTimeout(() => {
        setSaveStatus("idle")
      }, 3000)
    } catch (error) {
      console.error("Error saving attendance:", error)
      setSaveStatus("error")
    } finally {
      setIsSaving(false)
    }
  }

  const getAttendanceStats = () => {
    const present = attendanceRecords.filter((r) => r.status === "present").length
    const absent = attendanceRecords.filter((r) => r.status === "absent").length
    const excused = attendanceRecords.filter((r) => r.status === "excused").length
    const total = attendanceRecords.length

    return { present, absent,  excused, total }
  }

  const stats = getAttendanceStats()

  if (isLoading && teacherSections.length === 0) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your assigned sections...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Class Attendance</h1>
          <p className="text-gray-600 mt-1">Take attendance for your assigned classes</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Calendar className="h-4 w-4" />
          <span>
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Section and Time Slot Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5" />
            <span>Class Selection</span>
          </CardTitle>
          <CardDescription>Select the section and time slot for attendance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Section</label>
              <Select value={selectedSection?.id || ""} onValueChange={handleSectionChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a section" />
                </SelectTrigger>
                <SelectContent>
                  {teacherSections.map((section) => (
                    <SelectItem key={section.id} value={section.id}>
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {section.department} - {section.level} - {section.name}
                        </span>
                        <span className="text-sm text-gray-500">
                          {section.course.code} - {section.course.name}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Time Slot</label>
              <Select
                value={selectedTimeSlot?.id || ""}
                onValueChange={handleTimeSlotChange}
                disabled={!selectedSection}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select time slot" />
                </SelectTrigger>
                <SelectContent>
                  {selectedSection?.timeSlots.map((timeSlot) => (
                    <SelectItem key={timeSlot.id} value={timeSlot.id}>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>
                          {timeSlot.day} {timeSlot.period} ({timeSlot.startTime}-{timeSlot.endTime}) - {timeSlot.room}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {selectedSection && selectedTimeSlot && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-blue-900">{selectedSection.course.name}</h3>
                  <p className="text-sm text-blue-700">
                    {selectedSection.course.code} • {selectedSection.department} - {selectedSection.level} -{" "}
                    {selectedSection.name}
                  </p>
                  <p className="text-sm text-blue-600">
                    {selectedTimeSlot.day} {selectedTimeSlot.period} ({selectedTimeSlot.startTime}-
                    {selectedTimeSlot.endTime}) • {selectedTimeSlot.room}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 text-blue-700">
                    <Users className="h-4 w-4" />
                    <span className="font-medium">{selectedSection.totalStudents} Students</span>
                  </div>
                  <div className="text-sm text-blue-600">{selectedSection.course.creditHours} Credit Hours</div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Attendance Table */}
      {selectedSection && selectedTimeSlot && students.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Student Attendance</span>
                </CardTitle>
                <CardDescription>Mark attendance for {attendanceDate}</CardDescription>
              </div>
              <div className="flex items-center space-x-4">
                <input
                  type="date"
                  value={attendanceDate}
                  onChange={(e) => setAttendanceDate(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
                <Button
                  onClick={handleSaveAttendance}
                  disabled={isSaving || attendanceRecords.length === 0}
                  className="flex items-center space-x-2"
                >
                  {isSaving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      <span>Save Attendance</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Attendance Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                <div className="text-sm text-gray-600">Total</div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600">{stats.present}</div>
                <div className="text-sm text-green-700">Present</div>
              </div>
              <div className="bg-red-50 p-3 rounded-lg text-center">
                <div className="text-2xl font-bold text-red-600">{stats.absent}</div>
                <div className="text-sm text-red-700">Absent</div>
              </div>
              {/* <div className="bg-yellow-50 p-3 rounded-lg text-center">
                <div className="text-2xl font-bold text-yellow-600">{stats.late}</div>
                <div className="text-sm text-yellow-700">Late</div>
              </div> */}
              <div className="bg-blue-50 p-3 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.excused}</div>
                <div className="text-sm text-blue-700">Excused</div>
              </div>
            </div>

            <Separator className="my-4" />

            {/* Student List */}
            <ScrollArea className="h-[600px]">
              <div className="space-y-2">
                {students.map((student, index) => {
                  const record = attendanceRecords.find((r) => r.studentId === student.id)
                  return (
                    <div
                      key={student.id}
                      className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex-shrink-0 w-8 text-center text-sm font-medium text-gray-500">{index + 1}</div>

                      <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-600">
                          {student.firstName.charAt(0)}
                          {student.lastName.charAt(0)}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {student.firstName} {student.lastName}
                          </p>
                          <Badge variant="outline" className="text-xs">
                            {student.studentId}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500 truncate">{student.email}</p>
                      </div>

                      <div className="flex items-center space-x-2">
                        {/* Present */}
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <Checkbox
                            checked={record?.status === "present"}
                            onCheckedChange={() => updateAttendanceStatus(student.id, "present")}
                          />
                          <span className="text-sm text-green-700">Present</span>
                        </label>

                        {/* Absent */}
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <Checkbox
                            checked={record?.status === "absent"}
                            onCheckedChange={() => updateAttendanceStatus(student.id, "absent")}
                          />
                          <span className="text-sm text-red-700">Absent</span>
                        </label>

                        {/* Late */}
                        {/* <label className="flex items-center space-x-2 cursor-pointer">
                          <Checkbox
                            checked={record?.status === "late"}
                            onCheckedChange={() => updateAttendanceStatus(student.id, "late")}
                          />
                          <span className="text-sm text-yellow-700">Late</span>
                        </label> */}

                        {/* Excused */}
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <Checkbox
                            checked={record?.status === "excused"}
                            onCheckedChange={() => updateAttendanceStatus(student.id, "excused")}
                          />
                          <span className="text-sm text-blue-700">Excused</span>
                        </label>
                      </div>

                      <div className="flex-shrink-0 w-32">
                        <input
                          type="text"
                          placeholder="Notes..."
                          value={record?.notes || ""}
                          onChange={(e) => updateAttendanceNotes(student.id, e.target.value)}
                          className="w-full px-2 py-1 text-xs border border-gray-300 rounded"
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </ScrollArea>

            {/* Save Status */}
            {saveStatus !== "idle" && (
              <div
                className={cn(
                  "mt-4 p-3 rounded-lg flex items-center space-x-2",
                  saveStatus === "success" && "bg-green-50 text-green-700",
                  saveStatus === "error" && "bg-red-50 text-red-700",
                )}
              >
                {saveStatus === "success" && <CheckCircle className="h-5 w-5" />}
                {saveStatus === "error" && <XCircle className="h-5 w-5" />}
                <span>
                  {saveStatus === "success" && "Attendance saved successfully!"}
                  {saveStatus === "error" && "Error saving attendance. Please try again."}
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {teacherSections.length === 0 && !isLoading && (
        <Card>
          <CardContent className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Assigned Sections</h3>
            <p className="text-gray-600">
              You don't have any sections assigned to you. Please contact the registrar's office.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
