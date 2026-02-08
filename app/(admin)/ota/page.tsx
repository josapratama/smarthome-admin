import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function OtaPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">OTA</h1>
        <p className="text-sm text-muted-foreground">
          Trigger OTA + status per device + history.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Coming next</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Next: pilih device, pilih firmware release, trigger OTA, lalu lihat
          job list.
        </CardContent>
      </Card>
    </div>
  );
}
