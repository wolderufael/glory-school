/* import { StudentData } from "./types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MapPin,
  Phone,
  User,
  Home,
  Building2,
  MapPinned,
  Contact2,
} from "lucide-react";

interface AddressContactProps {
  studentData: StudentData;
}

export function AddressContact({ studentData }: AddressContactProps) {
  return (
    <div className="grid grid-cols-2 gap-6">
  
      
      <Card className="border border-blue-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <MapPin className="h-5 w-5 text-blue-700" />
            </div>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Address Information
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <Building2 className="h-4 w-4 mt-1 text-blue-500" />
                <div>
                  <p className="text-xs text-gray-500">Region</p>
                  <p className="text-sm text-gray-900">{studentData?.region}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPinned className="h-4 w-4 mt-1 text-blue-500" />
                <div>
                  <p className="text-xs text-gray-500">Zone</p>
                  <p className="text-sm text-gray-900">{studentData?.zone}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 text-blue-500" />
                <div>
                  <p className="text-xs text-gray-500">Woreda</p>
                  <p className="text-sm text-gray-900">{studentData?.woreda}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 text-blue-500" />
                <div>
                  <p className="text-xs text-gray-500">Kebele</p>
                  <p className="text-sm text-gray-900">{studentData?.kebele}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Home className="h-4 w-4 mt-1 text-blue-500" />
                <div>
                  <p className="text-xs text-gray-500">House No.</p>
                  <p className="text-sm text-gray-900">{studentData?.houseNo}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      
      <Card className="border border-purple-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Contact2 className="h-5 w-5 text-purple-700" />
            </div>
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Emergency Contact
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-2">
              <User className="h-4 w-4 mt-1 text-purple-500" />
              <div>
                <p className="text-xs text-gray-500">Full Name</p>
                <p className="text-sm text-gray-900">
                  {studentData.emergencyContact.name}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <User className="h-4 w-4 mt-1 text-purple-500" />
              <div>
                <p className="text-xs text-gray-500">Relationship</p>
                <p className="text-sm text-gray-900">
                  {studentData.emergencyContact.relation}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Phone className="h-4 w-4 mt-1 text-purple-500" />
              <div>
                <p className="text-xs text-gray-500">Phone Number</p>
                <p className="text-sm text-gray-900">
                  {studentData.emergencyContact.phone}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
 */