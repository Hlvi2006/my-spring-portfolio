import Link from "next/link";
import { formatUSD, Investment } from "@/lib/types";

export function InvestmentRow({ investment, index }: { investment: Investment; index: number }) {
  const date = new Date(investment.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Link
      href={`/investments/${investment.id}`}
      className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 border-b border-line py-4 transition hover:bg-panel"
    >
      <span className="font-mono text-xs text-muted">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span>
        <span className="block font-display text-lg text-ink group-hover:text-teal">
          {investment.name}
        </span>
        <span className="mt-0.5 block text-xs text-muted">
          Recorded {date}
          {investment.description ? ` · ${investment.description}` : ""}
        </span>
      </span>
      <span className="font-mono text-base text-ink">
        {formatUSD(investment.amount)}
      </span>
    </Link>
  );
}
