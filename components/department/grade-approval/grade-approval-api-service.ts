// Grade Approval API Service
import {
  GradeApprovalRequest,
  GradeApprovalStats,
  ApprovalDecision,
  ApiResponse,
  Teacher,
  Course,
  Section,
  StudentGrade,
} from "./types";

// Mock data for development
const mockTeachers: Teacher[] = [
  {
    id: "T001",
    firstName: "Dr. Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@university.edu",
    employeeId: "EMP001",
    department: "AH",
  },
  {
    id: "T002",
    firstName: "Prof. Michael",
    lastName: "Davis",
    email: "michael.davis@university.edu",
    employeeId: "EMP002",
    department: "ANP",
  },
  {
    id: "T003",
    firstName: "Dr. Emily",
    lastName: "Wilson",
    email: "emily.wilson@university.edu",
    employeeId: "EMP003",
    department: "CAA",
  },
  {
    id: "T004",
    firstName: "Dr. James",
    lastName: "Brown",
    email: "james.brown@university.edu",
    employeeId: "EMP004",
    department: "CRP",
  },
];

const mockCourses: Course[] = [
  {
    id: "C001",
    name: "Animal Anatomy and Physiology",
    code: "AH101",
    creditHours: 4,
    department: "AH",
  },
  {
    id: "C002",
    name: "Livestock Production Systems",
    code: "ANP201",
    creditHours: 3,
    department: "ANP",
  },
  {
    id: "C003",
    name: "Financial Accounting Principles",
    code: "CAA101",
    creditHours: 3,
    department: "CAA",
  },
  {
    id: "C004",
    name: "Crop Science Fundamentals",
    code: "CRP101",
    creditHours: 4,
    department: "CRP",
  },
];

const mockSections: Section[] = [
  {
    id: "S001",
    name: "Section A",
    department: "AH",
    departmentName: "Animal Health",
    level: "2",
    year: "2024",
    semester: "1",
  },
  {
    id: "S002",
    name: "Section B",
    department: "ANP",
    departmentName: "Animal Production",
    level: "3",
    year: "2024",
    semester: "1",
  },
  {
    id: "S003",
    name: "Section A",
    department: "CAA",
    departmentName: "Cooperative Accounting and Auditing",
    level: "1",
    year: "2024",
    semester: "1",
  },
];

// Ethiopian student names for realistic mock data
const ethiopianNames = [
  "Abebe Tadesse",
  "Almaz Haile",
  "Bereket Desta",
  "Chaltu Bekele",
  "Dawit Mengistu",
  "Embet Girma",
  "Fikadu Tesfa",
  "Genet Mulatu",
  "Habtamu Yohannes",
  "Ifa Kebede",
  "Jemal Ahmed",
  "Kalkidan Worku",
  "Liya Solomon",
  "Mahlet Tesfaye",
  "Naod Getachew",
  "Oliyad Tekle",
  "Rahel Berhane",
  "Samuel Kassahun",
  "Tigist Alemayehu",
  "Yonas Shiferaw",
  "Zeritu Asefa",
  "Abraham Wolde",
  "Bethlehem Negash",
  "Caleb Fekadu",
  "Danait Tekeste",
  "Eyob Gebremariam",
  "Frehiwot Amare",
  "Getnet Abay",
  "Helen Tadesse",
  "Ibrahim Seid",
  "Jonatan Legesse",
  "Kiya Abeba",
  "Luam Tesfai",
  "Meron Teshome",
  "Natan Girma",
  "Hanan Abdella",
  "Ruth Ephrem",
  "Solomon Woldemariam",
  "Tarik Mekonnen",
  "Yeabsra Desta",
  "Zara Yemane",
  "Addisu Mulugeta",
  "Bruktawit Gebru",
  "Chala Dagnachew",
  "Deborah Mekuria",
  "Efrem Kahsay",
  "Fasil Getahun",
  "Gelila Bekele",
  "Henok Tadele",
  "Iman Hassan",
];

const generateMockGrades = (count: number): StudentGrade[] => {
  const grades = [
    "A+",
    "A",
    "A-",
    "B+",
    "B",
    "B-",
    "C+",
    "C",
    "C-",
    "D+",
    "D",
    "F",
  ];
  const gradePoints = [
    4.0, 4.0, 3.7, 3.3, 3.0, 2.7, 2.3, 2.0, 1.7, 1.3, 1.0, 0.0,
  ];

  return Array.from({ length: count }, (_, index) => {
    const gradeIndex = Math.floor(Math.random() * grades.length);
    const grade = grades[gradeIndex];
    const points = gradePoints[gradeIndex];

    return {
      studentId: `ST${String(index + 1).padStart(3, "0")}`,
      studentName: ethiopianNames[index % ethiopianNames.length],
      studentNumber: `AMU/2024/${String(
        Math.floor(Math.random() * 9999) + 1000
      )}`,
      grade,
      points,
      status: points >= 2.0 ? "pass" : points > 0 ? "fail" : "incomplete",
      remarks: Math.random() > 0.8 ? "Good performance" : undefined,
    };
  });
};

/* let mockRequests: GradeApprovalRequest[] = [
  {
    id: "GA001",
    teacher: mockTeachers[0],
    course: mockCourses[0],
    section: mockSections[0],
    grades: generateMockGrades(45),
    submittedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    deadline: new Date(Date.now() + 22 * 60 * 60 * 1000).toISOString(), // 22 hours from now
    status: "pending",
    totalStudents: 48,
    submittedGrades: 45,
    message:
      "Final exam grades for Animal Anatomy and Physiology. Three students were absent for the exam.",
  },
  {
    id: "GA002",
    teacher: mockTeachers[1],
    course: mockCourses[1],
    section: mockSections[1],
    grades: generateMockGrades(52),
    submittedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    deadline: new Date(Date.now() + 19 * 60 * 60 * 1000).toISOString(), // 19 hours from now
    status: "pending",
    totalStudents: 52,
    submittedGrades: 52,
    message:
      "Midterm examination results. All students participated in the assessment.",
  },
  {
    id: "GA003",
    teacher: mockTeachers[2],
    course: mockCourses[2],
    section: mockSections[2],
    grades: generateMockGrades(38),
    submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    deadline: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours overdue
    status: "pending",
    totalStudents: 40,
    submittedGrades: 38,
    message:
      "Final project grades. Two students submitted late and will be graded separately.",
  },
  {
    id: "GA004",
    teacher: mockTeachers[3],
    course: mockCourses[3],
    section: mockSections[0],
    grades: generateMockGrades(41),
    submittedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
    status: "approved",
    reviewedBy: "registrar-001",
    reviewedAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    totalStudents: 41,
    submittedGrades: 41,
    message: "Continuous assessment grades compilation for the semester.",
  },
]; */

class GradeApprovalApiService {
  // Simulate API delay
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async getGradeApprovalRequests(): Promise<
    ApiResponse<GradeApprovalRequest[]>
  > {
    await this.delay(800);

    try {
      return {
        success: true,
        data: [],
        message: "Grade approval requests retrieved successfully",
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to fetch grade approval requests111",
      };
    }
  }

 /*  async getGradeApprovalStats(): Promise<ApiResponse<GradeApprovalStats>> {
    await this.delay(500);

    try {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      const stats: GradeApprovalStats = {
        totalRequests: mockRequests.length,
        pendingRequests: mockRequests.filter((r) => r.status === "pending")
          .length,
        approvedToday: mockRequests.filter((r) => {
          if (!r.reviewedAt) return false;
          const reviewDate = new Date(r.reviewedAt);
          return reviewDate >= today && r.status === "approved";
        }).length,
        rejectedToday: mockRequests.filter((r) => {
          if (!r.reviewedAt) return false;
          const reviewDate = new Date(r.reviewedAt);
          return reviewDate >= today && r.status === "rejected";
        }).length,
        avgProcessingTime: 4.5, // hours
      };

      return {
        success: true,
        data: stats,
        message: "Grade approval statistics retrieved successfully",
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to fetch grade approval statistics",
      };
    }
  }

  async submitApprovalDecision(
    decision: ApprovalDecision
  ): Promise<ApiResponse<string>> {
    await this.delay(1200);

    try {
      const requestIndex = mockRequests.findIndex(
        (r) => r.id === decision.requestId
      );

      if (requestIndex === -1) {
        return {
          success: false,
          error: "Grade approval request not found",
        };
      }

      // Update the request status
      const updatedRequest = { ...mockRequests[requestIndex] };
      updatedRequest.status =
        decision.action === "approve"
          ? "approved"
          : decision.action === "reject"
          ? "rejected"
          : "revision_requested";
      updatedRequest.reviewedBy = decision.reviewerId;
      updatedRequest.reviewedAt = new Date().toISOString();
      updatedRequest.rejectionReason = decision.reason;

      mockRequests[requestIndex] = updatedRequest;

      // If approved, simulate sending grades to student records
      if (decision.action === "approve") {
        console.log(
          `Grades approved and sent to student records for request ${decision.requestId}`
        );
        // In real implementation, this would trigger an API call to update student records
      }

      return {
        success: true,
        data: "Decision submitted successfully",
        message: `Grade submission ${
          decision.action === "approve"
            ? "approved"
            : decision.action === "reject"
            ? "rejected"
            : "revision requested"
        } successfully`,
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to submit approval decision",
      };
    }
  }

  async getRequestById(
    requestId: string
  ): Promise<ApiResponse<GradeApprovalRequest>> {
    await this.delay(300);

    try {
      const request = mockRequests.find((r) => r.id === requestId);

      if (!request) {
        return {
          success: false,
          error: "Grade approval request not found",
        };
      }

      return {
        success: true,
        data: request,
        message: "Grade approval request retrieved successfully",
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to fetch grade approval request",
      };
    }
  } */

  // Real API integration points - replace mock implementations with actual API calls
  /*
  async getGradeApprovalRequests(): Promise<ApiResponse<GradeApprovalRequest[]>> {
    const response = await fetch('/api/registrar/grade-approvals', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    
    return await response.json();
  }

  async submitApprovalDecision(decision: ApprovalDecision): Promise<ApiResponse<string>> {
    const response = await fetch('/api/registrar/grade-approvals/decision', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      },
      body: JSON.stringify(decision)
    });
    
    return await response.json();
  }
  */
}

export const gradeApprovalApiService = new GradeApprovalApiService();
