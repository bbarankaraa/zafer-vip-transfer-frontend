"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  Users,
  Phone,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Navigation,
} from "lucide-react";
import PlacesAutocomplete from "@/components/ui/PlacesAutocomplete";
import { getDistanceBetweenPlaces } from "@/lib/getDistance";
import { calculatePrice } from "@/lib/pricing";
import { createAppointment } from "@/api/appointment";

const initialForm = {
  departureLocation: "",
  departurePlaceId: "",
  arrivalLocation: "",
  arrivalPlaceId: "",
  appointmentDate: "",
  phoneNumber: "",
  peopleCount: 1,
  note: "",
};

export default function ReservationForm() {

  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const [step, setStep] = useState(1);
  const [routeInfo, setRouteInfo] = useState(null);
  const [routeLoading, setRouteLoading] = useState(false);
  const [routeError, setRouteError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDepartureSelect = ({ location, placeId }) => {
    setForm((prev) => ({
      ...prev,
      departureLocation: location,
      departurePlaceId: placeId,
    }));
  };

  const handleArrivalSelect = ({ location, placeId }) => {
    setForm((prev) => ({
      ...prev,
      arrivalLocation: location,
      arrivalPlaceId: placeId,
    }));
  };

  useEffect(() => {
    if (!form.departurePlaceId || !form.arrivalPlaceId) {
      setRouteInfo(null);
      setRouteError(null);
      return;
    }

    setRouteLoading(true);
    setRouteError(null);
    setRouteInfo(null);

    getDistanceBetweenPlaces(form.departurePlaceId, form.arrivalPlaceId)
      .then(({ distanceInMeters, distanceText, durationText }) => {
        const { km, price } = calculatePrice(distanceInMeters);
        setRouteInfo({ km, price, distanceText, durationText });
      })
      .catch((err) => {
        setRouteError("Mesafe hesaplanamadı. Lütfen tekrar deneyin.");
      })
      .finally(() => setRouteLoading(false));
  }, [form.departurePlaceId, form.arrivalPlaceId]);

  const handleNext = (e) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => setStep(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    const payload = {
      departureLocation: form.departureLocation,
      arrivalLocation: form.arrivalLocation,
      appointmentDate: form.appointmentDate,
      phoneNumber: form.phoneNumber,
      peopleCount: Number(form.peopleCount),
      price: routeInfo?.price ?? 0,
    };

    console.log("Rezervasyon verisi:", payload);

    try {
      await createAppointment(payload);
      setStatus("success");
    } catch (error) {
      console.log(error+"Hata")
      setStatus("error");
    }
  };

  const handleReset = () => {
    setForm(initialForm);
    setStep(1);
    setStatus("idle");
    setRouteInfo(null);
  };

  if (status === "success") {
    return (
      <section className="min-h-[60vh] flex items-center justify-center py-28 px-8 bg-background">
        <div className="flex flex-col items-center text-center max-w-md">
          <div className="flex h-16 w-16 items-center justify-center border border-gold/40 mb-8">
            <CheckCircle2 size={28} className="text-gold" />
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold" />
            <span className="text-xs tracking-[0.4em] text-gold uppercase">
              Başarılı
            </span>
            <div className="h-px w-8 bg-gold" />
          </div>
          <h2 className="font-serif text-4xl font-light text-foreground mb-4">
            Rezervasyonunuz Alındı
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-10">
            Talebiniz başarıyla iletildi. Ekibimiz en kısa sürede{" "}
            <span className="text-foreground">{form.phoneNumber}</span>{" "}
            numaralı telefonunuzdan sizinle iletişime geçecektir.
          </p>
          <button
            onClick={handleReset}
            className="group flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-gold/60 hover:text-gold transition-colors duration-300"
          >
            Yeni Rezervasyon
            <ArrowRight
              size={12}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-8 md:px-20 lg:px-32 bg-background">
      <div className="container mx-auto max-w-3xl">

        {/* Step indicator */}
        <div className="flex items-center justify-center mb-16">
          <div className="flex items-center gap-3">
            <div className={`flex h-8 w-8 items-center justify-center border text-xs tracking-wider transition-all duration-300 ${
              step >= 1 ? "border-gold bg-gold text-charcoal" : "border-border/40 text-muted-foreground"
            }`}>
              01
            </div>
            <span className={`text-xs tracking-[0.2em] uppercase hidden sm:block transition-colors duration-300 ${
              step >= 1 ? "text-foreground" : "text-muted-foreground"
            }`}>
              Güzergah & Tarih
            </span>
          </div>

          <div className="mx-4 h-px w-12 md:w-24 bg-border/40 relative">
            <div
              className="absolute top-0 left-0 h-full bg-gold transition-all duration-500"
              style={{ width: step >= 2 ? "100%" : "0%" }}
            />
          </div>

          <div className="flex items-center gap-3">
            <div className={`flex h-8 w-8 items-center justify-center border text-xs tracking-wider transition-all duration-300 ${
              step >= 2 ? "border-gold bg-gold text-charcoal" : "border-border/40 text-muted-foreground"
            }`}>
              02
            </div>
            <span className={`text-xs tracking-[0.2em] uppercase hidden sm:block transition-colors duration-300 ${
              step >= 2 ? "text-foreground" : "text-muted-foreground"
            }`}>
              İletişim & Onay
            </span>
          </div>
        </div>

        {/* ── STEP 1 ── */}
        {step === 1 && (
          <form onSubmit={handleNext} className="flex flex-col gap-8">
            <div className="flex items-center gap-3">
              <div className="h-px w-6 bg-gold" />
              <span className="text-xs tracking-[0.4em] text-gold uppercase">
                Güzergah Bilgileri
              </span>
            </div>

            {/* Departure */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                Kalkış Noktası <span className="text-gold">*</span>
              </label>
              <PlacesAutocomplete
                placeholder="örn. Eyüpsultan, İstanbul"
                value={form.departureLocation}
                onSelect={handleDepartureSelect}
              />
            </div>

            {/* Arrival */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                Varış Noktası <span className="text-gold">*</span>
              </label>
              <PlacesAutocomplete
                placeholder="örn. Sabiha Gökçen Havalimanı"
                value={form.arrivalLocation}
                onSelect={handleArrivalSelect}
              />
            </div>

            {/* Route info card */}
            {routeLoading && (
              <div className="flex items-center justify-center gap-3 py-6 border border-border/40 bg-card/40">
                <Loader2 size={16} className="text-gold animate-spin" />
                <span className="text-xs tracking-wider text-muted-foreground uppercase">
                  Mesafe hesaplanıyor...
                </span>
              </div>
            )}

            {routeError && (
              <div className="py-4 px-5 border border-destructive/30 bg-destructive/5">
                <p className="text-xs text-destructive/80">{routeError}</p>
              </div>
            )}

            {routeInfo && !routeLoading && (
              <div className="border border-gold/30 bg-card/60 p-5">
                <div className="flex items-center gap-3 mb-5">
                  <Navigation size={13} className="text-gold" />
                  <span className="text-[10px] tracking-[0.3em] uppercase text-gold">
                    Tahmini Bilgiler
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="flex flex-col items-center">
                    <span className="font-serif text-2xl font-light text-foreground">
                      {routeInfo.distanceText}
                    </span>
                    <span className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mt-1">
                      Mesafe
                    </span>
                  </div>

                  <div className="flex flex-col items-center border-x border-border/40">
                    <span className="font-serif text-2xl font-light text-foreground">
                      {routeInfo.durationText}
                    </span>
                    <span className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mt-1">
                      Süre
                    </span>
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="font-serif text-2xl font-light text-gold">
                      ${routeInfo.price}
                    </span>
                    <span className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mt-1">
                      Tahmini Ücret
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border/30">
                  <p className="text-[10px] text-muted-foreground/50 text-center tracking-wider">
                    * Fiyat tahminidir. Trafik ve güzergaha göre değişebilir.
                  </p>
                </div>
              </div>
            )}

            {/* Date + People */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                  Tarih & Saat <span className="text-gold">*</span>
                </label>
                <div className="relative">
                  <Calendar
                    size={14}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/60"
                  />
                  <input
                    type="datetime-local"
                    name="appointmentDate"
                    value={form.appointmentDate}
                    onChange={handleChange}
                    required
                    className="w-full bg-card border border-border/60 focus:border-gold/60 text-foreground text-sm pl-10 pr-4 py-4 outline-none transition-colors duration-200 [color-scheme:dark]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                  Kişi Sayısı <span className="text-gold">*</span>
                </label>
                <div className="relative">
                  <Users
                    size={14}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/60"
                  />
                  <input
                    type="number"
                    name="peopleCount"
                    value={form.peopleCount}
                    onChange={handleChange}
                    min={1}
                    max={20}
                    required
                    className="w-full bg-card border border-border/60 focus:border-gold/60 text-foreground text-sm pl-10 pr-4 py-4 outline-none transition-colors duration-200"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={!form.departurePlaceId || !form.arrivalPlaceId || routeLoading}
              className="group mt-4 w-full bg-gold text-charcoal hover:bg-gold-light disabled:opacity-40 disabled:cursor-not-allowed py-4 text-xs tracking-[0.3em] uppercase font-medium transition-colors duration-300 flex items-center justify-center gap-2"
            >
              Devam Et
              <ArrowRight
                size={13}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>

            {(!form.departurePlaceId || !form.arrivalPlaceId) && (
              <p className="text-center text-xs text-muted-foreground/40 -mt-4">
                Lütfen kalkış ve varış noktalarını listeden seçin
              </p>
            )}
          </form>
        )}

        {/* ── STEP 2 ── */}
        {step === 2 && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="flex items-center gap-3">
              <div className="h-px w-6 bg-gold" />
              <span className="text-xs tracking-[0.4em] text-gold uppercase">
                Son Bilgiler
              </span>
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                Telefon Numarası <span className="text-gold">*</span>
              </label>
              <div className="relative">
                <Phone
                  size={14}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/60"
                />
                <input
                  type="tel"
                  name="phoneNumber"
                  value={form.phoneNumber}
                  onChange={handleChange}
                  placeholder="+90 555 555 55 55"
                  required
                  className="w-full bg-card border border-border/60 focus:border-gold/60 text-foreground text-sm placeholder:text-muted-foreground/40 pl-10 pr-4 py-4 outline-none transition-colors duration-200"
                />
              </div>
            </div>

            

            {/* Summary */}
            <div className="border border-border/40 p-5 bg-card/40">
              <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-4">
                Rezervasyon Özeti
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground shrink-0">Kalkış</span>
                  <span className="text-foreground text-right">{form.departureLocation || "—"}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground shrink-0">Varış</span>
                  <span className="text-foreground text-right">{form.arrivalLocation || "—"}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground shrink-0">Tarih</span>
                  <span className="text-foreground text-right">
                    {form.appointmentDate
                      ? new Date(form.appointmentDate).toLocaleString("tr-TR")
                      : "—"}
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground shrink-0">Kişi</span>
                  <span className="text-foreground">{form.peopleCount}</span>
                </div>

                {routeInfo && (
                  <>
                    <div className="flex justify-between gap-4">
                      <span className="text-muted-foreground shrink-0">Mesafe</span>
                      <span className="text-foreground">{routeInfo.distanceText}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-muted-foreground shrink-0">Süre</span>
                      <span className="text-foreground">{routeInfo.durationText}</span>
                    </div>
                    <div className="pt-3 mt-1 border-t border-border/30 flex justify-between gap-4 items-center">
                      <span className="text-muted-foreground shrink-0 font-medium">Tahmini Ücret</span>
                      <span className="font-serif text-2xl text-gold">${routeInfo.price}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <button
                type="button"
                onClick={handleBack}
                className="sm:w-1/3 border border-border/60 text-muted-foreground hover:border-gold/40 hover:text-foreground py-4 text-xs tracking-[0.2em] uppercase transition-all duration-300"
              >
                ← Geri
              </button>
              <button
                type="submit"
                disabled={!form.phoneNumber || status === "loading"}
                className="group sm:flex-1 bg-gold text-charcoal hover:bg-gold-light disabled:opacity-50 disabled:cursor-not-allowed py-4 text-xs tracking-[0.3em] uppercase font-medium transition-colors duration-300 flex items-center justify-center gap-2"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={13} className="animate-spin" />
                    Gönderiliyor...
                  </>
                ) : (
                  <>
                    Rezervasyonu Tamamla
                    <ArrowRight
                      size={13}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}