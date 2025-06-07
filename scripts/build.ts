// scripts/build.ts
///@ts-ignore
import { promises as fs } from "fs";
///@ts-ignore
import { join, dirname } from "path";

///@ts-ignore
const transpiler = new Bun.Transpiler({
  loader: 'ts',
});
import { buildList as files,type buildAction } from "./build_list";

async function compileFile({ input, output }: buildAction) {
  try {
    const code = await fs.readFile(input, "utf-8");
    const jsCode = transpiler.transformSync(code, {
      loader: "ts",
    });
    await fs.mkdir(dirname(output), { recursive: true });
    await fs.writeFile(output, jsCode);
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