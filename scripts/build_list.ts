export type buildAction = {
    input : string;
    output : string;
}

export const buildList: buildAction[] = [
    { input: "AutoClick.ts", output: "dist/AutoClick.js" }
    // 添加更多需要编译的文件
];