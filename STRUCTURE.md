# Smart Home Frontend - Project Structure

## Clean Structure (No Duplicates)

````
smarthome-frontend/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (admin)/                  # Admin routes (for ADMIN role)
│   │   ├── (auth)/                   # Auth routes (login, register)
│   │   │   ├── login/
│   │   │   ├── forgot-password/
│   │   │   └── reset-password/
│   │   ├── (user)/                   # User routes (for USER role)
│   │   │   ├── dashboard/
│   │   │   ├── devices/
│   │   │   ├── homes/
│   │   │   ├── energy/
│   │   │   ├── alarms/
│   │   │   ├── settings/
│   │   │   └── layout.tsx
│   │   ├── api/                      # API routes (if needed)
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Home page (redirects to login)
│   │   └── globals.css               # Global styles
│   ├── components/                   # React components
│   │   └── ui/                       # Shadcn/ui components
│   ├── lib/                          # Libraries & utilities
│   │   ├── api/                      # API clients
│   │   │   ├── client.ts
│   │   │   ├── auth.ts
│   │   │   ├── devices.ts
│   │   │   ├── homes.ts
│   │   │   ├── rooms.ts
│   │   │   ├── alarms.ts
│   │   │   └── energy.ts
│   │   ├── hooks/                    # Custom React hooks
│   │   │   ├── use-auth.ts
│   │   │   ├── use-devices.ts
│   │   │   ├── use-homes.ts
│   │   │   ├── use-alarms.ts
│   │   │   ├── use-energy.ts
│   │   │   └── use-websocket.ts
│   │   ├── store/                    # Zustand stores
│   │   │   ├── auth.ts
│   │   │   ├── ui.ts
│   │   │   └── settings.ts
│   │   ├── types/                    # TypeScript types
│   │   │   └── index.ts
│   │   ├── query/                    # React Query setup
│   │   │   └── provider.tsx
│   │   └── utils.ts                  # Utility functions
│   └── generated/                    # Generated files
│       └── api.ts
├── public/                           # Static assets
├── .env.example                      # Environment template
├── .env.local                        # Local environment
├── next.config.js                    # Next.js config
├── tailwind.config.ts                # Tailwind config
├── tsconfig.json                     # TypeScript config
├── package.json                      # Dependencies
└── README.md                         # Documentation

## Key Points

1. **Single Source of Truth**: All code in `src/` folder
2. **No Duplicates**: Removed duplicate folders (hooks, components, lib from root)
3. **Clean Structure**: App Router in `src/app/`
4. **Organized**: Clear separation between admin, auth, and user routes

## Route Groups

- `(admin)` - Admin dashboard routes (ADMIN role only)
- `(auth)` - Authentication routes (public)
- `(user)` - User dashboard routes (USER role only)

## Import Paths

All imports use `@/` alias which points to `src/`:

```typescript
import { authApi } from "@/lib/api/auth";
import { useAuth } from "@/lib/hooks/use-auth";
import { Button } from "@/components/ui/button";
````
