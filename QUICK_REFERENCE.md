# Quick Reference - Login & Routes

## 🚀 Quick Start

### 1. Start Backend

```bash
cd smarthome-backend
bun dev
```

### 2. Start Frontend

```bash
cd smarthome-frontend
bun dev
```

### 3. Open Browser

```
http://localhost:3001/login
```

## 👤 Login Credentials

### USER Login

```
Username: [your_user_username]
Password: [your_user_password]
→ Redirects to: /user/dashboard
```

### ADMIN Login

```
Username: [your_admin_username]
Password: [your_admin_password]
→ Redirects to: /dashboard
```

## 📍 Routes Cheat Sheet

### USER Routes (role: USER)

| Route             | Description    |
| ----------------- | -------------- |
| `/user/dashboard` | User Dashboard |
| `/user/devices`   | My Devices     |
| `/user/homes`     | My Homes       |
| `/user/energy`    | Energy Usage   |
| `/user/alarms`    | My Alarms      |
| `/user/settings`  | Settings       |

### ADMIN Routes (role: ADMIN)

| Route         | Description         |
| ------------- | ------------------- |
| `/dashboard`  | Admin Dashboard     |
| `/devices`    | All Devices         |
| `/firmware`   | Firmware Management |
| `/ota`        | OTA Updates         |
| `/monitoring` | System Monitoring   |
| `/homes`      | All Homes           |
| `/alarms`     | All Alarms          |

## 🔐 Authentication

### Login Response

```json
{
  "data": {
    "user": {
      "id": 1,
      "username": "user1",
      "email": "user@example.com",
      "role": "USER"
    },
    "redirectTo": "/user/dashboard"
  }
}
```

### Cookies Set

- `access_token` - JWT token (7 days)
- `refresh_token` - Refresh token (30 days)
- `admin_session_id` - Session ID
- `user_role` - USER or ADMIN

## 🛡️ Access Control

### Automatic Redirects

```
USER tries /dashboard → /user/dashboard
ADMIN tries /user/dashboard → /dashboard
Not logged in + protected route → /login
Logged in + /login → dashboard (based on role)
```

## 🧪 Testing

### Test USER Access

```bash
1. Login as USER
2. Try: http://localhost:3001/dashboard
3. Should redirect to: /user/dashboard ✅
```

### Test ADMIN Access

```bash
1. Login as ADMIN
2. Try: http://localhost:3001/user/dashboard
3. Should redirect to: /dashboard ✅
```

## 📝 Create New User

### Via API

```bash
curl -X POST http://localhost:3000/api/v1/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "newuser",
    "email": "new@example.com",
    "password": "password123",
    "role": "USER",
    "homeName": "My Home"
  }'
```

## 🐛 Troubleshooting

### Cannot Login

1. ✅ Backend running? `http://localhost:3000`
2. ✅ Check `.env.local` has `BACKEND_BASE_URL`
3. ✅ Check browser console for errors

### Wrong Dashboard

1. ✅ Check cookies in DevTools
2. ✅ Clear cookies and login again
3. ✅ Verify user role in backend

### Import Errors

1. ✅ All files created (check COMPLETE_FIX_SUMMARY.md)
2. ✅ Restart TypeScript server
3. ✅ Restart Next.js dev server

## 📚 Documentation

- `COMPLETE_FIX_SUMMARY.md` - Full technical details
- `USER_LOGIN_GUIDE.md` - Detailed user guide
- `AUTH_FIX_SUMMARY.md` - Authentication fixes

## ✅ Status

All systems ready! Login dan test sekarang! 🎉
