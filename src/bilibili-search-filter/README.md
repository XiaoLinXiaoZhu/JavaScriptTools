# Bilibili 视频质量筛选器

通过播放量和 UP 主粉丝量加权筛选 Bilibili 搜索结果中的低质量视频，并使用毛玻璃遮罩隐藏。

## 功能

- 对搜索结果中的视频卡片进行评分（播放量 + 粉丝数对数归一化）
- 低于阈值的视频以毛玻璃遮罩覆盖，鼠标悬停可查看
- 集成到搜索页面的筛选条件栏，可调节播放权重、粉丝权重和阈值
- 粉丝数 API 结果缓存 24 小时，减少请求

## 安装

[从 GitHub Pages 安装](https://xiaolinxiaozhu.github.io/JavaScriptTools/bilibili/bilibili-search-filter.user.js)

## 更新日志

{{changelog}}
