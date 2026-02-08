# SmartHome Admin (Web)

Admin dashboard untuk Smart Home platform:

- Login (JWT via httpOnly cookie)
- Overview (users/homes/devices/online/offline)
- Device management
- Firmware & OTA management
- Monitoring (command history, OTA job detail)

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind + shadcn/ui
- Bun runtime

## Badges

> Ganti `YOUR_GITHUB_USERNAME` dan `smarthome-admin` sesuai repo kamu.

![CI](https://github.com/YOUR_GITHUB_USERNAME/smarthome-admin/actions/workflows/ci.yml/badge.svg)
![Next](https://img.shields.io/badge/Next.js-16.x-black)
![React](https://img.shields.io/badge/React-19.x-000000)
![Bun](https://img.shields.io/badge/Bun-runtime-black)

---

## Requirements

- Bun (recommended)
- Backend sudah running (Hono/Bun) + PostgreSQL + MQTT (untuk data real)

## Environment Variables

Buat file `.env.local`:

```bash
# App
NEXT_PUBLIC_APP_NAME="Smart Home Admin"

# Backend base URL (tanpa trailing slash)
BACKEND_BASE_URL="http://localhost:3000"

# Prefix path API backend (sesuaikan dengan base path kamu)
BACKEND_API_PREFIX="/routes/v1"
```

Catatan:

- BACKEND_BASE_URL dan BACKEND_API_PREFIX dipakai oleh server-side API client untuk memanggil backend.

- Login menyimpan JWT ke cookie admin_token (httpOnly).

## Development

Install deps:

```bash
bun install
```

Run dev server:

```bash
bun run dev
```

Open:

- [http://localhost:3000]

## Production Build (local)

```bash
bun run build
bun run start
```

Docker
Build image:

```bash
docker build -t smarthome-admin:latest .
```

Run container:

```bash
docker run --rm -p 3000:3000 \
 -e NEXT_PUBLIC_APP_NAME="Smart Home Admin" \
 -e BACKEND_BASE_URL="http://host.docker.internal:3000" \
 -e BACKEND_API_PREFIX="/routes/v1" \
 smarthome-admin:latest
```

Linux: host.docker.internal kadang perlu diaktifkan atau ganti dengan IP host network.

## Docker Compose

```bash
docker compose up --build
```

## Project Structure (ringkas)

```tree
app/
  (auth)/login
  (admin)/dashboard
  api/auth/(login|logout)
lib/
  api/(client,endpoints,queries)
middleware.ts (auth guard)
```

## Contributing

- Branch: main (stable) + dev (optional)

- CI: lint + build via GitHub Actions

## License

Internal / TBD

### `.env.example`

Buat file `.env.example`:

```bash
NEXT_PUBLIC_APP_NAME="Smart Home Admin"
BACKEND_BASE_URL="http://localhost:3000"
BACKEND_API_PREFIX="/routes/v1"
Dan pastikan .env.local masuk .gitignore (biasanya Next template sudah ada). Kalau belum, tambahkan:

.env.local
.env.*.local
```
