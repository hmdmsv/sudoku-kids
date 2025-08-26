// سطح سختی جدول
export type Difficulty = 'easy' | 'medium' | 'hard';

// اطلاعات متادیتای جدول
export interface PuzzleMeta {
  id: string;
  size: number;
  difficulty: Difficulty;
  fileName: string;
}

// ساختار جدول سودوکو
export type Grid = number[][];

// پراپ‌های انتخاب‌گر جدول
// ui.types.ts
export interface PuzzleSelectorProps {
  selectedSize: number;
  selectedDifficulty: Difficulty;
//  ts: string;
  onStart: (
    grid: number[][],
    size: number,
    fileName: string,
    id: string
  ) => void;
}

// پراپ‌های Sidebar
export interface SidebarProps {
  size: number;
  onSizeChange: (size: number) => void;
  difficulty: Difficulty;
  onDifficultyChange: (d: Difficulty) => void;
  elapsedSeconds: number;
  showTimer: boolean;
  filledCount: number;
  totalCells: number;
}

// پراپ‌های نوار وضعیت
export interface StatusBarProps {
  filledCount: number;
  totalCells: number;
  logMessages: string[];
  level: Difficulty
}
