import { Shield, Clock, Star, Heart, Globe, Award } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Güvenlik",
    desc: "Tüm araçlarımız düzenli bakımdan geçer. Sürücülerimiz lisanslı ve deneyimlidir.",
  },
  {
    icon: Clock,
    title: "Dakiklik",
    desc: "Zamanında olmak bizim için bir taahhüttür. Gecikmeler kabul edilemez.",
  },
  {
    icon: Star,
    title: "Mükemmellik",
    desc: "Her detayda en yüksek standardı hedefliyoruz. Sıradan hiçbir şey sunmuyoruz.",
  },
  {
    icon: Heart,
    title: "Özen",
    desc: "Müşterilerimize gösterdiğimiz özen, bizi rakiplerimizden ayıran en önemli unsurdur.",
  },
  {
    icon: Globe,
    title: "Çok Dilli Hizmet",
    desc: "Türkçe, İngilizce, Arapça ve Almanca dillerinde hizmet sunuyoruz.",
  },
  {
    icon: Award,
    title: "Deneyim",
    desc: "10 yılı aşkın sektör deneyimimizle İstanbul transferlerinde referans noktasıyız.",
  },
];

export default function AboutValues() {
  return (
    <section className="py-28 px-8 md:px-20 lg:px-32 bg-[#F5F0E8]">
      <div className="container mx-auto">

        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-gold" />
            <span className="text-xs tracking-[0.4em] text-gold uppercase">
              Değerlerimiz
            </span>
            <div className="h-px w-8 bg-gold" />
          </div>
          <h2 className="font-serif text-5xl font-light text-charcoal leading-tight">
            Bizi Biz Yapan İlkeler
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-charcoal/10">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div
                key={i}
                className="group relative bg-[#F5F0E8] hover:bg-white p-10 transition-all duration-500"
              >
                {/* Gold top border on hover */}
                <div className="absolute top-0 left-0 h-[2px] w-0 bg-gold transition-all duration-500 group-hover:w-full" />

                <div className="flex h-12 w-12 items-center justify-center border border-charcoal/20 group-hover:border-gold/50 transition-colors duration-300 mb-6">
                  <Icon size={18} className="text-gold" />
                </div>

                <h3 className="font-serif text-xl font-light text-charcoal mb-3">
                  {v.title}
                </h3>
                <p className="text-sm leading-relaxed text-charcoal/60">
                  {v.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}