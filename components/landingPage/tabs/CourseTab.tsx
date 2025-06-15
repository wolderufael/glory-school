import { Card, CardContent } from "@/components/ui/card";

export function ProgramsTab() {
  return (
    <div>
      <Card className="border-0 shadow-sm">
        <CardContent className="p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Academic Programs
          </h2>
          <div className="prose max-w-none">
            <p className="text-gray-600">
              Explore our comprehensive range of undergraduate and graduate
              programs in agricultural sciences.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
