export type AdminStatus = "pending" | "active";

export type Admin = {
  id: number;
  name: string;
  phone: string;
  password: string;
  profileImage?: string;
  status: AdminStatus;
  isFixed: boolean; // এই admin কখনো remove করা যাবে না
  joined: string;
};