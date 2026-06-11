'use client'

import { AppSidebar } from '@/components/layout'
import { FilePlus, LayoutDashboard, Package, Settings } from 'lucide-react'

// Define navigation items based on the PROJECT_MANIFEST.md and Feature Cards
const navItems = [
  { icon: <FilePlus size={16} />, label: 'New Request', href: '/dashboard/returns-intake' },
  { icon: <LayoutDashboard size={16} />, label: 'Triage Dashboard', href: '/dashboard/triage-dashboard' },
  { icon: <Package size={16} />, label: 'Action Packs', href: '/dashboard/action-packs' },
  { icon: <Settings size={16} />, label: 'Settings', href: '/dashboard/settings' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-zinc-50">
      <AppSidebar items={navItems} projectName="Returns Triage Desk" />
      <div className="flex-1 ml-64 flex flex-col min-h-full">
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}