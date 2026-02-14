"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Cpu,
  Home,
  Zap,
  AlertTriangle,
  Settings,
} from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

export function UserSidebar() {
  const pathname = usePathname();
  const { t } = useTranslation();

  const navigation = [
    { name: t("dashboard"), href: "/user/dashboard", icon: LayoutDashboard },
    { name: t("devices"), href: "/user/devices", icon: Cpu },
    { name: t("homes"), href: "/user/homes", icon: Home },
    { name: t("energy"), href: "/user/energy", icon: Zap },
    { name: t("alarms"), href: "/user/alarms", icon: AlertTriangle },
    { name: t("settings"), href: "/user/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-background border-r border-border">
      <div className="p-6">
        <h1 className="text-2xl font-bold">Smart Home</h1>
        <p className="text-sm text-muted-foreground mt-1">User Dashboard</p>
      </div>

      <nav className="px-4 space-y-1">
        {navigation.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-foreground hover:bg-accent"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
