"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { logDevEvent, useDevLifecycleLog } from "@/components/dashboard/devDiagnostics";

const settingsItems = [
  "Report",
  "Device Settings",
  "Terms of Service",
  "Privacy Policy",
  "Contact Us",
  "About Us",
];

const reportParameters = [
  { id: "energy-consumed", label: "Energy Consumed" },
  { id: "energy-generated", label: "Energy Generated" },
  { id: "def", label: "DEF" },
  { id: "saving", label: "Saving" },
  { id: "cost", label: "Cost" },
  { id: "load", label: "Load" },
  { id: "fuel-level-1", label: "Fuel Level" },
  { id: "fuel-level-2", label: "Fuel Level" },
  { id: "fuel-level-3", label: "Fuel Level" },
  { id: "fuel-level-4", label: "Fuel Level" },
  { id: "battery-level", label: "Battery Level" },
  { id: "solar-output", label: "Solar Output" },
  { id: "grid-import", label: "Grid Import" },
  { id: "grid-export", label: "Grid Export" },
  { id: "genset-runtime", label: "Genset Runtime" },
  { id: "power-factor", label: "Power Factor" },
];

const timePeriods = ["Today", "Yesterday", "Last 7 days", "This Month", "Last Month", "Custom Range"];

function StatusBar() {
  return (
    <div className="figma-statusbar flex h-[35px] items-center justify-between font-inter text-xs font-medium text-[#e2ebf4]" aria-label="Device status">
      <span>9:41</span>
      <div className="flex items-center gap-[18px]">
        <img src="/assets/overview/status_battery.svg" alt="Battery" />
        <img src="/assets/overview/status_wifi.svg" alt="Wi-Fi" />
      </div>
    </div>
  );
}

export default function SettingsPage({ onOpenReport }: { onOpenReport: () => void }) {
  useDevLifecycleLog(12);

  return (
    <div className="settings-content mx-auto min-h-dvh w-full max-w-[393px] px-4 pb-[calc(120px+env(safe-area-inset-bottom))]">
      <StatusBar />
      <h1 className="settings-title ml-1 mt-[21px] w-[244px] font-poppins text-xl font-semibold leading-[30px] text-[#f2f2f2]">Settings</h1>

      <div className="settings-list mt-7 flex w-full flex-col gap-[13px]">
        {settingsItems.map((item) => (
          <button
            className="settings-card relative flex h-[68px] w-full appearance-none items-center justify-between rounded-[20px] px-5 text-left font-jakarta text-sm font-bold text-white/85 backdrop-blur-[21px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3793ff]"
            type="button"
            key={item}
            onClick={item === "Report" ? onOpenReport : undefined}
          >
            <span>{item}</span>
            <img src="/assets/settings/chevron-right.svg" alt="" aria-hidden="true" />
          </button>
        ))}
      </div>
    </div>
  );
}

export function ReportPage({ onBack }: { onBack: () => void }) {
  const [openPicker, setOpenPicker] = useState<"parameters" | "time" | null>(null);
  const [parameters, setParameters] = useState<string[]>([]);
  const [timePeriod, setTimePeriod] = useState("");
  const revokeUrlTimeout = useRef<number | null>(null);
  const reportObjectUrl = useRef<string | null>(null);
  useDevLifecycleLog(13);

  useEffect(() => {
    if (!openPicker) return;
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    logDevEvent(5);
    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      logDevEvent(6);
    };
  }, [openPicker]);

  useEffect(() => {
    return () => {
      if (revokeUrlTimeout.current !== null) {
        window.clearTimeout(revokeUrlTimeout.current);
        logDevEvent(1, "revoke report URL");
      }
      if (reportObjectUrl.current !== null) {
        URL.revokeObjectURL(reportObjectUrl.current);
        reportObjectUrl.current = null;
        logDevEvent(7, "unmount");
      }
    };
  }, []);

  const toggleParameter = (parameter: string) => {
    setParameters((current) =>
      current.includes(parameter)
        ? current.filter((item) => item !== parameter)
        : current.length < 5
          ? [...current, parameter]
          : current,
    );
  };

  const downloadReport = () => {
    const selectedLabels = parameters.map((id) => reportParameters.find((item) => item.id === id)?.label ?? id);
    const rows = ["UMPIE Report", `Time Period,${timePeriod || "Not selected"}`, `Parameters,${selectedLabels.join("; ") || "Not selected"}`];
    const url = URL.createObjectURL(new Blob([rows.join("\n")], { type: "text/csv" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "umpie-report.csv";
    link.click();
    if (revokeUrlTimeout.current !== null) {
      window.clearTimeout(revokeUrlTimeout.current);
      logDevEvent(1, "previous revoke report URL");
    }
    if (reportObjectUrl.current !== null) {
      URL.revokeObjectURL(reportObjectUrl.current);
      logDevEvent(7, "previous report");
    }
    reportObjectUrl.current = url;
    logDevEvent(0, "revoke report URL");
    revokeUrlTimeout.current = window.setTimeout(() => {
      if (reportObjectUrl.current === url) {
        URL.revokeObjectURL(url);
        reportObjectUrl.current = null;
      }
      revokeUrlTimeout.current = null;
      logDevEvent(7);
    }, 1000);
  };

  return (
    <div className="report-content relative mx-auto min-h-dvh w-full max-w-[393px] px-4 pb-[calc(92px+env(safe-area-inset-bottom))] text-white">
      <StatusBar />

      <header className="report-header mt-[21px] flex h-[35px] w-full items-center gap-3">
        <button className="report-back grid size-[35px] shrink-0 place-items-center rounded-full p-[5px] text-white" type="button" onClick={onBack} aria-label="Back to settings">
          <img src="/assets/settings/arrow-narrow-left.svg" alt="" aria-hidden="true" />
        </button>
        <h1 className="m-0 font-poppins text-xl font-semibold leading-[30px] text-[#f2f2f2]">Report</h1>
      </header>

      <div className="report-fields mt-7 flex w-full flex-col gap-8">
        <ReportField
          label="Parameter List"
          placeholder="Select Parameter"
          value=""
          onClick={() => setOpenPicker("parameters")}
        />
        {parameters.length > 0 && (
          <div className="report-parameter-chips -mt-4 flex w-full flex-wrap gap-4" aria-label="Selected parameters">
            {parameters.map((id) => {
              const label = reportParameters.find((item) => item.id === id)?.label ?? id;
              return (
                <button className="inline-flex h-10 items-center gap-[5px] rounded-full px-[10px] py-2 font-inter text-xs font-semibold text-white backdrop-blur-[21px]" key={id} type="button" onClick={() => toggleParameter(id)}>
                  <span>{label === "Saving" ? "Savings" : label}</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="m6 6 12 12M6 18 18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              );
            })}
          </div>
        )}
        <ReportField
          label="Time Period"
          placeholder="Select Time"
          value={timePeriod}
          onClick={() => setOpenPicker("time")}
        />
      </div>

      <button className="report-download" type="button" onClick={downloadReport}>Download Report</button>

      {openPicker && createPortal((
        <div className="report-picker-layer fixed inset-0 z-50 flex h-dvh w-screen items-end justify-center overscroll-none bg-black/20" role="presentation" onClick={() => setOpenPicker(null)}>
          <section className={`report-picker report-picker--${openPicker} relative flex w-full flex-col overflow-hidden rounded-t-[15px] bg-[#090b1b] px-5 pb-[calc(20px+env(safe-area-inset-bottom))] pt-5 shadow-[inset_0_4px_4px_rgba(0,0,0,.25)] md:max-w-[393px]`} role="dialog" aria-modal="true" aria-label={openPicker === "parameters" ? "Select parameters" : "Select time period"} onClick={(event) => event.stopPropagation()}>
            <div className="report-picker__handle" />
            <div className="report-picker__heading relative flex shrink-0 items-start justify-between border-0 pb-[10px]">
              <div>
                <h2 className="m-0 font-inter text-base font-bold leading-[30px]">{openPicker === "parameters" ? "Select Parameter" : "Select Time"}</h2>
                {openPicker === "parameters" && <p className="m-0 font-inter text-[10px] text-white">Note: Select only 5 options</p>}
              </div>
              <button type="button" onClick={() => setOpenPicker(null)} aria-label="Close">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="m6 6 12 12M6 18 18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="report-picker__options flex min-h-0 flex-1 touch-pan-y flex-col gap-10 overflow-y-auto overflow-x-hidden py-5 [overscroll-behavior-y:contain]">
              {(openPicker === "parameters" ? reportParameters : timePeriods.map((label) => ({ id: label, label }))).map((option) => {
                const checked = openPicker === "parameters" ? parameters.includes(option.id) : timePeriod === option.label;
                return (
                  <label className="flex min-h-5 shrink-0 items-center gap-2 font-inter text-sm font-medium leading-5 text-white/85" key={option.id}>
                    <input
                      type={openPicker === "parameters" ? "checkbox" : "radio"}
                      name={openPicker}
                      checked={checked}
                      disabled={openPicker === "parameters" && parameters.length >= 5 && !checked}
                      onChange={() => openPicker === "parameters" ? toggleParameter(option.id) : setTimePeriod(option.label)}
                    />
                    <span>{option.label}</span>
                  </label>
                );
              })}
            </div>

            <button className="report-picker__confirm flex h-16 w-full shrink-0 items-center justify-center rounded-full bg-primary-gradient px-[25px] py-5 font-jakarta text-sm font-bold text-white/85" type="button" onClick={() => setOpenPicker(null)}>Confirm</button>
          </section>
        </div>
      ), document.body)}
    </div>
  );
}

function ReportField({ label, onClick, placeholder, value }: { label: string; onClick: () => void; placeholder: string; value: string }) {
  return (
    <section className="report-field flex w-full flex-col gap-4">
      <h2 className="m-0 h-5 font-jakarta text-base font-bold leading-5 text-white/85">{label}</h2>
      <button className="flex h-[68px] w-full items-center justify-between gap-[10px] rounded-[20px] px-[25px] py-5 text-left text-white" type="button" onClick={onClick}>
        <span className={value ? "selected" : ""}>{value || placeholder}</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="m9 5 7 7-7 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </section>
  );
}
