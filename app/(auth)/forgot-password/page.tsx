"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, Mail, ArrowLeft } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [err, setErr] = React.useState<string | null>(null);
  const [sent, setSent] = React.useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const payload = await res.json().catch(() => null);

      if (!res.ok) {
        setErr(payload?.message ?? "Gagal mengirim permintaan reset");
        return;
      }

      setSent(true);
    } catch {
      setErr("Network error. Coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/40">
      <div className="mx-auto flex min-h-screen max-w-lg items-center justify-center p-6">
        <Card className="w-full rounded-2xl shadow-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl">Lupa Password</CardTitle>
            <p className="text-sm text-muted-foreground">
              Masukkan email admin kamu. Kami akan kirim instruksi reset.
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            {sent ? (
              <div className="space-y-4">
                <div className="rounded-xl border bg-card p-4">
                  <div className="flex items-center gap-2 font-medium">
                    <Mail className="h-4 w-4" />
                    Permintaan terkirim
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    Jika email terdaftar, kamu akan menerima instruksi reset
                    password.
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    className="w-full"
                    onClick={() => router.push("/login")}
                  >
                    Kembali ke Login
                  </Button>
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => {
                      setSent(false);
                      setEmail("");
                    }}
                  >
                    Kirim lagi
                  </Button>
                </div>

                <div className="text-center text-xs text-muted-foreground">
                  Tidak menerima email? Cek folder spam / tunggu beberapa menit.
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="admin@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>

                {err ? (
                  <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                    {err}
                  </div>
                ) : null}

                <Button className="w-full" disabled={loading}>
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Mengirim...
                    </span>
                  ) : (
                    "Kirim instruksi reset"
                  )}
                </Button>

                <Link
                  href="/login"
                  className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Kembali ke login
                </Link>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
