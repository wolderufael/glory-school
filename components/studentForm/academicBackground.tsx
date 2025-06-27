"use client";

import { useStudentFormStore } from "@/lib/store/studentFormStore";
import {
  TranscriptSchema,
  PastSecondarySchoolSchema,
} from "@/utils/typeSchema";
import { useRef, useState } from "react";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Upload, FileText, X } from "lucide-react";
import { toast } from "sonner";

interface FileUploadState {
  grade9File: File | null;
  grade10File: File | null;
  grade11File: File | null;
  grade12File: File | null;
  examFile: File | null;
  pastSecondaryFile: File | null;
  profilePicture: File | null;
}
interface PostSecondaryEntry {
  id: string;
  files: File[];
  filePaths: string[];
}

export default function AcademicBackgroundForm({
  nextStep,
  prevStep,
}: {
  nextStep: () => void;
  prevStep: () => void;
}) {
  const { academicInfo, setAcademicInfo } = useStudentFormStore();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [postSecondaryEntries, setPostSecondaryEntries] = useState<
    PostSecondaryEntry[]
  >([]);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<FileUploadState>({
    grade9File: null,
    grade10File: null,
    grade11File: null,
    grade12File: null,
    examFile: null,
    pastSecondaryFile: null,
    profilePicture: null,
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //console.log("Current academicInfo:", academicInfo); // Debug log
    console.log("Current postSecondaryEntries:", postSecondaryEntries); // Debug log

    try {
      // Check if all required files are present
      const requiredFiles = [
        { field: "grade_9_file_path", label: "Grade 9 Transcript" },
        { field: "grade_10_file_path", label: "Grade 10 Transcript" },
        { field: "grade_11_file_path", label: "Grade 11 Transcript" },
        { field: "grade_12_file_path", label: "Grade 12 Transcript" },
        { field: "exam_file_path", label: "Entrance Exam" },
      ];

      const newErrors: Record<string, string> = {};

      // Validate files
      /*   for (const { field, label } of requiredFiles) {
        if (!(academicInfo.transcript?.[field] instanceof File)) {
          newErrors[field] = `${label} is required`;
        }
      } */

      // Validate grades
      if (!academicInfo.transcript?.english_grade) {
        newErrors.english_grade = "English grade is required";
      }
      if (!academicInfo.transcript?.maths_grade) {
        newErrors.maths_grade = "Mathematics grade is required";
      }

      // If there are any errors, display them and stop submission
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        console.log("Validation errors:", newErrors); // Debug log
        toast.error("Please fill in all required fields");
        return;
      }

      // If validation passes, proceed to next step
      //console.log("Form validation passed, proceeding to next step"); // Debug log
      nextStep();
    } catch (error) {
      console.error("Error in form submission:", error);
      toast.error("An error occurred while submitting the form");
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fileKey: keyof FileUploadState
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Validate PDF for files
      if (file.type !== "application/pdf") {
        toast.error("Please upload PDF files only");
        return;
      }

      // Update local state
      setFiles((prev) => ({
        ...prev,
        [fileKey]: file,
      }));

      // Map file keys to transcript fields
      const fileKeyToTranscriptField: Record<string, string> = {
        grade9File: "grade_9_file_path",
        grade10File: "grade_10_file_path",
        grade11File: "grade_11_file_path",
        grade12File: "grade_12_file_path",
        examFile: "exam_file_path",
      };

      // Update academicInfo based on file type
      if (fileKey === "pastSecondaryFile") {
        // Get the current entry ID from the file input's data attribute
        const entryId = e.target.getAttribute("data-entry-id");
        if (!entryId) return;

        // Update only the specific entry's file in pastSchools
        const updatedPastSchools = postSecondaryEntries.map((entry) => ({
          past_secondary_id: parseInt(entry.id),
          file_paths:
            entry.id === entryId
              ? file
              : academicInfo.pastSchools.find(
                  (school) => school.past_secondary_id === parseInt(entry.id)
                )?.file_paths,
        }));

        setAcademicInfo({
          ...academicInfo,
          pastSchools: updatedPastSchools,
        });

        // Also update the postSecondaryEntries state to reflect the change
        setPostSecondaryEntries((entries) =>
          entries.map((entry) =>
            entry.id === entryId
              ? {
                  ...entry,
                  files: [file],
                  filePaths: [file.name],
                }
              : entry
          )
        );
      } else if (fileKeyToTranscriptField[fileKey]) {
        // Handle transcript files
        setAcademicInfo({
          ...academicInfo,
          transcript: {
            ...academicInfo.transcript,
            [fileKeyToTranscriptField[fileKey]]: file,
          },
        });
      }

      // Clear any errors for this field
      const errorKey = fileKeyToTranscriptField[fileKey] || fileKey;
      if (errors[errorKey]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[errorKey];
          return newErrors;
        });
      }
    }
  };
  const handleFileUpload = async (field: string, files: FileList) => {
    const paths = await uploadFiles(files);
    setAcademicInfo({
      ...academicInfo,
      transcript: {
        ...academicInfo.transcript,
        [field]: paths.join(","),
      },
    });
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleGradeChange = (field: string, value: string) => {
    const numValue = parseInt(value) || 0;
    setAcademicInfo({
      ...academicInfo,
      transcript: {
        ...academicInfo.transcript,
        [field]: numValue,
      },
    });
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const addPostSecondaryEntry = () => {
    const newEntry: PostSecondaryEntry = {
      id: Date.now().toString(),
      files: [],
      filePaths: [],
    };
    setPostSecondaryEntries([...postSecondaryEntries, newEntry]);
  };

  const removePostSecondaryEntry = (id: string) => {
    if (postSecondaryEntries.length > 1) {
      setPostSecondaryEntries(
        postSecondaryEntries.filter((entry) => entry.id !== id)
      );
    }
  };

  const handlePostSecondaryFileUpload = async (
    entryId: string,
    files: FileList
  ) => {
    const paths = await uploadFiles(files);
    setPostSecondaryEntries((entries) =>
      entries.map((entry) =>
        entry.id === entryId
          ? {
              ...entry,
              files: Array.from(files),
              filePaths: [...entry.filePaths, ...paths],
            }
          : entry
      )
    );
  };

  const removeFile = (entryId: string, fileIndex: number) => {
    setPostSecondaryEntries((entries) =>
      entries.map((entry) =>
        entry.id === entryId
          ? {
              ...entry,
              files: entry.files.filter((_, index) => index !== fileIndex),
              filePaths: entry.filePaths.filter(
                (_, index) => index !== fileIndex
              ),
            }
          : entry
      )
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Card className="shadow-sm border border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
            Academic Background
          </CardTitle>
          <p className="text-gray-600">
            Please provide your academic history and transcripts.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Secondary School Transcripts */}
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Secondary School Transcripts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Grade File Uploads */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[9, 10, 11, 12].map((grade) => {
                    const fileKey =
                      `grade${grade}File` as keyof FileUploadState;
                    return (
                      <div key={grade} className="space-y-3">
                        <Label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                          <Upload className="h-4 w-4 text-gray-500" />
                          Grade {grade} Transcript{" "}
                          <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                          <Input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => handleFileChange(e, fileKey)}
                            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                          />
                        </div>
                        {errors[`grade_${grade}_file_path`] && (
                          <p className="text-red-500 text-sm flex items-center gap-1">
                            <X className="h-3 w-3" />
                            {errors[`grade_${grade}_file_path`]}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Exam File Upload */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    <Upload className="h-4 w-4 text-gray-500" />
                    National Exam Results{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileChange(e, "examFile")}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {errors.exam_file_path && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <X className="h-3 w-3" />
                      {errors.exam_file_path}
                    </p>
                  )}
                </div>

                {/* Grades */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-gray-700">
                      English Grade <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="number"
                      value={academicInfo.transcript?.english_grade || ""}
                      onChange={(e) =>
                        handleGradeChange("english_grade", e.target.value)
                      }
                      className="focus:ring-2 focus:ring-blue-500"
                      min="0"
                      max="100"
                      placeholder="Enter grade (0-100)"
                    />
                    {errors.english_grade && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <X className="h-3 w-3" />
                        {errors.english_grade}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-gray-700">
                      Mathematics Grade <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="number"
                      value={academicInfo.transcript?.maths_grade || ""}
                      onChange={(e) =>
                        handleGradeChange("maths_grade", e.target.value)
                      }
                      className="focus:ring-2 focus:ring-blue-500"
                      min="0"
                      max="100"
                      placeholder="Enter grade (0-100)"
                    />
                    {errors.maths_grade && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <X className="h-3 w-3" />
                        {errors.maths_grade}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Post-Secondary Education Section */}
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-green-600" />
                  Post-Secondary Education
                </CardTitle>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addPostSecondaryEntry}
                  className="flex items-center gap-2 text-green-700 border-green-300 hover:bg-green-100"
                >
                  <Plus className="h-4 w-4" />
                  Add Entry
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {postSecondaryEntries.map((entry, index) => (
                  <Card
                    key={entry.id}
                    className="bg-white border border-green-200"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-800">
                          Entry {index + 1}
                        </h4>
                        {postSecondaryEntries.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removePostSecondaryEntry(entry.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <Label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                          <Upload className="h-4 w-4 text-gray-500" />
                          Additional Transcripts (PDF/DOC)
                        </Label>
                        <Input
                          type="file"
                          multiple
                          accept=".pdf,.doc,.docx"
                          data-entry-id={entry.id}
                          onChange={(e) =>
                            handleFileChange(e, "pastSecondaryFile")
                          }
                          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                        />
                      </div>

                      {/* Uploaded Files Display */}
                      {entry.filePaths.length > 0 && (
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-700">
                            Uploaded Files:
                          </Label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {entry.filePaths.map((path, fileIdx) => (
                              <div
                                key={fileIdx}
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
                              >
                                <div className="flex items-center gap-2">
                                  <FileText className="h-4 w-4 text-gray-500" />
                                  <span className="text-sm text-gray-700 truncate">
                                    {path.split("/").pop()}
                                  </span>
                                </div>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeFile(entry.id, fileIdx)}
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50 p-1"
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-6 border-t border-gray-200">
              <Button
                type="button"
                onClick={prevStep}
                variant="outline"
                className="px-8 py-3"
              >
                ← Previous
              </Button>
              <div className="text-sm text-gray-600">
                Step 3 of 5: Academic Background
              </div>
              <Button type="submit" className="px-8 py-3">
                Next Step →
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

// Example file upload utility function
async function uploadFiles(files: FileList): Promise<string[]> {
  const paths = [];
  // Implement actual file upload logic here
  for (let i = 0; i < files.length; i++) {
    // Simulate file upload
    paths.push(`/storage/uploads/${Date.now()}-${files[i].name}`);
  }
  return paths;
}
