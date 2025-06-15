import { Card, CardContent } from "@/components/ui/card";
import { useDepartment } from "@/lib/react-query/hooks/useDepartment";
import {
  Stethoscope,
  Users,
  BookOpen,
  Leaf,
  Droplets,
  TreePine,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Department {
  id: number;
  collegeId: number;
  name: string;
  code: string;
  createdAt: string;
}

// Map of department codes to their respective icons and colors
const departmentConfig = {
  ANH: { icon: Stethoscope, color: "blue" },
  ANP: { icon: Users, color: "green" },
  CAA: { icon: BookOpen, color: "purple" },
  CRP: { icon: Leaf, color: "yellow" },
  IRD: { icon: Droplets, color: "cyan" },
  NRC: { icon: TreePine, color: "emerald" },
} as const;

export function DepartmentsTab() {
  const { data, isLoading, error } = useDepartment();

  // Ensure departments is an array
  const departments = Array.isArray(data?.departments) ? data.departments : [];

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        Failed to load departments. Please try again later.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Card className="border-0 shadow-sm">
        <CardContent className="p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Our Departments
          </h2>
          <div className="prose max-w-none">
            <p className="text-gray-600">
              Learn about our specialized departments and their contributions to
              agricultural education and research.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          // Loading skeletons
          [...Array(6)].map((_, i) => (
            <Card key={i} className="border-0">
              <CardContent className="p-6">
                <Skeleton className="h-12 w-12 rounded-lg mb-4" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-4" />
                <Skeleton className="h-4 w-1/4" />
              </CardContent>
            </Card>
          ))
        ) : departments.length > 0 ? (
          // Actual department cards
          departments.map((dept: Department) => {
            const config =
              departmentConfig[dept.code as keyof typeof departmentConfig];
            const Icon = config?.icon || BookOpen;
            const color = config?.color || "blue";

            return (
              <div
                key={dept.id}
                className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-${color}-500/10 to-${color}-600/10 opacity-0 group-hover:opacity-100 transition-opacity`}
                />
                <div className="p-6 relative">
                  <div
                    className={`w-12 h-12 bg-${color}-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className={`w-6 h-6 text-${color}-600`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {dept.name}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    Specialized education and research in{" "}
                    {dept.name.toLowerCase()}
                  </p>
                  <div
                    className={`flex items-center text-sm text-${color}-600`}
                  >
                    <span className="font-semibold">Code: {dept.code}</span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          // No departments found
          <div className="col-span-full text-center text-gray-500 py-8">
            No departments found.
          </div>
        )}
      </div>
    </div>
  );
}
