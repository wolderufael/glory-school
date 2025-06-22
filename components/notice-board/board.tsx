"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Clock, Building2, Plus } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useNotice } from "@/lib/react-query/hooks/useNotice";

export function NoticeBoard() {
  const { data: notices, isLoading, error, refetch } = useNotice({});
  const [selectedCollege, setSelectedCollege] = useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const pathname = usePathname();

  const colleges = [
    { id: 1, name: "Engineering College" },
    { id: 2, name: "Medical College" },
    { id: 3, name: "Arts College" },
  ];

  useEffect(() => {
    // Refetch notices when the component mounts or when navigating back to this page
    if (pathname === "/registrar/board") {
      refetch();
    }
  }, [pathname, refetch]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isDeadlineSoon = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays >= 0;
  };

  const isOverdue = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    return deadlineDate < today;
  };

  const router = useRouter();

  const handleAddNotice = () => {
    router.push("./board/addNotice");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-lg">
        Loading notices...
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Select value={selectedCollege} onValueChange={setSelectedCollege}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select college" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Colleges</SelectItem>
              {colleges.map((college) => (
                <SelectItem key={college.id} value={college.id.toString()}>
                  {college.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          onClick={handleAddNotice}
          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 transition-colors px-6"
        >
          <Plus className="h-4 w-4" />
          Add Notice
        </Button>
      </div>

      {notices?.length === 0 ? (
        <Card className="bg-white shadow-sm">
          <CardContent className="flex items-center justify-center min-h-[200px]">
            <p className="text-gray-500 text-lg">
              No notices available at the moment.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-8">
          {notices?.map((notice) => (
            <Card key={notice.id} className="relative">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-600">
                        {notice.author.firstName} {notice.author.lastName}
                      </span>
                    </div>
                    <CardTitle className="text-lg leading-relaxed">
                      {notice.title}
                    </CardTitle>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge
                      variant={notice.isActive ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {notice.isActive ? "Active" : "Inactive"}
                    </Badge>
                    {isOverdue(notice.deadline) && notice.isActive && (
                      <Badge variant="destructive" className="text-xs">
                        Overdue
                      </Badge>
                    )}
                    {isDeadlineSoon(notice.deadline) &&
                      !isOverdue(notice.deadline) &&
                      notice.isActive && (
                        <Badge
                          variant="outline"
                          className="text-xs border-orange-500 text-orange-600"
                        >
                          Due Soon
                        </Badge>
                      )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {notice.message}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span className="font-medium">Deadline:</span>
                    <span
                      className={`${
                        isOverdue(notice.deadline)
                          ? "text-red-600 font-medium"
                          : isDeadlineSoon(notice.deadline)
                          ? "text-orange-600 font-medium"
                          : ""
                      }`}
                    >
                      {formatDate(notice.deadline)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span className="font-medium">Published:</span>
                    <span>{formatDateTime(notice.publishedAt)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
