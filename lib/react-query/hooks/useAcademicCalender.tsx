import { useQuery } from "@tanstack/react-query";
import { getAcademicCalender } from "../queries/getAcademicCalender";

export interface Semester {
  id: number;
  name: string;
  academicYearId: number;
  startDate: string;
  endDate: string;
  registrationStartDate: string;
  registrationEndDate: string;
  status: "OPEN" | "CLOSED" | "UPCOMING";
  createdAt: string;
}

export interface AcademicCalender {
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
  status: "OPEN" | "CLOSED";
  semesters: Semester[];
}

export const useAcademicCalender = () => {
  return useQuery({
    queryKey: ["academicCalender"],
    queryFn: getAcademicCalender as () => Promise<AcademicCalender>,
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });
};
