// src/app/(auth)/login/page.tsx
"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogIn, Phone, ShieldCheck, User, AlertCircle, KeyRound } from "lucide-react";

import { findCustomerByPhoneAndUniqueId } from "@/lib/customerStore";
import { findAdminByPhone } from "@/lib/adminStore";

export default function LoginPage() {
  const router = useRouter();

  const [role, setRole] = useState<"customer" | "admin">("customer");

  const [phone, setPhone] = useState("");
  const [uniqueId, setUniqueId] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (role === "customer") {
        const customer = findCustomerByPhoneAndUniqueId(phone, uniqueId);

        if (!customer) {
          setError("ফোন নম্বর অথবা Unique ID ভুল। আবার চেষ্টা করুন।");
        } else if (customer.status === "inactive") {
          setError("আপনার account বর্তমানে inactive। Admin-এর সাথে যোগাযোগ করুন।");
        } else {
          localStorage.setItem(
            "ebr_user",
            JSON.stringify({
              id: customer.id,
              name: customer.name,
              phone: customer.phone,
              role: "customer",
            })
          );
          router.push("/customer/dashboard");
        }
      } else {
        const admin = findAdminByPhone(phone);

        if (!admin) {
          setError("এই ফোন নম্বরে কোনো admin account পাওয়া যায়নি।");
        } else if (admin.password !== password) {
          setError("ভুল password।");
        } else if (admin.status === "pending") {
          setError("আপনার admin account এখনো approve হয়নি। অন্য admin-কে বলুন Settings থেকে approve করতে।");
        } else {
          localStorage.setItem(
            "ebr_user",
            JSON.stringify({
              id: admin.id,
              name: admin.name,
              phone: admin.phone,
              role: "admin",
            })
          );
          router.push("/dashboard");
        }
      }

      setLoading(false);
    }, 500);
  };

  const inputClass =
    "w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-yellow-500";

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center px-5 py-24">
      <div className="w-full max-w-md">
        <Link href="/" className="flex justify-center items-center gap-3 mb-8">
          <div className="w-14 h-14 rounded-full bg-yellow-500 flex items-center justify-center">
            <span className="text-black font-black text-xl">EBR</span>
          </div>
          <div>
            <h1 className="text-white text-xl font-bold">EASY BUY & RENT</h1>
            <p className="text-yellow-500 text-xs tracking-[4px]">LIMITED</p>
          </div>
        </Link>

        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900">Welcome Back</h2>
            <p className="text-gray-500 mt-2">Login to continue</p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={() => {
                setRole("customer");
                setError("");
              }}
              className={`flex items-center justify-center gap-2 rounded-xl border p-3 transition ${
                role === "customer"
                  ? "border-yellow-500 bg-yellow-50 text-yellow-700"
                  : "border-gray-200 text-gray-600"
              }`}
            >
              <User size={18} />
              Customer
            </button>

            <button
              type="button"
              onClick={() => {
                setRole("admin");
                setError("");
              }}
              className={`flex items-center justify-center gap-2 rounded-xl border p-3 transition ${
                role === "admin"
                  ? "border-yellow-500 bg-yellow-50 text-yellow-700"
                  : "border-gray-200 text-gray-600"
              }`}
            >
              <ShieldCheck size={18} />
              Admin
            </button>
          </div>

          {error && (
            <div className="mb-5 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+44 7XXXXXXXXX"
                  required
                  className={`${inputClass} pl-11`}
                />
              </div>
            </div>

            {role === "customer" ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unique ID
                </label>
                <div className="relative">
                  <KeyRound size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={uniqueId}
                    onChange={(e) => setUniqueId(e.target.value)}
                    placeholder="e.g. EBR-0001"
                    required
                    className={`${inputClass} pl-11`}
                  />
                </div>
                <p className="mt-1.5 text-xs text-gray-400">
                  এই ID admin আপনাকে account তৈরির সময় দিয়েছে।
                </p>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  className={inputClass}
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-xl py-3.5 transition disabled:opacity-60"
            >
              <LogIn size={18} />
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {role === "admin" && (
            <p className="text-center text-sm text-gray-500 mt-6">
              New admin?{" "}
              <Link href="/admin-register" className="font-semibold text-yellow-600 hover:underline">
                Register here
              </Link>
            </p>
          )}

          {role === "customer" && (
            <p className="text-center text-xs text-gray-400 mt-6">
              Customer account admin দ্বারা তৈরি হয় — নিজে register করার সুযোগ নেই।
            </p>
          )}
        </div>
      </div>
    </main>
  );
}