"use client";

import { useEffect, useState } from "react";

function Count({ value }: { value: number }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let frame = 0;
    const totalFrames = 30;
    const id = window.setInterval(() => {
      frame += 1;
      setCurrent(Math.floor((value * frame) / totalFrames));

      if (frame >= totalFrames) {
        window.clearInterval(id);
        setCurrent(value);
      }
    }, 25);

    return () => window.clearInterval(id);
  }, [value]);

  return <span>{current.toLocaleString()}</span>;
}

export function LandingStats({ stats }: { stats: Array<{ label: string; value: number }> }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <div key={stat.label} className="panel p-4">
          <div className="text-2xl font-semibold text-brand">
            <Count value={stat.value} />
          </div>
          <div className="mt-1 text-sm text-muted">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
