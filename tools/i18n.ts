type Language = 'en' | 'fa';

const messages = {
  en: {
    enterDirectory: '📁 Enter the directory to scan:',
    pathNotFound: '❌ The specified path does not exist.',
    noFiles: '⚠️ No files need import.',
    selectFiles: '📎 Select files to add missing imports:',
    importAdded: '✅ Import added to',
    alreadyImported: '✅ Already imported:',
    importError: '❌ Error while processing:',
    scanComplete: '📄 Scan complete.',
    noMatchFound: 'ℹ️ No matching usage found in',
    allDone: '🎉 All selected files processed.',
  },
  fa: {
    enterDirectory: '📁 مسیر پوشه‌ای که می‌خوای بررسی بشه:',
    pathNotFound: '❌ مسیر وارد شده وجود ندارد.',
    noFiles: '⚠️ هیچ فایلی نیاز به ایمپورت ندارد.',
    selectFiles: '📎 فایل‌هایی که می‌خوای ایمپورت بهشون اضافه بشه:',
    importAdded: '✅ ایمپورت اضافه شد به',
    alreadyImported: '✅ قبلاً ایمپورت شده:',
    importError: '❌ خطا در پردازش فایل:',
    scanComplete: '📄 بررسی فایل‌ها کامل شد.',
    noMatchFound: 'ℹ️ هیچ استفاده‌ای از rule در فایل یافت نشد:',
    allDone: '🎉 همه فایل‌های انتخاب‌شده پردازش شدند.',
  },
};

export const getMessages = (lang: Language = 'en') => messages[lang];