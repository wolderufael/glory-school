// src/hooks/useCreateAcademicYear.ts
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { academicYearSchema } from "@/utils/academicYearSchema";
import { setLocalStorage } from "@/utils/localStorage";
import axios from "axios";
import { z } from "zod";

interface Semester {
  id: number;
  name: string;
  academicYearId: number;
  startDate: string;
  endDate: string;
  registrationStartDate: string;
  registrationEndDate: string;
  createdAt: string;
}

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

interface AcademicYearResponse {
  year: AcademicYear;
  semesters: Semester[];
}

export const useAddAcademicYear = () => {
  return useMutation({
    mutationFn: async (data: z.infer<typeof academicYearSchema>) => {
      const res = await axios.post<AcademicYearResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/academicyears`,
        data
      );

      // Save the complete academic year data
      console.log("academic year data", res.data);
      setLocalStorage("academicYearName", res.data.year.name);
      console.log("academic year name", res.data.year.name);
      setLocalStorage("academicSemesterName", res.data.semesters[0].name);
      console.log("academic semester name", res.data.semesters[0].name);
      setLocalStorage("academicYearId", res.data.year.id.toString());
      console.log("academic year id", res.data.year.id);
      setLocalStorage("academicSemesterId", res.data.semesters[0].id.toString());
      console.log("academic semester id", res.data.semesters[0].id);

      return res.data;
    },
    onSuccess: () => {
      toast("Success", {
        description: "Academic year has been added successfully.",
      });
    },
/*     onError: (error: Error) => {
      toast("Error", {
        description: error.message,
        style: {
          color: "red",
          backgroundColor: "#f8d7da",
          borderColor: "#f5c6cb",
        },
      });
    }, */
  });
};
