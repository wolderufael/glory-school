import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StudentRegistration } from "./course-registration";
import { useAuthStore } from "@/lib/store/authStore";
import { getLocalStorage } from "@/utils/localStorage";
import { useEffect, useState } from "react";

interface RegistrationSlipCardProps {
  slip: StudentRegistration;
}

export function RegistrationSlipCard({ slip }: RegistrationSlipCardProps) {
  const totalNominalHours = slip.modules.reduce(
    (sum, module) => sum + module.nominalHour,
    0
  );
  const [isActive, setIsActive] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [userMainId, setUserMainId] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");

  const { user } = useAuthStore();

  useEffect(() => {
    setMounted(true);
    const isActive =
      getLocalStorage("currentStudyingYear") === slip.year &&
      getLocalStorage("currentStudyingSemester") === slip.semester_name;
    setIsActive(isActive);
    setUserMainId(getLocalStorage("userMainId")?.toString() || "");
    setCurrentDate(new Date().toLocaleDateString());
  }, [slip.year, slip.academicSemester]);

  // Prevent hydration mismatch by showing loading state until mounted
  if (!mounted) {
    return (
      <Card className="w-full mb-6">
        <CardContent className="pt-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-32 bg-gray-200 rounded mb-4"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`w-full mb-6 ${!isActive ? "opacity-80" : ""}`}>
      <CardContent className="pt-6 space-y-6">
        <div className="flex justify-between items-start">
          <div className="text-sm space-y-1 flex-1">
            <div className="grid grid-cols-4">
              <div className="text-center font-bold py-1">
                REGISTRATION SLIP
              </div>
              <div className="text-center font-bold py-1">
                Year {slip.year} ({slip.entryYear} Entry)
              </div>
              <div className="text-center font-bold py-1">
                Academic Year: {slip.academicYear.name}
              </div>
              <div className="text-center font-bold py-1">
                Term {slip.academicSemester.name}
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="text-center font-bold py-1">
                OS: {slip.department} Level {slip.level}
              </div>
              <div className="text-center font-bold py-1">
                Department: {slip.department}
              </div>
            </div>
          </div>
          <Badge
            variant={isActive ? "default" : "secondary"}
            className={`ml-4 ${isActive ? "bg-green-600" : "bg-gray-500"}`}
          >
            {isActive ? "Active" : "Inactive"}
          </Badge>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center border-b border-black pb-1">
            <div className="flex items-center gap-2">
              <Label className="font-bold">NAME IN BLOCK LETTERS:</Label>
              <span className="font-semibold">
                {user?.firstName.toUpperCase()} {user?.lastName.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Label className="font-bold">ID NO:</Label>
              <span className="font-semibold">{mounted ? userMainId : ""}</span>
            </div>
          </div>

          <div className="flex items-center gap-8 text-sm border-b border-black pb-1">
            <div className="flex items-center gap-2">
              <Label>Program: Regular</Label>
              <input
                type="checkbox"
                checked={slip.program.isRegular}
                readOnly
                className="rounded border-black"
              />
            </div>
            <div className="flex items-center gap-2">
              <Label>CEP - Weekend/Night/Summer</Label>
              <input
                type="checkbox"
                checked={slip.program.isCEP}
                readOnly
                className="rounded border-black"
              />
            </div>
            <div className="flex items-center gap-4">
              <Label>SEX: M</Label>
              <input
                type="checkbox"
                checked={slip.sex === "M"}
                readOnly
                className="rounded border-black"
              />
              <Label>F</Label>
              <input
                type="checkbox"
                checked={slip.sex === "F"}
                readOnly
                className="rounded border-black"
              />
            </div>
            <div className="flex items-center gap-2">
              <Label>Mobile phone:</Label>
              <span>{slip.mobilePhone}</span>
            </div>
          </div>
        </div>

        <div className="border border-black">
          <Table className="w-full text-sm border border-black">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="border border-black p-1 text-center font-bold">
                  No
                </TableHead>
                <TableHead className="border border-black p-1 text-center font-bold">
                  MODULE TITLE
                </TableHead>
                <TableHead className="border border-black p-1 text-center font-bold">
                  MODULE CODE
                </TableHead>
               {/*  <TableHead className="border border-black p-1 text-center font-bold">
                  Level
                </TableHead> */}
                <TableHead className="border border-black p-1 text-center font-bold">
                  Nominal Hour
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {slip.modules.map((module) => (
                <TableRow key={module.no} className="hover:bg-transparent">
                  <TableCell className="border border-black p-1 text-center">
                    {module.no}
                  </TableCell>
                  <TableCell className="border border-black p-1">
                    {module.title}
                  </TableCell>
                  <TableCell className="border border-black p-1 text-center">
                    {module.code}
                  </TableCell>
                 {/*  <TableCell className="border border-black p-1 text-center">
                    {module.level}
                  </TableCell> */}
                  <TableCell className="border border-black p-1 text-center">
                    {module.nominalHour}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={4}
                  className="border border-black p-1 text-right font-bold"
                >
                  Total Nominal Hour
                </TableCell>
                <TableCell className="border border-black p-1 text-center font-bold">
                  {totalNominalHours}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <Label className="font-bold">DATE</Label>
              <p className="mt-1 border-b border-black">
                {mounted ? currentDate : ""}
              </p>
            </div>
            <div className="space-y-1">
              <Label className="font-bold">Advisor&apos;s Name and Sign.</Label>
              <div className="h-[1px] w-[300px] bg-black mt-4"></div>
            </div>
            <div className="space-y-1">
              <Label className="font-bold">REGISTRAR</Label>
              <div className="h-[1px] w-[300px] bg-black mt-4"></div>
            </div>
          </div>

          <p className="text-sm italic text-gray-600 mt-4">
            Notice: After registration return one copy to the registrar office,
            take one copy for you and give one to your advisor.
          </p>
        </div>

        <div className="flex justify-end">
          <Button
            onClick={() => window.print()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Print
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
