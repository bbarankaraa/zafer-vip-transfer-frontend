import { Phone, Mail, MapPin, Clock } from "lucide-react";

const phoneNumber = "+905555555555";
const whatsappMessage = "Merhaba, transfer hizmeti hakkında bilgi almak istiyorum.";

const contactItems = [
  {
    icon: Phone,
    label: "Telefon",
    value: "+90 555 208 18 18",
    sub: "7/24 ulaşabilirsiniz",
    href: `tel:${phoneNumber}`,
    cta: "Hemen Ara",
  },
  {
    icon: Mail,
    label: "E-Posta",
    value: "minutari@gmail.com",
    sub: "En kısa sürede yanıt veririz",
    href: "mailto:minutari@gmail.com",
    cta: "Mail Gönder",
  },
  {
    icon: MapPin,
    label: "Adres",
    value: "İstanbul, Türkiye",
    sub: "Tüm İstanbul'a hizmet veriyoruz",
    href: null,
    cta: null,
  },
  {
    icon: Clock,
    label: "Çalışma Saatleri",
    value: "7/24 Açık",
    sub: "Haftanın 7 günü, 24 saat",
    href: null,
    cta: null,
  },
];

export default function ContactInfo() {
  return (
    <section className="py-28 px-8 md:px-20 lg:px-32">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

          {/* Left: contact cards */}
          <div className="flex flex-col gap-4">
            <div className="mb-4">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-gold" />
                <span className="text-xs tracking-[0.4em] text-gold uppercase">
                  İletişim Bilgileri
                </span>
              </div>
              <h2 className="font-serif text-4xl font-light text-foreground leading-tight">
                Sizinle Konuşmaktan<br />Memnuniyet Duyarız
              </h2>
            </div>

            {contactItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="group relative flex items-start gap-5 p-5 border border-border/40 hover:border-gold/30 bg-card/40 hover:bg-card transition-all duration-300"
                >
                  {/* Gold left accent */}
                  <div className="absolute left-0 top-0 h-full w-[2px] bg-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-border/60 group-hover:border-gold/40 transition-colors duration-300">
                    <Icon size={16} className="text-gold" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-1">
                      {item.label}
                    </p>
                    <p className="text-sm text-foreground font-medium">
                      {item.value}
                    </p>
                    <p className="text-xs text-muted-foreground/60 mt-0.5">
                      {item.sub}
                    </p>
                  </div>

                  {item.href && item.cta && (
                    <a
                      href={item.href}
                      className="shrink-0 text-[10px] tracking-[0.25em] uppercase text-gold/60 hover:text-gold transition-colors duration-300 self-center"
                    >
                      {item.cta} →
                    </a>
                  )}
                </div>
              );
            })}

            {/* WhatsApp button */}
            <a
              href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(
                whatsappMessage
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-2 flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white py-4 px-6 transition-colors duration-300"
            >
              <svg
                viewBox="0 0 24 24"
                fill="white"
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
              </svg>

              <span className="text-xs tracking-[0.3em] uppercase font-medium">
                WhatsApp ile Yazın
              </span>

              <span className="text-white/60 group-hover:translate-x-1 transition-transform duration-300 text-sm">
                →
              </span>
            </a>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-8">
            <div className="mb-2">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-gold" />
                <span className="text-xs tracking-[0.4em] text-gold uppercase">
                  Neden Biz?
                </span>
              </div>

              <h2 className="font-serif text-4xl font-light text-foreground leading-tight">
                Her Zaman<br />Yanınızdayız
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground max-w-sm">
                Rezervasyon, fiyat teklifi veya herhangi bir sorunuz için bize
                istediğiniz zaman ulaşabilirsiniz. Ekibimiz 7/24 hizmetinizdedir.
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-border/40" />
              <span className="text-gold font-serif">✦</span>
              <div className="h-px flex-1 bg-border/40" />
            </div>

            {/* Response badges */}
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-border/40 p-5 bg-card/40 text-center">
                <p className="font-serif text-3xl font-light text-gold">&lt; 1 dk</p>
                <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mt-2">
                  WhatsApp Yanıt
                </p>
              </div>

              <div className="border border-border/40 p-5 bg-card/40 text-center">
                <p className="font-serif text-3xl font-light text-gold">7/24</p>
                <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mt-2">
                  Telefon Desteği
                </p>
              </div>

              <div className="border border-border/40 p-5 bg-card/40 text-center">
                <p className="font-serif text-3xl font-light text-gold">&lt; 1 sa</p>
                <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mt-2">
                  Mail Yanıtı
                </p>
              </div>

              <div className="border border-border/40 p-5 bg-card/40 text-center">
                <p className="font-serif text-3xl font-light text-gold">TR/EN</p>
                <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mt-2">
                  Dil Desteği
                </p>
              </div>
            </div>

            <blockquote className="pl-6 border-l-2 border-gold/40">
              <p className="font-serif text-lg font-light italic text-foreground/70 leading-relaxed">
                "Bir mesajınız bizi harekete geçirmeye yeter."
              </p>
              <footer className="mt-2 text-[10px] tracking-[0.3em] uppercase text-gold/60">
                — Zafer VIP Transfer
              </footer>
            </blockquote>
          </div>

        </div>
      </div>
    </section>
  );
}