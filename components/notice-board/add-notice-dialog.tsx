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
import { useEffect, useState } from "react";
//import { useAddNotice } from "@/lib/react-query/mutations/useAddNotice";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getLocalStorage } from "@/utils/localStorage";
import { useAddRegNotice } from "@/lib/react-query/mutations/useAddRegNotice";

interface College {
  id: number;
  name: string;
}
interface Department {
  id: number;
  name: string;
  college_id: number;
}

interface AddNoticeProps {
  isOpen?: boolean;
  onClose?: () => void;
  colleges: College[];
  departments: Department[]; // Not used since we fetch departments dynamically
  onNoticeAdded: () => void;
  onCancel?: () => void;
  isDialog?: boolean;
}

interface NoticeFormData {
  title: string;
  college_id: string;
  //department_id?: string;
  //registrar_id?: string;
  message: string;
  deadline: string;
  is_active: boolean;
}

export function AddNoticeForm({
  colleges,
  departments: initialDepartments,
  onNoticeAdded,
  onCancel,
  onClose,
  isDialog = false,
}: AddNoticeProps) {
  const [formData, setFormData] = useState<NoticeFormData>({
    title: "",
    college_id: "",
    //department_id?: "",    
    //registrar_id: "",
    message: "",
    deadline: "",
    is_active: true,
  });
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isDeptLoading, setIsDeptLoading] = useState(false);

  // Fetch departments when college_id changes
 /*  useEffect(() => {
    if (!formData.college_id) {
      setDepartments([]);
      setFormData((prev) => ({ ...prev, department_id: "" }));
      return;
    }
    setIsDeptLoading(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/departments?collegeId=${formData.college_id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch departments');
        return res.json();
      })
      .then((data) => {
        setDepartments(data);
        setFormData((prev) => ({ ...prev, department_id: "" }));
      })
      .catch((e) => {
        console.error("Error fetching departments:", e);
        toast.error("Failed to load departments.");
        setDepartments([]);
      })
      .finally(() => setIsDeptLoading(false));
  }, [formData.college_id]); */

  //const { mutate, isPending } = useAddNotice();
  const { mutate: mutateReg, isPending: isPendingReg } = useAddRegNotice();
  const filteredDepartments = departments; // Already filtered by college_id in API

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const authorId =  Number(getLocalStorage("userId"));
   /*  const payload = {
      title: formData.title,
      //departmentId: Number(formData.department_id),
      //collegeId: Number(formData.college_id),
      message: formData.message,
      deadline: new Date(formData.deadline).toISOString(),
      is_active: formData.is_active,
      authorId,
    } */;
    const payloadreg = {
      title: formData.title,
      //collegeId: Number(formData.college_id),
      message: formData.message,
      deadline: new Date(formData.deadline).toISOString(),
      is_active: formData.is_active,
      authorId,
    };

    if (getLocalStorage("userType") === "Registrar") {
    mutateReg(payloadreg, {
      onSuccess: () => {
       /*  toast.success("Notice added successfully!"); */
        setFormData({
          title: "",
          college_id: "",
          //registrar_id: getLocalStorage("registrarId") || "",
          message: "",
          deadline: "",
          is_active: true,
        });
        onNoticeAdded();
        if (isDialog && onClose) {
          onClose();
        }
      },
      onError: () => {
        toast.error("Failed to add notice. Please try again.");
      },
    })
    } 
  };

  const formContent = (
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
            {colleges.length === 0 && (
              <SelectItem disabled value="no-colleges">
                No colleges available
              </SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>

   {/*  { getLocalStorage("userType") === "registrar" && <div className="space-y-3">
        <Label htmlFor="department">
          Department <span className="text-red-500">*</span>
        </Label>
        <Select
          value={formData.department_id}
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, department_id: value }))
          }
          required
          disabled={isDeptLoading || !formData.college_id}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={isDeptLoading ? "Loading departments..." : "Select a department"} />
          </SelectTrigger>
          <SelectContent>
            {filteredDepartments.map((department) => (
              <SelectItem key={department.id} value={department.id.toString()}>
                {department.name}
              </SelectItem>
            ))}
            {filteredDepartments.length === 0 && !isDeptLoading && (
              <SelectItem disabled value="no-departments">
                No departments available for selected college
              </SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>} */}

      <div className="space-y-3">
        <Label htmlFor="message">
          Notice Title <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="message"
          placeholder="Enter the notice title..."
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
          required
          rows={1}
          className="min-h-[40px]"
        />
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
          onClick={onCancel || onClose}
          className="min-w-[100px]"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isPendingReg}
          className="min-w-[100px] bg-blue-600 hover:bg-blue-700"
        >
          {isPendingReg ? "Adding..." : "Add Notice"}
        </Button>
      </div>
    </form>
  );

  if (isDialog) {
    return (
      <Dialog open={!!onClose} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Notice</DialogTitle>
          </DialogHeader>
          {formContent}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-[60%] mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Add New Notice</h2>
        <p className="text-sm text-gray-500 mt-1">
          Fill in the details below to create a new notice
        </p>
      </div>
      {formContent}
    </div>
  );
}