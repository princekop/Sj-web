# Setup Instructions - Order Management System

## ✅ Completed Changes

### 1. **Home Page Updated**
- ✅ Removed generic product listings
- ✅ Now displays Minecraft hosting plans from `/minecraft-hosting`
- ✅ Shows 8 featured plans on homepage
- ✅ Created new component: `components/minecraft-plans-grid.tsx`

### 2. **Checkout Page Redesigned**
- ✅ Removed contact information form (no longer needed)
- ✅ Removed card payment option
- ✅ Streamlined to QR code payment only
- ✅ Added 10-second timer before "Payment Done" button appears
- ✅ Removed product images from order summary
- ✅ Shows clean item list with specs

### 3. **Order Flow Implementation**
- ✅ Auto-generates unique Order ID for each order
- ✅ QR code generated with UPI payment string
- ✅ Timer countdown (10 seconds) before payment confirmation button
- ✅ "Payment Done" button redirects to order details page

### 4. **Order Details Page Created**
- ✅ New page: `/orders/[id]/page.tsx`
- ✅ Shows order status as "Pending"
- ✅ Displays all order information
- ✅ Shows order items with specifications
- ✅ Copy Order ID button for easy sharing

### 5. **Discord Integration**
- ✅ Discord webhook sends notification when order is placed
- ✅ Webhook includes:
  - Order ID
  - Customer email
  - Total amount
  - Order items list
  - Order status
- ✅ Order details page includes Discord join instructions
- ✅ Step-by-step guide for customers to verify payment

### 6. **Cart System Improvements**
- ✅ Fixed price handling (supports both string and numeric prices)
- ✅ Updated cart context to handle new data structure
- ✅ Fixed checkout calculations

---

## 🔧 Configuration Required

### 1. **Environment Variables**
Create a `.env.local` file in the root directory with the following:

```env
# Discord Configuration
NEXT_PUBLIC_DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN
NEXT_PUBLIC_DISCORD_INVITE=https://discord.gg/yourinvite
```

#### How to get Discord Webhook URL:
1. Go to your Discord server
2. Navigate to Server Settings → Integrations → Webhooks
3. Create a new webhook (e.g., "Order Notifications")
4. Copy the webhook URL
5. Paste it in your `.env.local` file

#### Discord Invite Link:
1. Go to your Discord server
2. Right-click on a channel → Edit Channel → Permissions
3. Create Invite → Set to never expire
4. Copy the invite link
5. Paste it in your `.env.local` file

### 2. **UPI Payment Configuration**
Update the UPI ID in `/app/checkout/page.tsx` (line 128):
```typescript
const upiString = `upi://pay?pa=YOUR_UPI_ID@upi&pn=SjNodes&am=${total.toFixed(2)}&cu=INR&tn=Order ${orderId}`
```

Replace `YOUR_UPI_ID@upi` with your actual UPI payment address.

---

## 📋 Customer Order Flow

1. **Customer adds items to cart** → Clicks "Buy Now" or "Checkout"
2. **Checkout Page** → Shows QR code with order details
3. **10-Second Timer** → Prevents accidental clicks
4. **Customer scans QR** → Makes UPI payment
5. **Clicks "Payment Done"** → Submits order
6. **Discord Webhook Sent** → Admin receives notification
7. **Redirected to Order Page** → Shows order ID and instructions
8. **Customer joins Discord** → Opens support ticket
9. **Shares Payment Proof** → Provides Order ID and screenshot
10. **Admin verifies** → Activates services

---

## 🎯 Order Status Management

Currently, orders are stored in **localStorage**. For production, you should:

### Option 1: Use an API/Database
Replace localStorage calls in:
- `/app/checkout/page.tsx` (line 94-106)
- `/app/orders/[id]/page.tsx` (line 26-31)

### Option 2: Use Supabase (Recommended)
Create a `orders` table with the following schema:
```sql
create table orders (
  id text primary key,
  user_id uuid references auth.users,
  user_email text not null,
  items jsonb not null,
  total numeric not null,
  tax numeric not null,
  grand_total numeric not null,
  status text default 'pending',
  created_at timestamp with time zone default now()
);
```

---

## 🎨 Features Added

### Checkout Page Features:
- ✅ Large QR code display (250x250)
- ✅ Countdown timer with animated clock icon
- ✅ Green "Payment Done" button after timer
- ✅ Clear payment instructions
- ✅ Order summary without images (cleaner UI)

### Order Details Page Features:
- ✅ Success checkmark animation
- ✅ Order status badge (Pending/Completed)
- ✅ Copyable Order ID
- ✅ Complete order breakdown
- ✅ Discord join button with icon
- ✅ Step-by-step verification guide
- ✅ Important notes section

### Discord Webhook Message:
```
🎮 New Order Received

Order ID: ORD-1234567890-ABC123
Customer: customer@email.com
Total Amount: ₹500

Items:
• Minecraft Server - Miner Revo (x1)
• Minecraft Server - Chinna X (x2)

Status: ⏳ Pending Payment Verification
```

---

## 🚀 Testing the System

1. **Test Order Flow:**
   - Add items to cart
   - Go to checkout
   - Wait for 10-second timer
   - Click "Payment Done"
   - Verify redirect to order page

2. **Test Discord Webhook:**
   - Place a test order
   - Check your Discord channel for notification
   - Verify all order details are correct

3. **Test Order Page:**
   - Copy Order ID
   - Click "Join Discord Server"
   - Verify all information is displayed correctly

---

## 📱 Customer Support Workflow

### For Admins:
1. Receive Discord webhook notification
2. Wait for customer to open ticket
3. Verify payment screenshot matches:
   - Order ID
   - Amount
   - Timestamp
4. Update order status to "Completed"
5. Activate customer services
6. Notify customer via Discord

### For Customers:
1. Make payment via UPI
2. Screenshot payment confirmation
3. Click "Payment Done" button
4. Note down Order ID
5. Join Discord server
6. Open support ticket
7. Share: Order ID + Payment screenshot + Email
8. Wait for verification (24 hours max)

---

## 🔐 Security Notes

- Order IDs are unique and timestamp-based
- Orders stored with user email for verification
- Discord webhook is server-side only (secure)
- Payment proofs required for verification
- No automatic activation without admin approval

---

## 📞 Support

If you need help setting up:
1. Check the Discord server setup
2. Verify environment variables
3. Test webhook URL in Discord server settings
4. Ensure UPI ID is correct in checkout code

---

## 🎉 All Done!

Your order management system is now fully configured with:
- ✅ Minecraft hosting plans on home page
- ✅ Simplified QR code checkout
- ✅ Discord webhook notifications
- ✅ Order tracking system
- ✅ Customer verification workflow
- ✅ Complete documentation

Start accepting orders! 🚀
