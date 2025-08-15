import { SudokuGrid } from '../modules/sudoku/components/SudokuGrid';

const SudokuPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">جدول سودوکو کودکانه</h1>
      <SudokuGrid />
    </div>
  );
};

export default SudokuPage;