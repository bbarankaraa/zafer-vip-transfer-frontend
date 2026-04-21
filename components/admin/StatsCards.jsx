import { TrendingUp, CalendarCheck, DollarSign, Users } from "lucide-react";

export default function StatsCards({ appointments }) {
  const totalRevenue = appointments.reduce((sum, a) => sum + a.price, 0);
  const totalCount = appointments.length;
  const avgPrice = totalCount > 0 ? totalRevenue / totalCount : 0;

  const thisMonth = new Date().getMonth();
  const thisYear = new Date().getFullYear();
  const monthlyCount = appointments.filter((a) => {
    const d = new Date(a.appointmentDate);
    return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
  }).length;

  const monthlyRevenue = appointments
    .filter((a) => {
      const d = new Date(a.appointmentDate);
      return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
    })
    .reduce((sum, a) => sum + a.price, 0);

  const cards = [
    {
      icon: DollarSign,
      label: "Toplam Gelir",
      value: `$${totalRevenue.toLocaleString("tr-TR")}`,
      sub: "Tüm zamanlar",
      color: "text-gold",
      border: "border-gold/20",
      bg: "bg-gold/5",
    },
    {
      icon: CalendarCheck,
      label: "Toplam Rezervasyon",
      value: totalCount,
      sub: "Tüm zamanlar",
      color: "text-blue-400",
      border: "border-blue-400/20",
      bg: "bg-blue-400/5",
    },
    {
      icon: TrendingUp,
      label: "Bu Ay Gelir",
      value: `$${monthlyRevenue.toLocaleString("tr-TR")}`,
      sub: new Date().toLocaleDateString("tr-TR", { month: "long", year: "numeric" }),
      color: "text-emerald-400",
      border: "border-emerald-400/20",
      bg: "bg-emerald-400/5",
    },
    {
      icon: Users,
      label: "Bu Ay Rezervasyon",
      value: monthlyCount,
      sub: "Ortalama: $" + avgPrice.toFixed(0) + " / transfer",
      color: "text-purple-400",
      border: "border-purple-400/20",
      bg: "bg-purple-400/5",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <div
            key={i}
            className={`relative border ${card.border} ${card.bg} p-6 overflow-hidden`}
          >
            {/* Top accent */}
            <div className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-current to-transparent ${card.color} opacity-40`} />

            <div className="flex items-start justify-between mb-4">
              <div className={`flex h-10 w-10 items-center justify-center border ${card.border}`}>
                <Icon size={16} className={card.color} />
              </div>
            </div>

            <p className={`font-serif text-3xl font-light ${card.color}`}>
              {card.value}
            </p>
            <p className="text-sm text-white/60 mt-1">{card.label}</p>
            <p className="text-[10px] tracking-wider text-white/30 uppercase mt-1">
              {card.sub}
            </p>
          </div>
        );
      })}
    </div>
  );
}