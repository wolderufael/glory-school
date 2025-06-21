import { StudentData } from "./types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";    

export function EducationalBackground({ studentData }: { studentData: StudentData }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Educational Background</CardTitle>
      </CardHeader>
      <CardContent>EducationalBackground to be filled after file upload</CardContent>
    </Card>
  );
}