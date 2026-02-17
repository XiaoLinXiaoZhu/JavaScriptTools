/**
 * 生成 sync-manifest.json 到 dist/ 目录
 * 包含所有脚本的发布信息，供 CI 和调试使用
 */
import * as esbuild from 'esbuild';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { pathToFileURL } from 'node:url';
import type { ScriptConfig, UserScriptConfig } from '../src/shared/types';

const SRC_DIR = path.resolve(import.meta.dirname, '..', 'src');
const DIST_DIR = path.resolve(import.meta.dirname, '..', 'dist');
const SKIP_DIRS = new Set(['shared']);

// GitHub Pages base URL（需要根据实际仓库名调整）
const PAGES_BASE_URL =
  'https://xiaolinxiaozhu.github.io/JavaScriptTools';

interface ManifestEntry {
  name: string;
  mode: string;
  category: string;
  distPath: string;
  pagesUrl: string;
  version?: string;
  greasyforkId?: number;
  greasyforkUrl?: string;
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

async function main(): Promise<void> {
  const manifest: ManifestEntry[] = [];
  const dirs = fs.readdirSync(SRC_DIR, { withFileTypes: true });

  for (const dirent of dirs) {
    if (!dirent.isDirectory()) continue;
    if (SKIP_DIRS.has(dirent.name)) continue;

    const metaFile = path.join(SRC_DIR, dirent.name, 'meta.ts');
    if (!fs.existsSync(metaFile)) continue;

    const config = await loadMetaConfig(metaFile);
    const mode = config.mode ?? 'userscript';
    const outputName = config.outputName ?? dirent.name;

    let distFile: string;
    if (mode === 'userscript') {
      distFile = `${config.category}/${outputName}.user.js`;
    } else if (mode === 'node') {
      const fmt = (config as { format?: string }).format ?? 'cjs';
      const ext = fmt === 'esm' ? '.mjs' : '.js';
      distFile = `${config.category}/${outputName}${ext}`;
    } else {
      const fmt = (config as { format?: string }).format ?? 'iife';
      const ext = fmt === 'esm' ? '.mjs' : '.js';
      distFile = `${config.category}/${outputName}${ext}`;
    }

    const entry: ManifestEntry = {
      name: dirent.name,
      mode,
      category: config.category,
      distPath: distFile,
      pagesUrl: `${PAGES_BASE_URL}/${distFile}`,
    };

    if (mode === 'userscript') {
      const usc = config as UserScriptConfig;
      const meta = usc.meta;
      entry.version =
        typeof meta.version === 'string' ? meta.version : undefined;
    }

    if (config.greasyforkId) {
      entry.greasyforkId = config.greasyforkId;
      entry.greasyforkUrl = `https://greasyfork.org/scripts/${config.greasyforkId}`;
    }

    manifest.push(entry);
  }

  // 确保 dist 目录存在
  if (!fs.existsSync(DIST_DIR)) {
    fs.mkdirSync(DIST_DIR, { recursive: true });
  }

  const outputPath = path.join(DIST_DIR, 'sync-manifest.json');
  fs.writeFileSync(outputPath, JSON.stringify(manifest, null, 2));
  console.log(`📋 生成 sync-manifest.json（${manifest.length} 个脚本）`);

  // 打印摘要
  for (const entry of manifest) {
    const gf = entry.greasyforkId
      ? ` → GF#${entry.greasyforkId}`
      : '';
    console.log(`  ${entry.name} [${entry.mode}] ${entry.pagesUrl}${gf}`);
  }
}

main().catch((err) => {
  console.error('生成 manifest 失败:', err);
  process.exit(1);
});
