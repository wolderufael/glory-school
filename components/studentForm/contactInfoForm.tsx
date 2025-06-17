"use client";

import { useStudentFormStore } from "@/lib/store/studentFormStore";
import { z } from "zod";
import { useState } from "react";
import { emergencyContact } from "@/utils/typeSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ContactInfoFormProps {
  nextStep: () => void;
  prevStep: () => void;
}

export default function ContactInfoForm({
  nextStep,
  prevStep,
}: ContactInfoFormProps) {
  const { contactInfo, setContactInfo } = useStudentFormStore();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Validate using emergencyContact schema
      const validatedData = emergencyContact.parse({
        ...contactInfo,
        id: contactInfo.id || `EC-${Math.floor(1000 + Math.random() * 9000)}`,
        student_id: contactInfo.student_id || "temp-student-id",
      });

      setContactInfo(validatedData);
      nextStep();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          newErrors[err.path[0] as string] = err.message;
        });
        setErrors(newErrors);
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setContactInfo({ ...contactInfo, [name]: value });
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Helper function to safely get field values
  const getValue = (field: string) => (contactInfo as any)?.[field] || "";

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Emergency Contact Information
          </h2>
          <p className="text-gray-600">
            Please provide emergency contact details for your records.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Primary Contact Details */}
          <div className="bg-gray-50 p-6 rounded-lg space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">
              Primary Contact Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  name="full_name"
                  value={getValue("full_name")}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  className={errors.full_name ? "border-red-500" : ""}
                />
                {errors.full_name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.full_name}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Relationship
                </Label>
                <select
                  name="relationship"
                  value={getValue("relationship")}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="">Select Relationship</option>
                  <option value="Parent">Parent</option>
                  <option value="Guardian">Guardian</option>
                  <option value="Sibling">Sibling</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Relative">Relative</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Contact Numbers */}
          <div className="bg-gray-50 p-6 rounded-lg space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Mobile Phone <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="tel"
                  name="phone_mobile"
                  value={getValue("phone_mobile")}
                  onChange={handleChange}
                  placeholder="+251-9-XX-XX-XX-XX"
                  className={errors.phone_mobile ? "border-red-500" : ""}
                />
                {errors.phone_mobile && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone_mobile}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Home Phone
                </Label>
                <Input
                  type="tel"
                  name="phone_home"
                  value={getValue("phone_home")}
                  onChange={handleChange}
                  placeholder="+251-11-XXX-XXXX"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Office Phone
                </Label>
                <Input
                  type="tel"
                  name="phone_office"
                  value={getValue("phone_office")}
                  onChange={handleChange}
                  placeholder="+251-11-XXX-XXXX"
                />
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="bg-gray-50 p-6 rounded-lg space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">
              Contact Address
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Town/City
                </Label>
                <Input
                  name="address_town"
                  value={getValue("address_town")}
                  onChange={handleChange}
                  placeholder="Enter town or city"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Kebele
                </Label>
                <Input
                  name="address_kebele"
                  value={getValue("address_kebele")}
                  onChange={handleChange}
                  placeholder="Enter kebele"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Woreda
                </Label>
                <Input
                  name="address_woreda"
                  value={getValue("address_woreda")}
                  onChange={handleChange}
                  placeholder="Enter woreda"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Zone
                </Label>
                <Input
                  name="address_zone"
                  value={getValue("address_zone")}
                  onChange={handleChange}
                  placeholder="Enter zone"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Region
                </Label>
                <Input
                  name="address_region"
                  value={getValue("address_region")}
                  onChange={handleChange}
                  placeholder="Enter region"
                />
              </div>
            </div>
          </div>

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
              Step 2 of 5: Contact Information
            </div>
            <Button type="submit" className="px-8 py-3">
              Next Step →
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
