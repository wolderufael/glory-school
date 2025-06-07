import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ModuleInfoFormProps {
  moduleInfo: {
    teacherId: string;
    academicYearId: string;
    semesterId: string;
    level: string;
    departmentId: string;
    sectionId: string;
    moduleId: string;
    teachingAssignmentId: number;
  };
  onInfoChange: (field: string, value: string) => void;
}

export const ModuleInfoForm: React.FC<ModuleInfoFormProps> = ({
  moduleInfo,
  onInfoChange,
}) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Module Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
{/*           <div className="space-y-2">
            <Label htmlFor="teacherId">Teacher ID</Label>
            <Input
              id="teacherId"
              value={moduleInfo.teacherId}
              onChange={(e) => onInfoChange("teacherId", e.target.value)}
              placeholder="Enter teacher ID"
            />
          </div> */}

          <div className="space-y-2">
            <Label htmlFor="academicYearId">Academic Year</Label>
            <Input
              id="academicYearId"
              value={moduleInfo.academicYearId}
              onChange={(e) => onInfoChange("academicYearId", e.target.value)}
              placeholder="Enter academic year ID"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="semesterId">Semester</Label>
            <Input
              id="semesterId"
              value={moduleInfo.semesterId}
              onChange={(e) => onInfoChange("semesterId", e.target.value)}
              placeholder="Select Semester"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="level">Level</Label>
            <Input
              id="level"
              value={moduleInfo.level}
              onChange={(e) => onInfoChange("level", e.target.value)}
              placeholder="Select Level"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="departmentId">Department</Label>
            <Input
              id="departmentId"
              value={moduleInfo.departmentId}
              onChange={(e) => onInfoChange("departmentId", e.target.value)}
              placeholder="Select Department"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sectionId">Section</Label>
            <Input
              id="sectionId"
              value={moduleInfo.sectionId}
              onChange={(e) => onInfoChange("sectionId", e.target.value)}
              placeholder="Select Section"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="moduleId">Module Name</Label>
            <Input
              id="moduleId"
              value={moduleInfo.moduleId}
              onChange={(e) => onInfoChange("moduleId", e.target.value)}
              placeholder="Select Module "
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
