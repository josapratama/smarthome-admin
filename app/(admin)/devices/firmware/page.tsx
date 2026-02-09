import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { listFirmwareReleases } from "@/lib/api/server";

export default async function FirmwarePage() {
  const res = await listFirmwareReleases();
  const releases = res.data ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Firmware</h1>
        <p className="text-sm text-muted-foreground">Release list + upload.</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Releases</CardTitle>
          <Button variant="outline" disabled>
            Upload (next)
          </Button>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            {releases.map((r) => (
              <li
                key={r.id}
                className="flex items-center justify-between border-b py-2"
              >
                <span>{r.version}</span>
                <span className="text-muted-foreground">
                  {r.createdAt ?? "-"}
                </span>
              </li>
            ))}
            {releases.length === 0 ? (
              <li className="text-muted-foreground">No releases.</li>
            ) : null}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
