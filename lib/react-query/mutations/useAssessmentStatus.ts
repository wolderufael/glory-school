import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface UpdateAssessmentStatusRequest {
  id: number;
  status:
    | "DRAFT"
    | "SUBMISSION_REQUESTED"
    | "DEPARTMENT_UNDER_REVIEW"
    | "DEPARTMENT_APPROVED"
    | "DEPARTMENT_REJECTED"
    | "REGISTRAR_UNDER_REVIEW"
    | "REGISTRAR_REJECTED"
    | "APPROVED";
}

interface UpdateAssessmentStatusResponse {
  id: number;
  name: string;
  status: string;
  level: string;
  sectionId: number;
}

const updateAssessmentStatus = async ({
  id,
  status,
}: UpdateAssessmentStatusRequest): Promise<UpdateAssessmentStatusResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/assessmentgroups/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        status,
      }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`
    );
  }

  return response.json();
};

export const useUpdateAssessmentStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAssessmentStatus,
    onSuccess: (data, variables) => {
      // Invalidate and refetch related queries
      queryClient.invalidateQueries({
        queryKey: ["teachingAssessment"],
      });
      queryClient.invalidateQueries({
        queryKey: ["assessmentGroup", variables.id],
      });

      // Show success message based on status
      const statusMessages = {
        DRAFT: "Assessment saved as draft",
        SUBMISSION_REQUESTED: "Assessment submitted for approval",
        DEPARTMENT_UNDER_REVIEW: "Assessment is now under review by department",
        DEPARTMENT_APPROVED: "Assessment approved successfully by department",
        DEPARTMENT_REJECTED: "Assessment rejected by department",
        REGISTRAR_UNDER_REVIEW: "Assessment is now under review by registrar",
        REGISTRAR_REJECTED: "Assessment rejected by registrar",
        APPROVED: "Assessment approved successfully by registrar",
      };

      toast.success(
        statusMessages[variables.status] ||
          "Assessment status updated successfully"
      );
    },
    onError: (error: Error) => {
      console.error("Error updating assessment status:", error);
      toast.error(error.message || "Failed to update assessment status");
    },
  });
};
