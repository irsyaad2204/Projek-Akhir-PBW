"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, User, Lock, ArrowRight, Package } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Username atau password salah.");
      setLoading(false);
      return;
    }

    // Ambil session untuk redirect sesuai role
    const sessionRes = await fetch("/api/auth/session");
    const session = await sessionRes.json();
    const role = session?.user?.role;

    const redirectMap: Record<string, string> = {
      SUPER_ADMIN: "/super-admin",
      ADMIN_RM: "/admin-rm",
      SUPERVISOR_PRODUKSI: "/supervisor-produksi",
      ADMIN_FG: "/admin-fg",
      MANAGER: "/manager",
    };

    router.push(redirectMap[role] || "/login");
  }

  return (
    <div className="min-h-screen flex">
      {/* ===== KIRI — Branding ===== */}
      <div className="hidden lg:flex lg:w-[55%] bg-[#0f1729] relative overflow-hidden flex-col justify-between p-12">
        {/* Decorative circles */}
        <div className="absolute top-[-80px] right-[-80px] w-[350px] h-[350px] rounded-full bg-[#1a2744] opacity-60" />
        <div className="absolute bottom-[-60px] left-[-60px] w-[280px] h-[280px] rounded-full bg-[#1a2744] opacity-40" />
        <div className="absolute top-[40%] right-[10%] w-[180px] h-[180px] rounded-full bg-[#1a2744] opacity-30" />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#E8A020] rounded-lg flex items-center justify-center">
            <Package className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-white font-bold text-lg">
              Cem<span className="text-[#E8A020]">Track</span>
            </span>
            <p className="text-gray-400 text-xs">
              Cement Warehouse Management · v1.0
            </p>
          </div>
        </div>

        {/* Hero text */}
        <div className="relative z-10">
          <h1 className="text-white text-4xl font-bold leading-tight mb-4">
            Kelola gudang lebih <span className="text-[#E8A020]">efisien</span>{" "}
            & <span className="text-[#E8A020]">terstruktur</span>
          </h1>
          <p className="text-gray-400 text-base leading-relaxed mb-10 max-w-md">
            Monitor stok, kelola transaksi, dan pantau alur barang dari Gudang
            RM hingga Finish Good dalam satu platform terintegrasi.
          </p>

          {/* Stats */}
          <div className="flex gap-10">
            <div>
              <p className="text-[#E8A020] text-3xl font-bold">3</p>
              <p className="text-gray-400 text-sm">Stage Tracking</p>
            </div>
            <div>
              <p className="text-[#E8A020] text-3xl font-bold">5</p>
              <p className="text-gray-400 text-sm">Role Akses</p>
            </div>
            <div>
              <p className="text-[#E8A020] text-3xl font-bold">∞</p>
              <p className="text-gray-400 text-sm">Transaksi</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10">
          <p className="text-gray-600 text-xs">
            © 2025 CemTrack · All rights reserved
          </p>
        </div>
      </div>

      {/* ===== KANAN — Form Login ===== */}
      <div className="w-full lg:w-[45%] bg-[#f5f5f5] flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-3 mb-8">
            <div className="w-9 h-9 bg-[#E8A020] rounded-lg flex items-center justify-center">
              <Package className="w-4 h-4 text-white" />
            </div>
            <span className="text-[#0f1729] font-bold text-lg">
              Cem<span className="text-[#E8A020]">Track</span>
            </span>
          </div>

          {/* Header */}
          <div className="mb-8">
            <span className="inline-block border border-[#E8A020] text-[#E8A020] text-xs font-semibold px-3 py-1 rounded mb-4 tracking-widest uppercase">
              Sistem Akses
            </span>
            <h2 className="text-[#0f1729] text-3xl font-bold mb-2">
              Masuk ke Dashboard
            </h2>
            <p className="text-gray-500 text-sm">
              Masukkan kredensial akun kamu
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Masukkan username"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#E8A020] focus:ring-1 focus:ring-[#E8A020] transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  required
                  className="w-full pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#E8A020] focus:ring-1 focus:ring-[#E8A020] transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0f1729] hover:bg-[#1a2744] text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                  Memproses...
                </span>
              ) : (
                <>
                  <span className="tracking-widest uppercase text-sm">
                    Masuk
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-gray-400 mt-6">
            Lupa password?{" "}
            <span className="font-semibold text-gray-600">
              Hubungi Administrator
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
