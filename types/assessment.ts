export interface User {
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
}

export interface Teacher {
  id: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Section {
  id: number;
  sectionName: string;
  academicYearId: number;
  createdAt: string;
  departmentId: number;
}

export interface Course {
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
}

export interface AcademicSemester {
  id: number;
  name: string;
  academicYearId: number;
  startDate: string;
  endDate: string;
  registrationStartDate: string;
  registrationEndDate: string;
  createdAt: string;
}

export interface TeachingAssignment {
  id: number;
  teacherId: number;
  sectionId: number;
  courseId: number;
  academicSemesterId: number;
  academicYearId: number;
  level: string;
  departmentId: number;
  teacher: Teacher;
  section: Section;
  course: Course;
  academicSemester: AcademicSemester;
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
  profilePicture: string | null;
  currentStudyingYear: string;
  currentStudyingSemester: string;
  currentStudyingLevel: string;
  createdAt: string;
  updatedAt: string;
  sectionId: number;
  user: User;
}

export interface StudentAssessment {
  id: number;
  teachingAssignmentId: number;
  studentId: number;
  practical1: number;
  practical2: number;
  practical3: number;
  totalPractical: number;
  practicalStatus: string;
  theory: number;
  theoryStatus: string;
  totalMark: number;
  gradeInLetter: string | null;
  comment: string;
  createdAt: string;
  updatedAt: string;
  teachingAssignment: TeachingAssignment;
  student: Student;
}
