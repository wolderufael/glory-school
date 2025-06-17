import CourseRegistration from "@/components/dashboard/registration/course-registration";

export default function CourseRegistrationPage() {
  const studentId = "8";
  return (
    <div className="p-6">
      <CourseRegistration studentId={studentId} />
    </div>
  );
}
