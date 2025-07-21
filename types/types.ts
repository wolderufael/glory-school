export interface User {
  id: number;
  firstName: string;
  lastName: string;
  role:
    | "STUDENT"
    | "REGISTRAR"
    | "DEPARTMENT"
    | "ADMIN"
    | "PRESIDENT"
    | "TEACHER";
  department?: string;
  userMainId?: string;
  studentId?: string;
  userType?: string;
  student?: Student;
}

export interface Student {
  id: number;
  studentTempId: number;
  userId: number;
  placeOfBirthTown: string;
  placeOfBirthZone: string;
  placeOfBirthRegion: string;
  dateOfBirth: string;
  addressKebele: string;
  addressWoreda: string;
  addressTown: string;
  addressZone: string;
  addressRegion: string;
  phoneHome: string;
  phoneOffice: string;
  maritalStatus: string;
  departmentId: number;
  programId: number;
  admissionTypeId: number;
  listOfSlip: string;
  registrationDate: string;
  profilePicture: string;
  currentStudyingYear: string;
  currentStudyingSemester: string;
  currentStudyingLevel: string;
  createdAt: string;
  updatedAt: string;
  sectionId: number;
}


export interface Semester {
  id: number;
  name: string;
  academicYearId: number;
  startDate: string;
  endDate: string;
  registrationStartDate: string;
  registrationEndDate: string;
  status: "OPEN" | "CLOSED" | "UPCOMING";
  createdAt: string;
}

export interface AcademicYear {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  semester1StartDate: string;
  semester1EndDate: string;
  semester2StartDate: string;
  semester2EndDate: string;
  semeester1RegistrationStartDate: string;
  semeester1RegistrationEndDate: string;
  semeester2RegistrationStartDate: string;
  semeester2RegistrationEndDate: string;
  createdAt: string;
  status: "OPEN" | "CLOSED";
  semesters: Semester[];
}

export interface AssessmentGroup {
  id: number;
  name: string;
  status:
    | "DRAFT"
    | "SUBMISSION_REQUESTED"
    | "DEPARTMENT_UNDER_REVIEW"
    | "DEPARTMENT_APPROVED"
    | "DEPARTMENT_REJECTED"
    | "REGISTRAR_UNDER_REVIEW"
    | "REGISTRAR_REJECTED"
    | "APPROVED";
  level: string;
  departmentId: number;
  teachingAssignmentId: number;
  sectionId: number;
  createdAt: string;
  updatedAt: string;
  department: {
    id: number;
    collegeId: number;
    name: string;
    code: string;
    createdAt: string;
  };
  section: {
    id: number;
    sectionName: string;
    createdAcademicYearId: number;
    createdAt: string;
    departmentId: number;
    currentLevel: string;
  };
  teachingAssignment: {
    id: number;
    teacherId: number;
    sectionId: number;
    courseId: number;
    academicSemesterId: number;
    academicYearId: number;
    level: string;
    departmentId: number;
    course: {
      id: number;
      collegeId: number;
      departmentId: number;
      level: string;
      courseCode: string;
      title: string;
      theoryNhrs: number;
      practicalNhrs: number;
      cooperativeNhrs: number;
      totalNhrs: number;
      createdAt: string;
    };
    teacher: {
      id: number;
      userId: number;
      createdAt: string;
      updatedAt: string;
      user: {
        id: number;
        firstName: string;
        middleName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
        password: string;
        userType: string;
        gender: string;
        nationality: string;
        userMainId: string;
      };
    };
  };
}

  export interface ReregistrationResponse {
  academicSemester: Semester;
  academicYear: AcademicYear;
  hasPassed: boolean;
  isReregistered: boolean;
  gpa: number;
  cgpa: number;
}

export interface ReregistrationData {
  student: Student;
  reregistration: ReregistrationResponse;
}

export interface Course {
  id: string;
  title: string;
  code: string;
  level: string;
  nominalHour: number;
}

export interface StudentApiResponse {
  id: number;
  studentTempId: number;
  userId: number;
  department: {
    id: number;
    collegeId: number;
    name: string;
    code: string;
  };
  program: {
    id: number;
    name: string;
  };
  admissionType: {
    id: number;
    name: string;
  };
  currentStudyingYear: string;
  currentStudyingSemester: string;
  currentStudyingLevel: string;
  registrationSlips: Array<{
    id: number;
    year: string;
    semester: string;
    departmentId: number;
    collegeId: number;
    level: string;
    courseIds: string;
    generatedAt: string;
  }>;
}


export interface RegistrationSlip {
  id: number;
  year: string;
  semester: string;
  collegeId: number;
  departmentId: number;
  level: string;
  courseIds: string;
  academicYear: AcademicYear;
  academicSemester: Semester;
  courses: Course[];
  student: {
    registrationSlips: Array<{
      id: number;
      year: string;
      semester: string;
      departmentId: number;
      collegeId: number;
      level: string;
      courseIds: string;
    }>;
  };
}


