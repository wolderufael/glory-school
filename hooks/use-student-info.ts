import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface StudentInfo {
  id: number;
  student_temp_id: string;
  user_id: number;
  place_of_birth_town: string;
  place_of_birth_zone: string;
  place_of_birth_wereda: string;
  date_of_birth: string;
  address_kebele: string;
  address_woreda: string;
  address_zone: string;
  address_region: string;
  phone_home: string;
  phone_office: string;
  marital_status: string;
  department_id: number;
  program_id: number;
  admission_type_id: number;
  list_of_sup: string;
  registration_date: string;
  created_at: string;
  current_studying_year: string;
  current_studying_semester: string;
  current_studying_level: string;
  updated_at: string;
  section_id: number;
}

export function useStudentInfo(studentID: number) {
  return useQuery<StudentInfo>({
    queryKey: ["studentInfo"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `/api/student?studentID=${studentID}`
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching student info:", error);
        throw error;
      }
    },
  });
}
