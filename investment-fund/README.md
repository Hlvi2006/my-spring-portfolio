# Capital Ledger — Fund Console (Frontend)

A Next.js frontend for tracking a fund's capital: how much is available,
what's been invested, and where. This is **frontend-only** — it talks to
your own backend API over HTTP. There is no mock server or database in
this project.

## Connecting to your backend

Every network call goes through one file: `lib/api.ts`. Set your backend's
base URL there via an environment variable:

```bash
cp .env.local.example .env.local
```

```
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_FUND_ID=1
```

### Expected endpoints

`lib/api.ts` calls the following routes relative to `NEXT_PUBLIC_API_URL`.
The fund endpoints are scoped by `:id` (there's only one fund, but the
route still expects an id — set it via `NEXT_PUBLIC_FUND_ID`).
If your backend's paths, methods, or field names differ, this is the only
file you need to edit — nothing else in the app touches the network
directly.

| Method | Path | Body | Expected response |
|---|---|---|---|
| GET | `/fund/:id` | — | `{ balance, initialBalance, deployed }` |
| POST | `/fund/:id/add` | `{ amount }` | updated fund object |
| GET | `/investments?sort=` | — | `Investment[]`. `sort`: `amount_asc`, `amount_desc`, `name_asc`, `name_desc`, `created_desc` |
| GET | `/investments/:id` | — | `Investment` |
| POST | `/investments` | `{ name, amountInvested, description? }` | created `Investment` |
| PATCH | `/investments/:id` | `{ name?, description? }` | updated `Investment` |
| GET | `/notifications` | — | `Notification[]`, each with a `status` of `PENDING` or `SENT` |

`Investment` shape used by the UI (see `lib/types.ts`):
```ts
{
  id: string;
  name: string;
  amountInvested: number;
  description?: string;
  createdAt: string;   // ISO date
  updatedAt: string;   // ISO date
}
```

If your backend returns different field names (e.g. `total_balance`
instead of `balance`, snake_case instead of camelCase), map them inside
the functions in `lib/api.ts` rather than changing the components.

### CORS

Since the frontend and backend are separate apps, make sure your backend
sends CORS headers allowing requests from wherever this app is hosted
(`http://localhost:3000` in dev).

## Getting started

```bash
npm install
cp .env.local.example .env.local   # point at your backend
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Your backend must be
running and reachable at the URL you set for the app to load any data.

## Features

- **Home view** — fund summary (available balance, fund size, deployed
  capital) with a live calculator, plus the full investment ledger.
- **Detail view** — click any investment to see its full record.
- **Add to Fund** — increase the pool of capital available to invest.
- **Update investment name** — inline rename on the detail page.
- **Sort / filter** — by amount (asc/desc) or name (A–Z/Z–A).
- **Bonus: 2-minute reminder** — polls `/notifications`; when your backend
  marks a reminder as `SENT` (2 minutes after an investment is created),
  a toast appears.

## Project structure

```
app/
  page.tsx                     # Home view
  investments/[id]/page.tsx    # Detail + update view
lib/
  api.ts                       # ← All backend calls live here
  types.ts                     # Shared client types + currency formatter
components/                    # UI building blocks (modals, ledger row,
                                # sort control, capital gauge, toasts)
```

## Deploying

Standard Next.js app — deploy to Vercel, Amplify Hosting, Cloud Run,
Heroku, or an EC2/ECS box behind pm2/Docker. Whatever you choose, set
`NEXT_PUBLIC_API_URL` as an environment variable in that platform pointing
at your deployed backend.

## Design

The visual language is a "ledger book" — hairline rules, a mono typeface
for figures, and a stamped capital-seal gauge on the home view showing the
percentage of the fund currently deployed.
