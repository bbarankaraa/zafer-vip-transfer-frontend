"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_ITEMS } from "@/lib/constants";
import Image from "next/image";

const languages = [
  { code: "tr", label: "Türkçe", flag: "🇹🇷" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [activeLang, setActiveLang] = useState(languages[0]);

  const handleLangSelect = (lang) => {
    setActiveLang(lang);
    setLangOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
        <Image src={"/logo.png"} height={1000} width={1000} alt="Logo" className="h-12 w-12" /> 
          <div className="flex flex-col leading-tight">
            <span className="font-serif text-xl font-semibold tracking-widest text-foreground uppercase">
              Zafer
            </span>
            <span className="text-[10px] tracking-[0.3em] text-gold uppercase">
              VIP Transfer
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm tracking-wider text-muted-foreground hover:text-foreground transition-colors duration-200 uppercase"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right side: Language + CTA */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-2 px-3 py-2 text-xs tracking-wider text-muted-foreground hover:text-foreground transition-colors duration-200 border border-transparent hover:border-border/60 uppercase"
            >
              <Globe size={13} className="text-gold" />
              <span>{activeLang.flag}</span>
              <span>{activeLang.code.toUpperCase()}</span>
              <ChevronDown
                size={12}
                className={`transition-transform duration-300 ${langOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Dropdown menu */}
            {langOpen && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setLangOpen(false)}
                />
                <div className="absolute right-0 top-full mt-2 z-20 min-w-40 border border-border/60 bg-card shadow-xl shadow-black/40">
                  {/* Gold top accent */}
                  <div className="h-0.5 w-full bg-linear-to-r from-transparent via-gold to-transparent" />

                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLangSelect(lang)}
                      className={`flex w-full items-center gap-3 px-4 py-3 text-xs tracking-wider uppercase transition-colors duration-200 hover:bg-secondary/60 hover:text-foreground
                        ${
                          activeLang.code === lang.code
                            ? "text-gold bg-secondary/30"
                            : "text-muted-foreground"
                        }`}
                    >
                      <span className="text-sm">{lang.flag}</span>
                      <span>{lang.label}</span>
                      {activeLang.code === lang.code && (
                        <span className="ml-auto h-1 w-1 rounded-full bg-gold" />
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Book Now CTA */}
          <Button
            asChild
            className="bg-gold text-charcoal hover:bg-gold-light tracking-widest uppercase text-xs font-medium px-6"
          >
            <Link href="/reservation">Rezervasyon yap</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border/40 bg-background px-4 py-6 flex flex-col gap-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          {/* Mobile language picker */}
          <div className="pt-4 border-t border-border/40">
            <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-3">
              Language
            </p>
            <div className="grid grid-cols-2 gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setActiveLang(lang)}
                  className={`flex items-center gap-2 px-3 py-2 text-xs tracking-wider uppercase border transition-colors duration-200
                    ${
                      activeLang.code === lang.code
                        ? "border-gold/50 text-gold bg-secondary/30"
                        : "border-border/40 text-muted-foreground hover:border-border hover:text-foreground"
                    }`}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.label}</span>
                </button>
              ))}
            </div>
          </div>

          <Button
            asChild
            className="mt-2 bg-gold text-charcoal hover:bg-gold-light tracking-widest uppercase text-xs"
          >
            <Link href="/reservation" onClick={() => setMobileOpen(false)}>
              Book Now
            </Link>
          </Button>
        </div>
      )}
    </header>
  );
}
