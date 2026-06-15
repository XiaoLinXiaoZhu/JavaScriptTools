# JavaScriptTools

个人脚本集合，主要是油猴脚本（UserScript），也包含一些 Obsidian 插件和 Node.js 工具。

## 脚本列表

<!-- SCRIPT_TABLE_START -->
### 油猴脚本

| 脚本 | 说明 | 安装 |
|------|------|------|
| [屏蔽B站营销视频和推广视频](src/bilibili-block/) | 屏蔽部分B站（bilibili）主页推荐的视频卡片，屏蔽up主粉丝少于一定数量的，屏蔽直播与右侧推广，屏蔽带广告标签的 | [GreasyFork](https://greasyfork.org/scripts/497929) \| [GitHub](https://xiaolinxiaozhu.github.io/JavaScriptTools/bilibili/bilibili-block.user.js) |
| [动画疯自动同意年龄确认，移除广告跳转，广告静音，自动点击跳过广告](src/bahamut-auto/) | 能够动画疯自动同意年龄确认，移除广告跳转，广告静音，自动点击跳过广告……安装即可，自动执行 | [GitHub](https://xiaolinxiaozhu.github.io/JavaScriptTools/entertainment/bahamut-auto.user.js) |
| [评价表自动选择工具](src/evaluation-auto/) | 自动选择评分项，支持单个填充和全自动批量评价 | [GitHub](https://xiaolinxiaozhu.github.io/JavaScriptTools/campus/evaluation-auto.user.js) |
| [搜索引擎快捷跳转](src/search-helper/) | 在百度、Google、搜狗、360、Bing 等搜索引擎页面添加浮动按钮，一键将当前搜索词切换到其他搜索引擎。 | [GitHub](https://xiaolinxiaozhu.github.io/JavaScriptTools/search/search-helper.user.js) |
| [页面自动展开](src/auto-expand/) | 自动展开 CSDN 文章、百度文库、思创等网站被折叠的页面内容，移除展开提示框。 | [GitHub](https://xiaolinxiaozhu.github.io/JavaScriptTools/tools/auto-expand.user.js) |
| [知乎问题时间显示](src/zhihu-helper/) | 在知乎问题下的每个回答中显示创建时间和最后编辑时间。 | [GitHub](https://xiaolinxiaozhu.github.io/JavaScriptTools/social/zhihu-helper.user.js) |
| [中间页自动跳转](src/link-jump/) | 自动跳过 CSDN、知乎、豆瓣、微博、简书、Gitee、掘金等 30+ 网站的中间确认页，直接跳转到目标链接。 | [GitHub](https://xiaolinxiaozhu.github.io/JavaScriptTools/navigation/link-jump.user.js) |
| [AutoTool](src/asmr-download/) | XLXZ'a AutoTool | [GitHub](https://xiaolinxiaozhu.github.io/JavaScriptTools/tools/asmr-download.user.js) |
| [AutoTool_Download](src/autoclick/) | XLXZ's 自动下载 小工具，本质上是匹配特殊内容并且模拟点击 | [GitHub](https://xiaolinxiaozhu.github.io/JavaScriptTools/tools/autoclick.user.js) |
| [Better Iwara](src/better-iwara/) | An alternate style for Iwara, made by XLXZ | [GitHub](https://xiaolinxiaozhu.github.io/JavaScriptTools/entertainment/better-iwara.user.js) |
| [Bilibili 视频质量筛选器](src/bilibili-search-filter/) | 通过播放量和UP主粉丝量加权筛选低质量视频，并使用毛玻璃遮罩 | [GitHub](https://xiaolinxiaozhu.github.io/JavaScriptTools/bilibili/bilibili-search-filter.user.js) |
| [CSDN 页面净化](src/csdn-clean/) | 清理 CSDN 页面广告、移除复制后缀、展开被折叠的文章、优化评论区显示。 | [GitHub](https://xiaolinxiaozhu.github.io/JavaScriptTools/tools/csdn-clean.user.js) |
| [Danbooru Tag Copy](src/danbooru-tag-copy/) | 一键复制 Danbooru 标签，按 meta / rating / character+copyright / @artist / general 分类输出 | [GitHub](https://xiaolinxiaozhu.github.io/JavaScriptTools/tools/danbooru-tag-copy.user.js) |
| [DeepSeek Chat Export](src/deepseek-export/) | 导出 DeepSeek 聊天记录为 Markdown，自动滚动收集完整对话（含深度思考） | [GitHub](https://xiaolinxiaozhu.github.io/JavaScriptTools/tools/deepseek-export.user.js) |
| [Fufugal 评分过滤](src/fufugal-rating-filter/) | 为 fufugal.com（我的Galgame资源发布站）按评分阈值过滤卡片，可在浮动面板中开关与调节阈值 | [GitHub](https://xiaolinxiaozhu.github.io/JavaScriptTools/tools/fufugal-rating-filter.user.js) |
| [HUST华中科技大学军理线上作业自动填充助手](src/hust-autofill/) | HUST military science online homework autofill assistant | [GitHub](https://xiaolinxiaozhu.github.io/JavaScriptTools/campus/hust-autofill.user.js) |

### 其他工具

| 项目 | 说明 | 类型 |
|------|------|------|
| [cardview](src/obsidian-cardview/) | - | Plain JS |
| [hexo-image-redirect](src/hexo-image-redirect/) | - | Node.js 模块 |
<!-- SCRIPT_TABLE_END -->

## 安装方式

1. 安装浏览器扩展 [Tampermonkey](https://www.tampermonkey.net/)
2. 点击上方表格中的安装链接，Tampermonkey 会自动弹出安装确认
3. 脚本会通过 `@updateURL` 自动检查更新

部分脚本同时发布在 [GreasyFork](https://greasyfork.org/zh-CN/users/1211126-xiaolinxiaozhu) 上。

## 开发

参见 [CONTRIBUTING.md](CONTRIBUTING.md)。

## 许可证

MIT
