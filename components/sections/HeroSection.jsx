"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Users,
  Phone,
  Loader2,
  Navigation,
} from "lucide-react";
import PlacesAutocomplete from "../ui/PlacesAutocomplete";
import { getDistanceBetweenPlaces } from "@/lib/getDistance";
import { calculatePrice } from "@/lib/pricing";
import { createAppointment } from "@/api/appointment";

const slides = [
  {
    id: 1,
    heading: "Sessizlik\nve Zarafetle\nVarin.",
    sub: "İstanbul genelinde özel transferler — her seferinde zamanında.",
    img: "/car1.jpg",
  },
  {
    id: 2,
    heading: "Yolculuğunuz,\nBizim\nSorumluluğumuz.",
    sub: "Havalimanı transferleri, şehir turları ve kurumsal seyahat hizmetleri.",
    img: "/car2.jpg",
  },
  {
    id: 3,
    heading: "Birinci\nSınıfın\nÖtesinde.",
    sub: "Premium araç filosu. Profesyonel şöförler. Kesintisiz konfor.",
    img: "/car3.jpeg",
  },
];

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

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [routeInfo, setRouteInfo] = useState(null);
  const [routeLoading, setRouteLoading] = useState(false);
  const [routeError, setRouteError] = useState(null);
  const [form, setForm] = useState(initialForm);

  const go = (index) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 400);
  };

  const prev = () => go((current - 1 + slides.length) % slides.length);
  const next = () => go((current + 1) % slides.length);

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
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [current]);

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
        setRouteError("Mesafe hesaplanamadı! Lütfen tekrar deneyin...");
      })
      .finally(() => setRouteLoading(false));
  }, [form.arrivalPlaceId, form.departurePlaceId]);

  const slide = slides[current];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      departureLocation: form.departureLocation,
      arrivalLocation: form.arrivalLocation,
      appointmentDate: form.appointmentDate,
      phoneNumber: form.phoneNumber,
      peopleCount: Number(form.peopleCount),
      price: routeInfo?.price ?? 0,
    };
    console.log("Rezervasyon verisi: ", payload);
    try {
      await createAppointment(payload);
      handleReset();
    } catch (error) {
      console.log(error + "Hata");
      setRouteError(error);
    }
  };

  const handleReset = () => {
    setForm(initialForm);
    setRouteInfo(null);
    setRouteLoading(false);
    setRouteError(null);
  }

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: `url(${slide.img})`,
          opacity: animating ? 0 : 1,
        }}
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/60 to-black/40" />
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />

      {/* Gold vertical line accent */}
      <div className="absolute left-0 top-0 h-full w-0.75 bg-linear-to-b from-transparent via-gold to-transparent opacity-60" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col justify-center px-8 py-24 md:px-20 lg:px-32">
        {/* Top: heading + form side by side on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Hero Text */}
          <div
            style={{
              opacity: animating ? 0 : 1,
              transform: animating ? "translateY(16px)" : "translateY(0)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px w-10 bg-gold" />
              <span className="text-xs tracking-[0.4em] text-gold uppercase">
                Premium Transfer Hizmeti
              </span>
            </div>
            <h1 className="font-serif text-5xl font-light leading-[1.1] text-white md:text-6xl lg:text-7xl whitespace-pre-line">
              {slide.heading}
            </h1>
            <p className="mt-6 max-w-md text-sm leading-relaxed tracking-wide text-white/60 md:text-base">
              {slide.sub}
            </p>
            <div className="mt-8 hidden lg:flex items-center gap-3">
              <div className="h-px w-8 bg-gold/40" />
              <Link
                href="/reservation"
                className="text-xs tracking-[0.3em] uppercase text-gold/60 hover:text-gold transition-colors duration-300 flex items-center gap-2"
              >
                Detaylı Rezervasyon
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>

          <div>
            <form
              onSubmit={handleSubmit}
              className="bg-black/60 backdrop-blur-md border border-white/10 p-6 md:p-8"
            >
              {/* Form header */}
              <div className="mb-6 flex items-center gap-3">
                <div className="h-px w-6 bg-gold" />
                <h2 className="font-serif text-xl font-light text-white tracking-wide">
                  Hızlı Rezervasyon
                </h2>
              </div>

              {/* INPUTS */}
              <div className="flex flex-col gap-4">
                {/* Departure */}
                <div className="flex flex-col gap-1.5 ">
                  <label className="text-[10px] tracking-[0.3em] uppercase text-white">
                    Kalkış Noktası
                  </label>
                  <PlacesAutocomplete
                    placeholder={"örn. Eyüpsultan, İstanbul"}
                    value={form.departureLocation}
                    onSelect={handleDepartureSelect}
                  />
                </div>

                {/* Arrival */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] tracking-[0.3em] uppercase text-white/40">
                    Varış Noktası
                  </label>
                  <PlacesAutocomplete
                    placeholder={"örn. Sabiha Gökçen Havalimanı"}
                    value={form.arrivalLocation}
                    onSelect={handleArrivalSelect}
                  />
                </div>

                {routeLoading && (
                  <div className="flex items-center justify-center gap-3 py-6 border border-border/40 bg-card/40">
                    <Loader2 size={16} className="text-gold animate-spin" />
                    <span className="text-xs tracking-wider text-muted-foreground uppercase">
                      Mesafe Hesaplanıyor
                    </span>
                  </div>
                )}

                {routeError && (
                  <div className="py-4 px-5 border border-destructive/30 bg-destructive/5 text-center">
                    <p className="text-sm text-destructive/80 font-bold">
                      {routeError}
                    </p>
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

                {/* Date + People count side by side */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Date */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] tracking-[0.3em] uppercase text-white/40">
                      Tarih & Saat
                    </label>
                    <div className="relative">
                      <Calendar
                        size={14}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gold/60"
                      />
                      <input
                        type="datetime-local"
                        name="appointmentDate"
                        value={form.appointmentDate}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/5 border border-white/10 text-white text-sm pl-9 pr-2 py-3 outline-none focus:border-gold/50 transition-colors duration-200 [color-scheme:dark]"
                      />
                    </div>
                  </div>

                  {/* People count */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] tracking-[0.3em] uppercase text-white/40">
                      Kişi Sayısı
                    </label>
                    <div className="relative">
                      <Users
                        size={14}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gold/60"
                      />
                      <input
                        type="number"
                        name="peopleCount"
                        value={form.peopleCount}
                        onChange={handleChange}
                        min={1}
                        max={7}
                        required
                        className="w-full bg-white/5 border border-white/10 text-white text-sm pl-9 pr-4 py-3 outline-none focus:border-gold/50 transition-colors duration-200"
                      />
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] tracking-[0.3em] uppercase text-white/40">
                    Telefon Numarası
                  </label>
                  <div className="relative">
                    <Phone
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gold/60"
                    />
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={form.phoneNumber}
                      onChange={handleChange}
                      placeholder="+90 555 555 55 55"
                      required
                      className="w-full bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 pl-9 pr-4 py-3 outline-none focus:border-gold/50 transition-colors duration-200"
                    />
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="group mt-2 w-full bg-gold text-charcoal py-3.5 text-xs tracking-[0.3em] uppercase font-medium hover:bg-gold-light transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  Rezervasyon Yap
                  <ArrowRight
                    size={13}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>

                {/* Full reservation page link — mobile only */}
                <div className="flex items-center justify-center gap-2 lg:hidden">
                  <Link
                    href="/reservation"
                    className="text-[11px] tracking-[0.2em] uppercase text-white/30 hover:text-gold transition-colors duration-300"
                  >
                    Detaylı rezervasyon formu →
                  </Link>
                </div>
              </div>
              {/* INPUTS */}
            </form>
          </div>
        </div>

        {/* Bottom: slide counter + arrows */}
        <div className="mt-12 lg:mt-16 flex items-center justify-between">
          {/* Slide counter */}
          <div className="flex items-center gap-4">
            <span className="font-serif text-4xl text-gold/80 leading-none">
              0{current + 1}
            </span>
            <div className="h-px w-12 bg-white/20">
              <div
                className="h-full bg-gold transition-all duration-300"
                style={{ width: `${((current + 1) / slides.length) * 100}%` }}
              />
            </div>
            <span className="text-xs text-white/30">0{slides.length}</span>
          </div>

          {/* Arrow controls */}
          <div className="flex gap-2">
            <button
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center border border-white/20 text-white/50 hover:border-gold hover:text-gold transition-all duration-300"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={next}
              className="flex h-10 w-10 items-center justify-center border border-white/20 text-white/50 hover:border-gold hover:text-gold transition-all duration-300"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
