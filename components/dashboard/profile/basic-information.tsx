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
  Pencil1Icon,
  CheckIcon,
  Cross2Icon,
} from "@radix-ui/react-icons";
import { GraduationCap, BookOpen } from "lucide-react";
import { getBackendFileUrl } from "@/lib/utils";
import { useUpdateStudent, useUpdateUser } from "@/lib/react-query/mutations/useUpdateStudent";
import { getLocalStorage } from "@/utils/localStorage";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

// Editable field component
function EditableField({
  label,
  value,
  icon,
  fieldName,
  onUpdate,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string | undefined;
  icon?: React.ReactNode;
  fieldName: string;
  onUpdate: (field: string, value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value || "");

  useEffect(() => {
    setEditValue(value || "");
  }, [value]);

  const handleSave = () => {
    if (editValue.trim() !== (value || "")) {
      onUpdate(fieldName, editValue.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value || "");
    setIsEditing(false);
  };

  return (
    <div className="p-4 from-indigo-50 to-blue-50 rounded-lg border border-indigo-100">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
            {icon}
          </div>
          <h4 className="font-medium text-gray-900">{label}</h4>
        </div>
        {!isEditing && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="h-8 w-8 p-0 hover:bg-indigo-100"
          >
            <Pencil1Icon className="h-4 w-4 text-indigo-600" />
          </Button>
        )}
      </div>

      {isEditing ? (
        <div className="flex items-center gap-2 pl-11">
          <Input
            type={type}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            placeholder={placeholder}
            className="flex-1 text-sm"
            autoFocus
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSave}
            className="h-8 w-8 p-0 hover:bg-green-100"
          >
            <CheckIcon className="h-4 w-4 text-green-600" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCancel}
            className="h-8 w-8 p-0 hover:bg-red-100"
          >
            <Cross2Icon className="h-4 w-4 text-red-600" />
          </Button>
        </div>
      ) : (
        <p className="text-sm text-gray-600 pl-11 break-all">
          {value || placeholder || "Not provided"}
        </p>
      )}
    </div>
  );
}

const formatDate = (dateString: string) => {
  if (!dateString) return "";
  return dateString.split("T")[0];
};

export function BasicInformation({ studentData }: BasicInformationProps) {
  const studentId = Number(getLocalStorage("studentId"));
  const userId = Number(getLocalStorage("currentUserId"));
  const { mutate: updateStudent } = useUpdateStudent();
  const { mutate: updateUser } = useUpdateUser();

  const handleUpdateStudent = (field: string, value: string) => {
    updateStudent({ studentId, field, value });
  };
  const handleUpdateUser = (field: string, value: string) => {
    console.log("userId", userId);
    console.log("field", field);
    console.log("value", value);
    updateUser({ userId, field, value });
  };

  return (
    <div className="space-y-6 max-sm:px-4">
      {/* Top Section - Profile Picture and Access Information */}
      <div className="grid grid-cols-2 gap-6 max-sm:grid-cols-1">
      
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
                src={
                  getBackendFileUrl(studentData?.profilePicture) ||
                  "/default-avatar.png"
                }
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
            {/* Email Address */}
            <EditableField
              label="Email Address"
              value={studentData?.user?.email}
              icon={<EnvelopeClosedIcon className="h-4 w-4 text-indigo-600" />}
              fieldName="email"
              onUpdate={handleUpdateUser}
              placeholder="Enter email address"
              type="email"
            />
            {/* Phone Number */}
            <EditableField
              label="Phone Number"
              value={studentData?.user?.phoneNumber}
              icon={<MobileIcon className="h-4 w-4 text-indigo-600" />}
              fieldName="phoneNumber"
              onUpdate={handleUpdateStudent}
              placeholder="Enter phone number"
              type="tel"
            />

            {/* Home Phone*/}
            <EditableField
              label="Home Phone"
              value={studentData?.phoneHome}
              icon={<HomeIcon className="h-4 w-4 text-indigo-600" />}
              fieldName="phoneHome"
              onUpdate={handleUpdateStudent}
              placeholder="Enter home phone number"
              type="tel"
            />
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

              {/* Place of Birth Information */}
              <div>
                <SectionHeader title="Place of Birth" />
                <div className="grid grid-cols-2 gap-6 max-sm:grid-cols-1">
                  <DataItem
                    label="Birth Town"
                    value={studentData?.placeOfBirthTown}
                    icon={<GlobeIcon className="text-indigo-600" />}
                  />
                  <DataItem
                    label="Birth Zone"
                    value={studentData?.placeOfBirthZone}
                    icon={<GlobeIcon className="text-indigo-600" />}
                  />
                  <DataItem
                    label="Birth Region"
                    value={studentData?.placeOfBirthRegion}
                    icon={<GlobeIcon className="text-indigo-600" />}
                  />
                </div>
              </div>

              {/* Address Information */}
              <div>
                <SectionHeader title="Current Address" />
                <div className="grid grid-cols-2 gap-6 max-sm:grid-cols-1">
                  <DataItem
                    label="Kebele"
                    value={studentData?.addressKebele}
                    icon={<HomeIcon className="text-indigo-600" />}
                  />
                  <DataItem
                    label="Woreda"
                    value={studentData?.addressWoreda}
                    icon={<HomeIcon className="text-indigo-600" />}
                  />
                  <DataItem
                    label="Town"
                    value={studentData?.addressTown}
                    icon={<HomeIcon className="text-indigo-600" />}
                  />
                  <DataItem
                    label="Zone"
                    value={studentData?.addressZone}
                    icon={<GlobeIcon className="text-indigo-600" />}
                  />
                  <DataItem
                    label="Region"
                    value={studentData?.addressRegion}
                    icon={<GlobeIcon className="text-indigo-600" />}
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
                value={"Glory School"}
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
