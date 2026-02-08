"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function Topbar() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="flex items-center justify-between border-b px-6 py-4">
      <div className="text-sm text-muted-foreground">Admin Dashboard</div>
      <Button variant="outline" onClick={logout}>
        Logout
      </Button>
    </header>
  );
}
