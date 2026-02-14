# Quick Start Guide - Smart Home Frontend

Panduan cepat untuk memulai development Smart Home Frontend.

## Prerequisites

- Node.js 18+ atau Bun
- Backend API running di `http://localhost:3000`
- PostgreSQL database (untuk backend)

## Installation

```bash
# 1. Install dependencies
npm install
# atau
bun install

# 2. Copy environment file
cp .env.example .env.local

# 3. Edit .env.local
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_WS_URL=ws://localhost:3000
```

## Development

```bash
# Start development server
npm run dev

# Open browser
# http://localhost:3001
```

## First Steps

### 1. Register User Account

```bash
# Via API atau gunakan register page
POST http://localhost:3000/api/v1/auth/register
{
  "username": "user1",
  "email": "user1@example.com",
  "password": "password123"
}
```

### 2. Login

- Buka http://localhost:3001/login
- Masukkan username & password
- Akan redirect ke dashboard

### 3. Create Home

- Klik "Add Home" di dashboard
- Isi nama rumah & alamat
- Save

### 4. Add Room

- Pilih home
- Klik "Add Room"
- Isi nama ruangan (e.g., "Living Room", "Bedroom")

### 5. Pair Device

- Pastikan ESP32 sudah running
- Klik "Add Device"
- Masukkan device key dari ESP32
- Pilih room
- Pair device

### 6. Monitor & Control

- Lihat status device real-time
- Control on/off
- Monitor telemetry data
- Lihat energy consumption

## Project Structure

```
src/
├── app/                    # Next.js pages
│   ├── (auth)/            # Auth pages
│   └── (main)/            # Main app pages
├── components/            # React components
├── lib/
│   ├── api/              # API clients
│   ├── hooks/            # Custom hooks
│   ├── store/            # Zustand stores
│   └── types/            # TypeScript types
```

## Key Features to Implement

### Phase 1: Authentication ✅

- [x] API client setup
- [ ] Login page
- [ ] Register page
- [ ] Protected routes

### Phase 2: Dashboard

- [ ] Dashboard layout
- [ ] Device overview
- [ ] Energy widget
- [ ] Alarm widget

### Phase 3: Devices

- [ ] Device list
- [ ] Device control
- [ ] Real-time telemetry
- [ ] Device settings

### Phase 4: Energy

- [ ] Energy charts
- [ ] Cost estimation
- [ ] AI predictions

### Phase 5: Alarms

- [ ] Alarm list
- [ ] Notifications
- [ ] Acknowledge/resolve

## Common Commands

```bash
# Development
npm run dev

# Build
npm run build

# Start production
npm run start

# Type check
npm run type-check

# Lint
npm run lint

# Format
npm run format
```

## Troubleshooting

### CORS Error

```
Solution: Pastikan backend enable CORS untuk http://localhost:3001
```

### 401 Unauthorized

```
Solution: Token expired, logout dan login kembali
```

### WebSocket not connecting

```
Solution: Cek NEXT_PUBLIC_WS_URL di .env.local
```

## Next Steps

1. Install Shadcn/ui components
2. Create login/register pages
3. Build dashboard layout
4. Implement device control
5. Add real-time updates

Lihat [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md) untuk detail lengkap.
