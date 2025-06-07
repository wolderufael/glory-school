export const getTeachingAssignments = async (id:number) => {
    try{
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/teaching-assignments/by-teacher/${id}`);

        if (!res.ok) {
            throw new Error('Failed to fetch teaching assignments');
        }

        const data = await res.json();
        return data;

    }
    catch (error) {
        console.error("Error fetching teaching assignments:", error);
        throw new Error("Failed to fetch teaching assignments");
    }
}
