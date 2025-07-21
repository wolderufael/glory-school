import { useQuery } from "@tanstack/react-query";
import { Assessment } from "@/utils/assessment";

const getRegrade = async (courseCode: string, mainId: string): Promise<Assessment>     => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/assessment-groups/by-course-code-and-main-id?courseCode=${courseCode}&mainId=${mainId}`
    );
    if (!res.ok) {
        throw new Error("Failed to fetch assessment");
    }

    return res.json();
};

export const useRegrade = (courseCode: string, mainId: string) => {
  return useQuery({
    queryKey: ["regrade", courseCode, mainId],
      queryFn: () => getRegrade(courseCode, mainId),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
    enabled: Boolean(courseCode && mainId),
  });
};
