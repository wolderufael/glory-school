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

export interface Section {  
  id: string;
  sectionName: string;
}
export const getSection = async (departmentId: string): Promise<Section[]> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/sections/by-department/${departmentId}`
    );



    if (!res.ok) throw new Error("Failed to fetch section");
  

    return res.json();
  } catch (error) {
    console.error("Error fetching section data:", error);
    throw error;
  }
};
