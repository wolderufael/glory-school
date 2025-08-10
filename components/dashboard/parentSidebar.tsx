"use client";

import { useEffect, useState } from "react";
import {
  GraduationCap,
  Search,
  User,
  Settings,
  MoreHorizontal,
  LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  SidebarMenuButton,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { getLocalStorage } from "@/utils/localStorage";
import { useAuthStore } from "@/lib/store/authStore";
import { handleLogout } from "@/utils/handleLogout";
import NavigationsItem from "./navigation-group-items";

export function ParentSidebar() {
  const { user } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  return (
    <Sidebar className="border-r border-blue-200">
      <SidebarHeader className="border-b border-blue-200 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-white">SMIS</span>
            <span className="text-xs text-blue-100">Parent Portal</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-white">
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search portal..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-blue-200 focus:border-blue-400 focus:ring-blue-400"
            />
          </div>
        </div>

        <NavigationsItem searchQuery={searchQuery} />
      </SidebarContent>

      <SidebarFooter className="border-t border-blue-200 bg-blue-50">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="hover:bg-blue-100">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback className="bg-blue-600 text-white">
                      {user?.firstName?.charAt(0)}
                      {user?.lastName?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-medium">
                      {user?.firstName} {user?.lastName}
                    </span>
                    <span className="text-xs text-gray-500">
                      {user?.userMainId}
                    </span>
                  </div>
                  <MoreHorizontal className="ml-auto h-4 w-4" />
                </SidebarMenuButton>
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
                  Preferences
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-600 focus:text-red-600 focus:bg-red-50"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
