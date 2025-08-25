#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import rules from '../config/import-rules.json' assert { type: 'json' };

// 📁 دریافت مسیر و فلگ‌ها
const directory = process.argv[2];
const shouldFix = process.argv.includes('--fix');

if (!directory || !fs.existsSync(directory)) {
  console.error(chalk.red('❌ لطفاً مسیر معتبر پوشه را وارد کنید.'));
  process.exit(1);
}

// 🔁 دریافت همه فایل‌های .tsx به‌صورت بازگشتی
function getAllTsxFiles(dir: string): string[] {
  let results: string[] = [];

  for (const entry of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      results = results.concat(getAllTsxFiles(fullPath));
    } else if (entry.endsWith('.tsx')) {
      results.push(fullPath);
    }
  }

  return results;
}

const tsxFiles = getAllTsxFiles(directory);

if (tsxFiles.length === 0) {
  console.log(chalk.yellow('⚠️ هیچ فایل .tsx در مسیر مشخص‌شده پیدا نشد.'));
  process.exit(0);
}

console.log(chalk.cyan(`🔍 بررسی ${tsxFiles.length} فایل${shouldFix ? ' + اصلاح خودکار' : ''}...`));
console.log('--------------------------------------------------');

// 🧠 بررسی هر فایل
tsxFiles.forEach((filePath) => {
  const content = fs.readFileSync(filePath, 'utf8');
  const relativePath = path.relative(directory, filePath);

  let matchedAnyRule = false;
  let updatedContent = content;
  let hasChanges = false;

  console.log(chalk.gray(`📄 ${relativePath}`));

  for (const [ruleName, rule] of Object.entries(rules)) {
    const isUsed = rule.match.some((pattern) => {
      try {
        const regex = new RegExp(`\\b${pattern}\\b`, 'g');
        return regex.test(content);
      } catch {
        return false;
      }
    });

    const importRegex = new RegExp(`^\\s*${rule.import.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'm');
    const isImported = importRegex.test(content);

    if (isUsed) {
      matchedAnyRule = true;

      if (isImported) {
        console.log(chalk.blue(`✅ "${ruleName}" قبلاً ایمپورت شده.`));
      } else {
        if (shouldFix) {
          if (!updatedContent.startsWith(rule.import)) {
            updatedContent = `${rule.import}\n${updatedContent}`;
            hasChanges = true;
            console.log(chalk.green(`🛠 ایمپورت "${ruleName}" اضافه شد.`));
          }
        } else {
          console.log(chalk.yellow(`⚠️ "${ruleName}" استفاده شده ولی ایمپورت نشده.`));
        }
      }
    }
  }

  if (!matchedAnyRule) {
    console.log(chalk.gray('ℹ️ هیچ الگوی استفاده‌شده‌ای مطابق با قوانین یافت نشد.'));
  }

  if (shouldFix && hasChanges) {
    fs.writeFileSync(filePath, updatedContent, 'utf8');
  }

  console.log('--------------------------------------------------');
});

console.log(chalk.green(`🎉 بررسی کامل شد${shouldFix ? ' و اصلاحات انجام شد.' : '.'}`));