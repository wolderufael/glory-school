import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Department {
  id: number;
  collegeId: number;
  name: string;
  code: string;
  createdAt: Date;
}

interface User {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  userType: string;
  gender: string;
  nationality: string;
  userMainId: string;
}

export interface Teacher {
  id: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  departments: Department[];
}

interface UseTeachersOptions {
  departmentId: string;
}

export const getTeachers = async ({ departmentId }: UseTeachersOptions) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/teachers/by-department?departmentId=${departmentId}`
  );
  return response.data;
};

export const useTeachers = ({ departmentId }: UseTeachersOptions) => {
  return useQuery({
    queryKey: ["teachers", departmentId],
    queryFn: () => getTeachers({ departmentId }),
    staleTime: 1000 * 60 * 30, // 30 minutes
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
    enabled: Boolean(departmentId),
  });
};
