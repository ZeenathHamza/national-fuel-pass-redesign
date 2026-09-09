# National Fuel Pass System - Redesign Proposal & UX Case Study

## 1. Project Overview & Objective

The goal of this project is to **redesign and develop a proposal prototype** of the National Fuel Pass system to present to the Director Board of the Petroleum Corporation.

This documentation serves to clearly identify the end-to-end UX process, user roles, detailed requirements, and aesthetic standards required for an industry-level product. A critical factor in this redesign is the **technological literacy of Sri Lankan drivers** and the constraints of operating mobile devices in outdoor, bright environments (fuel stations).

---

## 2. Target Audience & User Personas

To build an effective system, we must identify all users involved in the ecosystem.

### 2.1. The Driver (Vehicle Owner)
* **Demographics:** Ranges from Tuk-Tuk drivers to corporate car owners.
* **Tech Literacy:** Low to Medium. Many users are not digital natives and struggle with complex UI.
* **Core Needs:** Quick access to the QR code, immediate visibility of the remaining weekly fuel quota, finding nearby stations with available fuel.
* **Pain Points:** Hard-to-read text, confusing navigation, slow app performance, language barriers.

### 2.2. Fuel Station Pump Operator
* **Demographics:** Fuel station employees.
* **Tech Literacy:** Low to Medium.
* **Core Needs:** Extremely fast scanning process to reduce queues, clear visibility of approved quota, minimal steps to complete a transaction.
* **Pain Points:** Glare on mobile screens, slow scanning systems, complex data entry.

### 2.3. Fuel Station Manager
* **Demographics:** Station owners or authorized managers.
* **Tech Literacy:** Medium to High.
* **Core Needs:** Managing fuel inventory, tracking daily dispensing, monitoring operator performance.

### 2.4. System Administrator (Petroleum Corporation)
* **Demographics:** Government IT personnel and analysts.
* **Tech Literacy:** High.
* **Core Needs:** National-level dashboards, managing allocations, modifying weekly limits, system monitoring.

---

## 3. Design System & Aesthetics (UI Guidelines)

Given the environment (outdoor fuel stations) and the user base, the design must be **highly practical yet aesthetically premium**.

* **Color Palette:**
  * **Primary Colors:** Deep Navy Blue (Trust, Official, Petroleum branding) and Crisp White (Clarity).
  * **Accent Color:** Vibrant Yellow / Orange (Represents energy, fuel, and draws attention to primary actions).
  * **Status Colors:** High-contrast Green (Success, Quota Available) and Red (Error, Quota Empty).
* **Typography:**
  * **Font Family:** Clean, legible sans-serif (e.g., *Inter* or *Roboto*).
  * **Sizing:** Large typography is crucial. Numbers (like remaining quota and vehicle numbers) must be readable from an arm's length under bright sunlight.
* **UI Components & Styling:**
  * **High Contrast & Brightness:** The UI must maintain high contrast. When the QR code is displayed, the app should ideally maximize screen brightness.
  * **Large Touch Targets:** Buttons and interactive elements must be large enough for users with low tech literacy or those operating with one hand.
  * **Visual Feedback (Micro-interactions):** Smooth transitions, clear loading states (spinners/skeletons), and haptic feedback on successful scans.
  * **Language Support:** A prominent, easy-to-use language switcher (Sinhala, Tamil, English) is mandatory. Icons should be universally understood (e.g., Gas Pump, QR Code).

---

## 4. User Stories & Acceptance Criteria

### Epic 1: Driver Dashboard & QR Generation

**User Story 1.1:** As a Driver, I want my QR code to be the first thing I see when I open the app, so that I can show it to the pump operator without delay.
* **Acceptance Criteria:**
  * [ ] The QR code is displayed on the main dashboard immediately after successful login.
  * [ ] The QR code area is large and central.
  * [ ] The screen brightness automatically increases (if supported by platform) while on this view.

**User Story 1.2:** As a Driver, I want to clearly see my remaining fuel quota and the reset date, so I can plan my week.
* **Acceptance Criteria:**
  * [ ] A prominent visual indicator (e.g., a circular progress bar) shows `Used Quota` vs. `Remaining Quota`.
  * [ ] The remaining amount is displayed in a large, bold font.
  * [ ] The exact date and time of the next quota reset is displayed below the quota.

### Epic 2: Fuel Dispensing (Pump Operator Flow)

**User Story 2.1:** As a Pump Operator, I want to quickly scan a driver's QR code, so that I can serve customers faster.
* **Acceptance Criteria:**
  * [ ] The "Scan QR" button is the primary action on the Operator dashboard.
  * [ ] The camera opens instantly with a clear scanning overlay.
  * [ ] Upon successful scan, a confirmation beep/haptic feedback occurs.

**User Story 2.2:** As a Pump Operator, I want the system to tell me exactly how much fuel I can dispense after scanning, to prevent over-issuing.
* **Acceptance Criteria:**
  * [ ] After scanning, the screen displays the Vehicle Number, Fuel Type, and Maximum Allowed Quota in large text.
  * [ ] The input field for "Amount to Dispense" restricts input to be $\le$ the remaining quota.
  * [ ] A large "Confirm" button submits the transaction, followed by a clear Success Screen.

### Epic 3: Vehicle Registration & Onboarding

**User Story 3.1:** As a New User, I want the registration process to be simple and guided, so that I don't make mistakes.
* **Acceptance Criteria:**
  * [ ] Registration is broken down into a step-by-step wizard (Personal Details $\rightarrow$ Vehicle Details $\rightarrow$ OTP Verification).
  * [ ] Form fields have clear, non-technical labels.
  * [ ] Real-time validation is applied (e.g., checking if the vehicle number format is valid).
  * [ ] Error messages are displayed in plain language, explaining exactly how to fix the issue.

---

## 5. Non-Functional Requirements & Industry Standards

1. **Performance:** The application must load the dashboard within 2 seconds on a 3G network.
2. **Offline Resilience:** The QR code should remain accessible (cached) even if the driver temporarily loses internet connection at the fuel station.
3. **Security:** End-to-end encryption for all API calls. QR codes should rotate or contain signed payloads to prevent screenshot sharing abuse.
4. **Accessibility (a11y):** The application must be navigable using screen readers, and color contrast must meet WCAG AA standards.
5. **Analytics & Logging:** Proper tracking of errors and user drop-offs during registration to continuously improve the UX.

---

## 6. Project Deliverables Checklist

To fulfill the expectations of a modern UX Engineer presenting to a Director Board:

- [ ] **This UX Case Study & Requirements Document** (To demonstrate process and user understanding).
- [ ] **Figma / Design Files** (High-fidelity prototypes showing the visual aesthetics and flows).
- [ ] **AI Threads & Research Documentation** (Links to AI chats used for ideation and problem-solving).
- [ ] **Hosted React/Next.js Application** (A functional prototype deployed on Vercel showcasing the redesign in action).

---
*Prepared for the Petroleum Corporation - Director Board Presentation.*
