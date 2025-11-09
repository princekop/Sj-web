"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"

const luxuriousPlans = [
  { name: "Miner Revo", ram: "4GB", cpu: "2 vCPUs", disk: "20GB NVMe", price: 100, subdomain: true, backups: "1", allocation: "1 Port" },
  { name: "Chinna X", ram: "6GB", cpu: "2 vCPUs", disk: "30GB NVMe", price: 150, subdomain: true, backups: "3", allocation: "2 Ports" },
  { name: "Parle Max", ram: "8GB", cpu: "4 vCPUs", disk: "40GB NVMe", price: 200, subdomain: true, backups: "3", allocation: "2 Ports" },
  { name: "Huka Pro", ram: "10GB", cpu: "4 vCPUs", disk: "60GB NVMe", price: 250, subdomain: true, backups: "3", allocation: "2 Ports" },
  { name: "Notty OP", ram: "12GB", cpu: "6 vCPUs", disk: "70GB NVMe", price: 300, subdomain: true, backups: "5", allocation: "3 Ports" },
  { name: "Dark Plus", ram: "14GB", cpu: "8 vCPUs", disk: "80GB NVMe", price: 350, subdomain: true, backups: "5", allocation: "4 Ports" },
  { name: "Darky Zone", ram: "16GB", cpu: "10 vCPUs", disk: "90GB NVMe", price: 400, subdomain: true, backups: "6", allocation: "8 Ports" },
  { name: "Dark Neo", ram: "20GB", cpu: "12 vCPUs", disk: "100GB NVMe", price: 500, subdomain: true, backups: "9", allocation: "12 Ports" },
  { name: "Lustnode V1", ram: "24GB", cpu: "14 vCPUs", disk: "120GB NVMe", price: 600, subdomain: true, backups: "10", allocation: "13 Ports" },
  { name: "Byte Elite", ram: "26GB", cpu: "16 vCPUs", disk: "140GB NVMe", price: 650, subdomain: true, backups: "10", allocation: "13 Ports" },
  { name: "Byte Ultra", ram: "30GB", cpu: "18 vCPUs", disk: "160GB NVMe", price: 750, subdomain: true, backups: "12", allocation: "15 Ports" },
  { name: "Byte Supreme", ram: "32GB", cpu: "20 vCPUs", disk: "200GB NVMe", price: 800, subdomain: true, backups: "16", allocation: "18 Ports" }
];

interface MinecraftPlansGridProps {
  limit?: number;
}

export default function MinecraftPlansGrid({ limit }: MinecraftPlansGridProps) {
  const plansToShow = limit ? luxuriousPlans.slice(0, limit) : luxuriousPlans;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
      {plansToShow.map((plan, index) => (
        <PlanCard key={index} plan={plan} />
      ))}
    </div>
  );
}

function PlanCard({ plan }: any) {
  const [isHovered, setIsHovered] = React.useState(false);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const handleAddToCart = () => {
    if (!user) {
      router.push('/auth/login?redirect=/');
      return;
    }
    const cartItem = {
      id: `minecraft-${plan.name.toLowerCase().replace(/\s+/g, '-')}`,
      name: `Minecraft Server - ${plan.name}`,
      price: plan.price,
      image: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=800&h=800&fit=crop',
      category: 'Minecraft Hosting',
      ram: plan.ram,
      cpu: plan.cpu,
      disk: plan.disk,
      allocation: plan.allocation,
      backups: plan.backups,
      subdomain: plan.subdomain
    };
    addToCart(cartItem);
  };

  const handleBuyNow = () => {
    if (!user) {
      router.push('/auth/login?redirect=/');
      return;
    }
    const cartItem = {
      id: `minecraft-${plan.name.toLowerCase().replace(/\s+/g, '-')}`,
      name: `Minecraft Server - ${plan.name}`,
      price: plan.price,
      image: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=800&h=800&fit=crop',
      category: 'Minecraft Hosting',
      ram: plan.ram,
      cpu: plan.cpu,
      disk: plan.disk,
      allocation: plan.allocation,
      backups: plan.backups,
      subdomain: plan.subdomain
    };
    addToCart(cartItem);
    router.push('/checkout');
  };

  return (
    <div
      className="relative cursor-pointer group w-full max-w-[220px] mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="relative bg-[#0a0a0a] rounded-xl overflow-hidden border-2 border-purple-500/30 hover:border-purple-500/60 transition-all duration-300 h-full"
        style={{
          boxShadow: isHovered ? '0 0 30px rgba(168, 85, 247, 0.4)' : '0px 0px 3px 1px rgba(0,0,0,0.53)'
        }}
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: 'rgba(168, 85, 247, 0.3)',
            width: '100px',
            height: '100px',
            filter: 'blur(60px)',
            zIndex: 0
          }}
        />

        <div className="relative z-10 p-5 text-white flex flex-col h-full">
          <h3 className="text-xl font-black text-center mb-2 text-white">
            {plan.name}
          </h3>

          <div className="text-center mb-4">
            <p className="text-3xl font-black text-purple-400" style={{ textShadow: '0 0 20px rgba(168, 85, 247, 0.8)' }}>
              ₹{plan.price}
            </p>
            <p className="text-xs text-gray-500 mt-1">/month</p>
          </div>

          <div className="space-y-2.5 text-sm mb-5">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">RAM:</span>
              <span className="font-bold text-white">{plan.ram}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">CPU:</span>
              <span className="font-bold text-white">{plan.cpu}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Storage:</span>
              <span className="font-bold text-white">{plan.disk}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Allocation:</span>
              <span className="font-bold text-white">{plan.allocation}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Backups:</span>
              <span className="font-bold text-white">{plan.backups}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Subdomain:</span>
              <span className="text-green-400 font-bold text-lg">✓</span>
            </div>
          </div>

          <div className="mt-auto space-y-2.5">
            <button 
              onClick={handleBuyNow}
              className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold rounded-lg transition-all hover:scale-105 active:scale-95"
            >
              BUY NOW
            </button>
            <button 
              onClick={handleAddToCart}
              className="w-full py-2.5 border-2 border-purple-500 hover:bg-purple-500/20 text-white text-sm font-semibold rounded-lg transition-all hover:scale-105 active:scale-95"
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
