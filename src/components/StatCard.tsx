import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn, formatCurrency } from '../utils';

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  variant?: 'default' | 'income' | 'expense';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  className,
  variant = 'default',
}) => {
  const variantStyles = {
    default: 'text-primary',
    income: 'text-emerald-500',
    expense: 'text-rose-500',
  };

  return (
    <div className={cn('glass rounded-2xl p-5 md:p-6 transition-all hover:scale-[1.02]', className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
          <h3 className="mt-1 md:mt-2 text-2xl md:text-3xl font-bold tracking-tight">{formatCurrency(value)}</h3>
          {trend && (
            <div className="mt-2 flex items-center gap-1">
              <span className={cn('text-[10px] md:text-xs font-semibold', trend.isPositive ? 'text-emerald-500' : 'text-rose-500')}>
                {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
              </span>
              <span className="text-[10px] md:text-xs text-muted-foreground text-opacity-60">from last month</span>
            </div>
          )}
        </div>
        <div className={cn('rounded-xl bg-white/5 p-2.5 md:p-3', variantStyles[variant])}>
          <Icon size={20} className="md:w-6 md:h-6" />
        </div>
      </div>
    </div>
  );
};
