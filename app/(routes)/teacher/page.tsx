import ListTable from "@/components/markList/table";

const StudentList = () => {
  return (
    <div className="flex flex-col items-center pt-6 md:pt-14 px-2 md:px-7 h-screen">
      <h1 className="text-2xl font-bold mb-9">Student Mark List</h1>
      <ListTable />
    </div>
  );
};

export default StudentList;
