import { NoticeBoardSchema } from "@/utils/NoticeSchema";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAddNotice = () => {
  return useMutation({
    mutationFn: async (data: NoticeBoardSchema) => {
      const res = await fetch("/api/notices", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to create notice");
      }
      return res.json();
    },
    onSuccess: () => {
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
    }
  });
};