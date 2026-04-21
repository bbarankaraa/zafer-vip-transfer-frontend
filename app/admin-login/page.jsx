"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { loginAdmin } from "@/api/appointment";
import { Loader2, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  try {
    const data = await loginAdmin(form.username, form.password);

    // localStorage'a kaydet (axios interceptor için)
    localStorage.setItem("admin_token", data.token);

    // Cookie'ye kaydet (middleware için)
    document.cookie = `admin_token=${data.token}; path=/; max-age=86400`;

    router.push("/admin");
  } catch (err) {
    setError("Kullanıcı adı veya şifre hatalı.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <Image
            src="/logo.png"
            alt="Zafer VIP Transfer"
            width={120}
            height={60}
            className="object-contain opacity-90 mb-4"
          />
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-gold/40" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-gold/60">
              Admin Panel
            </span>
            <div className="h-px w-8 bg-gold/40" />
          </div>
        </div>

        {/* Form */}
        <div className="border border-white/5 bg-[#0D0B08] p-8">
          {/* Gold top accent */}
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gold/50 to-transparent mb-8" />

          <h1 className="font-serif text-2xl font-light text-foreground mb-6 text-center">
            Giriş Yap
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Username */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] tracking-[0.3em] uppercase text-white/30">
                Kullanıcı Adı
              </label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
                autoComplete="username"
                className="w-full bg-white/5 border border-white/10 focus:border-gold/40 text-white text-sm placeholder:text-white/20 px-4 py-3 outline-none transition-colors duration-200"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] tracking-[0.3em] uppercase text-white/30">
                Şifre
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
                className="w-full bg-white/5 border border-white/10 focus:border-gold/40 text-white text-sm placeholder:text-white/20 px-4 py-3 outline-none transition-colors duration-200"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="border border-red-500/20 bg-red-500/5 px-4 py-3">
                <p className="text-xs text-red-400">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="group mt-2 w-full bg-gold text-charcoal hover:bg-gold-light disabled:opacity-50 py-3.5 text-xs tracking-[0.3em] uppercase font-medium transition-colors duration-300 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={13} className="animate-spin" />
                  Giriş Yapılıyor...
                </>
              ) : (
                <>
                  Giriş Yap
                  <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}