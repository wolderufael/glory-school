import { Card, CardContent } from "@/components/ui/card";
import { basicInfo } from "@/app/(routes)/student/dashboard/grades-transcripts/mock-data";

export function BasicInfo() {
  const infoItems = [
    { label: "Student ID", value: basicInfo.studentId },
    { label: "Name", value: basicInfo.name },
    { label: "Department", value: basicInfo.department },
    { label: "Year", value: basicInfo.year },
    { label: "Semester", value: basicInfo.semester },
    { label: "Academic Year", value: basicInfo.academicYear },
    { label: "Program", value: basicInfo.program },
    { label: "Admission Type", value: basicInfo.admissionType },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Student Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {infoItems.map((item, index) => (
              <div key={index} className="space-y-1">
                <p className="text-sm text-gray-500">{item.label}</p>
                <p className="font-medium">{item.value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
