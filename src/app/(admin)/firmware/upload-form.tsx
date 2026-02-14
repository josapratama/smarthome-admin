"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function getErrorMessage(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") return null;
  const rec = payload as Record<string, unknown>;
  if (typeof rec.message === "string") return rec.message;
  if (rec.error && typeof rec.error === "object") {
    const errRec = rec.error as Record<string, unknown>;
    if (typeof errRec.message === "string") return errRec.message;
  }
  return null;
}

export function UploadFirmwareForm() {
  const router = useRouter();

  const [platform, setPlatform] = useState("esp32");
  const [version, setVersion] = useState("");
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setOk(null);

    if (!platform.trim())
      return setErr("Platform wajib diisi (contoh: esp32).");
    if (!version.trim()) return setErr("Version wajib diisi.");
    if (!file) return setErr("File firmware wajib dipilih.");

    const fd = new FormData();
    fd.append("platform", platform.trim());
    fd.append("version", version.trim());
    if (notes.trim()) fd.append("notes", notes.trim());
    fd.append("file", file);

    setLoading(true);
    try {
      const res = await fetch("/api/firmware/upload", {
        method: "POST",
        body: fd,
      });

      if (!res.ok) {
        const ct = res.headers.get("content-type") ?? "";
        const payload: unknown = ct.includes("application/json")
          ? await res.json().catch(() => null)
          : await res.text().catch(() => null);

        const msg =
          typeof payload === "string"
            ? payload
            : (getErrorMessage(payload) ?? `Upload gagal (HTTP ${res.status})`);

        throw new Error(msg);
      }

      setOk("Upload berhasil.");
      setPlatform("esp32");
      setVersion("");
      setNotes("");
      setFile(null);

      // ✅ refresh server component list releases
      router.refresh();
    } catch (e: unknown) {
      setErr(
        e instanceof Error ? e.message || "Upload gagal." : "Upload gagal.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="platform">Platform</Label>
        <Input
          id="platform"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          placeholder="esp32"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="version">Version</Label>
        <Input
          id="version"
          value={version}
          onChange={(e) => setVersion(e.target.value)}
          placeholder="e.g. 1.0.3"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes (optional)</Label>
        <Input
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Release notes singkat"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="file">Firmware file</Label>
        <Input
          id="file"
          type="file"
          accept=".bin,application/octet-stream"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
      </div>

      {err ? <div className="text-sm text-red-600">{err}</div> : null}
      {ok ? <div className="text-sm text-green-600">{ok}</div> : null}

      <Button type="submit" disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </Button>
    </form>
  );
}
