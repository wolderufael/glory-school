import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { exemptions } from "../../../app/dashboard/grades-trascripts/mock-data";

export function Exemptions() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Course Exemptions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course Code</TableHead>
                <TableHead>Course Name</TableHead>
                <TableHead>Credit Hours</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Approved By</TableHead>
                <TableHead>Approved Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exemptions.map((exemption) => (
                <TableRow key={exemption.id}>
                  <TableCell className="font-medium">
                    {exemption.courseCode}
                  </TableCell>
                  <TableCell>{exemption.courseName}</TableCell>
                  <TableCell>{exemption.creditHours}</TableCell>
                  <TableCell>{exemption.reason}</TableCell>
                  <TableCell>{exemption.approvedBy}</TableCell>
                  <TableCell>{exemption.approvedDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
