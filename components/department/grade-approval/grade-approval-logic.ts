"use client";

// Grade Approval Business Logic
import { useState, useCallback, useEffect } from "react";
import {
  GradeApprovalRequest,
  GradeApprovalStats,
  ApprovalDecision,
  GradeDistribution,
} from "./types";

export interface UseGradeApprovalLogicReturn {
  // State
  requests: GradeApprovalRequest[];
  stats: GradeApprovalStats | null;
  loading: boolean;
  submittingDecision: boolean;
  error: string | null;

  // Actions
  /* fetchRequests: () => Promise<void>;
  fetchStats: () => Promise<void>; */
  //submitDecision: (decision: ApprovalDecision) => Promise<boolean>;
  //refreshData: () => Promise<void>;

  // Helpers
  getUrgentRequests: () => GradeApprovalRequest[];
  getPendingRequests: () => GradeApprovalRequest[];
  getGradeDistribution: (grades: any[]) => GradeDistribution[];
  calculatePassRate: (grades: any[]) => number;
  isOverdue: (deadline?: string) => boolean;
}

// Mock data for high school grade approval
const mockGradeApprovalRequests: GradeApprovalRequest[] = [
  {
    id: "1",
    teacher: {
      id: "101",
      firstName: "Sarah",
      lastName: "Johnson",
      email: "s.johnson@highschool.edu",
      employeeId: "EMP001",
      department: "Science",
    },
    course: {
      id: "PHYS-10",
      name: "Physics Grade 10",
      code: "PHYS-10",
      creditHours: 4,
      department: "Science",
    },
    section: {
      id: "10-A",
      name: "Grade 10-A",
      department: "Science",
      departmentName: "Science Department",
      level: "10",
      year: "2024",
      semester: "1",
    },
    submittedAt: "2024-12-15T10:30:00Z",
    deadline: "2024-12-20T23:59:59Z",
    status: "department_pending" as const,
    totalStudents: 30,
    submittedGrades: 30,
    teachingAssignmentId: 1,
    grades: [
      {
        studentId: "1",
        studentName: "Ahmed Ali",
        studentNumber: "ST001",
        grade: "A",
        points: 4.0,
        status: "pass",
      },
      {
        studentId: "2",
        studentName: "Fatima Mohammed",
        studentNumber: "ST002",
        grade: "B+",
        points: 3.5,
        status: "pass",
      },
      {
        studentId: "3",
        studentName: "John Smith",
        studentNumber: "ST003",
        grade: "B",
        points: 3.0,
        status: "pass",
      },
      {
        studentId: "4",
        studentName: "Mary Johnson",
        studentNumber: "ST004",
        grade: "C+",
        points: 2.5,
        status: "pass",
      },
      {
        studentId: "5",
        studentName: "David Wilson",
        studentNumber: "ST005",
        grade: "C",
        points: 2.0,
        status: "pass",
      },
    ],
  },
  {
    id: "2",
    teacher: {
      id: "102",
      firstName: "Emily",
      lastName: "Davis",
      email: "e.davis@highschool.edu",
      employeeId: "EMP002",
      department: "Science",
    },
    course: {
      id: "BIOL-11",
      name: "Biology Grade 11",
      code: "BIOL-11",
      creditHours: 4,
      department: "Science",
    },
    section: {
      id: "11-B",
      name: "Grade 11-B",
      department: "Science",
      departmentName: "Science Department",
      level: "11",
      year: "2024",
      semester: "1",
    },
    submittedAt: "2024-12-14T14:15:00Z",
    deadline: "2024-12-18T23:59:59Z",
    status: "department_pending" as const,
    totalStudents: 28,
    submittedGrades: 28,
    teachingAssignmentId: 2,
    grades: [
      {
        studentId: "6",
        studentName: "Sara Ahmed",
        studentNumber: "ST006",
        grade: "B",
        points: 3.0,
        status: "pass",
      },
      {
        studentId: "7",
        studentName: "Michael Brown",
        studentNumber: "ST007",
        grade: "C+",
        points: 2.5,
        status: "pass",
      },
      {
        studentId: "8",
        studentName: "Lisa Davis",
        studentNumber: "ST008",
        grade: "C",
        points: 2.0,
        status: "pass",
      },
      {
        studentId: "9",
        studentName: "Robert Taylor",
        studentNumber: "ST009",
        grade: "D+",
        points: 1.5,
        status: "fail",
      },
      {
        studentId: "10",
        studentName: "Jennifer Wilson",
        studentNumber: "ST010",
        grade: "F",
        points: 0.0,
        status: "fail",
      },
    ],
  },
  {
    id: "3",
    teacher: {
      id: "103",
      firstName: "James",
      lastName: "Thompson",
      email: "j.thompson@highschool.edu",
      employeeId: "EMP003",
      department: "Mathematics",
    },
    course: {
      id: "MATH-12",
      name: "Mathematics Grade 12",
      code: "MATH-12",
      creditHours: 4,
      department: "Mathematics",
    },
    section: {
      id: "12-A",
      name: "Grade 12-A",
      department: "Mathematics",
      departmentName: "Mathematics Department",
      level: "12",
      year: "2024",
      semester: "1",
    },
    submittedAt: "2024-12-16T09:20:00Z",
    deadline: "2024-12-22T23:59:59Z",
    status: "department_approved" as const,
    totalStudents: 25,
    submittedGrades: 25,
    teachingAssignmentId: 3,
    reviewedBy: "dept-head-001",
    reviewedAt: "2024-12-16T15:30:00Z",
    grades: [
      {
        studentId: "11",
        studentName: "Hassan Omar",
        studentNumber: "ST011",
        grade: "A",
        points: 4.0,
        status: "pass",
      },
      {
        studentId: "12",
        studentName: "Aisha Ibrahim",
        studentNumber: "ST012",
        grade: "A-",
        points: 3.7,
        status: "pass",
      },
      {
        studentId: "13",
        studentName: "Kevin Martinez",
        studentNumber: "ST013",
        grade: "B+",
        points: 3.5,
        status: "pass",
      },
      {
        studentId: "14",
        studentName: "Sophie Chen",
        studentNumber: "ST014",
        grade: "B",
        points: 3.0,
        status: "pass",
      },
      {
        studentId: "15",
        studentName: "Daniel Kim",
        studentNumber: "ST015",
        grade: "C",
        points: 2.0,
        status: "pass",
      },
    ],
  },
];

const mockGradeApprovalStats: GradeApprovalStats = {
  totalRequests: 15,
  pendingRequests: 8,
  approvedToday: 6,
  rejectedToday: 1,
  avgProcessingTime: 2.5,
};

export function useGradeApprovalLogic(): UseGradeApprovalLogicReturn {
  const [requests, setRequests] = useState<GradeApprovalRequest[]>([]);
  const [stats, setStats] = useState<GradeApprovalStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [submittingDecision, setSubmittingDecision] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize mock data
  useEffect(() => {
    const timer = setTimeout(() => {
      setRequests(mockGradeApprovalRequests);
      setStats(mockGradeApprovalStats);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  /*  const submitDecision = useCallback(
    async (decision: ApprovalDecision): Promise<boolean> => {
      setSubmittingDecision(true);
      setError(null);

      try {
        const response = await gradeApprovalApiService.submitApprovalDecision(
          decision
        );

        if (response.success) {
          // Update the local state to reflect the decision
          setRequests((prev) =>
            prev.map((request) =>
              request.id === decision.requestId
                ? {
                    ...request,
                    status:
                      decision.action === "approve"
                        ? "approved"
                        : decision.action === "reject"
                        ? "rejected"
                        : "revision_requested",
                    reviewedBy: decision.reviewerId,
                    reviewedAt: new Date().toISOString(),
                    rejectionReason: decision.reason,
                  }
                : request
            )
          );

          // Refresh stats after successful decision
          //await fetchStats();

          return true;
        } else {
          setError(response.error || "Failed to submit decision");
          return false;
        }
      } catch (err) {
        setError("Network error while submitting decision");
        console.error("Error submitting approval decision:", err);
        return false;
      } finally {
        setSubmittingDecision(false);
      }
    },
    []
  ); */

  // Helper functions
  const getUrgentRequests = useCallback(() => {
    return requests.filter((request) => {
      if (!request.deadline || request.status !== "department_pending") return false;

      const deadline = new Date(request.deadline);
      const now = new Date();
      const hoursLeft = (deadline.getTime() - now.getTime()) / (1000 * 60 * 60);

      return hoursLeft <= 24 && hoursLeft > 0;
    });
  }, [requests]);

  const getPendingRequests = useCallback(() => {
    return requests.filter((request) => request.status === "department_pending");
  }, [requests]);

  const getGradeDistribution = useCallback(
    (grades: any[]): GradeDistribution[] => {
      if (!grades.length) return [];

      const gradeCount: Record<string, number> = {};
      grades.forEach((grade) => {
        gradeCount[grade.grade] = (gradeCount[grade.grade] || 0) + 1;
      });

      const total = grades.length;
      return Object.entries(gradeCount)
        .map(([grade, count]) => ({
          grade,
          count,
          percentage: Math.round((count / total) * 100),
        }))
        .sort((a, b) => {
          // Sort by typical grade order
          const gradeOrder = [
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
          return gradeOrder.indexOf(a.grade) - gradeOrder.indexOf(b.grade);
        });
    },
    []
  );

  const calculatePassRate = useCallback((grades: any[]): number => {
    if (!grades.length) return 0;

    const passCount = grades.filter((grade) => grade.status === "pass").length;
    return Math.round((passCount / grades.length) * 100);
  }, []);

  const isOverdue = useCallback((deadline?: string): boolean => {
    if (!deadline) return false;

    const deadlineDate = new Date(deadline);
    const now = new Date();

    return now > deadlineDate;
  }, []);

  return {
    // State
    requests,
    stats,
    loading,
    submittingDecision,
    error,

    // Actions
    /*  fetchRequests,
    fetchStats, */
    //submitDecision,
    // refreshData, //refreshData,

    // Helpers
    getUrgentRequests,
    getPendingRequests,
    getGradeDistribution,
    calculatePassRate,
    isOverdue,
  };
}

// Utility functions for grade analysis
export const gradeAnalysisUtils = {
  /**
   * Validates if a grade distribution is suspicious and might need manual review
   */
  isSuspiciousDistribution: (distribution: GradeDistribution[]): boolean => {
    const totalGrades = distribution.reduce((sum, dist) => sum + dist.count, 0);

    // Check for too many A grades (>60%)
    const aGrades = distribution
      .filter((dist) => ["A+", "A", "A-"].includes(dist.grade))
      .reduce((sum, dist) => sum + dist.count, 0);

    if (aGrades / totalGrades > 0.6) return true;

    // Check for too many F grades (>40%)
    const fGrades = distribution
      .filter((dist) => dist.grade === "F")
      .reduce((sum, dist) => sum + dist.count, 0);

    if (fGrades / totalGrades > 0.4) return true;

    return false;
  },

  /**
   * Calculates statistical metrics for grade analysis
   */
  calculateGradeMetrics: (grades: any[]) => {
    const points = grades.map((g) => g.points);
    const average = points.reduce((sum, p) => sum + p, 0) / points.length;

    const sortedPoints = [...points].sort((a, b) => a - b);
    const median =
      sortedPoints.length % 2 === 0
        ? (sortedPoints[sortedPoints.length / 2 - 1] +
            sortedPoints[sortedPoints.length / 2]) /
          2
        : sortedPoints[Math.floor(sortedPoints.length / 2)];

    const variance =
      points.reduce((sum, p) => sum + Math.pow(p - average, 2), 0) /
      points.length;
    const standardDeviation = Math.sqrt(variance);

    return {
      average: Math.round(average * 100) / 100,
      median: Math.round(median * 100) / 100,
      standardDeviation: Math.round(standardDeviation * 100) / 100,
      minimum: Math.min(...points),
      maximum: Math.max(...points),
    };
  },

  /**
   * Generates approval recommendations based on grade analysis
   */
  generateApprovalRecommendations: (
    request: GradeApprovalRequest
  ): string[] => {
    const recommendations: string[] = [];

    // Check completion rate
    const completionRate =
      (request.submittedGrades / request.totalStudents) * 100;
    if (completionRate < 100) {
      recommendations.push(
        `Only ${request.submittedGrades}/${
          request.totalStudents
        } students graded (${Math.round(completionRate)}%)`
      );
    }

    // Check if overdue
    if (request.deadline && new Date() > new Date(request.deadline)) {
      recommendations.push("Submission is past deadline");
    }

    // Analyze grade distribution
    const distribution = gradeAnalysisUtils.calculateGradeMetrics(
      request.grades
    );
    if (distribution.average > 3.5) {
      recommendations.push(
        "High average grade - consider reviewing assessment difficulty"
      );
    } else if (distribution.average < 2.0) {
      recommendations.push(
        "Low average grade - may indicate challenging assessment"
      );
    }

    if (distribution.standardDeviation < 0.5) {
      recommendations.push("Low grade variation - check for grade clustering");
    }

    return recommendations;
  },
};
