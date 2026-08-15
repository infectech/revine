"use client";

import { useEffect, useRef, useState } from "react";

interface MarqueeProps {
  children: React.ReactNode;
  direction?: "left" | "right";
  speed?: number;
}

export default function Marquee({
  children,
  direction = "left",
  speed = 40,
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [copies, setCopies] = useState(3);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const measure = () => {
      const child = container.firstElementChild;
      if (!child) return;
      const childWidth = child.clientWidth;
      const viewportWidth = window.innerWidth;
      const needed = Math.ceil(viewportWidth / childWidth) + 2;
      setCopies(needed);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const duration = speed;

  return (
    <div
      ref={containerRef}
      className="flex overflow-hidden"
      style={{ maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)" }}
    >
      <div
        className="flex shrink-0 animate-marquee"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: direction === "left" ? "normal" : "reverse",
        }}
      >
        {Array.from({ length: copies }, (_, i) => (
          <div key={i} className="shrink-0">
            {children}
          </div>
        ))}
      </div>
      <div
        className="flex shrink-0 animate-marquee"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: direction === "left" ? "normal" : "reverse",
        }}
        aria-hidden
      >
        {Array.from({ length: copies }, (_, i) => (
          <div key={i} className="shrink-0">
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}