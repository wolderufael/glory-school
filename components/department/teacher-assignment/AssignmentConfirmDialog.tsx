import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
// Removed API hooks since we're using mock data
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import TeacherSelect from "./TeacherSelect";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { TeachingAssignment } from "@/types/assessment";

interface AssignmentConfirmDialogProps {
  isOpen: boolean;
  reAssign?: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  onReAssignSuccess?: () => void;
  courseTitle: string;
  courseId: string;
  departmentId: string;
  sectionId: string;
  gradeId: string;
  academicSemesterId: string;
  academicYearId: string;
  teachingAssignment: TeachingAssignment | null;
}

export interface SelectedTeacher {
  id: string;
  fullName: string;
}

export function AssignmentConfirmDialog({
  isOpen,
  reAssign,
  onClose,
  onSuccess,
  onReAssignSuccess,
  courseTitle,
  courseId,
  departmentId,
  sectionId,
  gradeId,
  academicSemesterId,
  academicYearId,
  teachingAssignment,
}: AssignmentConfirmDialogProps) {
  const [selectedTeacher, setSelectedTeacher] =
    useState<SelectedTeacher | null>(null);
  // Using mock data instead of API hooks

  // Reset selected teacher when dialog opens/closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedTeacher(null);
    }
  }, [isOpen]);

  // Removed success effect since we're using mock data

  const handleTeacherSelect = (teacherId: string, fullName: string) => {
    setSelectedTeacher({ id: teacherId, fullName });
  };

  const handleConfirm = () => {
    if (!selectedTeacher) {
      toast.error("Please select a teacher first");
      return;
    }

    if (reAssign) {
      // Mock re-assignment - just show success toast since we're using mock data
      toast.success(
        `${courseTitle} reassigned to ${selectedTeacher.fullName} successfully!`
      );
      handleClose();
      if (onReAssignSuccess) onReAssignSuccess();
    } else {
      // Mock assignment - just show success toast since we're using mock data
      toast.success(
        `Teacher ${selectedTeacher.fullName} assigned to ${courseTitle} successfully!`
      );
      handleClose();
      if (onSuccess) onSuccess();
    }
  };

  const handleClose = () => {
    setSelectedTeacher(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold">
            Assign Teacher to Subject
          </DialogTitle>

          <div className="space-y-4 mt-4">
            <div className="text-center">
              <span className="font-medium text-gray-500 mb-2">Subject</span>
              <div className="rounded-lg py-2 px-4">
                <span className="font-medium text-gray-800">{courseTitle}</span>
              </div>
            </div>

            <div className="text-center">
              <span className="font-medium text-gray-500 block mb-2">
                Selected Teacher
              </span>
              <div
                className={cn(
                  "rounded-lg py-2 px-4",
                  !selectedTeacher && "text-gray-500 italic"
                )}
              >
                {selectedTeacher ? (
                  <span className="font-medium text-gray-800">
                    {selectedTeacher.fullName}
                  </span>
                ) : (
                  "No teacher selected"
                )}
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="py-4">
          <Label className="text-sm font-medium block mb-2 text-gray-800">
            Search Teacher{" "}
            <span className="text-red-500 font-bold text-lg">*</span>
          </Label>
          <TeacherSelect
            departmentId={departmentId}
            value={selectedTeacher?.id || ""}
            onChange={handleTeacherSelect}
          />
        </div>

        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!selectedTeacher}
            className={!selectedTeacher ? "opacity-50 cursor-not-allowed" : ""}
          >
            {reAssign ? "Re-Assign Teacher" : "Assign Teacher"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
