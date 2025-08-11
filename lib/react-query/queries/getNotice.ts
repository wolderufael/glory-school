import axios from "axios";

interface Author {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface MessageSchema {
  id: number;
  title: string;
  message: string;
  deadline?: string;
  senderType: "Student" | "Teacher" | "Department" | "Registrar";
  targetIds: number[] | undefined;
  author: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
  };
  targetType: "Student" | "Teacher";
  is_active?: boolean;
  createdAt?: string;
}

export interface Notice {
  id: number;
  title: string;
  message: string;
  deadline: string;
  publishedAt: string;
  isActive: boolean;
  authorId: number;
  author: Author;
}

const notices: Notice[] = [
  {
    id: 1,
    title: "Parent-Teacher Conference Schedule",
    message:
      "Dear Parents and Guardians, the annual parent-teacher conference for grades 9-12 is scheduled for September 15, 2025. Please book your slot through the school portal by September 10 to discuss your child's progress with their teachers.",
    deadline: "2025-09-10T23:59:59Z",
    publishedAt: "2025-08-09T15:00:00Z",
    isActive: true,
    authorId: 1,
    author: {
      id: 1,
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@school.edu",
    },
  },
  {
    id: 2,
    title: "Science Fair Registration Open",
    message:
      "Students in grades 10-12 are invited to participate in the Annual High School Science Fair on October 20, 2025. Register your project by October 1. Contact the Science Department for guidelines and project ideas!",
    deadline: "2025-10-01T23:59:59Z",
    publishedAt: "2025-08-09T10:00:00Z",
    isActive: true,
    authorId: 2,
    author: {
      id: 2,
      firstName: "Michael",
      lastName: "Brown",
      email: "michael.brown@school.edu",
    },
  },
  {
    id: 3,
    title: "School Club Fair Announcement",
    message:
      "Join us for the School Club Fair on September 5, 2025, during lunch period in the gymnasium. Explore clubs like Debate, Robotics, and Art, and sign up to get involved. Open to all high school students!",
    deadline: "2025-09-05T14:00:00Z",
    publishedAt: "2025-08-09T08:00:00Z",
    isActive: true,
    authorId: 3,
    author: {
      id: 3,
      firstName: "David",
      lastName: "Thompson",
      email: "david.thompson@school.edu",
    },
  },
  {
    id: 4,
    title: "Winter Break Schedule Update",
    message:
      "The school will be closed for winter break from December 20, 2025, to January 5, 2026. Please ensure all assignments are submitted before the break. Have a safe and happy holiday!",
    deadline: "2025-12-20T23:59:59Z",
    publishedAt: "2025-08-09T12:00:00Z",
    isActive: true,
    authorId: 4,
    author: {
      id: 4,
      firstName: "Lisa",
      lastName: "Anderson",
      email: "lisa.anderson@school.edu",
    },
  },
  {
    id: 5,
    title: "Sports Tryouts for Spring Season",
    message:
      "Tryouts for spring sports (track, soccer, and baseball) will begin on February 10, 2026. Sign up by February 1 through the school website. Open to all grades 9-12. Contact the Athletics Department for more details.",
    deadline: "2026-02-01T23:59:59Z",
    publishedAt: "2025-08-09T09:00:00Z",
    isActive: true,
    authorId: 5,
    author: {
      id: 5,
      firstName: "Robert",
      lastName: "Clark",
      email: "robert.clark@school.edu",
    },
  },
];

export const getNotice = async (): Promise<Notice[]> => {
  /* const { data } = await axios.get<Notice[]>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/registrar-noticeboard`
  );
  data.reverse();
  return data; */
  return notices;
};

const messages: MessageSchema[] = [
  {
    id: 1,
    title: "Grade Review Notification",
    message:
      "Your grade for Mathematics has been reviewed and updated. Please check your transcript for the latest information.",
    deadline: "2025-09-15T23:59:59Z",
    senderType: "Department",
    targetIds: [1, 2, 3],
    author: {
      id: 1,
      firstName: "Dr. Sarah",
      lastName: "Wilson",
      email: "sarah.wilson@school.edu",
      phoneNumber: "+1-555-0123",
    },
    targetType: "Student",
    is_active: true,
    createdAt: "2025-08-10T10:00:00Z",
  },
  {
    id: 2,
    title: "Assignment Deadline Reminder",
    message:
      "This is a reminder that your research paper for English Literature is due tomorrow. Please submit it through the student portal.",
    deadline: "2025-08-12T23:59:59Z",
    senderType: "Teacher",
    targetIds: [1, 4, 5],
    author: {
      id: 2,
      firstName: "Ms. Jennifer",
      lastName: "Davis",
      email: "jennifer.davis@school.edu",
      phoneNumber: "+1-555-0124",
    },
    targetType: "Student",
    is_active: true,
    createdAt: "2025-08-11T14:30:00Z",
  },
  {
    id: 3,
    title: "Course Registration Open",
    message:
      "Course registration for the next semester is now open. Please log into the student portal to select your courses before the deadline.",
    deadline: "2025-09-01T23:59:59Z",
    senderType: "Registrar",
    targetIds: [1, 2, 3, 4, 5, 6],
    author: {
      id: 3,
      firstName: "Mr. John",
      lastName: "Martinez",
      email: "john.martinez@school.edu",
      phoneNumber: "+1-555-0125",
    },
    targetType: "Student",
    is_active: true,
    createdAt: "2025-08-08T09:00:00Z",
  },
  {
    id: 4,
    title: "Scholarship Opportunity",
    message:
      "A new scholarship opportunity is available for students with outstanding academic performance. Applications are due by the end of the month.",
    deadline: "2025-08-31T23:59:59Z",
    senderType: "Department",
    targetIds: [1, 2],
    author: {
      id: 4,
      firstName: "Dr. Emily",
      lastName: "Johnson",
      email: "emily.johnson@school.edu",
      phoneNumber: "+1-555-0126",
    },
    targetType: "Student",
    is_active: true,
    createdAt: "2025-08-05T11:15:00Z",
  },
  {
    id: 5,
    title: "Library Book Return Reminder",
    message:
      "You have overdue books that need to be returned to the library. Please return them as soon as possible to avoid additional fees.",
    deadline: "2025-08-20T23:59:59Z",
    senderType: "Department",
    targetIds: [3, 5],
    author: {
      id: 5,
      firstName: "Ms. Patricia",
      lastName: "Lee",
      email: "patricia.lee@school.edu",
      phoneNumber: "+1-555-0127",
    },
    targetType: "Student",
    is_active: true,
    createdAt: "2025-08-07T16:45:00Z",
  },
];

export const fetchMessages = async ({
  userId,
  userType,
}: {
  userId: number;
  userType: string;
}): Promise<MessageSchema[]> => {
  /* const { data } = await axios.get<MessageSchema[]>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/messages/by-target/${userType}/${userId}`
  );
  return data; */

  // Filter messages based on userType and userId for more realistic behavior
  return messages.filter(
    (message) =>
      message.targetType === userType &&
      (message.targetIds?.includes(userId) || message.targetIds === undefined)
  );
};
