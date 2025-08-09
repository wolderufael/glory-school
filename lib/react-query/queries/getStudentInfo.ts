
import { mockStudentData } from "@/components/mockData";

export const getStudentInfo = async () => {
  try {

    return mockStudentData;
  } catch (error) {
    console.error("Error with mock student info:", error);
    throw error;
  }
};
