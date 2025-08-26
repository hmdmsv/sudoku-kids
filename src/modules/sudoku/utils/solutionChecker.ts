import type { Cell } from './gridUtils';

/**
 * بررسی یکتایی جواب جدول سودوکو با توقف سریع در صورت یافتن بیش از یک جواب
 */
export const hasUniqueSolution = (grid: Cell[][]): boolean => {
  const size = grid.length;
  const board = grid.map(row => row.map(cell => cell.value ?? 0));
  const boxSize = Math.sqrt(size);
  let solutionCount = 0;
  let foundMultiple = false;

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

  const solve = (): void => {
    if (foundMultiple) return;

    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (board[row][col] === 0) {
          for (let num = 1; num <= size; num++) {
            if (isSafe(row, col, num)) {
              board[row][col] = num;
              solve();
              board[row][col] = 0;

              if (solutionCount > 1) {
                foundMultiple = true;
                return;
              }
            }
          }
          return;
        }
      }
    }

    solutionCount++;
  };

  solve();
  return solutionCount === 1;
};