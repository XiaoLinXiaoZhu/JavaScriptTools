# 屏蔽B站营销视频和推广视频

感谢 sghavcsf321 的屏蔽B站营销视频脚本，本工具参考了其识别方式，但优化了刷新逻辑，加快了识别速度。

## 使用方式

安装即可，会自动进行筛选。筛选原理是根据视频卡片的信息以及粉丝数来过滤的——一般来说，营销账号的粉丝数量不会太多，默认阈值为 2000。

支持通过 Tampermonkey 菜单自定义屏蔽规则，也可以在「不感兴趣」面板中直接永久屏蔽指定 UP 主。

## 安装

[从 GreasyFork 安装](https://greasyfork.org/scripts/497929) | [从 GitHub Pages 安装](https://xiaolinxiaozhu.github.io/JavaScriptTools/bilibili/bilibili-block.user.js)

## 更新日志

### v3.0.2

- 修复移除卡片后残留空 `div.feed-card` 的问题：卡片移除后若外层容器已经为空，直接隐藏该容器
- 容器隐藏后一旦重新装入卡片，自动复位显示，不会连带隐藏新卡片
- 补充 `.feed-card:empty` 兜底样式，覆盖脚本以外的清空路径
- 保留容器节点，维持 B 站 `:nth-of-type` 布局规则的序号

### v3.0

- 支持通过 Tampermonkey 菜单配置屏蔽规则
- 在「不感兴趣」面板注入「永久屏蔽此UP主」选项

### v2.8

- 添加屏蔽特定作者 UID 的功能，优化卡片移除逻辑

### v2.0

- 修复了重复调用的 bug
