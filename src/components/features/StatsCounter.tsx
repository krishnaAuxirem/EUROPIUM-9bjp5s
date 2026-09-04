import { useEffect, useState, useRef } from "react";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  prefix?: string;
}

interface StatsCounterProps {
  stats: StatItem[];
  className?: string;
}

function AnimatedNumber({ target, suffix, prefix = "" }: { target: number; suffix: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const duration = 1800;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + increment, target);
      setCount(Math.floor(current));
      if (current >= target) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

export default function StatsCounter({ stats, className = "" }: StatsCounterProps) {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 ${className}`}>
      {stats.map((stat, i) => (
        <div key={i} className="text-center">
          <div className="text-3xl md:text-4xl font-bold font-serif text-white mb-1">
            <AnimatedNumber target={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
          </div>
          <div className="text-white/70 text-sm">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
