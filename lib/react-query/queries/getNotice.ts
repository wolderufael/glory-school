import axios from "axios";

interface Author {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
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
