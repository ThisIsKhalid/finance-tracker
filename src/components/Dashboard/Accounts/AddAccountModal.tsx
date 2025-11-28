"use client";

import type React from "react";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AddAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (account: {
    name: string;
    type: string;
    balance: number;
    currency: string;
  }) => void;
}

export function AddAccountModal({
  isOpen,
  onClose,
  onAdd,
}: AddAccountModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    type: "Savings",
    balance: "",
    currency: "USD",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.balance) {
      onAdd({
        name: formData.name,
        type: formData.type,
        balance: Number.parseFloat(formData.balance),
        currency: formData.currency,
      });
      setFormData({ name: "", type: "Savings", balance: "", currency: "USD" });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="mb-6 text-2xl font-bold text-foreground">
          Add New Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Account Name */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Account Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., My Savings"
              className="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground placeholder-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30"
              required
            />
          </div>

          {/* Account Type */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Account Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30"
            >
              <option>Savings</option>
              <option>Checking</option>
              <option>Investment</option>
              <option>Money Market</option>
            </select>
          </div>

          {/* Initial Balance */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Initial Balance
            </label>
            <input
              type="number"
              name="balance"
              value={formData.balance}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              className="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground placeholder-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30"
              required
            />
          </div>

          {/* Currency */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Currency
            </label>
            <select
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30"
            >
              <option>USD</option>
              <option>EUR</option>
              <option>GBP</option>
              <option>JPY</option>
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
              Add Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
