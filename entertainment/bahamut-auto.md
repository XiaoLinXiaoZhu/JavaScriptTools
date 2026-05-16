# 动画疯自动脚本

动画疯自动同意年龄确认、移除广告跳转、广告静音、自动点击跳过广告。

借鉴了 [luosansui 的脚本](https://greasyfork.org/zh-CN/scripts/484045) 的部分逻辑，但原脚本部分功能已失效，且切换剧集时不会重新加载。本脚本加入了监控机制，能够检测剧集变化并重新执行，避免频繁刷新。

可以按 F12 查看控制台 debug 信息，跟踪运行状态。

## 安装

[从 GreasyFork 安装](https://greasyfork.org/scripts/501441) | [从 GitHub Pages 安装](https://xiaolinxiaozhu.github.io/JavaScriptTools/entertainment/bahamut-auto.user.js)

## 更新日志

### v2.0

- 重写了大部分方法，代码更简洁易读
- 修复了单一剧集时无法监测到的问题
- 增加可配置变量：是否移除广告跳转链接、是否在广告期间静音
