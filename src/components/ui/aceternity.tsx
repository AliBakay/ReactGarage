"use client";
import { cn } from "../../lib/utils";
import { useEffect, useRef, useState } from "react";

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
        "relative flex flex-col min-h-screen items-center justify-center bg-garage-bg text-garage-text transition-bg",
        className
      )}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={cn(
            `
            [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
            [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]
            [--aurora:repeating-linear-gradient(100deg,var(--yellow-500)_10%,var(--amber-600)_15%,var(--orange-400)_20%,var(--amber-700)_25%,var(--yellow-600)_30%)]
            [background-image:var(--dark-gradient),var(--aurora)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            filter blur-[10px] invert-0
            after:content-[""] after:absolute after:inset-0
            after:[background-image:var(--dark-gradient),var(--aurora)]
            after:[background-size:200%,_100%]
            after:animate-aurora
            after:[background-attachment:fixed]
            after:mix-blend-difference
            pointer-events-none
            absolute -inset-[10px] opacity-40 will-change-transform`,
            showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`
          )}
        ></div>
      </div>
      {children}
    </main>
  );
};

// Tracing Beam Component
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
          <path
            d={`M 1 0 V ${svgHeight}`}
            fill="none"
            stroke="#232529"
            strokeWidth="1.5"
          />
          <path
            d={`M 1 0 V ${svgHeight}`}
            fill="none"
            stroke="url(#beamGrad)"
            strokeWidth="1.5"
            strokeDasharray={dashArray}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.05s linear" }}
          />
          <defs>
            <linearGradient id="beamGrad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#c9a84c" stopOpacity="0" />
              <stop offset="50%" stopColor="#c9a84c" />
              <stop offset="100%" stopColor="#e85d1e" stopOpacity="0" />
            </linearGradient>
          </defs>
          <circle
            cx="1"
            cy={progress * svgHeight}
            r="4"
            fill="#c9a84c"
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
