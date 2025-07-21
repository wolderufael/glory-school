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
    authorId: number;
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

export const getNotice = async (): Promise<Notice[]> => {
  const { data } = await axios.get<Notice[]>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/registrar-noticeboard`
  );
  data.reverse();
  return data;
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
