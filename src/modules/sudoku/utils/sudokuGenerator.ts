import type { Cell } from './gridUtils';

/**
 * خالی کردن تعدادی از خانه‌ها برای ایجاد جدول قابل بازی
 * نسبت خالی بودن با عددی بین ۰ تا ۱ مشخص می‌شود
 */
export const hideSomeCells = (grid: Cell[][], ratio: number): Cell[][] => {
  const total = grid.length * grid.length;
  const count = Math.floor(total * ratio);
  const newGrid = grid.map(row => row.map(cell => ({ ...cell })));

  let removed = 0;
  while (removed < count) {
    const row = Math.floor(Math.random() * grid.length);
    const col = Math.floor(Math.random() * grid.length);
    if (newGrid[row][col].value !== null) {
      newGrid[row][col].value = null;
      newGrid[row][col].readOnly = false;
      removed++;
    }
  }

  return newGrid;
};


export const generateSudokuGrid = (size: number): Cell[][] => {
  const grid: number[][] = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => 0)
  );

  const isSafe = (row: number, col: number, num: number): boolean => {
    for (let x = 0; x < size; x++) {
      if (grid[row][x] === num || grid[x][col] === num) return false;
    }

  const boxSize = Math.floor(Math.sqrt(size));
    if (boxSize * boxSize !== size) {
    throw new Error(`Size ${size} is not a perfect square`);
}

    const boxRow = Math.floor(row / boxSize) * boxSize;
    const boxCol = Math.floor(col / boxSize) * boxSize;

    for (let r = 0; r < boxSize; r++) {
      for (let c = 0; c < boxSize; c++) {
        if (grid[boxRow + r][boxCol + c] === num) return false;
      }
    }

    return true;
  };

  const fillGrid = (): boolean => {
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (grid[row][col] === 0) {
          const numbers = shuffle(Array.from({ length: size }, (_, i) => i + 1));
          for (const num of numbers) {
            if (isSafe(row, col, num)) {
              grid[row][col] = num;
              if (fillGrid()) return true;
              grid[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  const shuffle = (array: number[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  fillGrid();

  // تبدیل به Cell[][]
  return grid.map(row =>
    row.map(num => ({
      value: num,
      readOnly: true,
    }))
  );
};