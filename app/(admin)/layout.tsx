import { AppSidebar } from "@/components/app-sidebar";
import { Topbar } from "@/components/topbar";
import AdminProviders from "./providers";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="flex flex-1 flex-col">
        <Topbar />
        <main className="flex-1 p-6">
          <AdminProviders>{children}</AdminProviders>
        </main>
      </div>
    </div>
  );
}
