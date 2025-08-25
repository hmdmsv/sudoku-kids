// src/modules/sudoku/components/CheckButton.tsx
import confetti from 'canvas-confetti';
import type { Cell } from '../utils/gridUtils';

interface CheckButtonProps {
  grid: Cell[][];
  solution: Cell[][];
  onResult: (message: string) => void;
}

const CheckButton = ({ grid, solution, onResult }: CheckButtonProps) => {
  const checkSudoku = () => {
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        if (grid[row][col].value !== solution[row][col].value) {
          onResult('جدول اشتباه پر شده است!');
          return;
        }
      }
    }
    onResult('آفرین! جدول را درست حل کردی.');
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.7 },
    });
  };

  return (
    <button
      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      onClick={checkSudoku}
    >
      ببینم درسته
    </button>
  );
};

export default CheckButton;