import { academicYearSchema } from "@/utils/academicYearSchema";
import { z } from "zod";
import axios from "axios";

export type AcademicYearData = z.infer<typeof academicYearSchema>;

// Helper function to pad numbers with leading zeros
const padZero = (num: number) => num.toString().padStart(2, "0");

// Helper function to ensure date is in correct format
const formatDate = (dateStr: string) => {
  if (!dateStr) return null;
  const date = new Date(dateStr);

  const year = date.getFullYear();
  const month = padZero(date.getMonth() + 1); // getMonth() returns 0-11
  const day = padZero(date.getDate());

  // Construct the exact format: YYYY-MM-DDT00:00:00.000Z
  return `${year}-${month}-${day}T00:00:00.000Z`;
};

export const addAcademicYear = async (data: AcademicYearData) => {
  try {
    // Format all dates
    const formattedData = {
      ...data,
      startDate: formatDate(data.startDate),
      endDate: formatDate(data.endDate),
      semester1StartDate: formatDate(data.semester1StartDate),
      semester1EndDate: formatDate(data.semester1EndDate),
      semester2StartDate: formatDate(data.semester2StartDate),
      semester2EndDate: formatDate(data.semester2EndDate),
      semeester1RegistrationStartDate: formatDate(
        data.semeester1RegistrationStartDate
      ),
      semeester1RegistrationEndDate: formatDate(
        data.semeester1RegistrationEndDate
      ),
      semeester2RegistrationStartDate: formatDate(
        data.semeester2RegistrationStartDate
      ),
      semeester2RegistrationEndDate: formatDate(
        data.semeester2RegistrationEndDate
      ),
    };

    console.log("Sending data:", JSON.stringify(formattedData, null, 2));

    const response = await axios.post(
      "http://192.168.1.36:3000/api/academic-years",
      formattedData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("API Error:", error.response?.data);
      throw new Error(
        error.response?.data?.message || "Failed to create academic year"
      );
    }
    throw error;
  }
};
