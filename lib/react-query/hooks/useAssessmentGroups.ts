import { useQuery } from "@tanstack/react-query";
import { GradeApprovalRequest } from "@/components/department/grade-approval/types";
import { AssessmentGroup } from "@/types/types";

const assessmentGroups: AssessmentGroup[] = [
  {
    id: 1,
    name: "Grade 10 Science Assessment",
    status: "DRAFT",
    level: "10th Grade",
    departmentId: 1,
    teachingAssignmentId: 1,
    sectionId: 1,
    createdAt: "2025-01-15T10:00:00Z",
    updatedAt: "2025-01-15T10:00:00Z",
    department: {
      id: 1,
      collegeId: 1,
      name: "Science Department",
      code: "SCI",
      createdAt: "2024-09-01T08:00:00Z",
    },
    section: {
      id: 1,
      sectionName: "10A",
      createdAcademicYearId: 2024,
      createdAt: "2024-09-01T08:00:00Z",
      departmentId: 1,
      currentLevel: "10th Grade",
    },
    teachingAssignment: {
      id: 1,
      teacherId: 1,
      sectionId: 1,
      courseId: 1,
      academicSemesterId: 1,
      academicYearId: 2024,
      level: "10th Grade",
      departmentId: 1,
      course: {
        id: 1,
        collegeId: 1,
        departmentId: 1,
        level: "10th Grade",
        courseCode: "SCI101",
        title: "Biology Fundamentals",
        theoryNhrs: 40,
        practicalNhrs: 20,
        cooperativeNhrs: 0,
        totalNhrs: 60,
        createdAt: "2024-09-01T08:00:00Z",
      },
      teacher: {
        id: 1,
        userId: 1,
        createdAt: "2024-08-01T09:00:00Z",
        updatedAt: "2024-08-01T09:00:00Z",
        user: {
          id: 1,
          firstName: "Jane",
          middleName: "Ann",
          lastName: "Smith",
          email: "jane.smith@school.edu",
          phoneNumber: "+1234567890",
          password: "hashedpassword123",
          userType: "Teacher",
          gender: "Female",
          nationality: "American",
          userMainId: "T001",
        },
      },
    },
  },
  {
    id: 2,
    name: "Grade 11 Math Assessment",
    status: "SUBMISSION_REQUESTED",
    level: "11th Grade",
    departmentId: 2,
    teachingAssignmentId: 2,
    sectionId: 2,
    createdAt: "2025-02-01T12:00:00Z",
    updatedAt: "2025-02-02T09:00:00Z",
    department: {
      id: 2,
      collegeId: 1,
      name: "Mathematics Department",
      code: "MATH",
      createdAt: "2024-09-01T08:00:00Z",
    },
    section: {
      id: 2,
      sectionName: "11B",
      createdAcademicYearId: 2024,
      createdAt: "2024-09-01T08:00:00Z",
      departmentId: 2,
      currentLevel: "11th Grade",
    },
    teachingAssignment: {
      id: 2,
      teacherId: 2,
      sectionId: 2,
      courseId: 2,
      academicSemesterId: 1,
      academicYearId: 2024,
      level: "11th Grade",
      departmentId: 2,
      course: {
        id: 2,
        collegeId: 1,
        departmentId: 2,
        level: "11th Grade",
        courseCode: "MATH201",
        title: "Algebra II",
        theoryNhrs: 50,
        practicalNhrs: 10,
        cooperativeNhrs: 0,
        totalNhrs: 60,
        createdAt: "2024-09-01T08:00:00Z",
      },
      teacher: {
        id: 2,
        userId: 2,
        createdAt: "2024-08-01T09:00:00Z",
        updatedAt: "2024-08-01T09:00:00Z",
        user: {
          id: 2,
          firstName: "Michael",
          middleName: "James",
          lastName: "Brown",
          email: "michael.brown@school.edu",
          phoneNumber: "+1234567891",
          password: "hashedpassword456",
          userType: "Teacher",
          gender: "Male",
          nationality: "American",
          userMainId: "T002",
        },
      },
    },
  },
  {
    id: 3,
    name: "Grade 12 English Assessment",
    status: "APPROVED",
    level: "12th Grade",
    departmentId: 3,
    teachingAssignmentId: 3,
    sectionId: 3,
    createdAt: "2025-03-01T14:00:00Z",
    updatedAt: "2025-03-10T10:00:00Z",
    department: {
      id: 3,
      collegeId: 1,
      name: "English Department",
      code: "ENG",
      createdAt: "2024-09-01T08:00:00Z",
    },
    section: {
      id: 3,
      sectionName: "12C",
      createdAcademicYearId: 2024,
      createdAt: "2024-09-01T08:00:00Z",
      departmentId: 3,
      currentLevel: "12th Grade",
    },
    teachingAssignment: {
      id: 3,
      teacherId: 3,
      sectionId: 3,
      courseId: 3,
      academicSemesterId: 1,
      academicYearId: 2024,
      level: "12th Grade",
      departmentId: 3,
      course: {
        id: 3,
        collegeId: 1,
        departmentId: 3,
        level: "12th Grade",
        courseCode: "ENG301",
        title: "Literature and Composition",
        theoryNhrs: 45,
        practicalNhrs: 15,
        cooperativeNhrs: 0,
        totalNhrs: 60,
        createdAt: "2024-09-01T08:00:00Z",
      },
      teacher: {
        id: 3,
        userId: 3,
        createdAt: "2024-08-01T09:00:00Z",
        updatedAt: "2024-08-01T09:00:00Z",
        user: {
          id: 3,
          firstName: "Emily",
          middleName: "Rose",
          lastName: "Davis",
          email: "emily.davis@school.edu",
          phoneNumber: "+1234567892",
          password: "hashedpassword789",
          userType: "Teacher",
          gender: "Female",
          nationality: "American",
          userMainId: "T003",
        },
      },
    },
  },
];



const fetchAssessmentGroupsByDepartment = async (
  departmentId: number
): Promise<AssessmentGroup[]> => {
  /* const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/assessmentgroups/by-department/${departmentId}`
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json(); */
  return assessmentGroups;
};

const fetchAllAssessmentGroups = async (): Promise<AssessmentGroup[]> => {
  /* const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/assessmentgroups`
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  } */

  return assessmentGroups;
  //return response.json();
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
