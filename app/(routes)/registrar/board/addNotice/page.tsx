"use client";

import { AddNoticeForm } from "@/components/notice-board/add-notice-dialog";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface College {
  id: number;
  name: string;
}

const RegistrarAddNoticePage = () => {
  const [collegeList, setCollegeList] = useState<College[]>([]);
  const router = useRouter();

  // Fetch colleges on mount
  useEffect(() => {
    async function fetchColleges() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/colleges`, {
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store', // Ensure fresh data
        });
        if (!res.ok) throw new Error('Failed to fetch colleges');
        const data = await res.json();
        setCollegeList(data);
      } catch (e) {
        console.error("Error fetching colleges:", e);
        toast.error("Failed to load colleges.");
      }
    }
    fetchColleges();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <AddNoticeForm
        colleges={collegeList}
        departments={[]} 
        onNoticeAdded={() => {
          toast.success('Notice added successfully!');
          router.push('/registrar/board');
        }}
        onCancel={() => router.push('/registrar/board')}
      />
    </div>
  );
};

export default RegistrarAddNoticePage;