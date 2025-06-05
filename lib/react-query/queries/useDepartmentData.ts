import { useQuery } from "@tanstack/react-query";

interface Teacher {
  id: string;
  name: string;
  department: string;
}

interface Course {
  id: string;
  name: string;
  level: string;
  department: string;
}

interface Section {
  id: string;
  name: string;
  level: string;
  department: string;
}

export const useTeachers = (departmentId: string) => {
  return useQuery({
    queryKey: ["teachers", departmentId],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/departments/${departmentId}/teachers`
      );
      if (!res.ok) throw new Error("Failed to fetch teachers");
      return res.json() as Promise<Teacher[]>;
    },
  });
};

export const useCourses = (departmentId: string, level: string) => {
  return useQuery({
    queryKey: ["courses", departmentId, level],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/departments/${departmentId}/courses?level=${level}`
      );
      if (!res.ok) throw new Error("Failed to fetch courses");
      return res.json() as Promise<Course[]>;
    },
    enabled: !!level, // Only fetch when level is selected
  });
};

export const useSections = (departmentId: string, level: string) => {
  return useQuery({
    queryKey: ["sections", departmentId, level],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/departments/${departmentId}/sections?level=${level}`
      );
      if (!res.ok) throw new Error("Failed to fetch sections");
      return res.json() as Promise<Section[]>;
    },
    enabled: !!level, // Only fetch when level is selected
  });
};
