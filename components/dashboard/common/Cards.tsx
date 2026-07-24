import type { ReactNode } from "react";

export function GlassCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <article
      className={
        "glass-card rounded-[20px] backdrop-blur-[21px] " + className
      }
    >
      {children}
    </article>
  );
}

export function EnergyCard({
  accent,
  arrowAccent,
  barAccent,
  bars,
  barOpacities,
  footer,
  title,
  unit,
  value,
  variant,
}: {
  accent: string;
  arrowAccent?: string;
  barAccent?: string;
  bars: number[];
  barOpacities?: number[];
  footer: string;
  title: string;
  unit: string;
  value: string;
  variant: "generated" | "consumed";
}) {
  const barOpacity =
    barOpacities || [0.1, 0.2, 0.3, 0.4, 0.8, 0.4, 0.2, 0.8, 0.4, 0.3, 0.2];
  const classes =
    variant === "generated"
      ? {
          card: "generated-energy-card",
          bg: "generated-energy-card-bg",
          content: "generated-energy-card-content",
          title: "generated-energy-card-title",
          value: "generated-energy-value",
          arrow: "generated-energy-value-arrow",
          chartRegion: "generated-energy-chart-region",
          chart: "generated-bar-chart",
          footer: "generated-energy-card-footer",
        }
      : {
          card: "consumed-energy-card",
          bg: "consumed-energy-card-bg",
          content: "consumed-energy-card-content",
          title: "consumed-energy-card-title",
          value: "consumed-energy-value",
          arrow: "consumed-energy-value-arrow",
          chartRegion: "consumed-energy-chart-region",
          chart: "consumed-bar-chart",
          footer: "consumed-energy-card-footer",
        };

  return (
    <article className={classes.card}>
      <img
        src="/assets/glass-card.svg"
        alt=""
        aria-hidden="true"
        className={classes.bg}
      />

      <div className={classes.content}>
        <h2 className={classes.title}>{title}</h2>

        <div className={`${classes.value} flex items-baseline`}>
          <strong>{value}</strong>
          <span>{unit}</span>
          <svg className={classes.arrow} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M9 15V3M13.5 7.5L9 3L4.5 7.5" stroke={arrowAccent || accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div className={`${classes.chartRegion} flex w-full flex-col`}>
          <div className={`${classes.chart} flex items-end`} aria-hidden="true">
            {bars.map((height, index) => (
              <i
                key={title + index}
                style={{
                  height: `${height}%`,
                  background: barAccent || accent,
                  opacity: barOpacity[index],
                }}
              />
            ))}
          </div>

          <p className={classes.footer}>{footer}</p>
        </div>
      </div>
    </article>
  );
}

export function Metric({
  detail,
  label,
  labelDetail,
  value,
}: {
  detail?: string;
  label: string;
  labelDetail?: string;
  value: string;
}) {
  return (
    <div className="metric flex min-w-0 flex-1 flex-col">
      <span>
        {label}
        {labelDetail && (
          <small className="metric-label-detail"> {labelDetail}</small>
        )}
      </span>

      <strong>{value}</strong>

      {detail && <small>{detail}</small>}
    </div>
  );
}

export function PerformanceItem({
  color,
  name,
  percentage,
  value,
}: {
  color: string;
  name: string;
  percentage: string;
  value: string;
}) {
  return (
    <li>
      <i
        style={{
          background: color,
          boxShadow: `0 0 6px ${color}`,
        }}
      />

      <span>{name} :</span>

      <strong>
        {value} <small>{percentage}</small>
      </strong>
    </li>
  );
}

export function GensetCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <article
      className={`rounded-[20px] border-2 border-white/20 bg-[linear-gradient(124deg,rgba(255,255,255,0)_-22.38%,rgba(255,255,255,.10)_70.38%)] backdrop-blur-[21px] ${className}`}
    >
      {children}
    </article>
  );
}

export function GensetStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col items-center">
      <strong className="font-inter text-2xl font-semibold leading-[30px]">
        {value}
      </strong>

      <span className="whitespace-nowrap text-[10px] text-[#c8cace]">
        {label}
      </span>
    </div>
  );
}
