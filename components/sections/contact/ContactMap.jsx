import React from 'react'

const ContactMap = () => {

    const mapSrc =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.2347833808826!2d29.032416999999995!3d40.9982341!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab9e8a372ded3%3A0x8ff7d651bdce2a87!2sZafer%20Vip%20Transfer!5e0!3m2!1str!2str!4v1774122973310!5m2!1str!2str%22%20width=%22600%22%20height=%22450%22%20style=%22border:0;%22%20allowfullscreen=%22%22%20loading=%22lazy%22%20referrerpolicy=%22no-referrer-when-downgrade";

  return (
    <section className="py-28 px-8 md:px-20 lg:px-32 bg-[#F5F0E8]">
  <div className="container mx-auto">

    {/* Header */}
    <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
      <div>
        <div className="mb-4 flex items-center gap-3">
          <div className="h-px w-8 bg-gold" />
          <span className="text-xs tracking-[0.4em] text-gold uppercase">
            Konumumuz
          </span>
        </div>

        <h2 className="font-serif text-4xl font-light text-charcoal leading-tight">
          Bizi Haritada<br />Bulun
        </h2>
      </div>

      <p className="max-w-xs text-sm leading-relaxed text-charcoal/60">
        İstanbul genelinde hizmet veriyoruz. Sizi istediğiniz noktadan alır, istediğiniz noktaya bırakırız.
      </p>
    </div>

    {/* Map container */}
    <div className="relative">
      {/* Gold top accent */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-gold to-transparent mb-0" />

      <div className="relative overflow-hidden" style={{ height: "500px" }}>
        <iframe
          src={mapSrc}
          width="100%"
          height="100%"
          style={{ border: 0, filter: "grayscale(20%) contrast(1.05)" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Zafer VIP Transfer Konum"
        />
      </div>

      {/* Gold bottom accent */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-gold to-transparent" />
    </div>

    {/* Below map: address bar */}
    <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-charcoal/10 bg-white px-6 py-4">
      <p className="text-sm text-charcoal/70 tracking-wide">
        📍 İstanbul, Türkiye — Tüm ilçelere transfer hizmeti
      </p>

      <a
        href="https://maps.google.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[10px] tracking-[0.3em] uppercase text-gold hover:text-gold-dark transition-colors duration-300 shrink-0"
      >
        Google Maps'te Aç →
      </a>
    </div>

  </div>
</section>
  )
}

export default ContactMap