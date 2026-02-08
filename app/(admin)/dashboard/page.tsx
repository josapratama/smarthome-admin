import { getOverview } from "@/lib/api/queries";
import { ApiError } from "@/lib/api/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function Stat({ title, value }: { title: string; value: number }) {
  return (
    <Card>
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
  title,
  status,
  payload,
}: {
  title: string;
  status?: number;
  payload?: unknown;
}) {
  return (
    <div className="space-y-3">
      <h1 className="text-xl font-semibold">{title}</h1>
      <div className="text-sm">
        {status ? `HTTP Status: ${status}` : "Unknown error"}
      </div>
      {payload !== undefined && (
        <pre className="text-xs whitespace-pre-wrap rounded-md border p-3">
          {typeof payload === "string"
            ? payload
            : JSON.stringify(payload, null, 2)}
        </pre>
      )}
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
    return (
      <ErrorView
        title="Failed to load overview"
        status={error.status}
        payload={error.payload}
      />
    );
  }

  // JSX is outside try/catch ✅
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Overview</h1>
        <p className="text-sm text-muted-foreground">Ringkasan sistem.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Stat title="Users" value={data!.users} />
        <Stat title="Homes" value={data!.homes} />
        <Stat title="Devices" value={data!.devices} />
        <Stat title="Online" value={data!.onlineDevices} />
        <Stat title="Offline" value={data!.offlineDevices} />
      </div>
    </div>
  );
}
