import { overviewAssets } from "@/components/dashboard/constants";

export function StatusBar() {
  return (
    <div className="figma-statusbar flex h-[35px] items-center justify-between font-inter text-xs font-medium text-[#e2ebf4]" aria-label="Device status">
      <span>9:41</span>
      <div className="flex items-center gap-[18px]">
        <img src={overviewAssets + "/status_battery.svg"} alt="Battery" />
        <img src={overviewAssets + "/status_wifi.svg"} alt="Wi-Fi" />
      </div>
    </div>
  );
}
