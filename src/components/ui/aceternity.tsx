"use client";
import { cn } from "../../lib/utils";
import { useEffect, useRef, useState } from "react";

// ── Aurora Background (deep blue hero sections) ────────────────────────────────
export const AuroraBackground = ({
  children,
  className,
  showRadialGradient = true,
}: {
  children: React.ReactNode;
  className?: string;
  showRadialGradient?: boolean;
}) => {
  return (
    <main
      className={cn(
        "relative flex flex-col min-h-screen items-center justify-center bg-garage-bg text-white transition-bg",
        className
      )}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={cn(
            `
            [--dark-gradient:repeating-linear-gradient(100deg,var(--garage-bg)_0%,var(--garage-bg)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--garage-bg)_16%)]
            [--aurora:repeating-linear-gradient(100deg,#ff4d4d_10%,#3b82f6_20%,#1e40af_30%,#ff7676_40%,#1d4ed8_50%)]
            [background-image:var(--dark-gradient),var(--aurora)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            filter blur-[12px]
            after:content-[""] after:absolute after:inset-0
            after:[background-image:var(--dark-gradient),var(--aurora)]
            after:[background-size:200%,_100%]
            after:animate-aurora
            after:[background-attachment:fixed]
            after:mix-blend-difference
            pointer-events-none
            absolute -inset-[10px] opacity-30 will-change-transform`,
            showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`
          )}
        ></div>
      </div>
      {children}
    </main>
  );
};

// ── Tracing Beam (scroll-follow line for car detail page) ──────────────────────
export function TracingBeam({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (ref.current) setSvgHeight(ref.current.offsetHeight);
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const ratio = Math.min(1, Math.max(0, (windowH - rect.top) / (rect.height + windowH)));
      setProgress(ratio);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const dashArray = svgHeight;
  const dashOffset = svgHeight * (1 - progress);

  return (
    <div className={cn("relative mx-auto max-w-4xl", className)}>
      <div className="absolute -left-4 top-3 hidden md:block">
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight}
          className="overflow-visible"
          aria-hidden="true"
        >
          <path d={`M 1 0 V ${svgHeight}`} fill="none" stroke="#e2e8f0" strokeWidth="1.5" />
          <path
            d={`M 1 0 V ${svgHeight}`}
            fill="none"
            stroke="url(#beamGrad)"
            strokeWidth="2"
            strokeDasharray={dashArray}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.05s linear" }}
          />
          <defs>
            <linearGradient id="beamGrad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%"   stopColor="#ff4d4d" stopOpacity="0" />
              <stop offset="50%"  stopColor="#ff4d4d" />
              <stop offset="100%" stopColor="#ff7676" stopOpacity="0" />
            </linearGradient>
          </defs>
          <circle
            cx="1"
            cy={progress * svgHeight}
            r="4"
            fill="#ff4d4d"
            filter="url(#glow)"
          />
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>
      </div>
      <div ref={ref}>{children}</div>
    </div>
  );
}

// ── Floating Card (for trust badges in hero) ──────────────────────────────────
export function FloatingCard({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div
      className={cn("animate-float", className)}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}
