// Basic Information
export const basicInfo = {
  studentId: "AMU/1234/12",
  name: "John Doe",
  department: "Software Engineering",
  year: "3rd Year",
  semester: "2nd Semester",
  academicYear: "2023/24",
  program: "Regular",
  admissionType: "Regular",
};

// Exemptions
export const exemptions = [
  {
    id: 1,
    courseCode: "SE3201",
    courseName: "Software Engineering",
    creditHours: 3,
    reason: "Prior Learning",
    approvedBy: "Dr. Smith",
    approvedDate: "2023-09-15",
  },
  {
    id: 2,
    courseCode: "CS2102",
    courseName: "Data Structures",
    creditHours: 4,
    reason: "Transfer Credit",
    approvedBy: "Dr. Johnson",
    approvedDate: "2023-09-10",
  },
];

// Registrations
export const registrations = [
  {
    id: 1,
    semester: "1st Semester",
    academicYear: "2023/24",
    registrationDate: "2023-09-01",
    courses: [
      {
        courseCode: "SE3201",
        courseName: "Software Engineering",
        creditHours: 3,
        type: "Regular",
      },
      {
        courseCode: "CS3102",
        courseName: "Database Systems",
        creditHours: 4,
        type: "Regular",
      },
    ],
  },
  {
    id: 2,
    semester: "2nd Semester",
    academicYear: "2023/24",
    registrationDate: "2024-01-15",
    courses: [
      {
        courseCode: "SE3203",
        courseName: "Software Testing",
        creditHours: 3,
        type: "Regular",
      },
      {
        courseCode: "CS3104",
        courseName: "Operating Systems",
        creditHours: 4,
        type: "Regular",
      },
    ],
  },
];

// Course Adds
export const courseAdds = [
  {
    id: 1,
    courseCode: "SE3205",
    courseName: "Web Development",
    creditHours: 3,
    addDate: "2023-09-05",
    reason: "Schedule Conflict Resolution",
    status: "Approved",
  },
  {
    id: 2,
    courseCode: "CS3106",
    courseName: "Computer Networks",
    creditHours: 4,
    addDate: "2023-09-07",
    reason: "Prerequisite Met",
    status: "Pending",
  },
];

// Course Drops
export const courseDrops = [
  {
    id: 1,
    courseCode: "SE3207",
    courseName: "Mobile Development",
    creditHours: 3,
    dropDate: "2023-09-10",
    reason: "Schedule Conflict",
    status: "Approved",
  },
  {
    id: 2,
    courseCode: "CS3108",
    courseName: "Artificial Intelligence",
    creditHours: 4,
    dropDate: "2023-09-12",
    reason: "Personal",
    status: "Rejected",
  },
];

// Results
export const results = [
  {
    semester: "1st Semester",
    academicYear: "2023/24",
    courses: [
      {
        courseCode: "SE3201",
        courseName: "Software Engineering",
        creditHours: 3,
        grade: "A",
         result: 80,
        points: 4.0,
      },
      {
        courseCode: "CS3102",
        courseName: "Database Systems",
        creditHours: 4,
        grade: "B+",
         result: 90,
        points: 3.5,
      },
    ],
   
    gpa: 3.71,
  },
  {
    semester: "2nd Semester",
    academicYear: "2023/24",
    courses: [
      {
        courseCode: "SE3203",
        courseName: "Software Testing",
        creditHours: 3,
        grade: "A-",
         result: 98,
        points: 3.75,
      },
      {
        courseCode: "CS3104",
        courseName: "Operating Systems",
        creditHours: 4,
        grade: "B",
         result: 86,
        points: 3.0,
      },
    ],
    result: 75,
    gpa: 3.33,
  },
];

// Curriculum
export const curriculum = {
  program: "BSc in Software Engineering",
  totalCreditHours: 140,
  specialization: "Web and Mobile Development",
  courses: [
    {
      semester: 1,
      courses: [
        {
          courseCode: "SE3201",
          courseName: "Software Engineering",
          creditHours: 3,
          prerequisite: "None",
        },
        {
          courseCode: "CS3102",
          courseName: "Database Systems",
          creditHours: 4,
          prerequisite: "CS2101",
        },
      ],
    },
    {
      semester: 2,
      courses: [
        {
          courseCode: "SE3203",
          courseName: "Software Testing",
          creditHours: 3,
          prerequisite: "SE3201",
        },
        {
          courseCode: "CS3104",
          courseName: "Operating Systems",
          creditHours: 4,
          prerequisite: "CS2102",
        },
      ],
    },
  ],
};

// Billing
export const billing = {
  currentBalance: 25000,
  transactions: [
    {
      id: 1,
      date: "2023-09-01",
      description: "Semester Registration Fee",
      amount: 15000,
      type: "Debit",
      status: "Paid",
    },
    {
      id: 2,
      date: "2023-09-15",
      description: "Library Fee",
      amount: 500,
      type: "Debit",
      status: "Pending",
    },
    {
      id: 3,
      date: "2023-09-20",
      description: "Payment",
      amount: 10000,
      type: "Credit",
      status: "Completed",
    },
  ],
};
