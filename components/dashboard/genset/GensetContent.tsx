import type { CSSProperties } from "react";
import { GensetCard, GensetStat } from "@/components/dashboard/common/Cards";
import { StatusBar } from "@/components/dashboard/common/StatusBar";
import { overviewAssets } from "@/components/dashboard/constants";
import { useDevLifecycleLog } from "@/components/dashboard/devDiagnostics";

const generatedBars = [34, 52, 44, 67, 83, 55, 31, 72, 86, 49, 38];

export function GensetContent() {
  useDevLifecycleLog(7);

  return (
    <div className="genset-content mx-auto min-h-dvh w-full max-w-[393px] px-[15px] pb-4 font-jakarta text-white">
      <StatusBar />
      <header className="mt-3 flex items-start justify-between px-1">
        <div>
          <h1 className="m-0 text-base font-semibold leading-5">Hi User Name</h1>
          <p className="m-0 text-xs leading-[18px]">Good Afternoon!</p>
        </div>
        <div className="weather-pill">
          <span>{"74\u00b0 F"}</span><img src={overviewAssets + "/cloud_sun.svg"} alt="Partly cloudy" />
        </div>
      </header>
      <div className="genset-page-status mt-4 flex items-center gap-2 px-1 text-[10px]">
        <span className="size-3 rounded-full bg-[#39f48a] shadow-[0_0_8px_#39f48a]" />
        <span>Genset Running</span>
      </div>

      <div className="genset-hero relative mt-8 h-[298px] w-full overflow-hidden">
        <img className="size-full object-cover" src="/assets/genset/microgrid.gif" alt="Live genset microgrid" />
        <div className="genset-hero__metric absolute right-[70px] top-4 rounded bg-[#5d606b]/80 px-2 py-1 font-inter text-[8px] leading-3 shadow-lg">
          <strong className="block font-medium">28.2 kWh</strong>
          <span>20.1 kg - CO₂</span>
        </div>
      </div>

      <div className="genset-summary-grid mt-8 grid grid-cols-2 gap-2.5">
        <article className="genset-generated-summary-card relative row-span-2 mt-2 flex h-[210px] flex-col rounded-[20px] px-[17px] py-5 backdrop-blur-[21px]">
          <img className="pointer-events-none absolute -left-[6px] -top-[6px] h-[222px] w-[184px] max-w-none" src="/assets/genset/energy-card.svg" alt="" aria-hidden="true" />
          <div className="relative z-[1] flex items-baseline gap-1.5"><strong className="font-inter text-[34px] font-semibold leading-[38px]">35</strong><b className="text-lg">kWh</b></div>
          <h2 className="relative z-[1] m-0 text-sm font-bold">Energy Generated</h2>
          <div className="genset-generated-bars relative z-[1] mt-auto flex h-[88px] items-end justify-between gap-1 px-1" aria-hidden="true">
            {generatedBars.map((height, index) => <i className="w-[7px] rounded-sm bg-white" key={index} style={{ height: `${height}%`, opacity: index === 6 ? 1 : .38 + (index % 3) * .12 }} />)}
          </div>
          <p className="relative z-[1] m-0 mt-2 text-center text-xs">18 kWh Yesterday</p>
        </article>

        <GensetCard className="h-[100px] px-[17px] py-5">
          <div className="flex h-full items-center justify-between gap-2">
            <div><h2 className="m-0 text-sm font-bold">Saving <small className="text-[10px] font-normal">(By Day)</small></h2><strong className="font-inter text-[28px] font-semibold leading-[34px]">234</strong></div>
            <div className="grid size-10 place-items-center rounded-full bg-[#79869b]/20 text-[30px] font-semibold leading-none text-[#187bf0]">₹</div>
          </div>
        </GensetCard>

        <GensetCard className="h-[100px] px-[17px] py-5">
          <div className="flex h-full items-center justify-between gap-2">
            <div><h2 className="m-0 text-sm font-bold">DEF <small className="text-[10px] font-normal">(Healthy)</small></h2><strong className="font-inter text-[28px] font-semibold leading-[34px]">25%</strong></div>
            <ProgressRing />
          </div>
        </GensetCard>

        <GensetCard className="h-[100px] px-3 py-3">
          <div className="flex h-full items-center justify-between gap-2">
            <div><h2 className="m-0 text-sm font-bold">Fuel Level</h2><small className="block text-[10px]">(Low)</small><strong className="mt-2 block font-inter text-2xl font-semibold leading-[30px]">25%</strong></div>
            <FuelLevelGauge />
          </div>
        </GensetCard>

        <GensetCard className="h-[100px] px-3 py-3">
          <div className="flex h-full items-center justify-between gap-[18px]">
            <div><h2 className="m-0 text-sm font-bold">Load</h2><small className="block text-[10px]">(Optimal)</small><strong className="mt-2 block font-inter text-2xl font-semibold leading-[30px]">25%</strong></div>
            <LoadGauge />
          </div>
        </GensetCard>

        <GensetCard className="col-span-2 h-28 px-5 py-[13px]">
          <div className="flex h-full items-center gap-3">
            <div className="min-w-0 flex-1">
              <h2 className="m-0 text-sm font-bold leading-6">No. Starts <small className="text-[10px] font-normal">(Genset)</small></h2>
              <div className="mt-1 inline-grid grid-cols-[auto_1px_auto_1px_auto] items-center gap-x-[22px]">
                <GensetStat value="5" label="Today" />
                <span className="metric-divider genset-starts-divider" />
                <GensetStat value="15" label="This Month" />
                <span className="metric-divider genset-starts-divider" />
                <GensetStat value="75" label="Till Date" />
              </div>
            </div>
            <TimeProgress />
          </div>
        </GensetCard>

        <GensetCard className="col-span-2 h-[110px] px-5 py-[13px]">
          <div className="flex h-full items-center justify-between">
            <div className="self-start"><h2 className="m-0 text-sm font-bold leading-6">Running Time</h2><p className="m-0 text-[10px] leading-6">( 5.5 hrs Yesterday )</p><strong className="font-inter text-2xl font-semibold leading-[38px]">4 hrs</strong></div>
            <RunningTimeChart />
          </div>
        </GensetCard>
      </div>
    </div>
  );
}

function ProgressRing() {
  return <img className="size-11 shrink-0" src="/assets/genset/progress-chart.svg" alt="25 percent" />;
}

function FuelLevelGauge() {
  return (
    <div className="relative h-[74px] w-[38px] shrink-0 drop-shadow-[0_4px_4px_rgba(0,0,0,.25)]" aria-label="25 percent fuel remaining">
      <svg className="absolute left-0 top-[44px] h-[9px] w-[6px]" viewBox="0 0 6 9" fill="none" aria-hidden="true">
        <path opacity="0.8" d="M5.47156 5.01996C5.94029 4.62069 5.94029 3.89673 5.47156 3.49746L1.64849 0.240875C0.999208 -0.312197 0.000033 0.149219 0.000033 1.00213V7.51529C0.000033 8.3682 0.999208 8.82962 1.64849 8.27655L5.47156 5.01996Z" fill="white" />
      </svg>
      <div className="absolute right-0 top-0 flex h-[74px] w-7 flex-col gap-[3px]">
        {Array.from({ length: 7 }, (_, index) => (
          <span
            className={`h-2 w-7 rounded bg-white ${index >= 4 ? "bg-[linear-gradient(135deg,#F74FAC_0%,#FCB24F_100%)] opacity-100" : "opacity-[var(--segment-opacity)]"}`}
            key={index}
            style={{ "--segment-opacity": String(.1 + index * .05) } as CSSProperties}
          />
        ))}
      </div>
    </div>
  );
}

function LoadGauge() {
  return <img className="h-[86px] w-10 shrink-0" src="/assets/genset/load-gauge.svg" alt="25 percent load" />;
}

function TimeProgress() {
  return <img className="size-[88px] shrink-0" src="/assets/genset/time-progress.svg" alt="Start timing summary" />;
}

function RunningTimeChart() {
  return <img className="-mr-2 h-[82px] w-[163px] max-w-[48%] shrink-0" src="/assets/genset/running-time-chart.svg" alt="Running time trend" />;
}
