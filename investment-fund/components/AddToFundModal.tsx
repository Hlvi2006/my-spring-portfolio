"use client";

import { useState } from "react";
import { Modal } from "./Modal";
import { addToFund } from "@/lib/api";

export function AddToFundModal({
  onClose,
  onAdded,
}: {
  onClose: () => void;
  onAdded: () => void;
}) {
  const [amount, setAmount] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const value = Number(amount);
    if (!value || value <= 0) {
      setError("Enter an amount greater than zero.");
      return;
    }
    setBusy(true);
    try {
      await addToFund(value);
      onAdded();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
    setBusy(false);
  }

  return (
    <Modal title="Add to fund" eyebrow="Deposit" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-wide text-muted">
            Amount (USD)
          </label>
          <input
            autoFocus
            type="number"
            min="0"
            step="1000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="500000"
            className="w-full border border-line bg-paper px-3 py-2 font-mono text-ink outline-none focus:border-teal"
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
            className="bg-teal px-5 py-2 text-sm font-medium text-white transition hover:bg-ink disabled:opacity-50"
          >
            {busy ? "Adding…" : "Add funds"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
