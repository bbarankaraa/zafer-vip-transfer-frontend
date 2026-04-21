import Image from "next/image";

export default function AboutHero() {
  return (
    <section className="relative h-[70vh] min-h-125 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=1600&q=80)",
        }}
      />
      <div className="absolute inset-0 bg-black/70" />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />

      {/* Gold left accent */}
      <div className="absolute left-0 top-0 h-full w-0.75 bg-linear-to-b from-transparent via-gold to-transparent opacity-60" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-8">

        {/* Logo */}
        <div className="mb-8 opacity-90">
          <Image
            src="/logo.png"
            alt="Zafer VIP Transfer"
            width={120}
            height={60}
            className="object-contain mx-auto"
          />
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-10 bg-gold" />
          <span className="text-xs tracking-[0.5em] text-gold uppercase">
            Hakkımızda
          </span>
          <div className="h-px w-10 bg-gold" />
        </div>

        <h1 className="font-serif text-5xl md:text-7xl font-light text-white leading-tight max-w-3xl">
          Zafer VIP Transfer
        </h1>

        <p className="mt-6 text-sm md:text-base text-white/50 tracking-wider max-w-md leading-relaxed">
          İstanbul'da premium ulaşımın adresi — 2015'ten bu yana.
        </p>

        {/* Bottom gold line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-gold/40 to-transparent" />
      </div>
    </section>
  );
}