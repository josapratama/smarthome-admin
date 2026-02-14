"use client";

import Link from "next/link";
import {
  Home,
  Zap,
  Shield,
  Smartphone,
  Activity,
  Cloud,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Lock,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function LandingPage() {
  const features = [
    {
      icon: Home,
      title: "Smart Home Control",
      description: "Kontrol semua perangkat smart home Anda dari satu tempat",
    },
    {
      icon: Smartphone,
      title: "Mobile & Web Access",
      description:
        "Akses dari mana saja melalui web browser atau aplikasi mobile",
    },
    {
      icon: Activity,
      title: "Real-time Monitoring",
      description:
        "Pantau status perangkat dan konsumsi energi secara real-time",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Keamanan tingkat enterprise dengan enkripsi end-to-end",
    },
    {
      icon: Zap,
      title: "Energy Management",
      description: "Optimalkan penggunaan energi dan hemat biaya listrik",
    },
    {
      icon: Cloud,
      title: "Cloud Sync",
      description: "Data tersinkronisasi otomatis ke cloud dengan backup",
    },
  ];

  const benefits = [
    "Kontrol perangkat dari mana saja",
    "Hemat energi hingga 30%",
    "Notifikasi real-time",
    "Automasi cerdas dengan AI",
    "Multi-user & role management",
    "OTA firmware updates",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Home className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Smart Home</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#features"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link
              href="#benefits"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Benefits
            </Link>
            <Link
              href="#about"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
          </nav>
          <Link href="/login">
            <Button>
              Login
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block">
              <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                IoT Smart Home Platform
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Kontrol Rumah Anda dengan
              <span className="text-primary"> Cerdas</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Platform IoT terintegrasi untuk mengelola semua perangkat smart
              home Anda. Monitoring real-time, automasi cerdas, dan hemat
              energi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/login">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Learn More
              </Button>
            </div>
            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-2xl font-bold">1000+</div>
                <div className="text-sm text-muted-foreground">
                  Active Devices
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm text-muted-foreground">Happy Users</div>
              </div>
              <div>
                <div className="text-2xl font-bold">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 blur-3xl rounded-full"></div>
            <div className="relative bg-card border rounded-2xl p-8 shadow-2xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Cpu className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">Living Room</div>
                      <div className="text-sm text-muted-foreground">
                        5 devices
                      </div>
                    </div>
                  </div>
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                </div>
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <Zap className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <div className="font-medium">Energy Usage</div>
                      <div className="text-sm text-muted-foreground">
                        2.4 kWh today
                      </div>
                    </div>
                  </div>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                      <Lock className="h-5 w-5 text-purple-500" />
                    </div>
                    <div>
                      <div className="font-medium">Security</div>
                      <div className="text-sm text-muted-foreground">
                        All systems active
                      </div>
                    </div>
                  </div>
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="container mx-auto px-4 py-20 bg-muted/30"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Fitur Unggulan
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Platform lengkap dengan berbagai fitur untuk memudahkan pengelolaan
            smart home Anda
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <Card
              key={idx}
              className="border-2 hover:border-primary/50 transition-colors"
            >
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Mengapa Memilih Smart Home?
            </h2>
            <p className="text-muted-foreground mb-8">
              Tingkatkan kenyamanan, keamanan, dan efisiensi energi rumah Anda
              dengan teknologi IoT terkini.
            </p>
            <div className="space-y-3">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-2xl p-8">
            <div className="space-y-6">
              <div className="bg-background rounded-xl p-6 shadow-lg">
                <div className="text-4xl font-bold text-primary mb-2">30%</div>
                <div className="text-sm text-muted-foreground">
                  Penghematan Energi
                </div>
              </div>
              <div className="bg-background rounded-xl p-6 shadow-lg">
                <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">
                  Monitoring & Support
                </div>
              </div>
              <div className="bg-background rounded-xl p-6 shadow-lg">
                <div className="text-4xl font-bold text-primary mb-2">100%</div>
                <div className="text-sm text-muted-foreground">
                  Secure & Encrypted
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-primary to-purple-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Siap Memulai?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Bergabunglah dengan ribuan pengguna yang telah merasakan kemudahan
            smart home
          </p>
          <Link href="/login">
            <Button size="lg" variant="secondary" className="text-primary">
              Login Sekarang
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Home className="h-5 w-5 text-primary" />
              <span className="font-semibold">Smart Home Platform</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Smart Home. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
