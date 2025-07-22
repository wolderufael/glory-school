"use client";

import { useMessage } from "@/lib/react-query/hooks/useNotice";
import { Button } from "@/components/ui/button";
import { SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { getLocalStorage } from "@/utils/localStorage";
import { useEffect } from "react";

interface MessagesProps {
  userInfo: {
    id?: number;
    userType?: string;
  };
}

import React from "react";
import { useAuthStore } from "@/lib/store/authStore";

const Messages = ({ userInfo }: any) => {

 const { user } = useAuthStore();
 


  const [userId, setUserId] = React.useState(userInfo?.id);
  const userType = userInfo?.userType;
  const teacherId = typeof window !== 'undefined' ? getLocalStorage('teacherId') : undefined;

  const sectionId = user?.student?.sectionId ?? null

  // Set userId for teacher
  useEffect(() => {
    if (userType === 'Teacher' && teacherId) {
      setUserId(teacherId);
    }
  }, [userType, teacherId]);

  // Set userId for student if sectionId is available
  useEffect(() => {
    if (userType === 'Student' && sectionId) {
      setUserId(sectionId);
    }
  }, [userType, sectionId]);

  const { data, isLoading, error } = useMessage({ userType, userId });

  const router = useRouter();
  const pathname = usePathname();

  // Determine if we're on the add message page
  const isAddMessagePage = pathname?.includes("/message/addNew");

  // Ref to SheetClose button
  const sheetCloseRef = React.useRef<HTMLButtonElement>(null);
  const handleAddMessage = () => {
    // Close the sheet first
    if (sheetCloseRef.current) {
      sheetCloseRef.current.click();
    }
    // Navigate after closing
    setTimeout(() => {
      router.push(`/${userType?.toLowerCase()}/message/addNew`);
    }, 100); // slight delay to allow sheet to close
  };

  return (
    <SheetContent className="sm:max-w-[500px] w-1/2 px-6 pr-5 mx-4">
      <SheetHeader>
        <SheetTitle>Inbox</SheetTitle>
        <SheetDescription>
          Notices and updates for you <strong>({userType ?? "Guest"})</strong>.
        </SheetDescription>
        {/* Only show Add Message button if not on add message page and not student */}
        {userType !== "Student" && !isAddMessagePage && (
          <div className="flex p-3 justify-end">
            <Button
              variant="outline"
              size="sm"
              className="mb-2"
              onClick={handleAddMessage}
              id="add-message-btn"
            >
              Add Message
            </Button>
            {/* SheetClose button for programmatic close */}
            <SheetClose asChild>
              <button ref={sheetCloseRef} style={{ display: "none" }} type="button" />
            </SheetClose>
          </div>
        )}
      </SheetHeader>

      <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto">
        {isLoading && (
          <div className="space-y-3">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-2/3" />
          </div>
        )}

        {error && (
          <div className="text-red-500 text-sm">Failed to fetch messages.</div>
        )}

        {!isLoading && data?.length === 0 && (
          <div className="text-muted-foreground text-sm">No messages found.</div>
        )}

        {data?.map((msg) => (
          <div key={msg.id} className="border p-4 rounded-lg shadow-sm space-y-1">
            <h3 className="font-semibold text-base">{msg.title}</h3>
            <p className="text-sm text-muted-foreground">{msg.message}</p>
            <div className="text-xs text-right text-gray-500 mt-1">
              From: {msg?.author ? `${msg.author.firstName} ${msg.author.lastName}` : "Unknown"} <br />
              <br />
              <span className="text-xs">
                {msg?.createdAt ? format(new Date(msg.createdAt), "PPP") : "N/A"}
              </span>
            </div>
            {msg.deadline && (
              <Badge className="mt-1" variant="destructive">
                Deadline: {format(new Date(msg.deadline), "PPP")}
              </Badge>
            )}
          </div>
        ))}
      </div>

      <SheetFooter>
        <SheetClose asChild>
          <Button variant="outline">Close</Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  );
};

export default Messages;
