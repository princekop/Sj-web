"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function AdminSettings() {
  return (
    <div>
      <h1 className="text-3xl font-light tracking-tight mb-8">Settings</h1>

      <div className="max-w-2xl space-y-6">
        <Card className="p-6 premium-shadow">
          <h2 className="text-xl font-light mb-4">Store Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Store Name</label>
              <Input type="text" placeholder="LUXE" defaultValue="LUXE" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Store Email</label>
              <Input type="email" placeholder="support@luxe.com" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Store Phone</label>
              <Input type="tel" placeholder="+1 (555) 000-0000" />
            </div>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Save Changes</Button>
          </div>
        </Card>

        <Card className="p-6 premium-shadow">
          <h2 className="text-xl font-light mb-4">Shipping Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Free Shipping Threshold</label>
              <Input type="number" placeholder="100" defaultValue="100" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Standard Shipping Cost</label>
              <Input type="number" placeholder="10" defaultValue="10" />
            </div>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Save Changes</Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
