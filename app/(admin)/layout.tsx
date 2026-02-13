import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { QueryProvider } from "@/lib/query/provider";
import { Sidebar } from "@/components/admin/Sidebar";
import { Topbar } from "@/components/admin/Topbar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jar = await cookies();
  const token = jar.get("admin_token")?.value;
  if (!token) redirect("/login");

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="flex">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar />
          <QueryProvider>
            <main className="p-4 md:p-6">{children}</main>
          </QueryProvider>
        </div>
      </div>
    </div>
  );
}
