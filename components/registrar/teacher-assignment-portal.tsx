import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserIcon, BookOpen } from "lucide-react";

export function TeacherAssignmentPortal() {
  const academicLevels = [
    { name: "Level I", isActive: true },
    { name: "Level II", isActive: false },
    { name: "Level III", isActive: false },
    { name: "Level IV", isActive: false },
  ];

  const classSections = [
    { name: "Section A", isActive: true },
    { name: "Section B", isActive: false },
    { name: "Section C", isActive: false },
  ];

  return (
    <Card className="bg-gradient-to-r from-blue-600 to-blue-700 border-none shadow-lg">
      <CardHeader className="text-center pb-4">
        <div className="flex justify-center mb-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
            <UserIcon className="h-8 w-8 text-white" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-white">
          Teacher Assignment Portal
        </CardTitle>
        <p className="text-blue-100 text-sm">
          Manage course assignments and teaching responsibilities across
          departments
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Assignment Details Section */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-5 w-5 text-blue-200" />
            <h3 className="text-lg font-semibold text-white">
              Assignment Details
            </h3>
          </div>
          <p className="text-blue-100 text-sm mb-4">
            Select the level and section to view available courses for
            assignment
          </p>

          {/* Academic Level Selection */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-200 text-sm font-medium">
                📚 Academic Level
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {academicLevels.map((level) => (
                <Button
                  key={level.name}
                  variant={level.isActive ? "default" : "outline"}
                  className={
                    level.isActive
                      ? "bg-blue-500 hover:bg-blue-600 text-white border-blue-400"
                      : "bg-white/20 hover:bg-white/30 text-white border-white/30"
                  }
                  size="sm"
                >
                  {level.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Class Section Selection */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-200 text-sm font-medium">
                🏛️ Class Section
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {classSections.map((section) => (
                <Button
                  key={section.name}
                  variant={section.isActive ? "default" : "outline"}
                  className={
                    section.isActive
                      ? "bg-purple-500 hover:bg-purple-600 text-white border-purple-400"
                      : "bg-white/20 hover:bg-white/30 text-white border-white/30"
                  }
                  size="sm"
                >
                  {section.name}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Available Courses Section */}
        <div className="bg-white rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-blue-900">
              Available Courses
            </h3>
            <Badge variant="outline" className="text-blue-600 border-blue-300">
              Select a course to assign teachers
            </Badge>
          </div>

          <div className="border-2 border-dashed border-blue-200 rounded-lg p-8 text-center">
            <BookOpen className="h-12 w-12 text-blue-300 mx-auto mb-3" />
            <p className="text-red-500 font-medium">
              Error loading courses. Please try again later.
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Check your network connection and refresh the page
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
