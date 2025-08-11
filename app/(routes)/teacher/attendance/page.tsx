import TeacherAttendance from "@/components/schedule/attendance";

const StudentList = () => {
  return (
    <div className="flex flex-col items-center pt-6 md:pt-14 px-2 md:px-7 h-screen">
      <TeacherAttendance />
    </div>
  );
};

export default StudentList;
