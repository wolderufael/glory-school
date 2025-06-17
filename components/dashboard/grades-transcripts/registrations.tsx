import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { registrations } from "@/app/(routes)/student/dashboard/grades-transcripts/mock-data";

export function Registrations() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Course Registrations</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="space-y-4">
            {registrations.map((registration) => (
              <AccordionItem
                key={registration.id}
                value={`item-${registration.id}`}
              >
                <AccordionTrigger className="text-left">
                  <div>
                    <p className="font-semibold">
                      {registration.semester} - {registration.academicYear}
                    </p>
                    <p className="text-sm text-gray-500">
                      Registration Date: {registration.registrationDate}
                    </p>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Course Code</TableHead>
                        <TableHead>Course Name</TableHead>
                        <TableHead>Credit Hours</TableHead>
                        <TableHead>Type</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {registration.courses.map((course, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {course.courseCode}
                          </TableCell>
                          <TableCell>{course.courseName}</TableCell>
                          <TableCell>{course.creditHours}</TableCell>
                          <TableCell>{course.type}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
