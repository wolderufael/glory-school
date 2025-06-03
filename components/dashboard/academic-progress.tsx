"use client"

import { TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function AcademicProgress() {
  return (
    <Card className="lg:col-span-2 border-red-100 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-700">
          <TrendingUp className="h-5 w-5" />
          Academic Progress
        </CardTitle>
        <CardDescription>Your current semester performance and degree completion status</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Degree Completion</span>
            <span className="font-medium">70%</span>
          </div>
          <Progress value={70} className="h-2" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Current Semester GPA</span>
            <span className="font-medium">3.9/4.0</span>
          </div>
          <Progress value={97.5} className="h-2" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Attendance Rate</span>
            <span className="font-medium">94%</span>
          </div>
          <Progress value={94} className="h-2" />
        </div>
        <div className="grid grid-cols-2 gap-4 pt-4">
          <div className="text-center p-3 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">6</div>
            <div className="text-sm text-gray-600">Courses This Semester</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">18</div>
            <div className="text-sm text-gray-600">Credit Hours</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
