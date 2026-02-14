"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { qk } from "@/lib/api/queries";
import { apiFetchBrowser } from "@/lib/api/client.browser";
import type { FirmwareReleaseDTO } from "@/lib/api/dto/firmware.dto";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

function fmtDateTime(v?: string | null) {
  if (!v) return "-";
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? v : d.toLocaleString();
}

function formatFileSize(bytes: number) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

function UploadFirmwareDialog() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    version: "",
    description: "",
  });
  const [file, setFile] = useState<File | null>(null);

  const queryClient = useQueryClient();
  const { toast } = useToast();

  const uploadMutation = useMutation({
    mutationFn: async (data: { formData: typeof formData; file: File }) => {
      const form = new FormData();
      form.append("file", data.file);
      form.append("version", data.formData.version);
      form.append("description", data.formData.description);

      return apiFetchBrowser("/api/firmware/releases", {
        method: "POST",
        body: form,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: qk.firmware.releases() });
      setOpen(false);
      setFormData({
        version: "",
        description: "",
      });
      setFile(null);
      toast({ title: "Firmware uploaded successfully" });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to upload firmware",
        description: error.message || "Unknown error",
        variant: "destructive",
      });
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Upload Firmware</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Upload New Firmware</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="file">Firmware File *</Label>
            <Input
              id="file"
              type="file"
              accept=".bin,.hex,.elf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>

          <div>
            <Label htmlFor="version">Version *</Label>
            <Input
              id="version"
              value={formData.version}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, version: e.target.value }))
              }
              placeholder="e.g., 1.0.0"
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="What's new in this version..."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => file && uploadMutation.mutate({ formData, file })}
              disabled={!file || !formData.version || uploadMutation.isPending}
            >
              {uploadMutation.isPending ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function FirmwareClient() {
  const q = useQuery({
    queryKey: qk.firmware.releases(),
    queryFn: async () => {
      const payload = await apiFetchBrowser<{ data: FirmwareReleaseDTO[] }>(
        "/api/firmware/releases",
      );
      return payload.data ?? [];
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Firmware</h1>
          <p className="text-sm text-muted-foreground">
            Manage firmware releases for your devices.
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => q.refetch()}
            disabled={q.isFetching}
          >
            Refresh
          </Button>
          <UploadFirmwareDialog />
        </div>
      </div>

      <Card className="rounded-2xl shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">
            Firmware Releases ({q.data?.length || 0})
          </CardTitle>
        </CardHeader>

        <CardContent>
          {q.isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          ) : q.error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {(q.error as Error).message}
            </div>
          ) : !q.data || q.data.length === 0 ? (
            <div className="text-sm text-muted-foreground">
              No firmware releases found.
            </div>
          ) : (
            <div className="divide-y rounded-xl border">
              {q.data.map((firmware) => (
                <div
                  key={firmware.id}
                  className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-medium">{firmware.version}</span>
                      {firmware.isActive ? (
                        <Badge className="bg-green-100 text-green-800">
                          Active
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Inactive</Badge>
                      )}
                    </div>

                    <div className="mt-1 text-sm text-muted-foreground">
                      Size: {formatFileSize(firmware.fileSize)} • Checksum:{" "}
                      {firmware.checksum.substring(0, 8)}...
                    </div>

                    {firmware.description && (
                      <div className="mt-1 text-sm text-muted-foreground">
                        {firmware.description}
                      </div>
                    )}

                    <div className="mt-1 text-xs text-muted-foreground">
                      Released: {fmtDateTime(firmware.createdAt)}
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-3">
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={`/api/firmware/releases/${firmware.id}/download`}
                        download
                      >
                        Download
                      </a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {q.isFetching && !q.isLoading ? (
            <div className="mt-3 text-xs text-muted-foreground">Updating…</div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
