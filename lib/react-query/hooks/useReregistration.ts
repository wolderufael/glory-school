import { useQuery } from "@tanstack/react-query";
import { ReregistrationData, ReregistrationResponse } from "@/types/types";


const getReregistration = async (studentId: number): Promise<ReregistrationResponse | null> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/student-results/by-student/${studentId}`
  );
  const resData = await response.json()

  return resData.results[0]; 
};

const checkReregistration = async (studentId: number, academicSemesterId: number, academicYearId: number): Promise<ReregistrationResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/student-results/by-period?studentId=${studentId}&academicSemesterId=${academicSemesterId}&academicYearId=${academicYearId}`
  );
/*   const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/student-results/by-student/${studentId}`
  ); 
  const resData = await response.json()
  console.log("resData in the useReregistration hook", resData);
  return resData.results;*/
  
  return response.json();
};

export const useReregistration = (studentId: number, academicSemesterId: number, academicYearId: number) => {
/*   console.log("Student ID", studentId);
  console.log("Academic Semester ID", academicSemesterId);
  console.log("Academic Year ID", academicYearId); */
  //if (!studentId) throw new Error("Student ID not found");
  return useQuery({
    queryKey: ["reregistration"],
    queryFn: async () => {
      const reregistration = await checkReregistration(studentId, academicSemesterId, academicYearId);
      return reregistration;
    },
    enabled: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useReregistrationByStudent = (studentId: number) => {
  return useQuery({
    queryKey: ["reregistrationByStudent"],
    queryFn: async () => {
      const reregistration = await getReregistration(studentId);
      return reregistration;
    },
    enabled: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
