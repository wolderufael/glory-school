import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, MessageSquare, Printer, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore} from "@/lib/store/authStore";

interface TopNavProps {
  title?: string;
  studentId?: string;
}

const props: TopNavProps = {
  title: "Full Information",
  studentId: "NSR/2551/12",
};

export function TopNav({
  title = props.title,
  studentId = props.studentId,
}: TopNavProps) {
  const { user, logout } = useAuthStore();
  return (
    <header className="h-16  bg-white border-b border-slate-200 flex  justify-between px-4">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-medium text-slate-800">{title}</h1>

        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="md:flex hidden items-center gap-2">
          <Button variant="ghost" size="sm" className="text-slate-600">
            <MessageSquare className="w-4 h-4 mr-1" />
            Messages
          </Button>
          {/* <Button variant="ghost" size="sm" className="text-slate-600">
            <Printer className="w-4 h-4 mr-1" />
            Print
          </Button>
          <Button variant="ghost" size="sm" className="text-slate-600">
            <Home className="w-4 h-4 mr-1" />
            Dorm
          </Button> */}
        </div>

        <div className="flex items-center gap-2 ml-4">
          <div className="text-right ">
            <div className="text-sm font-medium text-slate-800">
              {studentId}
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="p-2">
                <User className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-45   md:w-70">
              <DropdownMenuLabel className="text-slate-800">
                {user?.firstName} {user?.lastName}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
{/*               <DropdownMenuItem>
                <User className="w-4 h-4 mr-2" />
                Profile
              </DropdownMenuItem> */}
{/*               <DropdownMenuItem>
                <Bell className="w-4 h-4 mr-2" />
                Notifications
                <Badge className="ml-auto bg-red-100 text-red-700">3</Badge>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Printer className="w-4 h-4 mr-2" />
                Print Transcript
              </DropdownMenuItem>
              <DropdownMenuSeparator /> */}
              <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
