import { AcademicCalender } from "../hooks/useAcademicCalender";

export const getAcademicCalender = async (): Promise<AcademicCalender> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/academicyears/`);
  return res.json();
};
