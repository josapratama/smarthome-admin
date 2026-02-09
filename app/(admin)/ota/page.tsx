import { listDevices, listFirmwareReleases } from "@/lib/api/queries";
import { OtaTriggerPanel } from "./trigger-panel";

export default async function OtaPage() {
  const [devicesRes, releasesRes] = await Promise.all([
    listDevices(),
    listFirmwareReleases(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">OTA</h1>
        <p className="text-sm text-muted-foreground">
          Trigger OTA dan monitor job status.
        </p>
      </div>

      <OtaTriggerPanel
        devices={devicesRes.data ?? []}
        releases={releasesRes.data ?? []}
      />
    </div>
  );
}
