"use client"

import { Settings, FileText, CreditCard, BookOpen, Download } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function QuickActions() {
  const actions = [
    { icon: FileText, label: "View Grades", color: "text-red-600" },
    { icon: CreditCard, label: "Pay Fees", color: "text-red-600" },
    { icon: BookOpen, label: "Register Courses", color: "text-red-600" },
    { icon: Download, label: "Documents", color: "text-red-600" },
  ]

  return (
    <Card className="border-red-100 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-700">
          <Settings className="h-5 w-5" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, index) => (
            <Button key={index} variant="outline" className="h-auto flex-col gap-2 p-4 border-red-200 hover:bg-red-50">
              <action.icon className={`h-6 w-6 ${action.color}`} />
              <span className="text-sm">{action.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
