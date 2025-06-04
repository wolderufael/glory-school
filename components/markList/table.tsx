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
import { Button } from "../ui/button";


 type studentType = {
    student_main_id: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    sex: string;
    id_no: string;
    practical: number;
    theory: number;
    total: number;
    grade_in_letter: string;    
}


const ListTable = () => {
   const { data: students, isLoading, error } = useStudent();

    return(
        <div className="w-full">

            <div className="flex items-start justify-start p-8">
                  <div className="flex flex-col">
                     <p>Academic Year:  {}</p>
                     <p>Department: </p>
                      <p>Sector:</p>
                      <p>Module: <span>Module Code:</span></p>
                       <p>Program:</p>
                  </div>
            </div>

        <form>

         <Table>
            <TableCaption>Students Mark List</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Full Name</TableHead>
                    <TableHead>Sex</TableHead>
                    <TableHead>ID.No</TableHead>
                    <TableHead>practical(70%)</TableHead>
                    <TableHead>Theory(30%)</TableHead>
                    <TableHead>Total(100%)</TableHead>
                     <TableHead>Grade in Letter</TableHead>
                </TableRow>
            </TableHeader>
            {isLoading && <p className="flex justify-center items-center pt-12">Loading...</p>}
            {error && <p className="text-red-500 flex items-center pt-13 justify-center">Error fetching students</p>}
            {students && students.map((student:studentType)=>{
             <TableBody  key={student.student_main_id}>
                <TableRow>

                    <TableCell>{student.student_main_id}</TableCell>
                    <TableCell>{(student.first_name) + (student.middle_name) + (student.last_name)}</TableCell>
                    <TableCell>{student.sex}</TableCell>
                    <TableCell>{student.id_no}</TableCell>
                    <TableCell>{student.practical}</TableCell>
                    <TableCell>{student.theory}</TableCell>
                    <TableCell>{student.total}</TableCell>
                    <TableCell>{student.grade_in_letter}</TableCell>
                </TableRow>
             </TableBody>
            })}

          </Table>

          <TableFooter>
            <TableRow>
                <Button className="bg-blue-500 flex items-end justify-end  text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    Submit
                </Button>
            </TableRow>

          </TableFooter>
       </form>
      
         </div>
  
    )
}

export default ListTable;