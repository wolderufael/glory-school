import { useMutation, useQuery } from "@tanstack/react-query";
import { RegradeAssesment, Assessment, RegradeAssesmentResponse } from "@/types/types";

const regradeAssessments: RegradeAssesmentResponse[] = [
  {
    id: 1,
    regradeStatus: "REGRADE_REQUESTED",
    regradeReason: "Student believes practical score was miscalculated",
    teachingAssignmentId: 1,
    studentId: 1,
    practical1: 85,
    practical1Type: "Lab Experiment",
    practical2: 0,
    practical2Type: "Lab Experiment",
    practical3: 0,
    practical3Type: "Lab Experiment",
    totalPractical: 85,
    practicalStatus: "PENDING",
    theory: 90,
    theoryStatus: "PENDING",
    totalMark: 87.5,
    gradeInLetter: "B+",
    comment: "Awaiting department review for regrade",
    assessmentGroupId: 1,
    student: {
      student: {
        id: 1,
        studentTempId: 1001,
        userId: 1,
        placeOfBirthTown: "Springfield",
        placeOfBirthZone: "Central",
        placeOfBirthRegion: "Illinois",
        dateOfBirth: "2008-05-15",
        addressKebele: "Kebele 01",
        addressWoreda: "Woreda 02",
        addressTown: "Springfield",
        addressZone: "Central",
        addressRegion: "Illinois",
        phoneHome: "+1234567890",
        phoneOffice: "",
        maritalStatus: "Single",
        departmentId: 1,
        programId: 1,
        admissionTypeId: 1,
        listOfSlip: "Slip001",
        registrationDate: "2024-08-01",
        profilePicture: "alex_wilson.jpg",
        currentStudyingYear: "2024",
        currentStudyingSemester: "Fall",
        currentStudyingLevel: "10th Grade",
        createdAt: "2024-08-01T08:00:00Z",
        updatedAt: "2024-08-01T08:00:00Z",
        sectionId: 1,
      },
      user: {
        id: 1,
        firstName: "Alex",
        lastName: "Wilson",
        role: "STUDENT",
        department: "Science",
        userMainId: "S001",
        userType: "Student",
        studentId: "S001",
      },
    },
    originalGrade: {
      id: 1,
      teachingAssignmentId: 1,
      studentId: 1,
      practical1: 80,
      practical1Type: "Lab Experiment",
      practical2: 0,
      practical2Type: "Lab Experiment",
      practical3: 0,
      practical3Type: "Lab Experiment",
      totalPractical: 80,
      practicalStatus: "GRADED",
      theory: 80,
      theoryStatus: "GRADED",
      totalMark: 80,
      gradeInLetter: "B",
    },
    teachingAssignment: {
      id: 1,
      teacherId: 1,
      sectionId: 1,
      courseId: 1,
      academicSemesterId: 1,
      academicYearId: 2024,
      level: "10th Grade",
      departmentId: 1,
      course: {
        id: 1,
        collegeId: 1,
        departmentId: 1,
        level: "10th Grade",
        courseCode: "SCI101",
        title: "Biology Fundamentals",
        theoryNhrs: 40,
        practicalNhrs: 20,
        cooperativeNhrs: 0,
        totalNhrs: 60,
        createdAt: "2024-09-01T08:00:00Z",
      },
      teacher: {
        id: 1,
        userId: 1,
        createdAt: "2024-08-01T09:00:00Z",
        updatedAt: "2024-08-01T09:00:00Z",
        user: {
          id: 1,
          firstName: "Jane",
          middleName: "Ann",
          lastName: "Smith",
          email: "jane.smith@school.edu",
          phoneNumber: "+1234567891",
          password: "hashedpassword456",
          userType: "Teacher",
          gender: "Female",
          nationality: "American",
          userMainId: "T001",
        },
      },
    },
  },
  {
    id: 2,
    regradeStatus: "DEPARTMENT_UNDER_REVIEW",
    regradeReason: "Discrepancy in theory exam scoring",
    teachingAssignmentId: 2,
    studentId: 2,
    practical1: 90,
    practical1Type: "Project",
    practical2: 88,
    practical2Type: "Group Work",
    practical3: 0,
    practical3Type: "Group Work",
    totalPractical: 89,
    practicalStatus: "UNDER_REVIEW",
    theory: 85,
    theoryStatus: "UNDER_REVIEW",
    totalMark: 87,
    gradeInLetter: "B+",
    comment: "Department reviewing theory exam answers",
    assessmentGroupId: 2,
    student: {
      student: {
        id: 2,
        studentTempId: 1002,
        userId: 2,
        placeOfBirthTown: "Lincoln",
        placeOfBirthZone: "Central",
        placeOfBirthRegion: "Nebraska",
        dateOfBirth: "2007-03-22",
        addressKebele: "Kebele 03",
        addressWoreda: "Woreda 04",
        addressTown: "Lincoln",
        addressZone: "Central",
        addressRegion: "Nebraska",
        phoneHome: "+1234567892",
        phoneOffice: "",
        maritalStatus: "Single",
        departmentId: 2,
        programId: 2,
        admissionTypeId: 1,
        listOfSlip: "Slip002",
        registrationDate: "2024-08-01",
        profilePicture: "sarah_johnson.jpg",
        currentStudyingYear: "2024",
        currentStudyingSemester: "Fall",
        currentStudyingLevel: "11th Grade",
        createdAt: "2024-08-01T08:00:00Z",
        updatedAt: "2024-08-01T08:00:00Z",
        sectionId: 2,
      },
      user: {
        id: 2,
        firstName: "Sarah",
        lastName: "Johnson",
        role: "STUDENT",
        department: "Mathematics",
        userMainId: "S002",
        userType: "Student",
        studentId: "S002",
      },
    },
    originalGrade: {
      id: 2,
      teachingAssignmentId: 2,
      studentId: 2,
      practical1: 85,
      practical1Type: "Project",
      practical2: 83,
      practical2Type: "Group Work",
      practical3: 0,
      practical3Type: "Group Work",
      totalPractical: 84,
      practicalStatus: "GRADED",
      theory: 80,
      theoryStatus: "GRADED",
      totalMark: 82,
      gradeInLetter: "B",
    },
    teachingAssignment: {
      id: 2,
      teacherId: 2,
      sectionId: 2,
      courseId: 2,
      academicSemesterId: 1,
      academicYearId: 2024,
      level: "11th Grade",
      departmentId: 2,
      course: {
        id: 2,
        collegeId: 1,
        departmentId: 2,
        level: "11th Grade",
        courseCode: "MATH201",
        title: "Algebra II",
        theoryNhrs: 50,
        practicalNhrs: 10,
        cooperativeNhrs: 0,
        totalNhrs: 60,
        createdAt: "2024-09-01T08:00:00Z",
      },
      teacher: {
        id: 2,
        userId: 2,
        createdAt: "2024-08-01T09:00:00Z",
        updatedAt: "2024-08-01T09:00:00Z",
        user: {
          id: 2,
          firstName: "Michael",
          middleName: "James",
          lastName: "Brown",
          email: "michael.brown@school.edu",
          phoneNumber: "+1234567893",
          password: "hashedpassword012",
          userType: "Teacher",
          gender: "Male",
          nationality: "American",
          userMainId: "T002",
        },
      },
    },
  },
  {
    id: 3,
    regradeStatus: "DEPARTMENT_APPROVED",
    regradeReason: "Incorrect practical scoring detected",
    teachingAssignmentId: 3,
    studentId: 3,
    practical1: 92,
    practical1Type: "Lab Work",
    practical2: 0,
    practical2Type: "Lab Work",
    practical3: 0,
    practical3Type: "Lab Work",
    totalPractical: 92,
    practicalStatus: "APPROVED",
    theory: 88,
    theoryStatus: "APPROVED",
    totalMark: 90,
    gradeInLetter: "A-",
    comment: "Department approved regrade; new scores applied",
    assessmentGroupId: 3,
    student: {
      student: {
        id: 3,
        studentTempId: 1003,
        userId: 3,
        placeOfBirthTown: "Madison",
        placeOfBirthZone: "South",
        placeOfBirthRegion: "Wisconsin",
        dateOfBirth: "2006-07-10",
        addressKebele: "Kebele 05",
        addressWoreda: "Woreda 06",
        addressTown: "Madison",
        addressZone: "South",
        addressRegion: "Wisconsin",
        phoneHome: "+1234567894",
        phoneOffice: "",
        maritalStatus: "Single",
        departmentId: 3,
        programId: 3,
        admissionTypeId: 1,
        listOfSlip: "Slip003",
        registrationDate: "2024-08-01",
        profilePicture: "emily_davis.jpg",
        currentStudyingYear: "2024",
        currentStudyingSemester: "Fall",
        currentStudyingLevel: "12th Grade",
        createdAt: "2024-08-01T08:00:00Z",
        updatedAt: "2024-08-01T08:00:00Z",
        sectionId: 3,
      },
      user: {
        id: 3,
        firstName: "Emily",
        lastName: "Davis",
        role: "STUDENT",
        department: "English",
        userMainId: "S003",
        userType: "Student",
        studentId: "S003",
      },
    },
    originalGrade: {
      id: 3,
      teachingAssignmentId: 3,
      studentId: 3,
      practical1: 87,
      practical1Type: "Lab Work",
      practical2: 0,
      practical2Type: "Lab Work",
      practical3: 0,
      practical3Type: "Lab Work",
      totalPractical: 87,
      practicalStatus: "GRADED",
      theory: 83,
      theoryStatus: "GRADED",
      totalMark: 85,
      gradeInLetter: "B+",
    },
    teachingAssignment: {
      id: 3,
      teacherId: 3,
      sectionId: 3,
      courseId: 3,
      academicSemesterId: 1,
      academicYearId: 2024,
      level: "12th Grade",
      departmentId: 3,
      course: {
        id: 3,
        collegeId: 1,
        departmentId: 3,
        level: "12th Grade",
        courseCode: "ENG301",
        title: "Literature and Composition",
        theoryNhrs: 45,
        practicalNhrs: 15,
        cooperativeNhrs: 0,
        totalNhrs: 60,
        createdAt: "2024-09-01T08:00:00Z",
      },
      teacher: {
        id: 3,
        userId: 3,
        createdAt: "2024-08-01T09:00:00Z",
        updatedAt: "2024-08-01T09:00:00Z",
        user: {
          id: 3,
          firstName: "David",
          middleName: "Lee",
          lastName: "Thompson",
          email: "david.thompson@school.edu",
          phoneNumber: "+1234567895",
          password: "hashedpassword678",
          userType: "Teacher",
          gender: "Male",
          nationality: "American",
          userMainId: "T003",
        },
      },
    },
  },
  {
    id: 4,
    regradeStatus: "DEPARTMENT_REJECTED",
    regradeReason: "No evidence of scoring error",
    teachingAssignmentId: 1,
    studentId: 4,
    practical1: 80,
    practical1Type: "Lab Experiment",
    practical2: 0,
    practical2Type: "Lab Experiment",
    practical3: 0,
    practical3Type: "Lab Experiment",
    totalPractical: 80,
    practicalStatus: "REJECTED",
    theory: 82,
    theoryStatus: "REJECTED",
    totalMark: 81,
    gradeInLetter: "B",
    comment: "Department found no basis for regrade",
    assessmentGroupId: 1,
    student: {
      student: {
        id: 4,
        studentTempId: 1004,
        userId: 4,
        placeOfBirthTown: "Springfield",
        placeOfBirthZone: "Central",
        placeOfBirthRegion: "Illinois",
        dateOfBirth: "2008-09-12",
        addressKebele: "Kebele 07",
        addressWoreda: "Woreda 08",
        addressTown: "Springfield",
        addressZone: "Central",
        addressRegion: "Illinois",
        phoneHome: "+1234567896",
        phoneOffice: "",
        maritalStatus: "Single",
        departmentId: 1,
        programId: 1,
        admissionTypeId: 1,
        listOfSlip: "Slip004",
        registrationDate: "2024-08-01",
        profilePicture: "lucas_martinez.jpg",
        currentStudyingYear: "2024",
        currentStudyingSemester: "Fall",
        currentStudyingLevel: "10th Grade",
        createdAt: "2024-08-01T08:00:00Z",
        updatedAt: "2024-08-01T08:00:00Z",
        sectionId: 1,
      },
      user: {
        id: 4,
        firstName: "Lucas",
        lastName: "Martinez",
        role: "STUDENT",
        department: "Science",
        userMainId: "S004",
        userType: "Student",
        studentId: "S004",
      },
    },
    originalGrade: {
      id: 4,
      teachingAssignmentId: 1,
      studentId: 4,
      practical1: 80,
      practical1Type: "Lab Experiment",
      practical2: 0,
      practical2Type: "Lab Experiment",
      practical3: 0,
      practical3Type: "Lab Experiment",
      totalPractical: 80,
      practicalStatus: "GRADED",
      theory: 82,
      theoryStatus: "GRADED",
      totalMark: 81,
      gradeInLetter: "B",
    },
    teachingAssignment: {
      id: 1,
      teacherId: 1,
      sectionId: 1,
      courseId: 1,
      academicSemesterId: 1,
      academicYearId: 2024,
      level: "10th Grade",
      departmentId: 1,
      course: {
        id: 1,
        collegeId: 1,
        departmentId: 1,
        level: "10th Grade",
        courseCode: "SCI101",
        title: "Biology Fundamentals",
        theoryNhrs: 40,
        practicalNhrs: 20,
        cooperativeNhrs: 0,
        totalNhrs: 60,
        createdAt: "2024-09-01T08:00:00Z",
      },
      teacher: {
        id: 1,
        userId: 1,
        createdAt: "2024-08-01T09:00:00Z",
        updatedAt: "2024-08-01T09:00:00Z",
        user: {
          id: 1,
          firstName: "Jane",
          middleName: "Ann",
          lastName: "Smith",
          email: "jane.smith@school.edu",
          phoneNumber: "+1234567891",
          password: "hashedpassword456",
          userType: "Teacher",
          gender: "Female",
          nationality: "American",
          userMainId: "T001",
        },
      },
    },
  },
  {
    id: 5,
    regradeStatus: "REGISTRAR_UNDER_REVIEW",
    regradeReason: "Appeal after department approval",
    teachingAssignmentId: 2,
    studentId: 5,
    practical1: 87,
    practical1Type: "Project",
    practical2: 85,
    practical2Type: "Group Work",
    practical3: 0,
    practical3Type: "Group Work",
    totalPractical: 86,
    practicalStatus: "UNDER_REVIEW",
    theory: 89,
    theoryStatus: "UNDER_REVIEW",
    totalMark: 87.5,
    gradeInLetter: "B+",
    comment: "Registrar reviewing department-approved regrade",
    assessmentGroupId: 2,
    student: {
      student: {
        id: 5,
        studentTempId: 1005,
        userId: 5,
        placeOfBirthTown: "Lincoln",
        placeOfBirthZone: "Central",
        placeOfBirthRegion: "Nebraska",
        dateOfBirth: "2007-11-30",
        addressKebele: "Kebele 09",
        addressWoreda: "Woreda 10",
        addressTown: "Lincoln",
        addressZone: "Central",
        addressRegion: "Nebraska",
        phoneHome: "+1234567897",
        phoneOffice: "",
        maritalStatus: "Single",
        departmentId: 2,
        programId: 2,
        admissionTypeId: 1,
        listOfSlip: "Slip005",
        registrationDate: "2024-08-01",
        profilePicture: "olivia_taylor.jpg",
        currentStudyingYear: "2024",
        currentStudyingSemester: "Fall",
        currentStudyingLevel: "11th Grade",
        createdAt: "2024-08-01T08:00:00Z",
        updatedAt: "2024-08-01T08:00:00Z",
        sectionId: 2,
      },
      user: {
        id: 5,
        firstName: "Olivia",
        lastName: "Taylor",
        role: "STUDENT",
        department: "Mathematics",
        userMainId: "S005",
        userType: "Student",
        studentId: "S005",
      },
    },
    originalGrade: {
      id: 5,
      teachingAssignmentId: 2,
      studentId: 5,
      practical1: 82,
      practical1Type: "Project",
      practical2: 80,
      practical2Type: "Group Work",
      practical3: 0,
      practical3Type: "Group Work",
      totalPractical: 81,
      practicalStatus: "GRADED",
      theory: 85,
      theoryStatus: "GRADED",
      totalMark: 83,
      gradeInLetter: "B",
    },
    teachingAssignment: {
      id: 2,
      teacherId: 2,
      sectionId: 2,
      courseId: 2,
      academicSemesterId: 1,
      academicYearId: 2024,
      level: "11th Grade",
      departmentId: 2,
      course: {
        id: 2,
        collegeId: 1,
        departmentId: 2,
        level: "11th Grade",
        courseCode: "MATH201",
        title: "Algebra II",
        theoryNhrs: 50,
        practicalNhrs: 10,
        cooperativeNhrs: 0,
        totalNhrs: 60,
        createdAt: "2024-09-01T08:00:00Z",
      },
      teacher: {
        id: 2,
        userId: 2,
        createdAt: "2024-08-01T09:00:00Z",
        updatedAt: "2024-08-01T09:00:00Z",
        user: {
          id: 2,
          firstName: "Michael",
          middleName: "James",
          lastName: "Brown",
          email: "michael.brown@school.edu",
          phoneNumber: "+1234567893",
          password: "hashedpassword012",
          userType: "Teacher",
          gender: "Male",
          nationality: "American",
          userMainId: "T002",
        },
      },
    },
  },
  {
    id: 6,
    regradeStatus: "REGISTRAR_REJECTED",
    regradeReason: "Final review found no scoring issues",
    teachingAssignmentId: 3,
    studentId: 6,
    practical1: 78,
    practical1Type: "Lab Work",
      practical2: 0,
    practical2Type: "Lab Work",
    practical3: 0,
    practical3Type: "Lab Work",
    totalPractical: 78,
    practicalStatus: "REJECTED",
    theory: 80,
    theoryStatus: "REJECTED",
    totalMark: 79,
    gradeInLetter: "C+",
    comment: "Registrar rejected regrade after review",
    assessmentGroupId: 3,
    student: {
      student: {
        id: 6,
        studentTempId: 1006,
        userId: 6,
        placeOfBirthTown: "Madison",
        placeOfBirthZone: "South",
        placeOfBirthRegion: "Wisconsin",
        dateOfBirth: "2006-02-18",
        addressKebele: "Kebele 11",
        addressWoreda: "Woreda 12",
        addressTown: "Madison",
        addressZone: "South",
        addressRegion: "Wisconsin",
        phoneHome: "+1234567898",
        phoneOffice: "",
        maritalStatus: "Single",
        departmentId: 3,
        programId: 3,
        admissionTypeId: 1,
        listOfSlip: "Slip006",
        registrationDate: "2024-08-01",
        profilePicture: "ethan_garcia.jpg",
        currentStudyingYear: "2024",
        currentStudyingSemester: "Fall",
        currentStudyingLevel: "12th Grade",
        createdAt: "2024-08-01T08:00:00Z",
        updatedAt: "2024-08-01T08:00:00Z",
        sectionId: 3,
      },
      user: {
        id: 6,
        firstName: "Ethan",
        lastName: "Garcia",
        role: "STUDENT",
        department: "English",
        userMainId: "S006",
        userType: "Student",
        studentId: "S006",
      },
    },
    originalGrade: {
      id: 6,
      teachingAssignmentId: 3,
      studentId: 6,
      practical1: 78,
      practical1Type: "Lab Work",
      practical2: 0,
      practical2Type: "Lab Work",
      practical3: 0,
      practical3Type: "Lab Work",
      totalPractical: 78,
      practicalStatus: "GRADED",
      theory: 80,
      theoryStatus: "GRADED",
      totalMark: 79,
      gradeInLetter: "C+",
    },
    teachingAssignment: {
      id: 3,
      teacherId: 3,
      sectionId: 3,
      courseId: 3,
      academicSemesterId: 1,
      academicYearId: 2024,
      level: "12th Grade",
      departmentId: 3,
      course: {
        id: 3,
        collegeId: 1,
        departmentId: 3,
        level: "12th Grade",
        courseCode: "ENG301",
        title: "Literature and Composition",
        theoryNhrs: 45,
        practicalNhrs: 15,
        cooperativeNhrs: 0,
        totalNhrs: 60,
        createdAt: "2024-09-01T08:00:00Z",
      },
      teacher: {
        id: 3,
        userId: 3,
        createdAt: "2024-08-01T09:00:00Z",
        updatedAt: "2024-08-01T09:00:00Z",
        user: {
          id: 3,
          firstName: "David",
          middleName: "Lee",
          lastName: "Thompson",
          email: "david.thompson@school.edu",
          phoneNumber: "+1234567895",
          password: "hashedpassword678",
          userType: "Teacher",
          gender: "Male",
          nationality: "American",
          userMainId: "T003",
        },
      },
    },
  },
  {
    id: 7,
    regradeStatus: "APPROVED",
    regradeReason: "Scoring error corrected after registrar review",
    teachingAssignmentId: 1,
    studentId: 7,
    practical1: 95,
    practical1Type: "Lab Experiment",
    practical2: 0,
    practical2Type: "Lab Experiment",
    practical3: 0,
    practical3Type: "Lab Experiment",
    totalPractical: 95,
    practicalStatus: "APPROVED",
    theory: 92,
    theoryStatus: "APPROVED",
    totalMark: 93.5,
    gradeInLetter: "A",
    comment: "Regrade approved; updated scores applied",
    assessmentGroupId: 1,
    student: {
      student: {
        id: 7,
        studentTempId: 1007,
        userId: 7,
        placeOfBirthTown: "Springfield",
        placeOfBirthZone: "Central",
        placeOfBirthRegion: "Illinois",
        dateOfBirth: "2008-01-25",
        addressKebele: "Kebele 13",
        addressWoreda: "Woreda 14",
        addressTown: "Springfield",
        addressZone: "Central",
        addressRegion: "Illinois",
        phoneHome: "+1234567899",
        phoneOffice: "",
        maritalStatus: "Single",
        departmentId: 1,
        programId: 1,
        admissionTypeId: 1,
        listOfSlip: "Slip007",
        registrationDate: "2024-08-01",
        profilePicture: "sophia_rodriguez.jpg",
        currentStudyingYear: "2024",
        currentStudyingSemester: "Fall",
        currentStudyingLevel: "10th Grade",
        createdAt: "2024-08-01T08:00:00Z",
        updatedAt: "2024-08-01T08:00:00Z",
        sectionId: 1,
      },
      user: {
        id: 7,
        firstName: "Sophia",
        lastName: "Rodriguez",
        role: "STUDENT",
        department: "Science",
        userMainId: "S007",
        userType: "Student",
        studentId: "S007",
      },
    },
    originalGrade: {
      id: 7,
      teachingAssignmentId: 1,
      studentId: 7,
      practical1: 90,
      practical1Type: "Lab Experiment",
      practical2: null,
      practical2Type: "Lab Experiment",
      practical3: 0,
      practical3Type: "Lab Experiment",
      totalPractical: 90,
      practicalStatus: "GRADED",
      theory: 86,
      theoryStatus: "GRADED",
      totalMark: 88,
      gradeInLetter: "B+",
    },
    teachingAssignment: {
      id: 1,
      teacherId: 1,
      sectionId: 1,
      courseId: 1,
      academicSemesterId: 1,
      academicYearId: 2024,
      level: "10th Grade",
      departmentId: 1,
      course: {
        id: 1,
        collegeId: 1,
        departmentId: 1,
        level: "10th Grade",
        courseCode: "SCI101",
        title: "Biology Fundamentals",
        theoryNhrs: 40,
        practicalNhrs: 20,
        cooperativeNhrs: 0,
        totalNhrs: 60,
        createdAt: "2024-09-01T08:00:00Z",
      },
      teacher: {
        id: 1,
        userId: 1,
        createdAt: "2024-08-01T09:00:00Z",
        updatedAt: "2024-08-01T09:00:00Z",
        user: {
          id: 1,
          firstName: "Jane",
          middleName: "Ann",
          lastName: "Smith",
          email: "jane.smith@school.edu",
          phoneNumber: "+1234567891",
          password: "hashedpassword456",
          userType: "Teacher",
          gender: "Female",
          nationality: "American",
          userMainId: "T001",
        },
      },
    },
  },
];




const getRegrade = async (
  courseCode: string,
  mainId: string,
  teacherId: string
): Promise<any> => {
 /*  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/assessments/by-course-code-and-main-id?courseCode=${courseCode}&mainId=${mainId}&teacherId=${teacherId}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch assessment");
  } */

  return regradeAssessments[0];

  //return res.json();
};

export const useFetchRegrade = (
  courseCode: string,
  mainId: string,
  teacherId: string
) => {
  return useQuery({
    queryKey: ["regrade", courseCode, mainId, teacherId],
    queryFn: () => getRegrade(courseCode, mainId, teacherId),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
    
    enabled: Boolean(courseCode && mainId),
  });
};

// Interface for re-grade request filters
interface RegradeFilters {
  status?: "APPROVAL_REQUESTED" | "APPROVED" | "REJECTED";
/*   status?:
    | "DEPARTMENT_REQUESTED"
    | "REGISTRAR_UNDER_REVIEW"
    | "REGISTRAR_REJECTED"
    | "APPROVED"; */
  studentId?: number;
  teacherId?: number;
  departmentId?: number;
  academicYearId?: number;
  academicSemesterId?: number;
  page?: number;
  limit?: number;
}

// Interface for paginated re-grade response
interface RegradeRequestsResponse {
  data: RegradeAssesment[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const regradeRequests: RegradeRequestsResponse[] = [ 
  {
    data: regradeAssessments,
    total: regradeAssessments.length,
    page: 1,
    limit: 10,
    totalPages: 1,
  }]

// Fetch all re-grade requests with filters
const fetchRegradeRequests = async (
  filters: RegradeFilters = {}
): Promise<RegradeRequestsResponse> => {
  const queryParams = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      queryParams.append(key, value.toString());
    }
  });

 /*  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/regrade?${queryParams.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`
    );
  } */

  return regradeRequests[0];
};

const fetchAllRegradeRequestsByTeacher = async (teacherId: number): Promise<RegradeAssesmentResponse[]> => {    
  /* const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/regrade-requests/by-teacher/${teacherId}`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch regrade requests");
  }

  return response.json(); */
  return regradeAssessments
};
const fetchAllRegradeRequestsByDepartment = async (departmentId: number): Promise<RegradeAssesmentResponse[]> => {    
  /* const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/regrade-requests/by-department/${departmentId}`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch regrade requests");
  }

  return response.json(); */
  return regradeAssessments
};

const fetchAllRegradeRequests = async (): Promise<RegradeAssesmentResponse[]> => {
  /* const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/regrade-requests`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch regrade requests");
  }

  return response.json(); */
  return regradeAssessments
};
// Fetch single re-grade request by ID
const fetchRegradeRequestById = async (
  id: number
): Promise<RegradeAssesment> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/regrade/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`
    );
  }

  return response.json();
};

// Hook to fetch all re-grade requests with filters
export const useRegradeRequests = (filters: RegradeFilters = {}) => {
  return useQuery({
    queryKey: ["regradeRequests", filters],
    queryFn: () => fetchRegradeRequests(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};

export const useAllRegradeRequests = () => {
  return useQuery({
    queryKey: ["allRegradeRequests"],
    queryFn: () => fetchAllRegradeRequests(),
  });
};

// Hook to fetch single re-grade request
export const useRegradeRequest = (id: number) => {
  return useQuery({
    queryKey: ["regradeRequest", id],
    queryFn: () => fetchRegradeRequestById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};

// Hook to fetch re-grade requests for registrar dashboard
export const useRegistrarRegradeRequests = () => {
  return useQuery({
    queryKey: ["registrarRegradeRequests"],
    queryFn: () => fetchRegradeRequests({ status: "APPROVAL_REQUESTED" }),
    staleTime: 2 * 60 * 1000, // 2 minutes for more frequent updates
    refetchOnWindowFocus: true,
  });
};

// Hook to fetch re-grade requests by student
export const useStudentRegradeRequests = (studentId: number) => {
  return useQuery({
    queryKey: ["studentRegradeRequests", studentId],
    queryFn: () => fetchRegradeRequests({ studentId }),
    enabled: !!studentId,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

// Hook to fetch re-grade requests by teacher
export const useTeacherRegradeRequests = (teacherId: number) => {
  return useQuery({
    queryKey: ["teacherRegradeRequests", teacherId],
    queryFn: () => fetchAllRegradeRequestsByTeacher(teacherId),
    enabled: !!teacherId,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
// Hook to fetch re-grade requests by department
export const useDepartmentRegradeRequests = (departmentId: number) => {
  return useQuery({
    queryKey: ["departmentRegradeRequests", departmentId],
    queryFn: () => fetchAllRegradeRequestsByDepartment(departmentId),
    enabled: !!departmentId,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

// Hook to fetch re-grade statistics
export const useRegradeStats = () => {
  return useQuery({
    queryKey: ["regradeStats"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/regrade/stats`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      return response.json();
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });
};
