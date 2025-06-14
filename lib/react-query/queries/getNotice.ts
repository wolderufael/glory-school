import axios from "axios";

export interface Notice {
  college_id: number;
  department_id: number;
  message: string;
  deadline: string;
  is_active: boolean;
}

export const getNotice = async (): Promise<Notice[]> => {
  const { data } = await axios.get<Notice[]>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/noticeboard`
  );
  return data;
};
