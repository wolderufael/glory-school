import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/lib/providers/query-provider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Glory School Portal",
  description:
    "Student Information System for Glory School",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <QueryProvider>
          {children}
          <Toaster position="top-right" />
        </QueryProvider>
      </body>
    </html>
  );
}
