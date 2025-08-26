import { useState } from 'react';

type Difficulty = 'easy' | 'medium' | 'hard';

type Puzzle = {
  id: string;
  puzzle: string;
  difficulty: number;
};

type Props = {
  onStart: (
    grid: number[][],
    size: number,
    filePath: string,
    puzzleId: string
  ) => void;
  selectedSize: number;
  selectedDifficulty: Difficulty;
};

export default function PuzzleSelector({
  onStart,
  selectedSize,
  selectedDifficulty,
}: Props) {
  console.log('✅ PuzzleSelector رندر شد');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const parsePuzzleString = (puzzleStr: string, size: number): number[][] => {
    const digits = puzzleStr
      .slice(0, size * size)
      .split('')
      .map((char) => {
        const num = parseInt(char, 10);
        return isNaN(num) ? 0 : num;
      });

    const grid: number[][] = [];
    for (let i = 0; i < size; i++) {
      grid.push(digits.slice(i * size, (i + 1) * size));
    }
    return grid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const filePath = `${import.meta.env.BASE_URL}assets/services/sudoku/${selectedSize}x${selectedSize}/${selectedDifficulty}.json`;
      const response = await fetch(filePath);

      if (!response.ok) {
        throw new Error(`فایل ${filePath} پیدا نشد یا قابل خواندن نیست.`);
      }

      const puzzles: Puzzle[] = await response.json();

      if (!Array.isArray(puzzles) || puzzles.length === 0) {
        throw new Error('هیچ جدولی در فایل موجود نیست.');
      }

      const randomIndex = Math.floor(Math.random() * puzzles.length);
      const selected = puzzles[randomIndex];
      const grid = parsePuzzleString(selected.puzzle, selectedSize);

      console.log('🧩 شناسه پازل انتخاب‌شده:', selected.id);
      onStart(grid, selectedSize, filePath, selected.id);
    } catch (err: unknown) {
      console.error('❌ خطا:', err);
      setError(err instanceof Error ? err.message : 'مشکلی در بارگذاری جدول پیش آمد.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center"
    >
      <h2 className="text-xl font-bold mb-4">🎯 انتخاب جدول سودوکو</h2>

      <p className="mb-4 text-gray-700">
        📐 اندازه: <strong>{selectedSize}×{selectedSize}</strong> | 🎯 سختی: <strong>{selectedDifficulty}</strong>
      </p>

      {error && (
        <div className="error-box bg-red-100 text-red-700 p-3 rounded mb-4">
          <p>⚠️ {error}</p>
          <button
            type="button"
            className="retry-button mt-2 text-blue-600 underline"
            onClick={() => setError(null)}
          >
            🔄 تلاش مجدد
          </button>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className={`w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'در حال بارگذاری...' : 'شروع بازی'}
      </button>
    </form>
  );
}