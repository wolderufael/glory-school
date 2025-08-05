export const calculateGrade = (total: number): string => {
  if (total > 100) return "Error";
  if (total >= 95) return "A+";
  if (total >= 92) return "A";
  if (total >= 89) return "A-";
  if (total >= 86) return "B+";
  if (total >= 83) return "B";
  if (total >= 80) return "B-";
  if (total >= 77) return "C+";
  if (total >= 74) return "C";

  return "F";
};
