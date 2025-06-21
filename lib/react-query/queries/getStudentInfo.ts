import { getLocalStorage } from "@/utils/localStorage";

export const getStudentInfo = async () => {
  try {
    //first fetch studentid
    const StudentRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/tempstudents/student-main-id`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentMainId: getLocalStorage("userMainId"),
        }),
      }
    );
    const student = await StudentRes.json();
    console.log("student", student);
    // Fetch student info
    const studentRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/students/${getLocalStorage(
        "studentId"
      )}`
    );
    if (!studentRes.ok) throw new Error("Failed to fetch student info");
    const studentData = await studentRes.json();
    console.log("studentData", studentData);
    // Fetch section info if sectionId exists
    let sectionName = "Not assigned";
    if (studentData.sectionId) {
      const sectionRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/sections/${studentData.sectionId}`
      );
      if (sectionRes.ok) {
        const sectionData = await sectionRes.json();
        sectionName = sectionData.id < 7 ? "Not assigned" : sectionData.sectionName;
      }
    }
    
/*     if (studentData.sectionId) {
      const academicYearRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/academicyears/current-year`
      );

      if (academicYearRes.ok) {
        const academicYearData = await academicYearRes.json();

        academicYear = academicYearData.name;
        console.log("academicYear", academicYear);
      }
    } */
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
      academicYear: getLocalStorage("academicYearName"),
      user: studentData.user,
    };
  } catch (error) {
    console.error("Error fetching student info:", error);
    throw error;
  }
};
