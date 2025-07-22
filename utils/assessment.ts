export interface Assessment {
  id: number;
  teachingAssignmentId: number | null;
  studentId: number | null;
  practical1?: number | null;
  practical2?: number | null;
  practical3?: number | null;
  practical1Type?: string;
  practical2Type?: string;
  practical3Type?: string;
  totalPractical?: number;
  practicalStatus?: string;
  theory?: number | null;
  theoryStatus?: string;
  totalMark?: number;
  gradeInLetter?: string;
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
  assessmentGroup?: AssessmentGroup;
}

export interface TeachingAssignment {
  id: number;
  teacherId: number;
  sectionId: number;
  courseId: number;
  academicSemesterId: number;
}

export interface CreateAssessmentRequest {
  teachingAssignmentId: number;
  studentId: number;
  practical1?: number | null;
  practical2?: number | null;
  practical3?: number | null;
  practical1Type?: string;
  practical2Type?: string;
  practical3Type?: string;
  totalPractical?: number;
  practicalStatus?: string;
  theory?: number | null;
  theoryStatus?: string;
  totalMark?: number;
  gradeInLetter?: string;
  comment?: string;
}

export interface UpdateAssessmentRequest
  extends Partial<CreateAssessmentRequest> {
  id: number;
}

export interface AssessmentSubmission {
  teachingAssignmentId: number;
  assessmentGroupId: number;
  assessments: CreateAssessmentRequest[];
}

export interface AssessmentInfoResponse {
  academicYear: { name: string };
  department: { name: string };
  section: { sectionName: string };
  course: { title: string };
  academicSemester: { name: string };
  id: number;
}

export interface AssessmentGroup {
  id: number;
  name: string;
  status: string;
  level: string;
  departmentId: number;
  teachingAssignmentId: number;
  sectionId: number;
  reason: string | null;
  createdAt: Date;
  updatedAt: Date;
}
