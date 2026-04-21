"use client";

import { useState, useEffect } from "react";
import { getAllAppointments } from "@/api/appointment";
import { Loader2, Search, ChevronUp, ChevronDown } from "lucide-react";

export default function ReservasyonlarPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("appointmentDate");
  const [sortDir, setSortDir] = useState("desc");

  useEffect(() => {
    getAllAppointments()
      .then(setAppointments)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("desc");
    }
  };

  const filtered = appointments
    .filter((a) => {
      const q = search.toLowerCase();
      return (
        a.departureLocation.toLowerCase().includes(q) ||
        a.arrivalLocation.toLowerCase().includes(q) ||
        a.phoneNumber.includes(q)
      );
    })
    .sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      if (sortField === "appointmentDate" || sortField === "createdAt") {
        aVal = new Date(aVal);
        bVal = new Date(bVal);
      }
      if (aVal < bVal) return sortDir === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <ChevronUp size={12} className="text-white/20" />;
    return sortDir === "asc"
      ? <ChevronUp size={12} className="text-gold" />
      : <ChevronDown size={12} className="text-gold" />;
  };

  const totalRevenue = filtered.reduce((s, a) => s + a.price, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 size={24} className="text-gold animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Top bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-white/40 text-sm">
            <span className="text-gold font-serif text-lg">{filtered.length}</span> rezervasyon
            {search && " bulundu"}
            {" · "}
            <span className="text-gold">${totalRevenue.toLocaleString("tr-TR")}</span> toplam
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            placeholder="Konum veya telefon ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0D0B08] border border-white/10 focus:border-gold/40 text-white/70 text-sm placeholder:text-white/20 pl-9 pr-4 py-2.5 outline-none transition-colors duration-200"
          />
        </div>
      </div>

      {/* Table */}
      <div className="border border-white/5 bg-[#0D0B08] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                {[
                  { label: "#", field: "id" },
                  { label: "Kalkış", field: "departureLocation" },
                  { label: "Varış", field: "arrivalLocation" },
                  { label: "Tarih", field: "appointmentDate" },
                  { label: "Telefon", field: "phoneNumber" },
                  { label: "Kişi", field: "peopleCount" },
                  { label: "Ücret", field: "price" },
                  { label: "Oluşturulma", field: "createdAt" },
                ].map((col) => (
                  <th
                    key={col.field}
                    onClick={() => handleSort(col.field)}
                    className="px-4 py-3 text-left cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] tracking-[0.3em] uppercase text-white/30 hover:text-white/60 transition-colors">
                        {col.label}
                      </span>
                      <SortIcon field={col.field} />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-white/20 text-sm">
                    Rezervasyon bulunamadı
                  </td>
                </tr>
              ) : (
                filtered.map((a, i) => (
                  <tr
                    key={a.id}
                    className="border-b border-white/5 last:border-0 hover:bg-white/2 transition-colors duration-150 group"
                  >
                    <td className="px-4 py-4">
                      <span className="font-serif text-white/30">#{a.id}</span>
                    </td>
                    <td className="px-4 py-4 max-w-[180px]">
                      <p className="text-white/70 truncate text-xs">{a.departureLocation}</p>
                    </td>
                    <td className="px-4 py-4 max-w-[180px]">
                      <p className="text-white/70 truncate text-xs">{a.arrivalLocation}</p>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <p className="text-white/60 text-xs">
                        {new Date(a.appointmentDate).toLocaleDateString("tr-TR")}
                      </p>
                      <p className="text-white/30 text-[11px]">
                        {new Date(a.appointmentDate).toLocaleTimeString("tr-TR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-white/50 text-xs">{a.phoneNumber}</span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="text-white/50 text-xs">{a.peopleCount}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="font-serif text-lg text-gold">${a.price}</span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <p className="text-white/30 text-xs">
                        {new Date(a.createdAt).toLocaleDateString("tr-TR")}
                      </p>
                      <p className="text-white/20 text-[11px]">
                        {new Date(a.createdAt).toLocaleTimeString("tr-TR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </td>
                  </tr>
                ))
              )}
            </tbody>

            {/* Footer total */}
            {filtered.length > 0 && (
              <tfoot>
                <tr className="border-t border-gold/20 bg-gold/5">
                  <td colSpan={6} className="px-4 py-3 text-[10px] tracking-[0.3em] uppercase text-white/30">
                    Toplam ({filtered.length} rezervasyon)
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-serif text-xl text-gold">
                      ${totalRevenue.toLocaleString("tr-TR")}
                    </span>
                  </td>
                  <td />
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}