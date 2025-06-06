import { useQuery } from "@tanstack/react-query";

export const useByteachingAssessment = (id: number) => {
  return useQuery({
    queryKey: ["byteachingAssessment", id],
    queryFn: () => getAssessment(id),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
    enabled: Boolean(id),
  });
};

