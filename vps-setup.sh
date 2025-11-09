#!/bin/bash

echo "========================================="
echo "  SJ Nodes - VPS Setup Script"
echo "  Domain: www.sjnode.site"
echo "========================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
  echo "Please run as root (use sudo)"
  exit
fi

echo -e "${GREEN}[1/10] Updating system...${NC}"
apt update && apt upgrade -y

echo -e "${GREEN}[2/10] Installing Node.js 20.x...${NC}"
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

echo -e "${GREEN}[3/10] Installing PM2, Nginx, and Git...${NC}"
npm install -g pm2
apt install -y nginx git

echo -e "${GREEN}[4/10] Creating web directory...${NC}"
mkdir -p /var/www
cd /var/www

echo -e "${GREEN}[5/10] Cloning repository...${NC}"
if [ -d "sjnode" ]; then
    echo "Directory exists, pulling latest changes..."
    cd sjnode
    git pull origin main
else
    git clone https://github.com/princekop/Sj-web.git sjnode
    cd sjnode
fi

echo -e "${GREEN}[6/10] Installing dependencies...${NC}"
npm install --legacy-peer-deps

echo -e "${GREEN}[7/10] Setting up Prisma...${NC}"
cp .env.production .env.local
npx prisma generate
npx prisma db push

echo -e "${GREEN}[8/10] Building application...${NC}"
npm run build

echo -e "${GREEN}[9/10] Configuring PM2...${NC}"
pm2 delete sjnode 2>/dev/null || true
pm2 start npm --name "sjnode" -- start
pm2 save
pm2 startup

echo -e "${GREEN}[10/10] Configuring Nginx...${NC}"
cat > /etc/nginx/sites-available/sjnode.site << 'EOF'
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
EOF

ln -sf /etc/nginx/sites-available/sjnode.site /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl restart nginx

echo ""
echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}  Setup Complete!${NC}"
echo -e "${GREEN}=========================================${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Configure DNS A records:"
echo "   - @ → Your VPS IP"
echo "   - www → Your VPS IP"
echo ""
echo "2. Install SSL certificate:"
echo "   apt install -y certbot python3-certbot-nginx"
echo "   certbot --nginx -d www.sjnode.site -d sjnode.site"
echo ""
echo "3. Setup firewall:"
echo "   ufw allow 22"
echo "   ufw allow 80"
echo "   ufw allow 443"
echo "   ufw enable"
echo ""
echo "4. Check application status:"
echo "   pm2 status"
echo "   pm2 logs sjnode"
echo ""
echo -e "${GREEN}Site will be live at: http://www.sjnode.site${NC}"
echo ""
