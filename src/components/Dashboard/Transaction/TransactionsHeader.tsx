"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TransactionsHeaderProps {
  onAddTransaction: () => void;
}

export function TransactionsHeader({
  onAddTransaction,
}: TransactionsHeaderProps) {
  return (
    <div className="mb-12">
      <h1 className="mb-2 text-3xl font-bold text-foreground">Transactions</h1>
      <p className="mb-8 text-muted-foreground">
        Manage and track all your income and expenses
      </p>

      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">This Month</p>
            <p className="text-2xl font-bold text-accent">$1,665.99</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Spending</p>
            <p className="text-2xl font-bold text-destructive">-$165.99</p>
          </div>
        </div>
        <Button
          onClick={onAddTransaction}
          className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
          size="lg"
        >
          <Plus className="h-5 w-5" />
          Add Transaction
        </Button>
      </div>
    </div>
  );
}
