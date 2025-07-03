import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Loader2 } from "lucide-react";
import { useCourses } from "@/lib/react-query/hooks/useCourses";
import { cn } from "@/lib/utils";
import { Course } from "@/lib/react-query/queries/getCourses";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AssignmentConfirmDialog } from "./AssignmentConfirmDialog";

interface CourseListProps {
  departmentId: string;
  levelId: string;
  sectionId: string;
  academicSemesterId: string;
  academicYearId: string;
  selectedCourseId?: string;
  onCourseSelect?: (courseId: string) => void;
}

export default function CourseList({
  departmentId,
  levelId,
  sectionId,
  academicSemesterId,
  academicYearId,
  selectedCourseId,
  onCourseSelect,
}: CourseListProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  console.log("CourseList",departmentId, levelId, sectionId, academicSemesterId);
  const {
    data: courses,
    isLoading,
    error,
  } = useCourses({ departmentId, levelId, sectionId, academicSemesterId });

  if (!levelId || !sectionId) {
    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-600" />
            Available Courses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 text-sm">
            Please select both level and section to view available courses
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
            Error loading courses. Please try again later.
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
            Available Courses
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
                    <p className="text-sm flex items-center justify-center text-gray-500">{course.courseCode}</p>
                    <div className="mt-2 flex items-center justify-center pt-2 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
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
                          {course.assigned && course.teacherName && (
                            <>
                              <span className="text-sm text-gray-600">to </span>
                              <span className="px-2 py-1 tesxt-sm rounded-full bg-green-100 text-green-700">
                                {course.teacherName}
                              </span>
                            </>
                          )}
                        </div>
                        {!course.assigned && (
                          <Button
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedCourse(course);
                              setDialogOpen(true);
                            }}
                          >
                            Assign
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-sm text-center">
              No courses available for the selected level and section
            </p>
          )}
        </CardContent>
      </Card>

      {selectedCourse && (
        <AssignmentConfirmDialog
          isOpen={dialogOpen}
          onClose={() => {
            setDialogOpen(false);
            setSelectedCourse(null);
          }}
          courseTitle={selectedCourse.title}
          courseId={selectedCourse.id.toString()}
          departmentId={departmentId}
          sectionId={sectionId}
          levelId={levelId}
          academicSemesterId={academicSemesterId}
          academicYearId={academicYearId}
        />
      )}
    </>
  );
}
