export interface StudentData {
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
