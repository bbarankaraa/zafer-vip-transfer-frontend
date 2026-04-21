"use client";

import { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";

const stats = [
  { end: 10, suffix: "+", label: "Yıllık Deneyim" },
  { end: 15000, suffix: "+", label: "Tamamlanan Transfer" },
  { end: 724, suffix: "", label: "Kesintisiz Hizmet", custom: "7/24" },
  { end: 100, suffix: "%", label: "Profesyonel Şöför" },
];

export default function StatsBar() {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="border-y border-border/40 bg-card/60 backdrop-blur-sm"
    >
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center py-8 px-4 border-r border-border/40 last:border-r-0 odd:border-r even:border-r-0 md:even:border-r"
          >
            <span className="font-serif text-4xl font-light text-gold">
              {/* 7/24 cannot be counted up — render as static styled text */}
              {s.custom ? (
                <span>{s.custom}</span>
              ) : inView ? (
                <CountUp
                  start={0}
                  end={s.end}
                  duration={2.5}
                  suffix={s.suffix}
                  separator=","
                />
              ) : (
                <span>0{s.suffix}</span>
              )}
            </span>
            <span className="mt-1 text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}