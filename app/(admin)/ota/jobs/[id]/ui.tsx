"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchOtaJobDetail } from "@/lib/api/ota.browser";
import { OtaJob } from "@/lib/api/types";
import { qk } from "@/lib/api/queries";

function fmt(dt?: string) {
  if (!dt) return "-";
  const d = new Date(dt);
  return Number.isNaN(d.getTime()) ? dt : d.toLocaleString();
}

type OtaJobDetail = OtaJob & {
  releaseId?: number;
  updatedAt?: string;
  logs?: string | null;
};

export default function OtaJobDetailClient({ jobId }: { jobId: number }) {
  const q = useQuery({
    queryKey: qk.otaJobDetail(jobId),
    queryFn: () => fetchOtaJobDetail(jobId) as Promise<OtaJobDetail>,
    enabled: Number.isFinite(jobId),
    refetchInterval: 5_000,
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold">OTA Job #{jobId}</h1>
          <p className="text-sm text-muted-foreground">Auto refresh 5s</p>
        </div>
        <Link className="text-sm underline underline-offset-4" href="/ota">
          Back to OTA
        </Link>
      </div>

      {q.isLoading ? (
        <Card>
          <CardHeader>
            <CardTitle>Loading…</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-2/3" />
          </CardContent>
        </Card>
      ) : q.error ? (
        <Card>
          <CardHeader>
            <CardTitle>Error</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-destructive">
            {(q.error as Error).message}
          </CardContent>
        </Card>
      ) : q.data ? (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Job Info</CardTitle>
            <Badge variant="secondary">{q.data.status}</Badge>
          </CardHeader>
          <CardContent className="grid gap-3 text-sm">
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
              <div>
                <div className="text-muted-foreground">Device</div>
                <div className="font-medium">{q.data.deviceId}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Release</div>
                <div className="font-medium">{q.data.releaseId ?? "-"}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Created</div>
                <div className="font-medium">{fmt(q.data.createdAt)}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Updated</div>
                <div className="font-medium">{fmt(q.data.updatedAt)}</div>
              </div>
            </div>

            {typeof q.data.logs !== "undefined" ? (
              <div className="rounded-md border p-3">
                <div className="text-muted-foreground">Logs</div>
                <pre className="mt-2 max-h-[360px] overflow-auto whitespace-pre-wrap text-xs">
                  {q.data.logs ?? "-"}
                </pre>
              </div>
            ) : null}
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
