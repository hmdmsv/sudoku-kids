// src/modules/sudoku/components/SudokuGrid.tsx
import { useState } from 'react';
import type { Cell } from '../utils/gridUtils';
import { generateSudokuGrid, hideSomeCells } from '../utils/sudokuGenerator';
import CheckButton from './CheckButton';
import './styles/SudokuGrid.css';

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

      <CheckButton grid={grid} solution={solution} onResult={setResult} />

      {result && <div className="sudoku-result">{result}</div>}
    </div>
  );
};