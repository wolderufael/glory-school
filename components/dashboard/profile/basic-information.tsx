import { StudentData } from "./types";
import * as Separator from "@radix-ui/react-separator";
import {
  PersonIcon,
  EnvelopeClosedIcon,
  MobileIcon,
  HomeIcon,
  IdCardIcon,
  CalendarIcon,
  GlobeIcon,
  HeartIcon,
  ChatBubbleIcon,
} from "@radix-ui/react-icons";
import {  GraduationCap,BookOpen } from "lucide-react";

interface BasicInformationProps {
  studentData: StudentData;
}

// Helper component for data display
function DataItem({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | undefined;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-start space-x-3 max-sm:min-w-full">
      {icon && <div className="mt-1 text-indigo-600 flex-shrink-0">{icon}</div>}
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-gray-500">{label}</p>
        <p className="mt-1 text-sm text-gray-900 truncate">{value || "-"}</p>
      </div>
    </div>
  );
}

// Helper component for section headers
function SectionHeader({ title }: { title: string }) {
  return (
    <>
      <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
      <Separator.Root className="h-[1px] bg-gray-200 my-3" />
    </>
  );
}

const formatDate = (dateString: string) => {
  if (!dateString) return "";
  return dateString.split("T")[0];
};

export function BasicInformation({ studentData }: BasicInformationProps) {
  return (
    <div className="space-y-6 max-sm:px-4">
      {/* Top Section - Profile Picture and Access Information */}
      <div className="grid grid-cols-2 gap-6 max-sm:grid-cols-1">
        {/* Profile Picture */}
        <div className="bg-white rounded-lg shadow-sm p-6 max-sm:p-4 border border-blue-100">
          <div className="flex items-center justify-between mb-6 max-sm:flex-wrap max-sm:gap-3">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <PersonIcon className="h-6 w-6 text-indigo-600" />
              </div>
              Profile Information
            </h2>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-40 h-40 rounded-full overflow-hidden ring-4 ring-indigo-100 mb-6">
              <img
                src={studentData?.profilePicture || "/default-avatar.png"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-gray-900">
                {studentData?.user?.firstName} {studentData?.user?.middleName}{" "}
                {studentData?.user?.lastName}
              </h3>
              <div className="space-y-1">
                <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
                  <BookOpen className="h-4 w-4 text-indigo-600" />
                  {studentData?.department?.name}
                </p>
                <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
                  <IdCardIcon className="h-4 w-4 text-indigo-600" />
                 {studentData?.user?.userMainId}
                </p>
                <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
                  <GraduationCap className="h-4 w-4 text-indigo-600" />
                  {studentData?.program?.name}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Access Information */}
        <div className="bg-white rounded-lg shadow-sm p-6 max-sm:p-4 border border-blue-100">
          <div className="flex items-center justify-between mb-6 max-sm:flex-wrap max-sm:gap-3">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <IdCardIcon className="h-6 w-6 text-indigo-600" />
              </div>
              Contact Information
            </h2>
          </div>
          <div className="grid gap-6">
            <div className="p-4 from-indigo-50 to-blue-50 rounded-lg border border-indigo-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <EnvelopeClosedIcon className="h-4 w-4 text-indigo-600" />
                </div>
                <h4 className="font-medium text-gray-900">Email Address</h4>
              </div>
              <p className="text-sm text-gray-600 break-all pl-11">
                {studentData?.user?.email}
              </p>
            </div>

            <div className="p-4 from-indigo-50 to-blue-50 rounded-lg border border-indigo-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <MobileIcon className="h-4 w-4 text-indigo-600" />
                </div>
                <h4 className="font-medium text-gray-900">Phone Number</h4>
              </div>
              <p className="text-sm text-gray-600 pl-11">
                {studentData?.user?.phoneNumber}
              </p>
            </div>

            <div className="p-4 from-indigo-50 to-blue-50 rounded-lg border border-indigo-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <HomeIcon className="h-4 w-4 text-indigo-600" />
                </div>
                <h4 className="font-medium text-gray-900">Alternative Phone</h4>
              </div>
              <p className="text-sm text-gray-600 pl-11">
                {studentData?.phoneHome || "Not provided"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-3 gap-6 max-sm:grid-cols-1">
        {/* Main Information */}
        <div className="col-span-2 max-sm:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 max-sm:p-4 border border-blue-100">
            <div className="flex items-center justify-between mb-6 max-sm:flex-wrap max-sm:gap-3">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <PersonIcon className="h-6 w-6 text-indigo-600" />
                </div>
                Demographic Information
              </h2>
            </div>

            <div className="space-y-8">
              {/* Personal Information */}
              <div>
                <SectionHeader title="Personal Information" />
                <div className="grid grid-cols-2 gap-6 max-sm:grid-cols-1">
                  <DataItem
                    label="Date of Birth"
                    value={formatDate(studentData?.dateOfBirth)}
                    icon={<CalendarIcon className="text-indigo-600" />}
                  />
                  <DataItem
                    label="Gender"
                    value={studentData?.user?.gender}
                    icon={<PersonIcon className="text-indigo-600" />}
                  />
                  <DataItem
                    label="Nationality"
                    value={studentData?.user?.nationality}
                    icon={<GlobeIcon className="text-indigo-600" />}
                  />
                  <DataItem
                    label="Marital Status"
                    value={studentData?.maritalStatus}
                    icon={<HeartIcon className="text-indigo-600" />}
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <SectionHeader title="Contact Information" />
                <div className="grid grid-cols-2 gap-6 max-sm:grid-cols-1">
                  <DataItem
                    label="Alternative Email"
                    value={studentData?.user?.email}
                    icon={<EnvelopeClosedIcon className="text-indigo-600" />}
                  />
                  <DataItem
                    label="Home Phone"
                    value={studentData?.phoneHome}
                    icon={<HomeIcon className="text-indigo-600" />}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 max-sm:p-4 border border-blue-100 mt-6">
            <div className="flex items-center justify-between mb-6 max-sm:flex-wrap max-sm:gap-3">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <PersonIcon className="h-6 w-6 text-indigo-600" />
                </div>
                Academic Information
              </h2>
            </div>

            <div className="space-y-8">
              <div>
                <SectionHeader title="Academic Information" />
                <div className="grid grid-cols-2 gap-6 max-sm:grid-cols-1">
                  <DataItem
                    label="Year"
                    value={formatDate(studentData?.currentStudyingYear)}
                    icon={<CalendarIcon className="text-indigo-600" />}
                  />
                  <DataItem
                    label="Level"
                    value={studentData?.currentStudyingLevel}
                    icon={<PersonIcon className="text-indigo-600" />}
                  />
                  <DataItem
                    label="Semester"
                    value={studentData?.currentStudyingSemester}
                    icon={<GlobeIcon className="text-indigo-600" />}
                  />
                  <DataItem
                    label="Section"
                    value={studentData?.section?.name}
                    icon={<HeartIcon className="text-indigo-600" />}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Classification Information */}
        <div className="col-span-1 max-sm:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 max-sm:p-4 border border-blue-100 h-full">
            <div className="flex items-center justify-between mb-6 max-sm:flex-wrap max-sm:gap-3">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <GlobeIcon className="h-6 w-6 text-indigo-600" />
                </div>
                Classification Information
              </h2>
            </div>
            <div className="space-y-4">
              <DataItem
                label="Program"
                value={studentData?.program?.name}
                icon={<GlobeIcon className="text-indigo-600" />}
              />
              <DataItem
                label="Program Type"
                value={studentData?.admissionType?.name}
                icon={<GlobeIcon className="text-indigo-600" />}
              />
              <DataItem
                label="College"
                value={"Wolaita Sodo Agricultural College"}
                icon={<HomeIcon className="text-indigo-600" />}
              />
              <DataItem
                label="Department"
                value={studentData?.department?.name}
                icon={<HomeIcon className="text-indigo-600" />}
              />
              <DataItem
                label="Admission Year"
                value={formatDate(studentData?.registrationDate)}
                icon={<CalendarIcon className="text-indigo-600" />}
              />
              <DataItem
                label="Admission Date"
                value={formatDate(studentData.registrationDate)}
                icon={<CalendarIcon className="text-indigo-600" />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
