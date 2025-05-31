// import { useQuery } from '@tanstack/react-query';
// import apiClient from '@/lib/api/client';
// import type { User } from '@/lib/api/types/user';
import { useMutation, useQuery, QueryClient } from "@tanstack/react-query";



// const fetchUsers = async (): Promise<User[]> => {
//   const { data } = await apiClient.get('/users');
//   return data;
// };

// export const useUsers = () => {
//   return useQuery<User[]>({
//     queryKey: ['users'],
//     queryFn: fetchUsers,
//     // Optional: enable when authenticated
//     enabled: !!localStorage.getItem('authToken')
//   });
// };

