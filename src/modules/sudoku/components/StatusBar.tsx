import React from 'react';
import type { StatusBarProps } from '../types/ui.types';
import './styles/StatusBar.css';

export const StatusBar: React.FC<StatusBarProps> = ({
  filledCount,
  totalCells,
  level,
}) => {
  const percent = totalCells > 0 ? Math.round((filledCount / totalCells) * 100) : 0;

  return (
    <footer className="bg-red-500 w-full">
      <span>🎯 Level: <strong className="text-gray-100">{level}</strong></span>
      <span>📊 <strong className="text-gray-100">{percent}% ({filledCount} از {totalCells})</strong></span>
    </footer>
  );
};

