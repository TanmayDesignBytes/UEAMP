"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { logDevEvent, useDevLifecycleLog } from "@/components/dashboard/devDiagnostics";
import { StatusBar } from "@/components/dashboard/common/StatusBar";

const settingsItems = [
  { label: "Reports", action: "report" },
  { label: "App Settings", action: "app-settings" },
  { label: "Profile Settings", action: "profile-settings" },
  { label: "Logout", tone: "danger" },
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

const unitOptions = ["SI", "Imperial"];

export default function SettingsPage({ onOpenAppSettings, onOpenProfileSettings, onOpenReport }: { onOpenAppSettings: () => void; onOpenProfileSettings: () => void; onOpenReport: () => void }) {
  useDevLifecycleLog(12);

  const getSettingsAction = (action?: string) => {
    if (action === "report") return onOpenReport;
    if (action === "app-settings") return onOpenAppSettings;
    if (action === "profile-settings") return onOpenProfileSettings;
    return undefined;
  };

  return (
    <div className="settings-content mx-auto min-h-dvh w-full max-w-[393px] px-4 pb-[calc(120px+env(safe-area-inset-bottom))]">
      <StatusBar />
      <h1 className="settings-title ml-1 mt-[21px] w-[244px] font-poppins text-xl font-semibold leading-[30px] text-[#f2f2f2]">Settings</h1>

      <div className="settings-list mt-7 flex w-full flex-col gap-[13px]">
        {settingsItems.map((item) => (
          <button
            className={"settings-card relative flex h-[68px] w-full appearance-none items-center justify-between rounded-[20px] px-5 text-left font-jakarta text-sm font-bold text-white/85 backdrop-blur-[21px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3793ff]" + (item.tone === "danger" ? " settings-card--danger" : "")}
            type="button"
            key={item.label}
            onClick={getSettingsAction(item.action)}
          >
            <span>{item.label}</span>
            {item.tone === "danger" ? (
              <img className="settings-card__logout-icon" src="/assets/settings/log-out-01.svg" alt="" aria-hidden="true" />
            ) : (
              <img src="/assets/settings/chevron-right.svg" alt="" aria-hidden="true" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export function AppSettingsPage({ onBack }: { onBack: () => void }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [unit, setUnit] = useState("SI");
  const [unitPickerOpen, setUnitPickerOpen] = useState(false);
  const [draftUnit, setDraftUnit] = useState("SI");
  useDevLifecycleLog(14);

  const openUnitPicker = () => {
    setDraftUnit(unit);
    setUnitPickerOpen(true);
  };

  return (
    <div className="app-settings-content relative mx-auto min-h-dvh w-full max-w-[393px] px-4 pb-[calc(92px+env(safe-area-inset-bottom))] text-white">
      <StatusBar />

      <header className="report-header app-settings-header mt-[21px] flex h-[35px] w-full items-center gap-3">
        <button className="report-back grid size-[35px] shrink-0 place-items-center rounded-full p-[5px] text-white" type="button" onClick={onBack} aria-label="Back to settings">
          <img src="/assets/settings/arrow-narrow-left.svg" alt="" aria-hidden="true" />
        </button>
        <h1 className="m-0 font-poppins text-xl font-semibold leading-[30px] text-[#f2f2f2]">App Settings</h1>
      </header>

      <div className="app-settings-fields">
        <section className="app-settings-field">
          <h2 className="app-settings-label app-settings-label--notification">Notification Status</h2>
          <button
            className="app-settings-control app-settings-notification-control"
            type="button"
            onClick={() => setNotificationsEnabled((enabled) => !enabled)}
            aria-pressed={notificationsEnabled}
          >
            <span>{notificationsEnabled ? "ON" : "OFF"}</span>
            <span className={`app-settings-toggle${notificationsEnabled ? " app-settings-toggle--on" : ""}`} aria-hidden="true">
              <span />
            </span>
          </button>
        </section>

        <section className="app-settings-field">
          <h2 className="app-settings-label">Change Unit</h2>
          <button
            className="app-settings-control app-settings-unit-control"
            type="button"
            aria-haspopup="dialog"
            aria-expanded={unitPickerOpen}
            aria-label="Change Unit"
            onClick={openUnitPicker}
          >
            <span>{unit}</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </section>
      </div>

      {unitPickerOpen && createPortal((
        <div className="report-picker-layer fixed inset-0 z-50 flex h-dvh w-screen items-end justify-center overscroll-none bg-black/20" role="presentation" onClick={() => setUnitPickerOpen(false)}>
          <section className="report-picker report-picker--time relative flex w-full flex-col overflow-hidden rounded-t-[15px] bg-[#090b1b] px-5 pb-[calc(20px+env(safe-area-inset-bottom))] pt-5 shadow-[inset_0_4px_4px_rgba(0,0,0,.25)] md:max-w-[393px]" role="dialog" aria-modal="true" aria-label="Change unit" onClick={(event) => event.stopPropagation()}>
            <div className="report-picker__handle" />
            <div className="report-picker__heading relative flex shrink-0 items-start justify-between border-0 pb-[10px]">
              <h2 className="m-0 font-inter text-base font-bold leading-[30px]">Change Unit</h2>
              <button type="button" onClick={() => setUnitPickerOpen(false)} aria-label="Close">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="m6 6 12 12M6 18 18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="report-picker__options flex min-h-0 flex-1 touch-pan-y flex-col gap-10 overflow-y-auto overflow-x-hidden py-5 [overscroll-behavior-y:contain]">
              {unitOptions.map((option) => (
                <label className="flex min-h-5 shrink-0 items-center gap-2 font-inter text-sm font-medium leading-5 text-white/85" key={option}>
                  <input type="radio" name="unit-select" checked={draftUnit === option} onChange={() => setDraftUnit(option)} />
                  <span>{option}</span>
                </label>
              ))}
            </div>

            <button className="report-picker__confirm flex h-16 w-full shrink-0 items-center justify-center rounded-full bg-primary-gradient px-[25px] py-5 font-jakarta text-sm font-bold text-white/85" type="button" onClick={() => { setUnit(draftUnit); setUnitPickerOpen(false); }}>Confirm</button>
          </section>
        </div>
      ), document.body)}
    </div>
  );
}

export function ProfileSettingsPage({ onBack, onOpenResetPassword }: { onBack: () => void; onOpenResetPassword: () => void }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  useDevLifecycleLog(15);

  const userName = "Kirloskar";
  const email = "Kirloskar@org.com";
  const password = "Kirloskar@123";

  return (
    <div className="profile-settings-content relative mx-auto min-h-dvh w-full max-w-[393px] px-5 pb-[calc(92px+env(safe-area-inset-bottom))] text-white">
      <StatusBar />

      <header className="report-header profile-settings-header mt-[15px] flex h-[35px] w-full items-center gap-3">
        <button className="report-back grid size-[35px] shrink-0 place-items-center rounded-full p-[5px] text-white" type="button" onClick={onBack} aria-label="Back to settings">
          <img src="/assets/settings/arrow-narrow-left.svg" alt="" aria-hidden="true" />
        </button>
        <h1 className="m-0 font-poppins text-xl font-semibold leading-[30px] text-[#f2f2f2]">Profile Settings</h1>
      </header>

      <section className="profile-group profile-account-group mt-2">
        <h2 className="profile-group__label m-0 font-jakarta text-sm font-bold uppercase leading-normal text-white opacity-60">Account Info</h2>
        <div className="profile-card mt-4 flex flex-col items-start gap-3 self-stretch rounded-[20px] p-5 backdrop-blur-[21px]">
          <div className="flex w-full items-start justify-between">
            <span className="font-jakarta text-[13px] font-semibold leading-normal text-white opacity-60">User Name</span>
            <button type="button" aria-label="Edit user name"><img src="/assets/settings/edit.svg" alt="" aria-hidden="true" /></button>
          </div>
          <div className="font-jakarta text-base font-medium leading-normal text-white">{userName}</div>

          <div className="profile-divider h-px w-full self-stretch" />

          <div className="profile-email-row flex w-full items-start justify-between">
            <span className="font-jakarta text-[13px] font-semibold leading-normal text-white opacity-60">Email Address</span>
            <button type="button" aria-label="Edit email address"><img src="/assets/settings/edit.svg" alt="" aria-hidden="true" /></button>
          </div>
          <div className="profile-email-value font-jakarta text-base font-medium leading-normal text-white">{email}</div>
        </div>
      </section>

      <section className="profile-group profile-security-group mt-4">
        <h2 className="profile-group__label profile-security-label m-0 font-jakarta text-sm font-bold uppercase leading-normal text-white opacity-60">Security Info</h2>
        <div className="profile-card mt-4 flex h-[185px] flex-col items-start gap-3 self-stretch rounded-[20px] p-5 backdrop-blur-[21px]">
          <div className="flex w-full items-start justify-between">
            <span className="font-jakarta text-[13px] font-semibold leading-normal text-white opacity-60">Password</span>
            <button type="button" aria-label={passwordVisible ? "Hide password" : "Show password"} aria-pressed={passwordVisible} onClick={() => setPasswordVisible((visible) => !visible)}>
              <img src="/assets/settings/eye.svg" alt="" aria-hidden="true" />
            </button>
          </div>
          <div className="font-jakarta text-base font-medium leading-normal tracking-[0.12em] text-white">{passwordVisible ? password : "•".repeat(password.length)}</div>

          <div className="profile-divider profile-security-divider h-px w-full self-stretch" />

          <button className="profile-reset-password flex w-full items-center justify-between text-left" type="button" onClick={onOpenResetPassword}>
            <span className="font-jakarta text-sm font-semibold leading-normal text-white opacity-85">Reset Password</span>
            <img className="profile-reset-password-arrow" src="/assets/settings/chevron-down.svg" alt="" aria-hidden="true" />
          </button>
        </div>
      </section>
    </div>
  );
}

export function ResetPasswordPage({ onBack }: { onBack: () => void }) {
  const [currentPassword, setCurrentPassword] = useState("Kirloskar@123");
  const [newPassword, setNewPassword] = useState("SecurePass1");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  return (
    <div className="reset-password-content relative mx-auto min-h-dvh w-full max-w-[393px] px-5 pb-[calc(92px+env(safe-area-inset-bottom))] text-white">
      <StatusBar />

      <header className="report-header reset-password-header mt-[15px] flex h-[35px] w-full items-center gap-3">
        <button className="report-back grid size-[35px] shrink-0 place-items-center rounded-full p-[5px] text-white" type="button" onClick={onBack} aria-label="Back to profile settings">
          <img src="/assets/settings/arrow-narrow-left.svg" alt="" aria-hidden="true" />
        </button>
        <h1 className="m-0 font-poppins text-xl font-semibold leading-[30px] text-[#f2f2f2]">Reset Password</h1>
      </header>

      <p className="mt-5 w-full font-jakarta text-[15px] font-normal leading-[22px] text-white/75">
        Create a new secure password for your account
      </p>

      <div className="reset-password-form mt-8 flex w-full flex-col gap-6">
        <label className="reset-password-field">
          <span className="reset-password-label">Current Password</span>
          <span className="reset-password-control">
            <input
              className={currentPasswordVisible ? "" : "is-svg-masked"}
              type="text"
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              autoComplete="current-password"
              aria-label="Current Password"
            />
            {!currentPasswordVisible && (
              <img className="reset-password-mask" src="/assets/settings/masked-password.svg" alt="" aria-hidden="true" />
            )}
            <button
              type="button"
              aria-label={currentPasswordVisible ? "Hide current password" : "Show current password"}
              aria-pressed={currentPasswordVisible}
              onClick={() => setCurrentPasswordVisible((visible) => !visible)}
            >
              <img src="/assets/settings/eye.svg" alt="" aria-hidden="true" />
            </button>
          </span>
        </label>

        <label className="reset-password-field reset-password-field--new">
          <span className="reset-password-label">New Password</span>
          <span className="reset-password-control">
            <input
              type={newPasswordVisible ? "text" : "password"}
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              autoComplete="new-password"
              aria-label="New Password"
            />
            <button
              type="button"
              aria-label={newPasswordVisible ? "Hide new password" : "Show new password"}
              aria-pressed={newPasswordVisible}
              onClick={() => setNewPasswordVisible((visible) => !visible)}
            >
              <img src="/assets/settings/eye.svg" alt="" aria-hidden="true" />
            </button>
          </span>
          <span className="reset-password-strength" aria-label="Password strength: Medium">
            <span className="reset-password-strength__bars" aria-hidden="true">
              <span className="is-active" />
              <span className="is-active" />
              <span className="is-active" />
              <span />
            </span>
            <span className="reset-password-strength__label">Medium Strength</span>
          </span>
        </label>

        <label className="reset-password-field reset-password-field--confirm">
          <span className="reset-password-label">Confirm New Password</span>
          <span className="reset-password-control">
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              autoComplete="new-password"
              placeholder="Re-enter new password"
              aria-label="Confirm New Password"
            />
            <button
              type="button"
              aria-label={confirmPasswordVisible ? "Hide confirmed password" : "Show confirmed password"}
              aria-pressed={confirmPasswordVisible}
              onClick={() => setConfirmPasswordVisible((visible) => !visible)}
            >
              <img src="/assets/settings/eye.svg" alt="" aria-hidden="true" />
            </button>
          </span>
        </label>

        <section className="reset-password-requirements" aria-labelledby="password-requirements-title">
          <h2 id="password-requirements-title">Password Requirements</h2>
          <ul>
            {[
              { id: "length", label: "At least 8 characters", met: true },
              { id: "uppercase", label: "One uppercase letter", met: true },
              { id: "number", label: "One number", met: false },
              { id: "special", label: "One special character", met: false },
            ].map((requirement) => (
              <li className={requirement.met ? "is-met" : ""} key={requirement.label}>
                <span className="reset-password-requirement-check" aria-hidden="true">
                  <img
                    src={requirement.met ? "/assets/settings/password-check-complete.svg" : "/assets/settings/password-check.svg"}
                    alt=""
                  />
                </span>
                <span className={`reset-password-requirement-text reset-password-requirement-${requirement.id}`}>
                  {requirement.label}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <button className="reset-password-submit" type="button">
          Update Password
        </button>
      </div>
    </div>
  );
}

export function ReportPage({ onBack }: { onBack: () => void }) {
  const [openPicker, setOpenPicker] = useState<"parameters" | "time" | null>(null);
  const [parameters, setParameters] = useState<string[]>([]);
  const [timePeriod, setTimePeriod] = useState("");
  // Draft state: the picker edits these; only Confirm commits them to the
  // real state above. Closing via X or the backdrop discards the draft.
  const [draftParameters, setDraftParameters] = useState<string[]>([]);
  const [draftTimePeriod, setDraftTimePeriod] = useState("");
  const [pickerThumbTop, setPickerThumbTop] = useState(0);
  const pickerOptionsRef = useRef<HTMLDivElement | null>(null);
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

  const toggleDraftParameter = (parameter: string) => {
    setDraftParameters((current) =>
      current.includes(parameter)
        ? current.filter((item) => item !== parameter)
        : current.length < 5
          ? [...current, parameter]
          : current,
    );
  };

  const openParametersPicker = () => {
    setDraftParameters(parameters);
    setPickerThumbTop(0);
    setOpenPicker("parameters");
  };

  const openTimePicker = () => {
    setDraftTimePeriod(timePeriod);
    setPickerThumbTop(0);
    setOpenPicker("time");
  };

  const confirmPicker = () => {
    if (openPicker === "parameters") setParameters(draftParameters);
    else if (openPicker === "time") setTimePeriod(draftTimePeriod);
    setOpenPicker(null);
  };

  const updatePickerThumb = () => {
    const options = pickerOptionsRef.current;
    if (!options) return;

    const maxScroll = options.scrollHeight - options.clientHeight;
    const availableTrack = Math.max(options.clientHeight - 157, 0);
    const progress = maxScroll > 0 ? options.scrollTop / maxScroll : 0;
    setPickerThumbTop(progress * availableTrack);
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
          onClick={openParametersPicker}
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
          onClick={openTimePicker}
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

            <div className="report-picker__options-wrap relative flex min-h-0 flex-1">
              <div ref={pickerOptionsRef} onScroll={updatePickerThumb} className="report-picker__options flex min-h-0 flex-1 touch-pan-y flex-col gap-10 overflow-y-auto overflow-x-hidden py-5 [overscroll-behavior-y:contain]">
                {(openPicker === "parameters" ? reportParameters : timePeriods.map((label) => ({ id: label, label }))).map((option) => {
                  const checked = openPicker === "parameters" ? draftParameters.includes(option.id) : draftTimePeriod === option.label;
                  return (
                    <label className="flex min-h-5 shrink-0 items-center gap-2 font-inter text-sm font-medium leading-5 text-white/85" key={option.id}>
                      <input
                        type={openPicker === "parameters" ? "checkbox" : "radio"}
                        name={openPicker}
                        checked={checked}
                        disabled={openPicker === "parameters" && draftParameters.length >= 5 && !checked}
                        onChange={() => openPicker === "parameters" ? toggleDraftParameter(option.id) : setDraftTimePeriod(option.label)}
                      />
                      <span>{option.label}</span>
                    </label>
                  );
                })}
              </div>
              {openPicker === "parameters" && (
                <span
                  className="report-picker__scroll-thumb"
                  style={{ transform: `translateY(${pickerThumbTop}px)` }}
                  aria-hidden="true"
                />
              )}
            </div>

            <button className="report-picker__confirm flex h-16 w-full shrink-0 items-center justify-center rounded-full bg-primary-gradient px-[25px] py-5 font-jakarta text-sm font-bold text-white/85" type="button" onClick={confirmPicker}>Confirm</button>
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
