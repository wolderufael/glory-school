import { z } from "zod";

export const NoticeBoardSchema = z.object({
  title: z.string().min(1, "Title is required"),
  collegeId: z.number(),
  //departmentId: z.number(),
  message: z.string().min(1, "Message is required"),
  deadline: z.string().datetime(),
  authorId: z.number(),
});
export const RegNoticeBoardSchema = z.object({
  title: z.string().min(1, "Title is required"),
  //collegeId: z.number(),
  message: z.string().min(1, "Message is required"),
  deadline: z.string().datetime(),
  authorId: z.number(),
});

export type NoticeBoardSchema = z.infer<typeof NoticeBoardSchema>;
export type RegNoticeBoardSchema = z.infer<typeof RegNoticeBoardSchema>;