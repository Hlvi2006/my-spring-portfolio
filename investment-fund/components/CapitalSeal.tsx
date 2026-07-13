"use client";

import { useEffect, useState } from "react";

export function CapitalSeal({ percentDeployed }: { percentDeployed: number }) {
  const clamped = Math.min(100, Math.max(0, percentDeployed));
  const radius = 84;
  const circumference = 2 * Math.PI * radius;
  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    const target = circumference - (clamped / 100) * circumference;
    const id = requestAnimationFrame(() => setOffset(target));
    return () => cancelAnimationFrame(id);
  }, [clamped, circumference]);

  const id = "seal-path";

  return (
    <svg
      viewBox="0 0 200 200"
      className="h-44 w-44 shrink-0 sm:h-48 sm:w-48"
      role="img"
      aria-label={`${clamped.toFixed(1)} percent of fund capital deployed`}
    >
      <defs>
        <path
          id={id}
          d="M 100, 100 m -74, 0 a 74,74 0 1,1 148,0 a 74,74 0 1,1 -148,0"
        />
      </defs>

      {/* outer rings, like an embossed seal */}
      <circle cx="100" cy="100" r="96" fill="none" stroke="#C9CCC0" strokeWidth="1" />
      <circle cx="100" cy="100" r="88" fill="none" stroke="#C9CCC0" strokeWidth="1" />

      {/* track */}
      <circle
        cx="100"
        cy="100"
        r={radius}
        fill="none"
        stroke="#DCE0D6"
        strokeWidth="10"
      />

      {/* progress arc */}
      <circle
        cx="100"
        cy="100"
        r={radius}
        fill="none"
        stroke="#1F6F63"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform="rotate(-90 100 100)"
        className="stamp-ring"
      />

      {/* rotating label around the ring */}
      <text fontSize="8.4" letterSpacing="3.2" fill="#B8863B" className="font-mono uppercase">
        <textPath href={`#${id}`} startOffset="2%">
          Capital Deployed · Capital Deployed ·
        </textPath>
      </text>

      {/* center figure */}
      <text
        x="100"
        y="95"
        textAnchor="middle"
        className="font-display italic"
        fontSize="30"
        fill="#12211C"
      >
        {clamped.toFixed(0)}%
      </text>
      <text
        x="100"
        y="115"
        textAnchor="middle"
        className="font-mono uppercase"
        fontSize="8"
        letterSpacing="1.5"
        fill="#5B6259"
      >
        of pool at work
      </text>
    </svg>
  );
}
