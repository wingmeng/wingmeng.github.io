---
title: Vue 3 组合式 API 的最佳实践
date: 2026-02-28
tags:
  - Vue
  - TypeScript
excerpt: 从实际项目出发，总结 Vue 3 Composition API 在复杂业务场景中的设计模式，包括 composable 抽取策略、响应式陷阱规避、TypeScript 类型增强等实战经验。
---

从实际项目出发，总结 Vue 3 Composition API 在复杂业务场景中的设计模式，包括 composable 抽取策略、响应式陷阱规避、TypeScript 类型增强等实战经验。

## Composable 抽取原则

好的 composable 应该满足：

1. **单一职责** — 一个 composable 只做一件事
2. **无副作用** — 不依赖组件实例
3. **可测试** — 纯函数风格，方便单元测试

## 响应式陷阱

### 丢失响应式

```js
// 错误：解构后丢失响应式
const { count, increment } = useCounter()

// 正确：使用 toRefs
const { count, increment } = toRefs(useCounter())
```

> 这是一篇示例博客文章，正式内容待补充。
