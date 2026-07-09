import { PeriodSelect } from "@/components/dashboard/common/PeriodSelect";
import { StatusBar } from "@/components/dashboard/common/StatusBar";
import { useDevLifecycleLog } from "@/components/dashboard/devDiagnostics";

const alertItems = [
  { title: "Low Fuel Warning", time: "8 PM", message: "Fuel level below 50% — consider refuelling soon." },
  { title: "Low Fuel Warning", time: "6 PM", message: "Fuel level below 10% — consider refuelling soon." },
  { title: "Maintenance Reminder", time: "3 PM", message: "Fuel level below 20% — consider refuelling soon." },
  { title: "Maintenance Reminder", time: "12 AM", message: "Fuel level below 60% — consider refuelling soon." },
  { title: "Maintenance Reminder", time: "8 AM", message: "Fuel level below 70% — consider refuelling soon." },
];

export function AlertContent() {
  useDevLifecycleLog(11);

  return (
    <div className="alert-content mx-auto min-h-dvh w-full max-w-[393px] px-4 pb-[calc(120px+env(safe-area-inset-bottom))] min-[900px]:max-w-[1600px] min-[900px]:px-8">
      <StatusBar />
      <div className="alert-page-header mt-[21px] flex h-[30px] w-full items-center justify-between">
        <h1>Alerts</h1>
        <PeriodSelect />
      </div>
      <div className="alert-list mt-[26px] flex w-full flex-col gap-2 min-[900px]:grid min-[900px]:grid-cols-[repeat(auto-fit,minmax(330px,1fr))] min-[900px]:gap-4">
        {alertItems.map((item, index) => <AlertCard key={item.time + index} {...item} />)}
      </div>
    </div>
  );
}

function AlertCard({ message, time, title }: { message: string; time: string; title: string }) {
  return (
    <article className="alert-card flex h-[106px] w-full flex-col justify-center gap-[10px] rounded-[20px] px-[15px] py-5 font-jakarta text-white backdrop-blur-[21px] min-[900px]:h-[132px]">
      <div className="alert-card__heading flex h-5 w-full items-center gap-[5px]">
        <img src="/assets/alert/alert-circle.svg" alt="" />
        <strong>{title}</strong>
        <time>{time}</time>
      </div>
      <p>{message}</p>
    </article>
  );
}
