"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { formatUSD, Investment } from "@/lib/types";
import { getInvestment, updateInvestment } from "@/lib/api";

export default function InvestmentDetailPage() {
  const params = useParams<{ id: string }>();
  const [investment, setInvestment] = useState<Investment | null>(null);
  const [editing, setEditing] = useState(false);
  const [draftName, setDraftName] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  async function load() {
    try {
      const data = await getInvestment(params.id);
      setInvestment(data);
      setDraftName(data.name);
    } catch {
      setNotFound(true);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  async function handleSave() {
    if (!draftName.trim()) {
      setError("Name cannot be empty.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const updated = await updateInvestment(params.id, { name: draftName });
      setInvestment(updated);
      setEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save. Try again.");
    }
    setSaving(false);
  }

  if (notFound) {
    return (
      <div className="py-20 text-center">
        <p className="font-display text-2xl italic text-ink">
          This entry isn&apos;t in the ledger.
        </p>
        <Link href="/" className="mt-4 inline-block text-sm text-teal underline">
          Back to fund console
        </Link>
      </div>
    );
  }

  if (!investment) {
    return <p className="py-10 text-center text-sm text-muted">Loading…</p>;
  }

  const date = new Date(investment.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const updated = new Date(investment.updatedAt).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <div className="max-w-2xl">
      <Link href="/" className="text-xs uppercase tracking-wide text-muted hover:text-teal">
        ← Back to ledger
      </Link>

      <div className="mt-6 border border-line bg-panel p-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          Entry recorded {date}
        </p>

        {editing ? (
          <div className="mt-3">
            <input
              autoFocus
              value={draftName}
              onChange={(e) => setDraftName(e.target.value)}
              className="w-full border-b-2 border-teal bg-transparent font-display text-3xl italic text-ink outline-none"
            />
            {error && <p className="mt-2 text-sm text-rust">{error}</p>}
            <div className="mt-4 flex gap-3">
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-teal px-5 py-2 text-sm font-medium text-white hover:bg-ink disabled:opacity-50"
              >
                {saving ? "Saving…" : "Save name"}
              </button>
              <button
                onClick={() => {
                  setEditing(false);
                  setDraftName(investment.name);
                  setError(null);
                }}
                className="px-4 py-2 text-sm text-muted hover:text-ink"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-3 flex items-start justify-between gap-4">
            <h1 className="font-display text-3xl italic text-ink">
              {investment.name}
            </h1>
            <button
              onClick={() => setEditing(true)}
              className="shrink-0 border border-line px-3 py-1.5 text-xs uppercase tracking-wide text-muted hover:border-teal hover:text-teal"
            >
              Update name
            </button>
          </div>
        )}

        <div className="mt-8 grid grid-cols-2 gap-6 border-t border-line pt-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wide text-muted">
              Amount invested
            </p>
            <p className="mt-1 font-mono text-2xl text-ink">
              {formatUSD(investment.amount)}
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wide text-muted">
              Last updated
            </p>
            <p className="mt-1 font-mono text-sm text-ink">{updated}</p>
          </div>
        </div>

        {investment.description && (
          <div className="mt-6 border-t border-line pt-6">
            <p className="font-mono text-[10px] uppercase tracking-wide text-muted">
              Notes
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink">
              {investment.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
