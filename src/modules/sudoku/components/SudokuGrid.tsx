// src/modules/sudoku/components/SudokuGrid.tsx
import { useState } from 'react';
import type { Cell } from '../utils/gridUtils';
import { generateSudokuGrid, hideSomeCells } from '../utils/sudokuGenerator';
import './styles/SudokuGrid.css';

const GRID_SIZE = 4; // جدول ۴×۴ برای کودکان

export const SudokuGrid = () => {
  const [grid, setGrid] = useState<Cell[][]>(() => {
    const fullGrid = generateSudokuGrid(GRID_SIZE);
    return hideSomeCells(fullGrid, 0.5); // خالی کردن ۵۰٪ خانه‌ها
  });

  const handleChange = (row: number, col: number, val: string) => {
    const newGrid = grid.map(r => r.map(c => ({ ...c })));
    const num = parseInt(val);

    if (!isNaN(num) && num >= 1 && num <= GRID_SIZE) {
      newGrid[row][col].value = num;
      setGrid(newGrid);
    } else if (val === '') {
      newGrid[row][col].value = null;
      setGrid(newGrid);
    }
  };

  return (
    <div className="inline-block p-4">
      <div
        className="grid gap-2"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, 3rem)`,
          width: 'fit-content',
          margin: '0 auto',
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <input
              key={`${rowIndex}-${colIndex}`}
              type="text"
              inputMode="numeric"
              pattern="\d*"
              maxLength={1}
              value={cell.value ?? ''}
              onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
              disabled={cell.readOnly}
              className={`w-12 h-12 text-center border rounded text-lg font-bold transition-colors ${
                cell.readOnly
                  ? 'bg-gray-200 text-gray-600'
                  : 'bg-white focus:outline-none focus:ring-2 focus:ring-blue-400'
              }`}
            />
          ))
        )}
      </div>
    </div>
  );
};