import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

interface AssignTeacherData {
  courseId: number;
  teacherId: number;
  departmentId: number;
  sectionId: number;
  level: string;
  academicYearId: number;
  academicSemesterId: number;
}

export const useAssignTeacher = () => {
  const queryClient = useQueryClient();
  console.log("queryClient", queryClient);

  return useMutation({
    mutationFn: async (data: AssignTeacherData) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/teaching-assignments`,
        data
      );
      return response.data;
    },
    onSuccess: (_, variables) => {
      // Invalidate relevant queries to refetch the updated data
      queryClient.invalidateQueries({
        queryKey: [
          "courses",
          variables.departmentId,
          variables.level,
          variables.sectionId,
          variables.academicSemesterId,
        ],
      });

      toast.success("Success", {
        description: "Teacher has been assigned successfully.",
      });
    },
    onError: (error: Error) => {
      toast.error("Error", {
        description:
          error.message || "Failed to assign teacher. Please try again.",
      });
    },
  });
};
