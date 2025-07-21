"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, AlertCircle, CheckCircle } from "lucide-react";
import { GradeApprovalNotifications } from "./grade-approval-notifications";
//import { GradeReviewModal } from "./grade-review-modal";
import { GradeApprovalStatsComponent } from "./grade-approval-stats";
import { useGradeApprovalLogic } from "./grade-approval-logic";
import { GradeApprovalRequest, ApprovalDecision } from "./types";
import { getLocalStorage } from "@/utils/localStorage";
import { RegistrarBulkActions } from "./registrar-bulk-actions";
import { GradeReviewModal } from "./grade-review-modal";
import GradeReviewPage from "./grade-review-page";
//import { GradeReviewPage } from "./grade-review-modal";


export function GradeApprovalPage() {
  const {
    loading,
    submittingDecision,
    error,
    //submitDecision,
    //refreshData,
  } = useGradeApprovalLogic();

  const [selectedRequest, setSelectedRequest] =
    useState<GradeApprovalRequest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const departmentId = getLocalStorage("departmentId");
  const registrarId = getLocalStorage("registrarId");


  const handleViewRequest = (request: GradeApprovalRequest) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
  };


  return (
    <>
      {isModalOpen && (
        <GradeReviewPage
          request={selectedRequest}
          onClose={handleCloseModal}
          //onDecision={handleDecision}
          loading={submittingDecision}
        />
      )}
     {(!isModalOpen && <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-blue-900">Grade Approval</h1>
            <p className="text-blue-600 mt-1">
              Review and approve teacher-submitted grades
            </p>
          </div>
{/*           <Button
            onClick={handleRefresh}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button> */}
        </div>

        {/* Department Bulk Actions */}
        <RegistrarBulkActions />

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
        <GradeApprovalStatsComponent />

        {/* Grade Approval Notifications */}
        <GradeApprovalNotifications onViewRequest={handleViewRequest} />
      </div>)}
    </>
  );
}
