"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { qk } from "@/lib/api/queries";
import { fetchDevices } from "@/lib/api/devices.client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchOtaJobsByDevice, triggerOta } from "@/lib/api/ota.browser";

function statusBadge(online?: boolean | null) {
  if (online === true) return <Badge>Online</Badge>;
  if (online === false) return <Badge variant="secondary">Offline</Badge>;
  return <Badge variant="outline">Unknown</Badge>;
}

function fmtLastSeen(v?: string | null) {
  if (!v) return "-";
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return v;
  return d.toLocaleString();
}

export default function OtaClientPage({
  initialDeviceId,
}: {
  initialDeviceId?: number;
}) {
  const router = useRouter();
  const qc = useQueryClient();

  const [deviceId, setDeviceId] = React.useState<number | undefined>(
    initialDeviceId,
  );
  const [releaseId, setReleaseId] = React.useState<number | undefined>(
    undefined,
  );

  const devicesQ = useQuery({
    queryKey: qk.devices(),
    queryFn: fetchDevices,
    refetchInterval: 5_000, // device status polling
  });

  const jobsQ = useQuery({
    queryKey: deviceId
      ? qk.otaJobsByDevice(deviceId)
      : ["ota", "device-jobs", "none"],
    queryFn: () => fetchOtaJobsByDevice(deviceId!),
    enabled: !!deviceId,
    refetchInterval: 3_000,
  });

  const triggerM = useMutation({
    mutationFn: async () => {
      if (!deviceId || !releaseId)
        throw new Error("Device & release wajib dipilih");
      return triggerOta(deviceId, releaseId);
    },
    onSuccess: async () => {
      if (deviceId) {
        await qc.invalidateQueries({ queryKey: qk.otaJobsByDevice(deviceId) });
      }
    },
  });

  // keep URL in sync
  React.useEffect(() => {
    if (!deviceId) return;
    router.replace(`/ota?deviceId=${deviceId}`);
  }, [deviceId, router]);

  const selectedDevice = devicesQ.data?.find((d) => d.id === deviceId);

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold">OTA</h1>
        <p className="text-sm text-muted-foreground">
          Trigger OTA + monitoring jobs (polling via TanStack Query)
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Trigger OTA</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Device</div>
            {devicesQ.isLoading ? (
              <Skeleton className="h-10 w-full" />
            ) : (
              <Select
                value={deviceId ? String(deviceId) : ""}
                onValueChange={(v) => setDeviceId(Number(v))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih device" />
                </SelectTrigger>
                <SelectContent>
                  {(devicesQ.data ?? []).map((d) => (
                    <SelectItem key={d.id} value={String(d.id)}>
                      #{d.id} {d.name ? `- ${d.name}` : ""} (
                      {d.serial ?? "no-serial"})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {selectedDevice ? (
              <div className="flex items-center gap-2 text-xs">
                {statusBadge(selectedDevice.online)}
                <span className="text-muted-foreground">
                  last seen: {fmtLastSeen(selectedDevice.lastSeen)}
                </span>
              </div>
            ) : null}
          </div>

          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Release</div>
            {/* NOTE: kamu sudah punya firmware releases list di halaman firmware.
               Di sini aku kasih input sederhana releaseId (angka). Kalau kamu sudah punya dropdown release,
               ganti bagian ini supaya ambil releases dari endpoint firmware proxy kamu. */}
            <input
              className="h-10 w-full rounded-md border bg-background px-3 text-sm"
              placeholder="Masukkan releaseId (contoh: 12)"
              value={releaseId ? String(releaseId) : ""}
              onChange={(e) => {
                const v = e.target.value.trim();
                setReleaseId(v ? Number(v) : undefined);
              }}
              inputMode="numeric"
            />
            <p className="text-xs text-muted-foreground">
              (Opsional) kalau sudah ada dropdown release di proyekmu,
              sambungkan ke state <code>releaseId</code>.
            </p>
          </div>

          <div className="flex items-end">
            <Button
              className="w-full"
              disabled={triggerM.isPending || !deviceId || !releaseId}
              onClick={() => triggerM.mutate()}
            >
              {triggerM.isPending ? "Triggering…" : "Trigger OTA"}
            </Button>
          </div>

          {triggerM.error ? (
            <div className="md:col-span-3 text-sm text-destructive">
              {(triggerM.error as Error).message}
            </div>
          ) : null}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-2">
          <CardTitle>Jobs</CardTitle>
          <div className="text-xs text-muted-foreground">
            {jobsQ.isFetching ? "Updating…" : "Idle"}
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {!deviceId ? (
            <div className="text-sm text-muted-foreground">
              Pilih device untuk melihat jobs.
            </div>
          ) : jobsQ.isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : jobsQ.error ? (
            <div className="text-sm text-destructive">
              {(jobsQ.error as Error).message}
            </div>
          ) : (jobsQ.data ?? []).length === 0 ? (
            <div className="text-sm text-muted-foreground">Belum ada job.</div>
          ) : (
            <div className="divide-y rounded-md border">
              {(jobsQ.data ?? []).map((j) => (
                <div
                  key={j.id}
                  className="flex items-center justify-between gap-3 p-3"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Job #{j.id}</span>
                      <Badge variant="secondary">{j.status}</Badge>
                      {typeof j.progress === "number" ? (
                        <span className="text-xs text-muted-foreground">
                          {j.progress}%
                        </span>
                      ) : null}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      device {j.deviceId} • release {j.releaseId}
                    </div>
                  </div>

                  <Link
                    className="text-sm underline underline-offset-4 hover:opacity-80"
                    href={`/ota/jobs/${j.id}`}
                  >
                    View
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
