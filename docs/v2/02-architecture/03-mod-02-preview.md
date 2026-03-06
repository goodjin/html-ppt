# MOD-02-实时预览

## 文档信息
- **项目名称**: Web PPT
- **文档编号**: MOD-02
- **版本**: v1.0
- **对应PRD**: FR-003, US-002

---

## 1. 系统定位

### 在整体架构中的位置

**所属层次**: L3-L5（业务逻辑层 + 展示层）

**架构定位图**:
```
┌─────────────────────────────────────────────────────┐
│                   展示层 (L5)                        │
│           PreviewView | SplitView                  │
└───────────────────────┬─────────────────────────────┘
                        │ ▼ 调用
┌─────────────────────────────────────────────────────┐
│              ★ 实时预览模块 (MOD-02) ★             │
│       RenderService | usePreview composable         │
└───────────────────────┬─────────────────────────────┘
                        │ ▼ 依赖
┌─────────────────────────────────────────────────────┐
│                   基础设施层 (L1)                    │
│            markdown-it | Reveal.js                 │
└─────────────────────────────────────────────────────┘
```

### 核心职责

- **Markdown渲染**: 将Markdown转换为HTML
- **实时预览**: 编辑内容即时渲染
- **分屏预览**: 编辑区+预览区同时显示

---

## 2. 对应PRD

| PRD章节 | 编号 | 内容 |
|---------|-----|------|
| 功能需求 | FR-003 | 实时预览 |
| 用户故事 | US-002 | 实时预览 |
| 验收标准 | AC-002-01 ~ AC-002-03 | 预览验收标准 |

---

## 3. 核心设计

### 3.1 渲染流程

```
Markdown输入
     │
     ▼
┌─────────────┐
│ markdown-it │ 解析Markdown
└─────────────┘
     │
     ▼
┌─────────────┐
│ HTML输出    │
└─────────────┘
     │
     ▼
┌─────────────┐
│ Reveal.js  │ 初始化演示
│ initialize()│
└─────────────┘
     │
     ▼
   幻灯片展示
```

### 3.2 渲染配置

```typescript
interface RenderConfig {
  // Markdown配置
  markdown: {
    html: boolean;           // 允许HTML
    linkify: boolean;        // 自动链接
    typographer: boolean;     // 智能标点
    breaks: boolean;         // 换行符
  };

  // Reveal.js配置
  reveal: {
    transition: string;      // 转场效果
    theme: string;           // 主题
    plugins: string[];       // 插件列表
  };
}
```

---

## 4. 接口定义

### 4.1 渲染服务接口

```typescript
interface IRenderService {
  // 渲染Markdown为HTML
  render(markdown: string): string;

  // 初始化Reveal.js
  initialize(container: HTMLElement): Reveal;

  // 更新幻灯片内容
  sync(content: string): void;

  // 跳转到指定幻灯片
  slide(index: number): void;

  // 全屏模式
  fullscreen(): void;
}
```

### 4.2 预览组合式函数

```typescript
function usePreview() {
  const content = ref('');
  const html = ref('');
  const revealInstance = ref<Reveal | null>(null);
  const isRendering = ref(false);

  // 渲染（带防抖）
  const render = debounce((md: string) => {
    isRendering.value = true;
    html.value = renderService.render(md);
    isRendering.value = false;
  }, 300);

  // 初始化预览
  const initPreview = (container: HTMLElement) => {
    revealInstance.value = renderService.initialize(container);
  };

  return { content, html, revealInstance, render, initPreview };
}
```

---

## 5. 组件设计

### 5.1 SplitView 分屏组件

```vue
<template>
  <div class="split-view" :class="{ 'preview-only': mode === 'preview' }">
    <!-- 编辑区 -->
    <div class="editor-pane" v-show="mode !== 'preview'">
      <MarkdownEditor v-model="content" @change="handleChange" />
    </div>

    <!-- 分割器 -->
    <div class="divider" v-show="mode !== 'preview'" @mousedown="startResize" />

    <!-- 预览区 -->
    <div class="preview-pane">
      <div ref="previewContainer" class="reveal-container" />
    </div>
  </div>
</template>
```

---

## 6. 边界条件

### BOUND-004: Markdown语法错误

| 条件 | 处理方式 |
|-----|---------|
| 触发条件 | Markdown解析错误 |
| 处理方式 | 显示错误提示，不崩溃，显示原始内容 |
| 错误码 | MARKDOWN_PARSE_ERROR |

### BOUND-005: 渲染超时

| 条件 | 处理方式 |
|-----|---------|
| 触发条件 | 渲染时间超过1秒 |
| 处理方式 | 显示加载指示器，避免阻塞UI |
| 错误码 | RENDER_TIMEOUT |

### BOUND-006: 大文件处理

| 条件 | 处理方式 |
|-----|---------|
| 触发条件 | 内容超过1MB |
| 处理方式 | 自动启用分页渲染，避免卡顿 |
| 错误码 | CONTENT_TOO_LARGE |

---

## 7. 验收标准

| 标准 | 要求 | 验证方法 |
|-----|------|---------|
| AC-002-01 | 编辑Markdown内容后1秒内完成渲染 | 性能测试 |
| AC-002-02 | 支持分屏预览模式 | UI测试 |
| AC-002-03 | 支持全屏预览模式 | 功能测试 |

---

## 8. 覆盖映射

| PRD类型 | PRD编号 | 架构元素 | 覆盖状态 |
|---------|---------|---------|---------|
| 功能需求 | FR-003 | RenderService | ✅ |
| 用户故事 | US-002 | SplitView + PreviewView | ✅ |
| 验收标准 | AC-002-01~03 | BOUND-004~006 | ✅ |

---

## 变更历史

| 版本 | 日期 | 变更内容 |
|-----|------|---------|
| 1.0 | 2026-03-06 | 初始版本 |
