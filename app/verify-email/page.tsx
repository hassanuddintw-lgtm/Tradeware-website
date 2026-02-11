"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { KeyRound, ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";
import { routes } from "@/config/routes";
import { api } from "@/lib/api-client";

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const e = searchParams.get("email") ?? (typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("email") : null);
    if (e) setEmail(decodeURIComponent(e));
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("This page is for verifying after signup. Please use the link you got after signing up.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      await api<{ success: boolean }>("/api/auth/verify-otp", {
        method: "POST",
        body: JSON.stringify({ email: email.trim(), otp: otp.trim() }),
      });
      setSuccess(true);
      setTimeout(() => {
        router.push(`${routes.login}?verified=1`);
        router.refresh();
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid or expired OTP. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-dark-950 to-dark-900 py-16 pt-20 flex items-center">
        <div className="container-custom max-w-md mx-auto text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="card p-8"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Email verified</h1>
            <p className="text-gray-400">Redirecting you to sign in…</p>
            <div className="w-10 h-10 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mt-4" />
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-950 to-dark-900 py-16 pt-20 flex items-center">
      <div className="container-custom">
        <div className="max-w-md mx-auto">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-500/20 mb-4">
              <KeyRound className="h-8 w-8 text-cyan-500" />
            </div>
            <h1 className="text-4xl font-black text-white mb-2">Verify your email</h1>
            <p className="text-gray-400">Enter the 6-digit code we sent to your email</p>
          </motion.div>

          <motion.div
            className="card p-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                  {error}
                </div>
              )}
              {!email && (
                <p className="text-sm text-gray-400 text-center">
                  This page is for verifying after signup. If you just signed up, you were redirected here with your email. Otherwise{" "}
                  <Link href={routes.login} className="text-cyan-500 hover:text-cyan-400">sign in</Link>.
                </p>
              )}
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wider">
                  6-digit code
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    placeholder="Enter 6-digit code"
                    required
                    disabled={!email}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 disabled:opacity-60"
                  />
                </div>
                {email && (
                  <p className="text-xs text-gray-500 mt-1.5">We sent a code to {email}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={submitting || !email}
                className="btn-primary w-full inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? "Verifying…" : "Verify & continue"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </motion.div>

          <p className="text-center mt-6 text-gray-400 text-sm">
            Already verified?{" "}
            <Link href={routes.login} className="text-cyan-500 hover:text-cyan-400 font-semibold">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-dark-950"><div className="animate-pulse text-gray-400">Loading...</div></div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}
