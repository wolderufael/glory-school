import axios from "axios";
import {
  StudentRegistration,
  Module,
} from "@/components/dashboard/course-registration";

export interface Course {
  id: string;
  title: string;
  code: string;
  level: string;
  nominalHour: number;
}

const Apiresponse = [
  {
    id: 1,
    year: "1",
    semester: "1",
    departmentId: 1,
    collegeId: 1,
    level: "I",
    courseIds: "1,2,3,4,5,6,7,8,9",
    generatedAt: "2025-05-28T10:55:00.000Z",
    courses: [
      {
        id: 1,
        collegeId: 1,
        departmentId: 1,
        level: "I",
        courseCode: "AGR ANH1 M01 0422",
        title: "Identifying and Handle Basic Veterinary Tools and Equipment",
        theoryNhrs: 18,
        practicalNhrs: 33,
        cooperativeNhrs: 9,
        totalNhrs: 60,
        createdAt: "2025-05-28T09:52:00.000Z",
      },
      {
        id: 2,
        collegeId: 1,
        departmentId: 1,
        level: "I",
        courseCode: "AGR ANH1 M02 0422",
        title: "Applying 5S Procedures",
        theoryNhrs: 29,
        practicalNhrs: 10,
        cooperativeNhrs: 6,
        totalNhrs: 45,
        createdAt: "2025-05-28T09:52:00.000Z",
      },
      {
        id: 3,
        collegeId: 1,
        departmentId: 1,
        level: "I",
        courseCode: "AGR ANH1 M03 0422",
        title:
          "Carrying out Cleaning for Animal Care Work and Waste Management Activities",
        theoryNhrs: 18,
        practicalNhrs: 30,
        cooperativeNhrs: 12,
        totalNhrs: 60,
        createdAt: "2025-05-28T09:52:00.000Z",
      },
      {
        id: 4,
        collegeId: 1,
        departmentId: 1,
        level: "I",
        courseCode: "AGR ANH1 M04 0422",
        title: "Handling and Restrain Animals",
        theoryNhrs: 18,
        practicalNhrs: 24,
        cooperativeNhrs: 0,
        totalNhrs: 42,
        createdAt: "2025-05-28T09:52:00.000Z",
      },
      {
        id: 5,
        collegeId: 1,
        departmentId: 1,
        level: "I",
        courseCode: "AGR ANH1 M05 0422",
        title: "Identifying Sick Animals",
        theoryNhrs: 14,
        practicalNhrs: 20,
        cooperativeNhrs: 6,
        totalNhrs: 40,
        createdAt: "2025-05-28T09:52:00.000Z",
      },
      {
        id: 6,
        collegeId: 1,
        departmentId: 1,
        level: "I",
        courseCode: "AGR ANH1 M06 0422",
        title: "Providing Basic Health Care for Animals",
        theoryNhrs: 18,
        practicalNhrs: 20,
        cooperativeNhrs: 10,
        totalNhrs: 48,
        createdAt: "2025-05-28T09:52:00.000Z",
      },
      {
        id: 7,
        collegeId: 1,
        departmentId: 1,
        level: "I",
        courseCode: "AGR ANH1 M07 0422",
        title: "Applying Agricultural Extension Service",
        theoryNhrs: 35,
        practicalNhrs: 0,
        cooperativeNhrs: 20,
        totalNhrs: 55,
        createdAt: "2025-05-28T09:52:00.000Z",
      },
      {
        id: 8,
        collegeId: 1,
        departmentId: 1,
        level: "I",
        courseCode: "AGR ANH1 M08 0422",
        title: "Implementing Agribusiness Marketing",
        theoryNhrs: 28,
        practicalNhrs: 10,
        cooperativeNhrs: 10,
        totalNhrs: 48,
        createdAt: "2025-05-28T09:52:00.000Z",
      },
      {
        id: 9,
        collegeId: 1,

        departmentId: 1,
        level: "I",
        courseCode: "AGR ANH1 M09 0422",
        title: "Appling Basics of Human Nutrition Practices",
        theoryNhrs: 24,
        practicalNhrs: 14,
        cooperativeNhrs: 10,
        totalNhrs: 48,
        createdAt: "2025-05-28T09:52:00.000Z",
      },
    ],
    student: {
      registrationSlips: [
        {
          id: 1,
          year: "1",
          semester: "1",
          departmentId: 1,
          collegeId: 1,
          level: "I",
          courseIds: "1,2,3,4,5,6,7,8,9",
          generatedAt: "2025-05-28T10:55:00.000Z",
        },
        {
          id: 4,
          year: "2",
          semester: "2",
          departmentId: 1,
          collegeId: 1,
          level: "III",
          courseIds: "23,24,25,26,27,28",
          generatedAt: "2025-05-28T10:55:00.000Z",
        },
      ],
    },
  },
  {
    id: 4,
    year: "2",
    semester: "2",
    departmentId: 1,
    collegeId: 1,
    level: "III",
    courseIds: "23,24,25,26,27,28",
    generatedAt: "2025-05-28T10:55:00.000Z",
    courses: [
      {
        id: 23,
        collegeId: 1,
        departmentId: 1,
        level: "III",
        courseCode: "AGR ANH3 M05 0422",
        title:
          "Performing Pre-Surgical Operative Procedures and Wound Management Activities",
        theoryNhrs: 28,
        practicalNhrs: 32,
        cooperativeNhrs: 0,
        totalNhrs: 60,
        createdAt: "2025-05-28T09:52:00.000Z",
      },
      {
        id: 24,
        collegeId: 1,
        departmentId: 1,
        level: "III",
        courseCode: "AGR ANH3 M06 0422",
        title: "Providing First Aid and Respond to Emergencies for Animals",
        theoryNhrs: 20,
        practicalNhrs: 28,
        cooperativeNhrs: 0,
        totalNhrs: 48,
        createdAt: "2025-05-28T09:52:00.000Z",
      },
      {
        id: 25,
        collegeId: 1,
        departmentId: 1,
        level: "III",
        courseCode: "AGR ANH3 M07 0422",
        title:
          "Identifying and Handling Pest, Predator and Diseases of Honey Bee Colony",
        theoryNhrs: 22,
        practicalNhrs: 12,
        cooperativeNhrs: 8,
        totalNhrs: 42,
        createdAt: "2025-05-28T09:52:00.000Z",
      },
      {
        id: 26,
        collegeId: 1,
        departmentId: 1,
        level: "III",
        courseCode: "AGR ANH3 M08 0422",
        title: "Identifying and Handling Pest, Predator and Diseases of Fish",
        theoryNhrs: 16,
        practicalNhrs: 18,
        cooperativeNhrs: 6,
        totalNhrs: 40,
        createdAt: "2025-05-28T09:52:00.000Z",
      },
      {
        id: 27,
        collegeId: 1,
        departmentId: 1,
        level: "III",
        courseCode: "AGR ANH3 M09 0422",
        title:
          "Conducting Animal Health Extension and Community Veterinary Service",
        theoryNhrs: 15,
        practicalNhrs: 0,
        cooperativeNhrs: 25,
        totalNhrs: 40,
        createdAt: "2025-05-28T09:52:00.000Z",
      },
      {
        id: 28,
        collegeId: 1,
        departmentId: 1,

        level: "III",
        courseCode: "AGR ANH3 M10 0422",
        title: "Applying Digital Technology in Agriculture",
        theoryNhrs: 26,
        practicalNhrs: 24,
        cooperativeNhrs: 0,
        totalNhrs: 50,
        createdAt: "2025-05-28T09:52:00.000Z",
      },
    ],
    student: {
      registrationSlips: [
        {
          id: 1,
          year: "1",
          semester: "1",
          departmentId: 1,
          collegeId: 1,
          level: "I",
          courseIds: "1,2,3,4,5,6,7,8,9",
          generatedAt: "2025-05-28T10:55:00.000Z",
        },
        {
          id: 4,
          year: "2",
          semester: "2",
          departmentId: 1,
          collegeId: 1,
          level: "III",
          courseIds: "23,24,25,26,27,28",
          generatedAt: "2025-05-28T10:55:00.000Z",
        },
      ],
    },
  },
];

export interface StudentApiResponse {
  id: number;
  studentTempId: number;
  userId: number;
  department: {
    id: number;
    collegeId: number;
    name: string;
    code: string;
  };
  program: {
    id: number;
    name: string;
  };
  admissionType: {
    id: number;
    name: string;
  };
  currentStudyingYear: string;
  currentStudyingSemester: string;
  currentStudyingLevel: string;
  registrationSlips: Array<{
    id: number;
    year: string;
    semester: string;
    departmentId: number;
    collegeId: number;
    level: string;
    courseIds: string;
    generatedAt: string;
  }>;
}

interface ApiCourse {
  id: number;
  courseCode: string;
  title: string;
  theoryNhrs: number;
  practicalNhrs: number;
  cooperativeNhrs: number;
  totalNhrs: number;
  level: string;
}

interface ApiRegistrationSlip {
  id: number;
  year: string;
  semester: string;
  level: string;
  courses: ApiCourse[];
  student: {
    registrationSlips: Array<{
      id: number;
      year: string;
      semester: string;
      level: string;
    }>;
  };
}

export const getSlip = async (
  studentId: string
): Promise<StudentRegistration[]> => {
  // Get registration slips with courses
  const { data: slips } = await axios.get<ApiRegistrationSlip[]>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/students/${studentId}/registration-slips-with-courses`
  );

  // Transform each slip into our StudentRegistration format
  return slips.map((slip) => ({
    name: "Student Name", // This should come from a different API endpoint
    idNo: studentId,
    department: "Animal Health", // This should come from a different API endpoint
    level: slip.level,
    year: slip.year,
    entryYear: slip.year, // You might want to calculate this differently
    academicYear: `${parseInt(slip.year)}/${parseInt(slip.year) + 1}`,
    semester: slip.semester,
    sex: "M", // This should come from a different API endpoint
    mobilePhone: "", // This should come from a different API endpoint
    program: {
      isRegular: true, // This should come from a different API endpoint
      isCEP: false,
    },
    modules: slip.courses.map((course, index) => ({
      no: index + 1,
      title: course.title,
      code: course.courseCode,
      level: course.level,
      nominalHour: course.totalNhrs,
    })),
  }));
};
