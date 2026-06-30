"use client";

import { useEffect, useRef, useState } from "react";
import { logDevEvent, useDevLifecycleLog } from "@/components/dashboard/devDiagnostics";

export function FpsMeter() {
  const [fps, setFps] = useState(0);
  const frameCount = useRef(0);
  const lastTick = useRef(0);
  const rafId = useRef<number | null>(null);
  useDevLifecycleLog(5);

  useEffect(() => {
    lastTick.current = performance.now();

    const measure = (now: number) => {
      frameCount.current += 1;

      const elapsed = now - lastTick.current;
      if (elapsed >= 500) {
        setFps(Math.round((frameCount.current * 1000) / elapsed));
        frameCount.current = 0;
        lastTick.current = now;
      }

      rafId.current = window.requestAnimationFrame(measure);
    };

    logDevEvent(8);
    rafId.current = window.requestAnimationFrame(measure);

    return () => {
      if (rafId.current !== null) {
        window.cancelAnimationFrame(rafId.current);
        logDevEvent(9);
      }
    };
  }, []);

  const meterTone = fps >= 50 ? "text-emerald-300" : fps >= 30 ? "text-amber-300" : "text-rose-300";

  return (
    <div
      aria-label={`Current frame rate ${fps} FPS`}
      className="pointer-events-none fixed z-[9999] rounded-md border border-white/15 bg-black/55 px-2 py-1 font-mono text-[10px] font-semibold leading-none text-white/80 shadow-[0_4px_14px_rgba(0,0,0,.25)] backdrop-blur-md"
      style={{
        left: "max(8px, env(safe-area-inset-left))",
        top: "max(8px, env(safe-area-inset-top))",
      }}
    >
      <span className={meterTone}>{fps || "--"}</span> FPS
    </div>
  );
}
