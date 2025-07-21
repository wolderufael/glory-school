"use client";

// Grade Approval Business Logic
import { useState, useCallback } from "react";
import {
  GradeApprovalRequest,
  GradeApprovalStats,
  ApprovalDecision,
  GradeDistribution,
} from "./types";
import { gradeApprovalApiService } from "./grade-approval-api-service";

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

export function useGradeApprovalLogic(): UseGradeApprovalLogicReturn {
  const [requests, setRequests] = useState<GradeApprovalRequest[]>([]);
  const [stats, setStats] = useState<GradeApprovalStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [submittingDecision, setSubmittingDecision] = useState(false);
  const [error, setError] = useState<string | null>(null);



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
      if (!request.deadline || request.status !== "pending") return false;

      const deadline = new Date(request.deadline);
      const now = new Date();
      const hoursLeft = (deadline.getTime() - now.getTime()) / (1000 * 60 * 60);

      return hoursLeft <= 24 && hoursLeft > 0;
    });
  }, [requests]);

  const getPendingRequests = useCallback(() => {
    return requests.filter((request) => request.status === "pending");
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
