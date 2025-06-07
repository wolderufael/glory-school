export const getAssignedCourses = async (teacherId: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/students/assigned-courses/${teacherId}`);
    if (!res.ok) throw new Error('Failed to fetch assigned courses');
    return res.json();
  } catch (error) {
    console.error("Error fetching assigned courses:", error);
    throw error;
  }
};
