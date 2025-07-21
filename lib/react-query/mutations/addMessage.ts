
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { axiosInstance } from "./useAddRegNotice";
import { ta } from "zod/v4/locales";

interface MessageSchema {
    title: string;
    message: string;
    deadline?: string;
   senderType: "Student" | "Teacher" | "Department" | "Registrar";
    targetIds: number[] | undefined;
    authorId: number;
    targetType: "Student" | "Teacher"
    is_active?: boolean;
}
 

export const useAddMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: MessageSchema) => {
      try {
        const response = await axiosInstance.post("/messages", {
            title: data.title,
            message: data.message,
            deadline: data.deadline,
            senderType: data.senderType,
            targetIds: data.targetIds,
            authorId: data.authorId,
            targetType: data.targetType,  
            is_active: data.is_active,
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
        description: "message  has been sent successfully.",
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
