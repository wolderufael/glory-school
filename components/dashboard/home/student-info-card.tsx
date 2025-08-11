import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getLocalStorage } from "@/utils/localStorage";
import { useEffect, useState } from "react";

interface StudentInfo {
  department: string;
  year: string;
  section: string;
  academicYear: string;
  semester: string;
  //program: string;
}

interface StudentInfoCardProps {
  data: StudentInfo;
  isLoading?: boolean;
}

export function StudentInfoCard({
  data,
  isLoading = false,
}: StudentInfoCardProps) {
  const [academicYearId, setAcademicYearId] = useState<string | null>(null);
  const [currentStudyingSemester, setCurrentStudyingSemester] = useState<
    string | null
  >(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setAcademicYearId(getLocalStorage("academicYearId"));
    setCurrentStudyingSemester(getLocalStorage("currentStudyingSemester"));
  }, []);

  console.log("data", data);
  if (isLoading) {
    return (
      <Card className="mb-6 mt-4 bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-blue-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-4 bg-blue-200 rounded"></div>
                ))}
              </div>
              <div className="space-y-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-4 bg-blue-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6 bg-blue-50 border-blue-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-blue-800">
          Student Information
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Grade:</span>
              <span className="text-sm font-semibold text-gray-900">
                {data.department}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Section:</span>
              <span className="text-sm font-semibold text-gray-900">
                {data.section}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Academic Year:</span>
              <span className="text-sm font-semibold text-gray-900">
                {isClient ? academicYearId || "Not assigned" : "Loading..."}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Semester:</span>
              <span className="text-sm font-semibold text-gray-900">
                {isClient
                  ? currentStudyingSemester || "Not assigned"
                  : "Loading..."}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
