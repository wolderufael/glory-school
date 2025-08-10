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

// Mock teacher interface for high school
interface Teacher {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  qualification: string;
  subject: string;
}

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

  // Mock high school teachers data
  const mockTeachers: Teacher[] = [
    {
      id: 1,
      firstName: "Sarah",
      lastName: "Johnson",
      email: "sarah.johnson@school.edu",
      qualification: "PhD Physics",
      subject: "Physics",
    },
    {
      id: 2,
      firstName: "Emily",
      lastName: "Davis",
      email: "emily.davis@school.edu",
      qualification: "MSc Biology",
      subject: "Biology",
    },
    {
      id: 3,
      firstName: "Michael",
      lastName: "Wilson",
      email: "michael.wilson@school.edu",
      qualification: "MA History",
      subject: "History",
    },
    {
      id: 4,
      firstName: "David",
      lastName: "Chen",
      email: "david.chen@school.edu",
      qualification: "BSc Computer Science",
      subject: "Information Technology",
    },
    {
      id: 5,
      firstName: "Maria",
      lastName: "Rodriguez",
      email: "maria.rodriguez@school.edu",
      qualification: "MSc Chemistry",
      subject: "Chemistry",
    },
    {
      id: 6,
      firstName: "James",
      lastName: "Thompson",
      email: "james.thompson@school.edu",
      qualification: "MA Mathematics",
      subject: "Mathematics",
    },
    {
      id: 7,
      firstName: "Lisa",
      lastName: "Anderson",
      email: "lisa.anderson@school.edu",
      qualification: "BA English Literature",
      subject: "English Language",
    },
    {
      id: 8,
      firstName: "Robert",
      lastName: "Miller",
      email: "robert.miller@school.edu",
      qualification: "BSc Geography",
      subject: "Geography",
    },
    {
      id: 9,
      firstName: "Jennifer",
      lastName: "Taylor",
      email: "jennifer.taylor@school.edu",
      qualification: "MA Civics",
      subject: "Civics and Ethics",
    },
    {
      id: 10,
      firstName: "Mark",
      lastName: "Brown",
      email: "mark.brown@school.edu",
      qualification: "BSc Physical Education",
      subject: "Physical Education",
    },
  ];

  // Mock loading and error states
  const [allTeachers, setAllTeachers] = React.useState<Teacher[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  // Simulate loading teachers
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setAllTeachers(mockTeachers);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [departmentId]);

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
      return (
        teacher.firstName.toLowerCase().startsWith(searchTerm) ||
        teacher.lastName.toLowerCase().startsWith(searchTerm) ||
        teacher.subject.toLowerCase().includes(searchTerm)
      );
    });
  }, [allTeachers, searchQuery]);

  const handleTeacherSelect = (teacherId: string) => {
    const selectedTeacher = allTeachers.find(
      (t: Teacher) => t.id.toString() === teacherId
    );
    if (selectedTeacher) {
      const fullName = `${selectedTeacher.firstName} ${selectedTeacher.lastName}`;
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
              ? `${selectedTeacher.firstName} ${selectedTeacher.lastName}`
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
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {`${teacher.firstName} ${teacher.lastName}`}
                    </span>
                    <span className="text-xs text-gray-400">
                      {teacher.subject} • {teacher.qualification}
                    </span>
                  </div>
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
