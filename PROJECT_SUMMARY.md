# Fraud Detection & Prevention System - Frontend

## 🚀 Project Overview
A futuristic, cybersecurity-themed fraud detection dashboard built with **React (Vite)**, **Tailwind CSS**, **React Router**, and **Recharts**.

## ✅ Completed Deliverables

### 1. **Mock Data Structure** (`src/mockData.js`)
Contains realistic dummy data for:
- **Transaction Data**: 7 days of successful vs blocked transactions
- **Fraud Alerts**: Email & SMS phishing/scam messages with severity levels
- **Velocity Transactions**: Rapid-fire transactions requiring approval
- **UPI Fraud Database**: Known fraudulent UPI IDs with risk scores
- **Bank Options**: HDFC, SBI, ICICI, Axis

### 2. **App.jsx** - Main Application
- React Router setup with two routes:
  - `/` - Onboarding page
  - `/dashboard` - Protected dashboard (requires login)

### 3. **Onboarding.jsx** - Landing Page
**Features:**
- Clean, centered card layout with gradient background
- Form validation for:
  - Full Name (required)
  - Mobile Number (exactly 10 digits)
  - Bank Name (dropdown selection)
- Saves user data to `localStorage`
- Navigates to dashboard on successful login
- Security-focused UI with Shield icon and encryption notice

### 4. **Dashboard.jsx** - Main Security Hub
A comprehensive dashboard with **4 distinct sections**:

#### **Section 1: Live Transaction Monitor** 📊
- **Recharts Bar Chart** showing 7-day transaction history
- Blue bars: Successful transactions
- Red bars: Blocked/Failed transactions
- Responsive design with tooltips and legend

#### **Section 2: Fraud Scanner** 🔍
- **UPI ID Scanner**: Text input to check UPI IDs against fraud database
- **QR Upload Zone**: Drag-and-drop area for QR code scanning (visual)
- **Risk Display**:
  - ✅ Green shield for safe UPIs
  - ⚠️ Red warning for fraudulent UPIs with risk score (0-100)
  - Shows number of user reports

#### **Section 3: Digital Sync Hub** 📧
- **Initial State**: "Sync with Email & SMS" button with loading animation
- **Synced State** (after 2-second delay):
  - Displays list of flagged alerts
  - Shows source (Email/SMS), sender, snippet, date
  - Color-coded severity badges:
    - 🟡 Suspicious (Amber)
    - 🔴 Malicious (Red)
  - Scrollable list with hover effects

#### **Section 4: Velocity Anomaly Control** ⚡
- **Table of Pending Approvals** with columns:
  - Sender UPI
  - Amount (₹)
  - Frequency (e.g., "5th tx in 10 mins")
  - Risk Level badge (Critical/High/Medium)
  - Action buttons (Accept ✓ / Reject ✗)
- **Interactive**: Clicking buttons removes row with toast notification
- Shows "No pending approvals" when empty

## 🎨 Design Features

### Color Palette (Cybersecurity Theme)
- **Background**: Clean white (#f8f9fa)
- **Cards**: Pure white with subtle shadows
- **Borders**: Soft gray (#e5e7eb)
- **Text**: Dark gray (#1f2937)
- **Success**: Green (#10b981)
- **Warning**: Amber (#f59e0b)
- **Danger**: Red (#ef4444)
- **Primary**: Blue (#3b82f6)

### UI Components
- Custom Tailwind classes: `.card`, `.btn`, `.input`, `.badge`
- Smooth transitions and hover effects
- Active scale animations on buttons
- Toast notifications for user feedback
- Responsive grid layout (mobile: stacked, desktop: 2-column)

### Icons (Lucide React)
- Shield, Lock, AlertTriangle, Check, X
- RefreshCw, Upload, Mail, MessageSquare
- Activity, LogOut, Scan

## 📱 Responsive Design
- **Mobile**: Single column layout, stacked sections
- **Desktop**: 2-column grid for optimal space usage
- Sticky header with user info and logout button

## 🔐 Security Features
- LocalStorage for user session persistence
- Protected routes (redirects to onboarding if not logged in)
- Form validation with error messages
- Logout functionality

## 🚀 How to Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at: **http://localhost:5173/**

## 📂 Project Structure
```
src/
├── components/
│   ├── Onboarding.jsx    # Landing page with login form
│   └── Dashboard.jsx     # Main dashboard with 4 sections
├── mockData.js           # All dummy data
├── App.jsx               # Router setup
├── main.jsx              # Entry point
└── index.css             # Tailwind + custom styles
```

## 🎯 Key Features Implemented
✅ Two-page navigation (Onboarding → Dashboard)  
✅ Form validation with real-time error display  
✅ LocalStorage persistence  
✅ Interactive transaction graph (Recharts)  
✅ UPI fraud scanner with risk scoring  
✅ Email/SMS sync with loading state  
✅ Velocity anomaly table with approve/reject actions  
✅ Toast notifications  
✅ Fully responsive design  
✅ Clean cybersecurity aesthetic  
✅ Lucide React icons throughout  

## 🔄 State Management
- `useState` for all interactive features:
  - Form inputs and validation
  - Scan results
  - Sync status
  - Velocity transaction list
  - Toast notifications
- `useEffect` for authentication check on dashboard mount

## 🎨 Animation & Interactivity
- Button active states (scale-95 on click)
- Loading spinner during sync
- Smooth transitions on all interactive elements
- Hover effects on cards and table rows
- Auto-dismissing toast notifications (3 seconds)

## 📊 Mock Data Highlights
- **7 days** of transaction data
- **6 fraud alerts** (mix of SMS/Email)
- **4 velocity transactions** requiring approval
- **4 UPI IDs** in fraud database (3 fraudulent, 1 safe)
- **4 bank options** for onboarding

---

**Status**: ✅ All deliverables completed and dev server running successfully!
