import { getOverview } from "@/lib/api/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-semibold">{value}</div>
      </CardContent>
    </Card>
  );
}

export default async function DashboardPage() {
  let data: Awaited<ReturnType<typeof getOverview>> | null = null;
  let error: string | null = null;

  try {
    data = await getOverview();
  } catch (e) {
    error =
      "Gagal memuat overview. Cek endpoint mapping di lib/api/endpoints.ts dan backend health.";
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Overview</h1>
        <p className="text-sm text-muted-foreground">
          Ringkasan user, home, device, dan status online/offline.
        </p>
      </div>

      {error ? (
        <div className="rounded-md border p-4 text-sm">{error}</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <StatCard title="Users" value={data!.users} />
          <StatCard title="Homes" value={data!.homes} />
          <StatCard title="Devices" value={data!.devices} />
          <StatCard title="Online" value={data!.onlineDevices} />
          <StatCard title="Offline" value={data!.offlineDevices} />
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quick actions</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Nanti kita isi tombol: “Trigger OTA”, “Upload Firmware”, “View
            Command History”.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent activity</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Nanti kita tampilkan last commands + last OTA jobs (butuh endpoint
            list).
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
