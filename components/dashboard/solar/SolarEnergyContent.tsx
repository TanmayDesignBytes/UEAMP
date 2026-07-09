"use client";

import { useState, type ReactNode } from "react";
import { GlassCard } from "@/components/dashboard/common/Cards";
import { PeriodSelect } from "@/components/dashboard/common/PeriodSelect";
import { StatusBar } from "@/components/dashboard/common/StatusBar";
import { useDevLifecycleLog } from "@/components/dashboard/devDiagnostics";
import { PowerOutputChart } from "@/components/dashboard/energy/PowerOutputContent";

const specificYieldBars = Array.from({ length: 30 }, (_, index) => index < 12);
const dcPowerTileSources = [
  "/assets/solar/dc-power-tiles/tile-blue-primary.svg",
  "/assets/solar/dc-power-tiles/tile-blue-primary.svg",
  "/assets/solar/dc-power-tiles/tile-blue-dark.svg",
  "/assets/solar/dc-power-tiles/tile-blue-dark.svg",
  "/assets/solar/dc-power-tiles/tile-blue-dark.svg",
  "/assets/solar/dc-power-tiles/tile-blue-light.svg",
  "/assets/solar/dc-power-tiles/tile-blue-soft.svg",
  "/assets/solar/dc-power-tiles/tile-blue-light.svg",
  "/assets/solar/dc-power-tiles/tile-blue-mid.svg",
  "/assets/solar/dc-power-tiles/tile-blue-mid.svg",
  "/assets/solar/dc-power-tiles/tile-blue-soft.svg",
  "/assets/solar/dc-power-tiles/tile-blue-soft.svg",
  "/assets/solar/dc-power-tiles/tile-muted.svg",
  "/assets/solar/dc-power-tiles/tile-muted.svg",
  "/assets/solar/dc-power-tiles/tile-muted.svg",
];

const dcSideTabs = [
  { label: "PV Voltage (V)", unit: "V", value: "42.3" },
  { label: "PV Current (Amps)", unit: "Amps", value: "42.3" },
  { label: "DC Power (kW)", unit: "kW", value: "42.3" },
];

export function SolarEnergyContent() {
  const [energySeries, setEnergySeries] = useState({ generated: true, consumed: true });
  useDevLifecycleLog(11);

  const toggleEnergySeries = (series: "generated" | "consumed") => {
    setEnergySeries((current) => ({ ...current, [series]: !current[series] }));
  };

  return (
    <div className="genset-energy-content solar-energy-content mx-auto min-h-dvh w-full max-w-[393px] px-4 pb-[120px] font-jakarta text-white">
      <StatusBar />
      <h1 className="genset-energy-title">Power Output</h1>

      <GlassCard className="genset-energy-card">
        <img className="genset-energy-card-bg" src="/assets/solar/performance-trends-card-frame.svg" alt="" aria-hidden="true" />
        <div className="power-card-header genset-energy-card__header">
          <h2>Performance Trends</h2>
          <PeriodSelect />
        </div>

        <PowerOutputChart series={energySeries} />

        <div className="power-series-control genset-energy-series" aria-label="Chart series">
          <button className="series-toggle" type="button" aria-pressed={energySeries.generated} onClick={() => toggleEnergySeries("generated")}>
            <span className="series-switch series-switch--generated"><i /></span>
            <small>Generated</small>
          </button>
          <span className="series-divider" />
          <button className="series-toggle" type="button" aria-pressed={energySeries.consumed} onClick={() => toggleEnergySeries("consumed")}>
            <span className="series-switch series-switch--consumed"><i /></span>
            <small>Consumed</small>
          </button>
        </div>

        <div className="genset-energy-stat-grid">
          <article>
            <h3>Daily Consumption</h3>
            <p><strong>9.3</strong> <span>kWh</span></p>
          </article>
          <article>
            <h3>Peak Usage</h3>
            <p><strong>5.5</strong> <span>kWh at 12 PM</span></p>
          </article>
        </div>

        <article className="genset-weekly-summary">
          <h3>Weekly Trend Summary</h3>
          <span className="genset-energy-horizontal-line" />
          <div>
            <SolarEnergyMetric label="Weekly Avg" value="64.6" unit="kWh" />
            <span className="metric-divider genset-energy-divider" />
            <SolarEnergyMetric label="Highest" value="78.9" unit="kWh" />
            <span className="metric-divider genset-energy-divider" />
            <SolarEnergyMetric label="Lowest" value="43.5" unit="kWh" />
          </div>
        </article>
      </GlassCard>

      <SpecificYieldCard />
      <div className="solar-energy-metric-grid">
        <FrequencyCard />
        <PowerFactorCard />
        <AverageVoltageCard />
        <SolarInfoCard className="solar-current-card" title="Current" value="42.3" unit="Amps" icon={<CurrentIcon />} />
        <SolarInfoCard className="solar-module-temp-card" title="Module Temp" value="50" unit="°C" icon={<ModuleTempIcon />} />
      </div>
      <DcSideCard />
    </div>
  );
}

function SpecificYieldCard() {
  return (
    <article className="solar-specific-yield-card">
      <h2>Specific Yield</h2>
      <div className="solar-specific-yield-card__body">
        <div className="solar-specific-yield-card__gauge">
          <div className="solar-specific-yield-card__bars" aria-hidden="true">
            {specificYieldBars.map((active, index) => <span className={active ? "is-active" : undefined} key={index} />)}
          </div>
          <div className="solar-specific-yield-card__labels" aria-hidden="true">
            <span>Low</span>
            <span>Ideal</span>
          </div>
        </div>
        <p><strong>42.3</strong> <span>kWh/kWp</span></p>
      </div>
    </article>
  );
}

function FrequencyCard() {
  return (
    <article className="solar-frequency-card">
      <div>
        <h2>Frequency</h2>
        <p><strong>42.3</strong> <span>Hz</span></p>
      </div>
      <img src="/assets/solar/frequency-sparkline.svg" alt="" aria-hidden="true" />
    </article>
  );
}

function PowerFactorCard() {
  return (
    <article className="solar-power-factor-card">
      <div>
        <h2>Power Factor</h2>
        <p>-0.56</p>
      </div>
      <span aria-hidden="true"><img src="/assets/solar/power-factor-icon.svg" alt="" /></span>
    </article>
  );
}

function AverageVoltageCard() {
  return (
    <article className="solar-average-voltage-card">
      <h2>Average Voltage</h2>
      <div className="solar-average-voltage-row">
        <div className="solar-average-voltage-values">
          <SolarVoltageStat value="5" label="(P-P)" />
          <span className="metric-divider solar-average-voltage-divider" />
          <SolarVoltageStat value="15" label="(P-N)" />
        </div>
        <img className="solar-plug-icon" src="/assets/solar/average-voltage-icon.svg" alt="" aria-hidden="true" />
      </div>
    </article>
  );
}

function SolarInfoCard({ className, icon, title, unit, value }: { className?: string; icon: ReactNode; title: string; unit?: string; value: string }) {
  return (
    <article className={["solar-info-card", className].filter(Boolean).join(" ")}>
      <div>
        <h2>{title}</h2>
        <p><strong>{value}</strong>{unit && <span>{unit}</span>}</p>
      </div>
      {icon}
    </article>
  );
}

function DcSideCard() {
  const [activeTab, setActiveTab] = useState(2);
  const activeMetric = dcSideTabs[activeTab];

  return (
    <article className="solar-dc-side-card">
      <img className="solar-dc-side-card__frame" src="/assets/solar/dc-side-card-frame.svg" alt="" aria-hidden="true" />
      <h2>DC Side (PV Array)</h2>
      <div className="solar-dc-side-card__body">
        <div className="solar-dc-side-card__tabs" aria-label="DC side metrics">
          {dcSideTabs.map((tab, index) => (
            <button
              aria-pressed={activeTab === index}
              className={activeTab === index ? "is-active" : undefined}
              key={tab.label}
              onClick={() => setActiveTab(index)}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>
        <p><strong>{activeMetric.value}</strong> <span>{activeMetric.unit}</span></p>
        <div className="solar-dc-power-grid" aria-hidden="true">
          {dcPowerTileSources.map((src, index) => (
            <img key={`${src}-${index}`} src={src} alt="" />
          ))}
        </div>
      </div>
    </article>
  );
}

function SolarVoltageStat({ label, value }: { label: string; value: string }) {
  return (
    <p className="solar-voltage-stat">
      <strong>{value}</strong> <span>V</span>
      <small>{label}</small>
    </p>
  );
}

function CurrentIcon() {
  return (
    <svg className="solar-current-icon" width="36" height="50" viewBox="0 0 36 50" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g filter="url(#solar-current-filter)">
        <path d="M23.4093 16.62C22.5548 17.1563 21.5526 17.0978 21.1708 16.4893C20.789 15.8809 21.1983 15.9604 22.0266 14.4167C22.8811 13.8805 29.5728 5.25022 29.9546 5.85864C30.3364 6.46705 24.2638 16.0838 23.4093 16.62Z" fill="#0048FF" />
      </g>
      <path d="M25.0139 10.3858C22.2208 13.3749 17.9086 18.0137 15.3932 20.6925C12.8941 23.3712 10.885 25.5927 10.9341 25.6417C10.9831 25.6907 12.2244 25.5437 13.6782 25.315C15.1482 25.1026 16.3733 24.9393 16.3896 24.9556C16.4223 24.9883 14.7889 27.4547 12.7798 30.4602C10.7544 33.4493 9.13732 35.932 9.16999 35.9647C9.20265 35.9974 10.4114 35.8667 11.8651 35.6707C13.3188 35.491 14.5439 35.3604 14.5765 35.393C14.6092 35.4257 13.0901 37.9084 11.1954 40.9139C9.28432 43.9193 7.22625 47.1698 6.60556 48.1662L5.47852 49.9629L8.14095 47.2678C9.611 45.7814 13.3188 41.9919 16.3569 38.8558C23.7399 31.2605 24.2625 30.7052 24.2299 30.6562C24.2135 30.6398 22.9885 30.7378 21.5021 30.8685C20.0321 30.9992 18.7743 31.0809 18.6927 31.0645C18.6273 31.0319 20.5874 28.4511 23.0538 25.2986C25.5203 22.1625 27.513 19.5818 27.4967 19.5654C27.4803 19.5328 26.0266 19.9248 24.2789 20.3985C22.5311 20.8885 20.9631 21.2805 20.8161 21.2968C20.6201 21.2968 21.8615 19.0754 25.0466 13.6525C27.513 9.45473 29.6854 5.77959 29.8651 5.48558C30.0448 5.2079 30.1591 4.96289 30.1264 4.96289C30.0938 4.96289 27.7907 7.41298 25.0139 10.3858Z" fill="url(#solar-current-bolt-gradient)" />
      <path d="M15.7529 9.53648C10.967 10.1408 6.47521 12.7543 3.55143 16.6417C2.44073 18.0955 1.03601 21.0029 0.594991 22.6853C-0.9404 28.6799 0.529655 34.8051 4.61314 39.3786C5.54417 40.424 7.45525 42.041 7.76559 42.041C7.81459 42.041 8.22294 41.4367 8.64762 40.7016L9.43165 39.3786L8.81096 38.8886C6.1322 36.7488 4.12312 33.531 3.42076 30.1989C3.07775 28.5655 3.20842 24.9067 3.68211 23.2897C4.38446 20.8559 5.80552 18.5528 7.63492 16.7887C8.8763 15.6127 9.742 15.0083 11.3264 14.2243C13.3681 13.1953 14.5605 12.9339 17.5006 12.8523L20.0977 12.8033L21.3718 11.4312L22.6458 10.0592L21.5351 9.79782C20.1467 9.48748 17.2066 9.34047 15.7529 9.53648Z" fill="url(#solar-current-ring-gradient-a)" />
      <path d="M27.0396 13.8808C26.3209 15.0895 26.2229 15.3345 26.4352 15.4815C29.0487 17.4416 30.9107 20.1367 31.8908 23.3381C32.2991 24.6612 32.3318 25.0532 32.3318 27.2583C32.3318 29.2673 32.2664 29.9534 31.9724 31.0151C31.2374 33.7592 29.898 35.9479 27.7419 37.9733C24.9325 40.6031 21.3064 41.9751 17.4679 41.8445L15.9488 41.7955L14.6421 43.1022C13.8091 43.9352 13.4171 44.4416 13.5314 44.5069C14.0051 44.8009 16.6349 45.0133 18.7256 44.9316C20.3753 44.8663 21.3064 44.7356 22.4661 44.4252C28.9017 42.6448 33.7528 37.614 35.3372 31.0641C35.7782 29.2347 35.7456 24.7755 35.2556 23.0114C34.2919 19.418 32.6911 16.7719 29.9144 14.1421C27.8726 12.1984 28.0523 12.2147 27.0396 13.8808Z" fill="url(#solar-current-ring-gradient-b)" />
      <defs>
        <filter id="solar-current-filter" x="15.199" y="0.000262737" width="20.6008" height="22.8149" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="2.91393" result="effect1_foregroundBlur_3220_23737" />
        </filter>
        <linearGradient id="solar-current-bolt-gradient" x1="30.0764" y1="27.4629" x2="3.89366" y2="27.3783" gradientUnits="userSpaceOnUse">
          <stop stopColor="#004DFF" />
          <stop offset="1" stopColor="#BFD4FE" />
        </linearGradient>
        <linearGradient id="solar-current-ring-gradient-a" x1="22.5948" y1="25.7443" x2="-1.45564" y2="25.6459" gradientUnits="userSpaceOnUse">
          <stop stopColor="#004DFF" />
          <stop offset="1" stopColor="#BFD4FE" />
        </linearGradient>
        <linearGradient id="solar-current-ring-gradient-b" x1="35.597" y1="28.8027" x2="12.0892" y2="28.7077" gradientUnits="userSpaceOnUse">
          <stop stopColor="#004DFF" />
          <stop offset="1" stopColor="#BFD4FE" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function ModuleTempIcon() {
  return <img className="solar-module-temp-icon" src="/assets/solar/module-temp-icon.svg" alt="" aria-hidden="true" />;
}

function SolarEnergyMetric({ label, unit, value }: { label: string; unit: string; value: string }) {
  return (
    <div className="genset-energy-metric">
      <span>{label}</span>
      <p><strong>{value}</strong> <small>{unit}</small></p>
    </div>
  );
}
