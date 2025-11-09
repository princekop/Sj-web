# 🚀 SJ Nodes Production Deployment Guide

## 📋 Pre-Deployment Checklist
- [x] Environment variables configured
- [x] Database schema synced
- [x] Auth system working
- [x] Payment verification with Discord webhook
- [x] Invoice generation working
- [x] All console.logs reviewed

## 🔧 VPS Deployment Steps

### 1. Initial Setup on VPS

```bash
# SSH into your VPS
ssh root@your-vps-ip

# Update system
apt update && apt upgrade -y

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Install PM2 globally
npm install -g pm2

# Install Nginx
apt install -y nginx

# Install Git
apt install -y git
```

### 2. Clone and Setup Project

```bash
# Navigate to web directory
cd /var/www

# Clone repository
git clone https://github.com/princekop/Sj-web.git sjnode
cd sjnode

# Install dependencies
npm install --legacy-peer-deps

# Setup environment
cp .env.production .env.local

# Generate Prisma Client
npx prisma generate

# Push database schema
npx prisma db push

# Build production
npm run build
```

### 3. Start with PM2

```bash
# Start the app with PM2
pm2 start npm --name "sjnode" -- start

# Save PM2 process list
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

### 4. Configure Nginx

```bash
# Create Nginx config
nano /etc/nginx/sites-available/sjnode.site
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name www.sjnode.site sjnode.site;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# Enable the site
ln -s /etc/nginx/sites-available/sjnode.site /etc/nginx/sites-enabled/

# Test Nginx config
nginx -t

# Restart Nginx
systemctl restart nginx
```

### 5. Setup SSL with Let's Encrypt

```bash
# Install Certbot
apt install -y certbot python3-certbot-nginx

# Get SSL certificate
certbot --nginx -d www.sjnode.site -d sjnode.site

# Auto-renewal is set up automatically
```

### 6. DNS Configuration

**Add these DNS records in your domain provider:**

```
Type    Name    Value              TTL
A       @       your-vps-ip        300
A       www     your-vps-ip        300
```

### 7. Firewall Setup

```bash
# Allow HTTP, HTTPS, and SSH
ufw allow 22
ufw allow 80
ufw allow 443
ufw enable
```

## 🔄 Deployment Commands (For Updates)

```bash
# SSH into VPS
ssh root@your-vps-ip

# Navigate to project
cd /var/www/sjnode

# Pull latest changes
git pull origin main

# Install any new dependencies
npm install --legacy-peer-deps

# Rebuild
npm run build

# Restart PM2
pm2 restart sjnode

# Check status
pm2 status
pm2 logs sjnode
```

## 📊 Monitoring Commands

```bash
# View logs
pm2 logs sjnode

# Monitor CPU/Memory
pm2 monit

# Check app status
pm2 status

# View Nginx logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

## 🐛 Troubleshooting

### App won't start
```bash
# Check PM2 logs
pm2 logs sjnode --lines 100

# Check if port 3000 is in use
netstat -tulpn | grep 3000

# Restart the app
pm2 restart sjnode
```

### Nginx errors
```bash
# Test config
nginx -t

# Check error logs
tail -f /var/log/nginx/error.log

# Restart Nginx
systemctl restart nginx
```

### Database issues
```bash
cd /var/www/sjnode
npx prisma db push
pm2 restart sjnode
```

## 🔒 Security Checklist

- [x] SSL certificate installed
- [x] Firewall configured
- [x] Environment variables secured
- [x] JWT secret changed
- [x] Database backups setup
- [ ] Regular system updates
- [ ] Monitor PM2 logs

## 📦 Backup Commands

```bash
# Backup database
cp /var/www/sjnode/prisma/prod.db /backups/prod-$(date +%Y%m%d).db

# Setup automated backups (crontab)
crontab -e

# Add daily backup at 2 AM
0 2 * * * cp /var/www/sjnode/prisma/prod.db /backups/prod-$(date +\%Y\%m\%d).db
```

## 🌐 URLs After Deployment

- **Production**: https://www.sjnode.site
- **Admin Panel**: https://www.sjnode.site/admin
- **Dashboard**: https://www.sjnode.site/dashboard

## 📞 Support

- Discord: https://discord.gg/25WFhNFMdX
- Free Hosting Dashboard: https://dash.sjnode.site

---
Made By Prince 👑
