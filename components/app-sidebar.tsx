import Link from "next/link";

const items = [
  { href: "/dashboard", label: "Overview" },
  { href: "/devices", label: "Devices" },
  { href: "/firmware", label: "Firmware" },
  { href: "/ota", label: "OTA" },
  { href: "/monitoring", label: "Monitoring" },
];

export function AppSidebar() {
  return (
    <aside className="w-64 border-r bg-background p-4">
      <div className="mb-6">
        <div className="text-lg font-semibold">
          {process.env.NEXT_PUBLIC_APP_NAME ?? "Admin"}
        </div>
        <div className="text-sm text-muted-foreground">Smart Home</div>
      </div>
      <nav className="space-y-1">
        {items.map((it) => (
          <Link
            key={it.href}
            href={it.href}
            className="block rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
          >
            {it.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
