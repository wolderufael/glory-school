
import React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Users, 
  Building, 
  Bed,
  Calendar,
  TrendingUp
} from 'lucide-react';
import { DashboardCard } from '@/components/dashboard/dashboard-card';
import { StudentInfo } from '@/components/dashboard/student-information';
import AcademicCalendar from '@/components/dashboard/calander';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <SidebarProvider>
        <div className="flex w-full">
          <SidebarInset className="flex-1">           
            <main className="flex-1 p-6">
              {/* Alert Message */}
              <Card className="mb-6 bg-red-50 border-red-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="text-red-600 text-sm">
                      <strong>Jun 3, 2025 14:26:48 AM (GMT+3)</strong>
                      <br />
                      <span className="text-red-700">
                        You got A- for the course{' '}
                        <span className="font-semibold">Data Structure and Algorithm  (DSA 102)</span>
                      </span>
                    </div>
                    <Button size="sm" className="ml-auto bg-blue-600 hover:bg-blue-700">
                      Show more
                    </Button>
                  </div>
                </CardContent>
              </Card>   
               
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Dashboard Cards */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Stats Cards */}
                  {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <DashboardCard
                      title="Courses"
                      value="12"
                      icon={BookOpen}
                      color="blue"
                    />
                    <DashboardCard
                      title="Students"
                      value="245"
                      icon={Users}
                      color="green"
                    />
                    <DashboardCard
                      title="Departments"
                      value="8"
                      icon={Building}
                      color="purple"
                    />
                    <DashboardCard
                      title="Rooms"
                      value="24"
                      icon={Bed}
                      color="yellow"
                    />
                  </div> */}

                  {/* Academic Information */}
                  <Card className="mb-6 bg-red-50 border-red-100">
                    <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                        <div className="text-gray-600  text-sm">
                        <strong>Jun 3, 2025 14:26:48 AM </strong>
                        <br />
                        <span className="text-gray-700">
                            Registraion for this semester is started{' '}
                            <span className="font-semibold text-red-700">Please Register Now</span>
                        </span>
                        </div>
                        <Button size="sm" className="ml-auto bg-blue-600 hover:bg-blue-700">
                        Register
                        </Button>
                    </div>
                    </CardContent>
                </Card>

                  <StudentInfo
                    academicYear="2024/25"
                    semester="II"
                    program="Undergraduate"
                    programType="Regular"
                    department="Automotive Engineering"
                  />

                  {/* Events Calendar */}
                  <Card className="bg-white border-slate-200">
                    <AcademicCalendar  />
                    {/* <CardHeader>
                      <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        Events
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8 text-slate-500">
                        <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p>No upcoming events</p>
                      </div>
                    </CardContent> */}
                  </Card>
                </div>

                <div className="space-y-6">
                  
                  {/* Quick Stats */}
                   <Card className="bg-white border-slate-200">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" />
                        Quick Stats
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">GPA</span>
                        <span className="text-sm font-semibold text-slate-800">3.45</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Credit Hours</span>
                        <span className="text-sm font-semibold text-slate-800">128</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Attendance</span>
                        <span className="text-sm font-semibold text-green-600">95%</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Dashboard;