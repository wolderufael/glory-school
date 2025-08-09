/* export const getSection = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/academicyears/current-year`
    );

    if (!res.ok) throw new Error("Failed to fetch academic year");

    return res.json();
  } catch (error) {
    console.error("Error fetching section data:", error);
    throw error;
  }
}; */

import { sectionData } from "@/components/mockData";

export interface Section {  
  id: number;
  sectionName: string;
}
export const getSection = async (departmentId: string,level:string): Promise<Section[]> => {
  try {
   /*  const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/sections/by-department/${departmentId}/${level}`
    );



    if (!res.ok) throw new Error("Failed to fetch section");
  

    return res.json(); */
    return sectionData;
  } catch (error) {
    console.error("Error fetching section data:", error);
    throw error;
  }
};
