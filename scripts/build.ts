// scripts/build.ts
///@ts-ignore
import { promises as fs } from "fs";
///@ts-ignore
import { join, dirname } from "path";

///@ts-ignore
const transpiler = new Bun.Transpiler({
  loader: "ts",
  target: "browser",
  minifyWhitespace: false,
  inline: true,
});

import { buildList as files, type buildAction } from "./build_list";

async function compileFile({ input, output }: buildAction) {
  try {
    const code = await fs.readFile(input, "utf-8");

    // 提取 UserScript 注释块（开头部分）
    const userScriptHeader = code.split("// ==/UserScript==")[0] + "// ==/UserScript==\n\n";

    // 转译并压缩代码
    const jsCode = transpiler.transformSync(code);

    // 写入文件时，先写头部，再写压缩后的代码
    const finalCode = userScriptHeader + jsCode;

    await fs.mkdir(dirname(output), { recursive: true });
    await fs.writeFile(output, finalCode);
    console.log(`✅ ${input} -> ${output}`);
  } catch (e) {
    console.error(`❌ 编译失败: ${input}`);
    throw e;
  }
}

async function build() {
  // 确保 dist 目录存在
  try {
    await fs.mkdir("dist", { recursive: true });
    console.log("创建 dist 目录成功");
  } catch (e) {
    console.error("创建 dist 目录失败:", e);
  }
  // clear the dist directory
  try {
    await fs.rm("dist", { recursive: true, force: true });
    console.log("清理 dist 目录成功");
  } catch (e) {
    console.error("清理 dist 目录失败:", e);
  }
  for (const file of files) {
    await compileFile(file);
  }
}

build();