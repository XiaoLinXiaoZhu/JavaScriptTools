# JavaScriptTools

个人脚本集合，主要是油猴脚本（UserScript），也包含一些 Obsidian 插件和 Node.js 工具。

## 脚本列表

### 油猴脚本

| 脚本 | 说明 | 安装 |
|------|------|------|
| [屏蔽B站营销视频](src/bilibili-block/) | 屏蔽 B 站主页推荐的营销/推广视频卡片 | [GreasyFork](https://greasyfork.org/scripts/467384) \| [GitHub](https://xiaolinxiaozhu.github.io/JavaScriptTools/bilibili/bilibili-block.user.js) |
| [B站搜索过滤](src/bilibili-search-filter/) | 通过播放量和粉丝数加权筛选低质量视频，毛玻璃遮罩 | [GitHub](https://xiaolinxiaozhu.github.io/JavaScriptTools/bilibili/bilibili-search-filter.user.js) |
| [ASMR 自动下载](src/asmr-download/) | 自动下载 ASMR 网站音频 | [GitHub](https://xiaolinxiaozhu.github.io/JavaScriptTools/tools/asmr-download.user.js) |
| [AutoTool Download](src/autoclick/) | 匹配特殊内容并模拟点击下载 | [GitHub](https://xiaolinxiaozhu.github.io/JavaScriptTools/tools/autoclick.user.js) |
| [动画疯自动脚本](src/bahamut-auto/) | 自动跳过广告、同意年龄确认 | [GitHub](https://xiaolinxiaozhu.github.io/JavaScriptTools/entertainment/bahamut-auto.user.js) |
| [Better Iwara](src/better-iwara/) | Iwara 样式优化 | [GitHub](https://xiaolinxiaozhu.github.io/JavaScriptTools/entertainment/better-iwara.user.js) |
| [评价表自动选择](src/evaluation-auto/) | 自动选择教学评价 | [GitHub](https://xiaolinxiaozhu.github.io/JavaScriptTools/campus/evaluation-auto.user.js) |
| [HUST 军理自动填充](src/hust-autofill/) | 华科军理线上作业自动填充 | [GitHub](https://xiaolinxiaozhu.github.io/JavaScriptTools/campus/hust-autofill.user.js) |

### 其他工具

| 项目 | 说明 | 类型 |
|------|------|------|
| [Obsidian CardView](src/obsidian-cardview/) | Obsidian 卡片视图样式 | Plain JS |
| [Hexo Image Redirect](src/hexo-image-redirect/) | Hexo 博客图片重定向 | Node.js 模块 |

## 安装方式

1. 安装浏览器扩展 [Tampermonkey](https://www.tampermonkey.net/)
2. 点击上方表格中的安装链接，Tampermonkey 会自动弹出安装确认
3. 脚本会通过 `@updateURL` 自动检查更新

部分脚本同时发布在 [GreasyFork](https://greasyfork.org/zh-CN/users/1211126-xiaolinxiaozhu) 上。

## 开发

参见 [CONTRIBUTING.md](CONTRIBUTING.md)。

## 许可证

MIT
