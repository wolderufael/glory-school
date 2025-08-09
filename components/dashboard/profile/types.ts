export interface SectionData {
  id: string;
  name: string;
}

export interface StudentData {
  id: string;
  studentTempId: string;
  userId: string;
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
  departmentId: string;
  programId: string;
  admissionTypeId: string;
  listOfSlip: string;
  registrationDate: string;
  profilePicture: string;
  currentStudyingYear: string;
  currentStudyingSemester: string;
  currentStudyingLevel: string;
  createdAt: string;
  updatedAt: string;
  sectionId: string;
  user: UserData;
  emergencyContacts: EmergencyContactData[];
  parents: ParentData[];
  transcript: TranscriptData | null;
  pastSecondary: PastSecondaryEducation | null;
  employments: EmploymentData[];
  dormAssignment: DormAssignmentData | null;
  department: DepartmentData;
  program: ProgramData;
  admissionType: AdmissionTypeData;
  registrationSlips: RegistrationSlipData[];
  section?: SectionData;
}

export interface UserData {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  userType: string;
  gender: string;
  nationality: string;
  userMainId: string;
}

export interface DepartmentData {
  id: string;
  collegeId: string;
  name: string;
  code: string;
  createdAt: string;
}

export interface ProgramData {
  id: string;
  name: string;
}

export interface AdmissionTypeData {
  id: string;
  name: string;
}

export interface EmergencyContactData {
  id: number;
  studentId: number;
  fullName: string;
  phoneHome: string | null;
  phoneOffice: string | null;
  phoneMobile: string | null;
  addressKebele: string | null;
  addressWoreda: string | null;
  addressTown: string | null;
  addressZone: string | null;
  addressRegion: string | null;
  createdAt: string;
}

export interface ParentData {
  // Add parent fields as needed
}

export interface TranscriptData {
  grade5FilePath?: File | string;
  grade6FilePath?: File | string;
  grade7FilePath?: File | string;
  grade8FilePath?: File | string;
  examFilePath?: File | string;
  englishGrade?: number;
  mathsGrade?: number;
}

export interface PastSecondaryEducation {
  id: number;
  studentId: number;
  filePaths: string;
  createdAt: string;
}

export interface EmploymentData {
  // Add employment fields as needed
}

export interface DormAssignmentData {
  // Add dorm assignment fields as needed
}

export interface RegistrationSlipData {
  // Add registration slip fields as needed
}

//export interface
