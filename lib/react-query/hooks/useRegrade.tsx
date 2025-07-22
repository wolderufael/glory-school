import { useMutation, useQuery } from "@tanstack/react-query";
import { RegradeAssesment, Assessment } from "@/types/types";
import { toast } from "sonner";



const mockAssessment = {
  id: 30,
  teachingAssignmentId: 30,
  studentId: 4,
  assessmentGroup: {
    id: 30,
    name: "Assessment for Section1 - Level II",
    status: "SUBMISSION_REQUESTED",
    level: "II",
    departmentId: 1,
    teachingAssignmentId: 30,
    sectionId: 29,
    createdAt: "2025-07-20T19:05:31.191Z",
    updatedAt: "2025-07-20T19:41:10.599Z",
  },
  practical1: 30,
  practical2: 20,
  practical3: 20,
  practical1Type: "Practical 1",
  practical2Type: "Practical 2",
  practical3Type: "Practical 3",
  totalPractical: 70,
  practicalStatus: "OK",
  theory: 20,
  theoryStatus: "OK",
  totalMark: 90,
  gradeInLetter: "A-",
  comment: "",
  createdAt: new Date("2024-01-15T10:30:00.000Z"),
  updatedAt: new Date("2024-01-15T14:20:00.000Z"),
  teachingAssignment: {
    id: 30,
    teacherId: 3,
    sectionId: 29,
    courseId: 11,
    academicSemesterId: 2,
    academicYearId: 1,
    level: "II",
    departmentId: 1,
  },
};

const getRegrade = async (
  courseCode: string,
  mainId: string,
  teacherId: string
): Promise<any> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/assessments/by-course-code-and-main-id?courseCode=${courseCode}&mainId=${mainId}&teacherId=${teacherId}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch assessment");
  }

  //return mockAssessment;

  return res.json();
};

export const useFetchRegrade = (courseCode: string, mainId: string, teacherId: string) => {
  return useQuery({
    queryKey: ["regrade", courseCode, mainId, teacherId],
    queryFn: () => getRegrade(courseCode, mainId, teacherId),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
    enabled: Boolean(courseCode && mainId),
  });
};

// Interface for re-grade request filters
interface RegradeFilters {
  status?: "APPROVAL_REQUESTED" | "APPROVED" | "REJECTED";
  studentId?: number;
  teacherId?: number;
  departmentId?: number;
  academicYearId?: number;
  academicSemesterId?: number;
  page?: number;
  limit?: number;
}

// Interface for paginated re-grade response
interface RegradeRequestsResponse {
  data: RegradeAssesment[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Fetch all re-grade requests with filters
const fetchRegradeRequests = async (
  filters: RegradeFilters = {}
): Promise<RegradeRequestsResponse> => {
  const queryParams = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      queryParams.append(key, value.toString());
    }
  });

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/regrade?${queryParams.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`
    );
  }

  return response.json();
};

const fetchAllRegradeRequests = async (): Promise<RegradeAssesment[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/regrade`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch regrade requests");
  }

  return response.json();
};
// Fetch single re-grade request by ID
const fetchRegradeRequestById = async (
  id: number
): Promise<RegradeAssesment> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/regrade/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`
    );
  }

  return response.json();
};

// Hook to fetch all re-grade requests with filters
export const useRegradeRequests = (filters: RegradeFilters = {}) => {
  return useQuery({
    queryKey: ["regradeRequests", filters],
    queryFn: () => fetchRegradeRequests(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};

export const useAllRegradeRequests = () => {
  return useQuery({
    queryKey: ["allRegradeRequests"],
    queryFn: () => fetchAllRegradeRequests(),
  });
};

// Hook to fetch single re-grade request
export const useRegradeRequest = (id: number) => {
  return useQuery({
    queryKey: ["regradeRequest", id],
    queryFn: () => fetchRegradeRequestById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};

// Hook to fetch re-grade requests for registrar dashboard
export const useRegistrarRegradeRequests = () => {
  return useQuery({
    queryKey: ["registrarRegradeRequests"],
    queryFn: () => fetchRegradeRequests({ status: "APPROVAL_REQUESTED" }),
    staleTime: 2 * 60 * 1000, // 2 minutes for more frequent updates
    refetchOnWindowFocus: true,
  });
};

// Hook to fetch re-grade requests by student
export const useStudentRegradeRequests = (studentId: number) => {
  return useQuery({
    queryKey: ["studentRegradeRequests", studentId],
    queryFn: () => fetchRegradeRequests({ studentId }),
    enabled: !!studentId,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

// Hook to fetch re-grade requests by teacher
export const useTeacherRegradeRequests = (teacherId: number) => {
  return useQuery({
    queryKey: ["teacherRegradeRequests", teacherId],
    queryFn: () => fetchRegradeRequests({ teacherId }),
    enabled: !!teacherId,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

// Hook to fetch re-grade statistics
export const useRegradeStats = () => {
  return useQuery({
    queryKey: ["regradeStats"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/regrade/stats`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      return response.json();
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });
};
