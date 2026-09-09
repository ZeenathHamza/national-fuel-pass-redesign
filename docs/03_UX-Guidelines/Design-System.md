# Design System & UI/UX Guidelines
## National Fuel Pass System — Redesign Proposal

---

| Field | Details |
|-------|---------|
| **Document ID** | NFP-001-UX |
| **Version** | 1.0 |
| **Status** | Draft |
| **Owner** | T2T Group D |
| **Last Updated** | 2026-09-10 |

---

## Table of Contents

1. [Design Philosophy](#1-design-philosophy)
2. [Color System](#2-color-system)
3. [Typography](#3-typography)
4. [Spacing & Layout](#4-spacing--layout)
5. [Component Specifications](#5-component-specifications)
6. [Micro-interactions & Motion](#6-micro-interactions--motion)
7. [Accessibility Standards](#7-accessibility-standards)
8. [Icon & Language System](#8-icon--language-system)

---

## 1. Design Philosophy

The primary user base includes individuals operating in sub-optimal physical environments: **outdoor fuel stations with intense tropical sunlight**, often under time pressure with a queue behind them. The design must prioritise **clarity and speed over decorative aesthetics**, while maintaining a trustworthy, premium government-service image.

### Core Principles

| Principle | Definition |
|-----------|------------|
| **Glare-Resilient** | Maximum contrast at all times. The QR screen must be readable at arm's length under direct sunlight. |
| **Fat-Finger Forgiving** | All touch targets ≥ 48 × 48px. Critical actions must be thumb-reachable without repositioning the hand. |
| **Low-Literacy First** | Icons communicate meaning independently of text. Error messages in plain language — no technical jargon. |
| **Speed-Optimised** | Every user flow is designed for the minimum number of taps. No decorative splash screens. |
| **Trustworthy** | Deep Navy authority colour + official government styling to counter scam impersonation concerns. |

---

## 2. Color System

All colours are WCAG 2.1 AA compliant (≥ 4.5:1 contrast ratio against intended backgrounds).

### 2.1 Primary Palette

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `color-primary-900` | `#0A2540` | `rgb(10, 37, 64)` | Navbar, headers, official branding — conveys trust & government authority |
| `color-primary-700` | `#1A3F6F` | `rgb(26, 63, 111)` | Card headers, secondary UI surfaces |
| `color-primary-100` | `#EBF4FF` | `rgb(235, 244, 255)` | Light section backgrounds, tinted panels |

### 2.2 Accent Palette

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `color-accent-500` | `#FFC107` | `rgb(255, 193, 7)` | **Primary CTA buttons** (Scan QR, Confirm, Submit) — maximum attention |
| `color-accent-600` | `#E6A800` | `rgb(230, 168, 0)` | Hover/active state for accent buttons |
| `color-accent-100` | `#FFF8E1` | `rgb(255, 248, 225)` | Accent-tinted notification backgrounds |

### 2.3 Status / Semantic Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `color-success-500` | `#10B981` | Quota available, successful transaction, eligible calendar days |
| `color-success-100` | `#D1FAE5` | Success message / toast backgrounds |
| `color-danger-500` | `#EF4444` | Quota exceeded, OTP error, invalid form inputs, ineligible calendar days |
| `color-danger-100` | `#FEE2E2` | Error message backgrounds |
| `color-warning-500` | `#F59E0B` | Low quota warning (≤ 10%), pending approval status |
| `color-neutral-700` | `#374151` | Primary body text |
| `color-neutral-400` | `#9CA3AF` | Placeholder text, disabled states |
| `color-neutral-50` | `#F9FAFB` | App background (off-white — reduces harsh glare vs pure white) |

### 2.4 Tailwind Configuration Snippet

```js
// tailwind.config.js — extend.colors
colors: {
  primary:  { 900: '#0A2540', 700: '#1A3F6F', 100: '#EBF4FF' },
  accent:   { 600: '#E6A800', 500: '#FFC107', 100: '#FFF8E1' },
  success:  { 500: '#10B981', 100: '#D1FAE5' },
  danger:   { 500: '#EF4444', 100: '#FEE2E2' },
  warning:  { 500: '#F59E0B' },
  neutral:  { 700: '#374151', 400: '#9CA3AF',  50: '#F9FAFB' },
}
```

---

## 3. Typography

### 3.1 Font Family

**Primary:** `Inter` (Google Fonts — variable weight)
**Fallback:** `ui-sans-serif, system-ui, -apple-system, sans-serif`

```css
/* app/globals.css */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
body { font-family: 'Inter', sans-serif; }
```

### 3.2 Type Scale

| Token | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| `display` | 32px / 2rem | 800 | 1.2 | QR page hero stats, major data displays |
| `heading-1` | 24px / 1.5rem | 700 | 1.3 | **Critical data: quota amounts, vehicle numbers** |
| `heading-2` | 20px / 1.25rem | 600 | 1.4 | Section headings, modal titles |
| `body-lg` | 18px / 1.125rem | 400 | 1.6 | Operator form primary text |
| `body` | 16px / 1rem | 400 | 1.6 | **Base size — absolute minimum for the app** |
| `caption` | 14px / 0.875rem | 400 | 1.5 | Helper text, timestamps, labels |

> ⚠️ **Rule: Never use font size below 14px anywhere in the application.**

---

## 4. Spacing & Layout

### 4.1 Spacing Scale (4px base unit)

| Token | Value |
|-------|-------|
| `space-1` | 4px |
| `space-2` | 8px |
| `space-3` | 12px |
| `space-4` | 16px |
| `space-6` | 24px |
| `space-8` | 32px |
| `space-12` | 48px |
| `space-16` | 64px |

### 4.2 Breakpoints (Mobile-First)

| Breakpoint | Width | Primary Target |
|------------|-------|----------------|
| `default` | 360–480px | Low-end Android phones (most common in SL) |
| `sm` | 480px | Mid-range phones |
| `md` | 768px | Operator tablets |
| `lg` | 1024px | Admin desktop view |

---

## 5. Component Specifications

### 5.1 Button Component

```
┌─────────────────────────────┐
│  VARIANT: Primary (CTA)     │
├─────────────────────────────┤
│  Background:   #FFC107      │
│  Text:         #0A2540      │
│  Font:         Inter 600 16px│
│  Border Radius: 12px        │
│  Padding:      14px 24px    │
│  Min Height:   48px ✓       │ ← Touch target compliance
│  Hover:        #E6A800 + scale(1.02) │
│  Active:       scale(0.98)  │
└─────────────────────────────┘

┌─────────────────────────────┐
│  VARIANT: Secondary         │
├─────────────────────────────┤
│  Background:   #1A3F6F      │
│  Text:         #FFFFFF      │
│  (Same sizing as Primary)   │
└─────────────────────────────┘

┌─────────────────────────────┐
│  VARIANT: Danger            │
├─────────────────────────────┤
│  Background:   #EF4444      │
│  Text:         #FFFFFF      │
│  (Same sizing as Primary)   │
└─────────────────────────────┘
```

### 5.2 TextInput Component

```
Default:  border: 1px solid #9CA3AF | radius: 8px | min-height: 48px | font: 16px
Focus:    border: 2px solid #1A3F6F | outline: none
Error:    border: 2px solid #EF4444
          + helper text below: color #EF4444, font 14px, contains plain-language fix instruction
          + aria-invalid="true" + aria-describedby="[id]-error"
```

### 5.3 QR Code Display Card

```
Background:          #FFFFFF (pure white — max contrast for scanner cameras)
Border Radius:       20px
Box Shadow:          0 8px 32px rgba(10, 37, 64, 0.15)
QR Minimum Size:     240 × 240px
Padding around QR:   24px
Wake Lock API:        screen.wakeLock.request('screen') on mount
                      — maximizes screen brightness for outdoor readability
```

### 5.4 Quota Ring Component

```
Ring Size:           200 × 200px
Track Color:         #F3F4F6 (neutral-100)
Progress Color:      #10B981 (success-500) when remaining > 10%
                     #EF4444 (danger-500) when remaining ≤ 10%
Inner Text:          Heading-1 (24px 700) for the number
                     Caption (14px) for "Litres remaining"
Reset Text:          Caption below ring: "Resets on [date]"
Animation:           stroke-dashoffset transition 600ms ease-out on mount
Danger Pulse:        scale(1.04) loop animation, 1200ms ease-in-out
```

---

## 6. Micro-interactions & Motion

| Interaction | Animation | Duration | Easing |
|-------------|-----------|----------|--------|
| Button press | `scale(0.98)` | 100ms | `ease-in-out` |
| Button hover | `scale(1.02)` | 150ms | `ease-out` |
| Page transition | Fade + slide-up 8px | 200ms | `ease-out` |
| Quota ring mount | Stroke draw from 0% | 600ms | `ease-out` |
| Quota ring danger | Pulse `scale(1.04)` loop | 1200ms | `ease-in-out` |
| Success modal appear | `scale(0.8)→scale(1)` + fade | 250ms | `cubic-bezier(0.175, 0.885, 0.32, 1.275)` |
| Scan success haptic | `navigator.vibrate([200, 100, 200])` | — | — |

> ⚠️ **Rule: No UI animation shall exceed 400ms total duration. Users in queues need instant visual feedback.**

---

## 7. Accessibility Standards

| Standard | Requirement | Tooling |
|----------|-------------|---------|
| Colour Contrast | ≥ 4.5:1 AA for body text; ≥ 3:1 AA for large text | Lighthouse, axe DevTools |
| Focus Indicator | Visible 2px `color-accent-500` outline (`focus-visible` only) | Manual review |
| Touch Targets | ≥ 48 × 48px for all interactive elements (WCAG 2.5.5) | Chrome DevTools |
| Screen Reader | Descriptive `alt` on all images; `<label>` linked to every `<input>` | axe DevTools |
| Font Scaling | Layout must not break at 200% OS font size | Manual review |
| Error Association | All form errors linked via `aria-describedby` | Code review |
| Language | `lang` attribute set correctly for Sinhala (`si`) and Tamil (`ta`) pages | HTML audit |

**Target Lighthouse Score:** Accessibility ≥ 95

---

## 8. Icon & Language System

### 8.1 Icon Library

- **Library:** `lucide-react`
- **Interactive icon size:** ≥ 24px
- **Informational icon size:** ≥ 20px
- **Color:** Inherit from parent text (automatic contrast compliance)
- **Always pair icons with text labels** for low-literacy users (no icon-only buttons except in mature flows)

### 8.2 Language Switcher Spec

```
Component: <LanguageSwitcher />
Location:  Persistent in top navigation header (all routes)
Appearance: Three pill buttons — [EN] [සිං] [தமிழ்]
Storage:   User preference in localStorage key: "nfp-locale"
Library:   next-intl
Messages:  /messages/en.json | /messages/si.json | /messages/ta.json
```

### 8.3 Key Translations Required (Priority)

| UI Element | EN | සිං | தமிழ் |
|------------|-----|-----|-------|
| Scan QR Button | Scan QR | QR ස්කෑන් කරන්න | QR ஸ்கேன் செய்யுங்கள் |
| Remaining Quota | Remaining | ඉතිරි | மீதமுள்ள |
| Confirm Transaction | Confirm | තහවුරු කරන්න | உறுதிப்படுத்துக |
| Error: Quota Exceeded | Amount exceeds your quota | ප්‍රමාණය ඔබේ කෝටාව ඉක්මවයි | அளவு உங்கள் ஒதுக்கீட்டை மீறுகிறது |

---

*Document ID: NFP-001-UX | Standard: T2T Enterprise Documentation v1.0*
