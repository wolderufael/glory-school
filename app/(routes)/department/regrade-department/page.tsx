import RegradeDeptRequest from "@/components/department/regrade-department/regrade request/regrade-dept-request";
import ReGradeReview from "@/components/department/regrade-department/regrade approval/re-grade-review";
import { Tabs, TabsTrigger, TabsList, TabsContent } from "@radix-ui/react-tabs";

export default function RegradeDeptHome() {
  return (
    <div>
      {/* Main Content */}
      <div className="px-4 py-12">
        <Tabs defaultValue="re-grade-request" className="space-y-8">
          <TabsList className="w-full grid grid-cols-2 h-11 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground bg-gray-100/50">
            <TabsTrigger
              value="re-grade-request"
              className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-sm"
            >
              Request
            </TabsTrigger>
            <TabsTrigger
              value="re-grade-approval"
              className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-sm"
            >
              Approval
            </TabsTrigger>
          </TabsList>
          <TabsContent value="re-grade-request">
            <RegradeDeptRequest />
          </TabsContent>

          <TabsContent value="re-grade-approval">
            <ReGradeReview />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
