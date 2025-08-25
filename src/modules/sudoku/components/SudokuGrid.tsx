// src/modules/sudoku/components/SudokuGrid.tsx
import { useState } from 'react';
import type { Cell } from '../utils/gridUtils';
import { generateSudokuGrid, hideSomeCells } from '../utils/sudokuGenerator';
import './styles/SudokuGrid.css';
import confetti from 'canvas-confetti';

const GRID_SIZE = 4;

export const SudokuGrid = () => {
  const [solution] = useState<Cell[][]>(() => generateSudokuGrid(GRID_SIZE));
  const [grid, setGrid] = useState<Cell[][]>(() => hideSomeCells(solution, 0.6));
  const [result, setResult] = useState<string | null>(null);

  const handleChange = (row: number, col: number, val: string) => {
    if (grid[row][col].readOnly) return;
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

  const checkSudoku = () => {
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        if (grid[row][col].value !== solution[row][col].value) {
          setResult('جدول اشتباه پر شده است!');
          return;
        }
      }
    }
    setResult('آفرین! جدول را درست حل کردی.');
    confetti({ // افکت هیجان‌انگیز
      particleCount: 120,
      spread: 80,
      origin: { y: 0.7 }
    });
  };

  return (
    <div className="sudoku-wrapper">
      <h1 className="sudoku-title"></h1>
      <div className="sudoku-grid">
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
              className={`sudoku-cell${cell.readOnly ? ' readonly' : ''}`}
            />
          ))
        )}
      </div>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={checkSudoku}
      >
        بررسی جدول
      </button>
      {result && <div className="sudoku-result">{result}</div>}
    </div>
  );
};