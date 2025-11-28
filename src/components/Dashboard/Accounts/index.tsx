"use client";

import { useState } from "react";
import { AccountsGrid } from "./AccountsGrid";
import { AccountsHeader } from "./AccountsHeader";
import { AddAccountModal } from "./AddAccountModal";

interface Account {
  id: string;
  name: string;
  type: string;
  balance: number;
  currency: string;
}

export default function AccountsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accounts, setAccounts] = useState<Account[]>([
    {
      id: "1",
      name: "Savings Account",
      type: "Savings",
      balance: 15240.5,
      currency: "USD",
    },
    {
      id: "2",
      name: "Checking Account",
      type: "Checking",
      balance: 3850.25,
      currency: "USD",
    },
    {
      id: "3",
      name: "Investment Account",
      type: "Investment",
      balance: 45600.0,
      currency: "USD",
    },
  ]);

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  const handleAddAccount = (newAccount: Omit<Account, "id">) => {
    const account: Account = {
      ...newAccount,
      id: Date.now().toString(),
    };
    setAccounts([...accounts, account]);
    setIsModalOpen(false);
  };

  return (
    <div className="">
      <AccountsHeader
        totalAccounts={accounts.length}
        totalBalance={totalBalance}
        onAddAccount={() => setIsModalOpen(true)}
      />
      <AccountsGrid accounts={accounts} />
      <AddAccountModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddAccount}
      />
    </div>
  );
}
