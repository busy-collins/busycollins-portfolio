"use client";

import { useEffect, useRef, useState } from "react";

interface Stat {
  prefix?: string;
  end: number;
  suffix: string;
  label: string;
}

const STATS: Stat[] = [
  { end: 60, suffix: "×", label: "faster research throughput" },
  { end: 95, suffix: "%", label: "cost reduction on ARIA" },
  { prefix: "$", end: 671, suffix: "K", label: "projected annual saving" },
];

const DURATION = 1500;

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function StatCounter({ prefix = "", end, suffix, label, active }: Stat & { active: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;

    let startTime: number | null = null;
    let raf: number;

    function tick(timestamp: number) {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / DURATION, 1);
      setCount(Math.round(easeOutCubic(progress) * end));
      if (progress < 1) raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, end]);

  return (
    <div className="metric">
      <strong>
        {prefix}{count}{suffix}
      </strong>
      <span>{label}</span>
    </div>
  );
}

export function AnimatedCounters() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="metrics" ref={ref} aria-label="ARIA impact metrics">
      {STATS.map((stat) => (
        <StatCounter key={stat.label} {...stat} active={active} />
      ))}
    </section>
  );
}
