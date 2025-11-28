"use client";

import { Trash2, Edit2, CheckCircle, Clock, FileCheck } from "lucide-react";

interface Transaction {
  id: string;
  type: "Income" | "Expense" | "Transfer";
  amount: number;
  description: string;
  category: string;
  date: string;
  account: string;
  toAccount?: string;
  status: "Cleared" | "Pending" | "Reconciled";
}

interface TransactionsListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
  onEdit: (transaction: Transaction) => void;
}

export function TransactionsList({
  transactions,
  onDelete,
  onEdit,
}: TransactionsListProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Cleared":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "Pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "Reconciled":
        return <FileCheck className="h-4 w-4 text-accent" />;
      default:
        return null;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case "Income":
        return "text-green-500";
      case "Expense":
        return "text-red-500";
      case "Transfer":
        return "text-blue-500";
      default:
        return "text-foreground";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (transactions.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-12 text-center">
        <p className="text-muted-foreground">No transactions found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="group rounded-lg border border-border bg-card p-4 transition-all hover:border-primary hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="mb-2 flex items-center gap-3">
                <div className="flex-1">
                  <p className="font-medium text-foreground">
                    {transaction.description}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {transaction.category} • {formatDate(transaction.date)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="rounded bg-secondary/50 px-2 py-1">
                  {transaction.account}
                </span>
                {transaction.toAccount && (
                  <>
                    <span>→</span>
                    <span className="rounded bg-secondary/50 px-2 py-1">
                      {transaction.toAccount}
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="ml-4 flex items-center gap-4">
              <div className="text-right">
                <p
                  className={`text-lg font-bold ${getTransactionColor(
                    transaction.type
                  )}`}
                >
                  {transaction.type === "Expense" ? "-" : "+"}$
                  {transaction.amount.toFixed(2)}
                </p>
                <div className="flex items-center justify-end gap-1">
                  {getStatusIcon(transaction.status)}
                  <span className="text-xs text-muted-foreground">
                    {transaction.status}
                  </span>
                </div>
              </div>

              {/* Action Icons */}
              <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  onClick={() => onEdit(transaction)}
                  className="rounded p-1.5 hover:bg-primary/10 transition-colors"
                  title="Edit transaction"
                >
                  <Edit2 className="h-4 w-4 text-primary" />
                </button>
                <button
                  onClick={() => onDelete(transaction.id)}
                  className="rounded p-1.5 hover:bg-destructive/10 transition-colors"
                  title="Delete transaction"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
