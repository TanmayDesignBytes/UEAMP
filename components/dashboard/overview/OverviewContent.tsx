import { EnergyCard, GlassCard, Metric, PerformanceItem } from "@/components/dashboard/common/Cards";
import { StatusBar } from "@/components/dashboard/common/StatusBar";
import { overviewAssets } from "@/components/dashboard/constants";
import { useDevLifecycleLog } from "@/components/dashboard/devDiagnostics";

export function OverviewContent() {
  useDevLifecycleLog(6);

  return (
    <div className="overview-content w-full px-[15px] pb-4">
        <StatusBar />
        <OverviewHeader />
        <GensetStatus />
        <MicrogridHero />
        <div className="dashboard-grid w-full md:grid md:grid-cols-2 md:gap-4 xl:grid-cols-3 xl:gap-[18px]">
          <div className="energy-grid grid grid-cols-2 gap-2 md:col-span-full xl:col-span-2">
            <EnergyCard title="Energy Generated" value="35" unit="kWh" footer="18 kWh Yesterday" accent="#35ffcd" arrowAccent="#35FFC9" barAccent="#ffffff" bars={[75, 50, 75, 100, 75, 100, 50, 25, 100, 100, 75, 50]} barOpacities={[0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.6, 0.6, 0.5, 0.4]} />
            <EnergyCard title="Energy Consumed" value="14" unit="kWh" footer="10 kWh Yesterday" accent="#fff1c1" arrowAccent="#FF7E53" bars={[75, 50, 75, 100, 75, 100, 50, 25, 75, 100, 75, 50]} barOpacities={[0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.6, 0.6, 0.5, 0.4]} />
          </div>
          <GlassCard className="economics-card">
            <img className="economics-card-bg" src="/assets/Rectangle 52.svg" alt="" aria-hidden="true" />
            <h2>Energy Economics</h2>
            <div className="economics-values">
              <Metric label="Saving" labelDetail="(by day)" value="234" />
              <span className="metric-divider" />
              <Metric label="Cost" value="200" />
              <img className="currency-badge" src={overviewAssets + "/currency_badge.svg"} alt="Rupees" />
            </div>
          </GlassCard>
          <GlassCard className="performance-card md:col-span-2">
            <img className="performance-card-bg" src="/assets/Device 6.svg" alt="" aria-hidden="true" />
            <h2>Performance of Assets</h2>
            <div className="performance-body">
              <ul className="performance-list">
                <PerformanceItem color="#1d63b5" name="Solar" percentage="(52%)" value="6,500 kWh" />
                <PerformanceItem color="#88caee" name="Genset" percentage="(20%)" value="2,450 kWh" />
                <PerformanceItem color="#56a2d6" name="Mains" percentage="(28%)" value="3,500 kWh" />
              </ul>
            <div className="donut-chart" role="img" aria-label="Asset performance: Solar 52 percent, Genset 20 percent, Mains 28 percent">
              <img src={overviewAssets + "/performance_donut.svg"} alt="" />
            </div>
            </div>
          </GlassCard>
          <GlassCard className="co2-card relative flex h-[134px] w-full items-center px-[22px] py-[15px]">
          <img className="co2-card-bg" src="/assets/Rectangle 52.svg" alt="" aria-hidden="true" />
          <div>
            <h2>CO2 Emission Avoided</h2>
            <strong>1,248 Tons</strong>
            <svg className="co2-divider" xmlns="http://www.w3.org/2000/svg" width="169" height="1" viewBox="0 0 169 1" fill="none" aria-hidden="true">
              <path d="M0.5 0.5H167.529" stroke="white" strokeOpacity="0.1" strokeLinecap="round" />
            </svg>
            <p>Equivalent to 56000 trees</p>
          </div>
            <img src={overviewAssets + "/co2_leaf.svg"} alt="" />
          </GlassCard>
          <GlassCard className="maintenance-card">
            <img className="maintenance-card-bg" src="/assets/maintenance-card-frame.svg" alt="" aria-hidden="true" />
            <h2>Maintenance</h2>
            <div className="maintenance-line relative flex w-full gap-[6.724px]">
              <span /><span /><span /><span />
              <i className="maintenance-marker" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                  <circle cx="8.06897" cy="8.06897" r="7.0635" fill="white" fillOpacity="0.5" stroke="white" />
                  <path d="M8.06915 8.0625L11.5631 14.1142H4.57519L8.06915 8.0625Z" fill="white" />
                </svg>
                <small>61</small>
              </i>
            </div>
            <div className="maintenance-dates">
              <Metric label="Upcoming" value="26.02.24" detail="124 Hrs" />
              <Metric label="Last" value="26.02.22" detail="102 Hrs" />
            </div>
          </GlassCard>
        </div>
      </div>
  );
}

function OverviewHeader() {
  return (
    <header className="overview-header mt-3 flex w-full items-start justify-between">
      <div><h1>Hi User Name</h1><p>Good Afternoon!</p></div>
      <div className="weather-pill flex items-center justify-center rounded-full">
        <span>{"74\u00b0 F"}</span>
        <img src={overviewAssets + "/cloud_sun.svg"} alt="Partly cloudy" />
      </div>
    </header>
  );
}

function GensetStatus() {
  return <div className="genset-status"><span /><p>Genset Running</p></div>;
}

function MicrogridHero() {
  return (
    <div className="overview-hero relative w-full overflow-hidden">
      <img className="size-full object-cover" src="/assets/images/overview-login-microgrid.gif" alt="Live microgrid" />
      <HeroMetric className="hero-metric--load" label="Load" />
      <HeroMetric className="hero-metric--export" label="Exported" />
    </div>
  );
}

function HeroMetric({ className, label }: { className: string; label: string }) {
  return (
    <div className={"hero-metric " + className}>
      <strong><i />28.2 kWh</strong>
      <span>{label}</span>
    </div>
  );
}
