type WeatherMetricCardProps = {
  kind: "wind" | "humidity";
  title: string;
  value: string;
  suffix?: string;
  icon: string;
  iconAlt: string;
};

function WeatherMetricCard({ kind, title, value, suffix, icon, iconAlt }: WeatherMetricCardProps) {
  return (
    <article className="relative h-[104px] min-w-0 overflow-hidden rounded-[21px]">
      <img className="pointer-events-none absolute inset-0 size-full" src="/assets/weather/metric-card.svg" alt="" aria-hidden="true" />
      <div className="relative z-[1] flex h-full items-center gap-6 px-[17px] pb-5 pt-[23px]">
        <div className={`weather-metric-text-${kind} flex min-w-0 flex-1 flex-col items-start gap-[5px]`}>
          <h3 className={`weather-metric-title-${kind} whitespace-nowrap font-jakarta text-sm font-bold leading-normal text-white`}>{title}</h3>
          <div className={`weather-metric-value-${kind} flex items-baseline ${kind === "wind" ? "gap-1" : "gap-0"} whitespace-nowrap font-inter font-semibold leading-normal text-white`}>
            <strong className={`weather-metric-number-${kind} text-[28px] font-semibold`}>{value}</strong>
            {suffix ? <span className={`weather-metric-suffix-${kind} ${kind === "wind" ? "text-base" : "text-[28px]"}`}>{suffix}</span> : null}
          </div>
        </div>
        <img className={`weather-metric-icon-${kind} ${kind === "humidity" ? "size-9" : "size-[31px]"} shrink-0`} src={icon} alt={iconAlt} />
      </div>
    </article>
  );
}

export function WeatherMetricCards() {
  return (
    <section className="mx-auto mt-6 grid w-[357px] max-w-full grid-cols-2 gap-2" aria-label="Current weather details">
      <WeatherMetricCard kind="wind" title="Wind Speed" value="12" suffix="km/h" icon="/assets/weather/wind.svg" iconAlt="Wind" />
      <WeatherMetricCard kind="humidity" title="Humidity" value="65" suffix="%" icon="/assets/weather/humidity.svg" iconAlt="Humidity" />
    </section>
  );
}
