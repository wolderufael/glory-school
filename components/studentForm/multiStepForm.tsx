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
  { id: 5, label: "Employment history", description: "Work experience" },
];

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [isAcceptedStatus, setIsAcceptedStatus] = useState<string | null>(null);
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
  if (isAcceptedStatus === null) {
    return null;
  }

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
    try {
      console.log(
        "Post111111111111111 Secondary Info:",
        academicInfo.pastSchools
      );

      const currentUserId = getLocalStorage("currentUserId");
      const academicYearId = getLocalStorage("academicYearId");

      // Convert date string to ISO format with time
      const formatDate = (dateStr: string) => {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        return date.toISOString();
      };

      // Format marital status to have first letter capitalized
      const formatMaritalStatus = (status: string) => {
        if (!status) return "Single";
        return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
      };

      // Create FormData instance
      const formData = new FormData();

      // Add profile picture if it exists
      if (personalInfo.profilePicture instanceof File) {
        formData.append("profilePicture", personalInfo.profilePicture);
      }

      // Add all personal info fields
      formData.append("userId", currentUserId?.toString() || "0");
      formData.append(
        "studentTempId",
        personalInfo.student_temp_id?.toString() || ""
      );
      formData.append("programId", "1");
      formData.append("sectionId", "1");
      formData.append("currentStudyingLevel", personalInfo.currentLevel || "1");
      formData.append(
        "currentStudyingSemester",
        personalInfo.currentSemester || "1"
      );
      formData.append("currentStudyingYear", academicYearId?.toString() || "1");
      formData.append(
        "placeOfBirthTown",
        personalInfo.place_of_birth_town || ""
      );
      formData.append(
        "placeOfBirthZone",
        personalInfo.place_of_birth_zone || ""
      );
      formData.append(
        "placeOfBirthRegion",
        personalInfo.place_of_birth_region || ""
      );
      formData.append(
        "dateOfBirth",
        formatDate(personalInfo.date_of_birth || "")
      );
      formData.append("addressKebele", personalInfo.address_kebele || "");
      formData.append("addressWoreda", personalInfo.address_woreda || "");
      formData.append("addressZone", personalInfo.address_zone || "");
      formData.append("addressRegion", personalInfo.address_region || "");
      formData.append("addressTown", personalInfo.address_town || "");
      formData.append("phoneHome", personalInfo.phone_home || "");
      formData.append("phoneOffice", personalInfo.phone_office || "");
      formData.append(
        "departmentId",
        personalInfo.department_id?.toString() || "1"
      );
      formData.append(
        "admissionTypeId",
        personalInfo.admission_type_id?.toString() || "1"
      );
      formData.append(
        "maritalStatus",
        formatMaritalStatus(personalInfo.MaritalStatus || "SINGLE")
      );

      // Add emergency contacts
      formData.append(
        "emergencyContacts",
        JSON.stringify({
          fullName: contactInfo.full_name || "",
          phoneMobile: contactInfo.phone_mobile || "",
        })
      );

      // Add parents info
      formData.append(
        "parents",
        JSON.stringify(
          familyInfo.map((parent) => ({
            parentType: parent.parent_type === "FATHER" ? "Father" : "Mother",
            fullName: parent.full_name || "",
            occupation: parent.occupation || "",
            educationLevel: parent.education_level || "",
            addressHouseNo: parent.address_house_no || "",
            addressKebele: parent.address_kebele || "",
            addressWoreda: parent.address_woreda || "",
            addressZone: parent.address_zone || "",
            addressRegion: parent.address_region || "",
            phone: parent.phone || "",
            poBox: parent.po_box || "",
          }))
        )
      );

      // Add employment history
      employmentHistory.forEach((employment, index) => {
        Object.entries(employment).forEach(([key, value]) => {
          formData.append(`employment${index}${key}`, value?.toString() || "");
        });
      });

      // Add transcript files
      if (academicInfo.transcript.grade_9_file_path instanceof File) {
        formData.append(
          "nineTranscript",
          academicInfo.transcript.grade_9_file_path
        );
      }
      if (academicInfo.transcript.grade_10_file_path instanceof File) {
        formData.append(
          "tenTranscript",
          academicInfo.transcript.grade_10_file_path
        );
      }
      if (academicInfo.transcript.grade_11_file_path instanceof File) {
        formData.append(
          "elevenTranscript",
          academicInfo.transcript.grade_11_file_path
        );
      }
      if (academicInfo.transcript.grade_12_file_path instanceof File) {
        formData.append(
          "twelveTranscript",
          academicInfo.transcript.grade_12_file_path
        );
      }
      if (academicInfo.transcript.exam_file_path instanceof File) {
        formData.append("entranceExam", academicInfo.transcript.exam_file_path);
      }

      /*     // Add transcript grades
      formData.append(
        "englishGrade",
        academicInfo.transcript.english_grade?.toString() || "0"
      );
      formData.append(
        "mathsGrade",
        academicInfo.transcript.maths_grade?.toString() || "0"
      ); */

      // Add emergency contacts
      formData.append(
        "englishGrade",
        academicInfo.transcript.english_grade?.toString() || "0"
      );
      formData.append(
        "mathsGrade",
        academicInfo.transcript.maths_grade?.toString() || "0"
      );

      academicInfo.pastSchools.forEach((school) => {
        if (school.file_paths instanceof File) {
          formData.append("postSecondary", school.file_paths);
        }
      });

      // Log to verify multiple fields
      console.log("Files being sent:");
      for (const pair of formData.entries()) {
        console.log(
          pair[0],
          ":",
          pair[1] instanceof File ? pair[1].name : pair[1]
        );
      }
      
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("Failed to submit form:", response.statusText, errorData);
        toast.error("Failed to submit form. Please try again.");
        return;
      }

      console.log("Form submitted successfully");
      toast.success("Registration successful");
      //setStep(1);
      logout();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred while submitting the form");
    }
  };

  const handleCancel = async () => {
    try {
      logout();
      //router.push("/auth/login");
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
    <div className="w-full max-w-6xl mx-auto p-6">
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
          <EmploymentHistoryForm nextStep={handleSubmit} prevStep={prevStep} />
        )}
      </div>
    </div>
  );
}
