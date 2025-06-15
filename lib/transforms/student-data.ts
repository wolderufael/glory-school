import type { StudentInfo } from "@/hooks/use-student-info";

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
  alternativeEmail: string;
  phoneHome: string;
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
  profilePicture: string;

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

export function transformStudentInfo(apiData: StudentInfo): StudentData {
  return {
    // Basic Information
    englishName: {
      firstName: "N/A",
      middleName: "N/A",
      lastName: "N/A",
    },
    amharicName: {
      firstName: "N/A",
      middleName: "N/A",
      lastName: "N/A",
    },
    email: "N/A",
    alternativeEmail: "N/A",
    phoneHome: apiData.phone_home || "N/A",
    phoneMobile: "N/A",
    dateOfBirth: apiData.date_of_birth || "N/A",
    gender: "N/A",
    nationality: "Ethiopian",
    maritalStatus: apiData.marital_status || "N/A",
    primaryLanguage: "Amharic",

    // Fayda Numbers
    faydaFAN: "N/A",
    faydaFIN: "N/A",

    // Graduation Information
    graduationDate: {
      month: "N/A",
      day: "N/A",
      year: "N/A",
    },

    // Profile Picture
    profilePicture: "/default-avatar.png",

    // Access Information
    username: apiData.student_temp_id || "N/A",
    lastLogin: "N/A",
    lastPasswordChange: "N/A",
    failedLogins: "0",
    ecardNumber: "N/A",

    // Classification Information
    program: `Program ${apiData.program_id}`,
    programType: "Regular",
    college: "N/A",
    department: `Department ${apiData.department_id}`,
    admissionYear: apiData.current_studying_year || "N/A",
    admissionDate: apiData.registration_date || "N/A",

    // Address Information
    region: apiData.address_region || "N/A",
    zone: apiData.address_zone || "N/A",
    woreda: apiData.address_woreda || "N/A",
    kebele: apiData.address_kebele || "N/A",
    houseNo: "N/A",

    // Emergency Contact
    emergencyContact: {
      name: "N/A",
      relation: "N/A",
      phone: "N/A",
    },

    // Educational Background
    primarySchool: {
      name: "N/A",
      region: "N/A",
      graduationYear: "N/A",
    },
    highSchool: {
      name: "N/A",
      region: "N/A",
      graduationYear: "N/A",
      stream: "N/A",
    },
    entranceExam: {
      totalScore: "N/A",
      englishScore: "N/A",
      mathScore: "N/A",
      physicsScore: "N/A",
      chemistryScore: "N/A",
      biologyScore: "N/A",
      civicsScore: "N/A",
      aptitudeScore: "N/A",
    },
  };
}
