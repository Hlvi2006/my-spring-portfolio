// Central API client — every network call the frontend makes goes through
// here. If your backend's routes or field names differ from the shape
// below, this is the one file to edit; nothing else in the app talks to
// the network directly.
//
// Configure the backend location via NEXT_PUBLIC_API_URL (see .env.local.example).
// Falls back to same-origin "/api" if unset, in case you reverse-proxy your
// API under the Next.js app.
//
// The fund endpoints are scoped by :id (e.g. GET /fund/:id) even though
// there's only one fund — its id is configured via NEXT_PUBLIC_FUND_ID.

import { Fund, Investment, Notification } from "./types";

const BASE_URL = "https://my-spring-portfolio-776r.onrender.com/api";
const FUND_ID = "1";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error ?? body?.message ?? `Request failed (${res.status})`);
  }
  // Some backends return 204 on write endpoints — guard against empty body.
  const text = await res.text();
  return text ? JSON.parse(text) : (undefined as T);
}

// --- Fund -------------------------------------------------------------
// Scoped by id: GET /fund/:id, POST /fund/:id/add

export function getFund(): Promise<Fund> {
  return request<Fund>(`/funds/${FUND_ID}`);
}

export function addToFund(amount: number): Promise<Fund> {
  return request<Fund>(`/funds/${FUND_ID}/add`, {
    method: "POST",
    body: JSON.stringify({ amount }),
  });
}

// --- Investments --------------------------------------------------------

export function listInvestments(sort: string): Promise<Investment[]> {
  return request<Investment[]>(`/investments?sort=${sort}`);
}

export function getInvestment(id: string): Promise<Investment> {
  return request<Investment>(`/investments/${id}`);
}

export function createInvestment(data: {
  name: string;
  amount: number;
  description?: string;
}): Promise<Investment> {
  return request<Investment>("/investments", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateInvestment(
  id: string,
  data: { name?: string; description?: string }
): Promise<Investment> {
  return request<Investment>(`/investments/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}
export function deleteInvestment(id: string): Promise<void> {
  return request<void>(`/investments/${id}`, {
    method: "DELETE",
  });
}

// --- Notifications --------------------------------------------------------

export function listNotifications(): Promise<Notification[]> {
  return request<Notification[]>("/notifications");
}
