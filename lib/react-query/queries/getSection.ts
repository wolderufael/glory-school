export const getSection = async () => {
    try{
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/academicyears/current-year`);
      
      if (!res.ok) throw new Error('Failed to fetch academic year');
      
      return res.json();

    }
    catch (error) {
        console.error("Error fetching section data:", error);
        throw error;
    }
   
}

