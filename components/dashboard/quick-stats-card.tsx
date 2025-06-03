"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { quickStatsData } from "@/lib/dashboard-data"

export function QuickStatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {quickStatsData.map((stat, index) => (
        <Card key={index} className="border-red-100 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <p className={`text-xs ${stat.color}`}>{stat.change} from last semester</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
