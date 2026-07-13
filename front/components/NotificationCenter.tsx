"use client";

import { useEffect, useRef, useState } from "react";
import { Notification } from "@/lib/types";
import { listNotifications } from "@/lib/api";

export function NotificationCenter() {
  const [toasts, setToasts] = useState<Notification[]>([]);
  const seen = useRef<Set<string>>(new Set());

  useEffect(() => {
    let stopped = false;

    async function poll() {
      try {
        const data = await listNotifications();
        const fresh = data.filter(
          (n) => n.status === "SENT" && !seen.current.has(n.id)
        );
        if (fresh.length && !stopped) {
          fresh.forEach((n) => seen.current.add(n.id));
          setToasts((prev) => [...fresh, ...prev]);
          fresh.forEach((n) => {
            setTimeout(() => {
              setToasts((prev) => prev.filter((t) => t.id !== n.id));
            }, 8000);
          });
        }
      } catch {
        // silent — polling is best-effort
      }
    }

    poll();
    const id = setInterval(poll, 10_000);
    return () => {
      stopped = true;
      clearInterval(id);
    };
  }, []);

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex w-80 flex-col gap-3">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="border border-line bg-panel px-4 py-3 shadow-lg"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold">
            Ledger reminder
          </p>
          <p className="mt-1 text-sm text-ink">{t.message}</p>
        </div>
      ))}
    </div>
  );
}
