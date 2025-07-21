'use client'

import AddMessage from "@/components/notifications/addMessage";
import { useRouter } from "next/navigation";

const NotificationsPage = () => {
    const router = useRouter()
    return (
        <div className="p-4">
         <div>
              <button
                 onClick={() => router.back()}
                 className="text-blue-600 p-6 ml-5 cursor:pointer hover:underline mb-4"
                 >
                       Back
                </button>
         </div>
        <div className="space-y-4">
           <AddMessage  />

        </div>
        </div>
    );
    }
export default NotificationsPage;