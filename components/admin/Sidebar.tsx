"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminNav } from "@/lib/admin/nav";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const groups = [
  "General",
  "Smart Home",
  "Monitoring",
  "Automation",
  "System",
] as const;

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:w-64 md:flex-col md:gap-4 md:border-r md:bg-background/60 md:backdrop-blur">
      <div className="px-5 pt-5">
        <div className="rounded-2xl border bg-background p-4 shadow-sm">
          <div className="text-sm font-semibold">SmartHome Admin</div>
          <div className="mt-1 text-xs text-muted-foreground">
            Manage homes, devices, firmware, monitoring
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 pb-6">
        <div className="space-y-5">
          {groups.map((g) => {
            const items = adminNav.filter((x) => x.group === g);
            return (
              <div key={g}>
                <div className="px-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {g}
                </div>
                <div className="mt-2 space-y-1">
                  {items.map((item) => {
                    const Icon = item.icon;

                    const active =
                      item.href === "/dashboard"
                        ? pathname === item.href
                        : pathname === item.href ||
                          pathname.startsWith(item.href + "/");

                    const base =
                      "flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition";
                    const activeCls =
                      "bg-primary/10 text-primary ring-1 ring-primary/15";
                    const idleCls =
                      "text-foreground/80 hover:bg-muted/60 hover:text-foreground";

                    if (item.comingSoon) {
                      return (
                        <div
                          key={item.href}
                          className={cn(base, "opacity-60")}
                          title="Coming soon"
                        >
                          <Icon className="h-4 w-4" />
                          <span className="flex-1">{item.label}</span>
                          <Badge variant="secondary" className="text-[10px]">
                            Soon
                          </Badge>
                        </div>
                      );
                    }

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(base, active ? activeCls : idleCls)}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="flex-1">{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </nav>

      <div className="px-5 pb-5">
        <div className="rounded-2xl border bg-muted/30 p-4 text-xs text-muted-foreground">
          Tip: Menu “Soon” bisa kamu aktifkan setelah halaman dibuat.
        </div>
      </div>
    </aside>
  );
}
