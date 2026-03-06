# 前端开发计划 - 实时预览

## 文档信息

- **模块编号**: MOD-02
- **模块名称**: 实时预览
- **对应架构**: docs/v2/02-architecture/03-mod-02-preview.md
- **优先级**: P0
- **预估工时**: 1.5天

---

## 1. 模块概述

### 1.1 模块职责

实时预览模块负责：
- Markdown渲染为HTML
- 编辑内容即时渲染
- 分屏预览（编辑区+预览区）
- 全屏预览模式

### 1.2 组件清单

| 组件 | 功能 |
|-----|------|
| SplitView | 分屏布局容器 |
| MarkdownEditor | Markdown编辑器 |
| SlidePreview | 幻灯片预览 |

---

## 2. 技术设计

### 2.1 技术栈

| 类型 | 技术 | 版本 |
|-----|------|------|
| Markdown解析 | markdown-it | 14.0+ |
| 代码高亮 | Shiki | 1.0+ |
| 编辑器 | CodeMirror 6 | - |
| 演示框架 | Reveal.js | 4.6+ |

### 2.2 目录结构

```
src/
├── components/
│   └── preview/
│       ├── SplitView.vue
│       ├── MarkdownEditor.vue
│       └── SlidePreview.vue
├── composables/
│   └── usePreview.ts
├── services/
│   └── RenderService.ts
└── utils/
    └── markdown.ts
```

---

## 3. 开发任务拆分

| 任务编号 | 任务名称 | 涉及文件 | 代码行数 | 依赖 |
|---------|---------|---------|---------|------|
| T-01 | Markdown解析服务 | 2 | ~100 | - |
| T-02 | 预览组合式函数 | 2 | ~80 | T-01 |
| T-03 | 编辑器组件 | 3 | ~150 | T-02 |
| T-04 | 预览组件 | 3 | ~120 | T-02 |
| T-05 | 分屏布局 | 2 | ~80 | T-03,T-04 |
| T-06 | 单元测试 | 3 | ~150 | T-01~05 |

---

## 4. 详细任务定义

### T-01: Markdown解析服务

**任务概述**: 实现Markdown到HTML的转换服务

**输出**:
- `src/utils/markdown.ts`
- `src/services/RenderService.ts`

**实现要求**:

```typescript
// src/utils/markdown.ts

import MarkdownIt from 'markdown-it';
import { getHighlighter } from 'shiki';

let highlighter: any = null;

export async function initHighlighter() {
  highlighter = await getHighlighter({
    themes: ['github-dark', 'github-light'],
    langs: ['javascript', 'typescript', 'python', 'java', 'go', 'rust', 'html', 'css', 'json', 'bash']
  });
}

export function highlightCode(code: string, lang: string): string {
  if (!highlighter) return code;
  try {
    return highlighter.codeToHtml(code, { lang, theme: 'github-dark' });
  } catch {
    return code;
  }
}

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
  highlight: highlightCode
});

export function renderMarkdown(content: string): string {
  return md.render(content);
}
```

**验收标准**:
- [ ] Markdown解析正确
- [ ] 代码高亮正常
- [ ] 支持GFM扩展

**预估工时**: 0.25天

---

### T-02: 预览组合式函数

**任务概述**: 实现预览相关的响应式逻辑

**输出**:
- `src/composables/usePreview.ts`

**实现要求**:

```typescript
// src/composables/usePreview.ts

import { ref, watch, onMounted } from 'vue';
import { renderMarkdown } from '@/utils/markdown';
import type Reveal from 'reveal.js';

export function usePreview() {
  const content = ref('');
  const html = ref('');
  const isRendering = ref(false);
  const revealInstance = ref<Reveal | null>(null);
  const error = ref<string | null>(null);

  // 防抖渲染
  let renderTimer: ReturnType<typeof setTimeout> | null = null;

  function render(markdown: string) {
    if (renderTimer) clearTimeout(renderTimer);

    renderTimer = setTimeout(() => {
      isRendering.value = true;
      error.value = null;

      try {
        html.value = renderMarkdown(markdown);
      } catch (e: any) {
        error.value = e.message;
        html.value = markdown; // 回退到原始内容
      } finally {
        isRendering.value = false;
      }
    }, 300);
  }

  // 监听内容变化
  watch(content, (newContent) => {
    render(newContent);
  });

  function initReveal(container: HTMLElement) {
    revealInstance.value = new Reveal(container, {
      hash: true,
      slideNumber: 'c/t',
      progress: true,
      center: true,
      transition: 'slide'
    });
    revealInstance.value.initialize();
  }

  function sync() {
    if (revealInstance.value) {
      revealInstance.value.sync();
    }
  }

  function slide(index: number) {
    if (revealInstance.value) {
      revealInstance.value.slide(index);
    }
  }

  return {
    content,
    html,
    isRendering,
    error,
    revealInstance,
    render,
    initReveal,
    sync,
    slide
  };
}
```

**验收标准**:
- [ ] 响应式更新正常
- [ ] 防抖功能正常
- [ ] Reveal.js初始化正确

**预估工时**: 0.25天

**依赖**: T-01

---

### T-03: 编辑器组件

**任务概述**: 实现Markdown编辑器组件

**输出**:
- `src/components/preview/MarkdownEditor.vue`

**实现要求**:
- 使用CodeMirror 6作为编辑器
- 支持语法高亮
- 支持行号显示
- 支持快捷键

**验收标准**:
- [ ] 编辑器加载正常
- [ ] 内容同步正确

**预估工时**: 0.5天

**依赖**: T-02

---

### T-04: 预览组件

**任务概述**: 实现幻灯片预览组件

**输出**:
- `src/components/preview/SlidePreview.vue`

**实现要求**:
- 接收HTML内容并渲染
- 使用Reveal.js展示
- 支持全屏模式

**验收标准**:
- [ ] 幻灯片渲染正确
- [ ] 导航功能正常

**预估工时**: 0.25天

**依赖**: T-02

---

### T-05: 分屏布局

**任务概述**: 实现分屏布局容器

**输出**:
- `src/components/preview/SplitView.vue`

**实现要求**:
- 左右/上下分屏
- 可调节分割比例
- 支持预览模式（隐藏编辑区）

**验收标准**:
- [ ] 分屏布局正常
- [ ] 分隔条拖动正常

**预估工时**: 0.25天

**依赖**: T-03, T-04

---

### T-06: 单元测试

**任务概述**: 编写测试用例

**输出**:
- `src/utils/__tests__/markdown.test.ts`
- `src/composables/__tests__/usePreview.test.ts`

**预估工时**: 0.25天

**依赖**: T-01~T-05

---

## 5. 验收清单

- [ ] Markdown渲染正确
- [ ] 实时预览延迟<1秒
- [ ] 分屏布局正常
- [ ] 全屏模式正常

---

## 6. 覆盖映射

| 架构元素 | 任务 | 覆盖状态 |
|---------|------|---------|
| IRenderService | T-01 | ✅ |
| usePreview | T-02 | ✅ |
| BOUND-004~006 | T-01,T-02 | ✅ |

---

## 变更历史

| 版本 | 日期 | 变更内容 |
|-----|------|---------|
| 1.0 | 2026-03-06 | 初始版本 |
