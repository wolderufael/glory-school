
export interface Assessment {
  id: number;
  teachingAssignmentId: number;
  studentId: number;
  practical1?: number;
  practical2?: number;
  practical3?: number;
  totalPractical?: number;
  practicalStatus?: string;
  theory?: number;
  theoryStatus?: string;
  totalMark?: number;
  gradeInLetter?: string;
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
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
  practical1?: number;
  practical2?: number;
  practical3?: number;
  theory?: number;
  comment?: string;
}

export interface UpdateAssessmentRequest extends Partial<CreateAssessmentRequest> {
  id: number;
}

export interface AssessmentSubmission {
  teachingAssignmentId: number;
  assessments: CreateAssessmentRequest[];
}


export interface AssessmentInfoResponse {
  academicYear: { name: string },
  department: { name: string },
  section: { sectionName: string },
  course: { title: string },
  academicSemester: { name: string },
  id: number;
}
