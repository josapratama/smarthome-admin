"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Loader2, Shield } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function cn(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

export default function LoginPage() {
  const router = useRouter();
  const sp = useSearchParams();
  const next = sp.get("next") ?? "/dashboard";

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPw, setShowPw] = React.useState(false);

  const [err, setErr] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  async function onSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username: username.trim(), password }),
        credentials: "include",
      });

      const payload = await res.json().catch(() => null);

      if (!res.ok) {
        setErr(payload?.message ?? payload?.error ?? "Login gagal");
        return;
      }

      // Redirect based on user role
      const redirectPath = payload?.data?.redirectTo || next;
      router.push(redirectPath);
      router.refresh();
    } catch {
      setErr("Network error. Coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/40">
      <div className="mx-auto grid min-h-screen max-w-6xl grid-cols-1 items-stretch gap-6 p-6 md:grid-cols-2">
        <div className="relative hidden overflow-hidden rounded-2xl border bg-card p-10 shadow-sm md:flex md:flex-col md:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4" />
              <span>Secure Admin Console</span>
            </div>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight">
              {process.env.NEXT_PUBLIC_APP_NAME ?? "Smart Home Admin"}
            </h1>
            <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
              Kelola device, firmware, OTA, monitoring, dan homes dari satu
              tempat. Login untuk melanjutkan.
            </p>

            <div className="mt-8 grid gap-3 text-sm text-muted-foreground">
              <div className="rounded-xl border bg-background/60 p-4">
                <div className="font-medium text-foreground">Tips</div>
                <div className="mt-1">
                  Gunakan akun admin. Token disimpan sebagai cookie httpOnly.
                </div>
              </div>
              <div className="rounded-xl border bg-background/60 p-4">
                <div className="font-medium text-foreground">Redirect</div>
                <div className="mt-1">
                  Setelah login →{" "}
                  <span className="font-mono text-foreground">{next}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-xs text-muted-foreground">
            © {new Date().getFullYear()}{" "}
            {process.env.NEXT_PUBLIC_APP_NAME ?? "Admin"}
          </div>
        </div>

        <div className="flex items-center justify-center">
          <Card className="w-full max-w-md rounded-2xl shadow-sm">
            <CardHeader className="space-y-1">
              <CardTitle className="text-xl">Admin Login</CardTitle>
              <p className="text-sm text-muted-foreground">
                Masuk menggunakan username & password.
              </p>
            </CardHeader>

            <CardContent>
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    autoComplete="username"
                    placeholder="admin"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="/forgot-password"
                      className={cn(
                        "text-xs text-muted-foreground underline-offset-4 hover:underline",
                        loading && "pointer-events-none opacity-50",
                      )}
                    >
                      Lupa password?
                    </Link>
                  </div>

                  <div className="relative">
                    <Input
                      id="password"
                      type={showPw ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                      required
                      className="pr-10"
                    />
                    <button
                      type="button"
                      aria-label={showPw ? "Hide password" : "Show password"}
                      onClick={() => setShowPw((v) => !v)}
                      className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground"
                      disabled={loading}
                    >
                      {showPw ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
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
                      Signing in...
                    </span>
                  ) : (
                    "Sign in"
                  )}
                </Button>

                <div className="text-center text-xs text-muted-foreground">
                  Dengan login, kamu menyetujui penggunaan sistem ini untuk
                  keperluan admin.
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
