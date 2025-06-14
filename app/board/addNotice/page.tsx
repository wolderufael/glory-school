"use client";

import { AddNoticeForm } from "@/components/notice-board/add-notice-dialog";
import { useRouter } from "next/navigation";

const AddNoticePage = () => {
  const router = useRouter();

  // Sample data - replace with actual data from your API
  const colleges = [
    { id: 1, name: "Engineering College" },
    { id: 2, name: "Medical College" },
    { id: 3, name: "Arts College" },
  ];

  const departments = [
    { id: 1, name: "Computer Science", college_id: 1 },
    { id: 2, name: "Electrical Engineering", college_id: 1 },
    { id: 3, name: "Medicine", college_id: 2 },
    { id: 4, name: "Fine Arts", college_id: 3 },
  ];

  const handleNoticeAdded = () => {
    router.push("/board");
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="container mx-auto py-8">
      <AddNoticeForm
        colleges={colleges}
        departments={departments}
        onNoticeAdded={handleNoticeAdded}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default AddNoticePage;
