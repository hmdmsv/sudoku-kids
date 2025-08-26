// src/modules/sudoku/__tests__/solutionChecker.test.ts

import { describe, it, expect } from 'vitest';
import { hasUniqueSolution } from '../utils/solutionChecker';
import { convertToCells } from '../utils/gridUtils';
import type { Cell } from '../utils/gridUtils';

describe('hasUniqueSolution', () => {
  it('✅ returns true for a valid grid with a unique solution', () => {
    const rawGrid = [
      [5, 3, 0, 0, 7, 0, 0, 0, 0],
      [6, 0, 0, 1, 9, 5, 0, 0, 0],
      [0, 9, 8, 0, 0, 0, 0, 6, 0],
      [8, 0, 0, 0, 6, 0, 0, 0, 3],
      [4, 0, 0, 8, 0, 3, 0, 0, 1],
      [7, 0, 0, 0, 2, 0, 0, 0, 6],
      [0, 6, 0, 0, 0, 0, 2, 8, 0],
      [0, 0, 0, 4, 1, 9, 0, 0, 5],
      [0, 0, 0, 0, 8, 0, 0, 7, 9],
    ];
    const grid: Cell[][] = convertToCells(rawGrid);
    expect(hasUniqueSolution(grid)).toBe(true);
  });

  it('❌ returns false for an empty grid (multiple solutions)', () => {
    const rawGrid = Array(9).fill(0).map(() => Array(9).fill(0));
    const grid: Cell[][] = convertToCells(rawGrid);
    expect(hasUniqueSolution(grid)).toBe(false);
  });

  it('❌ returns false for an invalid grid (conflicting values)', () => {
    const rawGrid = [
      [5, 5, 0, 0, 7, 0, 0, 0, 0], // دو عدد ۵ در یک ردیف
      [6, 0, 0, 1, 9, 5, 0, 0, 0],
      [0, 9, 8, 0, 0, 0, 0, 6, 0],
      [8, 0, 0, 0, 6, 0, 0, 0, 3],
      [4, 0, 0, 8, 0, 3, 0, 0, 1],
      [7, 0, 0, 0, 2, 0, 0, 0, 6],
      [0, 6, 0, 0, 0, 0, 2, 8, 0],
      [0, 0, 0, 4, 1, 9, 0, 0, 5],
      [0, 0, 0, 0, 8, 0, 0, 7, 9],
    ];
    const grid: Cell[][] = convertToCells(rawGrid);
    expect(hasUniqueSolution(grid)).toBe(false);
  });

  it('❌ returns false for a grid with multiple valid solutions', () => {
    const rawGrid = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    const grid: Cell[][] = convertToCells(rawGrid);
    expect(hasUniqueSolution(grid)).toBe(false);
  });
});