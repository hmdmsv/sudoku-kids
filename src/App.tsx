import './App.css';
import { SudokuGrid } from './modules/sudoku/components/SudokuGrid';


function App() {
  return (
    <div className="app-container p-4">
      <h1 className="sudoku-title">جدول سودوکو</h1>

      <SudokuGrid />
    </div>
  );
}

export default App;
