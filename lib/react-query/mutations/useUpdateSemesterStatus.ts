"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patch } from "@/lib/utils/api";
import { toast } from "sonner";
import { setLocalStorage } from "@/utils/localStorage";

interface UpdateSemesterStatusData {
  id: string;
  status: "OPEN" | "CLOSED" | "UPCOMING";
}

const updateSemesterStatus = async (data: UpdateSemesterStatusData) => {
  const response = await patch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/academicyears/semester/${data.id}/status`,
    {
      status: data.status,
    }
  );
  if (data.status === "OPEN") {
    setLocalStorage("academicSemesterName", response.name);
    setLocalStorage("academicSemesterId", response.id);
  } else {
    setLocalStorage("academicSemesterName", "");
    setLocalStorage("academicSemesterId", "");
  }
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
