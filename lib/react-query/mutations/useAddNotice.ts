import { NoticeBoardSchema } from "@/utils/NoticeSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAddNotice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: NoticeBoardSchema) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/noticeboard`,
        {
          method: "POST",
          body: JSON.stringify({
            collegeId: data.collegeId,
            departmentId: data.departmentId,
            message: data.message,
            deadline: data.deadline,
            authorId: data.authorId,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          /* credentials: "include", */
        }
      );

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to create notice");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notices"] });
      toast("Success", {
        description: "Notice has been added successfully.",
      });
    },
    onError: (error: Error) => {
      toast("Error", {
        description: error.message || "Something went wrong. Please try again.",
        style: {
          color: "red",
          backgroundColor: "#f8d7da",
          borderColor: "#f5c6cb",
        },
      });
    },
  });
};
