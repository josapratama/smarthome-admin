"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { apiJson } from "@/lib/api/https";
import { qk } from "@/lib/api/queries";
import type { Device } from "@/lib/api/types";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

function statusBadge(online?: boolean | null) {
  if (online === true) return <Badge>Online</Badge>;
  if (online === false) return <Badge variant="secondary">Offline</Badge>;
  return <Badge variant="outline">Unknown</Badge>;
}

function fmtLastSeen(v?: string | null) {
  if (!v) return "-";
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? v : d.toLocaleString();
}

export default function DevicesClient() {
  const q = useQuery({
    queryKey: qk.devices(),
    queryFn: async () => {
      // asumsi proxy return array atau {data: array} — adapt di sini
      const payload = await apiJson<unknown>(`/api/devices`, { method: "GET" });
      if (Array.isArray(payload)) return payload as Device[];
      if (payload && typeof payload === "object" && "data" in payload) {
        return (payload as { data: Device[] }).data;
      }
      return [];
    },
    refetchInterval: 5_000,
  });

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Devices</h1>

      <Card>
        <CardHeader>
          <CardTitle>Device List</CardTitle>
        </CardHeader>
        <CardContent>
          {q.isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : q.error ? (
            <div className="text-sm text-destructive">
              {(q.error as Error).message}
            </div>
          ) : (
            <div className="divide-y rounded-md border">
              {(q.data ?? []).map((d) => (
                <div
                  key={d.id}
                  className="flex items-center justify-between gap-3 p-3"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-medium">
                        #{d.id} {d.name ? `- ${d.name}` : ""}
                      </span>
                      {statusBadge(d.online)}
                      <span className="text-xs text-muted-foreground">
                        last seen: {fmtLastSeen(d.lastSeen)}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      serial: {d.serial ?? "-"}
                    </div>
                  </div>

                  <Link
                    className="text-sm underline underline-offset-4 hover:opacity-80"
                    href={`/ota?deviceId=${d.id}`}
                  >
                    View OTA
                  </Link>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
