import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Home,
  DoorClosed,
  Cpu,
  Activity,
  TerminalSquare,
  Siren,
  Sparkles,
  Bell,
  Package,
  CloudDownload,
  MailPlus,
  SlidersHorizontal,
} from "lucide-react";

export type AdminNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  group: "General" | "Smart Home" | "Monitoring" | "Automation" | "System";
  comingSoon?: boolean;
};

export const adminNav: AdminNavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    group: "General",
  },

  {
    label: "Homes",
    href: "/homes",
    icon: Home,
    group: "Smart Home",
    comingSoon: true,
  },
  {
    label: "Rooms",
    href: "/rooms",
    icon: DoorClosed,
    group: "Smart Home",
    comingSoon: true,
  },
  { label: "Devices", href: "/devices", icon: Cpu, group: "Smart Home" },

  {
    label: "Monitoring",
    href: "/monitoring",
    icon: Activity,
    group: "Monitoring",
  },
  {
    label: "Commands",
    href: "/commands",
    icon: TerminalSquare,
    group: "Monitoring",
    comingSoon: true,
  },
  {
    label: "Alarms",
    href: "/alarms",
    icon: Siren,
    group: "Monitoring",
    comingSoon: true,
  },

  {
    label: "AI",
    href: "/ai",
    icon: Sparkles,
    group: "Automation",
    comingSoon: true,
  },
  {
    label: "Notifications",
    href: "/notifications",
    icon: Bell,
    group: "Automation",
    comingSoon: true,
  },
  {
    label: "Invites",
    href: "/invites",
    icon: MailPlus,
    group: "Automation",
    comingSoon: true,
  },

  { label: "Firmware", href: "/firmware", icon: Package, group: "System" },
  {
    label: "OTA Jobs",
    href: "/ota",
    icon: CloudDownload,
    group: "System",
    comingSoon: true,
  },
  {
    label: "Device Config",
    href: "/device-config",
    icon: SlidersHorizontal,
    group: "System",
    comingSoon: true,
  },
];
