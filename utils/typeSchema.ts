import { count } from 'console';
import { address, em } from 'framer-motion/client';
import {z} from 'zod';
import { de, fa, pl } from 'zod/v4/locales';

export const StudentSchema = z.object({
    id: z.string(),
    firstName: z.string(),
    middleName: z.string(),
    lastName: z.string(),
    departmentId: z.number(),


});


export type Student = z.infer<typeof StudentSchema>;


export const FullInfo = z.object({
  student_id: z.string().min(1, "Student ID is required"),
  student_temp_id: z.string(),
  firstName: z.string().min(1, "First name is required"),
  fatherName: z.string().min(1, "Father's name is required"),
  grandFather_Name: z.string().min(1, "Grandfather's name is required"),
  sex: z.enum(['M', 'F']),
  nationality: z.string().optional(),
  phone_Number: z.string().optional(),
  email: z.string().email("Invalid email format").optional().or(z.literal('')),
  place_of_birth_town: z.string().optional(),
  place_of_birth_zone: z.string().optional(),
  place_of_birth_region: z.string().optional(),
  date_of_birth: z.string().min(1, "Date of birth is required"),
  address_kebele: z.string().optional(),
  address_woreda: z.string().optional(),
  address_zone: z.string().optional(),
  address_region: z.string().optional(),
  address_town: z.string().optional(),
  currentYear: z.string().min(1, "Current year is required"),
  currentSemester: z.string().min(1, "Current semester is required"),
  currentLevel: z.string().min(1, "Current academic year is required"),
  phone_home: z.string().optional(),
  phone_mobile: z.string().min(1, "Mobile phone is required"),
  phone_office: z.string().optional(),
  department_id: z.number().min(1, "Department is required"),
  // program_id: z.number().min(1, "Program ID is required"),
  admission_type_id: z.number().min(1, "Admission type is required"),
  // registration_date: z.string().min(1, "Registration date is required"),
  MaritalStatus: z.enum(['SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED'])
});

export type StudentFullInfo = z.infer<typeof FullInfo>;

export const parentInfo = z.object({
    id: z.string(),
    student_id: z.string(),
    parent_type: z.enum(['FATHER', 'MOTHER', 'GUARDIAN']),
    full_name: z.string(),
    occupation: z.string().optional(),
    education_level: z.string().optional(),
    address_house_no: z.string().optional(),
    address_kebele: z.string().optional(),
    address_woreda: z.string().optional(),
    address_zone: z.string().optional(),
    address_region: z.string().optional(),
    phone: z.string().min(1, "Phone number is required"),
    po_box: z.string().optional(),
})

export type ParentInfoType = z.infer<typeof parentInfo>;


export const SecondarySchoolInfo = z.object({
    id: z.string(),
    student_id: z.string(),
    school_name: z.string(),
    town: z.string().optional(),
    year_from: z.date(),
    year_to: z.date(),
    last_grade_completed:z.enum(['9', '10', '11', '12']),
})

export type SecondarySchoolInfoType = z.infer<typeof SecondarySchoolInfo>;


export const emergencyContact = z.object({
    id: z.string(),
    student_id: z.string(),
    full_name: z.string(),
    phone_home: z.string().optional(),
    phone_mobile: z.string(),
    phone_office: z.string().optional(),
    address_kebele: z.string().optional(),
    address_woreda: z.string().optional(),
    address_zone: z.string().optional(),
    address_region: z.string().optional(),
    address_town: z.string().optional(),
});
export type EmergencyContactType = z.infer<typeof emergencyContact>;


export const TranscriptSchema = z.object({
  transcript_id: z.number().int().positive().optional(),
  grade_9_file_path: z.string().min(1, "Grade 9 file path is required"),
  grade_10_file_path: z.string().min(1, "Grade 10 file path is required"),
  grade_11_file_path: z.string().min(1, "Grade 11 file path is required"),
  grade_12_file_path: z.string().min(1, "Grade 12 file path is required"),
  exam_file_path: z.string().min(1, "Exam file path is required"),
  english_grade: z.number().int().min(0).max(100),
  maths_grade: z.number().int().min(0).max(100),
 
});

export const PastSecondarySchoolSchema = z.object({
  past_secondary_id: z.number().int().positive().optional(),
  file_paths: z.string().optional(),
});


export type Transcript = z.infer<typeof TranscriptSchema>;
export type PastSecondarySchool = z.infer<typeof PastSecondarySchoolSchema>;





export const EmploymentHistory = z.object({
    employment_id: z.number().int().positive().optional(), // Primary Key, Auto Increment (handled by DB)
    student_id: z.string().min(1), // VARCHAR(20), Not Null, Foreign Key
    is_current: z.enum(['Yes', 'No']), // ENUM('Yes', 'No'), Not Null
    type_of_job: z.string().max(50).optional(), // VARCHAR(50)
    employer: z.string().max(100).optional(), // VARCHAR(100)
    mailing_address: z.string().max(255).optional(), // VARCHAR(255)
    telephone: z.string().max(20).optional(), // VARCHAR(20)
    service_years_from: z.number().int().min(1900).max(2100).optional(), // YEAR
    service_years_to: z.number().int().min(1900).max(2100).optional(), // YEAR
    created_at: z.date().default(() => new Date()), // TIMESTAMP, Not Null
});
export type EmploymentHistoryType = z.infer<typeof EmploymentHistory>;
