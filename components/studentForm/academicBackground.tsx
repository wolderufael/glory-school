"use client";

import { useStudentFormStore } from "@/lib/store/studentFormStore";
import {
  TranscriptSchema,
  PastSecondarySchoolSchema,
} from "@/utils/typeSchema";
import { useState } from "react";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Upload, FileText, X } from "lucide-react";

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
  >([{ id: "1", files: [], filePaths: [] }]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Initialize transcript if not exists
      const transcript = academicInfo.transcript || {
        student_id: "",
        grade_9_file_path: "",
        grade_10_file_path: "",
        grade_11_file_path: "",
        grade_12_file_path: "",
        exam_file_path: "",
        english_grade: 0,
        maths_grade: 0,
      };

      // Validate transcripts
      const validatedTranscripts = TranscriptSchema.parse(transcript);

      // Validate past schools
      const pastSchools = postSecondaryEntries.map((entry) => ({
        student_id: "",
        file_paths: entry.filePaths.join(","),
      }));
      const validatedPastSchools =
        PastSecondarySchoolSchema.array().parse(pastSchools);

      setAcademicInfo({
        transcript: validatedTranscripts,
        pastSchools: validatedPastSchools,
      });
      nextStep();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          const path = err.path.join(".");
          newErrors[path] = err.message;
        });
        setErrors(newErrors);
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
                  {[9, 10, 11, 12].map((grade) => (
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
                          onChange={(e) =>
                            e.target.files &&
                            handleFileUpload(
                              `grade_${grade}_file_path`,
                              e.target.files
                            )
                          }
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
                  ))}
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
                    onChange={(e) =>
                      e.target.files &&
                      handleFileUpload("exam_file_path", e.target.files)
                    }
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
                          onChange={(e) =>
                            e.target.files &&
                            handlePostSecondaryFileUpload(
                              entry.id,
                              e.target.files
                            )
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
