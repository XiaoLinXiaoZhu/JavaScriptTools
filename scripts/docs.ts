/**
 * 脚本文档构建
 *
 * 约定：
 * - 每个脚本目录可以有 README.md（支持 {{changelog}} 占位符）
 * - changelog 来源（优先级从高到低）：
 *   1. changelog/ 文件夹下的 .md 文件（按版本号降序拼接）
 *   2. CHANGELOG.md 单文件
 * - 构建输出到 dist/{category}/{scriptName}.md
 */
import * as fs from 'node:fs';
import * as path from 'node:path';
import type { ScriptConfig } from '../src/shared/types';

const DIST_DIR = path.resolve(import.meta.dirname, '..', 'dist');

/**
 * 处理单个脚本的文档
 */
export async function processScriptDocs(
  name: string,
  dir: string,
  config: ScriptConfig
): Promise<void> {
  const readmePath = path.join(dir, 'README.md');
  if (!fs.existsSync(readmePath)) return;

  let content = fs.readFileSync(readmePath, 'utf-8');

  // 收集 changelog 内容
  const changelog = collectChangelog(dir);

  // 替换占位符
  if (content.includes('{{changelog}}')) {
    content = content.replace('{{changelog}}', changelog);
  }

  // 输出到 dist
  const outputName = config.outputName ?? name;
  const outputDir = path.join(DIST_DIR, config.category);
  const outputFile = path.join(outputDir, `${outputName}.md`);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputFile, content);
  console.log(`  📄 ${name} → dist/${config.category}/${outputName}.md`);
}

/**
 * 收集 changelog 内容
 * 优先从 changelog/ 文件夹读取，否则尝试 CHANGELOG.md
 */
function collectChangelog(dir: string): string {
  const changelogDir = path.join(dir, 'changelog');
  const changelogFile = path.join(dir, 'CHANGELOG.md');

  // 方式 1：changelog/ 文件夹
  if (fs.existsSync(changelogDir) && fs.statSync(changelogDir).isDirectory()) {
    const files = fs.readdirSync(changelogDir)
      .filter(f => f.endsWith('.md'));

    if (files.length === 0) return '';

    // 按版本号降序排序（从文件名提取版本）
    const sorted = files
      .map(f => ({ file: f, version: extractVersion(f) }))
      .sort((a, b) => compareVersions(b.version, a.version));

    const sections: string[] = [];
    for (const { file } of sorted) {
      const content = fs.readFileSync(path.join(changelogDir, file), 'utf-8').trim();
      sections.push(content);
    }

    return sections.join('\n\n');
  }

  // 方式 2：CHANGELOG.md 单文件
  if (fs.existsSync(changelogFile)) {
    return fs.readFileSync(changelogFile, 'utf-8').trim();
  }

  return '';
}

/**
 * 从文件名提取版本号（如 v1.2.3.md → [1, 2, 3]）
 */
function extractVersion(filename: string): number[] {
  const match = filename.match(/v?([\d.]+)/);
  if (!match) return [0];
  return match[1].split('.').map(Number);
}

/**
 * 比较两个版本号数组
 */
function compareVersions(a: number[], b: number[]): number {
  const len = Math.max(a.length, b.length);
  for (let i = 0; i < len; i++) {
    const av = a[i] ?? 0;
    const bv = b[i] ?? 0;
    if (av !== bv) return av - bv;
  }
  return 0;
}
