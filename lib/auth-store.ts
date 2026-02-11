/**
 * File-based auth fallback - works when MongoDB is unreachable (e.g. DNS/network issues)
 * Users stored in data/auth-users.json
 */

import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

const STORE_PATH = path.join(process.cwd(), "data", "auth-users.json");

export type UserStatus = "pending" | "approved";

export const ROLES = ["super_admin", "admin", "staff", "client"] as const;
export type StoredUserRole = (typeof ROLES)[number];

type StoredUser = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: string;
  status?: UserStatus; // only for role 'client'; others have full access
  phone?: string;
  isEmailVerified: boolean;
  createdAt: string;
  approvedAt?: string;
  approvedBy?: string;
  otp?: string;
  otpExpires?: string;
};

async function readStore(): Promise<StoredUser[]> {
  try {
    const data = await fs.readFile(STORE_PATH, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeStore(users: StoredUser[]) {
  await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
  await fs.writeFile(STORE_PATH, JSON.stringify(users, null, 2), "utf-8");
}

export async function registerUserFile(data: {
  name: string;
  email: string;
  password: string;
  phone?: string;
}) {
  const users = await readStore();
  const email = data.email.toLowerCase().trim();
  if (users.some((u) => u.email === email)) {
    throw new Error("User with this email already exists");
  }
  const bcrypt = await import("bcryptjs");
  const passwordHash = await bcrypt.hash(data.password, 10);
  // First user = super_admin; rest = client with pending approval
  const isFirstUser = users.length === 0;
  const otp = String(Math.floor(100000 + Math.random() * 900000));
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000).toISOString();

  const user: StoredUser = {
    id: crypto.randomUUID(),
    name: data.name.trim(),
    email,
    passwordHash,
    role: isFirstUser ? "super_admin" : "client",
    status: isFirstUser ? undefined : "pending",
    phone: data.phone?.trim(),
    isEmailVerified: true,
    createdAt: new Date().toISOString(),
    otp,
    otpExpires,
  };
  users.push(user);
  await writeStore(users);

  if (isFirstUser) {
    const jwt = await import("jsonwebtoken");
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name, role: user.role, status: "approved" },
      process.env.JWT_SECRET || "fallback-secret",
      { expiresIn: process.env.JWT_EXPIRE || "7d" } as Parameters<typeof jwt.sign>[2]
    );
    return {
      success: true,
      message: "Registration successful! You are the main admin.",
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          status: "approved",
          isEmailVerified: true,
        },
        token,
      },
    };
  }

  return {
    success: true,
    message: "Thank you for signing up! Check your email for your verification OTP.",
    requiresVerification: true,
    data: { user: { id: user.id, name: user.name, email: user.email, role: user.role, status: user.status ?? "pending" }, otpForEmail: otp },
  };
}

/** Verify OTP for email (e.g. after signup). Clears OTP on success. */
export async function verifyOtpByEmail(email: string, otp: string): Promise<boolean> {
  const users = await readStore();
  const idx = users.findIndex((u) => u.email === email.toLowerCase());
  if (idx === -1 || !users[idx].otp || !users[idx].otpExpires) return false;
  const u = users[idx];
  if (u.otp !== String(otp).trim()) return false;
  if (new Date(u.otpExpires!) < new Date()) return false;
  users[idx] = { ...u, otp: undefined, otpExpires: undefined };
  await writeStore(users);
  return true;
}

export async function loginUserFile(email: string, password: string) {
  const users = await readStore();
  const user = users.find((u) => u.email === email.toLowerCase());
  if (!user) throw new Error("Invalid email or password");

  const bcrypt = await import("bcryptjs");
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) throw new Error("Invalid email or password");

  const status = user.role !== "client" ? "approved" : (user.status ?? "approved");
  const jwt = await import("jsonwebtoken");
  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.name, role: user.role, status },
    process.env.JWT_SECRET || "fallback-secret",
    { expiresIn: process.env.JWT_EXPIRE || "7d" } as Parameters<typeof jwt.sign>[2]
  );

  return {
    success: true,
    data: {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status,
      },
      token,
    },
  };
}

/** List users for admin (no password). */
export async function getUsersForAdmin(): Promise<
  { id: string; name: string; email: string; role: string; status?: UserStatus; createdAt: string }[]
> {
  const users = await readStore();
  return users.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    status: u.role === "client" ? (u.status ?? "approved") : undefined,
    createdAt: u.createdAt,
  }));
}

/** Approve a user (admin only). */
export async function approveUser(userId: string, adminId: string): Promise<boolean> {
  const users = await readStore();
  const idx = users.findIndex((u) => u.id === userId);
  if (idx === -1 || users[idx].role !== "client") return false;
  users[idx].status = "approved";
  users[idx].approvedAt = new Date().toISOString();
  users[idx].approvedBy = adminId;
  await writeStore(users);
  return true;
}

/** Get current status for a user by id (for /me to return latest status after approval). */
export async function getStatusById(userId: string): Promise<UserStatus | undefined> {
  const users = await readStore();
  const u = users.find((x) => x.id === userId);
  if (!u || u.role !== "client") return undefined;
  return u.status ?? "approved"; // backward compat: no status = approved
}

/** Assign role (super_admin or admin only). Cannot change own role; super_admin can assign any, admin can assign staff/client. */
export async function assignRole(
  userId: string,
  newRole: string,
  byUserId: string
): Promise<{ ok: boolean; error?: string }> {
  const allowed = ["super_admin", "admin", "staff", "client"];
  if (!allowed.includes(newRole)) return { ok: false, error: "Invalid role" };
  const users = await readStore();
  const byIdx = users.findIndex((u) => u.id === byUserId);
  if (byIdx === -1) return { ok: false, error: "Not found" };
  const byRole = users[byIdx].role;
  if (byRole !== "super_admin" && byRole !== "admin") return { ok: false, error: "Forbidden" };
  if (byUserId === userId) return { ok: false, error: "Cannot change your own role" };
  if (byRole === "admin" && newRole === "super_admin") return { ok: false, error: "Only super admin can assign super_admin" };
  const idx = users.findIndex((u) => u.id === userId);
  if (idx === -1) return { ok: false, error: "User not found" };
  users[idx].role = newRole;
  if (newRole === "client") users[idx].status = users[idx].status ?? "pending";
  else users[idx].status = undefined;
  await writeStore(users);
  return { ok: true };
}
