import z from "zod"
export const LoginSchema = z.object({
    mainId:z.string().min(6, "mainId is required"),
    password:z.string().min(8, 'Password must be at least 8 characters').regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain uppercase, lowercase, and number'),

})

export type LoginType = z.infer<typeof LoginSchema>;