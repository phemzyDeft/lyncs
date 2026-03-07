import { useState, useMemo } from 'react';
import {
  Plus,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  LayoutDashboard,
  PieChart as PieChartIcon,
  Settings,
  Bell
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useFinanceData } from './hooks/useFinanceData';
import { StatCard } from './components/StatCard';
import { TransactionForm } from './components/TransactionForm';
import { TransactionList } from './components/TransactionList';
import { SpendingChart } from './components/SpendingChart';
import { BudgetList } from './components/BudgetList';
import type { Transaction } from './types';
import './App.css';

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const {
    transactions,
    totals,
    balance,
    addTransaction,
    deleteTransaction,
    categoryTotals,
    budgets
  } = useFinanceData();

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  }, []);

  const handleAddTransaction = (transaction: Omit<Transaction, 'id'>) => {
    addTransaction(transaction);
    toast.success(`${transaction.type === 'income' ? 'Income' : 'Expense'} added successfully!`, {
      style: {
        background: '#161618',
        color: '#fff',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '12px',
      },
      iconTheme: {
        primary: '#10b981',
        secondary: '#000',
      },
    });
  };

  const handleDeleteTransaction = (id: string) => {
    deleteTransaction(id);
    toast.error('Transaction removed', {
      style: {
        background: '#161618',
        color: '#fff',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '12px',
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white selection:bg-primary/30">
      <Toaster position="top-right" />

      <aside className="fixed left-0 top-0 bottom-0 w-64 border-r border-white/5 bg-[#0a0a0b] hidden lg:flex flex-col p-6 pointer-events-none opacity-50">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Wallet className="text-black" size={24} />
          </div>
          <h1 className="text-2xl font-black tracking-tighter gradient-text">LYNCS</h1>
        </div>

        <nav className="space-y-2">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 text-primary">
            <LayoutDashboard size={20} />
            <span className="font-semibold text-sm">Dashboard</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:text-white transition-colors">
            <PieChartIcon size={20} />
            <span className="font-semibold text-sm">Analytics</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:text-white transition-colors">
            <Settings size={20} />
            <span className="font-semibold text-sm">Settings</span>
          </div>
        </nav>
      </aside>

      <main className="lg:pl-64 min-h-screen pb-24 md:pb-20">
        <header className="sticky top-0 z-40 bg-[#0a0a0b]/80 backdrop-blur-xl border-b border-white/5 px-4 py-4 md:p-6 mb-4 md:mb-8 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
          <div className="w-full md:w-auto text-center md:text-left">
            <h2 className="text-xl md:text-2xl font-bold">{greeting}, David</h2>
            <p className="text-muted-foreground text-xs md:text-sm">Here's what's happening with your money.</p>
          </div>
          <div className="flex items-center justify-center md:justify-end gap-3 w-full md:w-auto">
            <button className="p-2.5 hover:bg-white/5 rounded-xl transition-colors text-muted-foreground relative">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full" />
            </button>
            <button
              onClick={() => setIsFormOpen(true)}
              className="flex-1 md:flex-none justify-center bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-primary/20 active:scale-95"
            >
              <Plus size={18} />
              <span className="md:inline">Add Transaction</span>
            </button>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-6 md:space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              title="Total Balance"
              value={balance}
              icon={Wallet}
              trend={{ value: 2.5, isPositive: true }}
            />
            <StatCard
              title="Monthly Income"
              value={totals.income}
              icon={ArrowUpRight}
              variant="income"
            />
            <StatCard
              title="Monthly Expenses"
              value={totals.expense}
              icon={ArrowDownRight}
              variant="expense"
            />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8">
            <div className="xl:col-span-2 space-y-6 md:space-y-8">
              <div className="glass rounded-2xl md:rounded-3xl p-5 md:p-8">
                <TransactionList
                  transactions={transactions}
                  onDelete={handleDeleteTransaction}
                />
              </div>
            </div>

            <div className="space-y-6 md:space-y-8">
              <div className="glass rounded-2xl md:rounded-3xl p-5 md:p-8">
                <h3 className="text-xl font-bold mb-4 md:mb-6">Expense Breakdown</h3>
                <SpendingChart data={categoryTotals} />
              </div>

              <div className="glass rounded-2xl md:rounded-3xl p-5 md:p-8">
                <BudgetList budgets={budgets} categoryTotals={categoryTotals} />
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 lg:hidden p-4 bg-[#0a0a0b]/80 backdrop-blur-xl border-t border-white/5 flex justify-around">
        <LayoutDashboard className="text-primary" />
        <Plus onClick={() => setIsFormOpen(true)} className="text-muted-foreground" />
        <Settings className="text-muted-foreground" />
      </div>

      {isFormOpen && (
        <TransactionForm
          onAdd={handleAddTransaction}
          onClose={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
