import { listDevices } from "@/lib/api/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function DevicesPage() {
  const res = await listDevices();
  const devices = res.data ?? [];

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
                </tr>
              </thead>
              <tbody>
                {devices.map((d) => (
                  <tr key={d.id} className="border-b">
                    <td className="py-2 pr-4">{d.id}</td>
                    <td className="py-2 pr-4">{d.name ?? "-"}</td>
                    <td className="py-2 pr-4">
                      {d.status ? "ONLINE" : "OFFLINE"}
                    </td>
                    <td className="py-2 pr-4">{d.lastSeenAt ?? "-"}</td>
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
