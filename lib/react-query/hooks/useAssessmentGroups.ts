import { useQuery } from "@tanstack/react-query";
import { GradeApprovalRequest } from "@/components/department/grade-approval/types";
import { AssessmentGroup } from "@/types/types";


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

const fetchAllAssessmentGroups = async (): Promise<AssessmentGroup[]> => {
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
        group.status === "DEPARTMENT_UNDER_REVIEW" ||
        group.status === "DEPARTMENT_APPROVED" ||
        group.status === "DEPARTMENT_REJECTED" ||
        group.status === "REGISTRAR_UNDER_REVIEW" ||
        group.status === "REGISTRAR_REJECTED" ||
        group.status === "APPROVED"
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
        group.status === "DEPARTMENT_UNDER_REVIEW"
          ? ("department_pending" as const)
          : group.status === "DEPARTMENT_APPROVED"
          ? ("department_approved" as const)
          : group.status === "DEPARTMENT_REJECTED"
          ? ("department_rejected" as const)
          : group.status === "REGISTRAR_UNDER_REVIEW"
          ? ("registrar_pending" as const)
          : group.status === "APPROVED"
          ? ("registrar_approved" as const)
          : group.status === "REGISTRAR_REJECTED"
          ? ("registrar_rejected" as const)
          : ("department_pending" as const),
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
      return transformToGradeApprovalRequests(assessmentGroups);
      // return assessmentGroups;
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
