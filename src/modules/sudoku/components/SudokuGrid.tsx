import React, { useState, useEffect, useRef } from 'react';
import './styles/SudokuGrid.css';

interface SudokuGridProps {
  size: number;
  puzzle: number[][];
}

export const SudokuGrid: React.FC<SudokuGridProps> = ({ size, puzzle }) => {
  const blockSize = size === 9 ? 3 : size === 6 ? 2 : 2;
  const [grid, setGrid] = useState<number[][]>(puzzle.map((row) => [...row]));
  const inputRefs = useRef<HTMLInputElement[][]>([]);

  // همگام‌سازی با پازل جدید
  useEffect(() => {
    setGrid(puzzle.map((row) => [...row]));
  }, [puzzle]);

  // آماده‌سازی رفرنس‌ها برای فوکوس
  useEffect(() => {
    inputRefs.current = Array(size)
      .fill(null)
      .map(() => Array(size).fill(null));
  }, [size]);

  // کلاس‌های CSS برای هر خانه
  const getCellClasses = (
    row: number,
    col: number,
    isReadonly: boolean
  ): string => {
    const borderTop = row % blockSize === 0 && row !== 0;
    const borderLeft = col % blockSize === 0 && col !== 0;

    return [
      'sudoku-cell',
      isReadonly ? 'readonly' : '',
      borderTop ? 'border-top' : '',
      borderLeft ? 'border-left' : '',
    ]
      .filter(Boolean)
      .join(' ');
  };

  // تغییر مقدار خانه توسط کاربر
  const handleChange = (row: number, col: number, val: string) => {
    if (/^[1-9]?$/.test(val)) {
      const newGrid = grid.map((r) => [...r]);
      newGrid[row][col] = val === '' ? 0 : parseInt(val, 10);
      setGrid(newGrid);
    }
  };

  // حرکت با کلیدهای جهت‌نما
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    row: number,
    col: number
  ) => {
    const moveFocus = (r: number, c: number) => {
      const target = inputRefs.current[r]?.[c];
      if (target) target.focus();
    };

    switch (e.key) {
      case 'ArrowUp':
        if (row > 0) moveFocus(row - 1, col);
        break;
      case 'ArrowDown':
        if (row < size - 1) moveFocus(row + 1, col);
        break;
      case 'ArrowLeft':
        if (col > 0) moveFocus(row, col - 1);
        break;
      case 'ArrowRight':
        if (col < size - 1) moveFocus(row, col + 1);
        break;
    }
  };

  // محاسبه تعداد خانه‌های پر شده
  const filledCount = grid.flat().filter((n) => n !== 0).length;

  return (
    <div className="sudoku-container">
      <div
        className="sudoku-grid"
        style={{ gridTemplateColumns: `repeat(${size}, 2.4rem)` }}
      >
        {grid.map((row, rowIndex) =>
          row.map((value, colIndex) => {
            const initialValue = puzzle[rowIndex][colIndex];
            const isReadonly = initialValue !== 0;

            return (
              <input
                key={`${rowIndex}-${colIndex}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={value === 0 ? '' : String(value)}
                className={getCellClasses(rowIndex, colIndex, isReadonly)}
                readOnly={isReadonly}
                onChange={(e) =>
                  handleChange(rowIndex, colIndex, e.target.value)
                }
                onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
                ref={(el) => {
                  if (!inputRefs.current[rowIndex]) {
                    inputRefs.current[rowIndex] = [];
                  }
                  inputRefs.current[rowIndex][colIndex] = el!;
                }}
                aria-label={`خانه ${rowIndex + 1}-${colIndex + 1}`}
              />
            );
          })
        )}
      </div>

      <div className="sudoku-footer">
        🧮 تعداد خانه‌های پر شده: <strong>{filledCount}</strong> از{' '}
        <strong>{size * size}</strong>
      </div>
    </div>
  );
};