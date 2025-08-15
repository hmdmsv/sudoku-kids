// src/modules/sudoku/utils/gridUtils.ts

export type Cell = {
  value: number | null;
  readOnly: boolean;
};

/**
 * ساخت جدول خالی سودوکو با سایز دلخواه
 * تمام خانه‌ها قابل ویرایش هستند
 */
export const createEmptyGrid = (size: number): Cell[][] => {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => ({
      value: null,
      readOnly: false,
    }))
  );
};

/**
 * کپی عمیق از جدول برای جلوگیری از تغییر مستقیم state
 */
export const cloneGrid = (grid: Cell[][]): Cell[][] => {
  return grid.map(row => row.map(cell => ({ ...cell })));
};