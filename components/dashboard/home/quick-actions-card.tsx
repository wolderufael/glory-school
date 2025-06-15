import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, FileText, Link2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function QuickActionsCard() {
  const router = useRouter();

  return (
    <Card className="bg-white border-slate-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <Link2 className="w-5 h-5" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 text-left flex items-center gap-2"
          onClick={() => router.push("/student/grade-slip")}
        >
          <FileText className="w-4 h-4" />
          View Grade Slip
        </Button>
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 text-left flex items-center gap-2"
          onClick={() => router.push("/student/courses")}
        >
          <BookOpen className="w-4 h-4" />
          View All Courses
        </Button>
      </CardContent>
    </Card>
  );
}
