# Requirements Specification
## National Fuel Pass System — Redesign Proposal

---

| Field | Details |
|-------|---------|
| **Document ID** | NFP-001-REQ |
| **Version** | 1.0 |
| **Status** | Draft |
| **Owner** | T2T Group D |
| **Created** | 2026-09-10 |

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Stakeholders & User Personas](#2-stakeholders--user-personas)
3. [Functional Requirements](#3-functional-requirements)
4. [Non-Functional Requirements](#4-non-functional-requirements)
5. [Security & Compliance Requirements](#5-security--compliance-requirements)
6. [UI/UX Requirements](#6-uiux-requirements)
7. [User Stories & Acceptance Criteria](#7-user-stories--acceptance-criteria)
8. [Requirements Traceability Matrix](#8-requirements-traceability-matrix)
9. [Open Questions](#9-open-questions)
10. [Change Log](#10-change-log)

---

## 1. Introduction

### 1.1 Purpose

This document is the single source of truth for all requirements for the `national-fuel-pass-redesign` prototype. All user stories, acceptance criteria, and technical requirements trace back to entries in this document.

### 1.2 Requirement ID Format

- `REQ-F-NNN` — Functional
- `REQ-NF-NNN` — Non-Functional
- `REQ-SEC-NNN` — Security & Compliance
- `REQ-UI-NNN` — UI/UX

**Priority:** 🔴 Must Have | 🟠 Should Have | 🟡 Could Have | ⚪ Won't Have (this release)

### 1.3 Related Documents

| Document | Location |
|---------|----------|
| Project Charter | `docs/00_Charter.md` |
| System Architecture | `docs/02_Technical/System-Architecture.md` |
| UI/UX Design System | `docs/03_UX-Guidelines/Design-System.md` |

---

## 2. Stakeholders & User Personas

### 2.1 Persona 1: Kamal — The Driver (Vehicle Owner)

| Attribute | Details |
|-----------|---------|
| **Occupation** | Tuk-Tuk Driver, Colombo |
| **Device** | Low-mid range Android phone (4" – 5.5" screen) |
| **Tech Literacy** | Low — uses WhatsApp but finds banking apps confusing |
| **Primary Goal** | Open app → show QR → get fuel. Fastest path possible. |
| **Key Frustrations** | Cannot read small text; screen hard to see in sunlight; confused by multi-step flows |
| **Quote** | *"Meka hariyata nè — hamadaama kiyannata ewanas nè."* |

### 2.2 Persona 2: Thilini — The Pump Operator

| Attribute | Details |
|-----------|---------|
| **Occupation** | Pump Operator, Kelaniya fuel station |
| **Device** | Station-provided Android tablet |
| **Tech Literacy** | Medium — comfortable with POS systems |
| **Primary Goal** | Scan QR → enter amount → confirm. Under 10 seconds. |
| **Key Frustrations** | Long queues; QR codes that don't scan; confusing error messages |

### 2.3 Persona 3: Mr. Jayawardhana — The CPC Administrator

| Attribute | Details |
|-----------|---------|
| **Occupation** | IT Manager, Ceylon Petroleum Corporation |
| **Device** | Desktop PC, Chrome browser |
| **Tech Literacy** | High |
| **Primary Goal** | Manage national quota allocations, monitor system health, handle disputes |
| **Key Frustrations** | No real-time dashboard; manual approval process for vehicle registration |

---

## 3. Functional Requirements

### 3.1 Driver Module

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| REQ-F-001 | Display driver's QR code on dashboard within 2 seconds of login | 🔴 Must Have | Draft |
| REQ-F-002 | QR payload shall be a signed JWT with a 5-minute TTL | 🔴 Must Have | Draft |
| REQ-F-003 | Display remaining weekly quota as a circular progress ring | 🔴 Must Have | Draft |
| REQ-F-004 | Progress ring turns red and pulses when quota ≤ 10% | 🟠 Should Have | Draft |
| REQ-F-005 | Display date/time of next weekly quota reset | 🟠 Should Have | Draft |
| REQ-F-006 | Cache latest QR payload via Service Worker for offline access | 🟠 Should Have | Draft |
| REQ-F-007 | Visual Fuel Eligibility Calendar (Green = Eligible, Red = Ineligible) | 🟡 Could Have | Draft |

### 3.2 Pump Operator Module

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| REQ-F-010 | Operator dashboard shall have a single large "Scan Vehicle QR" CTA | 🔴 Must Have | Draft |
| REQ-F-011 | Post-scan: display vehicle number, fuel type, and max dispensable quota in large text | 🔴 Must Have | Draft |
| REQ-F-012 | Dispense amount input enforces hard ceiling equal to remaining quota | 🔴 Must Have | Draft |
| REQ-F-013 | Trigger haptic vibration (`navigator.vibrate`) on successful QR scan | 🟠 Should Have | Draft |
| REQ-F-014 | Full-screen green Success Modal for 3 seconds upon successful transaction | 🟠 Should Have | Draft |

### 3.3 Registration & Onboarding Module

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| REQ-F-020 | 3-step registration wizard: Personal → Vehicle → OTP | 🔴 Must Have | Draft |
| REQ-F-021 | Real-time vehicle number validation against `^[A-Z]{2,3}-\d{4}$` | 🔴 Must Have | Draft |
| REQ-F-022 | Backward navigation without data loss | 🟠 Should Have | Draft |
| REQ-F-023 | SMS OTP verification required before account activation | 🔴 Must Have | Draft |

### 3.4 Admin Module

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| REQ-F-030 | Admin search by NIC, name, or vehicle number | 🔴 Must Have | Draft |
| REQ-F-031 | Admin can approve or reject vehicle registration requests | 🔴 Must Have | Draft |
| REQ-F-032 | Admin can modify a driver's weekly quota allocation | 🟠 Should Have | Draft |
| REQ-F-033 | Admin complaint management dashboard | 🟠 Should Have | Draft |

---

## 4. Non-Functional Requirements

| ID | Requirement | Priority | Target Metric |
|----|-------------|----------|---------------|
| REQ-NF-001 | Time to Interactive (TTI) on fast 3G | 🔴 Must Have | ≤ 2.5 seconds |
| REQ-NF-002 | First Contentful Paint (FCP) | 🟠 Should Have | ≤ 1.0 second |
| REQ-NF-003 | Lighthouse Accessibility Score | 🔴 Must Have | ≥ 95 |
| REQ-NF-004 | Trilingual support (Sinhala, Tamil, English) | 🔴 Must Have | Full UI translation |
| REQ-NF-005 | WCAG 2.1 AA colour contrast for all body text | 🔴 Must Have | ≥ 4.5:1 ratio |
| REQ-NF-006 | Touch targets minimum size | 🔴 Must Have | ≥ 48 × 48px |
| REQ-NF-007 | Initial gzipped JS bundle | 🟠 Should Have | ≤ 200KB |

---

## 5. Security & Compliance Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| REQ-SEC-001 | All API communication via HTTPS/TLS 1.2+ | 🔴 Must Have |
| REQ-SEC-002 | QR payloads are signed JWTs; unsigned payloads are rejected by backend | 🔴 Must Have |
| REQ-SEC-003 | OTP codes expire after 5 minutes, single-use only | 🔴 Must Have |
| REQ-SEC-004 | No PII embedded in QR payloads (use vehicle UUID, not NIC) | 🔴 Must Have |
| REQ-SEC-005 | Comply with Sri Lanka PDPA No. 9 of 2022 | 🟠 Should Have |
| REQ-SEC-006 | API endpoints rate-limited to prevent brute-force attacks | 🟠 Should Have |

---

## 6. UI/UX Requirements

> See `docs/03_UX-Guidelines/Design-System.md` for full colour palette, typography, and component spec.

| ID | Requirement | Priority |
|----|-------------|----------|
| REQ-UI-001 | Primary font: `Inter` or `Roboto` at base size ≥ 16px | 🔴 Must Have |
| REQ-UI-002 | Critical data (quota, vehicle numbers) at ≥ 24px, font-weight 700 | 🔴 Must Have |
| REQ-UI-003 | Screen brightness maximized via Wake Lock API on QR view | 🟠 Should Have |
| REQ-UI-004 | Skeleton loaders instead of spinners | 🟡 Could Have |
| REQ-UI-005 | Language switcher (EN | සිං | தமிழ்) persistently visible in header | 🔴 Must Have |

---

## 7. User Stories & Acceptance Criteria

### Epic E-01: Driver Mobile Experience

#### US-001 — Driver Dashboard: Secure QR & Quota Visualization
> Reference: GitHub Issue [#28](https://github.com/ZeenathHamza/national-fuel-pass-redesign/issues/28) | Requirements: REQ-F-001 to REQ-F-006

**As a** vehicle owner (Driver),
**I want** to instantly access my dynamically generated, secure QR code and view my remaining weekly quota,
**so that** I can seamlessly process my fuel request without causing queue delays.

**Acceptance Criteria:**
- [ ] **GIVEN** I am logged in, **WHEN** the Dashboard mounts, **THEN** a signed JWT QR code is displayed within 2 seconds.
- [ ] **GIVEN** the QR is displayed, **WHEN** 5 minutes pass without scanning, **THEN** the QR payload auto-regenerates and UI updates seamlessly.
- [ ] **GIVEN** my remaining quota, **WHEN** it drops to ≤ 10%, **THEN** the progress ring turns `color-danger-500` (#EF4444) and pulses.
- [ ] **GIVEN** I have no internet at the fuel station, **WHEN** I open the PWA, **THEN** the Service Worker displays the last cached QR payload with an "Offline" indicator.

---

### Epic E-02: Pump Operator Flow

#### US-002 — Operator Flow: Rapid Dispensation & Validation
> Reference: GitHub Issue [#29](https://github.com/ZeenathHamza/national-fuel-pass-redesign/issues/29) | Requirements: REQ-F-010 to REQ-F-014

**As a** pump operator,
**I want** to scan driver QR codes rapidly and validate dispensed amounts,
**so that** I can process vehicles in under 10 seconds without exceeding quotas.

**Acceptance Criteria:**
- [ ] **GIVEN** I am on the Operator screen, **WHEN** I tap "Scan Vehicle", **THEN** the device camera opens in under 500ms.
- [ ] **GIVEN** a valid QR is scanned, **WHEN** decoded, **THEN** haptic vibration fires and the Dispense Form renders with vehicle data.
- [ ] **GIVEN** I enter a dispense amount > remaining quota, **WHEN** I try to submit, **THEN** the button is strictly disabled and a red inline error is displayed.
- [ ] **GIVEN** a successful transaction, **WHEN** the API responds 200, **THEN** a full-screen green success modal shows for 3 seconds.

---

### Epic E-03: Onboarding

#### US-003 — Unified Onboarding: Multi-step Registration & KYC
> Reference: GitHub Issue [#30](https://github.com/ZeenathHamza/national-fuel-pass-redesign/issues/30) | Requirements: REQ-F-020 to REQ-F-023

**As a** new citizen user,
**I want** to register my vehicle through a guided, multi-step wizard in my native language,
**so that** I can onboard without requiring external technical support.

**Acceptance Criteria:**
- [ ] **GIVEN** I start registration, **WHEN** I progress, **THEN** a Stepper shows my current phase (Step 1 of 3, 2 of 3, 3 of 3).
- [ ] **GIVEN** I enter an invalid vehicle number like `ABC1234`, **WHEN** I blur the field, **THEN** an inline error explains the correct format (`ABC-1234`).
- [ ] **GIVEN** I click "Back" on Step 2, **WHEN** I return to Step 1, **THEN** all previously entered data is still populated in the form.
- [ ] **GIVEN** I submit valid details on Step 3, **WHEN** the OTP is verified, **THEN** my account is activated and I am redirected to the Driver Dashboard.

---

## 8. Requirements Traceability Matrix

| Req ID | User Story | GitHub Issue | Component | Status |
|--------|------------|--------------|-----------|--------|
| REQ-F-001 | US-001 | #28 | `DriverDashboard.tsx` | ⬜ Not Started |
| REQ-F-002 | US-001 | #28 | `/api/v1/qr/generate` | ⬜ Not Started |
| REQ-F-003 | US-001 | #28 | `QuotaRing.tsx` | ⬜ Not Started |
| REQ-F-010 | US-002 | #29 | `OperatorDashboard.tsx` | ⬜ Not Started |
| REQ-F-011 | US-002 | #29 | `DispenseForm.tsx` | ⬜ Not Started |
| REQ-F-012 | US-002 | #29 | `DispenseForm.tsx` (Zod schema) | ⬜ Not Started |
| REQ-F-020 | US-003 | #30 | `OnboardingWizard.tsx` | ⬜ Not Started |
| REQ-F-021 | US-003 | #30 | `vehicle.schema.ts` | ⬜ Not Started |
| REQ-NF-003 | All | All | CI: Lighthouse check | ⬜ Not Started |
| REQ-SEC-002 | US-001 | #28 | `/api/v1/dispense` (JWT verify) | ⬜ Not Started |

---

## 9. Open Questions

| # | Question | Owner | Due | Status |
|---|----------|-------|-----|--------|
| OQ-001 | QR code: server-side RS256 signing or client-side HMAC? | Engineering Lead | Sprint 1 | ❓ Open |
| OQ-002 | Which SMS gateway to mock for OTP? (Notify.lk vs Twilio) | Dev Team | Sprint 1 | ❓ Open |
| OQ-003 | Is `next-intl` approved for trilingual i18n? | Engineering Lead | Sprint 1 | ❓ Open |

---

## 10. Change Log

| Version | Date | Author | Change |
|---------|------|--------|--------|
| 1.0 | 2026-09-10 | T2T Group D | Initial requirements specification |

---
*Document ID: NFP-001-REQ | Standard: T2T Enterprise Documentation v1.0*
