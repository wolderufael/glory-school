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
    <div className="flex items-start space-x-3">
      {icon && <div className="mt-1 text-indigo-600">{icon}</div>}
      <div>
        <p className="text-xs font-medium text-gray-500">{label}</p>
        <p className="mt-1 text-sm text-gray-900">{value || "-"}</p>
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
    <div className="grid grid-cols-3 gap-6">
      {/* Main Information */}
      <div className="col-span-2">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-blue-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <PersonIcon className="h-6 w-6 text-indigo-600" />
              </div>
              Demographic Information
            </h2>
          </div>

          <div className="space-y-8">
            {/* English Name */}
            <div>
              <SectionHeader title="Full Name" />
              <div className="grid grid-cols-3 gap-6">
                <DataItem
                  label="First Name"
                  value={studentData?.user?.firstName}
                  icon={<PersonIcon className="text-indigo-600" />}
                />
                <DataItem
                  label="Middle Name"
                  value={studentData?.user?.middleName}
                />
                <DataItem
                  label="Last Name"
                  value={studentData?.user?.lastName}
                />
              </div>
            </div>

            {/* Personal Information */}
            <div>
              <SectionHeader title="Personal Information" />
              <div className="grid grid-cols-2 gap-6">
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
              <div className="grid grid-cols-2 gap-6">
                <DataItem
                  label="Email"
                  value={studentData?.user?.email}
                  icon={<EnvelopeClosedIcon className="text-indigo-600" />}
                />
                <DataItem
                  label="Alternative Email"
                  value={studentData?.user?.email}
                  icon={<EnvelopeClosedIcon className="text-indigo-600" />}
                />
                <DataItem
                  label="Mobile Phone"
                  value={studentData?.user?.phoneNumber}
                  icon={<MobileIcon className="text-indigo-600" />}
                />
                <DataItem
                  label="Home Phone"
                  value={studentData?.phoneHome}
                  icon={<HomeIcon className="text-indigo-600" />}
                />
              </div>
            </div>

            {/* Graduation Information */}
            {/*           <div>
              <SectionHeader title="Expected Graduation" />
              <div className="grid grid-cols-3 gap-6">
                <DataItem
                  label="Month"
                  value={studentData.graduationDate.month}
                  icon={<CalendarIcon className="text-indigo-600" />}
                />
                <DataItem label="Day" value={studentData.graduationDate.day} />
                <DataItem
                  label="Year"
                  value={studentData.graduationDate.year}
                />
              </div>
            </div> */}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-blue-100 mt-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <PersonIcon className="h-6 w-6 text-indigo-600" />
              </div>
              Academic Information
            </h2>
          </div>

          <div className="space-y-8">
            {/* Academic Information */}
            {/*             <div>
              <SectionHeader title="Academic Information" />
              <div className="grid grid-cols-3 gap-6">
                <DataItem
                  label="First Name"
                  value={studentData?.user?.firstName}
                  icon={<PersonIcon className="text-indigo-600" />}
                />
                <DataItem
                  label="Middle Name"
                  value={studentData?.user?.middleName}
                />
                <DataItem
                  label="Last Name"
                  value={studentData?.user?.lastName}
                />
              </div>
            </div> */}

            {/* Academic Information */}
            <div>
              <SectionHeader title="Academic Information" />
              <div className="grid grid-cols-2 gap-6">
                <DataItem
                  label=" Year"
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

            {/* Contact Information */}
   {/*          <div>
              <SectionHeader title="Contact Information" />
              <div className="grid grid-cols-2 gap-6">
                <DataItem
                  label="Email"
                  value={studentData?.user?.email}
                  icon={<EnvelopeClosedIcon className="text-indigo-600" />}
                />
                <DataItem
                  label="Alternative Email"
                  value={studentData?.user?.email}
                  icon={<EnvelopeClosedIcon className="text-indigo-600" />}
                />
                <DataItem
                  label="Mobile Phone"
                  value={studentData?.user?.phoneNumber}
                  icon={<MobileIcon className="text-indigo-600" />}
                />
                <DataItem
                  label="Home Phone"
                  value={studentData?.phoneHome}
                  icon={<HomeIcon className="text-indigo-600" />}
                />
              </div>
            </div> */}

            {/* Graduation Information */}
            {/*           <div>
              <SectionHeader title="Expected Graduation" />
              <div className="grid grid-cols-3 gap-6">
                <DataItem
                  label="Month"
                  value={studentData.graduationDate.month}
                  icon={<CalendarIcon className="text-indigo-600" />}
                />
                <DataItem label="Day" value={studentData.graduationDate.day} />
                <DataItem
                  label="Year"
                  value={studentData.graduationDate.year}
                />
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Side Information */}
      <div className="col-span-1 space-y-6">
        {/* Profile Picture */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-blue-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <PersonIcon className="h-6 w-6 text-indigo-600" />
              </div>
              Profile Picture
            </h2>
          </div>
          <div className="flex justify-center">
            <div className="w-32 h-32 rounded-full overflow-hidden ring-2 ring-indigo-100">
              <img
                src={studentData?.profilePicture || "/default-avatar.png"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Access Information */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-blue-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <IdCardIcon className="h-6 w-6 text-indigo-600" />
              </div>
              Access Information
            </h2>
          </div>
          <div className="space-y-4">
            <DataItem
              label="Username"
              value={studentData?.user?.userMainId}
              icon={<PersonIcon className="text-indigo-600" />}
            />
            {/*             <DataItem
              label="Last Login"
              value={studentData.user.lastLogin}
              icon={<CalendarIcon className="text-indigo-600" />}
            /> */}
            {/*            <DataItem
              label="Last Password Change"
              value={studentData.user.lastPasswordChange}
              icon={<CalendarIcon className="text-indigo-600" />}
            /> */}
            {/*            <DataItem
              label="Failed Logins"
              value={studentData.failedLogins}
              icon={<IdCardIcon className="text-indigo-600" />}
            /> */}
            {/*            <DataItem
              label="E-Card Number"
              value={studentData.ecardNumber}
              icon={<IdCardIcon className="text-indigo-600" />}
            /> */}
          </div>
        </div>

        {/* Classification Information */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-blue-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
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
  );
}
