🚀 Fuel Pass Redesign - Functions & Setup
📋 REDESIGN FUNCTIONS
1. Ownership Transfer Workflow
Document upload (CR copy, insurance)
Override option with vehicle number + chassis number
Status tracking (Pending → Under Review → Approved)
2. Phone Number Update
Update phone number with OTP verification
SMS fallback: FUEL QR [Vehicle No] to xxx xxx xxxx
Balance check: FUEL BAL [Vehicle No] to xxx xxx xxxx
3. Complaint Management
Submit complaint with category selection
Auto-generated complaint ID
Status tracking (Pending → In Review → Resolved)
Status timeline with history
Resolution confirmation & reopen option
SMS/Email notifications on status change
4. Multi-Vehicle Management
Add multiple vehicles under one NIC
View all quotas in one dashboard
Set primary vehicle
Transfer vehicle ownership
Delete old vehicle records
5. Visual Eligibility Calendar
Color-coded calendar (Green = Eligible, Red = Not Eligible)
Today's status prominently displayed
Future eligibility look-ahead
Countdown to next eligible day
6. Security & Trust Center
Official website verification badge
Prominent URL display: https://fuelpass.gov.lk
SSL secure connection indicator
Scam warning banner
Report scam button
Security tips section
Data privacy notice (PDPA No. 9 of 2022)
7. Integrated Support Hub
One-tap WhatsApp integration (076 019 1919)
System status (Operational/Delays/Offline)
Announcement center
Trilingual FAQ (Sinhala, Tamil, English)
Complaint dashboard
8. Notification System
Complaint status updates (SMS, Email, In-App)
Registration progress updates
Ownership transfer updates
Quota change alerts
System status alerts
Announcement alerts
Notification bell with unread count
9. Admin Panel
User search (NIC, name, address, vehicle number)
User profile view
Quota management
Vehicle verification
Complaint dashboard
System reports
Announcement management
User management (enable/disable)
🚀 STEPS TO RUN
Step 1: Clone & Install
git clone https://github.com/your-username/national-fuel-pass-redesign.git
cd national-fuel-pass-redesign
npm install
Step 2: Run
npm run dev
Step 3: Open
http://localhost:3000

📝 Scripts
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
🚨 Troubleshooting
# Clear cache
Remove-Item -Path ".next" -Force -Recurse

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
Done! 🚀
