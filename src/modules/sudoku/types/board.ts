// تعریف نوع جدول سودوکو با سایز متغیر
export type Board = number[][];

export const EMPTY_CELL = 0;

// ساخت جدول خالی با سایز دلخواه (پیش‌فرض ۴×۴)
export const createEmptyBoard = (size: number = 4): Board => {
  return Array.from({ length: size }, () => Array(size).fill(EMPTY_CELL));
};

// بررسی اعتبار جدول از نظر سایز و مقدار سلول‌ها
export const isBoardValid = (board: Board, size: number = 4): boolean => {
  if (board.length !== size) return false;
  return board.every(row =>
    row.length === size && row.every(cell => cell >= 0 && cell <= size)
  );
};

// بررسی اینکه آیا جدول کامل پر شده (بدون سلول خالی)
export const isBoardFilled = (board: Board): boolean => {
  return board.every(row => row.every(cell => cell !== EMPTY_CELL));
};

// کپی عمیق از جدول برای جلوگیری از تغییرات ناخواسته
export const cloneBoard = (board: Board): Board => {
  return board.map(row => [...row]);
};