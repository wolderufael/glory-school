export const grade = [
  {
    id: 1,
    schoolId: 1,
    name: "Grade 9",
    code: "G9",
    createdAt: "2025-05-28T09:36:00.000Z",
  },
  {
    id: 2,
    schoolId: 1,
    name: "Grade 10",
    code: "G10",
    createdAt: "2025-05-28T09:36:00.000Z",
  },
  {
    id: 3,
    schoolId: 1,
    name: "Grade 11",
    code: "G11",
    createdAt: "2025-05-28T09:36:00.000Z",
  },
  {
    id: 4,
    schoolId: 1,
    name: "Grade 12",
    code: "G12",
    createdAt: "2025-05-28T09:36:00.000Z",
  },
];

export const sectionData = [
  {
    id: 30,
    sectionName: "Section1",
    createdAcademicYearId: 1,
    createdAt: "2025-08-09T14:07:33.066Z",
    departmentId: 1,
    currentLevel: "I",
    isDefaultSection: false,
  },
];

 
export const mockStudentData= {
  id: 1,
  studentTempId: "TEMP123456",
  userId: 101,
  placeOfBirthTown: "Addis Ababa",
  placeOfBirthZone: "Addis Ababa Zone",
  placeOfBirthRegion: "Addis Ababa",
  dateOfBirth: "2000-05-15",
  addressKebele: "Kebele 05",
  addressWoreda: "Yeka",
  addressTown: "Addis Ababa",
  addressZone: "Addis Ababa Zone",
  addressRegion: "Addis Ababa",
  phoneHome: "+251912345678",
  phoneOffice: "+251911234567",
  maritalStatus: "Single",
  departmentId: 1,
  programId: 1,
  admissionTypeId: 1,
  listOfSlip: "slip_001,slip_002",
  registrationDate: "2023-09-01",
  profilePicture: "/mug-shot.jpg",
  currentStudyingYear: "2",
  currentStudyingSemester: "1",
  currentStudyingLevel: "Undergraduate",
  createdAt: "2023-09-01T10:00:00Z",
  updatedAt: "2023-09-10T12:00:00Z",
  sectionId: 1,
  user: {
    id: 101,
    firstName: "Abebe",
    middleName: "Kebede",
    lastName: "Tadesse",
    email: "abebe.tadesse@example.com",
    phoneNumber: "+251912345678",
    userType: "Student",
    gender: "Male",
    nationality: "Ethiopian",
    userMainId: "main_001",
  },
  emergencyContacts: [
    {
      id: 1,
      studentId: 1,
      fullName: "Muluwork Tadesse",
      phoneHome: "+251911111111",
      phoneOffice: null,
      phoneMobile: "+251922222222",
      addressKebele: "Kebele 03",
      addressWoreda: "Bole",
      addressTown: "Addis Ababa",
      addressZone: "Addis Ababa Zone",
      addressRegion: "Addis Ababa",
      createdAt: "2023-09-01T10:00:00Z",
    },
  ],
  parents: [
    {
      // Placeholder for parent data
      id: "parent_001",
      fullName: "Tadesse Bekele",
      relationship: "Father",
    },
  ],
  transcript: {
    grade5FilePath: "/transcript.pdf",
    grade6FilePath: "/transcript.pdf",
    grade7FilePath: "/transcript.pdf",
    grade8FilePath: "/transcript.pdf",
    examFilePath: "/exam-result.pdf",
    englishGrade: 85,
    mathsGrade: 90,
  },

  employments: [
    {
      // Placeholder for employment data
      id: "emp_001",
      jobTitle: "Part-time Tutor",
      employer: "Local School",
    },
  ],
  dormAssignment: {
    // Placeholder for dorm assignment data
    id: "dorm_001",
    roomNumber: "A-101",
  },
  department: {
    id: 1,
    collegeId: 1,
    name: "Grade 10",
    code: "G10",
    createdAt: "2020-01-01T00:00:00Z",
  },
  program: {
    id: 1,
    name: "Grade 10",
  },
  admissionType: {
    id: 1,
    name: "Regular",
  },
  registrationSlips: [
    {
      // Placeholder for registration slip data
      id: 1,
      slipNumber: "REG2023-001",
    },
  ],
  section: {
    id: 1,
    name: "Section A",
  },
};