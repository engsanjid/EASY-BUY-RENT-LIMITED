import { Admin, AdminStatus } from "@/types/Admin";

const STORAGE_KEY = "ebr_admins";

const fixedAdmin: Admin = {
  id: 1,
  name: "Administrator",
  phone: "01745532902",
  password: "12345678",
  status: "active",
  isFixed: true,
  joined: "01 Jan 2026",
};

function normalizePhone(phone: string) {
  return phone.replace(/\s+/g, "");
}

export function getAdmins(): Admin[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([fixedAdmin]));
    return [fixedAdmin];
  }

  try {
    return JSON.parse(raw) as Admin[];
  } catch {
    return [fixedAdmin];
  }
}

export function saveAdmins(admins: Admin[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(admins));
}

export function findAdminByPhone(phone: string): Admin | undefined {
  return getAdmins().find((a) => normalizePhone(a.phone) === normalizePhone(phone));
}

export function findAdminById(id: number): Admin | undefined {
  return getAdmins().find((a) => a.id === id);
}

export function registerAdmin(data: {
  name: string;
  phone: string;
  password: string;
}): { success: boolean; message: string } {
  const admins = getAdmins();

  const exists = admins.some(
    (a) => normalizePhone(a.phone) === normalizePhone(data.phone)
  );

  if (exists) {
    return { success: false, message: "এই ফোন নম্বর দিয়ে ইতিমধ্যে একটি admin account আছে।" };
  }

  const newAdmin: Admin = {
    id: admins.length ? Math.max(...admins.map((a) => a.id)) + 1 : 1,
    name: data.name,
    phone: data.phone,
    password: data.password,
    status: "pending",
    isFixed: false,
    joined: new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
  };

  saveAdmins([...admins, newAdmin]);
  return { success: true, message: "Registration submitted. একজন existing admin approve করলে login করতে পারবেন।" };
}

export function updateAdminStatus(id: number, status: AdminStatus) {
  const admins = getAdmins();
  saveAdmins(admins.map((a) => (a.id === id ? { ...a, status } : a)));
}

export function removeAdmin(id: number): { success: boolean; message: string } {
  const admins = getAdmins();
  const target = admins.find((a) => a.id === id);

  if (!target) return { success: false, message: "Admin not found." };
  if (target.isFixed) return { success: false, message: "এই admin remove করা যাবে না — এটা fixed/primary admin।" };

  saveAdmins(admins.filter((a) => a.id !== id));
  return { success: true, message: "Admin removed." };
}

export function updateAdminProfile(
  id: number,
  updates: Partial<Pick<Admin, "name" | "phone" | "profileImage" | "password">>
) {
  const admins = getAdmins();
  const updated = admins.map((a) => (a.id === id ? { ...a, ...updates } : a));
  saveAdmins(updated);
  return updated.find((a) => a.id === id);
}