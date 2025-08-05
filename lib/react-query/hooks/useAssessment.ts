import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { calculateGrade } from "@/utils/calculateGrade";
import {
  Assessment,
  AssessmentSubmission,
  CreateAssessmentRequest,
  UpdateAssessmentRequest,
} from "@/utils/assessment";

export const useAssessments = () => {
  const [assessments, setAssessments] = useState<
    Record<number, Partial<Assessment>>
  >({});
  const queryClient = useQueryClient();

  const createAssessmentMutation = useMutation({
    mutationFn: async (data: CreateAssessmentRequest): Promise<Assessment> => {
      console.log("Creating assessment:", data);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/assessments/bulk-update`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to create assessment");
      }

      const newAssessment: Assessment = {
        id: Math.floor(Math.random() * 10000),
        ...data,
        totalPractical:
          (data.practical1 || 0) +
          (data.practical2 || 0) +
          (data.practical3 || 0),
        totalMark:
          (data.practical1 || 0) +
          (data.practical2 || 0) +
          (data.practical3 || 0) +
          (data.theory || 0),
        gradeInLetter: calculateGrade(
          (data.practical1 || 0) +
            (data.practical2 || 0) +
            (data.practical3 || 0) +
            (data.theory || 0),
          (data.practical1 || 0) +
            (data.practical2 || 0) +
            (data.practical3 || 0),
          (data.theory || 0)
        ),
        practicalStatus: "submitted",
        theoryStatus: "submitted",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      return newAssessment;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assessments"] });
      toast("Success", {
        description: "Assessment created successfully",
      });
    },
    onError: () => {
      toast("Error", {
        description: "Failed to create assessment",
        style: { backgroundColor: "red", color: "white" },
      });
    },
  });

  // Update assessment mutation
  const updateAssessmentMutation = useMutation({
    mutationFn: async (data: UpdateAssessmentRequest): Promise<Assessment> => {
      console.log("Updating assessment:", data);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const updatedAssessment: Assessment = {
        id: data.id,
        teachingAssignmentId: data.teachingAssignmentId || 0,
        studentId: data.studentId || 0,
        practical1: data.practical1,
        practical2: data.practical2,
        practical3: data.practical3,
        totalPractical:
          (data.practical1 || 0) +
          (data.practical2 || 0) +
          (data.practical3 || 0),
        theory: data.theory,
        totalMark:
          (data.practical1 || 0) +
          (data.practical2 || 0) +
          (data.practical3 || 0) +
          (data.theory || 0),
        gradeInLetter: calculateGrade(
          (data.practical1 || 0) +
            (data.practical2 || 0) +
            (data.practical3 || 0) +
            (data.theory || 0),
          (data.practical1 || 0) +
            (data.practical2 || 0) +
            (data.practical3 || 0),
          (data.theory || 0)
        ),
        practicalStatus: "submitted",
        theoryStatus: "submitted",
        comment: data.comment,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      return updatedAssessment;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assessments"] });
      toast("Success", {
        description: "Assessment updated successfully",
      });
    },
    onError: () => {
      toast("Error", {
        description: "Failed to update assessment",
        style: { backgroundColor: "red", color: "white" },
      });
    },
  });

  // Bulk submit assessments mutation
  const submitAssessmentsMutation = useMutation({
    mutationFn: async (data: AssessmentSubmission): Promise<Assessment[]> => {
      console.log("Submitting assessments:", data);
      // Simulate API call

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/assessments/bulk-update`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to submit assessments");
      }

      return data.assessments.map((assessment, index) => ({
        id: Math.floor(Math.random() * 10000) + index,
        ...assessment,
        totalPractical:
          (assessment.practical1 || 0) +
          (assessment.practical2 || 0) +
          (assessment.practical3 || 0),
        totalMark:
          (assessment.practical1 || 0) +
          (assessment.practical2 || 0) +
          (assessment.practical3 || 0) +
          (assessment.theory || 0),
        gradeInLetter: calculateGrade(
          (assessment.practical1 || 0) +
            (assessment.practical2 || 0) +
            (assessment.practical3 || 0) +
            (assessment.theory || 0),
          (assessment.practical1 || 0) +
            (assessment.practical2 || 0) +
            (assessment.practical3 || 0),
          (assessment.theory || 0)
        ),
        practicalStatus: "submitted" as string,
        theoryStatus: "submitted" as string,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["assessments"] });
      toast("Success", {
        description: `Successfully submitted ${data.length} assessments`,
      });
    },
    onError: () => {
      toast("Error", {
        description: "Failed to submit assessments",
        style: { backgroundColor: "red", color: "white" },
      });
    },
  });

  const updateLocalAssessment = (
    studentId: number,
    field: keyof Assessment,
    value: number | string | null
  ) => {
    setAssessments((prev) => {
      const current = prev[studentId] || { studentId };
      const updated = { ...current, [field]: value };

      // Auto-calculate totals
      if (
        field === "practical1" ||
        field === "practical2" ||
        field === "practical3"
      ) {
        const practical1 =
          field === "practical1"
            ? value === null
              ? 0
              : Number(value)
            : updated.practical1 || 0;
        const practical2 =
          field === "practical2"
            ? value === null
              ? 0
              : Number(value)
            : updated.practical2 || 0;
        const practical3 =
          field === "practical3"
            ? value === null
              ? 0
              : Number(value)
            : updated.practical3 || 0;
        updated.totalPractical = practical1 + practical2 + practical3;
        updated.totalMark = updated.totalPractical + (updated.theory || 0);
        updated.gradeInLetter = calculateGrade(updated.totalMark,updated.totalPractical,updated.theory||0);
      }

      if (field === "theory") {
        updated.totalMark =
          (updated.totalPractical || 0) + (value === null ? 0 : Number(value));
        updated.gradeInLetter = calculateGrade(updated.totalMark,updated.totalPractical||0,updated.theory||0);
      }

      return { ...prev, [studentId]: updated };
    });
  };



  return {
    assessments,
    updateLocalAssessment,
    createAssessment: createAssessmentMutation.mutate,
    updateAssessment: updateAssessmentMutation.mutate,
    submitAssessments: submitAssessmentsMutation.mutate,
    isCreating: createAssessmentMutation.isPending,
    isUpdating: updateAssessmentMutation.isPending,
    isSubmitting: submitAssessmentsMutation.isPending,
  };
};
