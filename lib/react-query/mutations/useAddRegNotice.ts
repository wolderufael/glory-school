import { RegNoticeBoardSchema } from "@/utils/NoticeSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  // withCredentials: true,
});

export const useAddRegNotice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: RegNoticeBoardSchema) => {
      try {
        const response = await axiosInstance.post("/registrar-noticeboard", {
          title: data.title,
          //registrarId: data.registrarId,
          //collegeId: data.collegeId,
          message: data.message,
          deadline: data.deadline,
          authorId: data.authorId,
        });
        return response.data;
      } catch (error: any) {
        throw new Error(
          error.response?.data?.message || "Failed to create notice"
        );
      }
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
