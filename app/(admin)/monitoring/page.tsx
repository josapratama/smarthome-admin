import { listCommands } from "@/lib/api/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function MonitoringPage() {
  const res = await listCommands();
  const items = res.data ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Monitoring</h1>
        <p className="text-sm text-muted-foreground">Command history.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Commands</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-muted-foreground">
                <tr className="border-b">
                  <th className="py-2 pr-4">ID</th>
                  <th className="py-2 pr-4">Device</th>
                  <th className="py-2 pr-4">Status</th>
                  <th className="py-2 pr-4">Created</th>
                </tr>
              </thead>
              <tbody>
                {items.map((c) => (
                  <tr key={c.id} className="border-b">
                    <td className="py-2 pr-4">{c.id}</td>
                    <td className="py-2 pr-4">{c.deviceId}</td>
                    <td className="py-2 pr-4">{c.status}</td>
                    <td className="py-2 pr-4">{c.createdAt ?? "-"}</td>
                  </tr>
                ))}
                {items.length === 0 ? (
                  <tr>
                    <td className="py-6 text-muted-foreground" colSpan={4}>
                      No commands.
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
