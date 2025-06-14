
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { UserType } from '@/utils/typeUser';
import { decrypt } from '@/utils/generateToken';



// export async function getCurrentUser(): Promise<{ id: string; role: UserType } | null> {
//   const cookieStore = await cookies();
//   const token = cookieStore.get('token')?.value;

//   if (!token) return null;

//   try {
//     return jwt.verify(token, process.env.JWT_SECRET!) as {
//       id: string;
//       role: UserType;
//     };
//   } catch {
//     return null;
//   }
// }


export async function getSession() {
  const cookie = await cookies();
  const sessionCookie = cookie.get("session")?.value;

  if (!sessionCookie) return null;

  try {
    const session = await decrypt(sessionCookie);
    return session; 
  } catch (error) {
    return null;
  }
}


export const getUserFromClientCookie = () => {
  const cookie = document.cookie
    .split('; ')
    .find((row) => row.startsWith('session='));
  if (!cookie) return null;

  const token = cookie.split('=')[1];
  return decodeJWT(token);
};


export const decodeJWT = (token: string) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
};