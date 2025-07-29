import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  useAssignTeacher,
  useReAssignTeacher,
} from "@/lib/react-query/mutations/useAssignTeacher";
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
  levelId: string;
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
  levelId,
  academicSemesterId,
  academicYearId,
  teachingAssignment,
}: AssignmentConfirmDialogProps) {
  const [selectedTeacher, setSelectedTeacher] =
    useState<SelectedTeacher | null>(null);
  const { mutate: assignTeacher, isPending, isSuccess } = useAssignTeacher();
  const {
    mutate: reAssignTeacher,
    isPending: isReAssignPending,
    isSuccess: isReAssignSuccess,
  } = useReAssignTeacher();

  // Reset selected teacher when dialog opens/closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedTeacher(null);
    }
  }, [isOpen]);

  // Close dialog on successful assignment
  useEffect(() => {
    if (isSuccess || isReAssignSuccess) {
      handleClose();
      // Call onSuccess callback if provided
      if (onSuccess || onReAssignSuccess) {
        onSuccess && onSuccess();
        onReAssignSuccess && onReAssignSuccess();
      }
    }
  }, [isSuccess, isReAssignSuccess, onSuccess]);

  const handleTeacherSelect = (teacherId: string, fullName: string) => {
    setSelectedTeacher({ id: teacherId, fullName });
  };

  const handleConfirm = () => {
    if (!selectedTeacher) {
      toast.error("Please select a teacher first");
      return;
    }

    if (reAssign) {
      console.log("reAssign", teachingAssignment?.id, selectedTeacher.id);
      reAssignTeacher({
        teachingAssignmentId: teachingAssignment?.id || 0,
        teacherId: selectedTeacher.id,
      });
      handleClose();
    } else {
      assignTeacher({
        courseId: parseInt(courseId),
        teacherId: parseInt(selectedTeacher.id),
        departmentId: parseInt(departmentId),
        sectionId: parseInt(sectionId),
        level: levelId,
        academicSemesterId: parseInt(academicSemesterId),
        academicYearId: parseInt(academicYearId),
      });
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
            Assign Teacher to Course
          </DialogTitle>

          <div className="space-y-4 mt-4">
            <div className="text-center">
              <span className="font-medium text-gray-500 mb-2">Course</span>
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
          <Button variant="outline" onClick={handleClose} disabled={isPending}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isPending || !selectedTeacher}
            className={!selectedTeacher ? "opacity-50 cursor-not-allowed" : ""}
          >
            {isPending || isReAssignPending
              ? "Assigning..."
              : reAssign
              ? "Re-Assign Teacher"
              : "Assign Teacher"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
