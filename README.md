# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
# 🧩 Sudoku Kids App — React + TypeScript + Vite

این پروژه یک اپلیکیشن تعاملی سودوکو برای کودکان فارسی‌زبان است که با استفاده از React، TypeScript، Vite و ابزارهای مدرن توسعه ساخته شده. هدف اصلی، ارائه تجربه کاربری ساده، قابل توسعه و چندزبانه است.

---

## 🚀 ویژگی‌ها

- رابط کاربری تعاملی و کودک‌پسند
- ساختار ماژولار و قابل نگهداری
- ابزار CLI اختصاصی برای مدیریت importها
- پشتیبانی از چند زبان برای پیام‌های ابزارها
- تنظیمات حرفه‌ای ESLint و Prettier

---

## 📁 ساختار پوشه‌ها



---

## 🛠 ابزارهای توسعه

### `tools/board-importer.ts`

ابزار CLI برای اسکن فایل‌های `.tsx` و افزودن importهای گمشده بر اساس `import-rules.json`. از `inquirer` برای دریافت ورودی و از `chalk` برای نمایش رنگی استفاده می‌کند.

### `tools/addBoardImport.ts`

ماژول بررسی و افزودن import. با استفاده از `import-rules.json` مشخص می‌کند که چه هدرهایی باید به فایل اضافه شوند.

### `tools/i18n.ts`

مدیریت پیام‌های چندزبانه برای ابزار CLI. پشتیبانی از فارسی و انگلیسی.

### `config/import-rules.json`

تعریف قوانین بررسی import. هر rule شامل:
- `match`: رشته‌هایی که اگر در فایل دیده شوند، import لازم است.
- `import`: رشته‌ای که باید به ابتدای فایل اضافه شود.

---

## 📦 نصب و اجرا

```bash
npm install
npm run dev
