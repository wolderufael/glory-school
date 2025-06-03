import { useMutation } from "@tanstack/react-query"
import { LoginType} from '@/utils/authSchema'
import { toast } from "sonner"


export const useLogin = () => {
    return useMutation({
     mutationFn: async (FormData: LoginType )=>{
          const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/login/`,{
            method:'POST',
            body: JSON.stringify(FormData),
            headers:{'Content-Type': 'application/json'}
          })
        if(!res.ok) throw new Error('failed to log in ');
        return res.json()

        },
    onSuccess:()=>{
         toast("Login Successful", {
                description: "Welcome back to the Student Portal!",
              });
    },
    onError:()=>{
         toast("Login Failed", {
        description: "Invalid mainId or password. Please try again.",
        style: {
          backgroundColor: '#f8d7da',
          color: '#721c24',
          borderColor: '#f5c6cb',
        },
      });

    }
})
}