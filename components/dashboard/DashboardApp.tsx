"use client";

import { useEffect, useState } from "react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { logDevEvent, logDevMemory, useDevLifecycleLog } from "@/components/dashboard/devDiagnostics";
import { FpsMeter } from "@/components/dashboard/startup/FpsMeter";
import { LoaderScreen, LoginScreen, SplashScreen } from "@/components/dashboard/startup/StartupScreens";
import type { Stage } from "@/components/dashboard/types";

export default function DashboardApp() {
  const [stage, setStage] = useState<Stage>("splash");
  useDevLifecycleLog(0);

  useEffect(() => {
    logDevEvent(0, "loader");
    const loaderTimer = window.setTimeout(() => setStage("loader"), 1700);
    logDevEvent(0, "login");
    const loginTimer = window.setTimeout(() => setStage("login"), 6800);
    return () => {
      window.clearTimeout(loaderTimer);
      logDevEvent(1, "loader");
      window.clearTimeout(loginTimer);
      logDevEvent(1, "login");
    };
  }, []);

  useEffect(() => {
    logDevEvent(2, stage);
    logDevMemory(0, stage);
  }, [stage]);

  return (
    <main className="app-shell min-h-dvh w-full">
      <FpsMeter />
      {stage === "splash" && <SplashScreen />}
      {stage === "loader" && <LoaderScreen />}
      {stage === "login" && <LoginScreen onLogin={() => setStage("overview")} />}
      {stage === "overview" && <DashboardShell />}
    </main>
  );
}
