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
import { results } from "@/app/(routes)/student/dashboard/grades-transcripts/mock-data";

export function Results() {
  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A":
      case "A-":
        return "text-green-600 dark:text-green-400";
      case "B+":
      case "B":
      case "B-":
        return "text-blue-600 dark:text-blue-400";
      case "C+":
      case "C":
        return "text-yellow-600 dark:text-yellow-400";
      default:
        return "text-red-600 dark:text-red-400";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Academic Results</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="space-y-4">
            {results.map((semester, index) => (
              <AccordionItem key={index} value={`semester-${index}`}>
                <AccordionTrigger className="text-left">
                  <div className="flex justify-between items-center w-full pr-4">
                    <div>
                      <p className="font-semibold">
                        {semester.semester} - {semester.academicYear}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Semester GPA</p>
                      <p className="font-bold text-blue-600">
                        {semester.gpa.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Course Index</TableHead>
                        <TableHead>Course Code</TableHead>
                        <TableHead>Course Name</TableHead>
                        <TableHead>Credit Hours</TableHead>
                        <TableHead>Result(100%)</TableHead>
                        <TableHead>Grade</TableHead>
                        <TableHead>Points</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {semester.courses.map((course, courseIndex) => (
                        <>
                        <TableRow key={courseIndex}>
                           <TableCell>{courseIndex + 1}</TableCell>
                          <TableCell className="font-medium">
                            {course.courseCode}
                          </TableCell>
                          <TableCell>{course.courseName}</TableCell>
                          <TableCell>{course.creditHours}</TableCell>
                          <TableCell>{course.result}</TableCell>
                          <TableCell>
                            <span
                              className={`font-semibold ${getGradeColor(
                                course.grade
                              )}`}
                            >
                              {course.grade}
                            </span>
                          </TableCell>
                          <TableCell>{course.points.toFixed(2)}</TableCell>
                        </TableRow>
                        
            </>
                      ))}
                    </TableBody>
                  </Table>
            <div className="flex justify-end items-end top-22 my-12  flex-col">
              <p className="text-sm gap-6 my-4 mx-12 text-gray-500 font-semibold">
                Total Grade Point <span className="font-semibold px-5">3.71</span>
              </p>
               <p className="text-sm text-gray-500  gap-6 my-4 mx-12 font-semibold">
               Average Grade Point(GPA) <span className="font-semibold px-5">3.71</span>
              </p>
               <p className="text-sm text-gray-500 gap-6 my-4 mx-12 font-semibold">
                Cumulative Average Grade Point(CGPA) <span className="font-semibold px-5">3.71</span>
              </p>

            </div>
                </AccordionContent>
              </AccordionItem>
            ))}

            
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
