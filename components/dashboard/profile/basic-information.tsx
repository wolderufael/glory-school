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
              <SectionHeader title="English Name" />
              <div className="grid grid-cols-3 gap-6">
                <DataItem
                  label="First Name"
                  value={studentData.englishName.firstName}
                  icon={<PersonIcon className="text-indigo-600" />}
                />
                <DataItem
                  label="Middle Name"
                  value={studentData.englishName.middleName}
                />
                <DataItem
                  label="Last Name"
                  value={studentData.englishName.lastName}
                />
              </div>
            </div>

            {/* Amharic Name */}
            <div>
              <SectionHeader title="Amharic Name" />
              <div className="grid grid-cols-3 gap-6">
                <DataItem
                  label="First Name"
                  value={studentData.amharicName.firstName}
                  icon={<PersonIcon className="text-indigo-600" />}
                />
                <DataItem
                  label="Middle Name"
                  value={studentData.amharicName.middleName}
                />
                <DataItem
                  label="Last Name"
                  value={studentData.amharicName.lastName}
                />
              </div>
            </div>

            {/* Personal Information */}
            <div>
              <SectionHeader title="Personal Information" />
              <div className="grid grid-cols-2 gap-6">
                <DataItem
                  label="Date of Birth"
                  value={studentData.dateOfBirth}
                  icon={<CalendarIcon className="text-indigo-600" />}
                />
                <DataItem
                  label="Gender"
                  value={studentData.gender}
                  icon={<PersonIcon className="text-indigo-600" />}
                />
                <DataItem
                  label="Nationality"
                  value={studentData.nationality}
                  icon={<GlobeIcon className="text-indigo-600" />}
                />
                <DataItem
                  label="Marital Status"
                  value={studentData.maritalStatus}
                  icon={<HeartIcon className="text-indigo-600" />}
                />
                <DataItem
                  label="Primary Language"
                  value={studentData.primaryLanguage}
                  icon={<ChatBubbleIcon className="text-indigo-600" />}
                />
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <SectionHeader title="Contact Information" />
              <div className="grid grid-cols-2 gap-6">
                <DataItem
                  label="Email"
                  value={studentData.email}
                  icon={<EnvelopeClosedIcon className="text-indigo-600" />}
                />
                <DataItem
                  label="Alternative Email"
                  value={studentData.alternativeEmail}
                  icon={<EnvelopeClosedIcon className="text-indigo-600" />}
                />
                <DataItem
                  label="Mobile Phone"
                  value={studentData.phoneMobile}
                  icon={<MobileIcon className="text-indigo-600" />}
                />
                <DataItem
                  label="Home Phone"
                  value={studentData.phoneHome}
                  icon={<HomeIcon className="text-indigo-600" />}
                />
              </div>
            </div>

            {/* Fayda Numbers */}
            <div>
              <SectionHeader title="Fayda Numbers" />
              <div className="grid grid-cols-2 gap-6">
                <DataItem
                  label="FAN"
                  value={studentData.faydaFAN}
                  icon={<IdCardIcon className="text-indigo-600" />}
                />
                <DataItem
                  label="FIN"
                  value={studentData.faydaFIN}
                  icon={<IdCardIcon className="text-indigo-600" />}
                />
              </div>
            </div>

            {/* Graduation Information */}
            <div>
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
            </div>
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
                src={studentData.profilePicture || "/default-avatar.png"}
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
              value={studentData.username}
              icon={<PersonIcon className="text-indigo-600" />}
            />
            <DataItem
              label="Last Login"
              value={studentData.lastLogin}
              icon={<CalendarIcon className="text-indigo-600" />}
            />
            <DataItem
              label="Last Password Change"
              value={studentData.lastPasswordChange}
              icon={<CalendarIcon className="text-indigo-600" />}
            />
            <DataItem
              label="Failed Logins"
              value={studentData.failedLogins}
              icon={<IdCardIcon className="text-indigo-600" />}
            />
            <DataItem
              label="E-Card Number"
              value={studentData.ecardNumber}
              icon={<IdCardIcon className="text-indigo-600" />}
            />
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
              value={studentData.program}
              icon={<GlobeIcon className="text-indigo-600" />}
            />
            <DataItem
              label="Program Type"
              value={studentData.programType}
              icon={<GlobeIcon className="text-indigo-600" />}
            />
            <DataItem
              label="College"
              value={studentData.college}
              icon={<HomeIcon className="text-indigo-600" />}
            />
            <DataItem
              label="Department"
              value={studentData.department}
              icon={<HomeIcon className="text-indigo-600" />}
            />
            <DataItem
              label="Admission Year"
              value={studentData.admissionYear}
              icon={<CalendarIcon className="text-indigo-600" />}
            />
            <DataItem
              label="Admission Date"
              value={studentData.admissionDate}
              icon={<CalendarIcon className="text-indigo-600" />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
