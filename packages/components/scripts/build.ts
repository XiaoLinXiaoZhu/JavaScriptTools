import { execSync } from 'node:child_process';
import { writeFileSync, rmSync, mkdirSync, existsSync, renameSync } from 'node:fs';
import { resolve } from 'node:path';

const rootDir = resolve(import.meta.dirname, '..');
const distDir = resolve(rootDir, 'dist');

// 入口点
const entries = ['toast', 'config-panel', 'floating-panel', 'animated-slider'];

function main() {
  // 清理
  rmSync(distDir, { recursive: true, force: true });
  mkdirSync(distDir, { recursive: true });

  for (const name of entries) {
    console.log(`  Building ${name}...`);

    const tmpDist = resolve(rootDir, `.tmp-dist-${name}`);
    // 使用 child_process 传递环境变量，避免 cmd set 尾部空格问题
    execSync(`npx vite build --outDir "${tmpDist}"`, {
      cwd: rootDir,
      env: { ...process.env, BUILD_ENTRY: name },
      stdio: 'inherit',
    });

    // 移动产物
    const srcFile = resolve(tmpDist, `${name}.js`);
    if (!existsSync(srcFile)) {
      console.error(`    ❌ ${srcFile} not found`);
      process.exit(1);
    }
    renameSync(srcFile, resolve(distDir, `${name}.js`));
    rmSync(tmpDist, { recursive: true, force: true });
    console.log(`    → dist/${name}.js`);
  }

  // 生成 barrel index.js
  const barrel = `/**
 * @xlxz/components — 油猴脚本 UI 组件库
 *
 * 使用方式：
 *   import { showToast, createConfigPanel } from '@xlxz/components';
 */
export { showToast, configureToast } from './toast.js';
export { createConfigPanel } from './config-panel.js';
export { createFloatingPanel } from './floating-panel.js';
export { createAnimatedSlider } from './animated-slider.js';
export type { ToastOptions, ToastPosition } from './toast.js';
export type { ConfigPanelOptions, ConfigField } from './config-panel.js';
export type { FloatingPanelOptions } from './floating-panel.js';
export type { AnimatedSliderOptions, AnimatedSliderInstance } from './animated-slider.js';
`;
  writeFileSync(resolve(distDir, 'index.js'), barrel);
  console.log('    → dist/index.js (barrel)');

  console.log(`\n  ✅ ${entries.length} components + barrel built`);
}

main();
