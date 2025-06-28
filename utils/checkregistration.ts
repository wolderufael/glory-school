export async function checkStudentRegistration(userMainId: string) {
  try {
    // fetch user id first
    const Students = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/students`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    const studentsData = await Students.json();
    const student = studentsData.find(
      (student: any) => student.user.userMainId === userMainId
    );
    console.log("###########Staus#########", student.maritalStatus);
    if (student) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Failed to check student registration:", error);
    return false;
  }
}

export async function isAcceptedStudent(
  userMainId: string,
  academicYearId: string
) {
  try {
    const tempStudents = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/tempstudents?academicYearId=${academicYearId}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    const tempStudentsData = await tempStudents.json();
    const tempStudent = tempStudentsData.find(
      (student: any) => student.studentMainId === userMainId
    );

    if (tempStudent) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Failed to check temp student registration:", error);
    return [];
  }
}

