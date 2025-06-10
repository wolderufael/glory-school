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
import { curriculum } from "../../../app/dashboard/grades-trascripts/mock-data";

export function Curriculum() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Program Curriculum</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Program</h3>
              <p className="font-medium">{curriculum.program}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Total Credit Hours
              </h3>
              <p className="font-medium">{curriculum.totalCreditHours}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Specialization
              </h3>
              <p className="font-medium">{curriculum.specialization}</p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Course Structure</h3>
            <Accordion type="single" collapsible className="space-y-4">
              {curriculum.courses.map((semester) => (
                <AccordionItem
                  key={semester.semester}
                  value={`semester-${semester.semester}`}
                >
                  <AccordionTrigger className="text-left">
                    <span className="font-semibold">
                      Semester {semester.semester}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Course Code</TableHead>
                          <TableHead>Course Name</TableHead>
                          <TableHead>Credit Hours</TableHead>
                          <TableHead>Prerequisite</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {semester.courses.map((course, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">
                              {course.courseCode}
                            </TableCell>
                            <TableCell>{course.courseName}</TableCell>
                            <TableCell>{course.creditHours}</TableCell>
                            <TableCell>{course.prerequisite}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
