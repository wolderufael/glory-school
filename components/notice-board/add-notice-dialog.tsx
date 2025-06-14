"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useState } from "react";
import { useAddNotice } from "@/lib/react-query/mutations/useAddNotice";
import { form } from "framer-motion/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface College {
  id: number;
  name: string;
}
interface Department {
  id: number;
  name: string;
  college_id: number;
}

interface AddNoticeCardProps {
  colleges: College[];
  departments: Department[];
  onNoticeAdded: () => void;
  onCancel: () => void;
}

interface AddNoticeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onNoticeAdded: () => void;
}

interface FormData {
  collegeId: string;
  departmentId: string;
  message: string;
  deadline: string;
  authorId: number;
}

export function AddNoticeCard({
  colleges,
  departments,
  onNoticeAdded,
  onCancel,
}: AddNoticeCardProps) {
  //const { user } = useAuth();

  const [formData, setFormData] = useState({
    college_id: "",
    department_id: "",
    message: "",
    deadline: "",
    is_active: true,
  });

  const { mutate, isPending, error } = useAddNotice();

  const filteredDepartments = formData.college_id
    ? departments.filter(
        (dept) => dept.college_id.toString() === formData.college_id
      )
    : [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      collegeId: Number(formData.college_id),
      departmentId: Number(formData.department_id),
      authorId: 1,
      deadline: new Date(formData.deadline).toISOString(),
    };

    mutate(payload, {
      onSuccess: () => {
        setFormData({
          college_id: "",
          department_id: "",
          message: "",
          deadline: "",
          is_active: true,
        }),
          onNoticeAdded();
      },
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-[60%] mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Add New Notice</h2>
        <p className="text-sm text-gray-500 mt-1">
          Fill in the details below to create a new notice
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="college">
            College <span className="text-red-500">*</span>
          </Label>
          <Select
            value={formData.college_id}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, college_id: value }))
            }
            required
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a college" />
            </SelectTrigger>
            <SelectContent>
              {colleges.map((college) => (
                <SelectItem key={college.id} value={college.id.toString()}>
                  {college.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-3">
          <Label htmlFor="department">
            Department <span className="text-red-500">*</span>
          </Label>
          <Select
            value={formData.department_id}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, department_id: value }))
            }
            required
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a department" />
            </SelectTrigger>
            <SelectContent>
              {filteredDepartments.map((department) => (
                <SelectItem
                  key={department.id}
                  value={department.id.toString()}
                >
                  {department.name}
                </SelectItem>
              ))}
              {filteredDepartments.length === 0 && (
                <SelectItem disabled value="no-departments">
                  No departments available for selected college
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label htmlFor="message">
            Notice Message <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="message"
            placeholder="Enter the notice content..."
            value={formData.message}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, message: e.target.value }))
            }
            required
            rows={5}
            className="min-h-[120px]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label htmlFor="deadline">
              Deadline <span className="text-red-500">*</span>
            </Label>
            <Input
              id="deadline"
              type="date"
              value={formData.deadline}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, deadline: e.target.value }))
              }
              required
            />
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center h-10">
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, is_active: checked }))
                }
              />
            </div>
            <div>
              <Label htmlFor="is_active" className="block mb-1">
                Notice Status
              </Label>
              <p className="text-sm text-gray-500">
                {formData.is_active ? "Active" : "Inactive"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="min-w-[100px]"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isPending}
            className="min-w-[100px] bg-blue-600 hover:bg-blue-700"
          >
            {isPending ? "Adding..." : "Add Notice"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export function AddNoticeDialog({
  isOpen,
  onClose,
  onNoticeAdded,
}: AddNoticeDialogProps) {
  const [formData, setFormData] = useState<FormData>({
    collegeId: "",
    departmentId: "",
    message: "",
    deadline: "",
    authorId: 1, // Default author ID, adjust as needed
  });

  const { mutate } = useAddNotice();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      collegeId: parseInt(formData.collegeId),
      departmentId: parseInt(formData.departmentId),
      message: formData.message,
      deadline: new Date(formData.deadline).toISOString(),
      authorId: formData.authorId,
    };

    mutate(payload, {
      onSuccess: () => {
        setFormData({
          collegeId: "",
          departmentId: "",
          message: "",
          deadline: "",
          authorId: 1,
        });
        onNoticeAdded();
        onClose();
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Notice</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Select
              value={formData.collegeId}
              onValueChange={(value) =>
                setFormData({ ...formData, collegeId: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select College" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Engineering College</SelectItem>
                <SelectItem value="2">Medical College</SelectItem>
                <SelectItem value="3">Arts College</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select
              value={formData.departmentId}
              onValueChange={(value) =>
                setFormData({ ...formData, departmentId: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Computer Science</SelectItem>
                <SelectItem value="2">Electrical Engineering</SelectItem>
                <SelectItem value="3">Mechanical Engineering</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Textarea
              placeholder="Notice message"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
            />
          </div>
          <div>
            <Input
              type="datetime-local"
              value={formData.deadline}
              onChange={(e) =>
                setFormData({ ...formData, deadline: e.target.value })
              }
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Notice</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
