export const getDepartment = async (departmentId: number) => {
    try {
        /* const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/students/count/by-department-section?departmentId=${departmentId}`
        );
        if (!res.ok) throw new Error('Failed to fetch student count');
        const data = await res.json(); */
        return 2;
    } catch (error) {
        console.error("Error fetching student count:", error);
            return 0; 
        }
    };

/* export const getDepartment = async () => {
  try {
    const res = await fetch(
     
      `${process.env.NEXT_PUBLIC_BASE_URL}/departments`
    );
    if (!res.ok) throw new Error("Failed to fetch student count");
    const data = await res.json();
    return data.count || 0;
  } catch (error) {
    console.error("Error fetching student count:", error);
    return 0; 
  }
}; */
