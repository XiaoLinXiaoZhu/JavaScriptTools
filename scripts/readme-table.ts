/**
 * 自动生成 README.md 中的脚本列表表格
 * 在 build 流程中调用，读取所有 meta.ts 并更新 <!-- SCRIPT_TABLE_START/END --> 之间的内容
 */
import * as esbuild from 'esbuild';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { pathToFileURL } from 'node:url';
import type { ScriptConfig, UserScriptConfig } from '../src/shared/types';

const ROOT = path.resolve(import.meta.dirname, '..');
const SRC_DIR = path.join(ROOT, 'src');
const README_PATH = path.join(ROOT, 'readme.md');
const SKIP_DIRS = new Set(['shared']);
const PAGES_BASE_URL = 'https://xiaolinxiaozhu.github.io/JavaScriptTools';

interface ScriptMeta {
  name: string;
  desc: string;
  category: string;
  dirName: string;
  outputName: string;
  mode: 'userscript' | 'plain' | 'node';
  greasyforkId?: number;
}

async function loadMetaConfig(metaFile: string): Promise<ScriptConfig> {
  const result = await esbuild.build({
    entryPoints: [metaFile],
    bundle: true,
    format: 'esm',
    platform: 'node',
    write: false,
    outdir: 'out',
  });

  const code = result.outputFiles[0].text;
  const tmpFile = metaFile.replace(/\.ts$/, '.readme-table.tmp.mjs');
  fs.writeFileSync(tmpFile, code);
  try {
    const mod = await import(pathToFileURL(tmpFile).href);
    return mod.default as ScriptConfig;
  } finally {
    fs.unlinkSync(tmpFile);
  }
}

function extractText(value: string | Record<string, string> | undefined): string {
  if (!value) return '';
  if (typeof value === 'string') return value;
  return value[''] || value['zh-CN'] || value['zh-TW'] || Object.values(value)[0] || '';
}

async function discoverScripts(): Promise<ScriptMeta[]> {
  const items: ScriptMeta[] = [];
  const dirs = fs.readdirSync(SRC_DIR, { withFileTypes: true });

  for (const dirent of dirs) {
    if (!dirent.isDirectory()) continue;
    if (SKIP_DIRS.has(dirent.name)) continue;

    const metaFile = path.join(SRC_DIR, dirent.name, 'meta.ts');
    if (!fs.existsSync(metaFile)) continue;

    const config = await loadMetaConfig(metaFile);
    const mode = config.mode ?? 'userscript';
    const outputName = config.outputName ?? dirent.name;

    let name: string;
    let desc: string;

    if (mode === 'userscript') {
      const uc = config as UserScriptConfig;
      name = extractText(uc.meta.name);
      desc = extractText(uc.meta.description);
    } else {
      name = outputName;
      desc = '';
    }

    items.push({
      name,
      desc,
      category: config.category,
      dirName: dirent.name,
      outputName,
      mode,
      greasyforkId: config.greasyforkId,
    });
  }

  return items;
}

function githubInstallUrl(item: ScriptMeta): string {
  const ext = item.mode === 'userscript' ? '.user.js' : '.js';
  return `${PAGES_BASE_URL}/${item.category}/${item.outputName}${ext}`;
}

function generateTables(items: ScriptMeta[]): string {
  const userscripts = items.filter(i => i.mode === 'userscript');
  const others = items.filter(i => i.mode !== 'userscript');

  const lines: string[] = [];

  lines.push('### 油猴脚本');
  lines.push('');
  lines.push('| 脚本 | 说明 | 安装 |');
  lines.push('|------|------|------|');

  for (const item of sortItems(userscripts)) {
    const name = item.name || item.dirName;

    const links: string[] = [];
    if (item.greasyforkId) {
      links.push(`[GreasyFork](https://greasyfork.org/scripts/${item.greasyforkId})`);
    }
    links.push(`[GitHub](${githubInstallUrl(item)})`);

    lines.push(`| [${name}](src/${item.dirName}/) | ${item.desc || '-'} | ${links.join(' \\| ')} |`);
  }

  if (others.length > 0) {
    lines.push('');
    lines.push('### 其他工具');
    lines.push('');
    lines.push('| 项目 | 说明 | 类型 |');
    lines.push('|------|------|------|');

    for (const item of sortItems(others)) {
      const modeLabel = item.mode === 'plain' ? 'Plain JS' : 'Node.js 模块';
      lines.push(`| [${item.name}](src/${item.dirName}/) | - | ${modeLabel} |`);
    }
  }

  return lines.join('\n');
}

function sortItems(items: ScriptMeta[]): ScriptMeta[] {
  return [...items].sort((a, b) => {
    if (a.greasyforkId && !b.greasyforkId) return -1;
    if (!a.greasyforkId && b.greasyforkId) return 1;
    return a.name.localeCompare(b.name);
  });
}

// ─── 更新 README ─────────────────────────────────────────────

const START_MARKER = '<!-- SCRIPT_TABLE_START -->';
const END_MARKER = '<!-- SCRIPT_TABLE_END -->';

async function updateReadme(tables: string): Promise<void> {
  const readme = fs.readFileSync(README_PATH, 'utf-8');

  const startIdx = readme.indexOf(START_MARKER);
  const endIdx = readme.indexOf(END_MARKER);

  if (startIdx === -1 || endIdx === -1 || startIdx >= endIdx) {
    console.error('  ⚠️  README.md 中未找到 SCRIPT_TABLE_START/END 标记');
    return;
  }

  const before = readme.slice(0, startIdx + START_MARKER.length);
  const after = readme.slice(endIdx);
  const newReadme = before + '\n' + tables + '\n' + after;

  fs.writeFileSync(README_PATH, newReadme);
  console.log('  📄 更新 readme.md 脚本列表表格');
}

export async function updateReadmeTable(): Promise<void> {
  console.log('📋 生成 readme.md 脚本列表...');
  const items = await discoverScripts();
  const tables = generateTables(items);
  await updateReadme(tables);
}

if (import.meta.main) {
  updateReadmeTable().catch((err) => {
    console.error('更新 readme 失败:', err);
    process.exit(1);
  });
}
