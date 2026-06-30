import { overviewAssets } from "@/components/dashboard/constants";
import type { DashboardScope, DashboardTab } from "@/components/dashboard/types";

export function BottomNavigation({ activeTab, dashboardScope, onNavigate, quickMenuOpen, onToggleQuickMenu }: { activeTab: DashboardTab; dashboardScope: DashboardScope; onNavigate: (tab: DashboardTab) => void; quickMenuOpen: boolean; onToggleQuickMenu: () => void }) {
  const gensetMode = dashboardScope === "genset";
  const solarMode = dashboardScope === "solar";
  const firstTab: DashboardTab = gensetMode ? "genset" : solarMode ? "solar" : "overview";
  const firstLabel = gensetMode ? "Genset" : solarMode ? "Solar" : "Overview";
  const firstIcon = gensetMode ? "/assets/quick-menu/genset.svg" : solarMode ? "/assets/quick-menu/solar.svg" : overviewAssets + "/overview_nav.svg";
  return (
    <nav className={`bottom-navigation fixed inset-x-0 bottom-0 z-20 mx-auto w-full max-w-[393px] rounded-t-2xl border-b-0 backdrop-blur-[40px] ${gensetMode ? "bottom-navigation--genset" : ""} ${solarMode ? "bottom-navigation--solar" : ""}`} aria-label="Main navigation">
      <span className={"nav-active-indicator nav-active-indicator--" + activeTab} aria-hidden="true" />
      <div className="bottom-navigation__items mx-auto grid h-14 w-full max-w-[343px] grid-cols-5 items-center">
        <button className={"nav-item flex flex-col items-center justify-center gap-1 bg-transparent " + (activeTab === firstTab ? "active" : "")} onClick={() => onNavigate(firstTab)} type="button" aria-current={activeTab === firstTab ? "page" : undefined}>
          <span className={`nav-icon relative grid size-7 place-items-center ${gensetMode ? "nav-icon--genset" : solarMode ? "nav-icon--solar" : "nav-icon--overview"}`}>
            <img src={firstIcon} alt="" />
          </span>
          <small>{firstLabel}</small>
        </button>

        <button className={"nav-item flex flex-col items-center justify-center gap-1 bg-transparent " + (activeTab === "energy" ? "active" : "")} onClick={() => onNavigate("energy")} type="button" aria-current={activeTab === "energy" ? "page" : undefined}>
          <span className="nav-icon nav-icon--energy relative grid size-7 place-items-center" aria-hidden="true">
            <img src="/assets/quick-menu/energy.svg" alt="" />
          </span>
          <small>Energy</small>
        </button>

        <button className={"nav-home grid place-items-center bg-transparent " + (quickMenuOpen ? "open" : "")} type="button" aria-label={quickMenuOpen ? "Close quick menu" : "Open quick menu"} aria-expanded={quickMenuOpen} onClick={onToggleQuickMenu}>
          <span className="nav-home__glow relative grid size-14 place-items-center rounded-full">
            {quickMenuOpen ? <img src="/assets/quick-menu/close.svg" alt="" /> : gensetMode ? <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true"><path d="m14 4 9 5-9 5-9-5 9-5Zm-9 10 9 5 9-5M5 19l9 5 9-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> : solarMode ? <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true"><path d="m14 4 9 5-9 5-9-5 9-5Zm-9 10 9 5 9-5M5 19l9 5 9-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> : <img src={overviewAssets + "/assets_nav.svg"} alt="" />}
          </span>
        </button>

        <button className={"nav-item flex flex-col items-center justify-center gap-1 bg-transparent " + (activeTab === "alert" ? "active" : "")} onClick={() => onNavigate("alert")} type="button" aria-current={activeTab === "alert" ? "page" : undefined}>
          <span className="nav-icon nav-icon--alert relative grid size-7 place-items-center">
            <img src={overviewAssets + "/alert_nav.svg"} alt="" />
            <img className="nav-notification-dot" src={overviewAssets + "/notification_dot.svg"} alt="" />
          </span>
          <small>Alert</small>
        </button>

        <button className={"nav-item flex flex-col items-center justify-center gap-1 bg-transparent " + (activeTab === "settings" ? "active" : "")} onClick={() => onNavigate("settings")} type="button" aria-current={activeTab === "settings" ? "page" : undefined}>
          <span className="nav-icon nav-icon--settings relative grid size-7 place-items-center">
            <img src={overviewAssets + "/settings_nav.svg"} alt="" />
          </span>
          <small>Settings</small>
        </button>
      </div>
    </nav>
  );
}
