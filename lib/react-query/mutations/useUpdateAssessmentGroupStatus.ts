import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface UpdateAssessmentGroupStatusRequest {
  id: number;
  status: "APPROVED" | "REJECTED";
  reason?: string;
}

const updateAssessmentGroupStatus = async ({
  id,
  status,
  reason,
}: UpdateAssessmentGroupStatusRequest): Promise<any> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/assessmentgroups/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status,
        ...(reason && { reason }),
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

export const useUpdateAssessmentGroupStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAssessmentGroupStatus,
    onSuccess: (data, variables) => {
      // Invalidate and refetch related queries
      queryClient.invalidateQueries({
        queryKey: ["assessmentGroups"],
      });
      queryClient.invalidateQueries({
        queryKey: ["gradeApprovalRequests"],
      });

      // Show success message
      const statusMessages = {
        APPROVED: "Assessment group approved successfully",
        REJECTED: "Assessment group rejected successfully",
      };

      toast.success(
        statusMessages[variables.status] ||
          "Assessment group status updated successfully"
      );
    },
    onError: (error: Error) => {
      console.error("Error updating assessment group status:", error);
      toast.error(error.message || "Failed to update assessment group status");
    },
  });
};
