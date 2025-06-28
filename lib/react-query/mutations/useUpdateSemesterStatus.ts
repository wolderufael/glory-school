import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patch } from "@/lib/utils/api";
import { toast } from "sonner";

interface UpdateSemesterStatusData {
  id: string;
  status: "OPEN" | "CLOSED" | "UPCOMING";
}

const updateSemesterStatus = async (data: UpdateSemesterStatusData) => {
  const response = await patch(
    `/api/academicyears/semester/${data.id}/status`,
    {
      status: data.status,
    }
  );
  return response;
};

export const useUpdateSemesterStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSemesterStatus,
    onSuccess: (data, variables) => {
      toast.success(
        `Semester status updated to ${variables.status.toLowerCase()}`
      );
      // Invalidate and refetch academic calendar data
      queryClient.invalidateQueries({ queryKey: ["academicCalender"] });
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to update semester status");
    },
  });
};
