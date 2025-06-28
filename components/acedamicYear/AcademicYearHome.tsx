import { Tabs, TabsTrigger, TabsList, TabsContent } from "@radix-ui/react-tabs";
import { FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AcademicYearForm from ".";
import AcademicYearList from "./AcademicYearList";

export default function AcademicYearHome() {
  return (
    <div>
      {/* Main Content */}
      <div className="px-4 py-12">
        <Tabs defaultValue="academic-years-list" className="space-y-8">
          <TabsList className="w-full grid grid-cols-2 h-11 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground bg-gray-100/50">
            <TabsTrigger
              value="academic-years-list"
              className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-sm"
            >
              List
            </TabsTrigger>
            <TabsTrigger
              value="academic-years"
              className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-sm"
            >
              Add New
            </TabsTrigger>
          </TabsList>

          <TabsContent value="academic-years-list">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900">
                      Academic Years
                    </h2>
                    <p className="text-gray-600 mt-1">
                      View and manage academic years
                    </p>
                  </div>
        {/*           <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <FileText className="h-4 w-4 mr-2" />
                    Download List
                  </Button> */}
                </div>
                <AcademicYearList />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="academic-years">
            <AcademicYearForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
