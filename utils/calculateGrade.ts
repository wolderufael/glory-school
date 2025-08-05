export const calculateGrade = (
  total: number,
  totalPractical: number,
  theory: number
): string => {
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

// Helper function to check if theory is below NYC (C- competent)
export const isTheoryBelowNYC = (theory: number): boolean => {
  return theory < 18; // C- threshold (70% of 30 = 21)
};

// Helper function to check if practical is below NYC or equal
export const isPracticalBelowNYC = (totalPractical: number): boolean => {
  return totalPractical <= 56; // C- threshold (70% of 70 = 49)
};

// Enhanced grade calculation with NYC checks
export const calculateGradeWithNYCCheck = (
  total: number,
  totalPractical: number,
  theory: number
): string => {
  // Check if theory is below NYC (C- competent)
  if (isTheoryBelowNYC(theory)) {
    return "F"; // Fail if theory is below NYC
  }

  // Check if practical is below NYC or equal
  if (isPracticalBelowNYC(totalPractical)) {
    return "F"; // Fail if practical is below NYC
  }

  // If both theory and practical meet NYC requirements, calculate normal grade
  return calculateGrade(total, totalPractical, theory);
};


export const checkpracticalStatus = (
  practical1: number,
  practical2: number,
  practical3: number
) => {
  const totalPractical = practical1 + practical2 + practical3;
  if (totalPractical < 56) {
    return "NYC";
  }

  if (totalPractical > 56) {
    return "C";
  }
  return "NA";
};


export const checktheoryStatus = (theory: number) => {
  if (theory < 18) {
    return "NYC";
  }
  if (theory > 18) {
    return "C";
  }
  return "NA";
};
