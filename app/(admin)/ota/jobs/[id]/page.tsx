import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

type Job = {
  id: number;
  deviceId: number;
  releaseId: number;
  status: string;
  progress?: number | null;
  lastError?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

async function fetchJob(id: string): Promise<Job> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/ota/jobs/${id}`,
    { cache: "no-store" },
  );
  // NOTE: di server component, relative URL juga boleh, tapi ini aman.
  if (!res.ok) {
    const payload = await res.json().catch(() => null);
    throw new Error(payload?.message ?? `Failed (HTTP ${res.status})`);
  }
  const payload = await res.json();
  return (payload?.data ?? payload) as Job;
}

export default async function OtaJobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = await fetchJob(id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">OTA Job #{job.id}</h1>
          <p className="text-sm text-muted-foreground">
            Detail status OTA job.
          </p>
        </div>
        <Link
          className="text-sm underline text-muted-foreground hover:text-foreground"
          href="/ota"
        >
          Back
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div>
            <span className="text-muted-foreground">Device:</span>{" "}
            {job.deviceId}
          </div>
          <div>
            <span className="text-muted-foreground">Release:</span>{" "}
            {job.releaseId}
          </div>
          <div>
            <span className="text-muted-foreground">Status:</span> {job.status}
          </div>
          <div>
            <span className="text-muted-foreground">Progress:</span>{" "}
            {job.progress ?? "-"}
          </div>
          <div>
            <span className="text-muted-foreground">Last error:</span>{" "}
            {job.lastError ?? "-"}
          </div>
          <div>
            <span className="text-muted-foreground">Created:</span>{" "}
            {job.createdAt ?? "-"}
          </div>
          <div>
            <span className="text-muted-foreground">Updated:</span>{" "}
            {job.updatedAt ?? "-"}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
