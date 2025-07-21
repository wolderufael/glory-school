"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Settings2,
  CheckCircle,
  Clock,
  AlertTriangle,
  FileText,
  XCircle,
  Loader2,
  ArrowRight,
  Sparkles,
  Building2,
  Zap,
} from "lucide-react";
import { useBulkStatusUpdate } from "@/lib/react-query/mutations/useBulkStatusUpdate";
import { getLocalStorage } from "@/utils/localStorage";
import { toast } from "sonner";

const statusConfig = {
  DRAFT: {
    label: "Draft",
    color: "bg-gray-100 text-gray-800",
    icon: FileText,
    iconColor: "text-gray-600",
    description: "Reset all to draft status",
  },
  SUBMISSION_REQUESTED: {
    label: "Submission Requested",
    color: "bg-blue-100 text-blue-800",
    icon: ArrowRight,
    iconColor: "text-blue-600",
    description: "Request submissions from teachers",
  },
  UNDER_REVIEW: {
    label: "Under Review",
    color: "bg-yellow-100 text-yellow-800",
    icon: Clock,
    iconColor: "text-yellow-600",
    description: "Mark all as under review",
  },
  APPROVED: {
    label: "Approved",
    color: "bg-green-100 text-green-800",
    icon: CheckCircle,
    iconColor: "text-green-600",
    description: "Approve all assessments",
  },
  REJECTED: {
    label: "Rejected",
    color: "bg-red-100 text-red-800",
    icon: XCircle,
    iconColor: "text-red-600",
    description: "Reject all assessments",
  },
};

export function RegistrarBulkActions() {
  const bulkUpdateMutation = useBulkStatusUpdate();
  const departmentId = getLocalStorage("departmentId");
  const registrarId = getLocalStorage("registrarId");

  const handleRequestSubmissions = async () => {
    if (!registrarId) {
      toast.error("Registrar ID not found");
      return;
    }

    try {
      await bulkUpdateMutation.mutateAsync({
        registrarId: registrarId.toString(),
        //departmentId: departmentId.toString(),
        status: "SUBMISSION_REQUESTED",
      });
    } catch (error) {
      console.error("Error requesting submissions:", error);
    }
  };

  return (
    <Card className="border-indigo-200 bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 shadow-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl font-bold text-indigo-900">
          <div className="p-3 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl shadow-lg">
            <ArrowRight className="h-6 w-6 text-white" />
          </div>
          Request Grade Submissions
          <Sparkles className="h-5 w-5 text-blue-500" />
        </CardTitle>
        <p className="text-indigo-700 text-lg">
          Send submission requests to all teachers in your department
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">

          {/* Action Button */}
          <div className="flex justify-center">
            <Button
              onClick={handleRequestSubmissions}
              disabled={bulkUpdateMutation.isPending}
              className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-12 py-4 text-lg rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-bold"
            >
              {bulkUpdateMutation.isPending ? (
                <>
                  <Loader2 className="h-5 w-5 mr-3 animate-spin" />
                  Sending Requests...
                </>
              ) : (
                <>
                  <ArrowRight className="h-5 w-5 mr-3" />
                  Request All Submissions
                </>
              )}
            </Button>
          </div>

          {/* Information Notice */}
{/*           <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-sm">
                <p className="font-semibold text-blue-900 mb-1">
                  Important Information
                </p>
                <p className="text-blue-800">
                  This will send submission requests to all teachers in your
                  department. Teachers will be able to submit their grades for
                  review and approval.
                </p>
                <p className="text-blue-700 mt-2 text-xs">
                  💡 Tip: Use this when the grading period ends and you're ready
                  to collect all grades
                </p>
              </div>
            </div>
          </div> */}
        </div>
      </CardContent>
    </Card>
  );
}
