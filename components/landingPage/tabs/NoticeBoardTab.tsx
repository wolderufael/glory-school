import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Calendar, Clock } from "lucide-react";
import {
  formatDate,
  formatDateTime,
  isDeadlineSoon,
  isOverdue,
} from "@/utils/noticeUtils";
import { useNotice } from "@/lib/react-query/hooks/useNotice";

export function NoticeBoardTab() {
  const { data: notices, isLoading, error } = useNotice({});
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-900">
            Latest Announcements
          </h2>
          <Button
            variant="outline"
            className="text-blue-600 border-blue-600 hover:bg-blue-50"
          >
            View All
          </Button>
        </div>
        {/*                 {notices?.map((announcement) => (
                  <Card
                    key={announcement.college_id}
                    className="hover:shadow-lg transition-shadow border-0 shadow-sm"
                  >
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <h3 className="text-lg font-medium text-gray-900">
                              {announcement.message}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {announcement.deadline}
                            </p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${
                              announcement.is_active
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {announcement.is_active ? "Active" : "Inactive"}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            Deadline:{" "}
                            {new Date(
                              announcement.deadline
                            ).toLocaleDateString()}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="ml-auto text-blue-600 hover:text-blue-700"
                          >
                            Read More <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))} */}
        {notices?.map((notice) => (
          <Card key={notice.college_id} className="relative">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-600">
                      {notice.college_id}
                    </span>
                  </div>
                  <CardTitle className="text-lg leading-relaxed">
                    Notice #{notice.college_id}
                  </CardTitle>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge
                    variant={notice.is_active ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {notice.is_active ? "Active" : "Inactive"}
                  </Badge>
                  {isOverdue(notice.deadline) && notice.is_active && (
                    <Badge variant="destructive" className="text-xs">
                      Overdue
                    </Badge>
                  )}
                  {isDeadlineSoon(notice.deadline) &&
                    !isOverdue(notice.deadline) &&
                    notice.is_active && (
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
                  <span>{formatDateTime(notice.deadline)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/*               <div className="space-y-6">
                <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-600 to-blue-700 text-white">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">
                      Important Links
                    </h3>
                    <div className="space-y-3">
                      <Link
                        href="/admissions"
                        className="flex items-center justify-between p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                      >
                        Admissions
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      <Link
                        href="/library"
                        className="flex items-center justify-between p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                      >
                        Library Resources
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      <Link
                        href="/research"
                        className="flex items-center justify-between p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                      >
                        Research Publications
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Upcoming Events
                    </h3>
                    <div className="space-y-4">
                      {upcomingEvents.map((event) => (
                        <div key={event.id} className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-14 h-14 bg-blue-50 rounded-lg flex flex-col items-center justify-center">
                            <span className="text-sm font-medium text-blue-600">
                              {new Date(event.date).toLocaleDateString(
                                "en-US",
                                { month: "short" }
                              )}
                            </span>
                            <span className="text-lg font-bold text-blue-700">
                              {new Date(event.date).getDate()}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">
                              {event.title}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {event.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div> */}
    </div>
  );
}
