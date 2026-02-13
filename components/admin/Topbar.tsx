"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "./Sidebar";

function titleFromPath(pathname: string) {
  const map: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/devices": "Devices",
    "/monitoring": "Monitoring",
    "/firmware": "Firmware",
    "/devices/firmware": "Device Firmware",
  };
  // exact match first
  if (map[pathname]) return map[pathname];
  // prefix fallback
  const hit = Object.entries(map).find(
    ([k]) => k !== "/dashboard" && pathname.startsWith(k),
  );
  return hit?.[1] ?? "Admin";
}

export function Topbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  async function logout() {
    try {
      setLoading(true);
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      router.replace("/login");
      router.refresh();
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b bg-background/70 backdrop-blur">
      <div className="flex items-center gap-3 px-4 py-3 md:px-6">
        {/* Mobile drawer */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open menu">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
              <Sidebar />
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex flex-1 items-center justify-between">
          <div>
            <div className="text-sm text-muted-foreground">SmartHome Admin</div>
            <div className="text-lg font-semibold leading-tight">
              {titleFromPath(pathname)}
            </div>
          </div>

          <Button variant="outline" onClick={logout} disabled={loading}>
            <LogOut className="mr-2 h-4 w-4" />
            {loading ? "Logging out..." : "Logout"}
          </Button>
        </div>
      </div>
    </header>
  );
}
