import { StudentData } from "./types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  School,
  GraduationCap,
  Award,
  Calculator,
  BookOpen,
  Beaker,
  Brain,
  Microscope,
  MapPin,
  Scale,
  Lightbulb,
} from "lucide-react";

interface EducationalBackgroundProps {
  studentData: StudentData;
}

export function EducationalBackground({
  studentData,
}: EducationalBackgroundProps) {
  // Calculate total score
  const calculateTotalScore = () => {
    const scores = [
      studentData.entranceExam.englishScore,
      studentData.entranceExam.mathScore,
      studentData.entranceExam.physicsScore,
      studentData.entranceExam.chemistryScore,
      studentData.entranceExam.biologyScore,
      studentData.entranceExam.civicsScore,
      studentData.entranceExam.aptitudeScore,
    ];
    return scores.reduce((sum, score) => sum + Number(score), 0).toString();
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Primary School Information */}
      <Card className="border border-blue-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <School className="h-6 w-6 text-indigo-600" />
            </div>
            Primary School Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-indigo-600" />
              <span className="text-sm font-medium">School Name:</span>
              <span className="text-sm text-gray-600">
                {studentData.primarySchool.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-indigo-600" />
              <span className="text-sm font-medium">Region:</span>
              <span className="text-sm text-gray-600">
                {studentData.primarySchool.region}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-indigo-600" />
              <span className="text-sm font-medium">Graduation Year:</span>
              <span className="text-sm text-gray-600">
                {studentData.primarySchool.graduationYear}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* High School Information */}
      <Card className="border border-blue-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <School className="h-6 w-6 text-indigo-600" />
            </div>
            High School Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-indigo-600" />
              <span className="text-sm font-medium">School Name:</span>
              <span className="text-sm text-gray-600">
                {studentData.highSchool.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-indigo-600" />
              <span className="text-sm font-medium">Region:</span>
              <span className="text-sm text-gray-600">
                {studentData.highSchool.region}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-indigo-600" />
              <span className="text-sm font-medium">Graduation Year:</span>
              <span className="text-sm text-gray-600">
                {studentData.highSchool.graduationYear}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-indigo-600" />
              <span className="text-sm font-medium">Stream:</span>
              <span className="text-sm text-gray-600">
                {studentData.highSchool.stream}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Entrance Exam Results */}
      <Card className="col-span-1 border border-blue-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Calculator className="h-6 w-6 text-indigo-600" />
            </div>
            Entrance Exam Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-indigo-600" />
              <span className="text-sm font-medium">English:</span>
              <span className="text-sm text-gray-600">
                {studentData.entranceExam.englishScore}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calculator className="h-4 w-4 text-indigo-600" />
              <span className="text-sm font-medium">Mathematics:</span>
              <span className="text-sm text-gray-600">
                {studentData.entranceExam.mathScore}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-indigo-600" />
              <span className="text-sm font-medium">Physics:</span>
              <span className="text-sm text-gray-600">
                {studentData.entranceExam.physicsScore}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Beaker className="h-4 w-4 text-indigo-600" />
              <span className="text-sm font-medium">Chemistry:</span>
              <span className="text-sm text-gray-600">
                {studentData.entranceExam.chemistryScore}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Microscope className="h-4 w-4 text-indigo-600" />
              <span className="text-sm font-medium">Biology:</span>
              <span className="text-sm text-gray-600">
                {studentData.entranceExam.biologyScore}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Scale className="h-4 w-4 text-indigo-600" />
              <span className="text-sm font-medium">Civics:</span>
              <span className="text-sm text-gray-600">
                {studentData.entranceExam.civicsScore}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-indigo-600" />
              <span className="text-sm font-medium">Aptitude:</span>
              <span className="text-sm text-gray-600">
                {studentData.entranceExam.aptitudeScore}
              </span>
            </div>
            <Separator className="my-4" />
            <div className="flex items-center gap-2 bg-indigo-50 p-3 rounded-lg">
              <Award className="h-5 w-5 text-indigo-600" />
              <span className="text-sm font-medium">Total Score:</span>
              <span className="text-sm font-semibold text-indigo-600">
                {calculateTotalScore()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
