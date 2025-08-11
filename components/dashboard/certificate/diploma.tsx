"use client";
import { useStudentInfo } from "@/lib/react-query/hooks/useStudentInfo";
import { getBackendFileUrl } from "@/lib/utils";
import { useAuthStore } from "@/lib/store/authStore";
import { Phone, Mail } from "lucide-react";
import Image from "next/image";

export default function Diploma() {
  const { data: studentInfo, isLoading } = useStudentInfo();
  const { user } = useAuthStore();
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-lg">Loading certificate...</div>
      </div>
    );
  }

  return (
    <div className="w-[297mm] h-[210mm] mx-auto p-4 bg-white print:p-0 print:w-full print:h-full print:mx-0">
      {/* Certificate Border */}
      <div className="border-8 border-blue-600 relative h-full">
        {/* Decorative Border Pattern */}
        <div className="border-4 border-gray-300 p-4 h-full">
          <div className="border-2 border-blue-400 p-4 h-full flex flex-col">
            {/* Header Section */}
            <div className="flex items-start justify-between mb-4">
              {/* College Logo */}
              <div className="flex-shrink-0 flex items-center">
                <Image
                  src="/glory-school.jpg"
                  alt="College Logo"
                  width={80}
                  height={80}
                  className="rounded-full border-2 border-gray-300"
                />
              </div>

              {/* Ministry Header - Center */}
              <div className="text-center flex-1 px-4">
                <div className="text-green-600 font-bold text-base">
                  በአዲስ አበባ ትምህርት ቢሮ
                </div>
                <div className="text-green-600 font-bold text-lg">
                  ADDIS ABABA EDUCATION BUREAU
                </div>
                <div className="text-blue-600 font-bold text-base mt-1">
                  ግሎሪ ትምህርት ቤት
                </div>
                <div className="text-blue-600 font-bold text-lg">
                  Glory School
                </div>
                <div className="text-green-600 font-bold text-base">
                  ሬጅስትራር ጽ/ቤት
                </div>
                <div className="text-green-600 font-bold text-base">
                  Office of Registrar
                </div>

                {/* Contact Information */}
                <div className="text-blue-600 text-xs mt-1 flex items-center justify-center gap-1">
                  <Phone className="font-bold w-3 h-3" />
                  <span>+251465511470</span>
                  <span>
                    {" "}
                    <span className="font-bold">ፋክስ/Fax:</span> +251465515285
                  </span>
                  <Mail className="font-bold w-3 h-3" />
                  <span>120</span>
                </div>
                <div className="text-green-600 text-xs">
                  አዲስ አበባ፣ ኢትዮጵያ
                </div>
                <div className="text-green-600 text-xs">
                  Addis Ababa, Ethiopia
                </div>
              </div>

              {/* Student Photo */}
              <div className="flex-shrink-0 border-2 border-gray-400 p-1">
                <img
                  src={
                    getBackendFileUrl(studentInfo?.profilePicture) ||
                    "/default-avatar.png"
                  }
                  alt="Profile"
                  className="w-[120px] h-[140px] object-cover"
                />
              </div>
            </div>

            {/* Certificate Content */}
            <div className="flex flex-grow">
              {/* Left Column - Ethiopian Text */}
              <div className="w-1/2 pr-3 text-sm">
                {/* Amharic Column Header */}
                <div className="text-center mb-4 border-b-2 border-gray-300 pb-2">
                  <div className="text-green-600 font-bold text-lg">
                    የማጠናቀቂያ ማረጋገጫ ሰርተፍኬት
                  </div>
                </div>
                <div className="mb-3">
                  <span className="font-bold">
                    {"አበበ"} {"ከበደ"}{" "}
                  </span>
                  የሁለተኛ ደረጃ ትምህርቱን የተካተቱ የትምህርት አይነቶች በሙሉ በስኬት{" "}
                  <span className="font-bold">በግሎሪ ትምህርት ቤት</span> በማጠናቀቁ በ ቀን{" "}
                  <span className="font-bold"> 03/11/2017 </span> ይህ የምስክር ወረቀት
                  ተሰጦታል ።
                </div>
              </div>

              {/* Right Column - English Text */}
              <div className="w-1/2 pr-3 text-sm">
                {/* አንግሊስህ Column Header */}
                <div className="text-center mb-4 border-b-2 border-gray-300 pb-2">
                  <div className="text-green-600 font-bold text-lg">
                    Certificate of Completion
                  </div>
                </div>
                {/* <div className="mb-3">
                  Student{" "}
                  <span className="font-bold">
                    {studentInfo?.user?.firstName || "SOLOMON"}{" "}
                    {studentInfo?.user?.lastName || "MARKOS KARA"}{" "}
                  </span>
                  has successfully accomplished{" "}
                  <span className="font-bold">High Shoool</span> in the
                  occupational standard of{" "}
                  <span className="font-bold">
                    {studentInfo.department.name}
                  </span>{" "}
                  which qualifies him/her for{" "}
                  <span className="font-bold">
                    Level-{studentInfo.currentStudyingLevel}
                  </span>{" "}
                  from march 2022 to July 10, 2023.
                </div> */}
                <div className="mb-3">
                  This is to certify that{" "}
                  <span className="font-bold">
                    {studentInfo?.user?.firstName || "SOLOMON"}{" "}
                    {studentInfo?.user?.lastName || "MARKOS KARA"}{" "}
                  </span>
                  has successfully completed the prescribed course of study and
                  fulfilled all academic requirements set forth by{" "}
                  <span className="font-bold">Glory School</span>. In
                  recognition of their dedication, perseverance, and
                  achievement, this certificate is awarded on this day,{" "}
                  <span className="font-bold">
                    {new Date().toLocaleDateString()}
                  </span>
                  , as a testament to their readiness to pursue higher education
                  and contribute meaningfully to society.
                </div>
              </div>
            </div>

            {/* Signature Section */}
            <div className="flex justify-between mt-auto pt-6">
              <div className="text-center">
                <div className="border-t-2 border-black w-40 mb-1"></div>
                <div className="font-bold text-base">School Registrar</div>
              </div>

              <div className="text-center">
                <div className="border-t-2 border-black w-40 mb-1"></div>
                <div className="font-bold text-base">School Director</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
