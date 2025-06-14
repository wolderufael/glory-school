import { z } from "zod";

export const NoticeBoardSchema = z.object({
  collegeId: z.number(),
  departmentId: z.number(),
  message: z.string().min(1, "Message is required"),
  deadline: z.string().datetime(),
  authorId: z.number(),
});

export type NoticeBoardSchema = z.infer<typeof NoticeBoardSchema>;
