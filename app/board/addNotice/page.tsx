'use client'


import { AddNoticeCard } from "@/components/notice-board/add-notice-dialog";
import { useState } from "react";


interface College {
  id: number;
  name: string;
}

interface AddNoticeCardProps {
  colleges: College[];
  onNoticeAdded: () => void;
  onCancel: () => void;
}


const AddNotice = () => {
     const [showForm, setShowForm] = useState(true);
     //   const [notices, setNotices] = useState<Notice[]>([])
     //const [colleges, setColleges] = useState<College[]>([])
     const [selectedCollege, setSelectedCollege] = useState<string>("all")

        const colleges = [
            { id: 1, name: "Engineering College" },
            { id: 2, name: "Medical College" },
            { id: 3, name: "Arts College" },
        ]
        const departments = [
            { id: 1, name: "Engineering", college_id: 1 },
            { id: 2, name: "Medical", college_id: 2 },
            { id: 3, name: "Arts", college_id: 3 },
        ]



//   useEffect(() => {
//     fetchNotices()
//     fetchColleges()
//   }, [selectedCollege])

//const fetchColleges = async () => {
//     try {  const response = await fetch("/api/colleges");
//        if (!response.ok) {
//           throw new Error("Failed to fetch colleges");
//        }
//        const data = await response.json();
//        setColleges(data);
//     } catch (error) {
//        console.error("Error fetching colleges:", error);
//     }
//  }

  




     return(

        <div  className="flex w-full items-center justify-center min-h-screen bg-gray-100 p-4">
         <AddNoticeCard   
            colleges={colleges}
            departments={departments}
            onNoticeAdded={() => setShowForm(false)}
            onCancel={() => setShowForm(true)}
        />

        </div>
      
     )

}

export default AddNotice;
