import axios from "axios";

export enum CourseLevel {
  FIRST = "FIRST",
  SECOND = "SECOND",
  THIRD = "THIRD",
  FOURTH = "FOURTH",
  FIFTH = "FIFTH",
}

export interface Course {
  id: number;
  collegeId: number;
  departmentId: number;
  level: CourseLevel;
  courseCode: string;
  title: string;
  theoryNhrs: number;
  practicalNhrs: number;
  cooperativeNhrs: number;
  totalNhrs: number;
  createdAt: Date;
  assigned: boolean;
  teacherName: string;
}

export const getCourses = async (
  departmentId: string,
  levelId: string,
  sectionId: string,
  academicSemesterId: string
): Promise<Course[]> => {
  const { data } = await axios.get<Course[]>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/courses/by-department-level`,
    {
      params: {
        departmentId,
        level: levelId,
        sectionId,
        academicSemesterId,
      },
    }
  );
  console.log("getCourses", data);
  return data;
};
