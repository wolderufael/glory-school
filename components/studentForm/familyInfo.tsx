"use client";

import { useStudentFormStore } from "@/lib/store/studentFormStore";
import { ParentInfoType } from "@/utils/typeSchema";
import { useState, useEffect } from "react";
import { z } from "zod";
import { parentInfo } from "@/utils/typeSchema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { User, Phone, MapPin, GraduationCap, Briefcase } from "lucide-react";

interface FamilyInfoFormProps {
  nextStep: () => void;
  prevStep: () => void;
}

export default function FamilyInfoForm({
  nextStep,
  prevStep,
}: FamilyInfoFormProps) {
  const { familyInfo, setFamilyInfo } = useStudentFormStore();
  const [errors, setErrors] = useState<{
    father: { [key: string]: string };
    mother: { [key: string]: string };
  }>({
    father: {},
    mother: {},
  });

  // Initialize with father and mother if not already present
  useEffect(() => {
    if (!Array.isArray(familyInfo) || familyInfo.length === 0) {
      const initialFamilyInfo: ParentInfoType[] = [
        {
          id: crypto.randomUUID(),
          student_id: "",
          parent_type: "FATHER",
          full_name: "",
          occupation: "",
          education_level: "",
          address_house_no: "",
          address_kebele: "",
          address_woreda: "",
          address_zone: "",
          address_region: "",
          phone: "",
          po_box: "",
        },
        {
          id: crypto.randomUUID(),
          student_id: "",
          parent_type: "MOTHER",
          full_name: "",
          occupation: "",
          education_level: "",
          address_house_no: "",
          address_kebele: "",
          address_woreda: "",
          address_zone: "",
          address_region: "",
          phone: "",
          po_box: "",
        },
      ];
      setFamilyInfo(initialFamilyInfo);
    }
  }, [familyInfo, setFamilyInfo]);

  const handleChange = (
    parentType: "FATHER" | "MOTHER",
    field: string,
    value: string
  ) => {
    const updated = [...(Array.isArray(familyInfo) ? familyInfo : [])];
    const index = updated.findIndex(
      (parent) => parent.parent_type === parentType
    );

    if (index !== -1) {
      updated[index] = { ...updated[index], [field]: value };
      setFamilyInfo(updated);
    }

    // Clear error for this field
    if (errors[parentType.toLowerCase() as "father" | "mother"][field]) {
      setErrors((prev) => ({
        ...prev,
        [parentType.toLowerCase()]: {
          ...prev[parentType.toLowerCase() as "father" | "mother"],
          [field]: "",
        },
      }));
    }
  };

  const validateAndProceed = () => {
    try {
      const validated = (Array.isArray(familyInfo) ? familyInfo : []).map(
        (info) => parentInfo.parse(info)
      );
      setFamilyInfo(validated);
      nextStep();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: {
          father: Record<string, string>;
          mother: Record<string, string>;
        } = { father: {}, mother: {} };
        error.errors.forEach((err) => {
          const index = Number(err.path[0]);
          const field = err.path[1] as string;
          const parentType = (Array.isArray(familyInfo) ? familyInfo : [])[
            index
          ]?.parent_type;
          if (parentType === "FATHER") {
            newErrors.father[field] = err.message;
          } else if (parentType === "MOTHER") {
            newErrors.mother[field] = err.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  const getFamilyMember = (type: "FATHER" | "MOTHER") => {
    return (
      (Array.isArray(familyInfo) ? familyInfo : []).find(
        (parent) => parent.parent_type === type
      ) || {
        id: "",
        student_id: "",
        parent_type: type,
        full_name: "",
        occupation: "",
        education_level: "",
        address_house_no: "",
        address_kebele: "",
        address_woreda: "",
        address_zone: "",
        address_region: "",
        phone: "",
        po_box: "",
      }
    );
  };

  const renderParentSection = (
    parentType: "FATHER" | "MOTHER",
    icon: React.ReactNode,
    title: string,
    bgColor: string
  ) => {
    const parent = getFamilyMember(parentType);
    const errorObj = errors[parentType.toLowerCase() as "father" | "mother"];

    return (
      <Card className="overflow-hidden">
        <CardHeader className={`${bgColor} text-white`}>
          <CardTitle className="flex items-center gap-3">
            {icon}
            <span>{title} Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-700 font-medium">
              <User className="w-4 h-4" />
              <span>Basic Information</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6">
              <div className="space-y-2">
                <Label>
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  value={parent.full_name}
                  onChange={(e) =>
                    handleChange(parentType, "full_name", e.target.value)
                  }
                  placeholder={`Enter ${title.toLowerCase()}'s full name`}
                  className={errorObj.full_name ? "border-red-500" : ""}
                />
                {errorObj.full_name && (
                  <p className="text-red-500 text-sm">{errorObj.full_name}</p>
                )}
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-700 font-medium">
              <Briefcase className="w-4 h-4" />
              <span>Professional Information</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6">
              <div className="space-y-2">
                <Label>Occupation</Label>
                <Input
                  value={parent.occupation}
                  onChange={(e) =>
                    handleChange(parentType, "occupation", e.target.value)
                  }
                  placeholder="Enter occupation"
                />
              </div>
              <div className="space-y-2">
                <Label>Education Level</Label>
                <select
                  value={parent.education_level}
                  onChange={(e) =>
                    handleChange(parentType, "education_level", e.target.value)
                  }
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select education level</option>
                  <option value="Elementary">Elementary</option>
                  <option value="High School">High School</option>
                  <option value="Diploma">Diploma</option>
                  <option value="Bachelor's Degree">Bachelor's Degree</option>
                  <option value="Master's Degree">Master's Degree</option>
                  <option value="PhD">PhD</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-700 font-medium">
              <Phone className="w-4 h-4" />
              <span>Contact Information</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6">
              <div className="space-y-2">
                <Label>
                  Phone Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="tel"
                  value={parent.phone}
                  onChange={(e) =>
                    handleChange(parentType, "phone", e.target.value)
                  }
                  placeholder="Enter phone number"
                />
              </div>
              <div className="space-y-2">
                <Label>P.O. Box</Label>
                <Input
                  value={parent.po_box}
                  onChange={(e) =>
                    handleChange(parentType, "po_box", e.target.value)
                  }
                  placeholder="Enter P.O. Box"
                />
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-700 font-medium">
              <MapPin className="w-4 h-4" />
              <span>Address Information</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pl-6">
              <div className="space-y-2">
                <Label>House Number</Label>
                <Input
                  value={parent.address_house_no}
                  onChange={(e) =>
                    handleChange(parentType, "address_house_no", e.target.value)
                  }
                  placeholder="House No."
                />
              </div>
              <div className="space-y-2">
                <Label>Kebele</Label>
                <Input
                  value={parent.address_kebele}
                  onChange={(e) =>
                    handleChange(parentType, "address_kebele", e.target.value)
                  }
                  placeholder="Kebele"
                />
              </div>
              <div className="space-y-2">
                <Label>Woreda</Label>
                <Input
                  value={parent.address_woreda}
                  onChange={(e) =>
                    handleChange(parentType, "address_woreda", e.target.value)
                  }
                  placeholder="Woreda"
                />
              </div>
              <div className="space-y-2">
                <Label>Zone</Label>
                <Input
                  value={parent.address_zone}
                  onChange={(e) =>
                    handleChange(parentType, "address_zone", e.target.value)
                  }
                  placeholder="Zone"
                />
              </div>
              <div className="space-y-2">
                <Label>Region</Label>
                <Input
                  value={parent.address_region}
                  onChange={(e) =>
                    handleChange(parentType, "address_region", e.target.value)
                  }
                  placeholder="Region"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Family Information
        </h2>
        <p className="text-gray-600">
          Please provide information about your parents.
        </p>
      </div>

      <div className="space-y-8">
        {/* Father Section */}
        {renderParentSection(
          "FATHER",
          <User className="w-5 h-5" />,
          "Father",
          "bg-blue-600"
        )}

        {/* Mother Section */}
        {renderParentSection(
          "MOTHER",
          <User className="w-5 h-5" />,
          "Mother",
          "bg-pink-600"
        )}
      </div>

      <div className="flex justify-between items-center pt-6 border-t border-gray-200 mt-8">
        <Button
          type="button"
          onClick={prevStep}
          variant="outline"
          className="px-8 py-3"
        >
          ← Previous
        </Button>
        <div className="text-sm text-gray-600">
          Step 4 of 5: Family Information
        </div>
        <Button
          type="button"
          onClick={validateAndProceed}
          className="px-8 py-3"
        >
          Next Step →
        </Button>
      </div>
    </div>
  );
}
