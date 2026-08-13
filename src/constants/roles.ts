export const ROLES = ["admin", "staff", "customer"] as const;
export type Role = (typeof ROLES)[number];
