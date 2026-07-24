import type { ReactNode } from "react";
import { StatusBar } from "@/components/dashboard/common/StatusBar";
import { overviewAssets } from "@/components/dashboard/constants";
import { useDevLifecycleLog } from "@/components/dashboard/devDiagnostics";

const generatedBars = [45, 64, 78, 58, 88, 72, 39, 23, 65, 82, 61, 44];

export function SolarContent({ onOpenAmbientTemperature }: { onOpenAmbientTemperature: () => void }) {
  useDevLifecycleLog(8);

  return (
    <div className="solar-content mx-auto min-h-dvh w-full max-w-[393px] px-[15px] pb-[calc(120px+env(safe-area-inset-bottom))] font-jakarta text-white">
      <StatusBar />
      <header className="solar-header mt-2 flex items-start justify-between">
        <div>
          <h1>Hi User Name</h1>
          <p>Good Afternoon!</p>
        </div>
        <button className="overview-weather-pill" type="button" onClick={onOpenAmbientTemperature} aria-label="Open ambient temperature details">
          <span className="overview-weather-value">{"74\u00b0 F"}</span>
          <img className="overview-weather-icon" src={overviewAssets + "/cloud_sun.svg"} alt="Partly cloudy" />
        </button>
      </header>

      <div className="solar-running mt-2 flex items-center gap-2">
        <span />
        <p>Solar Running</p>
      </div>

      <section className="solar-hero relative mt-3 overflow-hidden" aria-label="Solar microgrid overview">
        <img className="size-full object-cover" src="/assets/solar/solar-microgrid.gif" alt="Solar plant and energy system" />
        <div className="solar-hero__metric">
          <strong>28.2 kWh</strong>
          <span>20.1 kg - CO₂</span>
        </div>
      </section>

      <div className="solar-page-grid mt-2.5 flex flex-col gap-2.5">
        <SolarGlassCard className="solar-generated-card relative h-[130px] px-[25px] py-4">
          <div>
            <p className="solar-card-label">Energy Generated</p>
            <div className="mt-2 flex items-baseline gap-2">
              <strong className="font-inter text-[40px] font-semibold leading-[48px]">35</strong>
              <span className="font-inter text-xl font-semibold">kWh</span>
            </div>
            <p className="mt-1 font-inter text-sm leading-[18px]">18 kWh Yesterday</p>
          </div>
          <MiniBarChart bars={generatedBars} />
        </SolarGlassCard>

        <SolarGlassCard className="grid-status-card">
          <img className="grid-status-card__frame" src="/assets/solar/grid-status-card-frame.svg" alt="" aria-hidden="true" />
          <h2>Grid Status</h2>
          <div className="grid-status-card__metrics">
            <SolarMetric value="15" unit="kWh" label="Energy Imported" />
            <span className="solar-grid-divider" />
            <SolarMetric value="45" unit="kWh" label="Energy Exported" />
            <PowerTowerIcon />
          </div>
        </SolarGlassCard>

        <div className="solar-small-grid grid grid-cols-2 gap-2.5">
          <SolarGlassCard className="solar-small-card solar-capacity-card h-[144px] px-4 py-[15px]">
            <img className="solar-capacity-card__frame" src="/assets/solar/capacity-utilization-card-frame.svg" alt="" aria-hidden="true" />
            <h2>Capacity Utilization Factor</h2>
            <strong>18.6%</strong>
            <SegmentGauge />
          </SolarGlassCard>

          <SolarGlassCard className="solar-small-card solar-performance-card h-[144px] px-4 py-[15px]">
            <img className="solar-performance-card__frame" src="/assets/solar/performance-ratio-card-frame.svg" alt="" aria-hidden="true" />
            <h2>Performance Ratio</h2>
            <strong>75%</strong>
            <SolarSparkline />
          </SolarGlassCard>

          <SolarGlassCard className="solar-small-card solar-irradiance-card h-[92px] px-4 py-[13px]">
            <h2>Solar Irradiance</h2>
            <div className="mt-2 flex items-center justify-between">
              <strong>847 <small>W/m2</small></strong>
              <SunIcon />
            </div>
          </SolarGlassCard>

          <SolarGlassCard className="solar-small-card solar-energy-consumed-card h-[92px] px-4 py-[13px]">
            <h2>Energy Consumed</h2>
            <div className="mt-2 flex items-center justify-between">
              <strong>234 <small>kWh</small></strong>
              <EnergyLoopIcon />
            </div>
          </SolarGlassCard>
        </div>

        <SolarGlassCard className="co2-card solar-co2-card relative flex h-[134px] w-full items-center px-[22px] py-[15px]">
          <img className="co2-card-bg" src="/assets/solar/co2-card-frame.svg" alt="" aria-hidden="true" />
          <div>
            <h2>CO2 Emission Avoided</h2>
            <strong>1,248 Tons</strong>
            <svg className="co2-divider" xmlns="http://www.w3.org/2000/svg" width="169" height="1" viewBox="0 0 169 1" fill="none" aria-hidden="true">
              <path d="M0.5 0.5H167.529" stroke="white" strokeOpacity="0.1" strokeLinecap="round" />
            </svg>
            <p>Equivalent to 56000 trees</p>
          </div>
          <img src={overviewAssets + "/co2_leaf.svg"} alt="" />
        </SolarGlassCard>
      </div>
    </div>
  );
}

function SolarGlassCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <article className={"solar-glass-card rounded-[20px] " + className}>{children}</article>;
}

function SolarMetric({ label, unit, value }: { label: string; unit: string; value: string }) {
  return (
    <div className="solar-metric">
      <div><strong>{value}</strong><span>{unit}</span></div>
      <p>{label}</p>
    </div>
  );
}

function MiniBarChart({ bars }: { bars: number[] }) {
  return (
    <div className="mini-bar-chart" aria-hidden="true">
      {bars.map((height, index) => (
        <i key={index} style={{ height: `${height}%`, opacity: index === 6 ? 0.9 : 0.24 + (index % 4) * 0.16 }} />
      ))}
    </div>
  );
}

function SegmentGauge() {
  return (
    <div className="segment-gauge" aria-label="18.6 percent utilization">
      <img className="segment-gauge__pointer" src="/assets/solar/capacity-gauge-pointer.svg" alt="" aria-hidden="true" />
      <img className="segment-gauge__bars" src="/assets/solar/capacity-gauge-bars.svg" alt="" aria-hidden="true" />
      <b>0</b>
      <em>100%</em>
    </div>
  );
}

function SolarSparkline() {
  return <img className="solar-sparkline" src="/assets/solar/performance-ratio-chart.svg" alt="Performance rising trend" />;
}

function PowerTowerIcon() {
  return <img className="power-tower-icon" src="/assets/solar/power-tower.svg" alt="" aria-hidden="true" />;
}

function SunIcon() {
  return <img className="solar-sun-icon" src="/assets/solar/sun-fill.svg" alt="" aria-hidden="true" />;
}

function EnergyLoopIcon() {
  return <img className="energy-loop-icon" src="/assets/solar/energy-consumed-icon.svg" alt="" aria-hidden="true" />;
}
