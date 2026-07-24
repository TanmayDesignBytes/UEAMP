"use client";

import { useState } from "react";
import { createPortal } from "react-dom";

const days = [
  { day: "Sun", high: "26°", low: "18°", icon: "/assets/weather/forecast-sun.svg" },
  { day: "Mon", high: "24°", low: "17°", icon: "/assets/weather/forecast-cloud-sun.svg" },
  { day: "Tue", high: "22°", low: "16°", icon: "/assets/weather/forecast-cloud.svg" },
  { day: "Wed", high: "19°", low: "14°", icon: "/assets/weather/forecast-rain.svg" },
  { day: "Thu", high: "21°", low: "15°", icon: "/assets/weather/forecast-cloud-sun.svg" },
  { day: "Fri", high: "23°", low: "16°", icon: "/assets/weather/forecast-cloud.svg" },
  { day: "Sat", high: "25°", low: "17°", icon: "/assets/weather/forecast-sun.svg" },
];

const periodOptions = ["Day", "Week", "Month"];

export function WeeklyForecast() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [period, setPeriod] = useState("Week");
  const [draftPeriod, setDraftPeriod] = useState("Week");
  const [periodOpen, setPeriodOpen] = useState(false);

  const openPeriodPicker = () => {
    setDraftPeriod(period);
    setPeriodOpen(true);
  };

  return (
    <section className="mx-auto mt-6 w-[353px] max-w-full" aria-labelledby="weekly-forecast-heading">
      <div className="flex items-start justify-between">
        <h2 id="weekly-forecast-heading" className="font-jakarta text-sm font-bold capitalize leading-normal text-white">
          Weekly Forecast
        </h2>

        <button
          className="relative flex h-[30px] w-[97px] shrink-0 items-center justify-between overflow-hidden rounded-full px-[13px] pr-[10px] font-inter text-xs font-semibold leading-normal text-white"
          type="button"
          aria-haspopup="dialog"
          aria-expanded={periodOpen}
          aria-label={`Forecast period: ${period}`}
          onClick={openPeriodPicker}
        >
          <img className="pointer-events-none absolute inset-0 size-full" src="/assets/weather/week-pill.svg" alt="" aria-hidden="true" />
          <span className="relative z-[1]">{period}</span>
          <img className="relative z-[1] h-[5px] w-[11px] shrink-0" src="/assets/weather/week-caret.svg" alt="" aria-hidden="true" />
        </button>
      </div>

      <div className="weekly-forecast-track -mx-3 mt-4 flex items-start justify-start gap-3 overflow-x-auto px-3 pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {days.map((forecast, index) => {
          const active = index === activeIndex;
          return (
            <button
              key={forecast.day}
              type="button"
              aria-pressed={active}
              onClick={() => setActiveIndex(index)}
              className={`weekly-forecast-day-${forecast.day.toLowerCase()} ${active ? "weekly-forecast-day-active" : "pt-3"} relative flex h-[124px] w-[72px] shrink-0 flex-col items-center gap-3`}
            >
              {active ? <img className="pointer-events-none absolute inset-0 z-0 size-full" src="/assets/weather/forecast-day-card.svg" alt="" aria-hidden="true" /> : null}
              <span className={`relative z-[1] font-inter text-[13px] font-medium leading-normal ${active ? "text-white" : "text-[#94a3b8]"}`}>{forecast.day}</span>
              <img className="relative z-[1] size-6 shrink-0" src={forecast.icon} alt="" aria-hidden="true" />
              <div className="relative z-[1] flex flex-col items-center gap-0.5 font-inter leading-normal">
                <strong className={`weekly-forecast-high-${forecast.day.toLowerCase()} text-[15px] font-semibold text-white`}>{forecast.high}</strong>
                <span className={`weekly-forecast-low-${forecast.day.toLowerCase()} text-[13px] font-normal text-[#64748b]`}>{forecast.low}</span>
              </div>
            </button>
          );
        })}
      </div>

      {periodOpen && createPortal((
        <div className="report-picker-layer fixed inset-0 z-50 flex h-dvh w-screen items-end justify-center overscroll-none bg-black/20" role="presentation" onClick={() => setPeriodOpen(false)}>
          <section className="report-picker report-picker--time relative flex w-full flex-col overflow-hidden rounded-t-[15px] bg-[#090b1b] px-5 pb-[calc(20px+env(safe-area-inset-bottom))] pt-5 shadow-[inset_0_4px_4px_rgba(0,0,0,.25)] md:max-w-[393px]" role="dialog" aria-modal="true" aria-label="Select forecast period" onClick={(event) => event.stopPropagation()}>
            <div className="report-picker__handle" />
            <div className="report-picker__heading relative flex shrink-0 items-start justify-between border-0 pb-[10px]">
              <h2 className="m-0 font-inter text-base font-bold leading-[30px]">Select Period</h2>
              <button type="button" onClick={() => setPeriodOpen(false)} aria-label="Close">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="m6 6 12 12M6 18 18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="report-picker__options flex min-h-0 flex-1 touch-pan-y flex-col gap-10 overflow-y-auto overflow-x-hidden py-5 [overscroll-behavior-y:contain]">
              {periodOptions.map((option) => (
                <label className="flex min-h-5 shrink-0 items-center gap-2 font-inter text-sm font-medium leading-5 text-white/85" key={option}>
                  <input type="radio" name="forecast-period" checked={draftPeriod === option} onChange={() => setDraftPeriod(option)} />
                  <span>{option}</span>
                </label>
              ))}
            </div>

            <button className="report-picker__confirm flex h-16 w-full shrink-0 items-center justify-center rounded-full bg-primary-gradient px-[25px] py-5 font-jakarta text-sm font-bold text-white/85" type="button" onClick={() => { setPeriod(draftPeriod); setPeriodOpen(false); }}>Confirm</button>
          </section>
        </div>
      ), document.body)}
    </section>
  );
}
