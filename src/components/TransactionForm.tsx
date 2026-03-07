import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import type { CategoryType, Transaction } from '../types';
import { cn } from '../utils';

interface TransactionFormProps {
  onAdd: (transaction: Omit<Transaction, 'id'>) => void;
  onClose: () => void;
}

const CATEGORIES: CategoryType[] = [
  'Housing', 'Food', 'Transport', 'Entertainment', 'Utilities', 'Income', 'Other'
];

export const TransactionForm: React.FC<TransactionFormProps> = ({ onAdd, onClose }) => {
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    category: 'Food' as CategoryType,
    date: new Date().toISOString().split('T')[0],
    type: 'expense' as 'income' | 'expense'
  });
  const [displayAmount, setDisplayAmount] = useState('');

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9.]/g, '');

    const parts = value.split('.');
    if (parts.length > 2) value = parts[0] + '.' + parts.slice(1).join('');

    setFormData(prev => ({ ...prev, amount: value }));

    if (value === '') {
      setDisplayAmount('');
      return;
    }

    const formattedInt = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    setDisplayAmount(parts.length > 1 ? `${formattedInt}.${parts[1]}` : formattedInt);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.amount || !formData.description) return;

    onAdd({
      amount: parseFloat(formData.amount),
      description: formData.description,
      category: formData.type === 'income' ? 'Income' : formData.category,
      date: formData.date,
      type: formData.type
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="glass w-full max-w-md rounded-t-[2.5rem] md:rounded-[2rem] p-6 md:p-8 shadow-2xl animate-in slide-in-from-bottom md:zoom-in-95 duration-300 max-h-[95vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold gradient-text">New Transaction</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <X size={20} className="text-muted-foreground" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex p-1 bg-white/5 rounded-xl border border-white/10">
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, type: 'expense' }))}
              className={cn(
                "flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all",
                formData.type === 'expense' ? "bg-white/10 text-white shadow-sm" : "text-muted-foreground hover:text-white"
              )}
            >
              Expense
            </button>
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, type: 'income' }))}
              className={cn(
                "flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all",
                formData.type === 'income' ? "bg-white/10 text-white shadow-sm" : "text-muted-foreground hover:text-white"
              )}
            >
              Income
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Amount</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-bold text-xl">$</span>
              <input
                type="text"
                inputMode="decimal"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-2xl font-bold focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground/30"
                placeholder="0.00"
                value={displayAmount}
                onChange={handleAmountChange}
              />
            </div>
          </div>

          {formData.type === 'expense' && (
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Category</label>
              <select
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary transition-all appearance-none cursor-pointer"
                value={formData.category}
                onChange={e => setFormData(prev => ({ ...prev, category: e.target.value as CategoryType }))}
              >
                {CATEGORIES.filter(c => c !== 'Income').map(cat => (
                  <option key={cat} value={cat} className="bg-neutral-900">{cat}</option>
                ))}
              </select>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Description</label>
            <input
              type="text"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary transition-all placeholder:text-muted-foreground/30"
              placeholder="What was it for?"
              value={formData.description}
              onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date</label>
            <input
              type="date"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary transition-all"
              value={formData.date}
              onChange={e => setFormData(prev => ({ ...prev, date: e.target.value }))}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-white/10 hover:text-primary-foreground font-bold py-4 text-sm rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 group active:scale-95"
          >
            <Plus size={20} className="group-active:scale-95 transition-transform" />
            Add Transaction
          </button>
        </form>
      </div>
    </div>
  );
};
