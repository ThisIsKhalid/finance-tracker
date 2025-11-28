"use client";

import { useState } from "react";
import { TransactionFilters } from "./TransactionFilters";
import { TransactionModal } from "./TransactionModal";
import { TransactionsHeader } from "./TransactionsHeader";
import { TransactionsList } from "./TransactionsList";

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
  paymentMethod?: string;
  tags?: string[];
}

export default function TransactionsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      type: "Expense",
      amount: 45.99,
      description: "Starbucks Coffee",
      category: "Dining Out",
      date: "2025-11-28",
      account: "Checking Account",
      status: "Cleared",
      paymentMethod: "Card",
    },
    {
      id: "2",
      type: "Income",
      amount: 2500.0,
      description: "Monthly Salary",
      category: "Salary",
      date: "2025-11-25",
      account: "Checking Account",
      status: "Cleared",
    },
    {
      id: "3",
      type: "Expense",
      amount: 120.0,
      description: "Grocery Shopping",
      category: "Shopping",
      date: "2025-11-27",
      account: "Checking Account",
      status: "Pending",
      paymentMethod: "Card",
    },
    {
      id: "4",
      type: "Transfer",
      amount: 1000.0,
      description: "Transfer to Savings",
      category: "Transfer",
      date: "2025-11-26",
      account: "Checking Account",
      toAccount: "Savings Account",
      status: "Cleared",
    },
  ]);
  const [filters, setFilters] = useState({
    type: "All" as string,
    dateRange: `${new Date().getFullYear()}-${
      new Date().getMonth() + 1
    }` as string,
    category: "All" as string,
    status: "All" as string,
    searchText: "",
    fromDate: "" as string,
    toDate: "" as string,
    filterMode: "predefined" as "predefined" | "custom",
  });

  const filteredTransactions = transactions.filter((t) => {
    if (filters.type !== "All" && t.type !== filters.type) return false;
    if (filters.category !== "All" && t.category !== filters.category)
      return false;
    if (filters.status !== "All" && t.status !== filters.status) return false;
    if (
      filters.searchText &&
      !t.description.toLowerCase().includes(filters.searchText.toLowerCase())
    )
      return false;

    // Date filtering
    const transactionDate = new Date(t.date);
    if (filters.filterMode === "predefined") {
      const [filterYear, filterMonth] = filters.dateRange.split("-");
      if (
        transactionDate.getFullYear() !== Number.parseInt(filterYear) ||
        transactionDate.getMonth() + 1 !== Number.parseInt(filterMonth)
      ) {
        return false;
      }
    } else if (filters.filterMode === "custom") {
      if (filters.fromDate && transactionDate < new Date(filters.fromDate))
        return false;
      if (filters.toDate && transactionDate > new Date(filters.toDate))
        return false;
    }

    return true;
  });

  const handleAddTransaction = (newTransaction: Omit<Transaction, "id">) => {
    const transaction: Transaction = {
      ...newTransaction,
      id: Date.now().toString(),
    };
    setTransactions([transaction, ...transactions]);
    setIsModalOpen(false);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsEditModalOpen(true);
  };

  const handleSaveEditTransaction = (updatedTransaction: Transaction) => {
    setTransactions(
      transactions.map((t) =>
        t.id === updatedTransaction.id ? updatedTransaction : t
      )
    );
    setIsEditModalOpen(false);
    setEditingTransaction(null);
  };

  return (
    <div>
      <TransactionsHeader onAddTransaction={() => setIsModalOpen(true)} />

      <div className="grid gap-8 lg:grid-cols-4">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <TransactionFilters filters={filters} setFilters={setFilters} />
        </div>

        {/* Transactions List */}
        <div className="lg:col-span-3">
          <TransactionsList
            transactions={filteredTransactions}
            onDelete={handleDeleteTransaction}
            onEdit={handleEditTransaction}
          />
        </div>
      </div>

      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddTransaction}
      />

      {editingTransaction && (
        <TransactionModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingTransaction(null);
          }}
          onAdd={handleSaveEditTransaction}
          initialData={editingTransaction}
          isEditing={true}
        />
      )}
    </div>
  );
}
