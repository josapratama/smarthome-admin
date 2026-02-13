// app/(admin)/dashboard/page.tsx
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ApiError } from "@/lib/api/errors";
import { getOverview } from "@/lib/api/server";

function Stat({ title, value }: { title: string; value: number }) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-semibold">{value}</div>
      </CardContent>
    </Card>
  );
}

function ErrorView({
  status,
  payload,
}: {
  status?: number;
  payload?: unknown;
}) {
  const msg =
    typeof payload === "string"
      ? payload
      : payload && typeof payload === "object" && "message" in payload
        ? String((payload as { message?: unknown }).message)
        : null;

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Failed to load dashboard</h1>
        <p className="text-sm text-muted-foreground">
          {status ? `HTTP ${status}` : "Unknown error"}
          {msg ? ` • ${msg}` : ""}
        </p>
      </div>

      {payload !== undefined ? (
        <pre className="text-xs whitespace-pre-wrap rounded-xl border bg-muted/30 p-4">
          {typeof payload === "string"
            ? payload
            : JSON.stringify(payload, null, 2)}
        </pre>
      ) : null}

      {status === 401 ? (
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/login">Go to login</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Home</Link>
          </Button>
        </div>
      ) : null}
    </div>
  );
}

export default async function DashboardPage() {
  let data: Awaited<ReturnType<typeof getOverview>> | null = null;
  let error: { status?: number; payload?: unknown } | null = null;

  try {
    data = await getOverview();
  } catch (e: unknown) {
    if (e instanceof ApiError) {
      error = { status: e.status, payload: e.payload };
    } else {
      error = {};
    }
  }

  if (error) {
    return <ErrorView status={error.status} payload={error.payload} />;
  }

  // JSX DI LUAR try/catch ✅
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Overview</h1>
          <p className="text-sm text-muted-foreground">
            Ringkasan sistem dari backend.
          </p>
        </div>

        {typeof data!.pendingInvitesCount === "number" ? (
          <div className="inline-flex items-center gap-2 rounded-full border bg-muted/30 px-3 py-1 text-sm">
            <span className="text-muted-foreground">Pending invites</span>
            <span className="font-semibold">{data!.pendingInvitesCount}</span>
          </div>
        ) : null}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Stat title="Users" value={data!.users} />
        <Stat title="Homes" value={data!.homes} />
        <Stat title="Devices" value={data!.devices} />
        <Stat title="Online" value={data!.onlineDevices} />
        <Stat title="Offline" value={data!.offlineDevices} />
      </div>

      {Array.isArray(data!.homesList) && data!.homesList.length > 0 ? (
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">My Homes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid gap-3 md:grid-cols-2">
              {data!.homesList.slice(0, 6).map((h) => (
                <div key={h.id} className="rounded-xl border p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-medium">{h.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {h.city ?? "—"} • {h.roleInHome}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">#{h.id}</div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    <span className="rounded-full border px-2 py-1">
                      Online: <b>{h.devicesOnline}</b>
                    </span>
                    <span className="rounded-full border px-2 py-1">
                      Offline: <b>{h.devicesOffline}</b>
                    </span>
                    <span className="rounded-full border px-2 py-1">
                      Open alarms: <b>{h.openAlarms}</b>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
