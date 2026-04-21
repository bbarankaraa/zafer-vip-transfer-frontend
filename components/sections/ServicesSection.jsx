import Link from "next/link";
import { Plane, Building2, MapPin, Clock } from "lucide-react";

const services = [
  {
    icon: Plane,
    title: "Havalimanı Transferi",
    desc: "Sabiha Gökçen ve İstanbul Havalimanı. Karşılama, uçuş takibi ve zamanında teslimat garantisi.",
  },
  {
    icon: Building2,
    title: "Kurumsal Seyahat",
    desc: "İş insanları için yönetici transferleri. Gizlilik, konfor ve güvenilirlik.",
  },
  {
    icon: MapPin,
    title: "Şehir Turları",
    desc: "İstanbul'u özel lüks araçla keşfedin. Deneyimli şöförlerimizle unutulmaz bir tur.",
  },
  {
    icon: Clock,
    title: "Saatlik Kiralama",
    desc: "Premium aracı dilediğiniz süre emrinizde tutun — etkinlikler ve tam günlük ihtiyaçlar için idealdir.",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-28 px-8 md:px-20 lg:px-32 bg-[#F5F0E8]">
      <div className="container mx-auto">

        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-gold" />
              <span className="text-xs tracking-[0.4em] text-gold uppercase">
                Hizmetlerimiz
              </span>
            </div>
            <h2 className="font-serif text-5xl font-light text-charcoal leading-tight">
              Neler Sunuyoruz
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-charcoal/60">
            Her yolculuk titizlikle planlanır — güzergah belirlenmesinden varış anına kadar her detay düşünülür.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-charcoal/10">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={i}
                className="group relative flex flex-col gap-6 bg-[#F5F0E8] p-8 transition-all duration-500 hover:bg-white cursor-default"
              >
                {/* Gold top border on hover */}
                <div className="absolute top-0 left-0 h-0.5 w-0 bg-gold transition-all duration-500 group-hover:w-full" />

                <div className="flex h-16 w-16 items-center justify-center border rounded-full bg-white border-charcoal/20 group-hover:border-gold/50 transition-colors duration-300">
                  <Icon size={32} className="text-gold" />
                </div>

                <div>
                  <h3 className="font-serif text-xl font-light text-charcoal mb-3">
                    {s.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-charcoal/60">
                    {s.desc}
                  </p>
                </div>

                <div className="mt-auto">
                  <Link
                    href="/reservation"
                    className="text-sm bg-gold rounded-lg px-5 py-2 tracking-[0.3em] uppercase text-white transition-colors duration-300"
                  >
                    Rezervasyon →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}