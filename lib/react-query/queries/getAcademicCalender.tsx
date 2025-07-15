import { AcademicYear } from "@/types/types";

export const getAcademicCalender = async (): Promise<AcademicYear> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/academicyears/`);
  const data = await res.json();
  return data.reverse();
};
