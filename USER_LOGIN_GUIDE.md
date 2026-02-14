# Panduan Login untuk USER dan ADMIN

## Overview

Aplikasi ini mendukung 2 jenis user dengan interface yang berbeda:

- **ADMIN**: Akses ke dashboard admin dengan fitur lengkap (firmware, OTA, monitoring, dll)
- **USER**: Akses ke dashboard user dengan fitur dasar (devices, homes, energy, alarms)

## Cara Login

### 1. Akses Halaman Login

Buka browser dan navigasi ke:

```
http://localhost:3001/login
```

### 2. Masukkan Credentials

#### Login sebagai ADMIN:

```
Username: admin
Password: [password admin]
```

Setelah login, akan diarahkan ke: `/dashboard` (Admin Dashboard)

#### Login sebagai USER:

```
Username: [username user]
Password: [password user]
```

Setelah login, akan diarahkan ke: `/user/dashboard` (User Dashboard)

## Struktur Route

### Admin Routes (role: ADMIN)

- `/dashboard` - Admin Dashboard
- `/devices` - Device Management
- `/firmware` - Firmware Management
- `/ota` - OTA Updates
- `/monitoring` - System Monitoring
- `/notifications` - Notifications
- `/invites` - Home Invites
- `/commands` - Device Commands
- `/homes` - Homes Management
- `/rooms` - Rooms Management
- `/alarms` - Alarms Management

### User Routes (role: USER)

- `/user/dashboard` - User Dashboard
- `/user/devices` - My Devices
- `/user/homes` - My Homes
- `/user/energy` - Energy Usage
- `/user/alarms` - My Alarms
- `/user/settings` - User Settings

## Role-Based Access Control

### Middleware Protection

Middleware secara otomatis:

1. Redirect user yang belum login ke `/login`
2. Redirect ADMIN yang akses `/user/*` ke `/dashboard`
3. Redirect USER yang akses admin routes ke `/user/dashboard`
4. Redirect user yang sudah login dari `/login` ke dashboard sesuai role

### Cookie Management

Setelah login berhasil, sistem menyimpan:

- `access_token` - JWT token untuk autentikasi
- `refresh_token` - Token untuk refresh session
- `admin_session_id` - Session ID dari backend
- `user_role` - Role user (ADMIN atau USER)

## Testing

### 1. Test Login sebagai USER

```bash
# Di terminal 1 - Start backend
cd smarthome-backend
bun dev

# Di terminal 2 - Start frontend
cd smarthome-frontend
bun dev

# Di browser
# 1. Buka http://localhost:3001/login
# 2. Login dengan credentials USER
# 3. Akan redirect ke http://localhost:3001/user/dashboard
```

### 2. Test Login sebagai ADMIN

```bash
# Di browser
# 1. Buka http://localhost:3001/login
# 2. Login dengan credentials ADMIN
# 3. Akan redirect ke http://localhost:3001/dashboard
```

### 3. Test Role Protection

```bash
# Login sebagai USER, lalu coba akses:
http://localhost:3001/dashboard
# Akan otomatis redirect ke /user/dashboard

# Login sebagai ADMIN, lalu coba akses:
http://localhost:3001/user/dashboard
# Akan otomatis redirect ke /dashboard
```

## Membuat User Baru

### Via Backend API

```bash
# Register user baru
curl -X POST http://localhost:3000/api/v1/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "user1",
    "email": "user1@example.com",
    "password": "password123",
    "role": "USER",
    "homeName": "Rumah User 1"
  }'
```

### Via Database (PostgreSQL)

```sql
-- Insert user baru dengan role USER
INSERT INTO "UserAccount" (username, email, password, role, "isActive")
VALUES ('user1', 'user1@example.com', '[hashed_password]', 'USER', true);
```

## Troubleshooting

### Problem: Tidak bisa login

**Solution:**

1. Pastikan backend running di `http://localhost:3000`
2. Check environment variable `BACKEND_BASE_URL` di `.env.local`
3. Check console browser untuk error message

### Problem: Redirect loop

**Solution:**

1. Clear cookies di browser
2. Logout dan login ulang
3. Check middleware.ts untuk logic redirect

### Problem: USER bisa akses admin routes

**Solution:**

1. Check cookie `user_role` di browser DevTools
2. Pastikan middleware.ts sudah di-update
3. Restart Next.js dev server

### Problem: Token expired

**Solution:**

1. Sistem akan otomatis refresh token
2. Jika gagal, akan redirect ke `/login`
3. Login ulang untuk mendapatkan token baru

## API Endpoints

### Authentication

- `POST /api/auth/login` - Login (USER atau ADMIN)
- `POST /api/auth/logout` - Logout
- `POST /api/auth/refresh` - Refresh token
- `GET /api/auth/me` - Get current user info

### Response Format

```json
{
  "data": {
    "user": {
      "id": 1,
      "username": "user1",
      "email": "user1@example.com",
      "role": "USER",
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "redirectTo": "/user/dashboard"
  }
}
```

## Security Notes

1. **HTTP-Only Cookies**: Semua auth tokens disimpan di HTTP-only cookies untuk mencegah XSS
2. **Role Validation**: Role divalidasi di server-side (middleware & API routes)
3. **Token Expiry**: Access token expire dalam 7 hari, refresh token 30 hari
4. **HTTPS**: Di production, pastikan menggunakan HTTPS untuk keamanan

## Environment Variables

Pastikan file `.env.local` berisi:

```env
BACKEND_BASE_URL=http://localhost:3000
BACKEND_API_PREFIX=/api/v1
NEXT_PUBLIC_APP_NAME=Smart Home
```
