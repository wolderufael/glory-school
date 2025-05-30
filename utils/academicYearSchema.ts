import { z } from 'zod';

export const academicYearSchema = z.object({
  name: z.string()
    .min(1, 'Academic year name is required')
    .max(20, 'Name must be 20 characters or less'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  semester1StartDate: z.string().min(1, 'Semester 1 start date is required'),
  semester1EndDate: z.string().min(1, 'Semester 1 end date is required'),
  semester2StartDate: z.string().min(1, 'Semester 2 start date is required'),
  semester2EndDate: z.string().min(1, 'Semester 2 end date is required'),
  semeester1RegistrationStartDate: z.string().min(1, 'Semester 1 registration start date is required'),
  semeester1RegistrationEndDate: z.string().min(1, 'Semester 1 registration end date is required'),
  semeester2RegistrationStartDate: z.string().min(1, 'Semester 2 registration start date is required'),
  semeester2RegistrationEndDate: z.string().min(1, 'Semester 2 registration end date is required'),
}).refine((data) => {
  const startDate = new Date(data.startDate);
  const endDate = new Date(data.endDate);
  return startDate < endDate;
}, {
  message: 'End date must be after start date',
  path: ['endDate'],
}).refine((data) => {
  const sem1Start = new Date(data.semester1StartDate);
  const sem1End = new Date(data.semester1EndDate);
  return sem1Start < sem1End;
}, {
  message: 'Semester 1 end date must be after start date',
  path: ['semester1EndDate'],
}).refine((data) => {
  const sem2Start = new Date(data.semester2StartDate);
  const sem2End = new Date(data.semester2EndDate);
  return sem2Start < sem2End;
}, {
  message: 'Semester 2 end date must be after start date',
  path: ['semester2EndDate'],
});

export type AcademicYearFormData = z.infer<typeof academicYearSchema>;
