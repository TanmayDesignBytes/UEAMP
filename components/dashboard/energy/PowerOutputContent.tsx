"use client";

import { useState } from "react";
import { GlassCard } from "@/components/dashboard/common/Cards";
import { PeriodSelect } from "@/components/dashboard/common/PeriodSelect";
import { StatusBar } from "@/components/dashboard/common/StatusBar";
import { useDevLifecycleLog } from "@/components/dashboard/devDiagnostics";

type EnergySeries = {
  generated: boolean;
  consumed: boolean;
};

type TrendSeries = {
  solar: boolean;
  grid: boolean;
  bess: boolean;
  genset: boolean;
};

export function PowerOutputContent() {
  const [energySeries, setEnergySeries] = useState<EnergySeries>({ generated: true, consumed: true });
  const [trendSeries, setTrendSeries] = useState<TrendSeries>({ solar: true, grid: true, bess: true, genset: true });
  useDevLifecycleLog(9);

  const toggleEnergySeries = (series: keyof EnergySeries) => {
    setEnergySeries((current) => ({ ...current, [series]: !current[series] }));
  };

  const toggleTrendSeries = (series: keyof TrendSeries) => {
    setTrendSeries((current) => ({ ...current, [series]: !current[series] }));
  };

  return (
    <div className="power-content mx-auto min-h-dvh w-full max-w-[393px] px-4 pb-[120px] min-[900px]:grid min-[900px]:max-w-[1500px] min-[900px]:grid-cols-[repeat(auto-fit,minmax(360px,1fr))] min-[900px]:items-start min-[900px]:content-start min-[900px]:gap-6 min-[900px]:px-8">
      <StatusBar />
      <h1 className="power-title ml-1 mt-[21px] w-[244px] font-poppins text-xl font-semibold leading-[30px] text-[#f2f2f2] min-[900px]:col-span-full">Power Output</h1>

      <GlassCard className="power-output-card power-output-card--energy flex h-[386px] w-full flex-col items-center justify-center gap-4 p-5 min-[900px]:h-[440px] min-[900px]:justify-start">
        <div className="power-card-header flex h-[30px] w-full shrink-0 items-center justify-between">
          <h2>Energy Generated Vs Consumed</h2>
          <PeriodSelect />
        </div>

        <PowerOutputChart series={energySeries} />

        <div className="power-series-control grid h-11 w-full shrink-0 grid-cols-[1fr_1px_1fr] items-center rounded-full bg-white/[.04]" aria-label="Chart series">
          <button className="series-toggle" type="button" aria-pressed={energySeries.generated} onClick={() => toggleEnergySeries("generated")}>
            <span className="series-switch series-switch--generated relative block h-6 w-[46px] rounded-full"><i /></span>
            <small>Generated</small>
          </button>
          <span className="series-divider h-[18px] w-px bg-white/10" />
          <button className="series-toggle" type="button" aria-pressed={energySeries.consumed} onClick={() => toggleEnergySeries("consumed")}>
            <span className="series-switch series-switch--consumed relative block h-6 w-[46px] rounded-full"><i /></span>
            <small>Consumed</small>
          </button>
        </div>
      </GlassCard>

      <GlassCard className="power-output-card power-output-card--trends mt-[10px] flex h-[400px] w-full flex-col items-center justify-center gap-4 p-5 min-[900px]:mt-0 min-[900px]:h-[440px] min-[900px]:justify-start">
        <div className="power-card-header flex h-[30px] w-full shrink-0 items-center justify-between">
          <h2>Performance Trends</h2>
          <PeriodSelect />
        </div>

        <PerformanceTrendsChart series={trendSeries} />

        <div className="power-trends-legend" aria-label="Performance trend sources">
          <button className="series-toggle" type="button" aria-pressed={trendSeries.solar} onClick={() => toggleTrendSeries("solar")}>
            <span className="series-switch series-switch--solar relative block h-6 w-[46px] rounded-full"><i /></span>
            <small>Solar</small>
          </button>
          <button className="series-toggle" type="button" aria-pressed={trendSeries.grid} onClick={() => toggleTrendSeries("grid")}>
            <span className="series-switch series-switch--grid relative block h-6 w-[46px] rounded-full"><i /></span>
            <small>Grid</small>
          </button>
          <button className="series-toggle" type="button" aria-pressed={trendSeries.bess} onClick={() => toggleTrendSeries("bess")}>
            <span className="series-switch series-switch--bess relative block h-6 w-[46px] rounded-full"><i /></span>
            <small>BESS</small>
          </button>
          <button className="series-toggle" type="button" aria-pressed={trendSeries.genset} onClick={() => toggleTrendSeries("genset")}>
            <span className="series-switch series-switch--genset relative block h-6 w-[46px] rounded-full"><i /></span>
            <small>Genset</small>
          </button>
        </div>
      </GlassCard>

      <GlassCard className="power-output-card power-output-card--peak mt-[10px] flex h-[340px] w-full flex-col items-center justify-center gap-4 px-5 pb-[26px] pt-5 min-[900px]:mt-0 min-[900px]:h-[440px] min-[900px]:justify-start">
        <div className="power-card-header flex h-[30px] w-full shrink-0 items-center justify-between">
          <h2>Peak Demand</h2>
          <PeriodSelect />
        </div>

        <PeakDemandChart />
      </GlassCard>
    </div>
  );
}

export function PowerOutputChart({ series = { generated: true, consumed: true } }: { series?: EnergySeries } = {}) {
  const xLabels = ["6am", "9am", "12am", "3pm", "6pm", "9pm", "12pm"];
  const yLabels = ["50 kWh", "40 kWh", "30 kWh", "20 kWh", "10 kWh", "0"];

  return (
    <svg className="power-output-chart" viewBox="0 0 332 250" role="img" aria-label="Generated and consumed energy throughout the day">
      <defs>
        <linearGradient id="generated-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5ECD0D" stopOpacity="0.7" />
          <stop offset="1" stopColor="#5ECD0D" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="consumed-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#22B5FF" stopOpacity="0.17" />
          <stop offset="1" stopColor="#22B5FF" stopOpacity="0" />
        </linearGradient>
      </defs>

      <image href="/assets/power/power-grid.svg" x="39" y="16" width="293" height="213" preserveAspectRatio="none" />
      {yLabels.map((label, index) => <text key={label} x="34" y={28 + index * 37} textAnchor="end" className="power-axis-label">{label}</text>)}
      {xLabels.map((label, index) => <text key={label} x={56 + index * 44} y="246" textAnchor="middle" className="power-axis-label">{label}</text>)}

      {series.generated && (
        <>
          <path d="M39 229 C75 229 86 209 103 143 C119 82 137 63 168 62 C201 61 220 76 235 139 C249 199 275 222 332 229 L332 229 L39 229 Z" fill="url(#generated-area)" fillOpacity="0.25" />
          <path d="M39 229 C75 229 86 209 103 143 C119 82 137 63 168 62 C201 61 220 76 235 139 C249 199 275 222 332 229" fill="none" stroke="#21A17D" strokeWidth="2.5" strokeLinecap="round" />
        </>
      )}
      {series.consumed && (
        <>
          <path d="M39 229 C78 229 94 211 114 171 C130 140 149 126 176 126 C202 126 222 141 242 178 C260 211 284 224 332 229 L332 229 L39 229 Z" fill="url(#consumed-area)" />
          <path d="M39 229 C78 229 94 211 114 171 C130 140 149 126 176 126 C202 126 222 141 242 178 C260 211 284 224 332 229" fill="none" stroke="#0087CE" strokeWidth="2.5" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}


function PerformanceTrendsChart({ series }: { series: TrendSeries }) {
  const xLabels = ["6am", "9am", "12am", "3pm", "6pm", "9pm", "12pm"];
  const stacks = [
    [5, 10, 10, 27],
    [15, 6, 5, 3],
    [5, 10, 10, 27],
    [10, 2, 9, 25],
    [5, 10, 10, 27],
    [5, 10, 10, 27],
    [5, 10, 10, 27],
  ];

  return (
    <svg className="power-output-chart power-output-chart--bars" viewBox="0 0 321 181" role="img" aria-label="Performance trends by source">
      <defs>
        <linearGradient id="trend-solar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9CCCFA" />
          <stop offset="1" stopColor="#9CCCFA" />
        </linearGradient>
        <linearGradient id="trend-grid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5AAAF0" />
          <stop offset="1" stopColor="#5AAAF0" />
        </linearGradient>
        <linearGradient id="trend-bess" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#298DE2" />
          <stop offset="1" stopColor="#298DE2" />
        </linearGradient>
        <linearGradient id="trend-genset" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1774D1" />
          <stop offset="1" stopColor="#1774D1" />
        </linearGradient>
      </defs>

      {[50, 40, 30, 20, 10].map((tick, index) => (
        <text key={tick} x="28" y={20 + index * 30} textAnchor="end" className="power-axis-label">{tick} kWh</text>
      ))}
      {xLabels.map((label, index) => (
        <text key={label} x={46 + index * 44} y="174" textAnchor="middle" className="power-axis-label">{label}</text>
      ))}
      <line x1="38" y1="146" x2="312" y2="146" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />

      {stacks.map((stack, index) => {
        const x = 35 + index * 44;
        const baseY = 146;
        let currentY = baseY;
        const segments = [
          { active: series.genset, fill: "url(#trend-genset)", value: stack[0] },
          { active: series.bess, fill: "url(#trend-bess)", value: stack[1] },
          { active: series.grid, fill: "url(#trend-grid)", value: stack[2] },
          { active: series.solar, fill: "url(#trend-solar)", value: stack[3] },
        ].filter((segment) => segment.active);

        return (
          <g key={xLabels[index]}>
            {segments.map((segment, segmentIndex) => {
              const height = segment.value * 2.55;
              currentY -= height;
              const isTopSegment = segmentIndex === segments.length - 1;
              const radius = Math.min(4, height / 2);
              if (isTopSegment) {
                return (
                  <path
                    key={segmentIndex}
                    d={`M${x} ${currentY + height}V${currentY + radius}Q${x} ${currentY} ${x + radius} ${currentY}H${x + 18 - radius}Q${x + 18} ${currentY} ${x + 18} ${currentY + radius}V${currentY + height}Z`}
                    fill={segment.fill}
                  />
                );
              }
              return (
                <rect
                  key={segmentIndex}
                  x={x}
                  y={currentY}
                  width="18"
                  height={height}
                  fill={segment.fill}
                />
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}

function PeakDemandChart() {
  const xLabels = ["6am", "9am", "12am", "3pm", "6pm", "9pm", "12pm"];
  const values = [22, 28, 24, 50, 21, 50, 26];
  const yLabels = ["50 kWh", "40 kWh", "30 kWh", "20 kWh", "10 kWh"];
  const plotTop = 24;
  const plotBottom = 146;
  const plotHeight = plotBottom - plotTop;

  return (
    <svg className="power-output-chart power-output-chart--peak" viewBox="0 0 321 169" role="img" aria-label="Peak demand through the day">
      {yLabels.map((label, index) => (
        <text key={label} x="28" y={24 + index * 30} textAnchor="end" className="power-axis-label">{label}</text>
      ))}
      {xLabels.map((label, index) => (
        <text key={label} x={46 + index * 44} y="166" textAnchor="middle" className="power-axis-label">{label}</text>
      ))}
      <line x1="38" y1={plotBottom - (42 / 50) * plotHeight} x2="312" y2={plotBottom - (42 / 50) * plotHeight} stroke="#2D8CFF" strokeWidth="2" strokeDasharray="7 6" />
      <line x1="38" y1={plotBottom} x2="312" y2={plotBottom} stroke="rgba(255,255,255,0.14)" strokeWidth="1" />

      {values.map((value, index) => {
        const x = 35 + index * 44;
        const height = (value / 50) * plotHeight;
        const y = plotBottom - height;
        const fill = value >= 40 ? "#F47F7F" : "#2D8CFF";
        return <rect key={xLabels[index]} x={x} y={y} width="18" height={height} rx="4" fill={fill} />;
      })}
    </svg>
  );
}
