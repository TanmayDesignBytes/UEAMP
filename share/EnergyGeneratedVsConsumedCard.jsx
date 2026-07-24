import { useState } from "react";
import "./EnergyGeneratedVsConsumedCard.css";

/**
 * Energy Generated Vs Consumed — dashboard card
 * Self-contained: no external component or asset dependencies.
 * Toggle each series on/off with the switches at the bottom.
 */
export function EnergyGeneratedVsConsumedCard() {
  const [series, setSeries] = useState({ generated: true, consumed: true });

  const toggle = (key) =>
    setSeries((current) => ({ ...current, [key]: !current[key] }));

  return (
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
        <button
          className="series-toggle"
          type="button"
          aria-pressed={series.generated}
          onClick={() => toggle("generated")}
        >
          <span className="series-switch series-switch--generated"><i /></span>
          <small>Generated</small>
        </button>
        <span className="series-divider" />
        <button
          className="series-toggle"
          type="button"
          aria-pressed={series.consumed}
          onClick={() => toggle("consumed")}
        >
          <span className="series-switch series-switch--consumed"><i /></span>
          <small>Consumed</small>
        </button>
      </div>
    </section>
  );
}

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

export default EnergyGeneratedVsConsumedCard;
