export type Investment = {
  id: string;
  name: string;
  amount: number;
  description?: string;
  createdAt: string;
  updatedAt: string;
};

export type Fund = {
  balance: number;
  initialBalance: number;
  deployed: number;
};

export type Notification = {
  id: string;
  investmentId: string;
  investmentName: string;
  message: string;
  scheduledAt: string;
  status: "PENDING" | "SENT";
};

export function formatUSD(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}
