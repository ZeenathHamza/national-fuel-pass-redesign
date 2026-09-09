# 🗓️ Sprint Plan: UI/UX Design — 4-Day Deadline
## Target: Monday, September 14, 2026

---

| Field | Details |
|-------|---------|
| **Sprint Goal** | Complete all UI/UX screens for the National Fuel Pass redesign prototype ready for Director Board presentation |
| **Start Date** | Wednesday, September 10, 2026 |
| **Hard Deadline** | Monday, September 14, 2026 |
| **Working Days** | 4 (Wed, Thu, Fri, Sat) + Sunday buffer |
| **Team** | T2T Group D |

---

## 📊 What Already Exists (Audit)

The following routes and components have already been scaffolded:

| Route / Component | Status |
|-------------------|--------|
| `(auth)/login/page.tsx` | ✅ Exists — needs polish |
| `(auth)/register/page.tsx` | ✅ Exists — needs polish |
| `(dashboard)/dashboard/page.tsx` | ✅ Exists — needs QR + quota ring redesign |
| `(dashboard)/qr-viewer/page.tsx` | ✅ Exists — needs glare-resistant styling |
| `(dashboard)/vehicles/page.tsx` | ✅ Exists — needs polish |
| `(dashboard)/vehicles/request/page.tsx` | ✅ Exists — needs step wizard redesign |
| `(dashboard)/complaints/page.tsx` | ✅ Exists — needs timeline component |
| `(dashboard)/notifications/page.tsx` | ✅ Exists — needs unread badge + grouping |
| `(dashboard)/profile/page.tsx` | ✅ Exists — needs polish |
| `(dashboard)/support/page.tsx` | ✅ Exists — needs WhatsApp CTA + FAQ |
| `(admin)/admin/page.tsx` | ✅ Exists — needs full redesign |
| `components/ui/QRCodeDisplay.tsx` | ✅ Exists — needs Wake Lock API |
| `components/ui/FuelGauge.tsx` | ✅ Exists — needs quota ring redesign |
| `components/ui/EligibilityCalendar.tsx` | ✅ Exists — needs color-coding polish |
| **Operator Scan Flow** | ❌ Missing — needs to be built |

---

## 🗓️ Day-by-Day Sprint Plan

### DAY 1 — Wednesday, September 10
**Theme: Design System Foundation + Auth Screens**

- [ ] Configure Tailwind with enterprise color tokens (`primary-900`, `accent-500`, `success-500`, `danger-500`)
- [ ] Set up `Inter` font in `app/layout.tsx`
- [ ] Build reusable `<Button />` component (Primary, Secondary, Danger variants — 48px min-height)
- [ ] Build reusable `<TextInput />` component with error state + `aria-describedby`
- [ ] **Login Page** (`/login`) — Full redesign with `color-primary-900` header, large input fields
- [ ] **Register Page** (`/register`) — Convert to 3-step wizard with `<Stepper />` component
  - Step 1: Personal Details
  - Step 2: Vehicle Details (regex validation `^[A-Z]{2,3}-\d{4}$`)
  - Step 3: OTP Input (mocked)

---

### DAY 2 — Thursday, September 11
**Theme: Driver Dashboard (Most Critical Screen)**

- [ ] **Dashboard / QR Screen** (`/dashboard` + `/qr-viewer`) — This is the most important screen
  - Redesign `QRCodeDisplay.tsx` — make QR large (240px), high contrast, white background
  - Implement `screen.wakeLock.request('screen')` on mount
  - Add 5-minute JWT TTL countdown indicator
- [ ] **Fuel Gauge → Quota Ring** (`FuelGauge.tsx`)
  - Replace gauge with circular progress ring
  - `color-success-500` when > 10%, `color-danger-500` + pulse animation when ≤ 10%
  - Display "X.X L remaining" in `text-heading-1` (24px 700) inside the ring
  - Show "Resets on [date]" below the ring
- [ ] **Eligibility Calendar** (`EligibilityCalendar.tsx`) — Polish green/red color coding
- [ ] **Vehicles Page** (`/vehicles`) — Polish `VehicleCard.tsx` with status badges

---

### DAY 3 — Friday, September 12
**Theme: Operator Flow + Complaints + Notifications**

- [ ] **Operator Scan Flow** — Build from scratch (currently missing!)
  - New route: `/(operator)/scan/page.tsx`
  - Large "Scan Vehicle QR" CTA button (`color-accent-500`, full-width)
  - `OperatorScanner.tsx` — camera with bounding-box overlay
  - `DispenseForm.tsx` — Vehicle number, fuel type, max quota in `text-heading-1`
  - Amount input with hard ceiling validation + disabled submit when exceeded
  - Success Modal (full-screen `color-success-500`, 3-second auto-dismiss)
- [ ] **Complaints Page** (`/complaints`)
  - `ComplaintForm.tsx` redesign with category selection, auto-generated ID
  - Status timeline: `Pending → In Review → Resolved`
- [ ] **Notifications Page** (`/notifications`)
  - Unread count badge on NavBar bell icon
  - Group notifications by date

---

### DAY 4 — Saturday, September 13
**Theme: Admin Panel + Support Hub + Polish**

- [ ] **Admin Panel** (`/admin`) — Full redesign
  - User search (NIC / name / vehicle number)
  - Vehicle request verification panel (Approve / Reject with reason)
  - Quota management UI
  - Complaint dashboard
- [ ] **Support Hub** (`/support`)
  - One-tap WhatsApp CTA (large, `color-success-500` green)
  - System status indicator (Operational / Delays / Offline)
  - Trilingual FAQ accordion
- [ ] **Profile Page** (`/profile`)
  - Phone number update with OTP modal
  - Ownership transfer form link
- [ ] **Global Polish Pass**
  - Ensure `BottomNav.tsx` uses `color-primary-900` with `color-accent-500` active state
  - Check all font sizes (nothing < 14px)
  - Verify all button touch targets (nothing < 48px height)
  - Add smooth page transitions

---

### SUNDAY, September 14 — Buffer / Final QA
**Theme: Testing, Lighthouse, Deployment**

- [ ] Run `npm run build` — fix any build errors
- [ ] Run Lighthouse audit on `/dashboard`, `/scan`, `/register`
  - Target: Accessibility ≥ 95, Performance ≥ 85
- [ ] Test on mobile viewport (360px width) in Chrome DevTools
- [ ] Test offline QR caching (Service Worker)
- [ ] Deploy to Vercel — confirm all routes load correctly
- [ ] Screenshot all major screens for documentation

---

## ⚠️ Priority Order (If Time is Short)

If you run out of time, complete screens in this order — stop when the deadline hits:

| Priority | Screen | Why |
|----------|--------|-----|
| 🔴 P0 | Driver Dashboard + QR Screen | Core feature — Director Board will see this first |
| 🔴 P0 | Login / Register Wizard | Entry point — must work |
| 🟠 P1 | Operator Scan Flow | Demonstrates the full transaction lifecycle |
| 🟠 P1 | Complaint Management | Differentiator feature unique to the redesign |
| 🟡 P2 | Admin Panel | Good-to-have for the demo |
| 🟡 P2 | Support Hub + Notifications | Polish |
| ⚪ P3 | Eligibility Calendar | Nice to have |

---

## 🏁 Definition of Done (by Monday)

- [ ] All P0 and P1 screens are visually complete and navigable
- [ ] Design matches the color palette in `docs/03_UX-Guidelines/Design-System.md`
- [ ] App is deployed to Vercel with a shareable URL
- [ ] Lighthouse Accessibility score ≥ 90 on the dashboard screen

---

*Sprint Owner: T2T Group D | Deadline: Monday, September 14, 2026*
