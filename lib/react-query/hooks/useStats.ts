"use client";

import { useQuery } from "@tanstack/react-query";
import { getRegistrarStats } from "../queries/getRegistrarStat";

export const useStats = () => {
  return useQuery({
    queryKey: ["stats"],
    queryFn: getRegistrarStats,
    // Refresh every 5 minutes
    refetchInterval: 5 * 60 * 1000,
    // Show stale data while revalidating
    staleTime: 4 * 60 * 1000,
  });
};
