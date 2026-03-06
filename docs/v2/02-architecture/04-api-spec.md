# 接口规约文档

## 文档信息
- **项目名称**: Web PPT
- **版本**: v1.0
- **对应PRD**: docs/v2/01-prd.md

---

## 1. 前端接口说明

由于本项目是前端应用，主要通过以下方式提供服务：

1. **组件Props/Events**: 组件间通信
2. **Composables**: 组合式函数暴露的响应式API
3. **Services**: 业务服务类的方法
4. **Pinia Stores**: 状态管理的actions

---

## 2. Composables API

### 2.1 useTemplate

```typescript
function useTemplate() {
  // State
  const templates = ref<PresentationTemplate[]>([]);
  const currentTemplate = ref<PresentationTemplate | null>(null);
  const isLoading = ref(false);

  // Actions
  const loadTemplates: () => Promise<void>;
  const createTemplate: (dto: CreateTemplateDto) => Promise<PresentationTemplate>;
  const updateTemplate: (id: string, dto: UpdateTemplateDto) => Promise<PresentationTemplate>;
  const deleteTemplate: (id: string) => Promise<void>;
  const duplicateTemplate: (id: string) => Promise<PresentationTemplate>;

  // Getters
  const templatesByCategory: (category: TemplateCategory) => PresentationTemplate[];

  return {
    templates,
    currentTemplate,
    isLoading,
    loadTemplates,
    createTemplate,
    updateTemplate,
    deleteTemplate,
    duplicateTemplate,
    templatesByCategory
  };
}
```

### 2.2 usePreview

```typescript
function usePreview() {
  // State
  const content = ref('');
  const html = ref('');
  const isRendering = ref(false);

  // Actions
  const render: (markdown: string) => void;
  const initReveal: (container: HTMLElement) => void;
  const sync: () => void;

  return { content, html, isRendering, render, initReveal, sync };
}
```

### 2.3 useTheme

```typescript
function useTheme() {
  // State
  const themes = ref<Theme[]>([]);
  const currentTheme = ref<Theme | null>(null);

  // Actions
  const setTheme: (themeId: string) => void;
  const customizeTheme: (styles: Partial<ThemeStyles>) => void;

  return { themes, currentTheme, setTheme, customizeTheme };
}
```

### 2.4 useExport

```typescript
function useExport() {
  // State
  const isExporting = ref(false);
  const progress = ref(0);

  // Actions
  const exportPdf: (options: ExportOptions) => Promise<void>;
  const exportHtml: (options: ExportOptions) => Promise<void>;
  const exportPng: (options: ExportOptions) => Promise<void>;

  return { isExporting, progress, exportPdf, exportHtml, exportPng };
}
```

---

## 3. 事件定义

### 3.1 全局事件

| 事件名 | 参数 | 说明 |
|-------|------|------|
| template:created | template: PresentationTemplate | 模板创建事件 |
| template:updated | template: PresentationTemplate | 模板更新事件 |
| template:deleted | id: string | 模板删除事件 |
| theme:changed | themeId: string | 主题切换事件 |
| export:progress | progress: number | 导出进度事件 |

---

## 4. 类型定义

### 4.1 核心类型

```typescript
// 模板
interface PresentationTemplate {
  id: string;
  name: string;
  description?: string;
  category: TemplateCategory;
  content: string;
  thumbnail?: string;
  createdAt: string;
  updatedAt: string;
}

enum TemplateCategory {
  TECH = 'tech',
  BUSINESS = 'business',
  EDUCATION = 'education',
  GENERAL = 'general'
}

// 主题
interface Theme {
  id: string;
  name: string;
  type: 'preset' | 'custom';
  styles: ThemeStyles;
}

interface ThemeStyles {
  colors: ThemeColors;
  fonts: ThemeFonts;
}

interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  accent: string;
}

// 素材
interface Asset {
  id: string;
  name: string;
  type: AssetType;
  size: number;
  url: string;
  thumbnail?: string;
}

enum AssetType {
  IMAGE = 'image',
  FONT = 'font'
}

// 导出
interface ExportOptions {
  format: 'pdf' | 'html' | 'png';
  range: 'all' | 'current';
  quality?: number;
}
```

---

## 变更历史

| 版本 | 日期 | 变更内容 |
|-----|------|---------|
| 1.0 | 2026-03-06 | 初始版本 |
