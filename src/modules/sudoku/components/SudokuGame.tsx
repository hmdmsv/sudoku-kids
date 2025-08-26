import React, { useState } from 'react';
import PuzzleSelector from './PuzzleSelector';
import { SudokuGrid } from './SudokuGrid';
import CheckButton from './CheckButton';
import type { Difficulty } from '../types/ui.types';

const SudokuGame: React.FC = () => {
  const [grid, setGrid] = useState<number[][] | null>(null);
  const [size, setSize] = useState<number>(4); // مقدار پیش‌فرض
  const [difficulty, setDifficulty] = useState<Difficulty>('easy'); // مقدار پیش‌فرض
  const [sourceFile, setSourceFile] = useState<string | null>(null);
  const [puzzleId, setPuzzleId] = useState<string | null>(null);

  const handleStart = (
    selectedGrid: number[][],
    selectedSize: number,
    fileName: string,
    id: string
  ) => {
    setGrid(selectedGrid);
    setSize(selectedSize);
    setSourceFile(fileName);
    setPuzzleId(id);
  };

  const handleReset = () => {
    setGrid(null);
    setSourceFile(null);
    setPuzzleId(null);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-blue-50 p-6">
      {!grid ? (
        <PuzzleSelector
          selectedSize={size}
          selectedDifficulty={difficulty}
          onStart={handleStart}
        />
      ) : (
        <div className="w-full max-w-4xl text-center">
          <SudokuGrid size={size} puzzle={grid} />
          <CheckButton />
          <p className="mt-4 text-sm text-gray-600">
            فایل: <strong>{sourceFile}</strong> | شناسه جدول: <strong>{puzzleId}</strong>
          </p>
          <button
            onClick={handleReset}
            className="mt-4 text-blue-600 underline hover:text-blue-800 transition"
          >
            🔄 انتخاب جدول جدید
          </button>
        </div>
      )}
    </main>
  );
};

export default SudokuGame;