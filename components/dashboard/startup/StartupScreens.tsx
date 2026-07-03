import { useDevLifecycleLog } from "@/components/dashboard/devDiagnostics";

export function SplashScreen() {
  useDevLifecycleLog(2);

  return (
    <section className="startup-screen grid min-h-dvh w-full place-items-center bg-black">
      <img className="brand-logo h-auto w-[min(73vw,288px)]" src="/assets/images/kirloskar_oil_engines.png" alt="Kirloskar Oil Engines" />
    </section>
  );
}

export function LoaderScreen() {
  useDevLifecycleLog(3);

  return (
    <section className="startup-screen grid min-h-dvh w-full place-items-center bg-black">
      <img className="loader-gif size-[151px] object-contain" src="/assets/images/power_house_dark.gif" alt="Power house loading animation" />
    </section>
  );
}

export function LoginScreen({ onLogin }: { onLogin: () => void }) {
  useDevLifecycleLog(4);

  return (
    <section className="login-screen screen-background screen-enter min-h-dvh w-full bg-page-gradient pb-[max(40px,env(safe-area-inset-bottom))] pt-[39px] md:grid md:grid-cols-[minmax(0,1.08fr)_minmax(360px,.92fr)] md:items-center md:p-0">
      <div className="login-hero relative aspect-[171/128] w-full overflow-hidden md:h-dvh md:aspect-auto" aria-hidden="true">
        <img className="size-full object-cover" src="/assets/images/overview-login-microgrid.gif" alt="" />
      </div>
      <div className="login-content w-full px-6 pb-0 pt-[clamp(44px,8.1vh,69px)] md:w-full md:max-w-[520px] md:justify-self-center md:p-12">
        <h1 className="m-0 font-poppins text-[28px] font-semibold leading-[42px] text-white">Welcome Back ...</h1>
        <div className="credential-fields mt-8 flex flex-col gap-3">
          <label className="glass-control flex h-14 w-full items-center rounded-[18px] px-5 backdrop-blur-[21px]">
            <span className="sr-only">User name</span>
            <input autoComplete="username" placeholder="User Name" />
          </label>
          <label className="glass-control flex h-14 w-full items-center rounded-[18px] px-5 backdrop-blur-[21px]">
            <span className="sr-only">Password</span>
            <input autoComplete="current-password" placeholder="Password" type="password" />
          </label>
        </div>
        <button className="primary-button mt-6 flex h-14 w-full items-center justify-center rounded-full bg-primary-gradient font-jakarta text-base font-bold text-white" onClick={onLogin} type="button">Login</button>
        <label className="requirements-check mt-4 flex items-center gap-2.5 font-inter text-[10px] leading-4 text-white/70">
          <input type="checkbox" />
          <span>Accept all the requirements that we have provided</span>
        </label>
      </div>
    </section>
  );
}
