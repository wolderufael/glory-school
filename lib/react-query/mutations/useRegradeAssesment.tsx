import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { RegradeAssesment } from "@/types/types";

// Interface for creating a new re-grade request
interface CreateRegradeRequest {
  teachingAssignmentId: number;
  assessmentGroupId: number;
  studentId: number;
  regradeReason: string;
  practical1?: number | null;
  practical2?: number | null;
  practical3?: number | null;
  practical1Title?: string;
  practical2Title?: string;
  practical3Title?: string;
  totalPractical?: number;
  practicalStatus?: string;
  theory?: number | null;
  theoryStatus?: string;
  totalMark?: number;
  gradeInLetter?: string;
  comment?: string;
}

// Interface for updating re-grade status
interface UpdateRegradeStatusRequest {
  id: number;
  regradeStatus:
    | "REGRADE_REQUESTED"
    | "DEPARTMENT_UNDER_REVIEW"
    | "DEPARTMENT_APPROVED"
    | "DEPARTMENT_REJECTED"
    | "REGISTRAR_UNDER_REVIEW"
    | "REGISTRAR_REJECTED"
    | "APPROVED";
  regradeReason?: string;
  practical1?: number | null;
  practical2?: number | null;
  practical3?: number | null;
  practical1Type?: string;
  practical2Type?: string;
  practical3Type?: string;
  totalPractical?: number;
  gradeInLetter?: string;
  theory?: number | null;
  totalMark?: number;
}

interface UpdateRegradeDecisionRequest {
  id: number;
  regradeStatus:
    | "REGRADE_REQUESTED"
    | "DEPARTMENT_UNDER_REVIEW"
    | "DEPARTMENT_APPROVED"
    | "DEPARTMENT_REJECTED"
    | "REGISTRAR_UNDER_REVIEW"
    | "REGISTRAR_REJECTED"
    | "APPROVED";
  regradeReason?: string;
}

// Create new re-grade request
const createRegradeRequest = async (
  data: CreateRegradeRequest
): Promise<RegradeAssesment> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/regrade-requests`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        regradeStatus: "REGRADE_REQUESTED", // Default status for new requests
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

// Update re-grade status
const updateRegradeStatus = async ({
  id,
  regradeStatus,
  regradeReason,
  practical1,
  practical2,
  practical3,
  practical1Type,
  practical2Type,
  practical3Type,
  totalPractical,
  gradeInLetter,
  theory,
  totalMark,
}: UpdateRegradeStatusRequest): Promise<RegradeAssesment> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/regrade-requests/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        regradeStatus,
        regradeReason,
        practical1,
        practical2,
        practical3,
        practical1Type,
        practical2Type,
        practical3Type,
        totalPractical,
        gradeInLetter,
        theory,
        totalMark,
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
const updateRegradeDecision = async ({
  id,
  regradeStatus,
  regradeReason,
}: UpdateRegradeDecisionRequest): Promise<RegradeAssesment> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/regrade-requests/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        regradeStatus,
        regradeReason,
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

// Hook for creating new re-grade requests
export const useCreateRegradeRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRegradeRequest,
    onSuccess: (data, variables) => {
      // Invalidate related queries
      queryClient.invalidateQueries({
        queryKey: ["regradeRequests"],
      });
      queryClient.invalidateQueries({
        queryKey: ["teachingAssignment", variables.teachingAssignmentId],
      });
      queryClient.invalidateQueries({
        queryKey: ["studentAssessment", variables.studentId],
      });

      toast.success("Re-grade request submitted successfully");
    },
    onError: (error: Error) => {
      console.error("Error creating re-grade request:", error);
      toast.error(error.message || "Failed to submit re-grade request");
    },
  });
};

// Hook for updating re-grade status
export const useUpdateRegradeStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateRegradeStatus,
    onSuccess: (data, variables) => {
      // Invalidate related queries
      queryClient.invalidateQueries({
        queryKey: ["regradeRequests"],
      });
      queryClient.invalidateQueries({
        queryKey: ["regradeRequest", variables.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["teachingAssessment"],
      });

      // Show status-specific success messages
      const statusMessages = {
        REGRADE_REQUESTED: "Re-grade request submitted for review",
        DEPARTMENT_UNDER_REVIEW: "Re-grade request approved by teacher",
        DEPARTMENT_APPROVED: "Re-grade request approved by department",
        DEPARTMENT_REJECTED: "Re-grade request rejected by department",
        REGISTRAR_UNDER_REVIEW: "Re-grade request submitted for review",
        REGISTRAR_REJECTED: "Re-grade request rejected by registrar",
        APPROVED: "Re-grade request approved successfully",
      };

      toast.success(
        statusMessages[variables.regradeStatus] ||
          "Re-grade status updated successfully"
      );
    },
    onError: (error: Error) => {
      console.error("Error updating re-grade status:", error);
      toast.error(error.message || "Failed to update re-grade status");
    },
  });
};
export const useUpdateRegradeDecision = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateRegradeDecision,
    onSuccess: (data, variables) => {
      // Invalidate related queries
      queryClient.invalidateQueries({
        queryKey: ["regradeRequests"],
      });
      queryClient.invalidateQueries({
        queryKey: ["regradeRequest", variables.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["teachingAssessment"],
      });
      queryClient.invalidateQueries({
        queryKey: ["departmentRegradeRequests"],
      });
      queryClient.invalidateQueries({
        queryKey: ["teacherRegradeRequests"],
      });

      // Show status-specific success messages
      const statusMessages = {
        REGRADE_REQUESTED: "Re-grade request submitted for review",
        DEPARTMENT_UNDER_REVIEW: "Re-grade request approved by teacher",
        DEPARTMENT_APPROVED: "Re-grade request approved by department",
        DEPARTMENT_REJECTED: "Re-grade request rejected by department",
        REGISTRAR_UNDER_REVIEW: "Re-grade request submitted for review",
        REGISTRAR_REJECTED: "Re-grade request rejected by registrar",
        APPROVED: "Re-grade request approved successfully",
      };

      toast.success(
        statusMessages[variables.regradeStatus] ||
          "Re-grade status updated successfully"
      );
    },
    onError: (error: Error) => {
      console.error("Error updating re-grade status:", error);
      toast.error(error.message || "Failed to update re-grade status");
    },
  });
};

// Hook for bulk status updates (useful for registrar dashboard)
/* export const useBulkUpdateRegradeStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (requests: UpdateRegradeStatusRequest[]) => {
      const results = await Promise.all(
        requests.map((request) => updateRegradeStatus(request))
      );
      return results;
    },
    onSuccess: (data, variables) => {
      // Invalidate all related queries
      queryClient.invalidateQueries({
        queryKey: ["regradeRequests"],
      });
      queryClient.invalidateQueries({
        queryKey: ["teachingAssessment"],
      });

      const approvedCount = variables.filter(
        (req) => req.regradeStatus === "APPROVED"
      ).length;
      const rejectedCount = variables.filter(
        (req) => req.regradeStatus === "REJECTED"
      ).length;

      if (approvedCount > 0 && rejectedCount > 0) {
        toast.success(
          `Bulk update completed: ${approvedCount} approved, ${rejectedCount} rejected`
        );
      } else if (approvedCount > 0) {
        toast.success(`${approvedCount} re-grade requests approved`);
      } else if (rejectedCount > 0) {
        toast.success(`${rejectedCount} re-grade requests rejected`);
      } else {
        toast.success("Bulk status update completed");
      }
    },
    onError: (error: Error) => {
      console.error("Error updating re-grade statuses:", error);
      toast.error(error.message || "Failed to update re-grade statuses");
    },
  });
}; */
