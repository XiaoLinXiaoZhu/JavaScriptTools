// scripts/build.ts
///@ts-ignore
import { promises as fs } from "fs";
///@ts-ignore
import { join, dirname } from "path";

///@ts-ignore
const transpiler = new Bun.Transpiler({
  loader: "ts",
});

import { buildList as files, type buildAction } from "./build_list";

async function compileFile({ input, output }: buildAction) {
  try {
    const code = await fs.readFile(input, "utf-8");

    // 提取 UserScript 注释块（开头部分）
    const userScriptHeader = code.split("// ==/UserScript==")[0] + "// ==/UserScript==\n\n";

    // 转译并压缩代码
    const jsCode = transpiler.transformSync(code, {
      loader: "ts",
      minify: true,           // 启用压缩
      preserveComments: true, // 保留所有注释（包括 UserScript 头部）
    });

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
  for (const file of files) {
    await compileFile(file);
  }
}

build();