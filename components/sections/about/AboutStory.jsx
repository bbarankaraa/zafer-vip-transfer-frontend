"use client";

import { useState } from "react";

const photos = [
  {
    src: "/foto1.png",
    alt: "VIP Transfer Hizmeti",
  },
  {
    src: "/foto2.png",
    alt: "Premium Araç Filosu",
  },
  {
    src: "/foto3.png",
    alt: "Profesyonel Hizmet",
  },
];

export default function AboutStory() {
  const [activePhoto, setActivePhoto] = useState(0);

  return (
    <section className="py-28 px-8 md:px-20 lg:px-32">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Left: Photo gallery */}
          <div className="relative">

            {/* Decorative gold border offset */}
            <div className="absolute -top-4 -left-4 w-full h-full border border-gold/20 pointer-events-none" />

            {/* Main photo */}
            <div className="relative overflow-hidden">
              <div className="relative h-[500px] overflow-hidden">
                {photos.map((photo, i) => (
                  <img
                    key={i}
                    src={photo.src}
                    alt={photo.alt}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
                    style={{
                      opacity: activePhoto === i ? 1 : 0,
                      transform: activePhoto === i ? "scale(1)" : "scale(1.03)",
                    }}
                  />
                ))}

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

                {/* Gold top line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

                {/* Photo label */}
                <div className="absolute top-5 right-5">
                  <div className="bg-black/60 backdrop-blur-sm border border-gold/30 px-3 py-1.5">
                    <span className="text-[10px] tracking-[0.3em] uppercase text-gold">
                      Müşterilerimizle
                    </span>
                  </div>
                </div>

                {/* Badge */}
                <div className="absolute bottom-6 left-6 bg-black/70 backdrop-blur-sm border border-gold/30 px-5 py-4">
                  <span className="font-serif text-3xl text-gold font-light">10+</span>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-white/60 mt-1">
                    Yıllık Deneyim
                  </p>
                </div>

                {/* Photo counter */}
                <div className="absolute bottom-6 right-6 flex items-center gap-2">
                  <span className="font-serif text-2xl text-gold/80 leading-none">
                    0{activePhoto + 1}
                  </span>
                  <span className="text-white/30 text-xs">/</span>
                  <span className="text-white/30 text-xs">0{photos.length}</span>
                </div>
              </div>

              {/* Thumbnail strip */}
              <div className="grid grid-cols-3 gap-px mt-px bg-border/40">
                {photos.map((photo, i) => (
                  <button
                    key={i}
                    onClick={() => setActivePhoto(i)}
                    className="relative h-24 overflow-hidden group"
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{
                        filter: activePhoto === i ? "none" : "brightness(0.5)",
                      }}
                    />
                    {/* Active gold top border */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[2px] bg-gold transition-opacity duration-300"
                      style={{ opacity: activePhoto === i ? 1 : 0 }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Story text */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-gold" />
              <span className="text-xs tracking-[0.4em] text-gold uppercase">
                Hikayemiz
              </span>
            </div>

            <h2 className="font-serif text-5xl font-light text-foreground leading-tight mb-8">
              Konforun Ötesinde<br />Bir Deneyim
            </h2>

            <div className="space-y-5 text-sm leading-relaxed text-muted-foreground">
              <p>
                Zafer VIP Transfer, 2015 yılında İstanbul'da yolcularına sadece ulaşım değil, ayrıcalıklı bir seyahat deneyimi sunma vizyonuyla kuruldu.
              </p>
              <p>
                Kuruluşumuzdan bu yana binlerce iş insanı, turistin ve İstanbullu'nun güvendiği marka haline geldik. Her transferde müşterimizin konforunu, güvenliğini ve zamanını ön planda tutuyoruz.
              </p>
              <p>
                Profesyonel şöförlerimiz ve titizlikle bakılan premium araç filomuzla; havalimanı transferlerinden kurumsal seyahatlere, özel günlerden şehir turlarına kadar geniş bir hizmet yelpazesi sunuyoruz.
              </p>
            </div>

            {/* Stats row */}
            <div className="my-8 grid grid-cols-3 gap-4">
              <div className="text-center border border-border/40 py-4 px-2">
                <p className="font-serif text-3xl font-light text-gold">15K+</p>
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mt-1">
                  Transfer
                </p>
              </div>
              <div className="text-center border border-border/40 py-4 px-2">
                <p className="font-serif text-3xl font-light text-gold">98%</p>
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mt-1">
                  Memnuniyet
                </p>
              </div>
              <div className="text-center border border-border/40 py-4 px-2">
                <p className="font-serif text-3xl font-light text-gold">7/24</p>
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mt-1">
                  Hizmet
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="my-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-border/40" />
              <span className="text-gold font-serif">✦</span>
              <div className="h-px flex-1 bg-border/40" />
            </div>

            {/* Quote */}
            <blockquote className="pl-6 border-l-2 border-gold/40">
              <p className="font-serif text-xl font-light italic text-foreground/70 leading-relaxed">
                "Her yolculuk bir sözdür — ve biz her sözümüzü tutarız."
              </p>
              <footer className="mt-3 text-[10px] tracking-[0.3em] uppercase text-gold/60">
                — Zafer VIP Transfer
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}