
import { UserType } from "@/utils/typeUser";
import { redirect } from "next/navigation";

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {


/*   if (!user || user.role !== UserType.Teacher) {
    return redirect("/unauthorized");
  } */

  return <div>{children}</div>;
}
