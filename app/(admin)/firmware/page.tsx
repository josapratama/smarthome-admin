import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UploadFirmwareForm } from "./upload-form";
import { listFirmwareReleases } from "@/lib/api/servers";

export default async function FirmwarePage() {
  const res = await listFirmwareReleases();
  const releases = res.data ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Firmware</h1>
        <p className="text-sm text-muted-foreground">
          Upload firmware binary dan kelola releases.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Upload firmware</CardTitle>
          </CardHeader>
          <CardContent>
            <UploadFirmwareForm />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Releases</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {releases.map((r) => (
                <li
                  key={r.id}
                  className="flex items-center justify-between border-b py-2"
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{r.version}</span>
                    <span className="text-xs text-muted-foreground">
                      {r.createdAt ?? "-"}
                    </span>
                  </div>
                  <a
                    className="text-sm underline text-muted-foreground hover:text-foreground"
                    href={`/api/firmware/releases/${r.id}/download`}
                  >
                    Download
                  </a>
                </li>
              ))}
              {releases.length === 0 ? (
                <li className="text-muted-foreground">No releases.</li>
              ) : null}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
