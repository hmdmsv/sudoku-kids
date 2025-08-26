import React from 'react';
import './styles/StatusBar.css';

interface StatusBarProps {
  filledCount: number;
  totalCells: number;
  logMessages: string[];
}

export const StatusBar: React.FC<StatusBarProps> = ({
  filledCount,
  totalCells,
  logMessages,
}) => {
  const percent = Math.round((filledCount / totalCells) * 100);

  return (
    <div className="status-bar w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-4 py-3 border-t bg-gray-50 text-sm text-gray-700">
      {/* درصد تکمیل */}
      <div className="status-section flex flex-col gap-1 min-w-[200px]">
        <h4 className="font-semibold text-gray-800">📊 درصد تکمیل</h4>
        <div className="w-full bg-gray-200 rounded h-3 overflow-hidden">
          <div
            className="bg-blue-500 h-full transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="text-xs text-gray-600">
          {percent}% ({filledCount} از {totalCells})
        </p>
      </div>

      {/* لاگ‌ها */}
      <div className="status-section flex-1">
        <h4 className="font-semibold text-gray-800 mb-1">📝 لاگ‌ها</h4>
        <ul className="list-disc pl-5 space-y-1">
          {logMessages.map((msg, i) => (
            <li key={i} className="text-gray-600 text-xs">
              {msg}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};