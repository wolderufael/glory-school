import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Student, User } from "@/types/types";

const updateStudent = async (
  studentId: number,
  field: string,
  value: string
): Promise<Student> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/students/${studentId}`,
    {
      method: "PUT",
      body: JSON.stringify({ [field]: value }),
    }
  );
  return response.json();
};

const updateUser = async (
  userId: number,
  field: string,
  value: string
): Promise<User> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/users/${userId}`,
    {
      method: "PUT",
      body: JSON.stringify({ [field]: value }),
    }
  );
  return response.json();
};

export const useUpdateStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      studentId,
      field,
      value,
    }: {
      studentId: number;
      field: string;
      value: string;
    }): Promise<Student>    => updateStudent(studentId, field, value),
    onSuccess: (data: Student) => {
      queryClient.invalidateQueries({ queryKey: ["student"] });
      toast.success("Student updated successfully");
      },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update student");
    },
  });
};
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      field,
      value,
    }: {
      userId: number;
      field: string;
      value: string;
    }): Promise<User>    => updateUser(userId, field, value),
    onSuccess: (data: User) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("User updated successfully");
      },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update user");
    },
  });
};
