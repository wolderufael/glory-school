import { useMutation } from "@tanstack/react-query"
import { LoginType } from '@/utils/authSchema'
import { toast } from "sonner"

export const useLogin = () => {
  return useMutation({
    mutationFn: async (formData: LoginType) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/login/`, {
        method: 'POST',
        body: JSON.stringify(formData),
        credentials: 'include', 
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });

       console.log('Response headers:', [...res.headers.entries()]);

      if (!res.ok) {
        let errorMsg = 'Failed to log in';
        try {
          const errorData = await res.json();
          errorMsg = errorData.error || errorMsg;
        } catch {}
        throw new Error(errorMsg);
      }
      
      return res.json();
    },
    onSuccess: () => {
      toast("Login Successful", {
        description: "Welcome back to the Student Portal!",
      });
    },
    onError: (error: Error) => {
      toast("Login Failed", {
        description: error.message || "Invalid credentials. Please try again.",
        style: {
          backgroundColor: '#f8d7da',
          color: '#721c24',
          borderColor: '#f5c6cb',
        },
      });
    }
  })
}