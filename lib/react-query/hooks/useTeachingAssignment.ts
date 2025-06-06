import { useQuery } from "@tanstack/react-query";
import { get } from "http";
import { getTeachingAssignments } from "../queries/getteaching-assignments";

export const useTeachingAssignment = (id: number) => {
  return useQuery({
    queryKey: ["teachingAssignments", id],
    queryFn: () => getTeachingAssignments(id),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
    enabled: Boolean(id),
  });
};