/**
 * Direct MongoDB auth - used when Express backend is unreachable
 * Register & login work without needing backend server on port 5000
 */

import mongoose from "mongoose";

let connected = false;

async function getConnection() {
  if (connected && mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI not set in .env");
  try {
    await mongoose.connect(uri, { maxPoolSize: 5, serverSelectionTimeoutMS: 10000 });
    connected = true;
    return mongoose.connection;
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Connection failed";
    throw new Error(`Database connection failed: ${msg}. Check MONGODB_URI in .env`);
  }
}

const ROLES = ["super_admin", "admin", "staff", "client"] as const;

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ROLES, default: "client" },
    status: { type: String, enum: ["pending", "approved"] },
    phone: { type: String, trim: true },
    isEmailVerified: { type: Boolean, default: true },
    emailVerificationToken: { type: String, select: false },
    emailVerificationExpires: { type: Date, select: false },
    otp: { type: String, select: false },
    otpExpires: { type: Date, select: false },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const bcrypt = await import("bcryptjs");
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.models?.User || mongoose.model("User", UserSchema);

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
  phone?: string;
}) {
  await getConnection();
  const existing = await User.findOne({ email: data.email.toLowerCase() });
  if (existing) {
    throw new Error("User with this email already exists");
  }
  const count = await User.countDocuments();
  const isFirstUser = count === 0;
  const otp = String(Math.floor(100000 + Math.random() * 900000));
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

  const user = await User.create({
    name: data.name.trim(),
    email: data.email.toLowerCase().trim(),
    password: data.password,
    phone: data.phone?.trim(),
    role: isFirstUser ? "super_admin" : "client",
    status: isFirstUser ? undefined : "pending",
    isEmailVerified: true,
    otp,
    otpExpires,
  });

  if (isFirstUser) {
    const jwt = await import("jsonwebtoken");
    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name, role: user.role, status: "approved" },
      process.env.JWT_SECRET || "fallback-secret",
      { expiresIn: process.env.JWT_EXPIRE || "7d" } as unknown as import("jsonwebtoken").SignOptions
    );
    return {
      success: true,
      message: "Registration successful! You are the main admin.",
      data: {
        user: { id: user._id, name: user.name, email: user.email, role: user.role, isEmailVerified: true },
        token,
      },
    };
  }

  return {
    success: true,
    message: "Thank you for signing up! Check your email for your verification OTP.",
    requiresVerification: true,
    data: {
      user: { id: user._id, name: user.name, email: user.email, role: user.role, status: "pending" },
      otpForEmail: otp,
    },
  };
}

export async function getMeFromToken(token: string) {
  const jwt = await import("jsonwebtoken");
  const secret = process.env.JWT_SECRET || "fallback-secret";
  const decoded = jwt.verify(token, secret) as {
    id: string;
    email: string;
    name?: string;
    role: string;
    status?: "pending" | "approved";
  };
  return {
    success: true,
    data: {
      id: decoded.id,
      email: decoded.email,
      name: decoded.name || decoded.email?.split("@")[0] || "User",
      role: decoded.role || "user",
      status: decoded.status ?? "approved",
    },
  };
}

/** Verify OTP for email (e.g. after signup). Clears OTP on success. */
export async function verifyOtpByEmailMongo(email: string, otp: string): Promise<boolean> {
  await getConnection();
  const user = await User.findOne({ email: email.toLowerCase() }).select("+otp +otpExpires");
  if (!user || !user.otp || !user.otpExpires) return false;
  if (String(user.otp) !== String(otp).trim()) return false;
  if (new Date(user.otpExpires) < new Date()) return false;
  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save();
  return true;
}

export async function loginUser(email: string, password: string) {
  await getConnection();
  const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
  if (!user) throw new Error("Invalid email or password");

  const bcrypt = await import("bcryptjs");
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid email or password");

  if (!user.isEmailVerified) {
    throw new Error("Please verify your email before logging in. Check your inbox for the verification link.");
  }

  const status = user.role === "client" ? (user.status ?? "pending") : "approved";
  const jwt = await import("jsonwebtoken");
  const token = jwt.sign(
    { id: user._id, email: user.email, name: user.name, role: user.role, status },
    process.env.JWT_SECRET || "fallback-secret",
    { expiresIn: process.env.JWT_EXPIRE || "7d" } as unknown as import("jsonwebtoken").SignOptions
  );

  return {
    success: true,
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status,
      },
      token,
    },
  };
}

export type UserStatus = "pending" | "approved";

export async function getUsersForAdminMongo(): Promise<
  { id: string; name: string; email: string; role: string; status?: UserStatus; createdAt: string }[]
> {
  await getConnection();
  const list = await User.find().sort({ createdAt: -1 }).lean();
  return list.map((u: { _id: unknown; name: string; email: string; role: string; status?: string; createdAt: Date }) => ({
    id: String(u._id),
    name: u.name,
    email: u.email,
    role: u.role,
    status: u.role === "client" ? (u.status as UserStatus | undefined) ?? "pending" : undefined,
    createdAt: u.createdAt ? new Date(u.createdAt).toISOString() : new Date().toISOString(),
  }));
}

export async function approveUserMongo(userId: string, adminId: string): Promise<boolean> {
  await getConnection();
  const user = await User.findById(userId);
  if (!user || user.role !== "client") return false;
  user.status = "approved";
  await user.save();
  return true;
}

export async function getStatusByIdMongo(userId: string): Promise<UserStatus | undefined> {
  await getConnection();
  const user = await User.findById(userId).select("role status").lean();
  if (!user || user.role !== "client") return undefined;
  return (user as { status?: UserStatus }).status ?? "pending";
}

export async function assignRoleMongo(userId: string, newRole: string, byUserId: string): Promise<{ ok: boolean; error?: string }> {
  const allowed = ["super_admin", "admin", "staff", "client"];
  if (!allowed.includes(newRole)) return { ok: false, error: "Invalid role" };
  await getConnection();
  const byUser = await User.findById(byUserId);
  if (!byUser || (byUser.role !== "super_admin" && byUser.role !== "admin")) return { ok: false, error: "Forbidden" };
  if (byUserId === userId) return { ok: false, error: "Cannot change your own role" };
  if (byUser.role === "admin" && newRole === "super_admin") return { ok: false, error: "Only super admin can assign super_admin" };
  const user = await User.findById(userId);
  if (!user) return { ok: false, error: "User not found" };
  user.role = newRole;
  if (newRole === "client") user.status = user.status ?? "pending";
  else user.status = undefined;
  await user.save();
  return { ok: true };
}
