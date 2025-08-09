import {
  StudentRegistration,
  Module,
} from "@/components/dashboard/registration/course-registration";

// Mock high school registration slip data
const mockHighSchoolSlips: StudentRegistration[] = [
  {
    department: "General Studies",
    level: "10",
    year: "2024",
    entryYear: "2022",
    semester_name: "Second Semester",
    academicSemester: {
      id: 2,
      name: "Second Semester",
      academicYearId: 1,
      startDate: "2025-02-01",
      endDate: "2025-06-30",
      registrationStartDate: "2025-01-15",
      registrationEndDate: "2025-02-15",
      status: "OPEN" as const,
      createdAt: "2024-08-01T00:00:00Z",
    },
    academicYear: {
      id: 1,
      name: "2024/2025",
      startDate: "2024-09-01",
      endDate: "2025-08-31",
      semester1StartDate: "2024-09-01",
      semester1EndDate: "2025-01-31",
      semester2StartDate: "2025-02-01",
      semester2EndDate: "2025-06-30",
      semeester1RegistrationStartDate: "2024-08-15",
      semeester1RegistrationEndDate: "2024-09-15",
      semeester2RegistrationStartDate: "2025-01-15",
      semeester2RegistrationEndDate: "2025-02-15",
      status: "OPEN" as const,
      createdAt: "2024-08-01T00:00:00Z",
      semesters: [],
    },
    sex: "F",
    mobilePhone: "+251911234567",
    program: {
      isRegular: true,
      isCEP: false,
    },
    modules: [
      {
        no: 1,
        title: "Mathematics",
        code: "MATH-10",
        level: "10",
        nominalHour: 4,
      },
      {
        no: 2,
        title: "Physics",
        code: "PHYS-10",
        level: "10",
        nominalHour: 3,
      },
      {
        no: 3,
        title: "Chemistry",
        code: "CHEM-10",
        level: "10",
        nominalHour: 3,
      },
      {
        no: 4,
        title: "Biology",
        code: "BIOL-10",
        level: "10",
        nominalHour: 3,
      },
      {
        no: 5,
        title: "English Language",
        code: "ENG-10",
        level: "10",
        nominalHour: 4,
      },
      {
        no: 6,
        title: "Amharic",
        code: "AMH-10",
        level: "10",
        nominalHour: 2,
      },
      {
        no: 7,
        title: "History",
        code: "HIST-10",
        level: "10",
        nominalHour: 2,
      },
      {
        no: 8,
        title: "Geography",
        code: "GEOG-10",
        level: "10",
        nominalHour: 2,
      },
      {
        no: 9,
        title: "Physical Education",
        code: "PE-10",
        level: "10",
        nominalHour: 2,
      },
      {
        no: 10,
        title: "Art and Music",
        code: "ART-10",
        level: "10",
        nominalHour: 2,
      },
    ],
  },
];

export const getSlip = async (
  studentId: string
): Promise<StudentRegistration[]> => {
  // Return mock high school registration slip data
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("getSlip called with studentId:", studentId);
      console.log("Returning mock data:", mockHighSchoolSlips);
      resolve(mockHighSchoolSlips);
    }, 500); // Simulate API delay
  });
};
