"use client";

import { useQuery } from "@tanstack/react-query";
import { getDepartmentStats } from "../queries/getDepartmentStat";

export const useDepStats = () => {
  return useQuery({
    queryKey: ["dep-stats"],
    queryFn: getDepartmentStats,
    // Refresh every 5 minutes
    refetchInterval: 5 * 60 * 1000,
    // Show stale data while revalidating
    staleTime: 4 * 60 * 1000,
  });
};
