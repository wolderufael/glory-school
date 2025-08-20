"use client";

import { useRouter } from "next/navigation";

export default function TestCategoryPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Test Category Page
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          This is a test page to verify routing is working.
        </p>
        <div className="space-y-4">
          <button
            onClick={() =>
              router.push("/dashboard/e-library/category/mathematics")
            }
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            Go to Mathematics Category
          </button>
          <button
            onClick={() => router.push("/dashboard/e-library/category/science")}
            className="block w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            Go to Science Category
          </button>
          <button
            onClick={() => router.back()}
            className="block w-full bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
