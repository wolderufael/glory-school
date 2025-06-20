import {
  Bell,
  Settings,
  User,
  LayoutDashboard,
  FileArchive,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function TeacherDashboardHeader() {
  return (
    <div className="flex items-center justify-between p-6 bg-white border-b border-blue-100">
      <div>
        <h1 className="text-3xl font-bold text-blue-900 flex items-center gap-2">
          <FileArchive className="h-6 w-6" />
          Teacher Dashboard
        </h1>
        <p className="text-blue-600 mt-1">
          Manage student assesment and evaluation
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          className="border-blue-200 hover:bg-blue-50"
        >
          <Bell className="h-4 w-4 text-blue-600" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 hover:bg-blue-50"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback className="bg-blue-600 text-white">
                  AR
                </AvatarFallback>
              </Avatar>
              <span className="text-blue-900 font-medium">Teacher</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              System Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
