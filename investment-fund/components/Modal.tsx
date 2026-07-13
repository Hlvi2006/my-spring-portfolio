"use client";

import { useEffect } from "react";

export function Modal({
  title,
  eyebrow,
  onClose,
  children,
}: {
  title: string;
  eyebrow?: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md border border-line bg-panel shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-line px-6 py-4">
          <div>
            {eyebrow && (
              <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                {eyebrow}
              </p>
            )}
            <h2 className="font-display text-xl italic text-ink">{title}</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-lg leading-none text-muted hover:text-ink"
          >
            ×
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}
