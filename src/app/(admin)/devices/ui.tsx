"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { qk } from "@/lib/api/queries";
import { apiFetchBrowser } from "@/lib/api/client.browser";
import type { DeviceDTO } from "@/lib/api/dto/devices.dto";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function statusBadge(status: boolean) {
  return status ? (
    <Badge>Online</Badge>
  ) : (
    <Badge variant="secondary">Offline</Badge>
  );
}

function deviceTypeBadge(type: string) {
  const colors: Record<string, string> = {
    LIGHT: "bg-yellow-100 text-yellow-800",
    FAN: "bg-blue-100 text-blue-800",
    SENSOR_NODE: "bg-green-100 text-green-800",
    POWER_METER: "bg-purple-100 text-purple-800",
    OTHER: "bg-gray-100 text-gray-800",
  };

  return (
    <Badge variant="outline" className={colors[type] || colors.OTHER}>
      {type}
    </Badge>
  );
}

function fmtDateTime(v?: string | null) {
  if (!v) return "-";
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? v : d.toLocaleString();
}

export default function DevicesClient() {
  const [qText, setQText] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [homeIdFilter, setHomeIdFilter] = useState<string>("");

  const q = useQuery({
    queryKey: qk.devices.list(homeIdFilter ? Number(homeIdFilter) : undefined),
    queryFn: async () => {
      const params: Record<string, string> = {};
      if (homeIdFilter) params.homeId = homeIdFilter;
      if (statusFilter !== "all") params.status = statusFilter;

      const response = await apiFetchBrowser<{ data: DeviceDTO[] }>(
        "/api/v1/devices",
        { params },
      );
      return response.data ?? [];
    },
    refetchInterval: 5_000,
  });

  const filtered = useMemo(() => {
    const t = qText.trim().toLowerCase();
    if (!t) return q.data ?? [];
    return (q.data ?? []).filter((d) => {
      return (
        String(d.id).includes(t) ||
        d.deviceName.toLowerCase().includes(t) ||
        (d.mqttClientId ?? "").toLowerCase().includes(t) ||
        (d.deviceType ?? "").toLowerCase().includes(t) ||
        String(d.homeId).includes(t)
      );
    });
  }, [q.data, qText]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Devices</h1>
          <p className="text-sm text-muted-foreground">
            Manage all devices across your homes.
          </p>
        </div>

        <div className="flex w-full gap-2 sm:w-auto">
          <Input
            value={qText}
            onChange={(e) => setQText(e.target.value)}
            placeholder="Search devices..."
            className="sm:w-[300px]"
          />
          <Button
            variant="outline"
            onClick={() => q.refetch()}
            disabled={q.isFetching}
          >
            Refresh
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Status:</label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="true">Online</SelectItem>
              <SelectItem value="false">Offline</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Home ID:</label>
          <Input
            value={homeIdFilter}
            onChange={(e) => setHomeIdFilter(e.target.value)}
            placeholder="Filter by home"
            className="w-32"
          />
        </div>
      </div>

      <Card className="rounded-2xl shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">
            Device List ({filtered.length} devices)
          </CardTitle>
        </CardHeader>

        <CardContent>
          {q.isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          ) : q.error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {(q.error as Error).message}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-sm text-muted-foreground">
              {qText || statusFilter !== "all" || homeIdFilter
                ? "No devices match your filters."
                : "No devices found."}
            </div>
          ) : (
            <div className="divide-y rounded-xl border">
              {filtered.map((d) => (
                <div
                  key={d.id}
                  className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-medium">
                        #{d.id} • {d.deviceName}
                      </span>
                      {statusBadge(d.status)}
                      {deviceTypeBadge(d.deviceType)}
                      <Badge variant="outline" className="text-xs">
                        Home: {d.homeId}
                      </Badge>
                      {d.roomId && (
                        <Badge variant="outline" className="text-xs">
                          Room: {d.roomId}
                        </Badge>
                      )}
                    </div>

                    <div className="mt-1 text-xs text-muted-foreground">
                      Last seen: {fmtDateTime(d.lastSeenAt)} • Updated:{" "}
                      {fmtDateTime(d.updatedAt)}
                    </div>

                    <div className="mt-1 text-xs text-muted-foreground">
                      MQTT: {d.mqttClientId ?? "-"} • Paired by:{" "}
                      {d.pairedByUserId}
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-3">
                    <Link
                      className="text-sm underline underline-offset-4 hover:opacity-80"
                      href={`/devices/${d.id}/telemetry`}
                    >
                      Telemetry
                    </Link>
                    <Link
                      className="text-sm underline underline-offset-4 hover:opacity-80"
                      href={`/ota?deviceId=${d.id}`}
                    >
                      OTA
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {q.isFetching && !q.isLoading ? (
            <div className="mt-3 text-xs text-muted-foreground">Updating…</div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
