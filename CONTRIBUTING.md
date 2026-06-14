# 开发指南

## 项目结构

```
├── src/                    # 脚本源码
│   ├── {script-name}/      # 每个脚本一个文件夹
│   │   ├── meta.ts         # 脚本配置（构建模式、UserScript header）
│   │   ├── index.ts        # 入口文件
│   │   ├── README.md       # 脚本说明（同步到 GreasyFork）
│   │   └── changelog/      # 版本更新日志
│   │       └── v1.0.md
│   └── shared/             # 共享代码和类型定义
├── scripts/                # 构建工具
│   ├── build.ts            # 主构建脚本
│   ├── docs.ts             # 文档生成
│   └── manifest.ts         # 同步清单生成
├── .github/workflows/      # CI/CD
│   └── publish.yml         # 自动构建 + 部署到 GitHub Pages
├── readme.md               # 项目说明（面向用户）
└── CONTRIBUTING.md         # 本文件
```

## 添加新脚本

1. 在 `src/` 下创建新文件夹（使用 kebab-case 命名）
2. 创建 `meta.ts`，定义脚本配置：

```ts
import { defineConfig } from '../shared/define';

export default defineConfig({
  meta: {
    name: '脚本名称',
    namespace: 'https://github.com/XiaoLinXiaoZhu/JavaScriptTools',
    version: '0.1',
    description: '脚本描述',
    author: 'XLXZ',
    match: 'https://example.com/*',
    grant: 'none',
    license: 'MIT',
  },
  category: 'tools', // 决定 dist/{category}/ 输出路径
});
```

3. 创建 `index.ts` 作为入口文件
4. （可选）创建 `README.md` 和 `changelog/` 用于文档同步

### 构建模式

- `userscript`（默认）：油猴脚本，IIFE 格式 + UserScript header
- `plain`：纯 JS 输出，无 header（适用于 Obsidian 等）
- `node`：Node.js 模块，支持 external dependencies

## 文档约定

每个脚本可以有自己的文档，会在构建时生成并部署到 GitHub Pages，用于 GreasyFork 同步。

### README.md

脚本目录下的 `README.md` 支持 `{{changelog}}` 占位符，构建时会自动替换为 changelog 内容。

### changelog/

更新日志以独立 markdown 文件存放在 `changelog/` 文件夹下：

```
src/my-script/changelog/
├── v1.2.md
├── v1.1.md
└── v1.0.md
```

每个文件内容格式：

```markdown
### v1.2

- 新增了某功能
- 修复了某 bug
```

构建时按版本号降序拼接，替换 README.md 中的 `{{changelog}}`。

也支持使用单文件 `CHANGELOG.md` 替代文件夹方式。

## 常用命令

```bash
bun run build          # 构建所有脚本到 dist/
bun run build:watch    # 监听模式，修改后自动重建
bun run typecheck      # TypeScript 类型检查
bun run manifest       # 生成 sync-manifest.json
bun run clean          # 清理 dist/
```

## 发布流程

1. 修改脚本代码
2. 在 `meta.ts` 中 bump `version` 字段
3. 在 `changelog/` 下添加新版本的 `.md` 文件
4. Push 到 `main` 分支
5. CI 自动执行：typecheck → build → 部署到 gh-pages
6. GitHub webhook 通知 GreasyFork → 自动同步更新

### GreasyFork 同步配置

每个发布到 GreasyFork 的脚本需要在 GreasyFork 后台设置：

- **Sync URL**：`https://raw.githubusercontent.com/XiaoLinXiaoZhu/JavaScriptTools/gh-pages/{category}/{script-name}.user.js`
- **附加信息 URL**：`https://raw.githubusercontent.com/XiaoLinXiaoZhu/JavaScriptTools/gh-pages/{category}/{script-name}.md`

Webhook 已配置，push 到仓库后 GreasyFork 会即时同步。

## URL 规则

- **GitHub Pages**（用户安装）：`https://xiaolinxiaozhu.github.io/JavaScriptTools/{category}/{script-name}.user.js`
- **Raw GitHub**（GreasyFork 同步）：`https://raw.githubusercontent.com/XiaoLinXiaoZhu/JavaScriptTools/gh-pages/{category}/{script-name}.user.js`
- 构建系统会自动将 GitHub Pages URL 注入为 `@downloadURL` 和 `@updateURL`（无需手写）

## 组件库开发（packages/components）

组件库为油猴脚本提供通用 UI 组件（Toast、ConfigPanel、FloatingPanel 等），基于 Vue 3 构建。

### 目录结构

```
packages/components/
├── src/
│   ├── index.ts            # 导出入口
│   ├── toast/              # Toast 消息组件
│   ├── config-panel/       # 配置面板组件
│   └── floating-panel/     # 可拖拽浮动面板
├── dist/
│   └── index.js            # 构建产物（单文件 bundle）
├── package.json
└── vite.config.ts
```

### 开发流程

```bash
# 1. 进入组件库目录
cd packages/components

# 2. 启动开发服务器（vite 热重载）
bun run dev

# 3. 修改组件源码，浏览器自动刷新

# 4. 构建产物
bun run build
# 输出到 dist/index.js，供脚本构建时通过 @xlxz/components 别名引用

# 5. 类型检查
bun run typecheck
```

### 在脚本中使用组件

构建系统已配置 `@xlxz/components` 别名，脚本中可直接导入：

```ts
import { showToast, createConfigPanel, createFloatingPanel } from '@xlxz/components';

// Toast 消息
showToast('操作成功', { type: 'success', duration: 3000 });

// 配置面板
createConfigPanel({
  title: '设置',
  fields: [
    { key: 'threshold', label: '阈值', type: 'slider', min: 0, max: 100, value: 30 },
  ],
  onSave: (values) => { /* ... */ },
});
```

构建时 esbuild 会将组件库代码内联打包进脚本，无需用户额外安装依赖。

### 预览应用（apps/preview）

`apps/preview` 提供组件的可视化预览页面。注意当前 preview 的 alias 指向 `dist/`，修改组件源码后需要先执行 `bun run build` 再刷新 preview 页面。

### 样式规范

- 所有组件使用 `.xlxz-root` 作为命名空间前缀，避免与宿主页面样式冲突
- 基础样式定义在 `packages/styles/base.css`，组件样式在 `packages/styles/components/`
- 样式通过 `?raw` 导入为字符串，运行时动态注入 `<style>` 标签
