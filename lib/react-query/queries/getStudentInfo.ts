export const getStudentInfo = async (studentID: string | null) => {
  try {
    // Fetch student info
    const studentRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/students/${studentID}`
    );
    if (!studentRes.ok) throw new Error("Failed to fetch student info");
    const studentData = await studentRes.json();

    // Fetch section info if sectionId exists
    let sectionName = "Not assigned";
    if (studentData.sectionId) {
      const sectionRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/sections/${studentData.sectionId}`
      );
      if (sectionRes.ok) {
        const sectionData = await sectionRes.json();
        sectionName = sectionData.sectionName;
      }
    }
    // Fetch user info if userId exists
    let userData = {};
    if (studentData.userId) {
      const userRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/${studentData.userId}`
      );
      if (userRes.ok) {
        const userData = await userRes.json();
        //userName = userData.userName;
      }
    }

    // Add section name to the response
    return {
      ...studentData,
      section: {
        id: studentData.sectionId,
        name: sectionName,
      },
      user: userData,
    };
  } catch (error) {
    console.error("Error fetching student info:", error);
    throw error;
  }
};
