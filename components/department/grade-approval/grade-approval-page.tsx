"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, AlertCircle, CheckCircle } from "lucide-react";
import { GradeApprovalNotifications } from "./grade-approval-notifications";
import { GradeReviewModal } from "./grade-review-modal";
import { GradeApprovalStatsComponent } from "./grade-approval-stats";
import { useGradeApprovalLogic } from "./grade-approval-logic";
import { GradeApprovalRequest, ApprovalDecision } from "./types";

export function GradeApprovalPage() {
  const {
    requests,
    stats,
    loading,
    submittingDecision,
    error,
    fetchRequests,
    fetchStats,
    submitDecision,
    refreshData,
    getUrgentRequests,
    getPendingRequests,
  } = useGradeApprovalLogic();

  const [selectedRequest, setSelectedRequest] =
    useState<GradeApprovalRequest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Initial data load
  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      if (!submittingDecision && !isModalOpen) {
        fetchRequests();
        fetchStats();
      }
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, [fetchRequests, fetchStats, submittingDecision, isModalOpen]);

  const handleViewRequest = (request: GradeApprovalRequest) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  const handleDecision = async (decision: ApprovalDecision) => {
    const success = await submitDecision(decision);

    if (success) {
      setSuccessMessage(
        `Grade submission ${
          decision.action === "approve"
            ? "approved"
            : decision.action === "reject"
            ? "rejected"
            : "revision requested"
        } successfully!`
      );

      // Auto-hide success message after 5 seconds
      setTimeout(() => setSuccessMessage(null), 5000);

      handleCloseModal();
    }
  };

  const handleRefresh = () => {
    refreshData();
  };

  const urgentRequests = getUrgentRequests();
  const pendingRequests = getPendingRequests();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blue-900">Grade Approval</h1>
          <p className="text-blue-600 mt-1">
            Review and approve teacher-submitted grades
          </p>
        </div>
        <Button
          onClick={handleRefresh}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <RefreshCw
            className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      {/* Success Message */}
      {successMessage && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="flex items-center gap-3 py-4">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <p className="text-green-800 font-medium">{successMessage}</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSuccessMessage(null)}
              className="ml-auto text-green-600 hover:text-green-800"
            >
              ×
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Error Message */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="flex items-center gap-3 py-4">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <p className="text-red-800 font-medium">{error}</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.location.reload()}
              className="ml-auto text-red-600 hover:text-red-800"
            >
              Retry
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Statistics Dashboard */}
      <GradeApprovalStatsComponent stats={stats} loading={loading && !stats} />

      {/* Urgent Requests Alert */}
{/*       {urgentRequests.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="text-lg text-orange-900 flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Urgent Grade Approvals Required
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-orange-800 mb-4">
              {urgentRequests.length} grade submission
              {urgentRequests.length !== 1 ? "s" : ""}
              {urgentRequests.length === 1 ? " needs" : " need"} immediate
              attention (deadline within 24 hours).
            </p>
            <div className="flex flex-wrap gap-2">
              {urgentRequests.slice(0, 3).map((request) => (
                <Button
                  key={request.id}
                  onClick={() => handleViewRequest(request)}
                  size="sm"
                  className="bg-orange-600 hover:bg-orange-700 text-white"
                >
                  Review {request.course.code}
                </Button>
              ))}
              {urgentRequests.length > 3 && (
                <span className="text-sm text-orange-700 self-center">
                  +{urgentRequests.length - 3} more urgent
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      )} */}

      {/* Quick Actions */}
  {/*     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-blue-100">
          <CardHeader>
            <CardTitle className="text-lg text-blue-900">
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              onClick={() => {
                const firstPending = pendingRequests[0];
                if (firstPending) handleViewRequest(firstPending);
              }}
              disabled={pendingRequests.length === 0}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Review Next Request
            </Button>
            <Button
              onClick={() => {
                const firstUrgent = urgentRequests[0];
                if (firstUrgent) handleViewRequest(firstUrgent);
              }}
              disabled={urgentRequests.length === 0}
              variant="outline"
              className="w-full border-orange-300 text-orange-700 hover:bg-orange-50"
            >
              Review Urgent Request
            </Button>
            <Button
              onClick={handleRefresh}
              variant="outline"
              className="w-full"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Data
            </Button>
          </CardContent>
        </Card>

        <Card className="border-blue-100">
          <CardHeader>
            <CardTitle className="text-lg text-blue-900">
              Today's Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Approved</span>
              <span className="font-medium text-green-700">
                {stats?.approvedToday || 0}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Rejected/Revision</span>
              <span className="font-medium text-red-700">
                {stats?.rejectedToday || 0}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Pending</span>
              <span className="font-medium text-orange-700">
                {pendingRequests.length}
              </span>
            </div>
            <div className="pt-2 border-t">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-blue-900">
                  Total Processed
                </span>
                <span className="font-bold text-blue-700">
                  {(stats?.approvedToday || 0) + (stats?.rejectedToday || 0)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-100">
          <CardHeader>
            <CardTitle className="text-lg text-blue-900">
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">System Status</span>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-green-700">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Online
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Last Updated</span>
              <span className="text-sm text-gray-800">
                {new Date().toLocaleTimeString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Processing Speed</span>
              <span className="text-sm text-blue-700 font-medium">
                {stats?.avgProcessingTime || 0}h avg
              </span>
            </div>
          </CardContent>
        </Card>
      </div> */}

      {/* Grade Approval Notifications */}
      <GradeApprovalNotifications
        requests={requests}
        onViewRequest={handleViewRequest}
        loading={loading}
      />

      {/* Grade Review Modal */}
      <GradeReviewModal
        request={selectedRequest}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onDecision={handleDecision}
        loading={submittingDecision}
      />
    </div>
  );
}
