"use client";

import { Check, Loader2, User } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Teacher, useTeachers } from "@/lib/react-query/queries/getTeachers";

interface TeacherSelectProps {
  departmentId: string;
  value: string;
  onChange: (value: string, fullName: string) => void;
}

export default function TeacherSelect({
  departmentId,
  value,
  onChange,
}: TeacherSelectProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedTeacher, setSelectedTeacher] = React.useState<Teacher | null>(
    null
  );

  const {
    data: allTeachers = [],
    isLoading,
    error,
  } = useTeachers({ departmentId });

  // Effect to find and set selected teacher when value changes
  React.useEffect(() => {
    const teacher = allTeachers.find((t: Teacher) => t.id.toString() === value);
    setSelectedTeacher(teacher || null);
  }, [value, allTeachers]);

  // Effect to clear search when a teacher is selected
  React.useEffect(() => {
    if (selectedTeacher) {
      setSearchQuery("");
    }
  }, [selectedTeacher]);

  // Local search function
  const filteredTeachers = React.useMemo(() => {
    if (!searchQuery.trim()) return [];

    const searchTerm = searchQuery.toLowerCase();
    return allTeachers.filter((teacher: Teacher) => {
      const { user } = teacher;
      return user.firstName.toLowerCase().startsWith(searchTerm);
    });
  }, [allTeachers, searchQuery]);

  const handleTeacherSelect = (teacherId: string) => {
    const selectedTeacher = allTeachers.find(
      (t: Teacher) => t.id.toString() === teacherId
    );
    if (selectedTeacher) {
      const fullName = `${selectedTeacher.user.firstName} ${selectedTeacher.user.lastName}`;
      onChange(teacherId, fullName);
    }
  };

  return (
    <div className="relative w-full">
      <div className="flex items-center border rounded-md px-3">
        <input
          type="text"
          placeholder="Search teachers..."
          value={
            selectedTeacher
              ? `${selectedTeacher.user.firstName} ${selectedTeacher.user.lastName}`
              : searchQuery
          }
          onChange={(e) => {
            setSearchQuery(e.target.value);
            if (selectedTeacher) {
              setSelectedTeacher(null);
              onChange("", "");
            }
          }}
          className="flex h-10 w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
        />
        {isLoading && (
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        )}
      </div>

      {error && (
        <div className="w-full bg-white border rounded-md mt-1 shadow-lg p-4">
          <p className="text-sm text-red-500 text-center">
            Error loading teachers
          </p>
        </div>
      )}

      {!isLoading &&
        !selectedTeacher &&
        searchQuery &&
        filteredTeachers.length > 0 && (
          <div className="w-full bg-white border rounded-md mt-1 shadow-lg">
            <div className="overflow-auto max-h-[150px]">
              {filteredTeachers.map((teacher: Teacher) => (
                <div
                  key={teacher.id}
                  onClick={() => {
                    setSelectedTeacher(teacher);
                    handleTeacherSelect(teacher.id.toString());
                  }}
                  className="flex items-center gap-2 px-3 py-1.5 cursor-pointer hover:bg-gray-50 text-sm"
                >
                  <User className="h-3 w-3 text-gray-500" />
                  <span className="font-medium">
                    {`${teacher.user.firstName} ${teacher.user.lastName}`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      {!isLoading && searchQuery && filteredTeachers.length === 0 && (
        <div className="w-full bg-white border rounded-md mt-1 shadow-lg p-2">
          <p className="text-sm text-gray-500 text-center">No teachers found</p>
        </div>
      )}
    </div>
  );
}
