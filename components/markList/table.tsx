'use client'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useStudent } from "@/lib/react-query/hooks/useStudent";
import { getStudent } from "@/lib/react-query/queries/getStudent";
import { useQuery } from "@tanstack/react-query";

 type studentType = {
    student_main_id: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    course: string;
    fifty_percent: number;
    fifty_percent_two: number;
    final_mark: number;
}



const ListTable = () => {

    const { data: students, isLoading, error } = useStudent();

      


    return(
        <Table>
            <TableCaption>Students Mark List</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Student ID</TableHead>
                    <TableHead>First Name</TableHead>
                    <TableHead>Middle Name</TableHead>
                    <TableHead>Last Name</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>50%</TableHead>
                    <TableHead>50%</TableHead>
                    <TableHead>Final Mark</TableHead>
                </TableRow>
            </TableHeader>
            {isLoading && <p>Loading...</p>}
            {error && <p className="text-red-500">Error fetching students</p>}
            {students && students.map((student:studentType)=>{
             <TableBody  key={student.student_main_id}>
                <TableRow>
                    <TableCell>{student.student_main_id}</TableCell>
                    <TableCell>{student.first_name}</TableCell>
                    <TableCell>{student.middle_name}</TableCell>
                    <TableCell>{student.last_name}</TableCell>
                    <TableCell>{student.course}</TableCell>
                    <TableCell>{student.fifty_percent}</TableCell>
                    <TableCell>{student.fifty_percent_two}</TableCell>
                    <TableCell>{student.final_mark}</TableCell>
                </TableRow>
             </TableBody>
            })}

        </Table>
  
    )
}

export default ListTable;