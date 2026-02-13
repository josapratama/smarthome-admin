import { TelemetryClient } from "./ui";

export default async function DeviceTelemetryPage({
  params,
}: {
  params: Promise<{ deviceId: string }>;
}) {
  const { deviceId } = await params;
  return <TelemetryClient deviceId={parseInt(deviceId)} />;
}
