import React from 'react';
import './styles/Sidebar.css';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface SidebarProps {
  size: number;
  onSizeChange: (newSize: number) => void;
  difficulty: Difficulty;
  onDifficultyChange: (newDifficulty: Difficulty) => void;
  elapsedSeconds: number;
  showTimer: boolean;
  filledCount: number;
  totalCells: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  size,
  onSizeChange,
  difficulty,
  onDifficultyChange,
  elapsedSeconds,
  showTimer,
  filledCount,
  totalCells,
}) => {
  const percent = totalCells > 0 ? Math.round((filledCount / totalCells) * 100) : 0;

  const difficultyOptions: Difficulty[] = ['easy', 'medium', 'hard'];
  const difficultyLabels: Record<Difficulty, string> = {
    easy: 'آسان',
    medium: 'متوسط',
    hard: 'سخت',
  };

  return (
    <div className="sidebar bg-white border rounded-lg shadow p-4 flex flex-col gap-6 min-w-[220px]">
      {/* زمان‌سنج */}
      {showTimer && (
        <div className="sidebar-section">
          <h4 className="font-semibold text-gray-800 mb-1">⏱ زمان</h4>
          <p className="text-sm text-gray-700">{elapsedSeconds} ثانیه</p>
        </div>
      )}

      {/* انتخاب اندازه جدول */}
      <div className="sidebar-section">
        <h4 className="font-semibold text-gray-800 mb-1">📐 اندازه جدول</h4>
        <select
          value={size}
          onChange={(e) => onSizeChange(Number(e.target.value))}
          className="w-full border rounded px-2 py-1 text-sm bg-gray-50"
        >
          <option value={4}>۴×۴</option>
          <option value={6}>۶×۶</option>
          <option value={9}>۹×۹</option>
        </select>
      </div>

      {/* انتخاب سطح سختی */}
      <div className="sidebar-section">
        <h4 className="font-semibold text-gray-800 mb-1">🎯 سطح سختی</h4>
        <select
          value={difficulty}
          onChange={(e) => onDifficultyChange(e.target.value as Difficulty)}
          className="w-full border rounded px-2 py-1 text-sm bg-gray-50"
        >
          {difficultyOptions.map((level) => (
            <option key={level} value={level}>
              {difficultyLabels[level]}
            </option>
          ))}
        </select>
      </div>

      {/* درصد تکمیل */}
      <div className="sidebar-section">
        <h4 className="font-semibold text-gray-800 mb-1">📊 درصد تکمیل</h4>
        <div className="w-full bg-gray-200 rounded h-3 overflow-hidden">
          <div
            className="bg-green-500 h-full transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="text-xs text-gray-600 mt-1">
          {percent}% ({filledCount} از {totalCells})
        </p>
      </div>
    </div>
  );
};