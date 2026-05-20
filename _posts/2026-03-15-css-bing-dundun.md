---
title: CSS 极客 — 用纯 CSS 画一只冰墩墩
date: 2026-03-15
tags:
  - CSS
  - 可视化
excerpt: 深入剖析纯 CSS 绘制冰墩墩的完整过程，包括不规则椭圆身体的 border-radius 技巧、多层冰丝带面部渐变方案、眼部细节的伪元素实现等核心难点。
---

深入剖析纯 CSS 绘制冰墩墩的完整过程，包括不规则椭圆身体的 border-radius 技巧、多层冰丝带面部渐变方案、眼部细节的伪元素实现等核心难点。

## border-radius 完全体

大多数人只知道 `border-radius: 50%` 画圆，但 `border-radius` 最多支持 8 个值：

```css
.bing-dundun-body {
  border-radius: 45% 45% 42% 42% / 50% 50% 38% 38%;
}
```

这种方式可以精确控制四个角的水平和垂直半径，实现不规则椭圆。

## 冰丝带效果

使用多层 `linear-gradient` 叠加，配合 `background-blend-mode` 混合。

> 这是一篇示例博客文章，正式内容待补充。
