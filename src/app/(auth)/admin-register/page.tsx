// src/app/(auth)/admin-register/page.tsx
"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { UserPlus, CheckCircle2, AlertCircle } from "lucide-react";

import { registerAdmin } from "@/lib/adminStore";

export default function AdminRegisterPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Password মিলছে না।");
      return;
    }

    if (password.length < 6) {
      setError("Password কমপক্ষে ৬ ক্যারেক্টার হতে হবে।");
      return;
    }

    const result = registerAdmin({ name, phone, password });

    if (!result.success) {
      setError(result.message);
      return;
    }

    setSuccess(true);
  }

  if (success) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center px-5 py-24">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>

          <h2 className="mt-5 text-2xl font-bold text-slate-900">Registration Submitted</h2>

          <p className="mt-2 text-gray-500">
            আপনার admin account এখন pending — একজন existing admin Settings থেকে approve করলেই login করতে পারবেন।
          </p>

          <Link
            href="/login"
            className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-yellow-500 py-3 font-semibold text-black transition hover:bg-yellow-400"
          >
            Back to Login
          </Link>
        </div>
      </main>
    );
  }

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
            <h2 className="text-3xl font-bold text-slate-900">Admin Registration</h2>
            <p className="text-gray-500 mt-2">
              Approval-এর পর login করতে পারবেন।
            </p>
          </div>

          {error && (
            <div className="mb-5 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-yellow-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+44 7XXXXXXXXX"
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-yellow-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-yellow-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-yellow-500"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-xl py-3.5 transition"
            >
              <UserPlus size={18} />
              Register
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already an admin?{" "}
            <Link href="/login" className="font-semibold text-yellow-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}