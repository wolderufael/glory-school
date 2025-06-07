import  { useQuery } from '@tanstack/react-query';

export const getStudent = async ()=>{
   try {
       const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/students/`);
       if (!res.ok) throw new Error('Failed to fetch student data');
       return res.json();
   } catch (error) {
       console.error("Error fetching student data:", error);
       throw error;
   }
}

export const getStudentForMarkList = async (teacherId: string,academicYearId: string, semesterId: string, level: string, departmentId: string,sectionId: string,moduleId: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/students/mark-list/${teacherId}/${academicYearId}/${semesterId}/${level}/${departmentId}/${sectionId}/${moduleId}`);
    if (!res.ok) throw new Error('Failed to fetch student data');
    return res.json();
  } catch (error) {
    console.error("Error fetching student data:", error);
    throw error;
  }
};

