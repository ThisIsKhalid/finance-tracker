"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AccountsHeaderProps {
  totalAccounts: number;
  totalBalance: number;
  onAddAccount: () => void;
}

export function AccountsHeader({
  totalAccounts,
  totalBalance,
  onAddAccount,
}: AccountsHeaderProps) {
  return (
    <div className="mb-12">
      <h1 className="mb-2 text-3xl font-bold text-foreground">My Accounts</h1>
      <p className="mb-8 text-muted-foreground">
        Manage and track all your accounts
      </p>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Total Accounts Card */}
        <div className="rounded-lg border border-border bg-card p-6">
          <p className="mb-2 text-sm font-medium text-muted-foreground">
            Total Accounts
          </p>
          <p className="text-3xl font-bold text-primary">{totalAccounts}</p>
        </div>

        {/* Total Balance Card */}
        <div className="rounded-lg border border-border bg-card p-6">
          <p className="mb-2 text-sm font-medium text-muted-foreground">
            Total Balance
          </p>
          <p className="text-3xl font-bold text-accent">
            $
            {totalBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </p>
        </div>

        {/* Add Account Button Card */}
        <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-border bg-card/50 p-6 transition-all hover:bg-card hover:border-primary">
          <Button
            onClick={onAddAccount}
            className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
            size="lg"
          >
            <Plus className="h-5 w-5" />
            Add Account
          </Button>
        </div>
      </div>
    </div>
  );
}
