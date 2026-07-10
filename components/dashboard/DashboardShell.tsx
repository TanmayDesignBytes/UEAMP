"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import SettingsPage, { ReportPage } from "@/components/settings/SettingsPage";
import { AlertContent } from "@/components/dashboard/alerts/AlertContent";
import { logDevEvent, logDevMemory, useDevLifecycleLog } from "@/components/dashboard/devDiagnostics";
import { GensetContent } from "@/components/dashboard/genset/GensetContent";
import { GensetEnergyContent } from "@/components/dashboard/genset/GensetEnergyContent";
import { BottomNavigation } from "@/components/dashboard/navigation/BottomNavigation";
import { OverviewContent } from "@/components/dashboard/overview/OverviewContent";
import { PowerOutputContent } from "@/components/dashboard/energy/PowerOutputContent";
import { SolarContent } from "@/components/dashboard/solar/SolarContent";
import { SolarEnergyContent } from "@/components/dashboard/solar/SolarEnergyContent";
import type { DashboardScope, DashboardTab } from "@/components/dashboard/types";

export function DashboardShell() {
  const [activeTab, setActiveTab] = useState<DashboardTab>("overview");
  const [dashboardScope, setDashboardScope] = useState<DashboardScope>("overview");
  const [quickMenuOpen, setQuickMenuOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const isGensetEnergyPage = activeTab === "energy" && dashboardScope === "genset";
  const isSolarEnergyPage = activeTab === "energy" && dashboardScope === "solar";
  const energyShellClass = isGensetEnergyPage ? "dashboard-shell--genset-energy" : isSolarEnergyPage ? "dashboard-shell--solar-energy" : "";
  const settingsShellClass = activeTab === "settings" && !reportOpen ? "dashboard-shell--settings" : "";
  useDevLifecycleLog(1);

  const navigate = useCallback((tab: DashboardTab) => {
    logDevEvent(3, tab);
    if (tab === "overview" || tab === "genset" || tab === "solar") setDashboardScope(tab);
    setActiveTab(tab);
    setReportOpen(false);
    setQuickMenuOpen(false);
  }, []);

  const openReport = useCallback(() => {
    logDevEvent(3, "report");
    setReportOpen(true);
  }, []);

  const scopedContent = useMemo(() => (
    activeTab === "overview" ? <OverviewContent /> :
    activeTab === "genset" ? <GensetContent /> :
    activeTab === "solar" ? <SolarContent /> :
    activeTab === "energy" ? <ScopedEnergyContent scope={dashboardScope} /> :
    activeTab === "alert" ? <ScopedAlertContent scope={dashboardScope} /> :
    <SettingsPage onOpenReport={openReport} />
  ), [activeTab, dashboardScope, openReport]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const scroller = document.scrollingElement || document.documentElement;
      scroller.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });

    return () => cancelAnimationFrame(frame);
  }, [activeTab, dashboardScope, reportOpen]);

  useEffect(() => {
    const page = reportOpen ? "report" : activeTab;
    logDevEvent(4, page, "scope", dashboardScope);
    logDevMemory(1, page);
  }, [activeTab, dashboardScope, reportOpen]);

  return (
    <section className={`overview-screen screen-background screen-enter relative min-h-dvh w-full bg-page-gradient pb-[calc(101px+env(safe-area-inset-bottom))] text-white ${energyShellClass} ${settingsShellClass}`}>
      {reportOpen ? <ReportPage onBack={() => {
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
      {!reportOpen && <BottomNavigation activeTab={activeTab} dashboardScope={dashboardScope} onNavigate={navigate} quickMenuOpen={quickMenuOpen} onToggleQuickMenu={() => setQuickMenuOpen((open) => !open)} />}
    </section>
  );
}

function ScopedEnergyContent({ scope }: { scope: DashboardScope }) {
  return scope === "overview" ? <PowerOutputContent /> : scope === "genset" ? <GensetEnergyContent /> : <SolarEnergyContent />;
}

function ScopedAlertContent({ scope: _scope }: { scope: DashboardScope }) {
  return <AlertContent />;
}
