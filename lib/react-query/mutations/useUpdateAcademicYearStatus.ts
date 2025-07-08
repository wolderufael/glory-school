"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patch } from "@/lib/utils/api";
import { toast } from "sonner";
import { setLocalStorage } from "@/utils/localStorage";

interface UpdateAcademicYearStatusData {
  id: string;
  status: "OPEN" | "CLOSED";
}

const updateAcademicYearStatus = async (data: UpdateAcademicYearStatusData) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/academicyears/${data.id}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: data.status })
    }
  );
  const responseData = await response.json();
  if (data.status === "OPEN") {
    setLocalStorage("academicYearName", responseData.name); 
    setLocalStorage("academicYearId", responseData.id);
  } else {
    setLocalStorage("academicYearName", "");
    setLocalStorage("academicYearId", "");
  }
  return response;
};

export const useUpdateAcademicYearStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAcademicYearStatus,
    onSuccess: (data, variables) => {
      toast.success(
        `Academic year status updated to ${variables.status.toLowerCase()}`
      );
      // Invalidate and refetch academic calendar data
      queryClient.invalidateQueries({ queryKey: ["academicCalender"] });
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to update academic year status");
    },
  });
};
