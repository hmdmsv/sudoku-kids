import fs from 'fs';
import chalk from 'chalk';
import path from 'path';
import rules from '../config/import-rules.json' assert { type: 'json' };

/**
 * بررسی و افزودن importهای مورد نیاز به فایل مشخص‌شده
 * @param filePath مسیر فایل .tsx
 * @returns وضعیت نهایی: added | already | error
 */
export function addBoardImportIfNeeded(filePath: string): 'added' | 'already' | 'error' {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');

    let modified = false;

    Object.entries(rules).forEach(([key, rule]) => {
      const alreadyImported = lines.some((line) => line.includes(rule.import));
      const usageDetected = rule.match.some((pattern) => content.includes(pattern));

      if (usageDetected && !alreadyImported) {
        lines.unshift(rule.import);
        console.log(chalk.gray(`➕ ${key} import added to ${path.basename(filePath)}`));
        modified = true;
      } else if (usageDetected && alreadyImported) {
        console.log(chalk.gray(`✅ ${key} already imported in ${path.basename(filePath)}`));
      }
    });

    if (modified) {
      fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
      return 'added';
    }

    return 'already';
  } catch (err) {
    console.error(chalk.red(`❌ Error processing ${path.basename(filePath)}: ${err}`));
    return 'error';
  }
}