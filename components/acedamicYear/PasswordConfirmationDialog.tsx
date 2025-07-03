import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle, Lock } from "lucide-react";

interface PasswordConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  warningMessage: string;
  actionType: "academic-year" | "semester";
  targetStatus: string;
  isLoading?: boolean;
}

const PasswordConfirmationDialog: React.FC<PasswordConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  warningMessage,
  actionType,
  targetStatus,
  isLoading = false,
}) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic password validation (you can enhance this with your auth system)
    if (!password) {
      setError("Password is required");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    // Reset error and proceed with confirmation
    setError("");
    onConfirm();
  };

  const handleClose = () => {
    setPassword("");
    setError("");
    onClose();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "OPEN":
        return "text-green-600";
      case "CLOSED":
        return "text-red-600";
      case "UPCOMING":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-red-500" />
            {title}
          </DialogTitle>
          <DialogDescription className="text-left">
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Warning Section */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-amber-800 mb-1">
                  Important Notice
                </h4>
                <p className="text-sm text-amber-700">{warningMessage}</p>
              </div>
            </div>
          </div>

          {/* Action Summary */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-800 mb-2">Action Summary:</h4>
            <p className="text-sm text-gray-600">
              You are about to change the{" "}
              <span className="font-medium">
                {actionType === "academic-year" ? "Academic Year" : "Semester"}
              </span>{" "}
              status to{" "}
              <span className={`font-medium ${getStatusColor(targetStatus)}`}>
                {targetStatus}
              </span>
            </p>
          </div>

          {/* Password Input */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">
                Enter your password to confirm this action
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className={error ? "border-red-500" : ""}
                disabled={isLoading}
              />
              {error && <p className="text-sm text-red-600">{error}</p>}
            </div>

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="destructive"
                disabled={isLoading || !password}
              >
                {isLoading ? "Processing..." : "Confirm Change"}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PasswordConfirmationDialog;
