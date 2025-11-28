/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (transaction: any) => void;
  initialData?: {
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
  };
  isEditing?: boolean;
}

export function TransactionModal({
  isOpen,
  onClose,
  onAdd,
  initialData,
  isEditing = false,
}: TransactionModalProps) {
  const [formData, setFormData] = useState({
    id: initialData?.id || "",
    type:
      (initialData?.type as "Income" | "Expense" | "Transfer") ||
      ("Expense" as const),
    amount: initialData?.amount.toString() || "",
    description: initialData?.description || "",
    category: initialData?.category || "Shopping",
    date: initialData?.date || new Date().toISOString().split("T")[0],
    account: initialData?.account || "Checking Account",
    toAccount: initialData?.toAccount || "Savings Account",
    status:
      (initialData?.status as "Cleared" | "Pending" | "Reconciled") ||
      ("Pending" as const),
    paymentMethod: initialData?.paymentMethod || "Card",
  });

  useEffect(() => {
    if (isEditing && initialData) {
      setFormData({
        id: initialData.id,
        type: initialData.type,
        amount: initialData.amount.toString(),
        description: initialData.description,
        category: initialData.category,
        date: initialData.date,
        account: initialData.account,
        toAccount: initialData.toAccount || "Savings Account",
        status: initialData.status,
        paymentMethod: initialData.paymentMethod || "Card",
      });
    } else {
      setFormData({
        id: "",
        type: "Expense",
        amount: "",
        description: "",
        category: "Shopping",
        date: new Date().toISOString().split("T")[0],
        account: "Checking Account",
        toAccount: "Savings Account",
        status: "Pending",
        paymentMethod: "Card",
      });
    }
  }, [isOpen, isEditing, initialData]);

  const categories = [
    "Shopping",
    "Dining Out",
    "Salary",
    "Entertainment",
    "Utilities",
  ];
  const accounts = [
    "Checking Account",
    "Savings Account",
    "Investment Account",
  ];
  const paymentMethods = ["Card", "Cash", "UPI", "Net Banking"];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? value : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.description && formData.amount) {
      onAdd({
        id: formData.id,
        type: formData.type,
        amount: Number.parseFloat(formData.amount),
        description: formData.description,
        category: formData.category,
        date: formData.date,
        account: formData.account,
        toAccount:
          formData.type === "Transfer" ? formData.toAccount : undefined,
        status: formData.status,
        paymentMethod:
          formData.type !== "Transfer" ? formData.paymentMethod : undefined,
      });
      if (!isEditing) {
        setFormData({
          id: "",
          type: "Expense",
          amount: "",
          description: "",
          category: "Shopping",
          date: new Date().toISOString().split("T")[0],
          account: "Checking Account",
          toAccount: "Savings Account",
          status: "Pending",
          paymentMethod: "Card",
        });
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-lg border border-border bg-card p-6 shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="mb-6 text-2xl font-bold text-foreground">
          {isEditing ? "Edit Transaction" : "Add Transaction"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Transaction Type */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30"
            >
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
              <option value="Transfer">Transfer</option>
            </select>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              className="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground placeholder-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Description
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="e.g., Coffee at Starbucks"
              className="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground placeholder-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30"
            />
          </div>

          {/* Account Selection */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {formData.type === "Income" ? "To Account" : "From Account"}
            </label>
            <select
              name="account"
              value={formData.account}
              onChange={handleChange}
              className="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30"
            >
              {accounts.map((acc) => (
                <option key={acc} value={acc}>
                  {acc}
                </option>
              ))}
            </select>
          </div>

          {/* To Account for Transfers */}
          {formData.type === "Transfer" && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                To Account
              </label>
              <select
                name="toAccount"
                value={formData.toAccount}
                onChange={handleChange}
                className="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30"
              >
                {accounts.map((acc) => (
                  <option key={acc} value={acc}>
                    {acc}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Payment Method (skip for transfers) */}
          {formData.type !== "Transfer" && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Payment Method
              </label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30"
              >
                {paymentMethods.map((method) => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30"
            >
              <option value="Pending">Pending</option>
              <option value="Cleared">Cleared</option>
              <option value="Reconciled">Reconciled</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="flex-1 bg-transparent"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isEditing ? "Save Changes" : "Add Transaction"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
