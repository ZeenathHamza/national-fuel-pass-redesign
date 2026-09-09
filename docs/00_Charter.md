# PROJECT CHARTER
## National Fuel Pass System — Redesign Proposal

---

| Field | Details |
|-------|---------|
| **Document ID** | NFP-001-CHARTER |
| **Project Code** | national-fuel-pass-redesign |
| **Project Type** | Type A — Web Application (UI/UX Redesign Proposal) |
| **Version** | 1.0 |
| **Status** | Draft |
| **Owner** | T2T Group D — Engineering Lead |
| **Created** | 2026-09-10 |
| **Approved By** | Pending — Petroleum Corporation Director Board |

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Problem Statement](#2-problem-statement)
3. [Project Objectives](#3-project-objectives)
4. [Scope](#4-scope)
5. [Stakeholders](#5-stakeholders)
6. [Team & Roles](#6-team--roles)
7. [Deliverables](#7-deliverables)
8. [Timeline & Milestones](#8-timeline--milestones)
9. [Risks & Mitigations](#9-risks--mitigations)
10. [Success Criteria](#10-success-criteria)
11. [Change Log](#11-change-log)

---

## 1. Project Overview

### 1.1 Project Summary

This project redesigns and develops a proposal prototype for the **National Fuel Pass system** — a government-backed digital fuel quota management platform in Sri Lanka operated by the Ceylon Petroleum Corporation (CPC). The redesign aims to radically simplify the user interface and user experience to serve a population with varying technological literacy levels, from Tuk-Tuk drivers in rural areas to corporate fleet operators.

The prototype will be presented to the **Director Board of the Petroleum Corporation** as a high-fidelity, functional Next.js application deployed on Vercel.

### 1.2 Context & Background

The original Fuel Pass system was introduced as an emergency measure during the 2022 Sri Lanka economic crisis to manage fuel shortages. While functionally effective, the UX suffered from poor accessibility, confusing navigation, and inadequate multi-language support — resulting in widespread confusion and long queues at fuel stations caused by operator inefficiency.

### 1.3 Strategic Alignment

- ✅ Demonstrates end-to-end UX Engineering capability (T2T Batch 4 Assignment)
- ✅ Addresses a real-world, high-impact government service affecting millions of Sri Lankans
- ✅ Establishes a foundation for a full production handover to the CPC

---

## 2. Problem Statement

### 2.1 Core Problem

The current Fuel Pass system causes significant friction at the point of fuel dispensation due to a poorly designed UX that does not account for the target user's low digital literacy, outdoor environmental constraints (sun glare on screens), or the time pressure of high-volume fuel station queues.

### 2.2 Impact Analysis

| Impact Area | Current State | Risk / Cost if Unaddressed |
|-------------|---------------|---------------------------|
| Queue Time | Operators struggle to scan QR codes due to poor screen visibility | Longer queues; public frustration |
| User Confusion | Complex multi-step flows confuse low-literacy drivers | Drivers unable to use app independently |
| Quota Abuse | QR codes can be screenshot and shared | Over-quota dispensing; fuel shortages |
| Multi-language | No effective trilingual (SI/TA/EN) support | Exclusion of Tamil-speaking minority users |
| Accessibility | Fails WCAG AA contrast standards | Inaccessible to users with visual impairments |

---

## 3. Project Objectives

### 3.1 Primary Objective

To design and develop a high-fidelity, functional prototype demonstrating a significantly improved UX for the National Fuel Pass system — measurably reducing transaction time at the pump from ~30 seconds to under 10 seconds.

### 3.2 Key Results / OKRs

| Objective | Key Result | Target |
|-----------|------------|--------|
| Speed at pump | Time from app open to QR visible | ≤ 2 seconds |
| Operator efficiency | Scan-to-confirmation flow (number of taps) | ≤ 3 taps |
| Accessibility | Lighthouse Accessibility Score | ≥ 95 |
| Usability | System Usability Scale (SUS) Score | ≥ 80 |

---

## 4. Scope

### 4.1 ✅ In Scope — Prototype v1.0

- [ ] Driver Dashboard with secure, time-limited QR code generation (JWT-signed payload, 5min TTL)
- [ ] Weekly Fuel Quota visualization (circular progress ring with danger state)
- [ ] Pump Operator scanning interface with dispensation form and hard quota ceiling validation
- [ ] Multi-step vehicle registration wizard (Personal → Vehicle → OTP)
- [ ] Ownership transfer workflow with document upload simulation
- [ ] Complaint management system (submission, tracking, status timeline)
- [ ] Admin panel: User search, quota management, vehicle verification
- [ ] Notification system: In-app, SMS (mocked), and Email alerts
- [ ] Trilingual UI support (Sinhala, Tamil, English)
- [ ] Visual Fuel Eligibility Calendar (color-coded)
- [ ] Security & Trust Centre (anti-scam messaging, PDPA notice)
- [ ] PWA configuration for offline QR code resilience

### 4.2 ❌ Out of Scope — v1.0

- Live integration with CPC's legacy backend databases
- Real SMS gateway integration (mock OTP only in prototype)
- Native iOS / Android builds (PWA only)
- Full production security hardening
- Payment processing of any kind
- GPS/Location-based fuel station routing

### 4.3 🅿️ Future Phases — Parking Lot

| Idea | Reason Deferred | Revisit |
|------|----------------|---------|
| Live QR scanning & backend validation | Requires CPC backend API access | Phase 2 |
| Real-time fuel station inventory map | Requires live station data feed | Phase 2 |
| Native mobile app (Flutter) | Out of scope for UX proposal | Phase 3 |
| IoT pump integration | Hardware dependency | Phase 3+ |

---

## 5. Stakeholders

### 5.1 Stakeholder Matrix

| Name / Role | Type | Interest | Influence | Engagement Strategy |
|-------------|------|----------|-----------|---------------------|
| Director Board — Petroleum Corp. | Primary — Client | High | High | Final demo recipient; approval authority |
| T2T Group D — Dev Team | Primary — Internal | High | High | Daily development and Sprint reviews |
| T2T Batch 4 — Course Leads | Sponsor | Medium | High | Assignment grading; feedback sessions |
| Sri Lankan Drivers | End Users (Phase 2) | High | Low | Represented via Personas & User Research |
| Fuel Station Operators | End Users (Phase 2) | High | Low | Represented via Personas & User Research |

---

## 6. Team & Roles

### 6.1 RACI Matrix

| Activity | Engineering Lead | Frontend Dev | UX Designer |
|----------|-----------------|--------------|-------------|
| Requirements & Scope | R/A | C | C |
| System Architecture | R/A | C | I |
| UI Component Development | C | R/A | C |
| UX Design & Prototyping | C | C | R/A |
| Documentation | R/A | C | C |
| Deployment (Vercel) | C | R/A | I |

*R = Responsible | A = Accountable | C = Consulted | I = Informed*

---

## 7. Deliverables

| # | Deliverable | Acceptance Criteria |
|---|------------|---------------------|
| D1 | This Project Charter | Reviewed and signed by Team Lead |
| D2 | Requirements Specification (`01_Requirements/`) | All user stories have defined Acceptance Criteria |
| D3 | UI/UX Design System (`03_UX-Guidelines/`) | Design passes WCAG AA accessibility check |
| D4 | System Architecture Doc (`02_Technical/`) | Reviewed by Engineering Lead |
| D5 | Hosted Next.js Prototype on Vercel | All In-Scope features are navigable and demonstrable |
| D6 | AI Thread Documentation | Submitted with project deliverables |

---

## 8. Timeline & Milestones

| # | Milestone | Target | Owner | Status |
|---|-----------|--------|-------|--------|
| M1 | Project charter & documentation complete | 2026-09-10 | Engineering Lead | 🔄 In Progress |
| M2 | Core design system established (`TASK-001`) | 2026-09-12 | Dev Team | ⬜ Not Started |
| M3 | Driver Dashboard & QR MVP (`US-001`) | 2026-09-14 | Dev Team | ⬜ Not Started |
| M4 | Operator Flow complete (`US-002`) | 2026-09-15 | Dev Team | ⬜ Not Started |
| M5 | Registration & Admin Panel complete | 2026-09-17 | Dev Team | ⬜ Not Started |
| M6 | Vercel deployment live | 2026-09-18 | Dev Team | ⬜ Not Started |
| M7 | Final presentation ready | 2026-09-19 | Engineering Lead | ⬜ Not Started |

*Status: ⬜ Not started | 🔄 In progress | ✅ Complete | ⚠️ Delayed | ❌ Blocked*

---

## 9. Risks & Mitigations

| # | Risk | Likelihood | Impact | Severity | Mitigation |
|---|------|------------|--------|----------|------------|
| R1 | QR screen unreadable in direct sunlight | High | High | 🔴 Critical | Force high brightness via Wake Lock API; use max-contrast color pairing (`#000` on `#FFF`) |
| R2 | Low-literacy users still struggle with redesigned UI | Medium | High | 🟠 High | Conduct guerrilla usability testing; iterate on font sizes and icon labels |
| R3 | PWA offline mode fails on older Android WebViews | Medium | Medium | 🟡 Medium | Implement Service Worker with graceful degradation; show clear offline notice |
| R4 | Scope creep before Director Board deadline | High | High | 🔴 Critical | Strictly enforce In Scope / Out of Scope; new ideas go to Parking Lot only |
| R5 | Mock data doesn't reflect real edge cases | Low | Medium | 🟡 Medium | Use realistic, diverse mock data with real Sri Lankan vehicle number formats |

---

## 10. Success Criteria

### 10.1 Minimum Viable Success (Must Have)
- [ ] Driver can view QR code within 2 seconds of opening the app
- [ ] Operator can complete a dispensation flow in ≤ 3 taps
- [ ] All text meets WCAG AA colour contrast ratio (4.5:1 minimum)
- [ ] App is installable as a PWA and loads offline

### 10.2 Full Success (Should Have)
- [ ] Trilingual support (SI/TA/EN) is functional
- [ ] Admin panel allows quota management and user verification
- [ ] SUS score ≥ 80 from a test group of ≥ 5 users

### 10.3 Excellence (Nice to Have)
- [ ] Director Board demo results in a formal proposal follow-up from CPC
- [ ] Lighthouse: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 90

---

## 11. Change Log

| Version | Date | Author | Change |
|---------|------|--------|--------|
| 1.0 | 2026-09-10 | T2T Group D | Initial charter |

---
*Document ID: NFP-001-CHARTER | Standard: T2T Enterprise Documentation v1.0*
