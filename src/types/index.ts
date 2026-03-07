export type CategoryType = 'Housing' | 'Food' | 'Transport' | 'Entertainment' | 'Utilities' | 'Income' | 'Other';

export interface Transaction {
  id: string;
  amount: number;
  category: CategoryType;
  description: string;
  date: string;
  type: 'income' | 'expense';
}

export interface Budget {
  category: CategoryType;
  limit: number;
}
