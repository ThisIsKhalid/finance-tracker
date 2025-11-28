"use client";

import { CreditCard, Trash2, Edit2 } from "lucide-react";

interface Account {
  id: string;
  name: string;
  type: string;
  balance: number;
  currency: string;
}

interface AccountCardProps {
  account: Account;
}

export function AccountCard({ account }: AccountCardProps) {
  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "savings":
        return "bg-accent/10 text-accent";
      case "checking":
        return "bg-primary/10 text-primary";
      case "investment":
        return "bg-chart-1/30 text-chart-1";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-lg">
      {/* Background accent */}
      <div className="absolute -right-12 -top-12 h-24 w-24 rounded-full bg-primary/5 transition-transform group-hover:scale-150" />

      <div className="relative">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`rounded-lg p-2 ${getTypeColor(account.type)}`}>
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-card-foreground">
                {account.name}
              </h3>
              <p className="text-xs text-muted-foreground">{account.type}</p>
            </div>
          </div>
          <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              className="rounded p-1.5 hover:bg-primary/10 transition-colors"
              title="Edit account"
            >
              <Edit2 className="h-4 w-4 text-primary" />
            </button>
            <button
              className="rounded p-1.5 hover:bg-destructive/10 transition-colors"
              title="Delete account"
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <p className="mb-1 text-sm text-muted-foreground">Balance</p>
            <p className="text-2xl font-bold text-accent">
              {account.currency}{" "}
              {account.balance.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
