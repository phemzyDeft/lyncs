import React from 'react';
import { Trash2, ShoppingBag, Home, Zap, Car, Play, Repeat } from 'lucide-react';
import type { Transaction } from '../types';
import { formatCurrency, cn } from '../utils';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

const CATEGORY_ICONS: Record<string, any> = {
  Housing: <Home size={16} />,
  Food: <ShoppingBag size={16} />,
  Transport: <Car size={16} />,
  Entertainment: <Play size={16} />,
  Utilities: <Zap size={16} />,
  Income: <Repeat size={16} />,
  Other: <ShoppingBag size={16} />,
};

export const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDelete }) => {
  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground bg-white/5 rounded-3xl border border-dashed border-white/10">
        <p className="mt-2">No transactions recorded yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">Recent Transactions</h3>
      </div>
      <div className="space-y-3">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="glass group flex items-center justify-between p-3.5 md:p-4 rounded-2xl hover:bg-white/10 transition-all"
          >
            <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
              <div className={cn(
                "p-2.5 md:p-3 rounded-xl shrink-0",
                transaction.type === 'income' ? "bg-emerald-500/10 text-emerald-500" : "bg-white/5 text-muted-foreground"
              )}>
                {CATEGORY_ICONS[transaction.category] || <ShoppingBag size={16} />}
              </div>
              <div className="overflow-hidden">
                <h4 className="font-semibold text-sm truncate">{transaction.description}</h4>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-muted-foreground shrink-0">{transaction.category}</span>
                  <span className="w-1 h-1 rounded-full bg-white/10 shrink-0" />
                  <span className="text-xs text-muted-foreground truncate">
                    {new Date(transaction.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4 shrink-0">
              <span className={cn(
                "font-bold text-sm md:text-base",
                transaction.type === 'income' ? "text-emerald-500" : "text-white"
              )}>
                {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
              </span>
              <button
                onClick={() => onDelete(transaction.id)}
                className="md:opacity-0 md:group-hover:opacity-100 p-2 hover:bg-rose-500/20 text-rose-500 rounded-lg transition-all"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
