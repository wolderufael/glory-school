import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface UpdateAssessmentStatusRequest {
  id: number;
  status:
    | "DRAFT"
    | "SUBMISSION_REQUESTED"
    | "UNDER_REVIEW"
    | "APPROVED"
    | "REJECTED";
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
    `http://168.231.80.15/api/assessmentgroups/${id}`,
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
        UNDER_REVIEW: "Assessment is now under review",
        APPROVED: "Assessment approved successfully",
        REJECTED: "Assessment rejected",
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
