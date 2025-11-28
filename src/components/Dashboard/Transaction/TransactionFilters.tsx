/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Search, Calendar } from "lucide-react";

interface TransactionFiltersProps {
  filters: {
    type: string;
    dateRange: string;
    category: string;
    status: string;
    searchText: string;
    fromDate?: string;
    toDate?: string;
    filterMode: "predefined" | "custom";
  };
  setFilters: (filters: any) => void;
}

export function TransactionFilters({
  filters,
  setFilters,
}: TransactionFiltersProps) {
  const categories = [
    "All",
    "Dining Out",
    "Shopping",
    "Salary",
    "Transfer",
    "Entertainment",
  ];
  const statuses = ["All", "Cleared", "Pending", "Reconciled"];
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="mb-3 flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Search</span>
        </div>
        <input
          type="text"
          placeholder="Search transactions..."
          value={filters.searchText}
          onChange={(e) =>
            setFilters({ ...filters, searchText: e.target.value })
          }
          className="w-full rounded border border-input bg-background px-3 py-2 text-sm text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none"
        />
      </div>

      {/* Date Filter */}
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="mb-3 flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">
            Date Filter
          </span>
        </div>

        {/* Filter Mode Selection */}
        <div className="mb-4 space-y-2">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="filterMode"
              value="predefined"
              checked={filters.filterMode === "predefined"}
              onChange={() =>
                setFilters({ ...filters, filterMode: "predefined" })
              }
              className="h-4 w-4"
            />
            <span className="text-sm text-foreground">Month & Year</span>
          </label>
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="filterMode"
              value="custom"
              checked={filters.filterMode === "custom"}
              onChange={() => setFilters({ ...filters, filterMode: "custom" })}
              className="h-4 w-4"
            />
            <span className="text-sm text-foreground">Date Range</span>
          </label>
        </div>

        {/* Month & Year Selection */}
        {filters.filterMode === "predefined" && (
          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">
                Month
              </label>
              <select
                value={filters.dateRange.split("-")[1] || currentMonth}
                onChange={(e) => {
                  const month = e.target.value;
                  const year = filters.dateRange.split("-")[0] || currentYear;
                  setFilters({ ...filters, dateRange: `${year}-${month}` });
                }}
                className="w-full rounded border border-input bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                  <option key={month} value={month}>
                    {new Date(2025, month - 1).toLocaleDateString("en-US", {
                      month: "long",
                    })}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">
                Year
              </label>
              <select
                value={filters.dateRange.split("-")[0] || currentYear}
                onChange={(e) => {
                  const year = e.target.value;
                  const month = filters.dateRange.split("-")[1] || currentMonth;
                  setFilters({ ...filters, dateRange: `${year}-${month}` });
                }}
                className="w-full rounded border border-input bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
              >
                {Array.from({ length: 5 }, (_, i) => currentYear - i).map(
                  (year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>
        )}

        {/* Date Range Selection */}
        {filters.filterMode === "custom" && (
          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">
                From Date
              </label>
              <input
                type="date"
                value={filters.fromDate || ""}
                onChange={(e) =>
                  setFilters({ ...filters, fromDate: e.target.value })
                }
                className="w-full rounded border border-input bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">
                To Date
              </label>
              <input
                type="date"
                value={filters.toDate || ""}
                onChange={(e) =>
                  setFilters({ ...filters, toDate: e.target.value })
                }
                className="w-full rounded border border-input bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
              />
            </div>
          </div>
        )}
      </div>

      {/* Transaction Type */}
      <div className="rounded-lg border border-border bg-card p-4">
        <p className="mb-3 text-sm font-medium text-foreground">Type</p>
        <div className="space-y-2">
          {["All", "Income", "Expense", "Transfer"].map((type) => (
            <label
              key={type}
              className="flex cursor-pointer items-center gap-2"
            >
              <input
                type="radio"
                name="type"
                value={type}
                checked={filters.type === type}
                onChange={(e) =>
                  setFilters({ ...filters, type: e.target.value })
                }
                className="h-4 w-4 cursor-pointer"
              />
              <span className="text-sm text-foreground">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Category */}
      <div className="rounded-lg border border-border bg-card p-4">
        <p className="mb-3 text-sm font-medium text-foreground">Category</p>
        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="w-full rounded border border-input bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Status */}
      <div className="rounded-lg border border-border bg-card p-4">
        <p className="mb-3 text-sm font-medium text-foreground">Status</p>
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="w-full rounded border border-input bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
