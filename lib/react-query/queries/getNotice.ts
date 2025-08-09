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
    targetType: "Student" | "Teacher"
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


export const fetchMessages = async ({
  userId,
  userType,
}: {
  userId: number;
  userType: string;
}): Promise<MessageSchema[]> => {
  const { data } = await axios.get<MessageSchema[]>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/messages/by-target/${userType}/${userId}`
  );
  return data;
};
