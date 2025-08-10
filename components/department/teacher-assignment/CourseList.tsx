import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Course } from "@/lib/react-query/queries/getCourses";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { AssignmentConfirmDialog } from "./AssignmentConfirmDialog";
import { TeachingAssignment } from "@/types/assessment";

interface CourseListProps {
  departmentId: string;
  gradeId: string;
  sectionId: string;
  academicSemesterId: string;
  academicYearId: string;
  selectedCourseId?: string;
  onCourseSelect?: (courseId: string) => void;
}

export default function CourseList({
  departmentId,
  gradeId,
  sectionId,
  academicSemesterId,
  academicYearId,
  selectedCourseId,
  onCourseSelect,
}: CourseListProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] =
    useState<TeachingAssignment | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [reAssign, setReAssign] = useState(false);

  // Simulate loading and use mock data
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Mock high school subjects data
    const mockHighSchoolSubjects: Course[] = [
      {
        id: 1,
        collegeId: 1,
        departmentId: 1,
        level: "FIRST" as any,
        title: "Mathematics",
        courseCode: "MATH-" + gradeId,
        theoryNhrs: 3,
        practicalNhrs: 1,
        cooperativeNhrs: 0,
        totalNhrs: 4,
        createdAt: new Date(),
        assigned: false,
        teacherName: "",
      },
      {
        id: 2,
        collegeId: 1,
        departmentId: 1,
        level: "FIRST" as any,
        title: "Physics",
        courseCode: "PHYS-" + gradeId,
        theoryNhrs: 3,
        practicalNhrs: 1,
        cooperativeNhrs: 0,
        totalNhrs: 4,
        createdAt: new Date(),
        assigned: true,
        teacherName: "Dr. Sarah Johnson",
      },
      {
        id: 3,
        collegeId: 1,
        departmentId: 1,
        level: "FIRST" as any,
        title: "Chemistry",
        courseCode: "CHEM-" + gradeId,
        theoryNhrs: 3,
        practicalNhrs: 1,
        cooperativeNhrs: 0,
        totalNhrs: 4,
        createdAt: new Date(),
        assigned: false,
        teacherName: "",
      },
      {
        id: 4,
        collegeId: 1,
        departmentId: 1,
        level: "FIRST" as any,
        title: "Biology",
        courseCode: "BIOL-" + gradeId,
        theoryNhrs: 3,
        practicalNhrs: 1,
        cooperativeNhrs: 0,
        totalNhrs: 4,
        createdAt: new Date(),
        assigned: true,
        teacherName: "Ms. Emily Davis",
      },
      {
        id: 5,
        collegeId: 1,
        departmentId: 1,
        level: "FIRST" as any,
        title: "English Language",
        courseCode: "ENG-" + gradeId,
        theoryNhrs: 4,
        practicalNhrs: 0,
        cooperativeNhrs: 0,
        totalNhrs: 4,
        createdAt: new Date(),
        assigned: false,
        teacherName: "",
      },
      {
        id: 6,
        collegeId: 1,
        departmentId: 1,
        level: "FIRST" as any,
        title: "History",
        courseCode: "HIST-" + gradeId,
        theoryNhrs: 3,
        practicalNhrs: 0,
        cooperativeNhrs: 0,
        totalNhrs: 3,
        createdAt: new Date(),
        assigned: true,
        teacherName: "Mr. Michael Wilson",
      },
      {
        id: 7,
        collegeId: 1,
        departmentId: 1,
        level: "FIRST" as any,
        title: "Geography",
        courseCode: "GEO-" + gradeId,
        theoryNhrs: 3,
        practicalNhrs: 0,
        cooperativeNhrs: 0,
        totalNhrs: 3,
        createdAt: new Date(),
        assigned: false,
        teacherName: "",
      },
      {
        id: 8,
        collegeId: 1,
        departmentId: 1,
        level: "FIRST" as any,
        title: "Civics and Ethics",
        courseCode: "CIV-" + gradeId,
        theoryNhrs: 2,
        practicalNhrs: 0,
        cooperativeNhrs: 0,
        totalNhrs: 2,
        createdAt: new Date(),
        assigned: false,
        teacherName: "",
      },
      {
        id: 9,
        collegeId: 1,
        departmentId: 1,
        level: "FIRST" as any,
        title: "Information Technology",
        courseCode: "IT-" + gradeId,
        theoryNhrs: 2,
        practicalNhrs: 2,
        cooperativeNhrs: 0,
        totalNhrs: 4,
        createdAt: new Date(),
        assigned: true,
        teacherName: "Mr. David Chen",
      },
      {
        id: 10,
        collegeId: 1,
        departmentId: 1,
        level: "FIRST" as any,
        title: "Physical Education",
        courseCode: "PE-" + gradeId,
        theoryNhrs: 1,
        practicalNhrs: 2,
        cooperativeNhrs: 0,
        totalNhrs: 3,
        createdAt: new Date(),
        assigned: false,
        teacherName: "",
      },
    ];

    // Simulate API call delay
    const timer = setTimeout(() => {
      if (gradeId && sectionId) {
        setCourses(mockHighSchoolSubjects);
        setError(null);
      } else {
        setCourses([]);
      }
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [gradeId, sectionId]);

  const refetch = () => {
    setIsLoading(true);
    setTimeout(() => {
      // Recreate mock data for refetch
      const mockHighSchoolSubjects: Course[] = [
        {
          id: 1,
          collegeId: 1,
          departmentId: 1,
          level: "FIRST" as any,
          title: "Mathematics",
          courseCode: "MATH-" + gradeId,
          theoryNhrs: 3,
          practicalNhrs: 1,
          cooperativeNhrs: 0,
          totalNhrs: 4,
          createdAt: new Date(),
          assigned: false,
          teacherName: "",
        },
        {
          id: 2,
          collegeId: 1,
          departmentId: 1,
          level: "FIRST" as any,
          title: "Physics",
          courseCode: "PHYS-" + gradeId,
          theoryNhrs: 3,
          practicalNhrs: 1,
          cooperativeNhrs: 0,
          totalNhrs: 4,
          createdAt: new Date(),
          assigned: true,
          teacherName: "Dr. Sarah Johnson",
        },
        {
          id: 3,
          collegeId: 1,
          departmentId: 1,
          level: "FIRST" as any,
          title: "Chemistry",
          courseCode: "CHEM-" + gradeId,
          theoryNhrs: 3,
          practicalNhrs: 1,
          cooperativeNhrs: 0,
          totalNhrs: 4,
          createdAt: new Date(),
          assigned: false,
          teacherName: "",
        },
        {
          id: 4,
          collegeId: 1,
          departmentId: 1,
          level: "FIRST" as any,
          title: "Biology",
          courseCode: "BIOL-" + gradeId,
          theoryNhrs: 3,
          practicalNhrs: 1,
          cooperativeNhrs: 0,
          totalNhrs: 4,
          createdAt: new Date(),
          assigned: true,
          teacherName: "Ms. Emily Davis",
        },
        {
          id: 5,
          collegeId: 1,
          departmentId: 1,
          level: "FIRST" as any,
          title: "English Language",
          courseCode: "ENG-" + gradeId,
          theoryNhrs: 4,
          practicalNhrs: 0,
          cooperativeNhrs: 0,
          totalNhrs: 4,
          createdAt: new Date(),
          assigned: false,
          teacherName: "",
        },
        {
          id: 6,
          collegeId: 1,
          departmentId: 1,
          level: "FIRST" as any,
          title: "History",
          courseCode: "HIST-" + gradeId,
          theoryNhrs: 3,
          practicalNhrs: 0,
          cooperativeNhrs: 0,
          totalNhrs: 3,
          createdAt: new Date(),
          assigned: true,
          teacherName: "Mr. Michael Wilson",
        },
        {
          id: 7,
          collegeId: 1,
          departmentId: 1,
          level: "FIRST" as any,
          title: "Geography",
          courseCode: "GEO-" + gradeId,
          theoryNhrs: 3,
          practicalNhrs: 0,
          cooperativeNhrs: 0,
          totalNhrs: 3,
          createdAt: new Date(),
          assigned: false,
          teacherName: "",
        },
        {
          id: 8,
          collegeId: 1,
          departmentId: 1,
          level: "FIRST" as any,
          title: "Civics and Ethics",
          courseCode: "CIV-" + gradeId,
          theoryNhrs: 2,
          practicalNhrs: 0,
          cooperativeNhrs: 0,
          totalNhrs: 2,
          createdAt: new Date(),
          assigned: false,
          teacherName: "",
        },
        {
          id: 9,
          collegeId: 1,
          departmentId: 1,
          level: "FIRST" as any,
          title: "Information Technology",
          courseCode: "IT-" + gradeId,
          theoryNhrs: 2,
          practicalNhrs: 2,
          cooperativeNhrs: 0,
          totalNhrs: 4,
          createdAt: new Date(),
          assigned: true,
          teacherName: "Mr. David Chen",
        },
        {
          id: 10,
          collegeId: 1,
          departmentId: 1,
          level: "FIRST" as any,
          title: "Physical Education",
          courseCode: "PE-" + gradeId,
          theoryNhrs: 1,
          practicalNhrs: 2,
          cooperativeNhrs: 0,
          totalNhrs: 3,
          createdAt: new Date(),
          assigned: false,
          teacherName: "",
        },
      ];
      setCourses(mockHighSchoolSubjects);
      setIsLoading(false);
    }, 300);
  };
  // Mock teaching assignment data - no API call needed
  useEffect(() => {
    if (selectedCourse?.id) {
      // Mock teaching assignment data
      const mockTeachingAssignment: TeachingAssignment = {
        id: selectedCourse.id,
        teacherId: 1,
        courseId: selectedCourse.id,
        sectionId: parseInt(sectionId),
        academicSemesterId: parseInt(academicSemesterId),
        academicYearId: parseInt(academicYearId),
        level: gradeId,
        departmentId: 1,
        teacher: {
          id: 1,
          userId: 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        course: {
          id: selectedCourse.id,
          collegeId: 1,
          departmentId: 1,
          level: gradeId,
          courseCode: selectedCourse.courseCode,
          title: selectedCourse.title,
          theoryNhrs: 3,
          practicalNhrs: 1,
          cooperativeNhrs: 0,
          totalNhrs: 4,
          createdAt: new Date().toISOString(),
        },
        section: {
          id: parseInt(sectionId),
          sectionName: "Section A",
          academicYearId: parseInt(academicYearId),
          createdAt: new Date().toISOString(),
          departmentId: 1,
        },
        academicSemester: {
          id: parseInt(academicSemesterId),
          name: "First Semester",
          academicYearId: parseInt(academicYearId),
          startDate: "2024-09-01",
          endDate: "2025-01-31",
          registrationStartDate: "2024-08-15",
          registrationEndDate: "2024-09-15",
          createdAt: new Date().toISOString(),
        },
      };

      setSelectedAssignment(mockTeachingAssignment);
    } else {
      setSelectedAssignment(null);
    }
  }, [selectedCourse, sectionId, gradeId, academicSemesterId, academicYearId]);

  const handleAssignmentSuccess = () => {
    // Refetch the courses data to get updated assignment status
    refetch();
    setDialogOpen(false);
    setSelectedCourse(null);
    setSelectedAssignment(null);
  };

  if (!gradeId || !sectionId) {
    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-600" />
            Available Subjects
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 text-sm">
            Please select both grade and section to view available subjects
          </p>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="mt-6">
        <CardContent className="flex items-center justify-center py-6">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="mt-6">
        <CardContent className="py-6">
          <p className="text-red-600 text-sm text-center">
            Error loading subjects. Please try again later.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-600" />
            Available Subjects
          </CardTitle>
        </CardHeader>
        <CardContent>
          {courses && courses.length > 0 ? (
            <div className="space-y-4">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className={cn(
                    "border rounded-lg p-4 hover:border-blue-500 transition-colors cursor-pointer",
                    selectedCourseId === course.id.toString() &&
                      "border-blue-500 bg-blue-50"
                  )}
                  onClick={() =>
                    onCourseSelect && onCourseSelect(course.id.toString())
                  }
                >
                  <div>
                    <h3 className="font-xl flex items-center justify-center  text-gray-900">
                      {course.title}
                    </h3>
                    <p className="text-sm flex items-center justify-center text-gray-500">
                      {course.courseCode}
                    </p>
                    <div className="mt-2 flex items-center justify-center pt-2 border-t border-gray-100">
                      <div className="flex items-center w-full">
                        <div className="flex items-center gap-2 flex-1">
                          <span
                            className={cn(
                              "px-2 py-1 rounded-full text-sm",
                              course.assigned
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            )}
                          >
                            {course.assigned ? "Assigned" : "Not Assigned"}
                          </span>
                          {course.assigned &&
                            course.teacherName &&
                            course.teacherName !== "" && (
                              <>
                                <span className="text-sm text-gray-600">
                                  to{" "}
                                </span>
                                <span className="px-2 py-1 tesxt-sm rounded-full bg-green-100 text-green-700">
                                  {course.teacherName}
                                </span>
                              </>
                            )}
                        </div>
                        <div className="flex justify-end">
                          {!course.assigned && (
                            <Button
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedCourse(course);
                                setReAssign(false);
                                setDialogOpen(true);
                              }}
                            >
                              Assign
                            </Button>
                          )}
                          {course.assigned && (
                            <Button
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedCourse(course);
                                setReAssign(true);
                                setDialogOpen(true);
                              }}
                            >
                              Re-Assign
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-sm text-center">
              No subjects available for the selected grade and section
            </p>
          )}
        </CardContent>
      </Card>

      {selectedCourse && (
        <AssignmentConfirmDialog
          isOpen={dialogOpen}
          reAssign={reAssign}
          onClose={() => {
            setDialogOpen(false);
            setSelectedCourse(null);
            setReAssign(false);
          }}
          onSuccess={handleAssignmentSuccess}
          onReAssignSuccess={handleAssignmentSuccess}
          courseTitle={selectedCourse.title}
          courseId={selectedCourse.id.toString()}
          departmentId={departmentId}
          sectionId={sectionId}
          gradeId={gradeId}
          academicSemesterId={academicSemesterId}
          academicYearId={academicYearId}
          teachingAssignment={selectedAssignment}
        />
      )}
    </>
  );
}
