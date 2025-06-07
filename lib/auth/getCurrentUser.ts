
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { UserType } from '@/utils/typeUser';



export async function getCurrentUser(): Promise<{ id: string; role: UserType } | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) return null;

  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      role: UserType;
    };
  } catch {
    return null;
  }
}
