"use client";

import { useEffect, useState } from "react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { logDevEvent, logDevMemory, useDevLifecycleLog } from "@/components/dashboard/devDiagnostics";
import { LoaderScreen, LoginScreen, SplashScreen } from "@/components/dashboard/startup/StartupScreens";
import type { Stage } from "@/components/dashboard/types";

export default function DashboardApp() {
  const [stage, setStage] = useState<Stage>("splash");
  useDevLifecycleLog(0);

  useEffect(() => {
    if (window.localStorage.getItem("umpie-authenticated") === "true") {
      setStage("overview");
      return;
    }

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
    if (stage === "overview") window.localStorage.setItem("umpie-authenticated", "true");
  }, [stage]);

  return (
    <main className="app-shell min-h-dvh w-full">
      {stage === "splash" && <SplashScreen />}
      {stage === "loader" && <LoaderScreen />}
      {stage === "login" && <LoginScreen onLogin={() => {
        window.localStorage.setItem("umpie-authenticated", "true");
        setStage("overview");
      }} />}
      {stage === "overview" && <DashboardShell />}
    </main>
  );
}
