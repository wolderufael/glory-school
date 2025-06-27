"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import Image from "next/image";

interface FileUploadState {
  grade9File: File | null;
  grade10File: File | null;
  grade11File: File | null;
  grade12File: File | null;
  examFile: File | null;
  pastSecondaryFile: File | null;
  profilePicture: File | null;
}

export default function TestUploadPage() {
  const [files, setFiles] = useState<FileUploadState>({
    grade9File: null,
    grade10File: null,
    grade11File: null,
    grade12File: null,
    examFile: null,
    pastSecondaryFile: null,
    profilePicture: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fileKey: keyof FileUploadState
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (fileKey === "profilePicture") {
        // Validate image file
        if (!file.type.startsWith("image/")) {
          toast.error("Please upload an image file");
          return;
        }
        // Create preview URL
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      } else {
        // Validate PDF for other files
        if (file.type !== "application/pdf") {
          toast.error("Please upload PDF files only");
          return;
        }
      }

      setFiles((prev) => ({
        ...prev,
        [fileKey]: file,
      }));
    }
  };

  const handleProfilePictureClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();

      // Add all the default form fields
      formData.append("userId", "7");
      formData.append("studentTempId", "7");
      formData.append("programId", "1");
      formData.append("sectionId", "1");
      /* formData.append("currentStudyingLevel", "1");
      formData.append("currentStudyingSemester", "1");
      formData.append("currentStudyingYear", "1");
      formData.append("placeOfBirthTown", "");
      formData.append("placeOfBirthZone", "");
      formData.append("placeOfBirthRegion", "");
      formData.append("dateOfBirth", "2000-01-01T00:00:00.000Z");
      formData.append("addressKebele", "");
      formData.append("addressWoreda", "");
      formData.append("addressZone", "");
      formData.append("addressRegion", "");
      formData.append("addressTown", "");
      formData.append("phoneHome", "");
      formData.append("phoneOffice", "");
      formData.append("departmentId", "1");
      formData.append("admissionTypeId", "1");
      formData.append("maritalStatus", "Single");
      formData.append("emergencyContacts[fullName]", "Test Contact");
      formData.append("emergencyContacts[phoneMobile]", "1234567890");

      // Parents data
      formData.append("parents[0][parentType]", "Father");
      formData.append("parents[0][fullName]", "Test Father");
      formData.append("parents[0][occupation]", "");
      formData.append("parents[0][educationLevel]", "");
      formData.append("parents[0][addressHouseNo]", "");
      formData.append("parents[0][addressKebele]", "");
      formData.append("parents[0][addressWoreda]", "");
      formData.append("parents[0][addressZone]", "");
      formData.append("parents[0][addressRegion]", "");
      formData.append("parents[0][phone]", "1234567890");
      formData.append("parents[0][poBox]", "");

      formData.append("parents[1][parentType]", "Mother");
      formData.append("parents[1][fullName]", "Test Mother");
      formData.append("parents[1][occupation]", "");
      formData.append("parents[1][educationLevel]", "");
      formData.append("parents[1][addressHouseNo]", "");
      formData.append("parents[1][addressKebele]", "");
      formData.append("parents[1][addressWoreda]", "");
      formData.append("parents[1][addressZone]", "");
      formData.append("parents[1][addressRegion]", "");
      formData.append("parents[1][phone]", "1234567890");
      formData.append("parents[1][poBox]", "");

      formData.append("employments", JSON.stringify([]));
      formData.append("transcript[englishGrade]", "40");
      formData.append("transcript[mathsGrade]", "37"); */

      // Add files directly
      if (files.grade9File) {
        formData.append("nineTranscript", files.grade9File);
      }
      if (files.grade10File) {
        formData.append("tenTranscript", files.grade10File);
      }
      if (files.grade11File) {
        formData.append("elevenTranscript", files.grade11File);
      }
      if (files.grade12File) {
        formData.append("twelveTranscript", files.grade12File);
      }
      if (files.examFile) {
        formData.append("entranceExam", files.examFile);
      }
      if (files.pastSecondaryFile) {
        formData.append("postSecondary", files.pastSecondaryFile);
      }
      if (files.profilePicture) {
        formData.append("profilePicture", files.profilePicture);
      }

      // Submit to the students endpoint
      const response = await fetch("http://192.168.1.65:3000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      toast.success("Form submitted successfully!");
      console.log("Form submitted with files");
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to submit form");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Test File Upload Page</h1>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Profile Picture Upload Section */}
          <div className="flex flex-col items-center space-y-4 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Profile Picture
            </h3>
            <div
              className="relative w-40 h-40 rounded-full overflow-hidden cursor-pointer border-4 border-white shadow-lg hover:opacity-90 transition-opacity"
              onClick={handleProfilePictureClick}
            >
              {previewUrl ? (
                <Image
                  src={previewUrl}
                  alt="Profile Preview"
                  fill
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "profilePicture")}
              className="hidden"
            />
            <p className="text-sm text-gray-600">
              Click to upload profile picture (JPG, PNG)
            </p>
            {files.profilePicture && (
              <p className="text-sm text-green-600">
                Selected: {files.profilePicture.name}
              </p>
            )}
          </div>

          {/* Document Upload Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Grade 9 Transcript */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                Grade 9 Transcript (PDF only)
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => handleFileChange(e, "grade9File")}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
              {files.grade9File && (
                <p className="text-sm text-green-600">
                  Selected: {files.grade9File.name}
                </p>
              )}
            </div>

            {/* Grade 10 Transcript */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                Grade 10 Transcript (PDF only)
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => handleFileChange(e, "grade10File")}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
              {files.grade10File && (
                <p className="text-sm text-green-600">
                  Selected: {files.grade10File.name}
                </p>
              )}
            </div>

            {/* Grade 11 Transcript */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                Grade 11 Transcript (PDF only)
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => handleFileChange(e, "grade11File")}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
              {files.grade11File && (
                <p className="text-sm text-green-600">
                  Selected: {files.grade11File.name}
                </p>
              )}
            </div>

            {/* Grade 12 Transcript */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                Grade 12 Transcript (PDF only)
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => handleFileChange(e, "grade12File")}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
              {files.grade12File && (
                <p className="text-sm text-green-600">
                  Selected: {files.grade12File.name}
                </p>
              )}
            </div>

            {/* Exam File */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                Exam File (PDF only)
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => handleFileChange(e, "examFile")}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
              {files.examFile && (
                <p className="text-sm text-green-600">
                  Selected: {files.examFile.name}
                </p>
              )}
            </div>

            {/* Past Secondary Education */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                Past Secondary Education Documents (PDF only)
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => handleFileChange(e, "pastSecondaryFile")}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
              {files.pastSecondaryFile && (
                <p className="text-sm text-green-600">
                  Selected: {files.pastSecondaryFile.name}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Form"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
