import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Settings2 } from "lucide-react";
import { useUpdateAcademicYearStatus } from "@/lib/react-query/mutations/useUpdateAcademicYearStatus";
import { useUpdateSemesterStatus } from "@/lib/react-query/mutations/useUpdateSemesterStatus";
import { Semester } from "@/lib/react-query/hooks/useAcademicCalender";

interface StatusManagementProps {
  academicYearId: number;
  academicYearStatus: "OPEN" | "CLOSED";
  semesters: Semester[];
}

const StatusManagement: React.FC<StatusManagementProps> = ({
  academicYearId,
  academicYearStatus,
  semesters,
}) => {
  const updateAcademicYearStatus = useUpdateAcademicYearStatus();
  const updateSemesterStatus = useUpdateSemesterStatus();

  const handleAcademicYearStatusChange = (status: "OPEN" | "CLOSED") => {
    updateAcademicYearStatus.mutate({
      id: academicYearId.toString(),
      status,
    });
  };

  const handleSemesterStatusChange = (
    semesterId: number,
    status: "OPEN" | "CLOSED" | "UPCOMING"
  ) => {
    updateSemesterStatus.mutate({
      id: semesterId.toString(),
      status,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "OPEN":
        return "text-green-600 bg-green-50 border-green-200";
      case "CLOSED":
        return "text-red-600 bg-red-50 border-red-200";
      case "UPCOMING":
        return "text-blue-600 bg-blue-50 border-blue-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Settings2 className="h-5 w-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">
          Status Management
        </h3>
      </div>

      <div className="space-y-4">
        {/* Academic Year Status */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900">Academic Year Status</p>
            <p className="text-sm text-gray-500">
              Overall status of the academic year
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className={`min-w-[120px] ${getStatusColor(
                  academicYearStatus
                )}`}
                disabled={updateAcademicYearStatus.isPending}
              >
                {academicYearStatus}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => handleAcademicYearStatusChange("OPEN")}
                className="text-green-600"
              >
                OPEN
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleAcademicYearStatusChange("CLOSED")}
                className="text-red-600"
              >
                CLOSED
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Semester Status Controls */}
        {semesters.map((semester, index) => (
          <div key={semester.id} className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">
                {semester.name === "I"
                  ? "First"
                  : semester.name === "II"
                  ? "Second"
                  : `Semester ${semester.name}`}{" "}
                Semester Status
              </p>
              <p className="text-sm text-gray-500">
                Status of the{" "}
                {semester.name === "I"
                  ? "first"
                  : semester.name === "II"
                  ? "second"
                  : semester.name}{" "}
                semester
              </p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className={`min-w-[120px] ${getStatusColor(semester.status)}`}
                  disabled={updateSemesterStatus.isPending}
                >
                  {semester.status}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() =>
                    handleSemesterStatusChange(semester.id, "UPCOMING")
                  }
                  className="text-blue-600"
                >
                  UPCOMING
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    handleSemesterStatusChange(semester.id, "OPEN")
                  }
                  className="text-green-600"
                >
                  OPEN
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    handleSemesterStatusChange(semester.id, "CLOSED")
                  }
                  className="text-red-600"
                >
                  CLOSED
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusManagement;
