import { useQuery } from "@tanstack/react-query";

export interface Department {
  id: number;
  collegeId: number;
  name: string;
  code: string;
  createdAt: string;
}

export const useDepartment = (departmentId: number) => {
  return useQuery({
    queryKey: ["department", departmentId],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/departments/${departmentId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch department");
      }
      return response.json() as Promise<Department>;
    },
  });
};

export const useDepartments = () => {
  return useQuery({
    queryKey: ["departments"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/departments`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch departments");
      }
      return response.json() as Promise<Department[]>;
    },
  });
};
