"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: "📊" },
  { label: "Rezervasyonlar", href: "/admin/rezervasyonlar", icon: "📋" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    document.cookie = "admin_token=; path=/; max-age=0";
    router.push("/admin-login");
  };

  const NavLinks = ({ onClose }) => (
    <>
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className={`group relative flex items-center gap-3 px-4 py-3 text-sm tracking-wide transition-all duration-200 ${
              isActive
                ? "text-gold bg-gold/10 border border-gold/20"
                : "text-white/40 hover:text-white/80 hover:bg-white/5 border border-transparent"
            }`}
          >
            {isActive && (
              <div className="absolute left-0 top-0 h-full w-0.5 bg-gold" />
            )}
            <span className="text-base">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </>
  );

  return (
    <>
      {/* ── DESKTOP SIDEBAR ── */}
      <aside className="hidden md:flex flex-col w-64 min-h-screen border-r border-white/5 bg-[#0D0B08]">
        {/* Logo */}
        <div className="flex flex-col items-center justify-center py-8 px-6 border-b border-white/5">
          <Image
            src="/logo.png"
            alt="Zafer VIP Transfer"
            width={120}
            height={60}
            className="object-contain opacity-90"
          />
          <span className="text-[10px] tracking-[0.3em] text-gold/60 uppercase mt-3">
            Admin Panel
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-6 flex flex-col gap-1">
          <NavLinks onClose={() => {}} />
        </nav>

        {/* Bottom */}
        <div className="px-4 py-6 border-t border-white/5 flex flex-col gap-2">
          <div className="flex items-center gap-3 px-4 py-3 text-sm text-white/20 tracking-wide">
            <div className="h-2 w-2 rounded-full bg-green-400" />
            <span>Sistem Aktif</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-sm text-white/30 hover:text-red-400 transition-colors duration-200 w-full text-left"
          >
            <span>🚪</span>
            <span>Çıkış Yap</span>
          </button>
        </div>
      </aside>

      {/* ── MOBILE TOPBAR ── */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-[#0D0B08] border-b border-white/5">
        {/* Logo */}
        <Image
          src="/logo.png"
          alt="Zafer VIP Transfer"
          width={80}
          height={40}
          className="object-contain opacity-90"
        />

        {/* Hamburger */}
        <button
          onClick={() => setMobileOpen(true)}
          className="flex flex-col gap-1.5 p-2"
          aria-label="Menüyü aç"
        >
          <span className="block h-px w-6 bg-gold/60" />
          <span className="block h-px w-4 bg-gold/40" />
          <span className="block h-px w-6 bg-gold/60" />
        </button>
      </div>

      {/* ── MOBILE DRAWER OVERLAY ── */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── MOBILE DRAWER ── */}
      <div
        className={`md:hidden fixed top-0 left-0 h-full w-72 z-50 bg-[#0D0B08] border-r border-white/5 flex flex-col transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
          <div className="flex flex-col">
            <Image
              src="/logo.png"
              alt="Zafer VIP Transfer"
              width={100}
              height={50}
              className="object-contain opacity-90"
            />
            <span className="text-[10px] tracking-[0.3em] text-gold/60 uppercase mt-2">
              Admin Panel
            </span>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="text-white/30 hover:text-white/80 transition-colors p-1"
            aria-label="Menüyü kapat"
          >
            ✕
          </button>
        </div>

        {/* Drawer nav */}
        <nav className="flex-1 px-4 py-6 flex flex-col gap-1">
          <NavLinks onClose={() => setMobileOpen(false)} />
        </nav>

        {/* Drawer bottom */}
        <div className="px-4 py-6 border-t border-white/5 flex flex-col gap-2">
          <div className="flex items-center gap-3 px-4 py-3 text-sm text-white/20 tracking-wide">
            <div className="h-2 w-2 rounded-full bg-green-400" />
            <span>Sistem Aktif</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-sm text-white/30 hover:text-red-400 transition-colors duration-200 w-full text-left"
          >
            <span>🚪</span>
            <span>Çıkış Yap</span>
          </button>
        </div>
      </div>

      {/* Mobile için padding — content kaymasın */}
      <div className="md:hidden h-[57px]" />
    </>
  );
}