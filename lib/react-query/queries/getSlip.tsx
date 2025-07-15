import axios from "axios";
import {
  StudentRegistration,
  Module,
} from "@/components/dashboard/registration/course-registration";
import { RegistrationSlip } from "@/types/types";
import { getLocalStorage } from "@/utils/localStorage";
import { Department } from "@/types/tempstudent";

const departmentId = getLocalStorage("departmentId");

//Temporary solution to get department name from department id
const getDepartment = async (departmentId: string) => {
  const { data: department } = await axios.get<Department>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/departments/${departmentId}`
  );
  return department.name;
};



export const getSlip = async (
  studentId: string 
): Promise<StudentRegistration[]> => {
  // Get registration slips with courses
  const { data: slips } = await axios.get<RegistrationSlip[]>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/students/${studentId}/registration-slips-with-courses`
  );
  const departmentName = await getDepartment(departmentId || "");

  // Transform each slip into our StudentRegistration format
  return slips.map((slip) => ({
    department: departmentName, // This should come from a different API endpoint
    level: slip.level,
    year: slip.year,
    entryYear: slip.year, // You might want to calculate this differently
    //academicYear: `${parseInt(slip.year)}/${parseInt(slip.year) + 1}`,
    semester_name: slip.semester,
    academicSemester: slip.academicSemester,
    academicYear: slip.academicYear,
    sex: "M", // This should come from a different API endpoint
    mobilePhone: "", // This should come from a different API endpoint
    program: {
      isRegular: true, // This should come from a different API endpoint
      isCEP: false,
    },
    modules: slip.courses.map((course, index) => ({
      no: index + 1,
      title: course.title,
      code: course.code,
      level: course.level,
      nominalHour: course.nominalHour,
    })),
  }));
};
