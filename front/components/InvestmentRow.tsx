"use client";

import Link from "next/link";
import { formatUSD, Investment } from "@/lib/types";
import { deleteInvestment } from "@/lib/api";

export function InvestmentRow({
  investment,
  index,
  onDeleted,
}: {
  investment: Investment;
  index: number;
  onDeleted: (id: string) => void;
}) {
  const date = new Date(investment.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const confirmed = window.confirm(
      `Delete "${investment.name}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteInvestment(String(investment.id));

      // DB-dən silindikdən sonra parent state-dən də sil
      onDeleted(String(investment.id));
    } catch (error) {
      console.error("Failed to delete investment:", error);
    }
  };

  return (
    <div className="group grid grid-cols-[2.5rem_1fr_auto_auto] items-center gap-4 border-b border-line py-4 transition hover:bg-panel">
      <span className="font-mono text-xs text-muted">
        {String(index + 1).padStart(2, "0")}
      </span>

      <Link href={`/investments/${investment.id}`}>
        <span>
          <span className="block font-display text-lg text-ink group-hover:text-teal">
            {investment.name}
          </span>

          <span className="mt-0.5 block text-xs text-muted">
            Recorded {date}
            {investment.description
              ? ` · ${investment.description}`
              : ""}
          </span>
        </span>
      </Link>

      <span className="font-mono text-base text-ink">
        {formatUSD(investment.amount)}
      </span>

      <button
        type="button"
        onClick={handleDelete}
        className="rounded border border-red-300 px-3 py-1 text-sm text-red-600 hover:bg-red-50"
      >
        Delete
      </button>
    </div>
  );
}