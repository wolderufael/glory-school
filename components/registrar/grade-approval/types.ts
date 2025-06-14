// Grade Approval System Types

export interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  employeeId: string;
  department: string;
}

export interface Section {
  id: string;
  name: string;
  department: string;
  departmentName: string;
  level: string;
  year: string;
  semester: string;
}

export interface StudentGrade {
  studentId: string;
  studentName: string;
  studentNumber: string;
  grade: string;
  points: number;
  status: "pass" | "fail" | "incomplete";
  remarks?: string;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  creditHours: number;
  department: string;
}

export interface GradeApprovalRequest {
  id: string;
  teacher: Teacher;
  course: Course;
  section: Section;
  grades: StudentGrade[];
  submittedAt: string;
  deadline?: string;
  status: "pending" | "approved" | "rejected" | "revision_requested";
  reviewedBy?: string;
  reviewedAt?: string;
  rejectionReason?: string;
  totalStudents: number;
  submittedGrades: number;
  message?: string;
}

export interface GradeApprovalStats {
  totalRequests: number;
  pendingRequests: number;
  approvedToday: number;
  rejectedToday: number;
  avgProcessingTime: number;
}

export interface ApprovalDecision {
  requestId: string;
  action: "approve" | "reject" | "request_revision";
  reason?: string;
  feedback?: string;
  reviewerId: string;
}

export interface GradeDistribution {
  grade: string;
  count: number;
  percentage: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
