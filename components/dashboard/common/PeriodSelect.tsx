"use client";

import { useState } from "react";
import { createPortal } from "react-dom";

const periodOptions = [
  "Today",
  "Yesterday",
  "Current month",
  "Last 3 months",
  "Last 6 months",
  "2026",
  "2025",
];

export function PeriodSelect({ className = "" }: { className?: string }) {
  const [selectedPeriod, setSelectedPeriod] = useState(periodOptions[0]);
  const [pending, setPending] = useState(periodOptions[0]);
  const [open, setOpen] = useState(false);

  function openPicker() {
    setPending(selectedPeriod);
    setOpen(true);
  }

  return (
    <div className="period-select-wrap">
      <button
        className={"period-select " + className}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={openPicker}
      >
        <span>{selectedPeriod}</span>
        <img src="/assets/power/dropdown-arrow.svg" alt="" aria-hidden="true" />
      </button>

      {open &&
        createPortal(
          <div
            className="report-picker-layer fixed inset-0 z-50 flex h-dvh w-screen items-end justify-center overscroll-none bg-black/20"
            role="presentation"
            onClick={() => setOpen(false)}
          >
            <section
              className="report-picker report-picker--time relative flex w-full flex-col overflow-hidden rounded-t-[15px] bg-[#090b1b] px-5 pb-[calc(20px+env(safe-area-inset-bottom))] pt-5 shadow-[inset_0_4px_4px_rgba(0,0,0,.25)] md:max-w-[393px]"
              role="dialog"
              aria-modal="true"
              aria-label="Select time period"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="report-picker__handle" />
              <div className="report-picker__heading relative flex shrink-0 items-start justify-between border-0 pb-[10px]">
                <h2 className="m-0 font-inter text-base font-bold leading-[30px]">Select Time</h2>
                <button type="button" onClick={() => setOpen(false)} aria-label="Close">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="m6 6 12 12M6 18 18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <div className="report-picker__options flex min-h-0 flex-1 touch-pan-y flex-col gap-10 overflow-y-auto overflow-x-hidden py-5 [overscroll-behavior-y:contain]">
                {periodOptions.map((option) => (
                  <label
                    className="flex min-h-5 shrink-0 items-center gap-2 font-inter text-sm font-medium leading-5 text-white/85"
                    key={option}
                  >
                    <input
                      type="radio"
                      name="period-select"
                      checked={pending === option}
                      onChange={() => setPending(option)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>

              <button
                className="report-picker__confirm flex h-16 w-full shrink-0 items-center justify-center rounded-full bg-primary-gradient px-[25px] py-5 font-jakarta text-sm font-bold text-white/85"
                type="button"
                onClick={() => {
                  setSelectedPeriod(pending);
                  setOpen(false);
                }}
              >
                Confirm
              </button>
            </section>
          </div>,
          document.body,
        )}
    </div>
  );
}
