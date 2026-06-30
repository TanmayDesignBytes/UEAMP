"use client";

import { useEffect } from "react";

type MemoryPerformance = Performance & {
  memory?: {
    usedJSHeapSize: number;
  };
};

export function logDevEvent(eventId: number, ...details: unknown[]) {
  if (process.env.NODE_ENV !== "development") return;

  const messages = [
    "timeout started",
    "timeout cleared",
    "stage changed",
    "navigation requested",
    "active page",
    "document scroll lock applied",
    "document scroll lock removed",
    "object URL revoked",
    "requestAnimationFrame started",
    "requestAnimationFrame cancelled",
  ];

  console.log(`[Diagnostics] ${messages[eventId] ?? "event"}`, ...details);
}

export function logDevMemory(componentId: number, detail?: unknown) {
  if (process.env.NODE_ENV !== "development" || typeof performance === "undefined") return;

  const labels = [
    "DashboardApp",
    "DashboardShell",
    "SplashScreen",
    "LoaderScreen",
    "LoginScreen",
    "FpsMeter",
    "OverviewContent",
    "GensetContent",
    "SolarContent",
    "PowerOutputContent",
    "GensetEnergyContent",
    "AlertContent",
    "SettingsPage",
    "ReportPage",
  ];
  const label = labels[componentId] ?? "Component";
  const memory = (performance as MemoryPerformance).memory;
  console.log(
    "[Memory]",
    detail === undefined ? label : `${label}:${String(detail)}`,
    memory
      ? `${Math.round(memory.usedJSHeapSize / 1024 / 1024)} MB`
      : "memory API not available",
  );
}

export function useDevLifecycleLog(componentId: number) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    const labels = [
      "DashboardApp",
      "DashboardShell",
      "SplashScreen",
      "LoaderScreen",
      "LoginScreen",
      "FpsMeter",
      "OverviewContent",
      "GensetContent",
      "SolarContent",
      "PowerOutputContent",
      "GensetEnergyContent",
      "AlertContent",
      "SettingsPage",
      "ReportPage",
    ];
    const label = labels[componentId] ?? "Component";

    console.log(`[${label}] mounted`);
    logDevMemory(componentId);

    return () => {
      console.log(`[${label}] unmounted`);
      logDevMemory(componentId);
    };
  }, [componentId]);
}
