# Quick Test Guide - Smart Home Frontend

## 🚀 Cara Menjalankan

```bash
cd smarthome-frontend
rm -rf .next  # Clear cache
npm run dev   # atau bun dev
```

Server akan berjalan di: **http://localhost:3001**

---

## 📋 Testing Checklist

### 1. Landing Page (/)

**URL:** http://localhost:3001/

✅ **Yang Harus Dicek:**

- [ ] Hero section tampil dengan gradient background
- [ ] Statistik tampil (1000+ devices, 500+ users, 99.9% uptime)
- [ ] Features section (6 cards) tampil dengan icon
- [ ] Benefits section tampil dengan checkmarks
- [ ] CTA section dengan gradient button
- [ ] Header dengan logo dan tombol Login
- [ ] Footer tampil
- [ ] Klik "Get Started" → redirect ke /login
- [ ] Klik "Login" di header → redirect ke /login
- [ ] Responsive (coba resize browser)

---

### 2. Login Page (/login)

**URL:** http://localhost:3001/login

✅ **Demo Credentials:**

- **Admin:** username: `admin` | password: `admin123`
- **User:** username: `user` | password: `user123`

✅ **Yang Harus Dicek:**

- [ ] Two-column layout tampil (info + form)
- [ ] Feature highlights tampil (3 items dengan icon)
- [ ] Demo credentials box tampil
- [ ] Form login berfungsi
- [ ] Show/hide password berfungsi
- [ ] Error message tampil jika salah
- [ ] Loading state saat login
- [ ] Klik "Back to Home" → kembali ke /
- [ ] Login sebagai admin → redirect ke /dashboard
- [ ] Login sebagai user → redirect ke /user/dashboard

---

### 3. Admin Dashboard (/dashboard)

**URL:** http://localhost:3001/dashboard (setelah login sebagai admin)

✅ **Yang Harus Dicek:**

- [ ] Sidebar tampil dengan menu lengkap
- [ ] Menu "Settings" ada di sidebar
- [ ] Topbar tampil dengan theme toggle
- [ ] Theme dropdown berfungsi (Sun/Moon/Monitor icon)
- [ ] Klik theme → berubah instant
- [ ] Logout button berfungsi

---

### 4. Admin Settings (/settings)

**URL:** http://localhost:3001/settings (admin only)

✅ **Yang Harus Dicek:**

- [ ] Halaman settings tampil
- [ ] Theme selection dropdown tampil
- [ ] Ubah theme → berubah instant
- [ ] Language selection dropdown tampil
- [ ] Ubah language → sidebar berubah instant
- [ ] App Info section tampil
- [ ] Role badge "Administrator" tampil
- [ ] Klik "Save Changes" → muncul toast
- [ ] Refresh page → settings tetap tersimpan

---

### 5. User Dashboard (/user/dashboard)

**URL:** http://localhost:3001/user/dashboard (setelah login sebagai user)

✅ **Yang Harus Dicek:**

- [ ] Sidebar tampil dengan menu user
- [ ] Menu "Settings" ada di sidebar
- [ ] Topbar tampil dengan theme toggle
- [ ] Theme dropdown berfungsi
- [ ] Logout button berfungsi

---

### 6. User Settings (/user/settings)

**URL:** http://localhost:3001/user/settings (user only)

✅ **Yang Harus Dicek:**

- [ ] Halaman settings tampil
- [ ] Theme selection berfungsi
- [ ] Language selection berfungsi
- [ ] App Info section tampil
- [ ] Role badge "USER" tampil
- [ ] Save button berfungsi
- [ ] Toast notification muncul

---

## 🎨 Theme Testing

### Test Theme Switching

1. **Dari Topbar:**
   - Klik icon theme (Sun/Moon/Monitor)
   - Pilih Light → background jadi terang
   - Pilih Dark → background jadi gelap
   - Pilih System → ikuti OS theme

2. **Dari Settings Page:**
   - Buka /settings atau /user/settings
   - Ubah theme dari dropdown
   - Theme berubah instant
   - Klik "Save Changes"
   - Refresh page → theme tetap

3. **Persistence Test:**
   - Ubah theme ke Dark
   - Refresh page → masih Dark
   - Logout dan login lagi → masih Dark
   - Buka tab baru → masih Dark

---

## 🌍 Language Testing

### Test Language Switching

1. **Dari Settings Page:**
   - Buka /settings atau /user/settings
   - Ubah language ke "Bahasa Indonesia"
   - Sidebar menu berubah ke Bahasa Indonesia
   - Topbar "Logout" berubah ke "Keluar"
   - Klik "Save Changes"

2. **Check Translations:**
   - Dashboard → Dasbor
   - Devices → Perangkat
   - Homes → Rumah
   - Settings → Pengaturan
   - Logout → Keluar

3. **Test Spanish:**
   - Ubah ke "Español"
   - Dashboard → Panel
   - Devices → Dispositivos
   - Settings → Configuración

4. **Persistence Test:**
   - Ubah language ke ID
   - Refresh page → masih ID
   - Logout dan login lagi → masih ID

---

## 🔐 Authentication Testing

### Test Login Flow

1. **Admin Login:**

   ```
   Username: admin
   Password: admin123
   ```

   - Redirect ke /dashboard
   - Cookie `user_role` = ADMIN
   - Akses /user/dashboard → redirect ke /dashboard

2. **User Login:**

   ```
   Username: user
   Password: user123
   ```

   - Redirect ke /user/dashboard
   - Cookie `user_role` = USER
   - Akses /dashboard → redirect ke /user/dashboard

3. **Wrong Credentials:**
   - Masukkan password salah
   - Error message tampil
   - Form tidak submit

4. **Logout:**
   - Klik logout button
   - Redirect ke /login
   - Cookie dihapus
   - Akses /dashboard → redirect ke /login

---

## 📱 Responsive Testing

### Desktop (1920x1080)

- [ ] Landing page full width
- [ ] Two-column login layout
- [ ] Sidebar + content layout
- [ ] All features visible

### Tablet (768x1024)

- [ ] Landing page responsive
- [ ] Login form centered
- [ ] Sidebar collapsible
- [ ] Touch-friendly buttons

### Mobile (375x667)

- [ ] Landing page stacked
- [ ] Login single column
- [ ] Sidebar hidden (hamburger menu)
- [ ] All content accessible

---

## 🐛 Common Issues & Solutions

### Issue 1: Theme tidak berubah

**Solusi:**

```bash
# Clear cache
rm -rf .next
# Clear browser localStorage
# Restart dev server
npm run dev
```

### Issue 2: Language tidak berubah

**Solusi:**

- Check browser console untuk errors
- Verify translation key exists di `translations.ts`
- Clear localStorage dan coba lagi

### Issue 3: "useTheme must be used within ThemeProvider"

**Solusi:**

- Verify ThemeProvider di `src/app/layout.tsx`
- Clear .next cache
- Restart server

### Issue 4: Login redirect tidak bekerja

**Solusi:**

- Check backend API running di http://localhost:3000
- Check network tab untuk API response
- Verify cookies di browser DevTools

### Issue 5: Settings tidak muncul di sidebar

**Solusi:**

- Clear cache: `rm -rf .next`
- Hard refresh browser: Ctrl+Shift+R
- Check file `src/components/admin/Sidebar.tsx`

---

## ✅ Success Criteria

Semua fitur berikut harus berfungsi:

### Landing Page

- [x] Hero section menarik
- [x] Features showcase
- [x] Benefits section
- [x] CTA buttons
- [x] Responsive design

### Login Page

- [x] Two-column layout
- [x] Feature highlights
- [x] Demo credentials
- [x] Form validation
- [x] Error handling

### Admin Features

- [x] Settings menu di sidebar
- [x] Settings page lengkap
- [x] Theme switching
- [x] Language switching
- [x] Role badge

### User Features

- [x] Settings menu di sidebar
- [x] Settings page lengkap
- [x] Theme switching
- [x] Language switching

### General

- [x] No TypeScript errors
- [x] No runtime errors
- [x] Responsive design
- [x] Persistence works
- [x] Authentication works

---

## 🎯 Quick Test Commands

```bash
# Start frontend
cd smarthome-frontend
npm run dev

# Start backend (di terminal lain)
cd smarthome-backend
npm run dev

# Clear cache jika ada masalah
rm -rf .next

# Check TypeScript errors
npm run type-check

# Run linter
npm run lint
```

---

## 📞 Support

Jika ada masalah:

1. Check browser console untuk errors
2. Check network tab untuk API calls
3. Check terminal untuk server errors
4. Clear cache dan restart
5. Read documentation di LANDING_AND_SETTINGS_UPDATE.md

---

Happy Testing! 🚀
