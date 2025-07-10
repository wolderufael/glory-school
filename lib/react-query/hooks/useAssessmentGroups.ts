import { useQuery } from "@tanstack/react-query";
import { GradeApprovalRequest } from "@/components/department/grade-approval/types";

interface AssessmentGroup {
  id: number;
  name: string;
  status:
    | "DRAFT"
    | "SUBMISSION_REQUESTED"
    | "UNDER_REVIEW"
    | "APPROVED"
    | "REJECTED";
  level: string;
  departmentId: number;
  teachingAssignmentId: number;
  sectionId: number;
  createdAt: string;
  updatedAt: string;
  department: {
    id: number;
    collegeId: number;
    name: string;
    code: string;
    createdAt: string;
  };
  section: {
    id: number;
    sectionName: string;
    createdAcademicYearId: number;
    createdAt: string;
    departmentId: number;
    currentLevel: string;
  };
  teachingAssignment: {
    id: number;
    teacherId: number;
    sectionId: number;
    courseId: number;
    academicSemesterId: number;
    academicYearId: number;
    level: string;
    departmentId: number;
    course: {
      id: number;
      collegeId: number;
      departmentId: number;
      level: string;
      courseCode: string;
      title: string;
      theoryNhrs: number;
      practicalNhrs: number;
      cooperativeNhrs: number;
      totalNhrs: number;
      createdAt: string;
    };
    teacher: {
      id: number;
      userId: number;
      createdAt: string;
      updatedAt: string;
      user: {
        id: number;
        firstName: string;
        middleName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
        password: string;
        userType: string;
        gender: string;
        nationality: string;
        userMainId: string;
      };
    };
  };
}

const fetchAssessmentGroupsByDepartment = async (
  departmentId: number
): Promise<AssessmentGroup[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/assessmentgroups/by-department/${departmentId}`
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};
const fetchAllAssessmentGroups = async (
): Promise<AssessmentGroup[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/assessmentgroups`
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};



const transformToGradeApprovalRequests = (
  assessmentGroups: AssessmentGroup[]
): GradeApprovalRequest[] => {
  return assessmentGroups
    .filter(
      (group) =>
        group.status === "UNDER_REVIEW" ||
        group.status === "APPROVED" ||
        group.status === "REJECTED"
    )
    .map((group) => ({
      id: group.id.toString(),
      teacher: {
        id: group.teachingAssignment.teacher.id.toString(),
        firstName: group.teachingAssignment.teacher.user.firstName,
        lastName: group.teachingAssignment.teacher.user.lastName,
        email: group.teachingAssignment.teacher.user.email,
        employeeId: group.teachingAssignment.teacher.user.userMainId,
        department: group.department.name,
      },
      course: {
        id: group.teachingAssignment.course.id.toString(),
        name: group.teachingAssignment.course.title,
        code: group.teachingAssignment.course.courseCode,
        creditHours: Math.round(group.teachingAssignment.course.totalNhrs / 15), // Convert hours to credit hours
        department: group.department.name,
      },
      section: {
        id: group.section.id.toString(),
        name: group.section.sectionName,
        department: group.department.code,
        departmentName: group.department.name,
        level: group.level,
        year:
          new Date().getFullYear().toString() +
          "/" +
          (new Date().getFullYear() + 1).toString().slice(-2),
        semester: "1", // Would need academic semester data
      },
      grades: [], // Empty array as we don't have individual grade data
      submittedAt: group.updatedAt,
      status:
        group.status === "UNDER_REVIEW"
          ? ("pending" as const)
          : group.status === "APPROVED"
          ? ("approved" as const)
          : group.status === "REJECTED"
          ? ("rejected" as const)
          : ("pending" as const),
      totalStudents: 25, // Would need student count from API
      submittedGrades: 25, // Would need submitted grade count from API
      message: `Grades submitted for ${group.name}`,
      teachingAssignmentId: group.teachingAssignmentId, // Add teaching assignment ID
    }));
};

export const useAssessmentGroups = (departmentId?: number) => {
  return useQuery({
    queryKey: ["assessmentGroups", departmentId],
    queryFn: () => fetchAssessmentGroupsByDepartment(departmentId!),
    enabled: !!departmentId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useAllAssessmentGroups = () => {
  return useQuery({
    queryKey: ["allAssessmentGroups"],
    queryFn: async () => {
      const assessmentGroups = await fetchAllAssessmentGroups();
      // return transformToGradeApprovalRequests(assessmentGroups);
      return assessmentGroups;
    },
    enabled: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useGradeApprovalRequests = (departmentId?: number) => {
  return useQuery({
    queryKey: ["gradeApprovalRequests", departmentId],
    queryFn: async () => {
      const assessmentGroups = await fetchAssessmentGroupsByDepartment(
        departmentId!
      );
      return transformToGradeApprovalRequests(assessmentGroups);
    },
    enabled: !!departmentId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
