"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { useStudentFormStore } from "@/lib/store/studentFormStore";
import PersonalInfoForm from "./personalInfoForm";
import FamilyInfoForm from "./familyInfo";
import ContactInfoForm from "./contactInfoForm";
import AcademicBackgroundForm from "./academicBackground";
import EmploymentHistoryForm from "./employmentHistory";
import { useRouter } from "next/navigation";
import { getLocalStorage } from "@/utils/localStorage";
import { useAuthStore } from "@/lib/store/authStore";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";

const steps = [
  { id: 1, label: "Personal info", description: "Basic information" },
  { id: 2, label: "Contact info", description: "Contact details" },
  { id: 3, label: "Academic info", description: "Education background" },
  { id: 4, label: "Family info", description: "Family details" },
  { id: 5, label: "Academic history", description: "Work experience" },
];

export default function MultiStepForm() {
  console.log("TEST2222222222222222222222222");
  const [step, setStep] = useState(1);
  const [isAcceptedStatus, setIsAcceptedStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const {
    personalInfo,
    contactInfo,
    academicInfo,
    familyInfo,
    employmentHistory,
  } = useStudentFormStore();
  const { logout } = useAuthStore();

  useEffect(() => {
    // Check isAccepted status on client-side only
    const status = getLocalStorage("isAccepted");
    setIsAcceptedStatus(status);
  }, []);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleCheckStatus = async () => {
    try {
      await logout();
      router.push("/?tab=accepted-students");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // Show nothing during initial render to prevent flash
  /*   if (isAcceptedStatus === null) {
    return null;
  } */

  // Show Not Listed message if not accepted
  if (isAcceptedStatus === "No") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Not Listed</h2>
          <p className="text-gray-700 mb-6">
            Check accepted student list, You are not Listed
          </p>
          <button
            onClick={handleCheckStatus}
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Go to Accepted Students List
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Show loading UI for 3 seconds instead of making API call
      await new Promise((resolve) => setTimeout(resolve, 3000));

      console.log("Form submitted successfully (mock)");
      toast.success("Registration successful");

      // Redirect to student dashboard
      router.push("/student/dashboard");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred while submitting the form");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = async () => {
    try {
      logout();
      router.push("/auth/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const getStepStatus = (stepId: number) => {
    if (stepId < step) return "completed";
    if (stepId === step) return "current";
    return "upcoming";
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 relative">
      {/* Loading Overlay */}
      {isSubmitting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 shadow-2xl border border-gray-200 max-w-md w-full mx-4">
            <div className="text-center">
              {/* Loading Spinner */}
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-6 animate-spin">
                <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>

              {/* Loading Text */}
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Register In Process...
              </h3>
              <p className="text-gray-600 mb-4">
                Please wait while we process your registration
              </p>

              {/* Progress Dots */}
              <div className="flex justify-center space-x-2">
                <div
                  className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content - Blurred when loading */}
      <div className={isSubmitting ? "blur-sm pointer-events-none" : ""}>
        {/* Progress Header */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 mb-8 shadow-sm border border-blue-100">
          <div className="flex justify-end mb-4">
            <Button
              variant="destructive"
              onClick={handleCancel}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Cancel Registration
            </Button>
          </div>

          <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">
            Student Registration Form
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Please complete all steps to register successfully
          </p>

          {/* Progress Indicator */}
          <div className="md:flex items-center justify-between grid grid-cols-3 max-w-4xl mx-auto">
            {steps.map((currentStep, index) => {
              const status = getStepStatus(currentStep.id);
              const isLast = index === steps.length - 1;

              return (
                <div key={currentStep.id} className="flex items-center flex-1">
                  {/* Step Circle */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`
                    relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ease-in-out
                    ${
                      status === "completed"
                        ? "bg-green-500 border-green-500 text-white shadow-lg"
                        : status === "current"
                        ? "bg-blue-500 border-blue-500 text-white shadow-lg scale-110"
                        : "bg-white border-gray-300 text-gray-400"
                    }
                  `}
                    >
                      {status === "completed" ? (
                        <Check className="w-6 h-6" />
                      ) : (
                        <span className="text-sm font-semibold">
                          {currentStep.id}
                        </span>
                      )}

                      {/* Pulse animation for current step */}
                      {status === "current" && (
                        <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-25"></div>
                      )}
                    </div>

                    {/* Step Label */}
                    <div className="mt-3 text-center">
                      <div
                        className={`text-sm font-medium transition-colors duration-200 ${
                          status === "current"
                            ? "text-blue-600"
                            : status === "completed"
                            ? "text-green-600"
                            : "text-gray-500"
                        }`}
                      >
                        {currentStep.label}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {currentStep.description}
                      </div>
                    </div>
                  </div>

                  {/* Connecting Line */}
                  {!isLast && (
                    <div className="flex-1 h-0.5 mx-4 mt-[-20px]">
                      <div
                        className={`h-full transition-all duration-500 ease-in-out ${
                          currentStep.id < step ? "bg-green-500" : "bg-gray-300"
                        }`}
                      ></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Progress Bar */}
          <div className="mt-8 max-w-4xl mx-auto">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Progress</span>
              <span>{Math.round((step / steps.length) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${(step / steps.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          {step === 1 && <PersonalInfoForm nextStep={nextStep} />}

          {step === 2 && (
            <ContactInfoForm nextStep={nextStep} prevStep={prevStep} />
          )}

          {step === 3 && (
            <AcademicBackgroundForm nextStep={nextStep} prevStep={prevStep} />
          )}

          {step === 4 && (
            <FamilyInfoForm nextStep={nextStep} prevStep={prevStep} />
          )}

          {step === 5 && (
            <EmploymentHistoryForm
              nextStep={handleSubmit}
              prevStep={prevStep}
            />
          )}
        </div>
      </div>
    </div>
  );
}
