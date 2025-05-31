import { CreateSectionFormData } from "@/utils/createSection";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const queryClient = new QueryClient();

export const useCreateSection = () => {
  return useMutation({
    mutationFn: async (data: CreateSectionFormData) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/sections/`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error('Failed to create section');
      return res.json();
    },
    onSuccess: () => {
       queryClient.invalidateQueries({
      queryKey: ['sections'],
    });
      queryClient.invalidateQueries({
        queryKey: ['student-count'],
      });
      toast.success("Section Created", {
        description: "The section has been created successfully!",
      });
     
    },
    onError: () => {
      toast.error("Error", {
        description: "Something went wrong. Please try again.",
      });
    }
  });
}