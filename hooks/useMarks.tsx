import { useState } from "react";
import { toast } from "sonner";
import { calculateGrade } from "@/utils/calculateGrade";

export interface StudentMark {
  student_main_id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  sex: string;
  id_no: string;
  practical: number;
  theory: number;
  total: number;
  grade_in_letter: string;
}

export interface MarksSubmission {
  student_main_id: string;
  practical: number;
  theory: number;
  total: number;
  grade_in_letter: string;
}

export const useMarks = () => {
  const [marks, setMarks] = useState<Record<string, MarksSubmission>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateMark = (
    studentId: string,
    field: keyof MarksSubmission,
    value: number | string
  ) => {
    setMarks((prev) => {
      const currentMark = prev[studentId] || {
        student_main_id: studentId,
        practical: 0,
        theory: 0,
        total: 0,
        grade_in_letter: "",
      };

      const updatedMark = { ...currentMark, [field]: value };

      if (field === "practical" || field === "theory") {
        const practical =
          field === "practical" ? Number(value) : updatedMark.practical;
        const theory = field === "theory" ? Number(value) : updatedMark.theory;
        updatedMark.total = practical + theory;
        updatedMark.grade_in_letter = calculateGrade(updatedMark.total);
      }

      return { ...prev, [studentId]: updatedMark };
    });
  };

 

  const submitMarks = async () => {
    setIsSubmitting(true);
    try {
      const marksArray = Object.values(marks);
      console.log("Submitting marks:", marksArray);

      // Simulate API call

      //place an api here to send formData and use marksArray as a data
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast("Success", {
        description: `Successfully submitted marks for ${marksArray.length} students`,
      });
    } catch (error) {
      toast("Error", {
        description: "Failed to submit marks. Please try again.",
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    marks,
    updateMark,
    submitMarks,
    isSubmitting,
  };
};
