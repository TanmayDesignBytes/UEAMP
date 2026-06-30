import type { ReactNode } from "react";

export function GlassCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <article className={"glass-card rounded-[20px] backdrop-blur-[21px] " + className}>{children}</article>;
}

export function EnergyCard({ accent, arrowAccent, barAccent, bars, footer, title, unit, value }: { accent: string; arrowAccent?: string; barAccent?: string; bars: number[]; footer: string; title: string; unit: string; value: string }) {
  const barOpacity = [0.1, 0.2, 0.3, 0.4, 0.8, 0.4, 0.2, 0.8, 0.4, 0.3, 0.2];
  return (
    <GlassCard className="energy-card flex min-w-0 flex-col overflow-hidden">
      <h2>{title}</h2>
      <div className="energy-value flex items-baseline"><strong>{value}</strong><span>{unit}</span><b style={{ color: arrowAccent || accent }}>{"\u2191"}</b></div>
      <div className="energy-chart-region flex w-full flex-col">
        <div className="bar-chart flex items-end" aria-hidden="true">
          {bars.map((height, index) => <i key={title + index} style={{ height: String(height) + "%", background: barAccent || accent, opacity: barOpacity[index] }} />)}
        </div>
        <p>{footer}</p>
      </div>
    </GlassCard>
  );
}

export function Metric({ detail, label, labelDetail, value }: { detail?: string; label: string; labelDetail?: string; value: string }) {
  return <div className="metric flex min-w-0 flex-1 flex-col"><span>{label}{labelDetail && <small className="metric-label-detail"> {labelDetail}</small>}</span><strong>{value}</strong>{detail && <small>{detail}</small>}</div>;
}

export function PerformanceItem({ color, name, percentage, value }: { color: string; name: string; percentage: string; value: string }) {
  return (
    <li>
      <i style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
      <span>{name} :</span>
      <strong>{value} <small>{percentage}</small></strong>
    </li>
  );
}

export function GensetCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <article className={`rounded-[20px] border-2 border-white/20 bg-[linear-gradient(124deg,rgba(255,255,255,0)_-22.38%,rgba(255,255,255,.10)_70.38%)] backdrop-blur-[21px] ${className}`}>{children}</article>;
}

export function GensetStat({ label, value }: { label: string; value: string }) {
  return <div className="flex flex-col items-center"><strong className="font-inter text-2xl font-semibold leading-[30px]">{value}</strong><span className="text-[10px] text-[#c8cace]">{label}</span></div>;
}
