export const getStudentInfo = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/students/info`
    );
    if (!res.ok) throw new Error("Failed to fetch student info");
    const data = await res.json();
    return data.studentInfo || 0;
  } catch (error) {
    console.error("Error fetching student info:", error);
    return 0; // Fallback to 0 if there's an error
  }
};
