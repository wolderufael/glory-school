/* import { getCurrentUser } from '@/lib/auth/getCurrentUser';
import { UserType } from '@/utils/typeUser';
import { redirect } from 'next/navigation';


export default async function StudentLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  if (!user || user.role !== UserType.Department) {
    return redirect('/unauthorized');
  }

  return (<div>{children}</div>);
}
 */

import { DepartmentSidebar } from "@/components/department/sidebar";
import "../../globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DepartmentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <div className="min-h-screen min-w-full md:flex bg-slate-50">
        <DepartmentSidebar />
        <div className="flex-1 flex flex-col md:ml-8">
          <main className="flex-1 no-scrollbar overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
