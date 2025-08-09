"use client";

import { StudentData } from "./types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBackendFileUrl } from "@/lib/utils";
import { Download, FileText, GraduationCap, Calendar, Eye } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

// Client-safe check for File instances
const isBrowserFile = (file: unknown): file is File =>
  typeof File !== "undefined" && file instanceof File;

const renderDownloadableFile = (
  file: File | string | null | undefined,
  label: string
) => {
  if (!file) return null;

  const isFile = isBrowserFile(file);
  const filePath = isFile ? file.name : (file as string);

  return (
    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-indigo-100 hover:border-indigo-200 transition-colors max-sm:flex-col max-sm:items-start max-sm:gap-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
          <FileText className="h-5 w-5 text-indigo-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900 max-sm:truncate max-sm:max-w-[200px]">
            {label}
          </p>
          <p className="text-xs text-gray-500 mt-1">{filePath}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 max-sm:w-full max-sm:justify-between">
        <Button
          variant="ghost"
          size="sm"
          className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
          onClick={() => {
            if (isFile) {
              // For File objects, create a temporary URL to view
              const url = URL.createObjectURL(file);
              window.open(url, "_blank");
              // Clean up the URL after a delay
              setTimeout(() => URL.revokeObjectURL(url), 1000);
            } else {
              // For file paths, open the actual file with proper title
              const fileName = filePath.split("/").pop() || "Document";
              const newWindow = window.open("", "_blank");
              if (newWindow) {
                newWindow.document.write(`
                  <!DOCTYPE html>
                  <html>
                    <head>
                      <title>${fileName}</title>
                      <style>
                        body { margin: 0; padding: 0; }
                        iframe { width: 100%; height: 100vh; border: none; }
                      </style>
                    </head>
                    <body>
                      <iframe src="${filePath}" type="application/pdf"></iframe>
                    </body>
                  </html>
                `);
                newWindow.document.close();
              }
            }
          }}
        >
          <Eye className="h-4 w-4" />
          <span className="ml-1">View</span>
        </Button>
        <button
          onClick={() => {
            if (isFile) {
              // For File objects, create a download link
              const url = URL.createObjectURL(file);
              const a = document.createElement("a");
              a.href = url;
              a.download = file.name;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
            } else {
              // For file paths, create a download link
              const a = document.createElement("a");
              a.href = filePath;
              a.download = filePath.split("/").pop() || "download";
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
            }
          }}
          className="p-2 hover:bg-indigo-50 rounded-full transition-colors"
        >
          <Download className="h-5 w-5 text-indigo-600" />
        </button>
      </div>
    </div>
  );
};

export function EducationalBackground({
  studentData,
}: {
  studentData: StudentData;
}) {
  const transcriptFiles = studentData?.transcript;
  const pastSecondaryData = studentData?.pastSecondary;

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6 max-sm:px-4">
      <Card className="border-indigo-100">
        <CardHeader className="space-y-1 bg-gradient-to-r from-blue-600 to-indigo-700 text-white max-sm:p-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-xl max-sm:text-lg">
              Educational Background
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-6 max-sm:p-4">
          <div className="space-y-6">
            {/* Transcripts */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-indigo-600" />
                Secondary School Transcripts
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderDownloadableFile(
                  transcriptFiles?.grade5FilePath,
                  "Grade 9 Transcript"
                )}
                {renderDownloadableFile(
                  transcriptFiles?.grade6FilePath,
                  "Grade 10 Transcript"
                )}
                {renderDownloadableFile(
                  transcriptFiles?.grade7FilePath,
                  "Grade 11 Transcript"
                )}
                {renderDownloadableFile(
                  transcriptFiles?.grade8FilePath,
                  "Grade 12 Transcript"
                )}
                {renderDownloadableFile(
                  transcriptFiles?.examFilePath,
                  "Entrance Exam Results"
                )}
              </div>
            </div>

            <Separator className="my-6" />

            {/* Academic Performance */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Academic Performance
              </h3>
              <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-indigo-100">
                  <p className="text-sm text-gray-600 mb-1">English Grade</p>
                  <p className="text-2xl font-bold text-indigo-700">
                    {transcriptFiles?.englishGrade ?? "N/A"}
                  </p>
                </div>
                <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-indigo-100">
                  <p className="text-sm text-gray-600 mb-1">
                    Mathematics Grade
                  </p>
                  <p className="text-2xl font-bold text-indigo-700">
                    {transcriptFiles?.mathsGrade ?? "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Post-Secondary */}
  {/*           {pastSecondaryData && (
              <>
                <Separator className="my-6" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-indigo-600" />
                    Post-Secondary Education
                  </h3>
                  <div className="bg-white rounded-lg border border-indigo-100 p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="h-4 w-4 text-indigo-600" />
                      <span className="text-sm text-gray-600">
                        Added on {formatDate(pastSecondaryData.createdAt)}
                      </span>
                    </div>
                    <div className="space-y-3">
                      {pastSecondaryData.filePaths
                        ?.split(",")
                        .map((path: string, index: number) => (
                          <div key={`${pastSecondaryData.id}-${index}`}>
                            {renderDownloadableFile(
                              path.trim(),
                              `Post-Secondary Document ${index + 1}`
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </>
            )} */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
