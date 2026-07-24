export function TemperatureTrendCard() {
  return (
    <div className="mx-auto mt-6 w-[353px] max-w-full">
      <section className="relative h-[270px] w-full overflow-hidden rounded-[20px]" aria-labelledby="temperature-trend-heading">
        <img className="pointer-events-none absolute inset-0 size-full" src="/assets/weather/temperature-trend-card.svg" alt="" aria-hidden="true" />

        <h2 id="temperature-trend-heading" className="absolute left-5 top-5 z-[1] font-inter text-sm font-semibold capitalize leading-normal text-white">
          24-Hour Temperature Trend
        </h2>

        <svg className="absolute inset-0 z-[1] size-full" viewBox="0 0 353 270" fill="none" aria-hidden="true">
          <text x="23" y="88" fill="#64748B" fontFamily="Inter, sans-serif" fontSize="12">32°</text>
          <text x="23" y="152" fill="#64748B" fontFamily="Inter, sans-serif" fontSize="12">24°</text>
          <text x="23" y="216" fill="#64748B" fontFamily="Inter, sans-serif" fontSize="12">15°</text>

          <g opacity="0.2" stroke="white" strokeOpacity="0.352" strokeDasharray="4 4">
            <line x1="50" y1="84.5" x2="333" y2="84.5" />
            <line x1="50" y1="148.5" x2="333" y2="148.5" />
            <line x1="50" y1="212.5" x2="333" y2="212.5" />
          </g>

          <polyline points="50,203 83,188 116,158 150,112 184.5,83 218.5,98 252,128 285.5,172.5 319,188" stroke="#F5A623" strokeWidth="1.72" strokeLinecap="round" strokeLinejoin="round" />

          <g filter="url(#trend-point-glow)">
            <circle cx="50" cy="203" r="3.43" fill="#F5A623" />
            <circle cx="184.5" cy="83" r="3.43" fill="#F5A623" />
          </g>

          <g fill="#A5B5CB" fontFamily="Inter, sans-serif" fontSize="10">
            <text x="50" y="246">06:00</text>
            <text x="135" y="246">12:00</text>
            <text x="219" y="246">18:00</text>
            <text x="304" y="246">00:00</text>
          </g>

          <defs>
            <filter id="trend-point-glow" x="35" y="68" width="165" height="150" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feGaussianBlur stdDeviation="3.4" result="blur" />
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
        </svg>
      </section>

      <p className="mt-6 text-center font-inter text-[11px] font-normal leading-normal text-[#64748b]">
        Last updated: 2 mins ago • Pune site-yard-A
      </p>
    </div>
  );
}
