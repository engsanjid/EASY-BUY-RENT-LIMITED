"use client";

import { useEffect, useState } from "react";
import {
  User,
  Save,
  CheckCircle2,
  ShieldCheck,
  Trash2,
  UserCheck,
  AlertCircle,
  Upload,
} from "lucide-react";

import { Admin } from "@/types/Admin";
import {
  getAdmins,
  updateAdminStatus,
  removeAdmin,
  updateAdminProfile,
} from "@/lib/adminStore";

export default function SettingsPage() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [currentAdminId, setCurrentAdminId] = useState<number | null>(null);

  const [profileName, setProfileName] = useState("");
  const [profilePhone, setProfilePhone] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const [currentPasswordInput, setCurrentPasswordInput] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [savedMsg, setSavedMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  function refresh() {
    setAdmins(getAdmins());
  }

  useEffect(() => {
    refresh();

    const stored = localStorage.getItem("ebr_user");
    if (stored) {
      const user = JSON.parse(stored);
      if (user.role === "admin") {
        setCurrentAdminId(user.id);
        const admin = getAdmins().find((a) => a.id === user.id);
        if (admin) {
          setProfileName(admin.name);
          setProfilePhone(admin.phone);
          setProfileImage(admin.profileImage ?? "");
        }
      }
    }
  }, []);

  const pendingAdmins = admins.filter((a) => a.status === "pending");
  const activeAdmins = admins.filter((a) => a.status === "active");

  function handleApprove(id: number) {
    updateAdminStatus(id, "active");
    refresh();
  }

  function handleReject(id: number) {
    removeAdmin(id);
    refresh();
  }

  function handleRemove(id: number) {
    const result = removeAdmin(id);
    if (!result.success) {
      setErrorMsg(result.message);
      setTimeout(() => setErrorMsg(""), 3000);
      return;
    }
    refresh();
  }

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrorMsg("Image size should be less than 2MB.");
        setTimeout(() => setErrorMsg(""), 3000);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  function handleProfileSave(e: React.FormEvent) {
    e.preventDefault();
    if (currentAdminId === null) return;

    const currentAdmin = admins.find((a) => a.id === currentAdminId);

    // Password validation logic
    if (newPassword || confirmPassword) {
      if (!currentPasswordInput) {
        setErrorMsg("Please enter your current password to change password.");
        setTimeout(() => setErrorMsg(""), 3000);
        return;
      }

      if (currentAdmin && currentAdmin.password !== currentPasswordInput) {
        setErrorMsg("Incorrect current password!");
        setTimeout(() => setErrorMsg(""), 3000);
        return;
      }

      if (newPassword !== confirmPassword) {
        setErrorMsg("New Password and Confirm Password do not match.");
        setTimeout(() => setErrorMsg(""), 3000);
        return;
      }
    }

    updateAdminProfile(currentAdminId, {
      name: profileName,
      phone: profilePhone,
      profileImage,
      ...(newPassword ? { password: newPassword } : {}),
    });

    // Sync with localStorage
    const stored = localStorage.getItem("ebr_user");
    if (stored) {
      const user = JSON.parse(stored);
      localStorage.setItem(
        "ebr_user",
        JSON.stringify({
          ...user,
          name: profileName,
          phone: profilePhone,
          profileImage,
        })
      );
    }

    setCurrentPasswordInput("");
    setNewPassword("");
    setConfirmPassword("");
    setSavedMsg("Profile updated successfully.");
    refresh();
    setTimeout(() => setSavedMsg(""), 2500);
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-950">Settings</h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage your personal profile and admin user access.
        </p>
      </div>

      {savedMsg && (
        <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
          <CheckCircle2 className="h-4 w-4" />
          {savedMsg}
        </div>
      )}

      {errorMsg && (
        <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          <AlertCircle className="h-4 w-4" />
          {errorMsg}
        </div>
      )}

      {/* Own Profile */}
      <form onSubmit={handleProfileSave} className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-xl bg-blue-50 p-2 text-blue-600">
            <User className="h-5 w-5" />
          </div>
          <h2 className="text-lg font-bold text-slate-950">My Profile</h2>
        </div>

        {/* Profile Image Preview & Upload Options */}
        <div className="mb-6 flex items-center gap-4">
          <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-yellow-500 bg-slate-100 shadow-inner">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center font-bold text-slate-400">
                No Img
              </div>
            )}
          </div>

          <div className="space-y-1">
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-slate-950 px-4 py-2 text-xs font-bold text-white transition hover:bg-slate-800">
              <Upload className="h-3.5 w-3.5" />
              Upload Photo
              <input
                type="file"
                accept="image/*"
                onChange={handleImageFileUpload}
                className="hidden"
              />
            </label>
            <p className="text-[11px] text-slate-400">
              Upload direct photo or paste direct image URL below
            </p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">Name</label>
            <input
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">Phone</label>
            <input
              value={profilePhone}
              onChange={(e) => setProfilePhone(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              Profile Image Direct URL (Optional)
            </label>
            <input
              value={profileImage}
              onChange={(e) => setProfileImage(e.target.value)}
              placeholder="https://example.com/photo.jpg"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
            />
          </div>

          {/* Password Security Section */}
          <div className="sm:col-span-2 border-t pt-4">
            <h3 className="text-sm font-bold text-slate-900 mb-3">Change Password</h3>
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              Current Password
            </label>
            <input
              type="password"
              value={currentPasswordInput}
              onChange={(e) => setCurrentPasswordInput(e.target.value)}
              placeholder="Enter current password to change password"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Leave blank to keep current"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 flex items-center gap-2 rounded-xl bg-yellow-500 px-6 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-yellow-400"
        >
          <Save className="h-4 w-4" />
          Save Profile
        </button>
      </form>

      {/* Pending Admin Approvals */}
      {pendingAdmins.length > 0 && (
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-xl bg-yellow-50 p-2 text-yellow-600">
              <UserCheck className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-950">Pending Admin Requests</h2>
          </div>

          <div className="divide-y">
            {pendingAdmins.map((a) => (
              <div key={a.id} className="flex items-center justify-between py-3">
                <div>
                  <p className="font-semibold text-slate-900">{a.name}</p>
                  <p className="text-sm text-slate-500">{a.phone}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleApprove(a.id)}
                    className="rounded-lg bg-green-600 px-4 py-2 text-xs font-bold text-white hover:bg-green-700"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(a.id)}
                    className="rounded-lg bg-red-600 px-4 py-2 text-xs font-bold text-white hover:bg-red-700"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Active Admins */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-xl bg-purple-50 p-2 text-purple-600">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h2 className="text-lg font-bold text-slate-950">Admin Users</h2>
        </div>

        <div className="divide-y">
          {activeAdmins.map((a) => (
            <div key={a.id} className="flex items-center justify-between py-3">
              <div>
                <p className="font-semibold text-slate-900">
                  {a.name} {a.isFixed && (
                    <span className="ml-2 rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-semibold text-yellow-700">
                      Primary
                    </span>
                  )}
                  {a.id === currentAdminId && (
                    <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
                      You
                    </span>
                  )}
                </p>
                <p className="text-sm text-slate-500">{a.phone}</p>
              </div>

              {!a.isFixed && a.id !== currentAdminId && (
                <button
                  onClick={() => handleRemove(a.id)}
                  className="flex items-center gap-1 rounded-lg p-2 text-red-500 hover:bg-red-50"
                  title="Remove admin"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}