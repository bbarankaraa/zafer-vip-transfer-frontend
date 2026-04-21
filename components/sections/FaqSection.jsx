"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "Havalimanı Transfer Hizmeti Nasıl Çalışıyor?",
    a: "Rezervasyonunuzu oluşturduktan sonra, belirlediğiniz tarih ve saatte profesyonel şöförümüz sizi karşılar. Uçuş takibi yapılarak olası gecikmelerde de yanınızda olunur. Karşılama tabelası ile havalimanında sizi bekleriz.",
  },
  {
    q: "Transfer Ücretleri Nasıl Belirleniyor?",
    a: "Ücretler; alış noktası, varış noktası, araç tipi ve yolcu sayısına göre belirlenir. Tüm fiyatlarımız sabit olup ekstra ücret talep edilmez. Rezervasyon sırasında net fiyat bilgisi alırsınız.",
  },
  {
    q: "7/24 Hizmet Alabilir Miyim?",
    a: "Evet. Zafer VIP Transfer olarak 7 gün 24 saat kesintisiz hizmet sunuyoruz. Gece yarısı uçuşları, sabah erken transferler veya anlık talepler için her zaman hizmetinizdeyiz.",
  },
  {
    q: "Uçuşum Gecikirse Ne Olur?",
    a: "Tüm uçuşları anlık olarak takip ediyoruz. Gecikmeler durumunda şöförünüz sizi beklemeye devam eder. Ek bekleme ücreti talep etmiyoruz — bu hizmetin bir parçası.",
  },
  {
    q: "Hangi Araçlar İle Hizmet Veriyorsunuz?",
    a: "Filosunda Mercedes-Benz E ve S Serisi, BMW 5 ve 7 Serisi, Mercedes Vito ve Sprinter VIP araçlar bulunmaktadır. Tüm araçlarımız bakımlı, sigortalı ve konfor donanımlıdır.",
  },
  {
    q: "Şöförlü Mü Yoksa Şöförsüz Mü Araç Kiralama Yapabiliyorum?",
    a: "Yalnızca şöförlü araç hizmeti sunuyoruz. Bu sayede güvenli, konforlu ve profesyonel bir seyahat deneyimi garanti altındadır.",
  },
  {
    q: "Bagaj Hakkım Var Mı?",
    a: "Araç tipine göre standart bagaj kapasitesi mevcuttur. Fazla veya büyük boy bagajlarınız için rezervasyon sırasında bilgi vermeniz yeterlidir; size en uygun araç tahsis edilir.",
  },
  {
    q: "Kurumsal Transfer Hizmeti Sunuyor Musunuz?",
    a: "Evet. Kurumsal müşterilerimize özel fiyatlandırma, düzenli transfer planlaması ve faturalı hizmet seçenekleri sunuyoruz. Detaylar için bizimle iletişime geçebilirsiniz.",
  },
  {
    q: "Düğün Veya Özel Gün Transferi Yapıyor Musunuz?",
    a: "Düğün, nişan, doğum günü ve tüm özel günleriniz için VIP araç ve süsleme seçenekleriyle hizmet veriyoruz. Unutulmaz bir deneyim için önceden rezervasyon oluşturmanızı öneririz.",
  },
  {
    q: "Nasıl Rezervasyon Yapabilirim?",
    a: "Web sitemiz üzerinden online rezervasyon formunu doldurabilir, telefon veya WhatsApp aracılığıyla bizimle iletişime geçebilirsiniz. Rezervasyonunuz onaylandığında bildirim alırsınız.",
  },
  {
    q: "Ödemeyi Nasıl Yapabilirim?",
    a: "Nakit, kredi kartı veya banka transferi ile ödeme yapabilirsiniz. Kurumsal müşterilerimiz için faturalı ödeme seçeneği de mevcuttur.",
  },
  {
    q: "Hangi Bölgelere Hizmet Veriyorsunuz?",
    a: "İstanbul'un tüm ilçelerine, Sabiha Gökçen ve İstanbul Havalimanı transferlerine hizmet veriyoruz. İstanbul dışı şehirlerarası transferler için de rezervasyon oluşturabilirsiniz.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="py-28 px-8 md:px-20 lg:px-32 bg-[#F5F0E8]">
      <div className="container mx-auto">

        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-gold" />
              <span className="text-xs tracking-[0.4em] text-gold uppercase">
                S.S.S.
              </span>
            </div>
            <h2 className="font-serif text-5xl font-light text-charcoal leading-tight">
              Sıkça Sorulan<br />Sorular
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-charcoal/60">
            Aklınıza takılan soruların cevaplarını burada bulabilirsiniz. Daha fazlası için bizimle iletişime geçin.
          </p>
        </div>

        {/* Accordion */}
        <div className="divide-y divide-charcoal/10">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className="group">
                <button
                  onClick={() => toggle(i)}
                  className="flex w-full items-start justify-between gap-6 py-6 text-left transition-colors duration-200"
                >
                  {/* Number + Question */}
                  <div className="flex items-start gap-5">
                    <span className="font-serif text-xs text-gold/50 mt-1 w-5 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`text-sm md:text-base tracking-wide leading-relaxed transition-colors duration-200 ${
                        isOpen
                          ? "text-charcoal"
                          : "text-charcoal/50 group-hover:text-charcoal"
                      }`}
                    >
                      {faq.q}
                    </span>
                  </div>

                  {/* Icon */}
                  <div
                    className={`mt-1 shrink-0 flex h-6 w-6 items-center justify-center border transition-all duration-300 ${
                      isOpen
                        ? "border-gold text-gold"
                        : "border-charcoal/20 text-charcoal/40 group-hover:border-gold/50 group-hover:text-gold/50"
                    }`}
                  >
                    {isOpen ? <Minus size={12} /> : <Plus size={12} />}
                  </div>
                </button>

                {/* Answer */}
                <div
                  style={{
                    maxHeight: isOpen ? "300px" : "0px",
                    opacity: isOpen ? 1 : 0,
                    overflow: "hidden",
                    transition: "max-height 0.4s ease, opacity 0.3s ease",
                  }}
                >
                  <div className="pb-6 pl-10 pr-8">
                    <p className="text-sm leading-relaxed text-charcoal/60 border-l border-gold/40 pl-4">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}