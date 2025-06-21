// src/hooks/useCreateAcademicYear.ts
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { academicYearSchema } from "@/utils/academicYearSchema";
import { setLocalStorage } from "@/utils/localStorage";
import axios from "axios";
import { z } from "zod";

interface AcademicYear {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  semester1StartDate: string;
  semester1EndDate: string;
  semester2StartDate: string;
  semester2EndDate: string;
  semeester1RegistrationStartDate: string;
  semeester1RegistrationEndDate: string;
  semeester2RegistrationStartDate: string;
  semeester2RegistrationEndDate: string;
  createdAt: string;
}

export const useAddAcademicYear = () => {
  return useMutation({
    mutationFn: async (data: z.infer<typeof academicYearSchema>) => {
      const res = await axios.post<AcademicYear>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/academicyears`,
        data
      );

      // Save the complete academic year data
      console.log(res.data);
      setLocalStorage("academicYearName", res.data.name);
      setLocalStorage("academicYearId", res.data.id.toString());

      return res.data;
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
