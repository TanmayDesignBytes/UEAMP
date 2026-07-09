"use client";

import { useState } from "react";

const periodOptions = ["Today", "Yesterday", "Last 7 days", "This Month", "Last Month"];

export function PeriodSelect({ className = "" }: { className?: string }) {
  const [selectedPeriod, setSelectedPeriod] = useState(periodOptions[0]);
  const [open, setOpen] = useState(false);

  return (
    <div
      className="period-select-wrap"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <button
        className={"period-select " + className}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <span>{selectedPeriod}</span>
        <img src="/assets/power/dropdown-arrow.svg" alt="" aria-hidden="true" />
      </button>
      {open && (
        <div className="period-select-menu" role="listbox" aria-label="Select period">
          {periodOptions.map((option) => (
            <button
              className={option === selectedPeriod ? "is-selected" : ""}
              type="button"
              role="option"
              aria-selected={option === selectedPeriod}
              key={option}
              onClick={() => {
                setSelectedPeriod(option);
                setOpen(false);
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
