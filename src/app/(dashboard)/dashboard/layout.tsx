// src/app/(dashboard)/dashboard/layout.tsx
"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="flex flex-1 flex-col lg:pl-0">
        {/* Topbar */}
        <header className="flex h-16 items-center justify-between border-b bg-white px-6">
          <button
            onClick={() => setMobileOpen(true)}
            className="text-slate-600 lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="ml-auto flex items-center gap-3">
            <span className="text-sm font-medium text-slate-600">
              Admin
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow-500 text-sm font-bold text-slate-950">
              A
            </div>
          </div>
        </header>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}