// سایزهای پشتیبانی‌شده برای جدول سودوکو
export const SUPPORTED_SIZES = [4, 9] as const;
export type GridSize = (typeof SUPPORTED_SIZES)[number];

// سایز پیش‌فرض جدول (می‌تونه از UI تغییر کنه)
export const DEFAULT_GRID_SIZE: GridSize = 4;

// سطح سختی جدول (در آینده برای الگوریتم پنهان‌سازی سلول‌ها)
export type Difficulty = 'easy' | 'medium' | 'hard';
export const DEFAULT_DIFFICULTY: Difficulty = 'easy';

// تنظیمات کلی سودوکو
export const SudokuConfig = {
  gridSize: DEFAULT_GRID_SIZE,
  difficulty: DEFAULT_DIFFICULTY,
};