"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Clock, GraduationCap } from "lucide-react";

import { toast } from "sonner";
import {
  AcademicYearFormData,
  academicYearSchema,
} from "@/utils/academicYearSchema";

import { z } from "zod";
import { parseISO, startOfDay, formatISO } from "date-fns";
import { useRouter } from "next/navigation";
import { setLocalStorage } from "@/utils/localStorage";
import ErrorDialog from "./ErrorDialog";

type AcademicYearData = z.infer<typeof academicYearSchema>;

// Professional date formatting utility that handles various edge cases
const formatToPrismaDateTime = (dateStr: string): string => {
  if (!dateStr) return "";
  try {
    // Parse the input date string
    const date = parseISO(dateStr);

    // Set time to start of day (midnight) in UTC
    const normalizedDate = startOfDay(date);

    // Format to ISO string that Prisma expects
    return formatISO(normalizedDate);
  } catch (error) {
    console.error("Date formatting error:", error);
    return "";
  }
};

// Helper function to format all academic year dates
const formatAcademicYearDates = (data: AcademicYearData): AcademicYearData => {
  const dateFields = [
    "startDate",
    "endDate",
    "semester1StartDate",
    "semester1EndDate",
    "semester2StartDate",
    "semester2EndDate",
    "semeester1RegistrationStartDate",
    "semeester1RegistrationEndDate",
    "semeester2RegistrationStartDate",
    "semeester2RegistrationEndDate",
  ] as const;

  return {
    ...data,
    ...Object.fromEntries(
      dateFields.map((field) => [field, formatToPrismaDateTime(data[field])])
    ),
  };
};

const AcademicYearForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<AcademicYearFormData>({
    name: "",
    startDate: "",
    endDate: "",
    semester1StartDate: "",
    semester1EndDate: "",
    semester2StartDate: "",
    semester2EndDate: "",
    semeester1RegistrationStartDate: "",
    semeester1RegistrationEndDate: "",
    semeester2RegistrationStartDate: "",
    semeester2RegistrationEndDate: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorDialog, setErrorDialog] = useState<{
    isOpen: boolean;
    message: string;
  }>({
    isOpen: false,
    message: "",
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleCloseErrorDialog = () => {
    setErrorDialog({
      isOpen: false,
      message: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = academicYearSchema.safeParse(formData);
    if (!parsed.success) {
      const filledErrors: Record<string, string> = {};
      parsed.error.errors.forEach((error) => {
        filledErrors[error.path[0] as string] = error.message;
      });
      setErrors(filledErrors);
      return;
    }

    // Clear previous errors if validation passes
    setErrors({});

    // Set loading state
    setIsLoading(true);

    // Format all dates using the helper function
    const formattedData = formatAcademicYearDates(formData);
    console.log("Submitting data:", JSON.stringify(formattedData, null, 2));

    try {
      // Simulate API call with 2 second delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success message
      toast.success("Academic year created successfully!");
      
      // Reset form
      setFormData({
        name: "",
        startDate: "",
        endDate: "",
        semester1StartDate: "",
        semester1EndDate: "",
        semester2StartDate: "",
        semester2EndDate: "",
        semeester1RegistrationStartDate: "",
        semeester1RegistrationEndDate: "",
        semeester2RegistrationStartDate: "",
        semeester2RegistrationEndDate: "",
      });
      
      // Navigate to registrar page
      router.push("/registrar");
    } catch (error) {
      // This won't happen in our mock, but keeping for consistency
      toast.error("An error occurred while creating the academic year");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-xl">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">
              Create Academic Year
            </CardTitle>
            <CardDescription>
              Set up a new academic year with semester and registration dates
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Basic Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Academic Year Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="e.g., 2024-2025"
                      value={formData.name}
                      onChange={handleChange}
                      className={errors.name ? "border-red-500" : ""}
                      maxLength={20}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm">{errors.name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="startDate" className="text-sm font-medium">
                      Academic Year Start Date{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="startDate"
                      name="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={handleChange}
                      className={errors.startDate ? "border-red-500" : ""}
                    />
                    {errors.startDate && (
                      <p className="text-red-500 text-sm">{errors.startDate}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endDate" className="text-sm font-medium">
                      Academic Year End Date{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="endDate"
                      name="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={handleChange}
                      className={errors.endDate ? "border-red-500" : ""}
                    />
                    {errors.endDate && (
                      <p className="text-red-500 text-sm">{errors.endDate}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Semester 1 Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Semester 1 Dates
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="semester1StartDate"
                      className="text-sm font-medium"
                    >
                      Semester 1 Start Date{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="semester1StartDate"
                      name="semester1StartDate"
                      type="date"
                      value={formData.semester1StartDate}
                      onChange={handleChange}
                      className={
                        errors.semester1StartDate ? "border-red-500" : ""
                      }
                    />
                    {errors.semester1StartDate && (
                      <p className="text-red-500 text-sm">
                        {errors.semester1StartDate}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="semester1EndDate"
                      className="text-sm font-medium"
                    >
                      Semester 1 End Date{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="semester1EndDate"
                      name="semester1EndDate"
                      type="date"
                      value={formData.semester1EndDate}
                      onChange={handleChange}
                      className={
                        errors.semester1EndDate ? "border-red-500" : ""
                      }
                    />
                    {errors.semester1EndDate && (
                      <p className="text-red-500 text-sm">
                        {errors.semester1EndDate}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="semeester1RegistrationStartDate"
                      className="text-sm font-medium"
                    >
                      Semester 1 Registration Start{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="semeester1RegistrationStartDate"
                      name="semeester1RegistrationStartDate"
                      type="date"
                      value={formData.semeester1RegistrationStartDate}
                      onChange={handleChange}
                      className={
                        errors.semeester1RegistrationStartDate
                          ? "border-red-500"
                          : ""
                      }
                    />
                    {errors.semeester1RegistrationStartDate && (
                      <p className="text-red-500 text-sm">
                        {errors.semeester1RegistrationStartDate}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="semeester1RegistrationEndDate"
                      className="text-sm font-medium"
                    >
                      Semester 1 Registration End{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="semeester1RegistrationEndDate"
                      name="semeester1RegistrationEndDate"
                      type="date"
                      value={formData.semeester1RegistrationEndDate}
                      onChange={handleChange}
                      className={
                        errors.semeester1RegistrationEndDate
                          ? "border-red-500"
                          : ""
                      }
                    />
                    {errors.semeester1RegistrationEndDate && (
                      <p className="text-red-500 text-sm">
                        {errors.semeester1RegistrationEndDate}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Semester 2 Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Semester 2 Dates
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="semester2StartDate"
                      className="text-sm font-medium"
                    >
                      Semester 2 Start Date{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="semester2StartDate"
                      name="semester2StartDate"
                      type="date"
                      value={formData.semester2StartDate}
                      onChange={handleChange}
                      className={
                        errors.semester2StartDate ? "border-red-500" : ""
                      }
                    />
                    {errors.semester2StartDate && (
                      <p className="text-red-500 text-sm">
                        {errors.semester2StartDate}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="semester2EndDate"
                      className="text-sm font-medium"
                    >
                      Semester 2 End Date{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="semester2EndDate"
                      name="semester2EndDate"
                      type="date"
                      value={formData.semester2EndDate}
                      onChange={handleChange}
                      className={
                        errors.semester2EndDate ? "border-red-500" : ""
                      }
                    />
                    {errors.semester2EndDate && (
                      <p className="text-red-500 text-sm">
                        {errors.semester2EndDate}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="semeester2RegistrationStartDate"
                      className="text-sm font-medium"
                    >
                      Semester 2 Registration Start{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="semeester2RegistrationStartDate"
                      name="semeester2RegistrationStartDate"
                      type="date"
                      value={formData.semeester2RegistrationStartDate}
                      onChange={handleChange}
                      className={
                        errors.semeester2RegistrationStartDate
                          ? "border-red-500"
                          : ""
                      }
                    />
                    {errors.semeester2RegistrationStartDate && (
                      <p className="text-red-500 text-sm">
                        {errors.semeester2RegistrationStartDate}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="semeester2RegistrationEndDate"
                      className="text-sm font-medium"
                    >
                      Semester 2 Registration End{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="semeester2RegistrationEndDate"
                      name="semeester2RegistrationEndDate"
                      type="date"
                      value={formData.semeester2RegistrationEndDate}
                      onChange={handleChange}
                      className={
                        errors.semeester2RegistrationEndDate
                          ? "border-red-500"
                          : ""
                      }
                    />
                    {errors.semeester2RegistrationEndDate && (
                      <p className="text-red-500 text-sm">
                        {errors.semeester2RegistrationEndDate}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setFormData({
                      name: "",
                      startDate: "",
                      endDate: "",
                      semester1StartDate: "",
                      semester1EndDate: "",
                      semester2StartDate: "",
                      semester2EndDate: "",
                      semeester1RegistrationStartDate: "",
                      semeester1RegistrationEndDate: "",
                      semeester2RegistrationStartDate: "",
                      semeester2RegistrationEndDate: "",
                    });
                    setErrors({});
                  }}
                >
                  Reset
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="min-w-[120px]"
                >
                  {isLoading ? "Creating..." : "Create Academic Year"}
                </Button>
              </div>
            </CardContent>
          </form>
        </Card>
      </div>

      {/* Error Dialog */}
      <ErrorDialog
        isOpen={errorDialog.isOpen}
        onClose={handleCloseErrorDialog}
        title="Academic Year Creation Failed"
        errorMessage={errorDialog.message}
      />
    </div>
  );
};

export default AcademicYearForm;
export { default as ErrorDialog } from "./ErrorDialog";
