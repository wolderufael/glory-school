
import { AppSidebar } from "@/components/dashboard/sidebar";
import "../globals.css";
import { TopNav } from "@/components/dashboard/top-nav";
import { SidebarProvider } from "@/components/ui/sidebar";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <SidebarProvider>
            <div className="min-h-screen min-w-full md:flex">
                <AppSidebar />
                <div className="flex-1 flex  flex-col md:ml-8">
                    <TopNav   />
                    <main className="flex-1 no-scrollbar overflow-y-auto p-4">{children}  </main>
                </div>
            </div>
     </SidebarProvider>
  );
}