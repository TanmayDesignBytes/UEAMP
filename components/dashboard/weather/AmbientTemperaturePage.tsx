import { StatusBar } from "@/components/dashboard/common/StatusBar";
import { WeatherMetricCards } from "@/components/dashboard/weather/WeatherMetricCards";
import { WeeklyForecast } from "@/components/dashboard/weather/WeeklyForecast";
import { TemperatureTrendCard } from "@/components/dashboard/weather/TemperatureTrendCard";

export function AmbientTemperaturePage({ onBack }: { onBack: () => void }) {
  return (
    <div className="ambient-temperature-content relative mx-auto min-h-dvh w-full max-w-[393px] px-4 text-white">
      <StatusBar />

      <header className="report-header ambient-temperature-header mt-[21px] flex h-[35px] w-full items-center gap-3">
        <button className="report-back grid size-[35px] shrink-0 place-items-center rounded-full p-[5px] text-white" type="button" onClick={onBack} aria-label="Back to overview">
          <img src="/assets/settings/arrow-narrow-left.svg" alt="" aria-hidden="true" />
        </button>
        <h1 className="m-0 w-[244px] shrink-0 font-poppins text-xl font-semibold leading-normal text-[#f2f2f2]">Ambient Temperature</h1>
      </header>

      <div className="ambient-temperature-location mx-auto mt-5 flex h-[17px] w-fit -translate-x-0.5 translate-y-0.5 items-center gap-[6px]">
        <img className="size-[14px] shrink-0" src="/assets/weather/map-pin.svg" alt="" aria-hidden="true" />
        <span className="font-inter text-sm font-normal leading-normal text-[#94a3b8]">Pune, Site A</span>
      </div>

      <section className="ambient-temperature-summary mt-3 flex w-full flex-col items-center gap-3">
        <div className="flex h-[102px] items-center gap-5">
          <strong className="block h-[102px] w-[209px] shrink-0 -translate-y-2 font-inter text-[84px] font-bold leading-normal text-white">24<span className="ambient-temperature-degree-unit">°C</span></strong>
          <img className="size-16 shrink-0" src="/assets/weather/sun.svg" alt="Sunny" />
        </div>
        <div className="flex flex-col items-center gap-1">
          <h2 className="mt-1 h-6 w-[92px] font-inter text-xl font-medium leading-normal text-white">Clear Sky</h2>
          <p className="mr-1 h-[17px] w-[225px] whitespace-nowrap text-center font-inter text-sm font-normal leading-normal text-[#94a3b8]">Feels like 21°C • Wind NW 12km/h</p>
        </div>
      </section>

      <WeatherMetricCards />
      <WeeklyForecast />
      <TemperatureTrendCard />
    </div>
  );
}
