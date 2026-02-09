import OtaJobDetailClient from "./ui";

export default function OtaJobDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const jobId = Number(params.id);
  return <OtaJobDetailClient jobId={jobId} />;
}
