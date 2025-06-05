// src/hooks/useCreateAcademicYear.ts
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { academicYearSchema } from "@/utils/academicYearSchema";



export const useAddAcademicYear = () => {
  return useMutation({
    mutationFn: async (data: AcademicYearSchema) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/academicyears`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to create academic year");
      }

      return res.json();
    },
    onSuccess: () => {
      toast("Success", {
        description: "Academic year has been added successfully.",
      });
    },
    onError: (error: Error) => {
      toast("Error", {
        description: error.message,
        style: {
          color: "red",
          backgroundColor: "#f8d7da",
          borderColor: "#f5c6cb",
        },
      });
    },
  });
};
