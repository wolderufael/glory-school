import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface BulkStatusUpdateRequest {
  departmentId: string;
  status:
    | "DRAFT"
    | "SUBMISSION_REQUESTED"
    | "UNDER_REVIEW"
    | "APPROVED"
    | "REJECTED";
}

const bulkUpdateStatusByDepartment = async ({
  departmentId,
  status,
}: BulkStatusUpdateRequest): Promise<any> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/assessmentgroups/status/by-department`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        departmentId: parseInt(departmentId, 10),
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

export const useBulkStatusUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bulkUpdateStatusByDepartment,
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
        DRAFT: "All assessment groups set to draft",
        SUBMISSION_REQUESTED:
          "All assessment groups set to submission requested",
        UNDER_REVIEW: "All assessment groups set to under review",
        APPROVED: "All assessment groups approved",
        REJECTED: "All assessment groups rejected",
      };

      toast.success(
        statusMessages[variables.status] ||
          "Bulk status update completed successfully"
      );
    },
    onError: (error: Error) => {
      console.error("Error updating bulk status:", error);
      toast.error(
        error.message || "Failed to update assessment group statuses"
      );
    },
  });
};
