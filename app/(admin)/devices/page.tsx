import { listDevices } from "@/lib/api/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function DevicesPage() {
  const res = await listDevices();
  const devices = res.data ?? [];

  function StatusBadge({ online }: { online: boolean }) {
    return (
      <span
        className={`inline-flex rounded-full px-2 py-0.5 text-xs ${online ? "bg-green-100 text-green-800" : "bg-zinc-100 text-zinc-700"}`}
      >
        {online ? "ONLINE" : "OFFLINE"}
      </span>
    );
  }

  function formatLastSeen(v?: string | null) {
    if (!v) return "-";
    const d = new Date(v);
    if (Number.isNaN(d.getTime())) return v;
    return d.toLocaleString();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Devices</h1>
        <p className="text-sm text-muted-foreground">
          List device + status online/offline.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">All devices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-muted-foreground">
                <tr className="border-b">
                  <th className="py-2 pr-4">ID</th>
                  <th className="py-2 pr-4">Name</th>
                  <th className="py-2 pr-4">Status</th>
                  <th className="py-2 pr-4">Last seen</th>
                  <th className="py-2 pr-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {devices.map((d) => (
                  <tr key={d.id} className="border-b">
                    <td className="py-2 pr-4">{d.id}</td>
                    <td className="py-2 pr-4">{d.name ?? "-"}</td>
                    <td className="py-2 pr-4">
                      <StatusBadge online={!!d.status} />
                    </td>
                    <td className="py-2 pr-4">
                      {formatLastSeen(d.lastSeenAt)}
                    </td>
                    <td className="py-2 pr-4">
                      <a
                        className="underline text-muted-foreground hover:text-foreground"
                        href={`/ota?deviceId=${d.id}`}
                      >
                        View OTA
                      </a>
                    </td>
                  </tr>
                ))}
                {devices.length === 0 ? (
                  <tr>
                    <td className="py-6 text-muted-foreground" colSpan={4}>
                      No devices.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
