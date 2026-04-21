import Image from "next/image";

export default function ContactHero() {
  return (
    <section className="relative h-[45vh] min-h-87.5 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1600&q=80)",
        }}
      />
      <div className="absolute inset-0 bg-black/75" />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
      <div className="absolute left-0 top-0 h-full w-0.75 bg-linear-to-b from-transparent via-gold to-transparent opacity-60" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-gold/40 to-transparent" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-8">
        <Image
          src="/logo.png"
          alt="Zafer VIP Transfer"
          width={100}
          height={50}
          className="object-contain mx-auto mb-8 opacity-90"
        />

        <div className="flex items-center gap-3 mb-5">
          <div className="h-px w-10 bg-gold" />
          <span className="text-xs tracking-[0.5em] text-gold uppercase">
            Bize Ulaşın
          </span>
          <div className="h-px w-10 bg-gold" />
        </div>

        <h1 className="font-serif text-5xl md:text-6xl font-light text-white leading-tight">
          İletişim
        </h1>
        <p className="mt-4 text-sm text-white/50 tracking-wider max-w-md leading-relaxed">
          7/24 hizmetinizdeyiz. Rezervasyon ve sorularınız için bize ulaşın.
        </p>
      </div>
    </section>
  );
}