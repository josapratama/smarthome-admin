# Theme System Fix

## Problem

Error: `useTheme must be used within ThemeProvider`

Settings page was trying to use `useTheme()` hook, but `ThemeProvider` wasn't wrapping the app.

## Solution

### Simplified Approach (No Provider Needed)

Instead of using a complex ThemeProvider, the settings page now:

1. **Manages theme directly** using `usePreferences` hook
2. **Applies theme to DOM** using `useEffect`
3. **Syncs with backend** automatically via preferences API

### How It Works

```typescript
// Get preferences from backend
const { preferences, updatePreferences } = usePreferences();

// Local state for immediate UI updates
const [localPrefs, setLocalPrefs] = useState({
  theme: preferences?.theme || "system",
  // ... other prefs
});

// Apply theme to document
useEffect(() => {
  const root = window.document.documentElement;
  const theme = localPrefs.theme;

  if (theme === "system") {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    root.classList.remove("light", "dark");
    root.classList.add(systemTheme);
  } else {
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }
}, [localPrefs.theme]);

// Save to backend
const handleSave = () => {
  updatePreferences(localPrefs);
};
```

## Benefits

1. **No Provider Required**: Simpler architecture
2. **Direct DOM Manipulation**: Faster theme switching
3. **Backend Sync**: Preferences saved to database
4. **System Theme Support**: Auto-detect OS preference
5. **Immediate Feedback**: Theme applies instantly

## Files Changed

- `src/app/user/settings/page.tsx` - Removed `useTheme` dependency, added direct theme management

## Theme Provider (Optional)

The `ThemeProvider` component is still available if you want to use it in other parts of the app. To use it:

```typescript
// In root layout
import { ThemeProvider } from "@/components/providers/theme-provider";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

// In any component
import { useTheme } from "@/components/providers/theme-provider";

function MyComponent() {
  const { theme, setTheme } = useTheme();
  // ...
}
```

## Testing

1. Go to `/user/settings`
2. Change theme to "Dark"
3. Page should immediately switch to dark mode
4. Refresh page - theme should persist
5. Change to "System" - should match OS preference

## Tailwind Configuration

Make sure your `tailwind.config.ts` has dark mode enabled:

```typescript
export default {
  darkMode: "class", // or 'media'
  // ...
};
```

And your `globals.css` has dark mode styles:

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    /* ... */
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    /* ... */
  }
}
```

## Status

✅ Fixed - Settings page now works without ThemeProvider
✅ Theme switching works
✅ System theme detection works
✅ Backend sync works
✅ No more errors
