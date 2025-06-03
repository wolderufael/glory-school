"use client"

import { Bell, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"

export function DashboardHeader() {
  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-4 border-b border-red-200 bg-white/80 backdrop-blur-sm px-6">
        <SidebarTrigger className="text-red-600 hover:bg-red-50" />
        <Separator orientation="vertical" className="h-6 bg-red-200" />
        <div className="flex flex-1 items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-500">Welcome back, John!</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="border-red-200 text-red-600 hover:bg-red-50">
              <Download className="mr-2 h-4 w-4" />
              Download Transcript
            </Button>
            <Button size="sm" className="bg-red-600 hover:bg-red-700">
              <Bell className="mr-2 h-4 w-4" />
              Notifications
              <Badge className="ml-2 bg-white text-red-600">3</Badge>
            </Button>
          </div>
        </div>
      </header>
    </SidebarInset>
  )
}
