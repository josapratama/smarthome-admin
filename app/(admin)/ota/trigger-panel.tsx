"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

type Device = { id: number; name?: string | null; status?: boolean | null };
type Release = { id: number; version: string };
type OtaJob = {
  id: number;
  deviceId: number;
  releaseId: number;
  status: string;
  progress: number | null;
  lastError: string | null;
  createdAt?: string;
};

function getMsg(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") return null;
  const rec = payload as Record<string, unknown>;
  if (typeof rec.message === "string") return rec.message;
  return null;
}

export function OtaTriggerPanel({
  devices,
  releases,
}: {
  devices: Device[];
  releases: Release[];
}) {
  const [deviceId, setDeviceId] = useState<number>(() => devices[0]?.id ?? 0);
  const [releaseId, setReleaseId] = useState<number>(
    () => releases[0]?.id ?? 0,
  );
  const [jobs, setJobs] = useState<OtaJob[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);

  const canSubmit = deviceId > 0 && releaseId > 0;

  async function loadJobs(did = deviceId) {
    if (!did) return;
    const res = await fetch(`/api/ota/devices/${did}/jobs`, {
      cache: "no-store",
    });
    const payload = await res.json().catch(() => null);
    if (!res.ok)
      throw new Error(
        getMsg(payload) ?? `Failed load jobs (HTTP ${res.status})`,
      );
    setJobs((payload?.data ?? []) as OtaJob[]);
  }

  // polling tiap 5 detik (simple)
  useEffect(() => {
    if (!deviceId) return;
    let t: number | undefined;

    const tick = async () => {
      try {
        await loadJobs(deviceId);
      } catch {}
      t = window.setTimeout(tick, 5000);
    };

    tick();
    return () => {
      if (t) window.clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deviceId]);

  async function trigger() {
    setErr(null);
    setOk(null);
    if (!canSubmit) return;

    setLoading(true);
    try {
      const res = await fetch("/api/ota/trigger", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ deviceId, releaseId }),
      });

      const payload = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(
          getMsg(payload) ?? `Trigger OTA gagal (HTTP ${res.status})`,
        );
      }

      setOk("OTA triggered.");
      await loadJobs(deviceId);
    } catch (e: unknown) {
      setErr(
        e instanceof Error
          ? e.message || "Trigger OTA gagal."
          : "Trigger OTA gagal.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4 rounded-lg border p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-end">
        <div className="flex-1">
          <label className="text-sm text-muted-foreground">Device</label>
          <select
            className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
            value={deviceId}
            onChange={(e) => setDeviceId(Number(e.target.value))}
          >
            {devices.map((d) => (
              <option key={d.id} value={d.id}>
                #{d.id} {d.name ? `- ${d.name}` : ""}{" "}
                {d.status ? "(ONLINE)" : "(OFFLINE)"}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label className="text-sm text-muted-foreground">
            Firmware Release
          </label>
          <select
            className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
            value={releaseId}
            onChange={(e) => setReleaseId(Number(e.target.value))}
          >
            {releases.map((r) => (
              <option key={r.id} value={r.id}>
                #{r.id} - {r.version}
              </option>
            ))}
          </select>
        </div>

        <Button onClick={trigger} disabled={!canSubmit || loading}>
          {loading ? "Triggering..." : "Trigger OTA"}
        </Button>
      </div>

      {err ? <div className="text-sm text-red-600">{err}</div> : null}
      {ok ? <div className="text-sm text-green-600">{ok}</div> : null}

      <div className="overflow-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-muted-foreground">
            <tr className="border-b">
              <th className="py-2 pr-4">Job</th>
              <th className="py-2 pr-4">Status</th>
              <th className="py-2 pr-4">Progress</th>
              <th className="py-2 pr-4">Error</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((j) => (
              <tr key={j.id} className="border-b">
                <td className="py-2 pr-4">#{j.id}</td>
                <td className="py-2 pr-4">{j.status}</td>
                <td className="py-2 pr-4">{j.progress ?? "-"}</td>
                <td className="py-2 pr-4">{j.lastError ?? "-"}</td>
              </tr>
            ))}
            {jobs.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-6 text-muted-foreground">
                  No OTA jobs for this device.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
