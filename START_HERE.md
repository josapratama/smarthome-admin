# 🚀 Start Here - Smart Home Frontend

## Quick Start

```bash
# 1. Install dependencies (if not done)
bun install

# 2. Make sure .env.local exists
cp .env.example .env.local

# 3. Start development server
bun dev
```

Server akan berjalan di: **http://localhost:3001**

## ✅ What's Fixed

1. ✅ Module not found error - FIXED
2. ✅ Duplicate folders - REMOVED
3. ✅ Duplicate config files - REMOVED
4. ✅ TypeScript errors - FIXED
5. ✅ Missing provider - CREATED
6. ✅ Missing middleware - CREATED

## 📁 Clean Structure

```
src/
├── app/              # Pages & routes
├── components/       # UI components
├── lib/              # Logic & utilities
│   ├── api/         # API clients
│   ├── hooks/       # Custom hooks
│   ├── store/       # State management
│   ├── types/       # TypeScript types
│   └── query/       # React Query setup
└── middleware.ts    # Route protection
```

## 🔗 Available Routes

### Public Routes (No Auth Required)

- `/login` - User login
- `/register` - User registration
- `/forgot-password` - Password recovery
- `/reset-password` - Password reset

### Protected Routes (Auth Required)

- `/dashboard` - Main dashboard
- `/devices` - Device management
- `/homes` - Home management
- `/energy` - Energy monitoring
- `/alarms` - Alarm management
- `/settings` - User settings

## 🎯 Test Flow

1. **Register**: http://localhost:3001/register
   - Create new user account
   - Will auto-login after registration

2. **Login**: http://localhost:3001/login
   - Login with credentials
   - Redirects to dashboard

3. **Dashboard**: http://localhost:3001/dashboard
   - View overview
   - Navigate to other pages

## 🔐 Important Notes

### User vs Admin

- This frontend is for **USER role only**
- ADMIN users will be blocked
- Admin users should use Admin Dashboard

### Authentication

- Uses JWT tokens
- Refresh token in httpOnly cookie
- Access token in memory
- Auto-refresh on expiry

### Real-time Updates

- WebSocket connection auto-initialized
- Device status updates
- Telemetry streaming
- Alarm notifications

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3001
npx kill-port 3001

# Or use different port
bun dev -- -p 3002
```

### Module Not Found

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules
bun install
```

### TypeScript Errors

```bash
# Check types
bun run type-check

# Restart TypeScript server in VS Code
Ctrl+Shift+P > TypeScript: Restart TS Server
```

## 📚 Documentation

- [README.md](./README.md) - Full documentation
- [QUICK_START.md](./QUICK_START.md) - Quick start guide
- [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md) - Implementation details
- [STRUCTURE.md](./STRUCTURE.md) - Project structure
- [CLEANUP_SUMMARY.md](./CLEANUP_SUMMARY.md) - What was fixed

## ✨ Ready to Go!

Everything is clean and ready. Just run:

```bash
bun dev
```

Then open: **http://localhost:3001/login**

Happy coding! 🎉
