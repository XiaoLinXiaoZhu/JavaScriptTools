import * as esbuild from 'esbuild';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { pathToFileURL } from 'node:url';

import type {
  ScriptConfig,
  UserScriptConfig,
  PlainScriptConfig,
  NodeScriptConfig,
  UserScriptMeta,
} from '../src/shared/types';

const SRC_DIR = path.resolve(import.meta.dirname, '..', 'src');
const DIST_DIR = path.resolve(import.meta.dirname, '..', 'dist');
const SKIP_DIRS = new Set(['shared']);

// GitHub Pages base URL，用于自动注入 downloadURL/updateURL
const PAGES_BASE_URL =
  'https://xiaolinxiaozhu.github.io/JavaScriptTools';

// ─── UserScript Header 生成 ───────────────────────────────────

function generateHeader(meta: UserScriptMeta): string {
  const lines: string[] = ['// ==UserScript=='];

  const addField = (key: string, value: string) => {
    const padded = `@${key}`.padEnd(20);
    lines.push(`// ${padded} ${value}`);
  };

  const fieldOrder: (keyof UserScriptMeta)[] = [
    'name',
    'namespace',
    'version',
    'description',
    'author',
    'license',
    'icon',
    'match',
    'require',
    'resource',
    'connect',
    'grant',
    'run-at',
    'noframes',
    'downloadURL',
    'updateURL',
  ];

  for (const key of fieldOrder) {
    const value = meta[key];
    if (value === undefined || value === null) continue;

    if (key === 'noframes') {
      if (value) lines.push(`// @noframes`);
      continue;
    }

    if (typeof value === 'object' && !Array.isArray(value)) {
      const record = value as Record<string, string>;
      for (const [locale, text] of Object.entries(record)) {
        const fieldName = locale === '' ? key : `${key}:${locale}`;
        addField(fieldName as string, text);
      }
      continue;
    }

    if (Array.isArray(value)) {
      for (const item of value) {
        addField(key as string, String(item));
      }
      continue;
    }

    addField(key as string, String(value));
  }

  const knownKeys = new Set([...fieldOrder, 'name', 'description']);
  for (const [key, value] of Object.entries(meta)) {
    if (knownKeys.has(key as keyof UserScriptMeta)) continue;
    if (value === undefined || value === null) continue;

    if (Array.isArray(value)) {
      for (const item of value) {
        addField(key, String(item));
      }
    } else {
      addField(key, String(value));
    }
  }

  lines.push('// ==/UserScript==');
  return lines.join('\n');
}

// ─── 扫描脚本目录 ─────────────────────────────────────────────

interface ScriptEntry {
  name: string;
  dir: string;
  config: ScriptConfig;
}

async function discoverScripts(): Promise<ScriptEntry[]> {
  const entries: ScriptEntry[] = [];
  const dirs = fs.readdirSync(SRC_DIR, { withFileTypes: true });

  for (const dirent of dirs) {
    if (!dirent.isDirectory()) continue;
    if (SKIP_DIRS.has(dirent.name)) continue;

    const scriptDir = path.join(SRC_DIR, dirent.name);
    const metaFile = path.join(scriptDir, 'meta.ts');

    if (!fs.existsSync(metaFile)) {
      console.log(`  ⏭  跳过 ${dirent.name}/（无 meta.ts）`);
      continue;
    }

    const config = await loadMetaConfig(metaFile);
    entries.push({
      name: dirent.name,
      dir: scriptDir,
      config,
    });
  }

  return entries;
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
  const tmpFile = metaFile.replace(/\.ts$/, '.meta.tmp.mjs');
  fs.writeFileSync(tmpFile, code);
  try {
    const mod = await import(pathToFileURL(tmpFile).href);
    return mod.default as ScriptConfig;
  } finally {
    fs.unlinkSync(tmpFile);
  }
}

// ─── 构建分发 ─────────────────────────────────────────────────

async function buildScript(entry: ScriptEntry): Promise<void> {
  const mode = entry.config.mode ?? 'userscript';

  switch (mode) {
    case 'userscript':
      return buildUserScript(entry);
    case 'plain':
      return buildPlainScript(entry);
    case 'node':
      return buildNodeScript(entry);
    default:
      throw new Error(`未知的构建模式: ${mode}`);
  }
}

// ─── 油猴脚本构建 ─────────────────────────────────────────────

async function buildUserScript(entry: ScriptEntry): Promise<void> {
  const { name, dir, config: rawConfig } = entry;
  const config = rawConfig as UserScriptConfig;
  const entryFile = path.join(dir, config.entry ?? 'index.ts');
  const outputName = config.outputName ?? name;
  const outputDir = path.join(DIST_DIR, config.category);
  const outputFile = path.join(outputDir, `${outputName}.user.js`);

  if (!fs.existsSync(entryFile)) {
    console.error(`  ❌ ${name}: 入口文件不存在 ${entryFile}`);
    return;
  }

  // 自动注入 downloadURL/updateURL（如果未手动指定）
  const fileUrl = `${PAGES_BASE_URL}/${config.category}/${outputName}.user.js`;
  config.meta.downloadURL ??= fileUrl;
  config.meta.updateURL ??= fileUrl;

  const header = generateHeader(config.meta);

  await esbuild.build({
    entryPoints: [entryFile],
    bundle: true,
    format: 'iife',
    platform: 'browser',
    target: 'es2020',
    outfile: outputFile,
    minify: false,
    keepNames: true,
    banner: { js: header + '\n' },
    loader: { '.css': 'text' },
    alias: {
      '@shared': path.join(SRC_DIR, 'shared'),
      '@xlxz/components/toast': path.resolve(import.meta.dirname, '..', 'packages', 'components', 'dist', 'toast.js'),
      '@xlxz/components/config-panel': path.resolve(import.meta.dirname, '..', 'packages', 'components', 'dist', 'config-panel.js'),
      '@xlxz/components/floating-panel': path.resolve(import.meta.dirname, '..', 'packages', 'components', 'dist', 'floating-panel.js'),
      '@xlxz/components/animated-slider': path.resolve(import.meta.dirname, '..', 'packages', 'components', 'dist', 'animated-slider.js'),
      '@xlxz/components': path.resolve(import.meta.dirname, '..', 'packages', 'components', 'dist', 'index.js'),
    },
  });

  console.log(`  ✅ ${name} → dist/${config.category}/${outputName}.user.js`);
}

// ─── 纯 JS 构建 ──────────────────────────────────────────────

async function buildPlainScript(entry: ScriptEntry): Promise<void> {
  const { name, dir, config: rawConfig } = entry;
  const config = rawConfig as PlainScriptConfig;
  const entryFile = path.join(dir, config.entry ?? 'index.ts');
  const outputName = config.outputName ?? name;
  const format = config.format ?? 'iife';
  const platform = config.platform ?? 'browser';
  const outputDir = path.join(DIST_DIR, config.category);
  const ext = format === 'esm' ? '.mjs' : '.js';
  const outputFile = path.join(outputDir, `${outputName}${ext}`);

  if (!fs.existsSync(entryFile)) {
    console.error(`  ❌ ${name}: 入口文件不存在 ${entryFile}`);
    return;
  }

  await esbuild.build({
    entryPoints: [entryFile],
    bundle: true,
    format,
    platform,
    target: 'es2020',
    outfile: outputFile,
    minify: false,
    keepNames: true,
    loader: { '.css': 'text' },
    alias: {
      '@shared': path.join(SRC_DIR, 'shared'),
      '@xlxz/components/toast': path.resolve(import.meta.dirname, '..', 'packages', 'components', 'dist', 'toast.js'),
      '@xlxz/components/config-panel': path.resolve(import.meta.dirname, '..', 'packages', 'components', 'dist', 'config-panel.js'),
      '@xlxz/components/floating-panel': path.resolve(import.meta.dirname, '..', 'packages', 'components', 'dist', 'floating-panel.js'),
      '@xlxz/components/animated-slider': path.resolve(import.meta.dirname, '..', 'packages', 'components', 'dist', 'animated-slider.js'),
      '@xlxz/components': path.resolve(import.meta.dirname, '..', 'packages', 'components', 'dist', 'index.js'),
    },
  });

  console.log(`  ✅ ${name} → dist/${config.category}/${outputName}${ext}`);
}

// ─── Node.js 模块构建 ────────────────────────────────────────

async function buildNodeScript(entry: ScriptEntry): Promise<void> {
  const { name, dir, config: rawConfig } = entry;
  const config = rawConfig as NodeScriptConfig;
  const entryFile = path.join(dir, config.entry ?? 'index.ts');
  const outputName = config.outputName ?? name;
  const format = config.format ?? 'cjs';
  const outputDir = path.join(DIST_DIR, config.category);
  const ext = format === 'esm' ? '.mjs' : '.js';
  const outputFile = path.join(outputDir, `${outputName}${ext}`);

  if (!fs.existsSync(entryFile)) {
    console.error(`  ❌ ${name}: 入口文件不存在 ${entryFile}`);
    return;
  }

  const external = resolveExternals(dir, config.external);

  await esbuild.build({
    entryPoints: [entryFile],
    bundle: true,
    format,
    platform: 'node',
    target: 'node16',
    outfile: outputFile,
    minify: false,
    keepNames: true,
    external,
    alias: {
      '@shared': path.join(SRC_DIR, 'shared'),
      '@xlxz/components/toast': path.resolve(import.meta.dirname, '..', 'packages', 'components', 'dist', 'toast.js'),
      '@xlxz/components/config-panel': path.resolve(import.meta.dirname, '..', 'packages', 'components', 'dist', 'config-panel.js'),
      '@xlxz/components/floating-panel': path.resolve(import.meta.dirname, '..', 'packages', 'components', 'dist', 'floating-panel.js'),
      '@xlxz/components/animated-slider': path.resolve(import.meta.dirname, '..', 'packages', 'components', 'dist', 'animated-slider.js'),
      '@xlxz/components': path.resolve(import.meta.dirname, '..', 'packages', 'components', 'dist', 'index.js'),
    },
  });

  // 如果脚本目录有 package.json，复制到输出目录
  const srcPkg = path.join(dir, 'package.json');
  if (fs.existsSync(srcPkg)) {
    fs.cpSync(srcPkg, path.join(outputDir, 'package.json'));
  }

  console.log(`  ✅ ${name} → dist/${config.category}/${outputName}${ext}`);
}

function resolveExternals(
  scriptDir: string,
  external?: true | string[]
): string[] {
  if (Array.isArray(external)) return external;

  // 默认行为：从 package.json 读取 dependencies
  const pkgPath = path.join(scriptDir, 'package.json');
  if (!fs.existsSync(pkgPath)) {
    return [];
  }

  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
  return [
    ...Object.keys(pkg.dependencies ?? {}),
    ...Object.keys(pkg.peerDependencies ?? {}),
  ];
}

// ─── Watch 模式 ───────────────────────────────────────────────

async function watchMode(): Promise<void> {
  const { watch } = await import('chokidar');

  console.log('\n👀 Watch 模式已启动，监听 src/ 变化...\n');

  const watcher = watch(SRC_DIR, {
    ignoreInitial: true,
    ignored: [/\.meta\.tmp\.mjs$/, /node_modules/],
  });

  const rebuild = async () => {
    console.log('\n🔄 检测到变化，重新构建...\n');
    const newEntries = await discoverScripts();
    await buildAll(newEntries);
  };

  let timer: ReturnType<typeof setTimeout> | null = null;
  watcher.on('all', () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(rebuild, 300);
  });
}

// ─── 主流程 ───────────────────────────────────────────────────

async function buildAll(entries: ScriptEntry[]): Promise<void> {
  if (fs.existsSync(DIST_DIR)) {
    fs.rmSync(DIST_DIR, { recursive: true });
  }

  console.log(`\n📦 开始构建 ${entries.length} 个脚本...\n`);

  const results = await Promise.allSettled(
    entries.map((entry) => buildScript(entry))
  );

  const failed = results.filter((r) => r.status === 'rejected');
  if (failed.length > 0) {
    console.error(`\n❌ ${failed.length} 个脚本构建失败：`);
    for (const f of failed) {
      console.error((f as PromiseRejectedResult).reason);
    }
    process.exit(1);
  }

  console.log(`\n✨ 全部构建完成！\n`);

  // 生成脚本文档
  console.log('📄 生成脚本文档...\n');
  await processAllDocs(entries);

  // 更新 README.md 脚本列表表格
  console.log('📋 更新 README.md 脚本列表...\n');
  const { updateReadmeTable } = await import('./readme-table');
  await updateReadmeTable();
}

async function processAllDocs(entries: ScriptEntry[]): Promise<void> {
  const { processScriptDocs } = await import('./docs');
  for (const entry of entries) {
    await processScriptDocs(entry.name, entry.dir, entry.config);
  }
}

async function main(): Promise<void> {
  console.log('🔍 扫描 src/ 目录...');
  const entries = await discoverScripts();

  if (entries.length === 0) {
    console.log('⚠️  未找到任何包含 meta.ts 的脚本目录');
    return;
  }

  await buildAll(entries);

  if (process.argv.includes('--watch')) {
    await watchMode();
  }
}

main().catch((err) => {
  console.error('构建失败:', err);
  process.exit(1);
});
