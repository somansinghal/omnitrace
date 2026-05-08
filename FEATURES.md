# 🛡️ OmniTrace — Stripe-Level Admin Control Panel

## ✅ Complete Admin System (10 Modules)

All admin routes are protected by `role === 'admin'` check at the page level.

---

### 📊 1. Admin Dashboard (`/admin`)
**MRR · ARR · Active Subs · Revenue Charts**
- 💰 Monthly Recurring Revenue (MRR) calculated from active subscriptions
- 📈 Annualized Revenue Run Rate (ARR = MRR × 12)
- 👥 Total users, workspaces, products, scans
- 💎 Active subscriptions with conversion rate %
- 📉 6-month revenue bar chart with hover tooltips
- 📊 Plan breakdown with animated progress bars (Free/Starter/Pro/Enterprise)
- 📋 Real-time recent platform activity feed
- ⏰ Weekly new user count

### 👥 2. User Management (`/admin/users`)
**Full CRUD on every user account**
- View all users in searchable, filterable table
- Search by name / email / plan
- Filter by plan (Free / Starter / Pro / Enterprise)
- 💎 Change user plan (any tier)
- ⏸️ Suspend with reason
- ▶️ Unsuspend
- 🛡️ Promote to admin
- ⚒️ Demote from admin
- 🗑️ Delete user (with confirmation)
- Status badges (Active / Suspended)
- Avatar + initials per user

### 🏢 3. Workspace Management (`/admin/workspaces`)
**Multi-tenant workspace control**
- View all workspaces
- See member count, product count, scan count per workspace
- Plan badge per workspace
- 🗑️ Delete workspace with confirmation
- Created date tracking

### 💎 4. Subscriptions (`/admin/subscriptions`)
**Full subscription lifecycle visibility**
- MRR card
- Active subscription count + conversion rate
- ⏰ Expiring soon (within 7 days) — flagged for retention
- ❌ Expired subscriptions — needs attention
- Active subs table with: plan, billing cycle, start date, renewal date, days left
- Color-coded "days left" badges (warning if ≤7)

### 💳 5. Payment Monitoring (`/admin/payments`)
**Razorpay transaction tracking**
- Total payments, success rate %, failed count, pending
- Total revenue from successful payments
- Recent transactions table (100 most recent)
- Per-payment: date, plan, amount, status, billing cycle, coupon used, Razorpay payment ID
- Status badges (Success / Failed / Pending)

### 🎟️ 6. Coupon System (`/admin/coupons`)
**Discount code management**
- Create coupons with: code, discount %, usage limit, expiry
- View all coupons in table
- Live usage tracking (X / Y format)
- Toggle active/inactive (⏸️ / ▶️)
- Delete with confirmation
- Auto-uppercase coupon codes

### 📈 7. Analytics (`/admin/analytics`)
**Growth charts and trends**
- 30-day user growth bar chart
- 6-month revenue trend
- New users this week
- Total products, total scans
- All charts with hover tooltips showing exact values

### 📋 8. Activity Log (`/admin/activity`)
**Complete audit trail**
- Tabbed interface: User Activity / Admin Actions
- User actions: created, updated, deleted, scanned
- Admin actions: plan changes, suspensions, deletions, role changes, feature toggles
- Per-log: action badge, details, timestamp, admin email (for admin logs)
- Auto-logged on every admin action via `logAdminAction()`

### 🚩 9. Feature Flags (`/admin/features`)
**Real-time feature toggles**
- 9 toggleable flags stored in `system/featureFlags`:
  - User Signups
  - Google Authentication
  - GitHub Authentication
  - QR Scanner
  - API Access
  - Coupon System
  - Email Notifications
  - Public Demo
  - ⚠️ Maintenance Mode
- Each toggle hits Firestore immediately
- Animated switch UI
- Description per flag

### ⚡ 10. System Health (`/admin/system`)
**Platform monitoring dashboard**
- Service status pills (Operational / Degraded / Down) for:
  - Firestore Database
  - Authentication
  - File Storage
  - Razorpay
  - EmailJS
- Live latency measurement (Firestore tested via real query)
- Uptime metric
- Error count (last 24h)
- Last check timestamp
- Recent error logs with stack traces and context
- Refresh button

---

## 🏗️ Architecture

### Service Layer (`services/admin.js`)
```javascript
Admin.getDashboardMetrics()        // MRR, ARR, conversions
Admin.getRevenueChart(months)      // Time-series revenue
Admin.getUserGrowthChart(days)     // User signup trends
Admin.getAllUsers()                // List + search
Admin.updateUserPlan(uid, plan)    // Plan changes
Admin.suspendUser(uid, reason)     // Suspension with audit
Admin.unsuspendUser(uid)           // Reactivation
Admin.deleteUser(uid)              // Hard delete
Admin.setUserRole(uid, role)       // Admin promotion
Admin.getAllWorkspaces()           // Workspace list
Admin.deleteWorkspace(id)          // Workspace cleanup
Admin.getAllPayments(limit)        // Transaction history
Admin.getPaymentStats()            // Success/failure rates
Admin.logAdminAction(...)          // Audit logging
Admin.getAdminLogs(limit)          // Audit trail
Admin.getRecentActivity(limit)     // Platform-wide activity
Admin.getFeatureFlags()            // Feature toggles
Admin.updateFeatureFlag(key, on)   // Toggle features
Admin.getSystemHealth()            // Service status check
Admin.logError(err, context)       // Error reporting
Admin.getErrorLogs(limit)          // Error history
```

### Layout Component (`components/adminlayout.js`)
- Desktop: 240px left sidebar + content area
- Mobile: Horizontal scrolling tab bar at top
- Sticky positioning on desktop
- Responsive grid layout
- "Back to App" link

### Routes (`assets/js/router.js`)
```
/admin                  → Dashboard
/admin/users            → User Management
/admin/workspaces       → Workspaces
/admin/subscriptions    → Subscriptions
/admin/payments         → Payments
/admin/coupons          → Coupons
/admin/analytics        → Analytics
/admin/activity         → Activity Log
/admin/features         → Feature Flags
/admin/system           → System Health
```

All routes are `protected: true` and gated by role check inside `pages/admin.js`.

---

## 🔒 Security

### Access Control
```javascript
// Page-level guard
if (Store.get('user')?.role !== 'admin') {
  return '<div>Access Denied</div>';
}
```

### Audit Logging
Every admin action is logged to `adminLogs` collection with:
- Admin user ID
- Admin email
- Action type
- Target user/resource ID
- Details
- Server timestamp

### How to Make a User Admin
In Firebase Console, edit the user's document in `users/{uid}`:
```javascript
{ role: 'admin' }
```
Or use an existing admin to promote via UI: `/admin/users` → 🛡️ button.

---

## 🎨 UI Highlights

- **Mobile-responsive:** Sidebar becomes horizontal scroll tabs on mobile
- **Real-time data:** All metrics pulled from Firestore on each visit
- **Skeleton loading:** Every section shows skeleton before data arrives
- **Error boundaries:** Failed loads show retry UI
- **Animated counters:** KPI cards with smooth transitions
- **Hover tooltips:** Bar charts show exact values on hover
- **Status pills:** Color-coded health indicators
- **Toggle switches:** iOS-style flag toggles
- **Confirmation dialogs:** All destructive actions require confirmation
- **Toast notifications:** Success/error feedback for every action

---

## 📦 Firestore Collections Used

| Collection | Purpose |
|-----------|---------|
| `users` | User profiles, plans, roles, suspension status |
| `workspaces` | Multi-tenant workspaces with member arrays |
| `products` | Products linked to workspaces |
| `scans` | Individual scan events |
| `payments` | Razorpay payment records |
| `coupons` | Discount codes with usage tracking |
| `activities` | User-generated platform activity |
| `adminLogs` | Admin action audit trail |
| `errorLogs` | Application error tracking |
| `system/featureFlags` | Real-time feature toggles |
| `system/health` | Platform health checks |

---

## 🚀 Result

A **Stripe-level admin control panel** with:
- ✅ Real-time MRR, ARR, conversion tracking
- ✅ Full user lifecycle management
- ✅ Workspace administration
- ✅ Subscription monitoring with expiry tracking
- ✅ Payment transaction history
- ✅ Coupon management
- ✅ Growth analytics with charts
- ✅ Complete audit trail
- ✅ Feature flag system
- ✅ Health monitoring
- ✅ Mobile-responsive design
- ✅ Skeleton loading + error handling
- ✅ Role-based access control

Built for scale. Ready for investors. 🎯
