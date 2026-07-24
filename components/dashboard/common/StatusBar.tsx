export function StatusBar() {
  return (
    <div className="figma-statusbar flex h-[35px] items-center justify-between font-inter text-xs font-medium text-[#e2ebf4]" aria-hidden="true">
      <span>9:41</span>
      <div>
        <img src="/assets/overview/status_battery.svg" alt="" />
        <img src="/assets/overview/status_wifi.svg" alt="" />
      </div>
    </div>
  );
}
