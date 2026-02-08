"use client";

import { useState } from "react";
import { uploadFirmwareAction } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function UploadFirmwareForm() {
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

    if (!version.trim()) return setErr("Version wajib diisi.");
    if (!file) return setErr("File firmware (.bin) wajib dipilih.");

    const fd = new FormData();
    fd.append("version", version.trim());
    if (notes.trim()) fd.append("notes", notes.trim());
    fd.append("file", file);

    setLoading(true);
    try {
      await uploadFirmwareAction(fd);
      setOk("Upload berhasil.");
      setVersion("");
      setNotes("");
      setFile(null);
      // kalau kamu mau auto refresh list releases:
      // location.reload();
    } catch (e: unknown) {
      if (e instanceof Error) {
        setErr(e.message || "Upload gagal.");
      } else {
        setErr("Upload gagal.");
      }
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
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
        <Label htmlFor="file">Firmware binary</Label>
        <Input
          id="file"
          type="file"
          accept=".bin,application/octet-stream"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
        <div className="text-xs text-muted-foreground">
          Upload file firmware (.bin)
        </div>
      </div>

      {err ? <div className="text-sm text-red-600">{err}</div> : null}
      {ok ? <div className="text-sm text-green-600">{ok}</div> : null}

      <Button type="submit" disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </Button>
    </form>
  );
}
