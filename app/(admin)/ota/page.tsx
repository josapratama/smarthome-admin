import OtaClientPage from "./ui";

export default function OtaPage({
  searchParams,
}: {
  searchParams?: { deviceId?: string };
}) {
  const deviceId = searchParams?.deviceId
    ? Number(searchParams.deviceId)
    : undefined;
  return <OtaClientPage initialDeviceId={deviceId} />;
}
