import React from 'react';
import './styles/Sidebar.css';
import type { SidebarProps, Difficulty } from '../types/ui.types';

const difficultyOptions: Difficulty[] = ['easy', 'medium', 'hard'];
const difficultyLabels: Record<Difficulty, string> = {
  easy: 'آسان 🐣',
  medium: 'متوسط 🐥',
  hard: 'سخت 🦉',
};

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

  return (
    <aside className="sidebar bg-white border rounded-lg shadow p-4 flex flex-col gap-6 min-w-[220px]">
      {/* زمان‌سنج */}
      {showTimer && (
        <section className="sidebar-section">
          <h4 className="font-semibold text-gray-800 mb-1">⏱ زمان سپری‌شده</h4>
          <p className="text-sm text-gray-700">{elapsedSeconds} ثانیه</p>
        </section>
      )}

      {/* انتخاب اندازه جدول */}
      <section className="sidebar-section">
        <h4 className="font-semibold text-gray-800 mb-1">📐 اندازه جدول</h4>
        <select
          value={size}
          onChange={(e) => onSizeChange(Number(e.target.value))}
          className="w-full border rounded px-2 py-1 text-sm bg-gray-50"
        >
          {[4, 6, 9].map((s) => (
            <option key={s} value={s}>
              {s}×{s}
            </option>
          ))}
        </select>
      </section>

      {/* انتخاب سطح سختی */}
      <section className="sidebar-section">
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
      </section>

      {/* درصد تکمیل */}
      <section className="sidebar-section">
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
      </section>
    </aside>
  );
};