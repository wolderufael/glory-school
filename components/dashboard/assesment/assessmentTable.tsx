import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useStudentAssessment } from "@/lib/react-query/hooks/useStudentAssessment";
import { StudentAssessment } from "@/types/assessment";

export default function AssessmentTab({ studentId }: { studentId: number }) {
  const {
    data: assessments,
    isLoading,
    error,
  } = useStudentAssessment(studentId);



  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading assessment data...</div>
      </div>
    );
  }

  if (error) {
    console.error("Error loading assessments:", error);
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red-600">
          Error loading assessment data: {error.message}
        </div>
      </div>
    );
  }

  if (!assessments || assessments.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">No assessment data available</div>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="font-semibold">Course</TableHead>
            <TableHead className="text-center">Practical 1</TableHead>
            <TableHead className="text-center">Practical 2</TableHead>
            <TableHead className="text-center">Practical 3</TableHead>
            <TableHead className="text-center">Total Practical</TableHead>
            <TableHead className="text-center">Practical Status</TableHead>
            <TableHead className="text-center">Theory</TableHead>
            <TableHead className="text-center">Theory Status</TableHead>
            <TableHead className="text-center">Total Mark</TableHead>
            <TableHead className="text-center">Grade</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assessments.map((assessment) => (
            <TableRow key={assessment.id}>
              <TableCell className="font-medium">
                {assessment.teachingAssignment.course.title}
              </TableCell>
              <TableCell className="text-center">
                {assessment.practical1}
              </TableCell>
              <TableCell className="text-center">
                {assessment.practical2}
              </TableCell>
              <TableCell className="text-center">
                {assessment.practical3}
              </TableCell>
              <TableCell className="text-center font-medium">
                {assessment.totalPractical}
              </TableCell>
              <TableCell className="text-center">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    assessment.practicalStatus === "3"
                      ? "bg-red-100 text-red-700"
                      : assessment.practicalStatus === "2"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {assessment.practicalStatus}
                </span>
              </TableCell>
              <TableCell className="text-center">{assessment.theory}</TableCell>
              <TableCell className="text-center">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    assessment.theoryStatus === "3"
                      ? "bg-red-100 text-red-700"
                      : assessment.theoryStatus === "2"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {assessment.theoryStatus}
                </span>
              </TableCell>
              <TableCell className="text-center font-medium">
                {assessment.totalMark}
              </TableCell>
              <TableCell className="text-center">
                {assessment.gradeInLetter || "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
