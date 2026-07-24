import { useState } from "react";

/**
 * Energy Generated Vs Consumed — single-file React component.
 * Copy-paste this whole file into a React sandbox (e.g. CodeSandbox App.js)
 * and it renders as-is. No external CSS, assets, or UI libraries required.
 */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Plus+Jakarta+Sans:wght@400;700&display=swap');

.energy-stage {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background: radial-gradient(120% 120% at 50% 0%, #0b1020 0%, #04060e 60%, #010208 100%);
}

.energy-card {
  --card-fill: linear-gradient(124deg, rgba(255,255,255,0) -22.38%, rgba(255,255,255,0.04) 70.38%);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 361px;
  padding: 20px;
  border-radius: 20px;
  border: 2px solid rgba(255,255,255,0.10);
  background: var(--card-fill), rgba(255,255,255,0.02);
  backdrop-filter: blur(21px);
  -webkit-backdrop-filter: blur(21px);
  box-shadow: 0 24px 60px rgba(0,0,0,0.45);
  font-family: "Plus Jakarta Sans", system-ui, sans-serif;
}

.energy-card * { box-sizing: border-box; }

.energy-card__header {
  display: flex; align-items: center; justify-content: space-between;
  height: 30px; gap: 8px;
}
.energy-card__header h2 {
  margin: 0; color: #fff; opacity: 0.85;
  font-family: "Plus Jakarta Sans", sans-serif;
  font-size: 14px; font-weight: 700; line-height: normal; white-space: nowrap;
}
.energy-card__period {
  display: inline-flex; align-items: center; gap: 10px;
  height: 30px; padding: 0 14px; border-radius: 100px;
  border: 1px solid rgba(255,255,255,0.12); background: rgba(255,255,255,0.04);
  color: #fff; font-family: "Plus Jakarta Sans", sans-serif;
  font-size: 13px; font-weight: 700; cursor: pointer;
}

.energy-chart { display: block; width: 100%; height: auto; }
.energy-axis-label { fill: #d0d5dd; font-family: Inter, sans-serif; font-size: 9px; font-weight: 500; }

.series-control {
  display: grid; width: 100%; height: 44px;
  grid-template-columns: 1fr 1px 1fr; align-items: center;
  border-radius: 100px; background: rgba(255,255,255,0.04);
}
.series-toggle {
  display: flex; align-items: center; justify-content: center; gap: 10px;
  padding: 0; border: 0; background: transparent; color: inherit; font: inherit; cursor: pointer;
}
.series-toggle small {
  color: rgba(255,255,255,0.8); opacity: 0.85;
  font-family: "Plus Jakarta Sans", sans-serif; font-size: 13px; font-weight: 400;
  transition: opacity 220ms ease;
}
.series-divider { width: 1px; height: 18px; background: rgba(255,255,255,0.12); }

.series-switch {
  position: relative; display: block; width: 46px; height: 24px;
  border-radius: 100px; transition: background-color 220ms ease;
}
.series-switch--generated { background: #22ae87; }
.series-switch--consumed  { background: #159ee0; }
.series-switch i {
  position: absolute; top: 3px; left: 3px; width: 18px; height: 18px;
  border-radius: 50%; background: #fff; transform: translateX(22px);
  transition: transform 220ms cubic-bezier(0.22,1,0.36,1);
}
.series-toggle[aria-pressed="false"] .series-switch { background: rgba(255,255,255,0.16); }
.series-toggle[aria-pressed="false"] .series-switch i { transform: translateX(0); }
.series-toggle[aria-pressed="false"] small { opacity: 0.45; }
`;

function EnergyChart({ series }) {
  const xLabels = ["6am", "9am", "12am", "3pm", "6pm", "9pm", "12pm"];
  const yLabels = ["50 kWh", "40 kWh", "30 kWh", "20 kWh", "10 kWh", "0"];

  return (
    <svg className="energy-chart" viewBox="0 0 332 250" role="img" aria-label="Generated and consumed energy throughout the day">
      <defs>
        <linearGradient id="generated-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5ECD0D" stopOpacity="0.7" />
          <stop offset="1" stopColor="#5ECD0D" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="consumed-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#22B5FF" stopOpacity="0.17" />
          <stop offset="1" stopColor="#22B5FF" stopOpacity="0" />
        </linearGradient>
        <pattern id="energy-grid" x="39" y="16" width="24.4" height="21.3" patternUnits="userSpaceOnUse">
          <path d="M0 0 H24.4 M0 0 V21.3" stroke="rgba(255,255,255,0.045)" strokeWidth="1" fill="none" />
        </pattern>
      </defs>

      <rect x="39" y="16" width="293" height="213" fill="url(#energy-grid)" />

      {yLabels.map((label, index) => (
        <text key={label} x="34" y={28 + index * 37} textAnchor="end" className="energy-axis-label">{label}</text>
      ))}
      {xLabels.map((label, index) => (
        <text key={label} x={56 + index * 44} y="246" textAnchor="middle" className="energy-axis-label">{label}</text>
      ))}

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

export default function App() {
  const [series, setSeries] = useState({ generated: true, consumed: true });
  const toggle = (key) => setSeries((c) => ({ ...c, [key]: !c[key] }));

  return (
    <div className="energy-stage">
      <style>{CSS}</style>
      <section className="energy-card" aria-label="Energy Generated Vs Consumed">
        <div className="energy-card__header">
          <h2>Energy Genrated Vs Consumed</h2>
          <button className="energy-card__period" type="button">
            Today
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true">
              <path d="M1 1.5 6 6.5 11 1.5" stroke="#2D8CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <EnergyChart series={series} />

        <div className="series-control" aria-label="Chart series">
          <button className="series-toggle" type="button" aria-pressed={series.generated} onClick={() => toggle("generated")}>
            <span className="series-switch series-switch--generated"><i /></span>
            <small>Generated</small>
          </button>
          <span className="series-divider" />
          <button className="series-toggle" type="button" aria-pressed={series.consumed} onClick={() => toggle("consumed")}>
            <span className="series-switch series-switch--consumed"><i /></span>
            <small>Consumed</small>
          </button>
        </div>
      </section>
    </div>
  );
}
