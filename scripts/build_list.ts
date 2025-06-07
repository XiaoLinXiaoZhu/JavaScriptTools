export type buildAction = {
    input : string;
    output : string;
}

export const buildList: buildAction[] = [
    { input: "autoclick.ts", output: "dist/autoclick.js" }
    // 添加更多需要编译的文件
];