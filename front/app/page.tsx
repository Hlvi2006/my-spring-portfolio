"use client";

import { useEffect, useState } from "react";
import { InvestmentRow } from "@/components/InvestmentRow";
import { SortControl } from "@/components/SortControl";
import { AddToFundModal } from "@/components/AddToFundModal";
import { NewInvestmentModal } from "@/components/NewInvestmentModal";
import { formatUSD, Fund, Investment } from "@/lib/types";
import { getFund, listInvestments } from "@/lib/api";

export default function HomePage() {
  const [fund, setFund] = useState<Fund | null>(null);
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [sort, setSort] = useState("created_desc");
  const [showAddFund, setShowAddFund] = useState(false);
  const [showNewInvestment, setShowNewInvestment] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  async function refresh() {
    setLoadError(null);

    try {
      const [fundData, invData] = await Promise.all([
        getFund(),
        listInvestments(sort),
      ]);

      setFund(fundData);
      setInvestments(invData);
    } catch (err) {
      setLoadError(
        err instanceof Error
          ? err.message
          : "Could not reach the backend."
      );
    }

    setLoading(false);
  }

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort]);

  const percentDeployed = fund
    ? (fund.deployed / fund.initialBalance) * 100
    : 0;

  return (
    <div className="space-y-12">
      {loadError && (
        <div className="border border-rust bg-rust/5 px-4 py-3 text-sm text-rust">
          Couldn't reach the backend: {loadError}. Check{" "}
          <code className="font-mono">NEXT_PUBLIC_API_URL</code> in your
          <code className="font-mono"> .env.local</code>.
        </div>
      )}

      {/* Hero */}
      <section className="border border-line bg-panel">
        <div className="grid gap-8 p-8 grid-cols-1 sm:items-center sm:p-10">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              Available to invest
            </p>

            <p className="mt-1 font-display text-5xl italic text-ink sm:text-6xl">
              {fund ? formatUSD(fund.balance) : "—"}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <button
                onClick={() => setShowAddFund(true)}
                className="border border-ink px-5 py-2.5 text-sm font-medium text-ink transition hover:bg-ink hover:text-white"
              >
                Add to fund
              </button>

              <button
                onClick={() => setShowNewInvestment(true)}
                className="bg-ink px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal"
              >
                Record investment
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Investment ledger */}
      <section>
        <div className="flex items-end justify-between border-b-2 border-ink pb-3">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              The ledger
            </p>

            <h2 className="font-display text-2xl italic text-ink">
              Positions ({investments.length})
            </h2>
          </div>

          <SortControl value={sort} onChange={setSort} />
        </div>

        {loading ? (
          <p className="py-10 text-center text-sm text-muted">
            Loading ledger…
          </p>
        ) : investments.length === 0 ? (
          <div className="py-16 text-center">
            <p className="font-display text-xl italic text-ink">
              No positions recorded yet.
            </p>

            <p className="mt-1 text-sm text-muted">
              Record your first investment to open the ledger.
            </p>
          </div>
        ) : (
          <div>
            {investments.map((inv, i) => (
              <InvestmentRow
                key={inv.id}
                investment={inv}
                index={i}
                onDeleted={(id) => {
                  setInvestments((current) =>
                    current.filter(
                      (investment) => String(investment.id) !== String(id)
                    )
                  );
                }}
              />
            ))}
          </div>
        )}
      </section>

      {showAddFund && (
        <AddToFundModal
          onClose={() => setShowAddFund(false)}
          onAdded={refresh}
        />
      )}

      {showNewInvestment && fund && (
        <NewInvestmentModal
          availableBalance={fund.balance}
          onClose={() => setShowNewInvestment(false)}
          onCreated={refresh}
        />
      )}
    </div>
  );
}