import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Settings2, AlertTriangle, Eye } from "lucide-react";
import { useUpdateAcademicYearStatus } from "@/lib/react-query/mutations/useUpdateAcademicYearStatus";
import { useUpdateSemesterStatus } from "@/lib/react-query/mutations/useUpdateSemesterStatus";
import { Semester } from "@/types/types";
import PasswordConfirmationDialog from "./PasswordConfirmationDialog";
import { useAllAssessmentGroups } from "@/lib/react-query/hooks/useAssessmentGroups";

interface StatusManagementProps {
  academicYearId: number;
  academicYearStatus: "OPEN" | "CLOSED";
  semesters: Semester[];
  showButtons?: boolean;
}

const StatusManagement: React.FC<StatusManagementProps> = ({
  academicYearId,
  academicYearStatus,
  semesters,
  showButtons = true,
}) => {
  const {
    data: assessmentGroups = [],
    isLoading: assessmentGroupsLoading,
    error: assessmentGroupsError,
  } = useAllAssessmentGroups();

  const updateAcademicYearStatus = useUpdateAcademicYearStatus();
  const updateSemesterStatus = useUpdateSemesterStatus();

  // Check if there are open assessments that prevent status changes
  const hasOpenAssessments =
    assessmentGroups.length > 0 &&
    assessmentGroups.some((r) => r.status !== "APPROVED");

  // State for password confirmation dialog
  const [confirmationDialog, setConfirmationDialog] = useState<{
    isOpen: boolean;
    type: "academic-year" | "semester";
    targetStatus: string;
    semesterId?: number;
    title: string;
    description: string;
    warningMessage: string;
  }>({
    isOpen: false,
    type: "academic-year",
    targetStatus: "",
    title: "",
    description: "",
    warningMessage: "",
  });

  // Helper function to get warning messages for different status changes
  const getWarningMessage = (
    type: "academic-year" | "semester",
    status: string,
    currentStatus?: string
  ): string => {
    if (type === "academic-year") {
      switch (status) {
        case "OPEN":
          return "Opening the academic year will allow students to register for courses and access all academic services. This action will affect all semesters within this academic year.";
        case "CLOSED":
          return "Closing the academic year will prevent new registrations and lock most academic operations. Students will only have read-only access to their records. This action cannot be easily undone.";
        default:
          return "";
      }
    } else {
      switch (status) {
        case "UPCOMING":
          return "Setting the semester to UPCOMING will prepare it for activation but students cannot register yet. Use this status for semesters that are planned but not yet active.";
        case "OPEN":
          return "Opening the semester will allow students to register for courses and access all semester-related services. Make sure all course schedules and requirements are properly set up.";
        case "CLOSED":
          return "Closing the semester will lock all registrations and prevent students from making changes. This is typically done after the semester ends. Grade submissions may still be possible.";
        default:
          return "";
      }
    }
  };

  const handleAcademicYearStatusChange = (status: "OPEN" | "CLOSED") => {
    const warningMessage = getWarningMessage(
      "academic-year",
      status,
      academicYearStatus
    );

    setConfirmationDialog({
      isOpen: true,
      type: "academic-year",
      targetStatus: status,
      title: `Change Academic Year Status to ${status}`,
      description: `You are about to change the academic year status from ${academicYearStatus} to ${status}.`,
      warningMessage,
    });
  };

  const handleSemesterStatusChange = (
    semesterId: number,
    status: "OPEN" | "CLOSED" | "UPCOMING"
  ) => {
    const semester = semesters.find((s) => s.id === semesterId);
    const semesterName = semester
      ? semester.name === "I"
        ? "First"
        : semester.name === "II"
        ? "Second"
        : semester.name
      : "Unknown";

    const warningMessage = getWarningMessage(
      "semester",
      status,
      semester?.status
    );

    setConfirmationDialog({
      isOpen: true,
      type: "semester",
      targetStatus: status,
      semesterId,
      title: `Change ${semesterName} Semester Status to ${status}`,
      description: `You are about to change the ${semesterName} semester status from ${semester?.status} to ${status}.`,
      warningMessage,
    });
  };

  const handleConfirmStatusChange = () => {
    if (confirmationDialog.type === "academic-year") {
      updateAcademicYearStatus.mutate({
        id: academicYearId.toString(),
        status: confirmationDialog.targetStatus as "OPEN" | "CLOSED",
      });
    } else if (
      confirmationDialog.type === "semester" &&
      confirmationDialog.semesterId
    ) {
      updateSemesterStatus.mutate({
        id: confirmationDialog.semesterId.toString(),
        status: confirmationDialog.targetStatus as
          | "OPEN"
          | "CLOSED"
          | "UPCOMING",
      });
    }

    setConfirmationDialog((prev) => ({ ...prev, isOpen: false }));
  };

  const closeConfirmationDialog = () => {
    setConfirmationDialog((prev) => ({ ...prev, isOpen: false }));
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

  const getInactiveStatusColor = (status: string) => {
    return "text-gray-500 bg-gray-50 border-gray-200 border-dashed opacity-75 cursor-not-allowed";
  };

  return (
    <>
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Settings2 className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Status Management
          </h3>
        </div>

        {/* Warning message for open assessments */}
        {hasOpenAssessments && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-amber-800">
                  Status Changes Restricted
                </p>
                <p className="text-sm text-amber-700 mt-1">
                  You cannot change the academic year or semester status because
                  there are open assessments that need to be dealt with. Please
                  ensure all assessments are approved before changing status.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {/* Academic Year Status */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Academic Year Status</p>
              <p className="text-sm text-gray-500">
                Overall status of the academic year
              </p>
            </div>
            {showButtons && academicYearStatus !== "CLOSED" ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className={`min-w-[120px] ${getStatusColor(
                      academicYearStatus
                    )} ${
                      hasOpenAssessments ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={
                      updateAcademicYearStatus.isPending || hasOpenAssessments
                    }
                  >
                    {academicYearStatus}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => handleAcademicYearStatusChange("OPEN")}
                    className="text-green-600"
                    disabled={hasOpenAssessments}
                  >
                    OPEN
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleAcademicYearStatusChange("CLOSED")}
                    className="text-red-600"
                    disabled={hasOpenAssessments}
                  >
                    CLOSED
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div
                className={`min-w-[120px] px-3 py-2 border rounded-md text-sm font-medium flex items-center gap-2 ${getInactiveStatusColor(
                  academicYearStatus
                )}`}
              >
                <Eye className="h-3 w-3" />
                {academicYearStatus}
              </div>
            )}
          </div>

          {/* Semester Status Controls */}
          {semesters.map((semester, index) => (
            <div
              key={semester.id}
              className="flex items-center justify-between"
            >
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
              {showButtons && semester.status !== "CLOSED" ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className={`min-w-[120px] ${getStatusColor(
                        semester.status
                      )} ${
                        hasOpenAssessments
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      disabled={
                        updateSemesterStatus.isPending || hasOpenAssessments
                      }
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
                      disabled={hasOpenAssessments}
                    >
                      UPCOMING
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        handleSemesterStatusChange(semester.id, "OPEN")
                      }
                      className="text-green-600"
                      disabled={hasOpenAssessments}
                    >
                      OPEN
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        handleSemesterStatusChange(semester.id, "CLOSED")
                      }
                      className="text-red-600"
                      disabled={hasOpenAssessments}
                    >
                      CLOSED
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div
                  className={`min-w-[120px] px-3 py-2 border rounded-md text-sm font-medium flex items-center gap-2 ${getInactiveStatusColor(
                    semester.status
                  )}`}
                >
                  <Eye className="h-3 w-3" />
                  {semester.status}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Password Confirmation Dialog */}
      <PasswordConfirmationDialog
        isOpen={confirmationDialog.isOpen}
        onClose={closeConfirmationDialog}
        onConfirm={handleConfirmStatusChange}
        title={confirmationDialog.title}
        description={confirmationDialog.description}
        warningMessage={confirmationDialog.warningMessage}
        actionType={confirmationDialog.type}
        targetStatus={confirmationDialog.targetStatus}
        isLoading={
          updateAcademicYearStatus.isPending || updateSemesterStatus.isPending
        }
      />
    </>
  );
};

export default StatusManagement;
