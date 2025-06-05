import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ModuleInfoFormProps {
  moduleInfo: {
    academicYear: string;
    department: string;
    sector: string;
    module: string;
    moduleCode: string;
    program: string;
  };
  onInfoChange: (field: string, value: string) => void;
}

export const ModuleInfoForm: React.FC<ModuleInfoFormProps> = ({ moduleInfo, onInfoChange }) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Module Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="academicYear">Academic Year</Label>
            <Input
              id="academicYear"
              value={moduleInfo.academicYear}
              onChange={(e) => onInfoChange('academicYear', e.target.value)}
              placeholder="2023/24"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Input
              id="department"
              value={moduleInfo.department}
              onChange={(e) => onInfoChange('department', e.target.value)}
              placeholder="Computer Science"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="sector">Sector</Label>
            <Select value={moduleInfo.sector} onValueChange={(value) => onInfoChange('sector', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select sector" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="regular">Regular</SelectItem>
                <SelectItem value="extension">Extension</SelectItem>
                <SelectItem value="weekend">Weekend</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="module">Module</Label>
            <Input
              id="module"
              value={moduleInfo.module}
              onChange={(e) => onInfoChange('module', e.target.value)}
              placeholder="Database Systems"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="moduleCode">Module Code</Label>
            <Input
              id="moduleCode"
              value={moduleInfo.moduleCode}
              onChange={(e) => onInfoChange('moduleCode', e.target.value)}
              placeholder="CS301"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="program">Program</Label>
            <Input
              id="program"
              value={moduleInfo.program}
              onChange={(e) => onInfoChange('program', e.target.value)}
              placeholder="Bachelor of Science"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};