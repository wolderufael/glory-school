export const getAssessment = async (teachingAssignmentId: number) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/assessments/by-teaching-assignment/${teachingAssignmentId}`);
    if (!res.ok) {
      throw new Error('Failed to fetch assessment');
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching assessment:", error);
    throw new Error("Failed to fetch assessment");
  }
};
