import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-card/40 px-8 md:px-20 lg:px-32 py-24">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">

        {/* Brand */}
        <div>
          <Link href="/" className="inline-block mb-6">
            <Image
              src="/logo.png"
              alt="Zafer VIP Transfer"
              width={160}
              height={80}
              className="object-contain"
            />
          </Link>
          <p className="text-lg text-muted-foreground max-w-xs">
            İstanbul'un önde gelen özel transfer hizmeti. Her yolculukta lüks, güvenilirlik ve ayrıcalık.
          </p>

      
        </div>

        {/* Links */}
        <div>
          <h5 className="text-[10px] tracking-[0.4em] uppercase text-gold mb-8">
            Sayfalar
          </h5>
          <ul className="space-y-4">
            {[
              { label: "Ana Sayfa", href: "/" },
              { label: "Hakkımızda", href: "/about" },
              { label: "Rezervasyon", href: "/reservation" },
              { label: "İletişim", href: "/contact" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors tracking-wide"
                >
                  <span className="h-px w-0 bg-gold transition-all duration-300 group-hover:w-4" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h5 className="text-[10px] tracking-[0.4em] uppercase text-gold mb-8">
            İletişim
          </h5>
          <ul className="space-y-5">
            <li>
              <Link
                href="tel:+905555555555"
                className="flex items-start gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <Phone size={14} className="text-gold mt-0.5 shrink-0" />
                <span>+90 555 555 55 55</span>
              </Link>
            </li>
            <li>
              <Link
                href="mailto:info@zafervip.com"
                className="flex items-start gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <Mail size={14} className="text-gold mt-0.5 shrink-0" />
                <span>info@zafervip.com</span>
              </Link>
            </li>
            <li className="flex items-start gap-3 text-sm text-muted-foreground">
              <MapPin size={14} className="text-gold mt-0.5 shrink-0" />
              <span>İstanbul, Türkiye</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="container mx-auto mt-16 pt-8 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground tracking-wider">
          © {new Date().getFullYear()} Zafer VIP Transfer. Tüm hakları saklıdır.
        </p>
        <div className="flex items-center gap-3">
          <div className="h-px w-6 bg-gold/30" />
          <span className="text-[10px] tracking-[0.3em] uppercase text-gold/30">
            Premium Transfer
          </span>
          <div className="h-px w-6 bg-gold/30" />
        </div>
      </div>
    </footer>
  );
}