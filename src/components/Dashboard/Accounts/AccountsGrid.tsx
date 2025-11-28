"use client";

import { AccountCard } from "./AccountCard";


interface Account {
  id: string;
  name: string;
  type: string;
  balance: number;
  currency: string;
}

interface AccountsGridProps {
  accounts: Account[];
}

export function AccountsGrid({ accounts }: AccountsGridProps) {
  if (accounts.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-12 text-center">
        <p className="text-muted-foreground">
          No accounts yet. Create your first account to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {accounts.map((account) => (
        <AccountCard key={account.id} account={account} />
      ))}
    </div>
  );
}
