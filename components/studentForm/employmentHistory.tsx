"use client";

import { useStudentFormStore } from "@/lib/store/studentFormStore";
import { EmploymentHistory } from "@/utils/typeSchema";
import { useState } from "react";
import { z } from "zod";

export default function EmploymentHistoryForm({
  nextStep,
  prevStep,
  isLastStep = false,
}: {
  nextStep: () => void;
  prevStep: () => void;
  isLastStep?: boolean;
}) {
  const { employmentHistory, setEmploymentHistory } = useStudentFormStore();
  const [errors, setErrors] = useState<Record<number, Record<string, string>>>(
    {}
  );

  const addEmployment = () => {
    setEmploymentHistory([
      ...employmentHistory,
      {
        student_id: "2", // Replace with dynamic ID if available
        created_at: new Date(),
        is_current: "No",
        type_of_job: "",
        employer: "",
        mailing_address: "",
        telephone: "",
        service_years_from: undefined,
        service_years_to: undefined,
      },
    ]);
  };

  const removeEmployment = (index: number) => {
    const updated = employmentHistory.filter((_, i) => i !== index);
    setEmploymentHistory(updated);
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[index];
      return newErrors;
    });
  };

  const handleChange = (
    index: number,
    field: string,
    value: string | number | boolean | undefined
  ) => {
    const updated = [...employmentHistory];
    updated[index] = { ...updated[index], [field]: value };
    setEmploymentHistory(updated);

    if (errors[index]?.[field]) {
      setErrors((prev) => ({
        ...prev,
        [index]: { ...prev[index], [field]: "" },
      }));
    }
  };

  const validateAndProceed = async () => {
    try {
      // Validate all entries if any exist
      if (employmentHistory.length > 0) {
        const validatedData = await Promise.all(
          employmentHistory.map((entry) => EmploymentHistory.parseAsync(entry))
        );
        setEmploymentHistory(validatedData);
      }

      // Proceed to next step
      if (isLastStep) {
        await nextStep(); // If nextStep is async
      } else {
        nextStep();
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<number, Record<string, string>> = {};
        error.errors.forEach((err) => {
          const index = Number(err.path[0]);
          newErrors[index] = {
            ...newErrors[index],
            [err.path[1]]: err.message,
          };
        });
        setErrors(newErrors);
      }
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          Academic History
        </h2>
        <button
          type="button"
          onClick={addEmployment}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          Add Employment +
        </button>
      </div>

      {employmentHistory.map((entry, index) => (
        <div
          key={index}
          className="bg-gray-50 p-6 rounded-lg space-y-6 relative group"
        >
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={() => removeEmployment(index)}
              className="text-red-600 hover:text-red-700 text-sm"
            >
              Remove Entry
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Employment Status */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Current Employment? *
              </label>
              <select
                value={entry.is_current}
                onChange={(e) =>
                  handleChange(index, "is_current", e.target.value)
                }
                className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {errors[index]?.is_current && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[index]?.is_current}
                </p>
              )}
            </div>

            {/* Employment Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Start Year *
                </label>
                <input
                  type="number"
                  min="1900"
                  max={currentYear}
                  value={entry.service_years_from || ""}
                  onChange={(e) =>
                    handleChange(
                      index,
                      "service_years_from",
                      e.target.value ? parseInt(e.target.value) : undefined
                    )
                  }
                  className="w-full p-2.5 border rounded-md"
                  placeholder="YYYY"
                />
                {errors[index]?.service_years_from && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors[index]?.service_years_from}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  End Year
                </label>
                <input
                  type="number"
                  min="1900"
                  max={currentYear + 5}
                  value={entry.service_years_to || ""}
                  onChange={(e) =>
                    handleChange(
                      index,
                      "service_years_to",
                      e.target.value ? parseInt(e.target.value) : undefined
                    )
                  }
                  className="w-full p-2.5 border rounded-md"
                  placeholder="YYYY"
                  disabled={entry.is_current === "Yes"}
                />
                {errors[index]?.service_years_to && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors[index]?.service_years_to}
                  </p>
                )}
              </div>
            </div>

            {/* Employer Details */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Employer Name
              </label>
              <input
                type="text"
                value={entry.employer}
                onChange={(e) =>
                  handleChange(index, "employer", e.target.value)
                }
                className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              {errors[index]?.employer && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[index]?.employer}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Job Title
              </label>
              <input
                type="text"
                value={entry.type_of_job}
                onChange={(e) =>
                  handleChange(index, "type_of_job", e.target.value)
                }
                className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              {errors[index]?.type_of_job && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[index]?.type_of_job}
                </p>
              )}
            </div>

            {/* Contact Information */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Mailing Address
              </label>
              <input
                type="text"
                value={entry.mailing_address}
                onChange={(e) =>
                  handleChange(index, "mailing_address", e.target.value)
                }
                className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Contact Number
              </label>
              <input
                type="tel"
                value={entry.telephone}
                onChange={(e) =>
                  handleChange(index, "telephone", e.target.value)
                }
                className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              {errors[index]?.telephone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[index]?.telephone}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={prevStep}
          className="px-6 py-2.5 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={validateAndProceed}
          className="px-6 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          {isLastStep ? "Complete Registration →" : "Next →"}
        </button>
      </div>
    </div>
  );
}
