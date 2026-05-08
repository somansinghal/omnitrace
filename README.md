
# 📦 OmniTrace — Smart Inventory & QR Tracking Platform

<div align="center">

![OmniTrace](https://img.shields.io/badge/OmniTrace-v3.0-6366F1?style=for-the-badge)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

**Track every item. Verify every scan.**  
A modern, real-time inventory tracking platform built with Firebase and vanilla JavaScript.

[Live Demo](https://omnitrace.app/demo) · [Documentation](https://omnitrace.app/docs) · [Request Access](https://omnitrace.app/signup)

</div>

---

## ✨ What is OmniTrace?

OmniTrace gives every product a unique QR identity. Scan to verify, track movement, and monitor inventory in real-time — from warehouses to retail shelves.

**Currently in Private Beta** — we're onboarding early adopters who care about solving real inventory problems.

---

## 🚀 Core Features

| Feature | Description |
|---------|-------------|
| 📱 **QR Code Identity** | Auto-generated unique QR codes for every item. Scan to instantly verify. |
| 📦 **Smart Inventory** | Track items, categories, quantities, and locations in one workspace. |
| ⚡ **Real-time Sync** | Every scan and update syncs instantly across all devices via Firebase Firestore. |
| 📊 **Live Dashboard** | KPI cards, scan activity charts, and activity feeds — all with real data. |
| 🔐 **Secure Auth** | Email/Password, Google, and GitHub authentication with role-based access. |
| 👥 **Workspaces** | Multi-user workspaces with owner, admin, and member roles. |
| 💳 **Razorpay Payments** | Secure plan upgrades with order verification and subscription lifecycle. |
| 🎟️ **Coupon System** | Admin-controlled discount codes with usage limits and expiry. |
| 🔑 **API Access** | Generate API keys (Pro plan) for programmatic access to your inventory. |
| 🌙 **Dark Mode** | Light, Dark, and System theme with preference detection. |

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | HTML5 · CSS3 · Vanilla JavaScript (ES Modules) |
| **Styling** | Custom CSS · Glassmorphism · CSS Variables · Scroll Reveal |
| **Database** | Firebase Firestore (real-time, onSnapshot) |
| **Auth** | Firebase Authentication (Email, Google, GitHub) |
| **Payments** | Razorpay Checkout API |
| **Email** | EmailJS |
| **Deployment** | Vercel / Netlify / Firebase Hosting |

---

## 📁 Project Structure

```
omnitrace/
├── index.html                    # SPA root shell
├── README.md                     # This file
├── vercel.json / firebase.json   # Deployment configs
│
├── assets/
│   ├── css/                      # Global · Components · Animations
│   │   ├── global.css
│   │   ├── components.css
│   │   └── animations.css
│   └── js/
│       ├── store.js              # Global state management
│       ├── router.js             # SPA router (28 dynamic routes)
│       └── layout.js             # Layout manager + preload gating
│
├── config/
│   └── pricing.js                # Single source of truth for plans
│
├── services/
│   ├── firebase.js               # Firebase Auth · Firestore · Storage
│   ├── omnidb.js                 # Database CRUD · Real-time subs
│   ├── payments.js               # Razorpay integration
│   ├── coupons.js                # Coupon validation + admin
│   ├── analytics.js              # Admin dashboard metrics
│   ├── apikeys.js                # API key management
│   └── email.js                  # EmailJS contact form
│
├── components/
│   ├── ui.js                     # Skeleton loaders · Error boundaries
│   ├── header.js                 # Responsive header with theme toggle
│   ├── sidebar.js                # Mobile drawer sidebar
│   ├── footer.js                 # 5-column premium footer
│   └── globalsearch.js           # Cmd+K search overlay
│
└── pages/
    ├── home.js                   # Landing page
    ├── features.js               # Feature showcase
    ├── pricing.js                # Plans · Coupons · Razorpay
    ├── about.js                  # Company story
    ├── team.js                   # Team members
    ├── careers.js                # Job listings
    ├── blog.js                   # Blog articles
    ├── contact.js                # Contact form
    ├── docs.js                   # Documentation
    ├── help.js                   # FAQ + search
    ├── legal.js                  # Privacy · Terms · Cookies · Security
    ├── demo.js                   # Public demo workspace
    ├── login.js · signup.js      # Authentication
    ├── forgot.js                 # Password reset
    ├── onboarding.js             # 4-step setup wizard
    ├── dashboard.js              # Real-time KPI dashboard
    ├── workspace.js              # Item CRUD + search/filter
    ├── scan.js                   # QR scanner
    ├── profile.js                # User settings
    ├── billing.js                # Subscription + invoices
    ├── admin.js                  # Admin panel (analytics + coupons)
    ├── api.js                    # API key management
    └── notifications.js          # Activity-based notifications
```

---

## 🚀 Getting Started

### Prerequisites

- [Firebase](https://firebase.google.com/) project with Firestore and Authentication enabled
- [Razorpay](https://razorpay.com/) account (for payments)
- A local dev server (e.g., `npx serve .`, VS Code Live Server)

### Quick Setup (2 minutes)

```bash
# 1. Clone
git clone https://github.com/somansinghal/omnitrace
cd omnitrace

# 2. Configure Firebase
# Edit services/firebase.js — replace the config block:
#   apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId

# 3. Start dev server
npx serve .

# 4. Open http://localhost:3000
```

### Firebase Setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com/)
2. Enable **Firestore Database** (start in production mode)
3. Enable **Authentication** → Email/Password, Google, GitHub providers
4. Copy your Firebase config from Project Settings → Web App
5. Paste into `services/firebase.js`

### Firestore Collections

| Collection | Purpose |
|-----------|---------|
| `users/{uid}` | User profiles, plans, roles |
| `workspaces/{id}` | Multi-tenant workspaces with members + roles |
| `items/{id}` | Items with QR codes, scan counts, tags |
| `scans/{id}` | Individual scan events |
| `payments/{id}` | Razorpay transaction records |
| `coupons/{id}` | Discount codes with usage tracking |
| `activities/{id}` | User activity log |
| `stats/global` | Platform-wide aggregated stats |

### Security Rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == uid;
    }
    match /workspaces/{wsId} {
      allow read: if request.auth != null && request.auth.uid in resource.data.members;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && resource.data.ownerId == request.auth.uid;
    }
    match /items/{itemId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update: if request.auth != null;
      allow delete: if request.auth != null;
    }
  }
}
```

---

## 📦 Deployment

### Vercel (recommended)
```bash
npm i -g vercel
vercel --prod
```

### Netlify
```bash
netlify deploy --prod --dir=.
```

### Firebase Hosting
```bash
firebase init hosting
firebase deploy
```

SPA rewrites are pre-configured in `vercel.json`, `_redirects`, and `firebase.json`.

---

## 🔮 Roadmap

- [x] Core inventory CRUD with Firestore
- [x] QR code generation and scanning
- [x] Real-time dashboard with live updates
- [x] Multi-workspace support
- [x] Razorpay subscription payments
- [x] Coupon/discount system
- [x] Admin analytics panel
- [x] Public demo mode
- [ ] Mobile app (React Native)
- [ ] Bulk CSV import/export
- [ ] Webhook integrations
- [ ] Team invite system
- [ ] Advanced reporting engine

---

## 🤝 Contributing

We welcome contributions from the community. This is an early-stage product — there's lots to build.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📧 Contact

- **Email:** help.omnitrace@gmail.com
- **Twitter/X:** [@omnitrace](https://x.com/omnitrace)
- **LinkedIn:** [OmniTrace](https://linkedin.com/company/omnitrace)

---

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

<div align="center">

**Built with ❤️ by the OmniTrace Team**  
*Tracking every item. Verifying every scan.* 🚀

</div>
