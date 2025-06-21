import z from "zod";

export const CreateSectionSchema = z.object({
        academicYearId: z.number()
          .min(1, 'Academic year is required')
          .max(10, 'Academic year must be 10 characters or less'),
        departmentId: z.number()
          .min(1, 'Department ID is required')
          .optional(),
        numberOfSection: z.number()
          .min(1, 'Number of sections is required')
          .optional()
});

export type CreateSectionFormData = z.infer<typeof CreateSectionSchema>;