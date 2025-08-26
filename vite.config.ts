import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { configDefaults } from 'vitest/config';

export default defineConfig({
  base: '/sudoku-kids/', // نام ریپوی گیت‌هاب
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    exclude: [...configDefaults.exclude, 'dist/**'],
    include: ['src/modules/**/*.test.ts'],
  },
});