import { createEmptyBoard } from '../types/board';
import { SUPPORTED_SIZES, type GridSize } from '../config';
import type { Board } from '../types/board';
import type { Cell } from './gridUtils';

/** تولید جدول کامل سودوکو با سایز مشخص */
export const generateSudokuGrid = (size: GridSize): Cell[][] => {
  if (!SUPPORTED_SIZES.includes(size)) {
    throw new Error(`Grid size ${size} is not supported`);
  }

  const boxSize = Math.sqrt(size);
  if (!Number.isInteger(boxSize)) {
    throw new Error(`Grid size ${size} must be a perfect square`);
  }

  const board: Board = createEmptyBoard(size);

  const isSafe = (row: number, col: number, num: number): boolean => {
    for (let x = 0; x < size; x++) {
      if (board[row][x] === num || board[x][col] === num) return false;
    }

    const boxRow = Math.floor(row / boxSize) * boxSize;
    const boxCol = Math.floor(col / boxSize) * boxSize;

    for (let r = 0; r < boxSize; r++) {
      for (let c = 0; c < boxSize; c++) {
        if (board[boxRow + r][boxCol + c] === num) return false;
      }
    }

    return true;
  };

  const shuffle = (array: number[]): number[] => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const fillGrid = (): boolean => {
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (board[row][col] === 0) {
          const numbers = shuffle(Array.from({ length: size }, (_, i) => i + 1));
          for (const num of numbers) {
            if (isSafe(row, col, num)) {
              board[row][col] = num;
              if (fillGrid()) return true;
              board[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  fillGrid();

  // تبدیل به Cell[][] برای استفاده در UI
  return board.map(row =>
    row.map(num => ({
      value: num,
      readOnly: true,
    }))
  );  
};

/** تبدیل رشته پازل به Cell[][] */
export const parsePuzzle = (puzzle: string, size: number): Cell[][] => {
  if (puzzle.length !== size * size) {
    throw new Error(`Puzzle length ${puzzle.length} does not match grid size ${size}×${size}`);
  }

  const cells: Cell[][] = [];
  for (let i = 0; i < size; i++) {
    const row: Cell[] = [];
    for (let j = 0; j < size; j++) {
      const char = puzzle[i * size + j];
      const num = parseInt(char);
      row.push({
        value: num === 0 ? null : num,
        readOnly: num !== 0,
      });
    }
    cells.push(row);
  }
  return cells;
};

/** مخفی کردن درصدی از سلول‌ها برای ساخت پازل */
export const hideSomeCells = (grid: Cell[][], hideRatio: number): Cell[][] => {
  const size = grid.length;
  const totalCells = size * size;
  const cellsToHide = Math.floor(totalCells * hideRatio);

  const flatIndices = Array.from({ length: totalCells }, (_, i) => i);
  for (let i = flatIndices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [flatIndices[i], flatIndices[j]] = [flatIndices[j], flatIndices[i]];
  }

  const hiddenSet = new Set(flatIndices.slice(0, cellsToHide));

  return grid.map((row, rowIndex) =>
    row.map((cell, colIndex) => {
      const index = rowIndex * size + colIndex;
      if (hiddenSet.has(index)) {
        return {
          value: null,
          readOnly: false,
        };
      }
      return cell;
    })
  );
};