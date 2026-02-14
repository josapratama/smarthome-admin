# Implementation Guide - Smart Home Frontend

Panduan lengkap implementasi Smart Home Frontend dari awal sampai selesai.

## Table of Contents

1. [Setup Project](#setup-project)
2. [Install Shadcn/ui](#install-shadcnui)
3. [Authentication Pages](#authentication-pages)
4. [Dashboard Layout](#dashboard-layout)
5. [Device Management](#device-management)
6. [Energy Monitoring](#energy-monitoring)
7. [Alarm System](#alarm-system)
8. [Home & Members](#home--members)
9. [Settings](#settings)
10. [Real-time Updates](#real-time-updates)

---

## Setup Project

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_WS_URL=ws://localhost:3000
NEXT_PUBLIC_APP_NAME=Smart Home
```

### 3. Start Development

```bash
npm run dev
```

---

## Install Shadcn/ui

### 1. Initialize Shadcn/ui

```bash
npx shadcn-ui@latest init
```

Pilih:

- Style: Default
- Base color: Slate
- CSS variables: Yes

### 2. Install Components

```bash
# Core components
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
npx shadcn-ui@latest add label
npx shadcn-ui@latest add form
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add avatar
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add separator
npx shadcn-ui@latest add toast
npx shadcn-ui@latest add alert
npx shadcn-ui@latest add tabs
npx shadcn-ui@latest add select
npx shadcn-ui@latest add switch
npx shadcn-ui@latest add slider
npx shadcn-ui@latest add progress
npx shadcn-ui@latest add skeleton
npx shadcn-ui@latest add table
npx shadcn-ui@latest add sheet
```

---

## Authentication Pages

### 1. Login Page

Create `src/app/(auth)/login/page.tsx`:

```tsx
"use client";

import { useState } from "react";
import { useAuth } from "@/lib/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoggingIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ username, password });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md p-6">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoggingIn}>
            {isLoggingIn ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
```

### 2. Register Page

Similar structure, gunakan `useAuth().register`

---

## Dashboard Layout

### 1. Main Layout

Create `src/app/(main)/layout.tsx`:

```tsx
"use client";

import { useWebSocket } from "@/lib/hooks/use-websocket";
import Navbar from "@/components/layout/navbar";
import Sidebar from "@/components/layout/sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useWebSocket(); // Initialize WebSocket

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
```

### 2. Navbar Component

Create `src/components/layout/navbar.tsx`:

```tsx
"use client";

import { useAuth } from "@/lib/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="border-b px-6 py-4 flex items-center justify-between">
      <h1 className="text-xl font-bold">Smart Home</h1>
      <div className="flex items-center gap-4">
        <span>{user?.username}</span>
        <Avatar />
        <Button onClick={() => logout()}>Logout</Button>
      </div>
    </nav>
  );
}
```

### 3. Sidebar Component

Create `src/components/layout/sidebar.tsx`:

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Zap, Bell, Settings } from "lucide-react";

const menuItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/devices", label: "Devices", icon: Zap },
  { href: "/alarms", label: "Alarms", icon: Bell },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r p-4">
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg ${
              pathname === item.href ? "bg-primary text-white" : ""
            }`}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
```

---

## Device Management

### 1. Device List Page

Create `src/app/(main)/devices/page.tsx`:

```tsx
"use client";

import { useDevices } from "@/lib/hooks/use-devices";
import DeviceCard from "@/components/devices/device-card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DevicesPage() {
  const { data, isLoading } = useDevices();

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-48" />
        ))}
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Devices</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.data.map((device) => (
          <DeviceCard key={device.id} device={device} />
        ))}
      </div>
    </div>
  );
}
```

### 2. Device Card Component

Create `src/components/devices/device-card.tsx`:

```tsx
"use client";

import { Device } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useSendCommand } from "@/lib/hooks/use-devices";

export default function DeviceCard({ device }: { device: Device }) {
  const sendCommand = useSendCommand();

  const handleToggle = async (checked: boolean) => {
    await sendCommand.mutateAsync({
      deviceId: device.id,
      type: "SET_STATE",
      payload: { status: checked },
    });
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">{device.deviceName}</h3>
        <Switch checked={device.status} onCheckedChange={handleToggle} />
      </div>
      <p className="text-sm text-muted-foreground">{device.room?.name}</p>
      <p className="text-xs text-muted-foreground">
        {device.lastSeenAt ? "Online" : "Offline"}
      </p>
    </Card>
  );
}
```

---

## Energy Monitoring

### 1. Energy Dashboard

Create `src/app/(main)/energy/page.tsx`:

```tsx
"use client";

import { useEnergyStats } from "@/lib/hooks/use-energy";
import { Card } from "@/components/ui/card";
import EnergyChart from "@/components/energy/energy-chart";

export default function EnergyPage() {
  const { data: stats } = useEnergyStats();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Energy Monitoring</h1>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Today</p>
          <p className="text-2xl font-bold">{stats?.today} kWh</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">This Week</p>
          <p className="text-2xl font-bold">{stats?.thisWeek} kWh</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">This Month</p>
          <p className="text-2xl font-bold">{stats?.thisMonth} kWh</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Estimated Cost</p>
          <p className="text-2xl font-bold">Rp {stats?.estimatedMonthlyCost}</p>
        </Card>
      </div>

      <Card className="p-6">
        <EnergyChart />
      </Card>
    </div>
  );
}
```

### 2. Energy Chart Component

Create `src/components/energy/energy-chart.tsx`:

```tsx
"use client";

import { useDailyEnergyUsage } from "@/lib/hooks/use-energy";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function EnergyChart() {
  const { data } = useDailyEnergyUsage(1, "2024-01-01", "2024-01-31");

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="usageDate" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="energyKwh" stroke="#3b82f6" />
      </LineChart>
    </ResponsiveContainer>
  );
}
```

---

## Alarm System

### 1. Alarm List Page

Create `src/app/(main)/alarms/page.tsx`:

```tsx
"use client";

import { useAlarms } from "@/lib/hooks/use-alarms";
import AlarmCard from "@/components/alarms/alarm-card";

export default function AlarmsPage() {
  const { data } = useAlarms({ status: "OPEN" });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Alarms</h1>
      <div className="space-y-4">
        {data?.data.map((alarm) => (
          <AlarmCard key={alarm.id} alarm={alarm} />
        ))}
      </div>
    </div>
  );
}
```

### 2. Alarm Card Component

Create `src/components/alarms/alarm-card.tsx`:

```tsx
"use client";

import { AlarmEvent } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAcknowledgeAlarm, useResolveAlarm } from "@/lib/hooks/use-alarms";

export default function AlarmCard({ alarm }: { alarm: AlarmEvent }) {
  const acknowledge = useAcknowledgeAlarm();
  const resolve = useResolveAlarm();

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge
              variant={
                alarm.severity === "CRITICAL" ? "destructive" : "default"
              }
            >
              {alarm.severity}
            </Badge>
            <span className="font-semibold">{alarm.type}</span>
          </div>
          <p className="text-sm">{alarm.message}</p>
          <p className="text-xs text-muted-foreground mt-2">
            {new Date(alarm.triggeredAt).toLocaleString()}
          </p>
        </div>
        <div className="flex gap-2">
          {alarm.status === "OPEN" && (
            <Button size="sm" onClick={() => acknowledge.mutate(alarm.id)}>
              Acknowledge
            </Button>
          )}
          {alarm.status === "ACKED" && (
            <Button size="sm" onClick={() => resolve.mutate(alarm.id)}>
              Resolve
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
```

---

## Real-time Updates

WebSocket sudah disetup di `useWebSocket` hook dan dipanggil di main layout.

Real-time updates otomatis untuk:

- Device status changes
- Telemetry data
- New alarms
- Energy updates

---

## Testing

```bash
# Type check
npm run type-check

# Lint
npm run lint

# Build
npm run build
```

---

## Deployment

### Vercel

```bash
vercel
```

### Docker

```bash
docker build -t smarthome-frontend .
docker run -p 3001:3001 smarthome-frontend
```

---

## Next Steps

1. Add more charts (Recharts)
2. Implement PWA
3. Add push notifications
4. Improve mobile responsiveness
5. Add dark mode toggle
6. Implement i18n
7. Add unit tests
8. Add E2E tests

---

Untuk pertanyaan, lihat [README.md](./README.md) atau [QUICK_START.md](./QUICK_START.md).
