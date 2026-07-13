"use client";

import { useState } from "react";
import { Modal } from "./Modal";
import { createInvestment } from "@/lib/api";

export function NewInvestmentModal({
  availableBalance,
  onClose,
  onCreated,
}: {
  availableBalance: number;
  onClose: () => void;
  onCreated: () => void;
}) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const value = Number(amount);
    if (!name.trim()) {
      setError("Give the investment a name.");
      return;
    }
    if (!value || value <= 0) {
      setError("Enter an amount greater than zero.");
      return;
    }
    if (value > availableBalance) {
      setError("That's more than the pool has available.");
      return;
    }

    setBusy(true);
    try {
      await createInvestment({ name, amount: value, description });
      onCreated();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
    setBusy(false);
  }

  return (
    <Modal title="Record an investment" eyebrow="New entry" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-wide text-muted">
            Investment name
          </label>
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Redwood Materials Series D"
            className="w-full border border-line bg-paper px-3 py-2 text-ink outline-none focus:border-teal"
          />
        </div>
        <div>
          <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-wide text-muted">
            Amount invested (USD)
          </label>
          <input
            type="number"
            min="0"
            step="1000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="250000"
            className="w-full border border-line bg-paper px-3 py-2 font-mono text-ink outline-none focus:border-teal"
          />
          <p className="mt-1 text-xs text-muted">
            Available in pool: {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(availableBalance)}
          </p>
        </div>
        <div>
          <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-wide text-muted">
            Notes (optional)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            placeholder="Sector, stage, thesis…"
            className="w-full resize-none border border-line bg-paper px-3 py-2 text-ink outline-none focus:border-teal"
          />
        </div>
        {error && <p className="text-sm text-rust">{error}</p>}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm text-muted hover:text-ink"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={busy}
            className="bg-ink px-5 py-2 text-sm font-medium text-white transition hover:bg-teal disabled:opacity-50"
          >
            {busy ? "Recording…" : "Record investment"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
