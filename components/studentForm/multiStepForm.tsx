"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { useStudentFormStore } from "@/lib/store/studentFormStore";
import PersonalInfoForm from "./personalInfoForm";
import FamilyInfoForm from "./familyInfo";
import ContactInfoForm from "./contactInfoForm";
import AcademicBackgroundForm from "./academicBackground";
import EmploymentHistoryForm from "./employmentHistory";
import router from "next/router";
import { getLocalStorage } from "@/utils/localStorage";

const steps = [
  { id: 1, label: "Personal info", description: "Basic information" },
  { id: 2, label: "Contact info", description: "Contact details" },
  { id: 3, label: "Academic info", description: "Education background" },
  { id: 4, label: "Family info", description: "Family details" },
  { id: 5, label: "Employment history", description: "Work experience" },
];

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const {
    personalInfo,
    contactInfo,
    academicInfo,
    familyInfo,
    employmentHistory,
  } = useStudentFormStore();
  const userMainId = getLocalStorage("userMainId");

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async () => {
    try {
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

      const formData = {
        userId: parseInt(currentUserId || "0"),
        studentTempId: personalInfo.student_temp_id || "",
        programId: 1,
        sectionId: 1,
        currentStudyingLevel: personalInfo.currentLevel || "1",
        currentStudyingSemester: personalInfo.currentSemester || "1",
        currentStudyingYear: academicYearId || "1",
        placeOfBirthTown: personalInfo.place_of_birth_town || "",
        placeOfBirthZone: personalInfo.place_of_birth_zone || "",
        placeOfBirthRegion: personalInfo.place_of_birth_region || "",
        dateOfBirth: formatDate(personalInfo.date_of_birth),
        addressKebele: personalInfo.address_kebele || "",
        addressWoreda: personalInfo.address_woreda || "",
        addressZone: personalInfo.address_zone || "",
        addressRegion: personalInfo.address_region || "",
        addressTown: personalInfo.address_town || "",
        phoneHome: personalInfo.phone_home || "",
        phoneOffice: personalInfo.phone_office || "",
        departmentId: personalInfo.department_id || 1,
        admissionTypeId: personalInfo.admission_type_id || 1,
        maritalStatus: formatMaritalStatus(personalInfo.MaritalStatus),
        emergencyContacts: {
          fullName: contactInfo.full_name || "",
          phoneMobile: contactInfo.phone_mobile || "",
        },
        parents: familyInfo.map((parent) => ({
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
        })),
        employments: employmentHistory || [],
        transcript: {
          grade9FilePath: academicInfo.transcript.grade_9_file_path || "",
          grade10FilePath: academicInfo.transcript.grade_10_file_path || "",
          grade11FilePath: academicInfo.transcript.grade_11_file_path || "",
          grade12FilePath: academicInfo.transcript.grade_12_file_path || "",
          examFilePath: academicInfo.transcript.exam_file_path || "",
          englishGrade: academicInfo.transcript.english_grade || 0,
          mathsGrade: academicInfo.transcript.maths_grade || 0,
        },
        pastSecondary: {
          filePaths: academicInfo.pastSchools[0]?.file_paths || "",
        },
      };

      console.log("Submitting form data:", formData);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/students`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        console.error("Failed to submit form:", response.statusText);
        return;
      }

      console.log("Form submitted successfully");
      router.push("/auth/login");
      setStep(1);
    } catch (error) {
      console.error("Error submitting form:", error);
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
