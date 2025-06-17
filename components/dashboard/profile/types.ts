/* export interface StudentData {
  // Basic Information
  englishName: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
  amharicName: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
  email: string;
  alternativeEmail?: string;
  phoneHome?: string;
  phoneMobile: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  maritalStatus: string;
  primaryLanguage: string;

  // Fayda Numbers
  faydaFAN: string;
  faydaFIN: string;

  // Graduation Information
  graduationDate: {
    month: string;
    day: string;
    year: string;
  };

  // Profile Picture
  profilePicture?: string;

  // Access Information
  username: string;
  lastLogin: string;
  lastPasswordChange: string;
  failedLogins: string;
  ecardNumber: string;

  // Classification Information
  program: string;
  programType: string;
  college: string;
  department: string;
  admissionYear: string;
  admissionDate: string;

  // Address Information
  region: string;
  zone: string;
  woreda: string;
  kebele: string;
  houseNo: string;

  // Emergency Contact
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };

  // Educational Background
  primarySchool: {
    name: string;
    region: string;
    graduationYear: string;
  };
  highSchool: {
    name: string;
    region: string;
    graduationYear: string;
    stream: string;
  };
  entranceExam: {
    totalScore: string;
    englishScore: string;
    mathScore: string;
    physicsScore: string;
    chemistryScore: string;
    biologyScore: string;
    civicsScore: string;
    aptitudeScore: string;
  };
}

 */

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
  pastSecondary: PastSecondaryData | null;
  employments: EmploymentData[];
  dormAssignment: DormAssignmentData | null;
  department: DepartmentData;
  program: ProgramData;
  admissionType: AdmissionTypeData;
  registrationSlips: RegistrationSlipData[];
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
  // Add emergency contact fields as needed
}

export interface ParentData {
  // Add parent fields as needed
}

export interface TranscriptData {
  // Add transcript fields as needed
}

export interface PastSecondaryData {
  // Add past secondary education fields as needed
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
