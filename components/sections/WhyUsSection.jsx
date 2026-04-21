import { Shield, Star, PhoneCall, Car } from "lucide-react";

const reasons = [
  { icon: Shield, title: "Güvenli & Sigortalı", desc: "Tüm araçlarımız tam sigortalı. Lisanslı ve profesyonel şöförler." },
  { icon: Star, title: "Premium Filo", desc: "Mercedes, BMW ve Audi yönetici araçları en yüksek standartta bakımlı." },
  { icon: PhoneCall, title: "7/24 Destek", desc: "Ekibimiz yolculuğunuzdan önce, sırasında ve sonrasında her zaman ulaşılabilir." },
  { icon: Car, title: "Sabit Fiyat", desc: "Fiyat artışı yok. Gizli ücret yok. Aldığınız teklif ödediğiniz fiyattır." },
];

export default function WhyUsSection() {
  return (
    <section className="py-28 px-8 md:px-20 lg:px-32 bg-card/40">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Left: text */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-gold" />
              <span className="text-xs tracking-[0.4em] text-gold uppercase">
                Neden Zafer
              </span>
            </div>
            <h2 className="font-serif text-5xl font-light text-foreground leading-tight mb-6">
              Diğerlerinin<br />Ulaşmak İstediği Standart
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground max-w-sm">
              Sadece A'dan B'ye taşımıyoruz. Aradaki deneyimi özenle tasarlıyoruz — her detay düşünülmüş, her an size ait.
            </p>

            {/* Gold divider */}
            <div className="mt-10 flex items-center gap-4">
              <div className="h-px flex-1 bg-border/60" />
              <span className="text-gold text-lg font-serif">✦</span>
              <div className="h-px flex-1 bg-border/60" />
            </div>

            <blockquote className="mt-8 pl-6 border-l-2 border-gold/40">
              <p className="font-serif text-xl font-light italic text-foreground/70 leading-relaxed">
                "Dakiklik bizim için bir erdem değil — asgari standarttır."
              </p>
            </blockquote>
          </div>

          {/* Right: reasons grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {reasons.map((r, i) => {
              const Icon = r.icon;
              return (
                <div
                  key={i}
                  className="group p-6 border border-border/40 hover:border-gold/30 transition-all duration-400 bg-background/60"
                >
                  <Icon size={18} className="text-gold mb-4" />
                  <h4 className="font-serif text-lg font-light text-foreground mb-2">
                    {r.title}
                  </h4>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {r.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}