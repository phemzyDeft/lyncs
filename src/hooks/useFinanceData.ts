import { useState, useEffect } from 'react';
import type { Transaction, Budget, CategoryType } from '../types';
import { getLocalStorage, setLocalStorage } from '../utils';

const STORAGE_KEYS = {
  TRANSACTIONS: 'lyncs_transactions',
  BUDGETS: 'lyncs_budgets',
};

const INITIAL_BUDGETS: Budget[] = [
  { category: 'Housing', limit: 1500 },
  { category: 'Food', limit: 500 },
  { category: 'Transport', limit: 300 },
  { category: 'Entertainment', limit: 200 },
  { category: 'Utilities', limit: 200 },
];

export function useFinanceData() {
  const [transactions, setTransactions] = useState<Transaction[]>(() =>
    getLocalStorage(STORAGE_KEYS.TRANSACTIONS, [])
  );
  const [budgets, setBudgets] = useState<Budget[]>(() =>
    getLocalStorage(STORAGE_KEYS.BUDGETS, INITIAL_BUDGETS)
  );

  useEffect(() => {
    setLocalStorage(STORAGE_KEYS.TRANSACTIONS, transactions);
  }, [transactions]);

  useEffect(() => {
    setLocalStorage(STORAGE_KEYS.BUDGETS, budgets);
  }, [budgets]);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = {
      ...transaction,
      id: crypto.randomUUID(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const updateBudget = (category: CategoryType, limit: number) => {
    setBudgets(prev => prev.map(b => b.category === category ? { ...b, limit } : b));
  };

  const totals = transactions.reduce(
    (acc, t) => {
      if (t.type === 'income') acc.income += t.amount;
      else acc.expense += t.amount;
      return acc;
    },
    { income: 0, expense: 0 }
  );

  const balance = totals.income - totals.expense;

  const categoryTotals = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  return {
    transactions,
    budgets,
    totals,
    balance,
    categoryTotals,
    addTransaction,
    deleteTransaction,
    updateBudget,
  };
}
