import { z } from "zod";

export const NoticeBoardSchema = z.object({
    college_id: z.number().positive('College is required'),
    department_id:z.number().positive('Department is required'),
    message:z.string().min(10, 'Message must be at least 10 character'),
    deadline:z.string().refine(val=>new Date(val) > new Date(),{
        message: 'Deadline must be in the future'
    }),
    is_active: z.boolean().default(true)
})