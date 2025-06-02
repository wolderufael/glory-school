import { NoticeBoardSchema } from "@/utils/NoticeSchema"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner";



export const useAddNotice = () => {
    return useMutation({
        mutationFn: async (data: NoticeBoardSchema) => {
            
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/notices/`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            });
            if (!res.ok) throw new Error('Failed to create notice');
            return res.json();
        },
        onSuccess: () => {
            toast("Success", {
          description: "Notice has been added successfully.",
            });

           
        },
        onError: () => {
            toast('error while creating notice', {
                description: "Something went wrong. Please try again.",
            });
        }
    });

}
