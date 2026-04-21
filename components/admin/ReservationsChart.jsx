"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const MONTHS = ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"];

function getMonthlyData(appointments) {
  const year = new Date().getFullYear();
  const months = MONTHS.map((m, i) => ({ month: m, count: 0, revenue: 0 }));

  appointments.forEach((a) => {
    const d = new Date(a.appointmentDate);
    if (d.getFullYear() === year) {
      months[d.getMonth()].count += 1;
      months[d.getMonth()].revenue += a.price;
    }
  });

  return months;
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1A1814] border border-white/10 px-4 py-3">
        <p className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-1">
          {label}
        </p>
        <p className="font-serif text-xl text-gold">
          {payload[0].value} rezervasyon
        </p>
      </div>
    );
  }
  return null;
};

export default function ReservationsChart({ appointments }) {
  const data = getMonthlyData(appointments);

  return (
    <div className="border border-white/5 bg-[#0D0B08] p-6">
      <div className="flex items-center gap-3 mb-1">
        <div className="h-px w-6 bg-gold" />
        <span className="text-[10px] tracking-[0.4em] uppercase text-gold">
          Aylık Dağılım
        </span>
      </div>
      <h3 className="font-serif text-xl font-light text-foreground mb-6">
        Rezervasyon Grafiği
      </h3>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(201,168,76,0.05)" }} />
          <Bar
            dataKey="count"
            fill="#C9A84C"
            fillOpacity={0.7}
            radius={[2, 2, 0, 0]}
            maxBarSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}