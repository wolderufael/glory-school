import { RegistrarSidebar } from "@/components/registrar";
import "../../globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function RegistrarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <div className="min-h-screen min-w-full md:flex bg-slate-50">
        <RegistrarSidebar />
        <div className="flex-1 flex flex-col md:ml-8">
          <main className="flex-1 no-scrollbar overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
