"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Mail, ArrowLeft, KeyRound } from "lucide-react";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    mainId: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.mainId) {
      newErrors.mainId = "ID is required";
    }
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      // Make API call to forgot password endpoint
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mainId: formData.mainId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send reset instructions");
      }

      setIsSubmitted(true);
      toast("Reset Instructions Sent", {
        description: "Please check your email for password reset instructions.",
        style: {
          backgroundColor: "#d4edda",
          color: "#155724",
          borderColor: "#c3e6cb",
        },
      });
    } catch (error) {
      console.error("Forgot password error:", error);
      toast("Request Failed", {
        description:
          error instanceof Error
            ? error.message
            : "Unable to process your request. Please try again.",
        style: {
          backgroundColor: "#f8d7da",
          color: "#721c24",
          borderColor: "#f5c6cb",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">
              Check Your Email
            </CardTitle>
            <CardDescription>
              We've sent password reset instructions to the email associated
              with ID: <strong>{formData.mainId}</strong>
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="text-center text-sm text-gray-600">
              <p>If you don't see the email, check your spam folder.</p>
              <p className="mt-2">
                Didn't receive an email?{" "}
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ mainId: "" });
                  }}
                  className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
                >
                  Try again
                </button>
              </p>
            </div>
          </CardContent>

          <CardFooter>
            <Link href="/auth/login" className="w-full">
              <Button variant="outline" className="w-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Login
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <KeyRound className="w-6 h-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Forgot Password?</CardTitle>
          <CardDescription>
            Enter your ID and we'll send you instructions to reset your password
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="mainId"
                className="text-sm font-medium flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                ID <span className="text-red-500">*</span>
              </Label>
              <Input
                id="mainId"
                name="mainId"
                type="text"
                placeholder="Enter your ID"
                value={formData.mainId}
                onChange={handleChange}
                className={errors.mainId ? "border-red-500" : ""}
              />
              {errors.mainId && (
                <p className="text-red-500 text-sm">{errors.mainId}</p>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Reset Instructions"}
            </Button>

            <div className="text-center">
              <Link
                href="/auth/login"
                className="text-sm text-gray-600 hover:text-gray-700 font-medium hover:underline flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Login
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default ForgotPassword;
