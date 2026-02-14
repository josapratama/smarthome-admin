# Authentication Fix Summary

## Problem

The login route was failing with "Module not found" errors because several server-side utility files were missing.

## Solution

Created the missing server-side API utilities and DTO files, plus added support for both USER and ADMIN roles.

### Server Utilities Created

1. **`src/lib/api/server/auth-cookies.ts`** - Manages HTTP-only authentication cookies
   - `setAuthCookies()` - Sets access and refresh tokens
   - `clearAuthCookies()` - Clears all auth cookies (including user_role)
   - `getAuthCookies()` - Retrieves auth cookies
   - `getAccessToken()` - Gets access token
   - `getRefreshToken()` - Gets refresh token

2. **`src/lib/api/server/auth-upstream.ts`** - Calls backend authentication endpoints
   - `authUpstream.login()` - Proxies login to backend
   - `authUpstream.refresh()` - Proxies token refresh
   - `authUpstream.logout()` - Proxies logout

3. **`src/lib/api/server/backend.ts`** - Authenticated backend API calls
   - `backendFetch()` - Fetch with auth headers
   - `backendUpload()` - Upload with auth headers

4. **`src/lib/api/server/upstream.ts`** - Unauthenticated backend API calls
   - `upstreamFetch()` - For public endpoints

5. **`src/lib/api/server/error-handler.ts`** - API error handling
   - `handleApiError()` - Converts errors to HTTP responses

### DTO Files Created

Created TypeScript interfaces for all API data types:

- `dto/auth.dto.ts` - User, ChangePasswordRequest
- `dto/alarms.dto.ts` - AlarmEventDTO
- `dto/commands.dto.ts` - CommandDTO, CommandCreateRequest
- `dto/devices.dto.ts` - DeviceDTO, DeviceCreateRequest, DeviceUpdateRequest
- `dto/firmware.dto.ts` - FirmwareReleaseDTO
- `dto/homes.dto.ts` - HomeDTO, HomesListResponse, HomeCreateRequest
- `dto/invites.dto.ts` - HomeInviteTokenDTO, InviteCreateRequest
- `dto/notifications.dto.ts` - NotificationEndpointDTO, NotificationLogDTO
- `dto/ota.dto.ts` - OtaJobDTO, OtaTriggerRequest
- `dto/overview.dto.ts` - OverviewDTO
- `dto/rooms.dto.ts` - RoomDTO, RoomCreateRequest
- `dto/telemetry.dto.ts` - TelemetryDTO

### Role-Based Access Control

Added role-based routing support for both ADMIN and USER:

- **Login route** - Accepts both ADMIN and USER, returns appropriate redirect path
- **Refresh route** - Maintains user role in cookies
- **Middleware** - Enforces role-based access control:
  - ADMIN → `/dashboard` and admin routes
  - USER → `/user/dashboard` and user routes
  - Auto-redirect if wrong role tries to access protected routes

### User Routes

User-facing routes under `/user/*`:

- `/user/dashboard` - User dashboard
- `/user/devices` - User's devices
- `/user/homes` - User's homes
- `/user/energy` - Energy monitoring
- `/user/alarms` - User's alarms
- `/user/settings` - User settings

## Architecture

```text
Frontend (Next.js) → API Routes → Server Utilities → Backend (Hono)
                                                    ↓
                                              PostgreSQL
```

### Authentication Flow

1. User submits credentials to `/api/auth/login`
2. Next.js API route calls backend via `authUpstream.login()`
3. Backend validates credentials and returns tokens + user data
4. Frontend stores tokens and user role in HTTP-only cookies
5. Returns redirect path based on role:
   - ADMIN → `/dashboard`
   - USER → `/user/dashboard`

### Middleware Flow

1. Check if user has `access_token` cookie
2. Check `user_role` cookie
3. Enforce role-based access:
   - Public routes: Allow all
   - Admin routes: Only ADMIN
   - User routes: Only USER
   - Auto-redirect if wrong role

### Environment Variables

Make sure these are set in `.env.local`:

```env
BACKEND_BASE_URL=http://localhost:3000
BACKEND_API_PREFIX=/api/v1
```

## Testing

### Test Login as ADMIN

1. Start backend: `cd smarthome-backend && bun dev`
2. Start frontend: `cd smarthome-frontend && bun dev`
3. Navigate to `http://localhost:3001/login`
4. Login with ADMIN credentials
5. Should redirect to `/dashboard`

### Test Login as USER

1. Navigate to `http://localhost:3001/login`
2. Login with USER credentials
3. Should redirect to `/user/dashboard`

### Test Role Protection

```bash
# Login as USER, try to access admin route
http://localhost:3001/dashboard
# → Auto redirect to /user/dashboard

# Login as ADMIN, try to access user route
http://localhost:3001/user/dashboard
# → Auto redirect to /dashboard
```

## Notes

- This frontend supports both ADMIN and USER roles
- Each role has separate dashboard and routes
- All authentication tokens are stored in HTTP-only cookies for security
- Access tokens expire in 7 days, refresh tokens in 30 days
- Middleware automatically enforces role-based access control

## See Also

- `USER_LOGIN_GUIDE.md` - Detailed guide for USER login and routes
