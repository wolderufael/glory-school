import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface UpdateAssessmentGroupStatusRequest {
  id: number;
  departmentId: number;
  status: "DEPARTMENT_APPROVED" | "DEPARTMENT_REJECTED" | "APPROVED" | "REGISTRAR_REJECTED";
  reason?: string | null;
}

const updateAssessmentGroupStatus = async ({
  id,
  departmentId,
  status,
  reason,
}: UpdateAssessmentGroupStatusRequest): Promise<any> => {

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/assessmentgroups/status/by-department-and-group`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        departmentId,
        assessmentGroupId: id,
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
        DEPARTMENT_APPROVED: "Assessment group approved successfully by department",
        DEPARTMENT_REJECTED: "Assessment group rejected successfully by department",
        APPROVED: "Assessment group approved successfully by registrar",
        REGISTRAR_REJECTED: "Assessment group rejected successfully by registrar",
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
