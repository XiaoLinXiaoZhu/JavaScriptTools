# DeepSeek Chat Export

导出 DeepSeek 聊天记录为 Markdown 或 JSON。自动滚动收集完整对话历史（含深度思考内容），实时数字滚动看板展示收集进度。

## 功能

- **自动滚动收集**：分两阶段（回顶加载历史 → 逐步下滚），确保虚拟列表全部消息被渲染
- **双格式导出**：Markdown（深度思考折叠在 `<details>` 中）和 JSON
- **实时看板**：浮动面板实时展示滚动进度和已收集消息数（number-flow 数字动画）
- **零依赖适配**：通过 `ds-*` 稳定类名 + `data-virtual-list-item-key` 定位消息，不依赖随机 hash

## 使用

1. 在 DeepSeek 对话页面（`chat.deepseek.com`），右下角会自动出现浮动面板
2. 点击「导出 Markdown」或「导出 JSON」
3. 脚本自动滚动收集全部消息，看板实时更新进度
4. 收集完成后自动触发下载

{{changelog}}
