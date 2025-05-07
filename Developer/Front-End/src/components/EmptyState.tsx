
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export const EmptyState = ({ icon: Icon, title, description, action }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-travel-100 dark:bg-slate-800 flex items-center justify-center mb-6">
        <Icon className="w-8 h-8 text-travel-500 dark:text-travel-400" />
      </div>
      <h3 className="text-xl font-bold text-travel-800 dark:text-travel-100 mb-2">
        {title}
      </h3>
      <p className="text-travel-600 dark:text-travel-400 max-w-md mb-6">
        {description}
      </p>
      {action}
    </div>
  );
};
