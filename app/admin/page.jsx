"use client";

import { useState, useEffect } from "react";
import StatsCards from "@/components/admin/StatsCards";
import RevenueChart from "@/components/admin/RevenueChart";
import ReservationsChart from "@/components/admin/ReservationsChart";
import { getAllAppointments } from "@/api/appointment";
import { Loader2 } from "lucide-react";

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllAppointments()
      .then(setAppointments)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 size={24} className="text-gold animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Motivasyon banner */}
      <div className="relative border border-gold/20 bg-gold/5 px-6 py-5 overflow-hidden mt-10 md:mt-0">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-serif text-2xl font-light text-gold">
              Hoş geldiniz 👋
            </p>
            <p className="text-sm text-white/40 mt-1">
              Bugün{" "}
              {new Date().toLocaleDateString("tr-TR", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}{" "}
              — Harika bir gün olsun!
            </p>
          </div>
          <div className="text-right hidden sm:block">
            <p className="font-serif text-3xl text-gold">
              ${appointments.reduce((s, a) => s + a.price, 0).toLocaleString("tr-TR")}
            </p>
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/30">
              Toplam Kazanç
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <StatsCards appointments={appointments} />

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <RevenueChart appointments={appointments} />
        <ReservationsChart appointments={appointments} />
      </div>

      {/* Son 5 rezervasyon */}
      <div className="border border-white/5 bg-[#0D0B08] p-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="h-px w-6 bg-gold" />
          <span className="text-[10px] tracking-[0.4em] uppercase text-gold">
            Son İşlemler
          </span>
        </div>
        <h3 className="font-serif text-xl font-light text-foreground mb-6">
          Son 5 Rezervasyon
        </h3>

        <div className="flex flex-col gap-3">
          {appointments.slice(-5).reverse().map((a) => (
            <div
              key={a.id}
              className="flex items-center justify-between gap-4 py-3 border-b border-white/5 last:border-0"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-border/40 text-xs text-muted-foreground font-serif">
                  {a.id}
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-white/70 truncate">
                    {a.departureLocation} → {a.arrivalLocation}
                  </p>
                  <p className="text-xs text-white/30 mt-0.5">
                    {new Date(a.appointmentDate).toLocaleString("tr-TR")}
                  </p>
                </div>
              </div>
              <span className="font-serif text-lg text-gold shrink-0">
                ${a.price}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}