"use client";

import { Phone } from "lucide-react";
import Image from "next/image";

export default function FloatingButtons() {
  const phoneNumber = "+905555555555";
  const whatsappMessage = "Merhaba, transfer hizmeti hakkında bilgi almak istiyorum.";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">

      <a
        href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp ile iletişime geç"
        className="group relative flex items-center justify-end"
      >
        <span
          className="
            absolute right-16 whitespace-nowrap
            bg-charcoal text-white
            px-3 py-1.5 text-[11px] tracking-wider uppercase
            opacity-0 pointer-events-none
            translate-x-2
            transition-all duration-200
            group-hover:opacity-100 group-hover:translate-x-0
          "
        >
          WhatsApp
        </span>

        <div
          className="
            relative flex items-center justify-center
            w-14 h-14 rounded-full
            bg-[#25D366]
            shadow-lg shadow-black/30
            transition-all duration-300
            hover:scale-110 hover:shadow-xl hover:shadow-[#25D366]/20
          "
        >
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />

          <Image src="/WhatsApp.webp" alt="whatsapp" width={24} height={24} />
        </div>
      </a>

      <a
        href={`tel:${phoneNumber}`}
        aria-label="Telefon ile ara"
        className="group relative flex items-center justify-end"
      >
        <span
          className="
            absolute right-16 whitespace-nowrap
            bg-charcoal text-white
            px-3 py-1.5 text-[11px] tracking-wider uppercase
            opacity-0 pointer-events-none
            translate-x-2
            transition-all duration-200
            group-hover:opacity-100 group-hover:translate-x-0
          "
        >
          Bizi Arayın
        </span>

        <div
          className="
            relative flex items-center justify-center
            w-14 h-14 rounded-full
            bg-gold
            shadow-lg shadow-black/30
            transition-all duration-300
            hover:scale-110 hover:bg-gold-light hover:shadow-xl hover:shadow-gold/20
          "
        >
          <Phone size={22} className="text-charcoal" strokeWidth={2} />
        </div>
      </a>

    </div>
  );
}