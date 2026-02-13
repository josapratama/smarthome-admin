"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { qk } from "@/lib/api/queries";
import { apiFetchBrowser } from "@/lib/api/client.browser";
import type { ApiListResponse } from "@/lib/api/normalize";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type DeviceDTO = {
  id: number;
  deviceName: string;
  roomId: number | null;
  status: boolean;
  updatedAt: string;
  lastSeenAt: string | null;
  mqttClientId: string | null;
  deviceKey: string | null;
  deviceType: string;
  capabilities: unknown | null;
  pairedByUserId: number;
  homeId: number;
};

function statusBadge(status: boolean) {
  return status ? (
    <Badge>Online</Badge>
  ) : (
    <Badge variant="secondary">Offline</Badge>
  );
}

function fmtDateTime(v?: string | null) {
  if (!v) return "-";
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? v : d.toLocaleString();
}

export default function DevicesClient() {
  const [qText, setQText] = useState("");

  const q = useQuery({
    queryKey: qk.devices(),
    queryFn: async () => {
      const payload = await apiFetchBrowser<ApiListResponse<DeviceDTO[]>>(
        "/api/devices",
        { method: "GET" },
      );
      return payload.data ?? [];
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
            Daftar device yang bisa kamu akses (owner/member).
          </p>
        </div>

        <div className="flex w-full gap-2 sm:w-auto">
          <Input
            value={qText}
            onChange={(e) => setQText(e.target.value)}
            placeholder="Search: name / type / mqtt / homeId / id"
            className="sm:w-[360px]"
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

      <Card className="rounded-2xl shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Device List</CardTitle>
        </CardHeader>

        <CardContent>
          {q.isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : q.error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {(q.error as Error).message}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-sm text-muted-foreground">
              Tidak ada device.
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
                      <Badge variant="outline">{d.deviceType}</Badge>
                      <span className="text-xs text-muted-foreground">
                        homeId: {d.homeId}
                      </span>
                    </div>

                    <div className="mt-1 text-xs text-muted-foreground">
                      last seen: {fmtDateTime(d.lastSeenAt)} • updated:{" "}
                      {fmtDateTime(d.updatedAt)}
                    </div>

                    <div className="mt-1 text-xs text-muted-foreground">
                      mqtt: {d.mqttClientId ?? "-"} • roomId: {d.roomId ?? "-"}
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-3">
                    <Link
                      className="text-sm underline underline-offset-4 hover:opacity-80"
                      href={`/ota?deviceId=${d.id}`}
                    >
                      View OTA
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
