import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { BookOpen } from "lucide-react";
import axios from "axios";

interface Course {
  id: string;
  name: string;
  code: string;
  creditHours: number;
}

export function CurrentCoursesCard() {
  const { data: courses, isLoading } = useQuery<Course[]>({
    queryKey: ["currentCourses"],
    queryFn: async () => {
      const response = await axios.get("/api/student/current-courses");
      return response.data;
    },
  });

  /* if (isLoading) {
    return (
      <Card className="bg-white border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Current Semester Courses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg border border-slate-200">
              <div className="divide-y divide-slate-200">
                {["skeleton-1", "skeleton-2", "skeleton-3"].map(
                  (skeletonId) => (
                    <div key={skeletonId} className="p-4">
                      <div className="animate-pulse flex justify-between items-center">
                        <div className="space-y-2">
                          <div className="h-4 bg-slate-200 rounded w-48"></div>
                          <div className="h-3 bg-slate-200 rounded w-24"></div>
                        </div>
                        <div className="h-4 bg-slate-200 rounded w-20"></div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  } */

  return (
    <Card className="bg-white border-slate-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          Current Semester Courses
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="rounded-lg border border-slate-200">
            <div className="divide-y divide-slate-200">
              {courses?.map((course) => (
                <div key={course.id} className="p-4 hover:bg-slate-50">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-slate-800">
                        {course.name}
                      </h4>
                      <p className="text-sm text-slate-600">{course.code}</p>
                    </div>
                    <span className="text-sm font-medium text-blue-600">
                      {course.creditHours} Credit Hours
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
