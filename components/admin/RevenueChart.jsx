"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function getWeeklyData(appointments) {
  const weeks = {};

  appointments.forEach((a) => {
    const date = new Date(a.createdAt);
    const year = date.getFullYear();
    const startOfYear = new Date(year, 0, 1);
    const weekNum = Math.ceil(
      ((date - startOfYear) / 86400000 + startOfYear.getDay() + 1) / 7
    );
    const key = `${year}-H${weekNum}`;

    if (!weeks[key]) {
      weeks[key] = { week: `Hf ${weekNum}`, revenue: 0, count: 0 };
    }
    weeks[key].revenue += a.price;
    weeks[key].count += 1;
  });

  return Object.values(weeks).slice(-12);
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1A1814] border border-gold/20 px-4 py-3">
        <p className="text-[10px] tracking-[0.2em] uppercase text-gold/60 mb-1">
          {label}
        </p>
        <p className="font-serif text-xl text-gold">
          ${payload[0].value.toLocaleString("tr-TR")}
        </p>
        <p className="text-xs text-white/40 mt-0.5">
          {payload[0].payload.count} rezervasyon
        </p>
      </div>
    );
  }
  return null;
};

export default function RevenueChart({ appointments }) {
  const data = getWeeklyData(appointments);

  return (
    <div className="border border-white/5 bg-[#0D0B08] p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="h-px w-6 bg-gold" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-gold">
              Haftalık Gelir
            </span>
          </div>
          <h3 className="font-serif text-xl font-light text-foreground">
            Gelir Grafiği
          </h3>
        </div>
        <div className="text-right">
          <p className="font-serif text-2xl text-gold">
            ${appointments.reduce((s, a) => s + a.price, 0).toLocaleString("tr-TR")}
          </p>
          <p className="text-[10px] text-white/30 uppercase tracking-wider">
            Toplam
          </p>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="flex items-center justify-center h-48 text-white/20 text-sm">
          Henüz veri yok
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#C9A84C" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#C9A84C" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis
              dataKey="week"
              tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${v}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#C9A84C"
              strokeWidth={2}
              fill="url(#goldGradient)"
              dot={{ fill: "#C9A84C", strokeWidth: 0, r: 3 }}
              activeDot={{ fill: "#C9A84C", r: 5, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}