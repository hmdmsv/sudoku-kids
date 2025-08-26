import { useState, useEffect } from 'react';
import { SudokuGrid } from './modules/sudoku/components/SudokuGrid';
import PuzzleSelector from './modules/sudoku/components/PuzzleSelector';
import { Sidebar } from './modules/sudoku/components/Sidebar';
import { StatusBar } from './modules/sudoku/components/StatusBar';
import './App.css';

function App() {
  const [grid, setGrid] = useState<number[][] | null>(null);
  const [size, setSize] = useState<number>(4); // پیش‌فرض ۴×۴
  const [difficulty, setDifficulty] = useState<number>(1); // سطح سختی پیش‌فرض
  const [filePath, setFilePath] = useState<string | null>(null);
  const [puzzleId, setPuzzleId] = useState<string | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [logMessages, setLogMessages] = useState<string[]>([]);

  // زمان‌سنج فقط وقتی grid وجود دارد
  useEffect(() => {
    if (!grid) return;
    const timer = setInterval(() => setElapsedSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, [grid]);

  // شروع بازی
  const handleStart = (
    selectedGrid: number[][],
    selectedSize: number,
    selectedFilePath: string,
    selectedPuzzleId: string
  ) => {
    setGrid(selectedGrid);
    setSize(selectedSize);
    setFilePath(selectedFilePath);
    setPuzzleId(selectedPuzzleId);
    setElapsedSeconds(0);
    setLogMessages([
      `🧩 جدول جدید بارگذاری شد: ${selectedPuzzleId}`,
      `📁 مسیر فایل: ${selectedFilePath}`,
      `📐 اندازه جدول: ${selectedSize}×${selectedSize}`,
      `🎯 سطح سختی: ${difficulty}`,
    ]);
  };

  const filledCount = grid?.flat().filter((n) => n !== 0).length ?? 0;
  const totalCells = size * size;

  return (
    <div className="app-wrapper min-h-screen flex flex-col bg-gray-100">
      {/* عنوان بالا */}
      <header className="py-4 px-6 bg-white shadow text-center">
        <h1 className="text-2xl font-bold text-blue-700">🧩 جدول سودوکو</h1>
      </header>

      {/* محتوای اصلی */}
      <main className="flex-grow overflow-auto flex flex-row-reverse justify-center items-start gap-8 p-6">
        {/* Sidebar */}
        <Sidebar
          size={size}
          onSizeChange={setSize}
          difficulty={difficulty}
          onDifficultyChange={setDifficulty}
          elapsedSeconds={elapsedSeconds}
          showTimer={!!grid}
          filledCount={filledCount}
          totalCells={totalCells}
        />

        {/* جدول یا انتخاب‌گر */}
        <div className="flex flex-col items-center w-full max-w-3xl">
          {!grid ? (
            <PuzzleSelector
              onStart={handleStart}
              selectedSize={size}
              selectedDifficulty={difficulty}
            />
          ) : (
            <SudokuGrid size={size} puzzle={grid} />
          )}
        </div>
      </main>

      {/* نوار وضعیت پایین صفحه */}
      <footer className="bg-white shadow-inner py-3 px-6 text-sm text-gray-600 w-full">
        {grid ? (
          <StatusBar
            filledCount={filledCount}
            totalCells={totalCells}
            logMessages={logMessages}
          />
        ) : (
          <p className="text-center">🎯 لطفاً یک جدول انتخاب کنید تا بازی آغاز شود</p>
        )}
      </footer>
    </div>
  );
}

export default App;