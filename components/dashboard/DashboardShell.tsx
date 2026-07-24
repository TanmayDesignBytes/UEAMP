"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import SettingsPage, { AppSettingsPage, ProfileSettingsPage, ReportPage, ResetPasswordPage } from "@/components/settings/SettingsPage";
import { AlertContent } from "@/components/dashboard/alerts/AlertContent";
import { logDevEvent, logDevMemory, useDevLifecycleLog } from "@/components/dashboard/devDiagnostics";
import { GensetContent } from "@/components/dashboard/genset/GensetContent";
import { GensetEnergyContent } from "@/components/dashboard/genset/GensetEnergyContent";
import { BottomNavigation } from "@/components/dashboard/navigation/BottomNavigation";
import { OverviewContent } from "@/components/dashboard/overview/OverviewContent";
import { PowerOutputContent } from "@/components/dashboard/energy/PowerOutputContent";
import { SolarContent } from "@/components/dashboard/solar/SolarContent";
import { SolarEnergyContent } from "@/components/dashboard/solar/SolarEnergyContent";
import { AmbientTemperaturePage } from "@/components/dashboard/weather/AmbientTemperaturePage";
import type { DashboardScope, DashboardTab } from "@/components/dashboard/types";

type SavedDashboardPage = DashboardTab | "report" | "app-settings" | "profile-settings" | "reset-password" | "ambient-temperature";

type SavedDashboardState = {
  activeTab: DashboardTab;
  dashboardScope: DashboardScope;
  page: SavedDashboardPage;
};

const DASHBOARD_STATE_KEY = "umpie-dashboard-state";

function getSavedDashboardState(): SavedDashboardState {
  const fallback: SavedDashboardState = { activeTab: "overview", dashboardScope: "overview", page: "overview" };
  if (typeof window === "undefined") return fallback;

  try {
    const saved = JSON.parse(window.localStorage.getItem(DASHBOARD_STATE_KEY) || "null") as Partial<SavedDashboardState> | null;
    const tabs: DashboardTab[] = ["overview", "genset", "solar", "energy", "alert", "settings"];
    const scopes: DashboardScope[] = ["overview", "genset", "solar"];
    const pages: SavedDashboardPage[] = [...tabs, "report", "app-settings", "profile-settings", "reset-password", "ambient-temperature"];

    return {
      activeTab: saved?.activeTab && tabs.includes(saved.activeTab) ? saved.activeTab : fallback.activeTab,
      dashboardScope: saved?.dashboardScope && scopes.includes(saved.dashboardScope) ? saved.dashboardScope : fallback.dashboardScope,
      page: saved?.page && pages.includes(saved.page) ? saved.page : fallback.page,
    };
  } catch {
    return fallback;
  }
}

export function DashboardShell() {
  const [initialState] = useState(getSavedDashboardState);
  const [activeTab, setActiveTab] = useState<DashboardTab>(initialState.activeTab);
  const [dashboardScope, setDashboardScope] = useState<DashboardScope>(initialState.dashboardScope);
  const [quickMenuOpen, setQuickMenuOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(initialState.page === "report");
  const [appSettingsOpen, setAppSettingsOpen] = useState(initialState.page === "app-settings");
  const [profileSettingsOpen, setProfileSettingsOpen] = useState(initialState.page === "profile-settings");
  const [resetPasswordOpen, setResetPasswordOpen] = useState(initialState.page === "reset-password");
  const [ambientTemperatureOpen, setAmbientTemperatureOpen] = useState(initialState.page === "ambient-temperature");
  const isGensetEnergyPage = activeTab === "energy" && dashboardScope === "genset";
  const isSolarEnergyPage = activeTab === "energy" && dashboardScope === "solar";
  const energyShellClass = isGensetEnergyPage ? "dashboard-shell--genset-energy" : isSolarEnergyPage ? "dashboard-shell--solar-energy" : "";
  const settingsShellClass = activeTab === "settings" && !reportOpen && !appSettingsOpen && !profileSettingsOpen && !resetPasswordOpen ? "dashboard-shell--settings" : "";
  useDevLifecycleLog(1);

  const navigate = useCallback((tab: DashboardTab) => {
    logDevEvent(3, tab);
    if (tab === "overview" || tab === "genset" || tab === "solar") setDashboardScope(tab);
    setActiveTab(tab);
    setReportOpen(false);
    setAppSettingsOpen(false);
    setProfileSettingsOpen(false);
    setResetPasswordOpen(false);
    setAmbientTemperatureOpen(false);
    setQuickMenuOpen(false);
  }, []);

  const openReport = useCallback(() => {
    logDevEvent(3, "report");
    setReportOpen(true);
    setAppSettingsOpen(false);
    setProfileSettingsOpen(false);
    setResetPasswordOpen(false);
  }, []);

  const openAppSettings = useCallback(() => {
    logDevEvent(3, "app-settings");
    setAppSettingsOpen(true);
    setReportOpen(false);
    setProfileSettingsOpen(false);
    setResetPasswordOpen(false);
  }, []);

  const openProfileSettings = useCallback(() => {
    logDevEvent(3, "profile-settings");
    setProfileSettingsOpen(true);
    setResetPasswordOpen(false);
    setReportOpen(false);
    setAppSettingsOpen(false);
  }, []);

  const openResetPassword = useCallback(() => {
    logDevEvent(3, "reset-password");
    setResetPasswordOpen(true);
    setProfileSettingsOpen(false);
  }, []);

  const openAmbientTemperature = useCallback(() => {
    logDevEvent(3, "ambient-temperature");
    setAmbientTemperatureOpen(true);
    setQuickMenuOpen(false);
  }, []);

  const scopedContent = useMemo(() => (
    activeTab === "overview" ? <OverviewContent onOpenAmbientTemperature={openAmbientTemperature} /> :
    activeTab === "genset" ? <GensetContent onOpenAmbientTemperature={openAmbientTemperature} /> :
    activeTab === "solar" ? <SolarContent onOpenAmbientTemperature={openAmbientTemperature} /> :
    activeTab === "energy" ? <ScopedEnergyContent scope={dashboardScope} /> :
    activeTab === "alert" ? <ScopedAlertContent scope={dashboardScope} /> :
    <SettingsPage onOpenAppSettings={openAppSettings} onOpenProfileSettings={openProfileSettings} onOpenReport={openReport} />
  ), [activeTab, dashboardScope, openAmbientTemperature, openAppSettings, openProfileSettings, openReport]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const scroller = document.scrollingElement || document.documentElement;
      scroller.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });

    return () => cancelAnimationFrame(frame);
  }, [activeTab, ambientTemperatureOpen, appSettingsOpen, dashboardScope, profileSettingsOpen, reportOpen, resetPasswordOpen]);

  useEffect(() => {
    const page = ambientTemperatureOpen ? "ambient-temperature" : resetPasswordOpen ? "reset-password" : appSettingsOpen ? "app-settings" : profileSettingsOpen ? "profile-settings" : reportOpen ? "report" : activeTab;
    logDevEvent(4, page, "scope", dashboardScope);
    logDevMemory(1, page);
    window.localStorage.setItem(DASHBOARD_STATE_KEY, JSON.stringify({ activeTab, dashboardScope, page } satisfies SavedDashboardState));
  }, [activeTab, ambientTemperatureOpen, appSettingsOpen, dashboardScope, profileSettingsOpen, reportOpen, resetPasswordOpen]);

  return (
    <section className={`overview-screen screen-background screen-enter relative min-h-dvh w-full bg-page-gradient pb-[calc(101px+env(safe-area-inset-bottom))] text-white ${energyShellClass} ${settingsShellClass}`}>
      {ambientTemperatureOpen ? <AmbientTemperaturePage onBack={() => {
        logDevEvent(3, "overview");
        setAmbientTemperatureOpen(false);
      }} /> : resetPasswordOpen ? <ResetPasswordPage onBack={() => {
        logDevEvent(3, "profile-settings");
        setResetPasswordOpen(false);
        setProfileSettingsOpen(true);
      }} /> : appSettingsOpen ? <AppSettingsPage onBack={() => {
        logDevEvent(3, "settings");
        setAppSettingsOpen(false);
      }} /> : profileSettingsOpen ? <ProfileSettingsPage onOpenResetPassword={openResetPassword} onBack={() => {
        logDevEvent(3, "settings");
        setProfileSettingsOpen(false);
      }} /> : reportOpen ? <ReportPage onBack={() => {
        logDevEvent(3, "settings");
        setReportOpen(false);
      }} /> : scopedContent}
      {quickMenuOpen && (
        <>
          <button className="quick-menu-backdrop fixed inset-0 z-[18] h-dvh w-screen bg-[#010510]/15 backdrop-blur-[7px]" type="button" aria-label="Close quick menu" onClick={() => setQuickMenuOpen(false)} />
          <div className="quick-menu pointer-events-none fixed bottom-[calc(101px+env(safe-area-inset-bottom))] left-1/2 z-[22] h-[88px] w-[196px] -translate-x-1/2" aria-label="Quick navigation">
            <button className="quick-menu__item quick-menu__item--overview pointer-events-auto absolute flex size-[60px] flex-col items-center justify-center rounded-full font-inter text-white" type="button" onClick={() => navigate("overview")}> 
              <img src="/assets/quick-menu/overview.svg" alt="" />
              <span>Overview</span>
            </button>
            <button className="quick-menu__item quick-menu__item--genset pointer-events-auto absolute flex size-[60px] flex-col items-center justify-center rounded-full font-inter text-white" type="button" onClick={() => navigate("genset")}>
              <img src="/assets/quick-menu/genset.svg" alt="" />
              <span>Genset</span>
            </button>
            <button className="quick-menu__item quick-menu__item--solar pointer-events-auto absolute flex size-[60px] flex-col items-center justify-center rounded-full font-inter text-white" type="button" onClick={() => navigate("solar")}>
              <img src="/assets/quick-menu/solar.svg" alt="" />
              <span>Solar</span>
            </button>
          </div>
        </>
      )}
      {!ambientTemperatureOpen && !reportOpen && !appSettingsOpen && !profileSettingsOpen && !resetPasswordOpen && <BottomNavigation activeTab={activeTab} dashboardScope={dashboardScope} onNavigate={navigate} quickMenuOpen={quickMenuOpen} onToggleQuickMenu={() => setQuickMenuOpen((open) => !open)} />}
    </section>
  );
}

function ScopedEnergyContent({ scope }: { scope: DashboardScope }) {
  return scope === "overview" ? <PowerOutputContent /> : scope === "genset" ? <GensetEnergyContent /> : <SolarEnergyContent />;
}

function ScopedAlertContent({ scope: _scope }: { scope: DashboardScope }) {
  return <AlertContent />;
}
