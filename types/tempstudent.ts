export interface Department {
  id: number;
  name: string;
  code: string;
}


export interface ExcelStudent {
  "First Name": string;
  "Middle Name": string;
  "Last Name": string;
  Department: string;
}

export interface TempStudent {
  id?: number;
  registerId: number;
  academicYearId: number;
  firstName: string;
  middleName: string;
  lastName: string;
  departmentId: number;
  department?: {
    name: string;
  };
  studentMainId?: string;
}