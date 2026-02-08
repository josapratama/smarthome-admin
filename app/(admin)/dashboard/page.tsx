import { getOverview } from "@/lib/api/queries";
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

export default async function DashboardPage() {
  const data = await getOverview();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Overview</h1>
        <p className="text-sm text-muted-foreground">Ringkasan sistem.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Stat title="Users" value={data.users} />
        <Stat title="Homes" value={data.homes} />
        <Stat title="Devices" value={data.devices} />
        <Stat title="Online" value={data.onlineDevices} />
        <Stat title="Offline" value={data.offlineDevices} />
      </div>
    </div>
  );
}
