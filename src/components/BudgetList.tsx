import React from 'react';
import type { Budget } from '../types';
import { formatCurrency, cn } from '../utils';

interface BudgetListProps {
  budgets: Budget[];
  categoryTotals: Record<string, number>;
}

export const BudgetList: React.FC<BudgetListProps> = ({ budgets, categoryTotals }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">Monthly Budgets</h3>
      <div className="space-y-4">
        {budgets.map((budget) => {
          const spent = categoryTotals[budget.category] || 0;
          const percentage = Math.min((spent / budget.limit) * 100, 100);
          const isOver = spent > budget.limit;

          return (
            <div key={budget.category} className="space-y-2">
              <div className="flex justify-between items-end">
                <div>
                  <h4 className="font-semibold">{budget.category}</h4>
                  <p className="text-xs text-muted-foreground">
                    {formatCurrency(spent)} of {formatCurrency(budget.limit)}
                  </p>
                </div>
                {isOver && (
                  <span className="text-[10px] font-bold uppercase bg-rose-500/10 text-rose-500 px-2 py-0.5 rounded-full border border-rose-500/20">
                    Over Budget
                  </span>
                )}
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
                <div
                  className={cn(
                    "h-full transition-all duration-500 rounded-full",
                    isOver ? "bg-rose-500" : percentage > 80 ? "bg-amber-500" : "bg-primary"
                  )}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
