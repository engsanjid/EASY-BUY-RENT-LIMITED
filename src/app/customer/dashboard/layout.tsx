// src/app/customer/dashboard/layout.tsx
"use client";

import Link from "next/link";
import { LogOut, User } from "lucide-react";

export default function CustomerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b bg-slate-950">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow-500">
              <span className="text-xs font-black text-black">EBR</span>
            </div>
            <span className="text-sm font-bold text-white">My Account</span>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-red-400"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">{children}</main>
    </div>
  );
}