import type { ReactNode } from "react";
import { GensetCard, GensetStat, GlassCard, Metric } from "@/components/dashboard/common/Cards";
import { StatusBar } from "@/components/dashboard/common/StatusBar";
import { useDevLifecycleLog } from "@/components/dashboard/devDiagnostics";
import { PowerOutputChart } from "@/components/dashboard/energy/PowerOutputContent";

export function GensetEnergyContent() {
  useDevLifecycleLog(10);

  return (
    <div className="genset-energy-content mx-auto min-h-dvh w-full max-w-[393px] px-4 pb-[120px] font-jakarta text-white">
      <StatusBar />
      <h1 className="genset-energy-title">Power Output</h1>

      <GlassCard className="genset-energy-card">
        <img className="genset-energy-card-bg" src="/assets/genset/performance-trends-card-frame.svg" alt="" aria-hidden="true" />
        <div className="power-card-header genset-energy-card__header">
          <h2>Performance Trends</h2>
          <button className="period-select" type="button">
            <span>Today</span>
            <img src="/assets/power/dropdown-arrow.svg" alt="" />
          </button>
        </div>

        <PowerOutputChart />

        <div className="power-series-control genset-energy-series" aria-label="Chart series">
          <label>
            <span className="series-switch series-switch--generated"><i /></span>
            <small>Generated</small>
          </label>
          <span className="series-divider" />
          <label>
            <span className="series-switch series-switch--consumed"><i /></span>
            <small>Consumed</small>
          </label>
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
            <GensetEnergyMetric label="Weekly Avg" value="64.6" unit="kWh" />
            <span className="metric-divider genset-energy-divider" />
            <GensetEnergyMetric label="Highest" value="78.9" unit="kWh" />
            <span className="metric-divider genset-energy-divider" />
            <GensetEnergyMetric label="Lowest" value="43.5" unit="kWh" />
          </div>
        </article>
      </GlassCard>

      <GensetCard className="genset-electrical-card">
        <img className="genset-electrical-card-bg" src="/assets/genset/electrical-parameter-card-frame.svg" alt="" aria-hidden="true" />
        <h2>Electrical Parameter</h2>
        <div>
          <GensetStat value="5" label="Current" />
          <span className="metric-divider genset-energy-divider" />
          <GensetStat value="15" label="Voltage" />
          <span className="metric-divider genset-energy-divider" />
          <GensetStat value="75" label="Power Factor" />
        </div>
      </GensetCard>

      <GensetLubeOilCard />
      <GensetSpeedCard />
      <GensetEngineMetrics />
      <div className="genset-bottom-spacer" aria-hidden="true" />
    </div>
  );
}

function GensetEnergyMetric({ label, unit, value }: { label: string; unit: string; value: string }) {
  return (
    <div className="genset-energy-metric">
      <span>{label}</span>
      <p><strong>{value}</strong> <small>{unit}</small></p>
    </div>
  );
}

function GensetLubeOilCard() {
  return (
    <GensetCard className="genset-lube-card">
      <img className="genset-lube-card-bg" src="/assets/genset/lube-oil-card-frame.svg" alt="" aria-hidden="true" />
      <h2>Lube Oil</h2>
      <div className="genset-lube-card__body">
        <div className="genset-lube-gauge genset-lube-gauge--temperature">
          <LeftLubeArc />
          <strong>50°C</strong>
          <span>Temperature</span>
          <i aria-hidden="true"><TemperatureIcon /></i>
        </div>
        <div className="genset-lube-gauge genset-lube-gauge--pressure">
          <RightLubeArc />
          <strong>250 kPa</strong>
          <span>Pressure</span>
          <i aria-hidden="true"><WaterDropIcon /></i>
        </div>
      </div>
    </GensetCard>
  );
}

function GensetSpeedCard() {
  return (
    <GensetCard className="genset-speed-card">
      <img className="genset-speed-card-bg" src="/assets/genset/speed-card-frame.svg" alt="" aria-hidden="true" />
      <h2>Speed</h2>
      <div className="genset-speed-card__body">
        <div className="genset-speed-bars" aria-hidden="true">
          {Array.from({ length: 39 }).map((_, index) => (
            <span key={index} className={index > 28 ? "is-muted" : ""} />
          ))}
        </div>
        <strong>1500 rpm</strong>
      </div>
      <div className="genset-speed-card__scale" aria-hidden="true">
        <span>0</span>
        <span>2k</span>
      </div>
    </GensetCard>
  );
}

function GensetEngineMetrics() {
  return (
    <div className="genset-engine-metrics">
      <GensetCard className="genset-battery-card">
        <img className="genset-battery-card-bg" src="/assets/genset/battery-voltage-card-frame.svg" alt="" aria-hidden="true" />
        <h2>Battery Voltage</h2>
        <p><strong>92</strong> <span>V</span></p>
        <BatteryVoltageGauge />
      </GensetCard>

      <GensetCard className="genset-frequency-card">
        <img className="genset-frequency-card-bg" src="/assets/genset/frequency-card-frame.svg" alt="" aria-hidden="true" />
        <div>
          <h2>Frequency</h2>
          <p><strong>42.3</strong> <span>Hz</span></p>
        </div>
        <FrequencySparkline />
      </GensetCard>

      <GensetCard className="genset-coolant-card">
        <img className="genset-coolant-card-bg" src="/assets/genset/coolant-card-frame.svg" alt="" aria-hidden="true" />
        <div>
          <h2>Coolant Temp</h2>
          <p><strong>50°C</strong></p>
        </div>
        <CoolantIcon />
      </GensetCard>

      <GensetCard className="genset-average-voltage-card">
        <img className="genset-average-voltage-card-bg" src="/assets/genset/average-voltage-card-frame.svg" alt="" aria-hidden="true" />
        <h2>Average Voltage</h2>
        <div className="genset-average-voltage-row">
          <div className="genset-average-voltage-values">
            <GensetVoltageStat value="5" label="(P-P)" />
            <span className="metric-divider genset-average-voltage-divider" />
            <GensetVoltageStat value="15" label="(P-N)" />
          </div>
          <PlugMetricIcon />
        </div>
      </GensetCard>

      <GensetMaintenanceCard />
      <GensetMainsVoltageCard />
      <GensetPowerCard />
      <GensetBusUtilityCard />
    </div>
  );
}

function GensetMaintenanceCard() {
  return (
    <GensetCard className="genset-maintenance-card">
      <img className="genset-maintenance-card-bg" src="/assets/genset/maintenance-card-frame.svg" alt="" aria-hidden="true" />
      <h2>Maintenance</h2>
      <div className="maintenance-line genset-maintenance-line">
        <span /><span /><span /><span />
        <i className="maintenance-marker" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
            <circle cx="8.06897" cy="8.06897" r="7.0635" fill="white" fillOpacity="0.5" stroke="white" />
            <path d="M8.06915 8.0625L11.5631 14.1142H4.57519L8.06915 8.0625Z" fill="white" />
          </svg>
          <small>61</small>
        </i>
      </div>
      <div className="maintenance-dates genset-maintenance-dates">
        <Metric label="Upcoming" value="26.02.24" detail="124 Hrs" />
        <Metric label="Last" value="26.02.22" detail="102 Hrs" />
      </div>
    </GensetCard>
  );
}

function GensetMainsVoltageCard() {
  return (
    <GensetCard className="genset-mains-voltage-card">
      <img className="genset-mains-voltage-card-bg" src="/assets/genset/mains-voltage-card-frame.svg" alt="" aria-hidden="true" />
      <h2>Mains Voltage</h2>
      <div className="genset-mains-voltage-row">
        <GensetVoltageStat value="5" label="(R-Y)" />
        <span className="metric-divider genset-mains-voltage-divider" />
        <GensetVoltageStat value="15" label="(Y-B)" />
        <span className="metric-divider genset-mains-voltage-divider" />
        <GensetVoltageStat value="75" label="(R-B)" />
      </div>
    </GensetCard>
  );
}

function GensetPowerCard() {
  const rows = [
    { label: "Average Power", value: "15", unit: "kVA" },
    { label: "Apparent Power", value: "15", unit: "kVA" },
    { label: "Average Power", value: "5", unit: "kW" },
    { label: "Active Power", value: "55", unit: "kW" },
    { label: "Reactive Power", value: "13", unit: "kVAr" },
  ];

  return (
    <GensetCard className="genset-power-card">
      <img className="genset-power-card-bg" src="/assets/genset/power-card-frame.svg" alt="" aria-hidden="true" />
      <h2>Power</h2>
      <div className="genset-power-list">
        {rows.map((row) => (
          <div className="genset-power-row" key={row.label + row.value + row.unit}>
            <span>{row.label}</span>
            <strong>{row.value}<small>{row.unit}</small></strong>
          </div>
        ))}
      </div>
    </GensetCard>
  );
}

function GensetBusUtilityCard() {
  return (
    <GensetCard className="genset-bus-utility-card">
      <img className="genset-bus-utility-card-bg" src="/assets/genset/bus-utility-card-frame.svg" alt="" aria-hidden="true" />
      <h2>BUS Utility</h2>
      <div className="genset-bus-utility-row">
        <GensetBusUtilityMetric icon={<BusFrequencyIcon />} value="50.0" unit="Hz" label="Avg Frequency" />
        <GensetBusUtilityMetric icon={<BusVoltageIcon />} value="50" unit="v" label="Avg Voltage (Y-B)" />
      </div>
    </GensetCard>
  );
}

function GensetBusUtilityMetric({ icon, label, unit, value }: { icon: ReactNode; label: string; unit: string; value: string }) {
  return (
    <div className="genset-bus-utility-metric">
      {icon}
      <div>
        <p><strong>{value}</strong><span>{unit}</span></p>
        <small>{label}</small>
      </div>
    </div>
  );
}

function GensetVoltageStat({ label, value }: { label: string; value: string }) {
  return (
    <p className="genset-voltage-stat">
      <strong>{value}</strong> <span>V</span>
      <small>{label}</small>
    </p>
  );
}

function BatteryVoltageGauge() {
  return <img className="genset-battery-gauge" src="/assets/genset/battery-voltage-gauge.svg" alt="" aria-hidden="true" />;
}

function FrequencySparkline() {
  return <img className="genset-frequency-sparkline" src="/assets/genset/frequency-sparkline.svg" alt="" aria-hidden="true" />;
}

function CoolantIcon() {
  return <img className="genset-coolant-icon" src="/assets/genset/coolant-temp-icon.svg" alt="" aria-hidden="true" />;
}

function PlugMetricIcon() {
  return <img className="genset-plug-icon" src="/assets/genset/average-voltage-icon.svg" alt="" aria-hidden="true" />;
}

function BusFrequencyIcon() {
  return (
    <svg className="genset-bus-icon genset-bus-icon--frequency" width="24" height="19" viewBox="0 0 24 19" fill="none" aria-hidden="true">
      <path d="M18.7453 11.1233L16.7878 0.917333C16.6945 0.430709 16.3046 0.0388912 15.8185 0.00299956C15.28 -0.0367591 14.8187 0.323015 14.6973 0.827304L11.5798 13.775L9.368 6.23628C9.23166 5.77159 8.82403 5.42044 8.34736 5.41651C7.89027 5.41274 7.49805 5.69526 7.33972 6.10596L5.40587 11.1233H0.332172C0.148719 11.1233 0 11.2746 0 11.4612V12.9557C0 13.1423 0.148719 13.2936 0.332172 13.2936H6.13333C6.5722 13.2936 6.96628 13.0202 7.12648 12.6045L8.19596 9.82972L10.6591 18.2252C10.794 18.6848 11.2095 18.9999 11.681 19C11.69 19 11.699 18.9999 11.7078 18.9996C12.1891 18.9874 12.6027 18.6487 12.7173 18.173L15.6154 6.13672L16.8198 12.4163C16.9175 12.9258 17.3563 13.2936 17.8666 13.2936H23.6678C23.8513 13.2936 24 13.1423 24 12.9557V11.4612C24 11.2746 23.8513 11.1233 23.6678 11.1233H18.7453Z" fill="url(#bus-frequency-gradient)" />
      <defs>
        <linearGradient id="bus-frequency-gradient" x1="-2.85924" y1="8.75896" x2="25.9529" y2="8.99092" gradientUnits="userSpaceOnUse">
          <stop stopColor="#63B7FF" />
          <stop offset="1" stopColor="#296ACC" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function BusVoltageIcon() {
  return (
    <svg className="genset-bus-icon genset-bus-icon--voltage" width="12" height="25" viewBox="0 0 12 25" fill="none" aria-hidden="true">
      <path d="M9.21287 1.35932C9.29788 0.835793 9.07542 0.310004 8.67832 0.0956832C8.28112 -0.118637 7.81625 0.0363199 7.56122 0.468069L0.17656 12.968C-0.0276508 13.3137 -0.0570454 13.7711 0.100531 14.152C0.258107 14.5329 0.575893 14.7727 0.923109 14.7727H4.22792L2.78719 23.6407C2.70215 24.1642 2.92461 24.69 3.32178 24.9043C3.71898 25.1186 4.18377 24.9638 4.43884 24.5319L11.8234 12.032C12.0277 11.6864 12.057 11.2289 11.8995 10.848C11.7419 10.4671 11.4241 10.2273 11.0769 10.2273H7.77211L9.21287 1.35932Z" fill="url(#bus-voltage-gradient)" />
      <defs>
        <linearGradient id="bus-voltage-gradient" x1="-0.000186876" y1="24.9998" x2="19.5058" y2="15.637" gradientUnits="userSpaceOnUse">
          <stop stopColor="#005BE4" />
          <stop offset="1" stopColor="#3793FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function LeftLubeArc() {
  return (
    <svg className="genset-lube-arc genset-lube-arc--left" viewBox="0 0 97 186" fill="none" aria-hidden="true">
      <defs>
        <filter id="lube-left-inner" x="0" y="0" width="96.6145" height="163.195" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_lube_left" />
        </filter>
        <linearGradient id="lube-temp-gradient" x1="92.6145" y1="4" x2="-49.1687" y2="74.8916" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F49062" />
          <stop offset="1" stopColor="#FD371F" />
        </linearGradient>
      </defs>
      <path d="M3.99999 181.229C27.502 181.229 50.0415 171.893 66.6599 155.274C83.2784 138.656 92.6145 116.117 92.6145 92.6145C92.6145 69.1125 83.2784 46.573 66.6599 29.9546C50.0415 13.3361 27.502 4 4.00002 4" stroke="url(#lube-temp-gradient)" strokeWidth="8" strokeLinecap="round" />
      <g filter="url(#lube-left-inner)">
        <path d="M66.6599 155.195C83.2783 138.586 92.6145 116.058 92.6145 92.5682C92.6145 69.0785 83.2784 46.5508 66.6599 29.941C50.0415 13.3313 27.502 4 4.00001 4" stroke="#818187" strokeWidth="8" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function RightLubeArc() {
  return (
    <svg className="genset-lube-arc genset-lube-arc--right" viewBox="0 0 105 194" fill="none" aria-hidden="true">
      <defs>
        <filter id="lube-right-shadow" x="0" y="0" width="104.615" height="193.229" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_lube_right" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_lube_right" result="shape" />
        </filter>
        <filter id="lube-right-inner" x="0" y="0" width="104.615" height="193.229" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_lube_right_inner" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
          <feBlend mode="normal" in2="shape" result="effect2_innerShadow_lube_right" />
        </filter>
        <linearGradient id="lube-pressure-gradient" x1="96.6139" y1="181.231" x2="-35.3021" y2="103.917" gradientUnits="userSpaceOnUse">
          <stop stopColor="#57EB66" />
          <stop offset="1" stopColor="#0AA28C" />
        </linearGradient>
      </defs>
      <g filter="url(#lube-right-shadow)">
        <g filter="url(#lube-right-inner)">
          <path d="M96.6145 4.00001C73.1125 4.00001 50.573 13.3362 33.9546 29.9546C17.3361 46.573 8 69.1125 8 92.6145C8 116.117 17.3361 138.656 33.9546 155.274C50.573 171.893 73.1125 181.229 96.6145 181.229" stroke="#7B7B81" strokeWidth="8" strokeLinecap="round" shapeRendering="crispEdges" />
        </g>
        <path d="M33.9546 30.0337C17.3361 46.6434 8 69.1711 8 92.6608C8 116.151 17.3361 138.678 33.9546 155.288C50.573 171.898 73.1125 181.229 96.6145 181.229" stroke="url(#lube-pressure-gradient)" strokeWidth="8" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function WaterDropIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none">
      <path d="M7.92212 0.746094C7.96781 0.709902 8.03159 0.710117 8.07739 0.746094C8.17873 0.826576 9.5452 1.92261 10.8811 3.53418C12.2322 5.16413 13.4718 7.22559 13.4719 9.24609C13.4719 12.2629 11.017 14.7185 8.00024 14.7188C4.98326 14.7188 2.52759 12.2631 2.52759 9.24609C2.52772 7.22561 3.76809 5.16413 5.11938 3.53418C6.12109 2.32596 7.13949 1.40727 7.62915 0.989258L7.92212 0.746094ZM10.8127 8.78125C10.1916 8.78125 9.68774 9.28511 9.68774 9.90625C9.68766 10.5775 9.14023 11.1249 8.46899 11.125C7.84785 11.125 7.34399 11.6289 7.34399 12.25C7.34408 12.8711 7.8479 13.375 8.46899 13.375C10.3819 13.3749 11.9377 11.8191 11.9377 9.90625C11.9377 9.28516 11.4338 8.78133 10.8127 8.78125Z" fill="white" stroke="white" />
    </svg>
  );
}

function TemperatureIcon() {
  return (
    <svg viewBox="0 0 16 17" fill="none">
      <path d="M5.48666 8.55024V5.354L8.88265 6.95212L9.08242 8.94976L10.4808 9.54906L10.8803 11.1472L10.4808 13.5443L9.08242 15.542H6.48548L4.48784 14.7429L3.48901 12.9451V11.1472L5.48666 8.55024Z" fill="white" />
      <path d="M9.64535 8.16963V2.48133C9.64535 1.13781 8.55732 0 7.16369 0C5.79534 0 4.68202 1.11298 4.68202 2.48133V8.16963C3.46291 8.9901 2.7207 10.3657 2.7207 11.8508C2.7207 14.3043 4.71386 16.3008 7.16369 16.3008C9.61351 16.3008 11.6067 14.3043 11.6067 11.8508C11.6067 10.3657 10.8645 8.9901 9.64535 8.16963ZM7.16369 1.3584C7.81406 1.3584 8.28695 1.89873 8.28695 2.48133V5.50473L6.04042 4.23488V2.48133C6.04042 1.86183 6.54418 1.3584 7.16369 1.3584Z" fill="white" />
      <path d="M13.5663 1.27344H11.656C11.2809 1.27344 10.9768 1.57722 10.9768 1.95264C10.9768 2.32805 11.2809 2.63184 11.656 2.63184H13.5663C13.9413 2.63184 14.2455 2.32805 14.2455 1.95264C14.2455 1.57722 13.9413 1.27344 13.5663 1.27344Z" fill="white" />
      <path d="M11.656 5.34766H12.6111C12.9862 5.34766 13.2903 5.04387 13.2903 4.66846C13.2903 4.29304 12.9862 3.98926 12.6111 3.98926H11.656C11.2809 3.98926 10.9768 4.29304 10.9768 4.66846C10.9768 5.04387 11.2809 5.34766 11.656 5.34766Z" fill="white" />
      <path d="M13.1129 6.70703H11.656C11.2809 6.70703 10.9768 7.01081 10.9768 7.38623C10.9768 7.76165 11.2809 8.06543 11.656 8.06543H13.1129C13.488 8.06543 13.7921 7.76165 13.7921 7.38623C13.7921 7.01081 13.488 6.70703 13.1129 6.70703Z" fill="white" />
    </svg>
  );
}
