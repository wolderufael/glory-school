import { unique } from "next/dist/build/utils";
import z from "zod";

export const userSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  middleName: z.string().optional(),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
  userMainId: z.string().min(1, 'Unique ID is required'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain uppercase, lowercase, and number'),
  confirmPassword: z.string(),
  userType: z.enum(['Student', 'Registrar', 'Teacher', 'Department', 'President']).default('Student'),
  gender: z.enum(['M', 'F']),
  nationality: z.string().min(1, 'Nationality is required')
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});


export type UserType = z.infer<typeof userSchema>;


