# 前端开发计划 - 模板管理

## 文档信息

- **模块编号**: MOD-01
- **模块名称**: 模板管理
- **对应架构**: docs/v2/02-architecture/03-mod-01-template.md
- **优先级**: P0
- **预估工时**: 2天

---

## 1. 模块概述

### 1.1 模块职责

模板管理是Web PPT的核心模块，负责：
- 模板CRUD操作（创建、读取、更新、删除）
- 模板分类管理（技术/商务/教育/通用）
- 模板复制功能

### 1.2 页面清单

| 页面 | 路由 | 功能 |
|-----|------|------|
| 模板列表 | /templates | 展示所有模板，支持分类筛选 |
| 模板编辑 | /templates/:id/edit | 编辑模板内容 |
| 模板新建 | /templates/new | 创建新模板 |

### 1.3 组件清单

| 组件 | 功能 |
|-----|------|
| TemplateList | 模板列表展示 |
| TemplateCard | 单个模板卡片 |
| TemplateEditor | 模板内容编辑器 |
| CategoryFilter | 分类筛选器 |

---

## 2. 技术设计

### 2.1 技术栈

| 类型 | 技术 | 版本 |
|-----|------|------|
| 框架 | Vue 3 | 3.4+ |
| 状态管理 | Pinia | 2.0+ |
| 编辑器 | CodeMirror/Monaco | - |
| 构建工具 | Vite | 5.0+ |

### 2.2 目录结构

```
src/
├── components/
│   └── template/
│       ├── TemplateList.vue
│       ├── TemplateCard.vue
│       ├── TemplateEditor.vue
│       └── CategoryFilter.vue
├── composables/
│   └── useTemplate.ts
├── services/
│   └── TemplateService.ts
├── stores/
│   └── template.ts
├── types/
│   └── template.ts
└── views/
    ├── TemplateListView.vue
    └── TemplateEditView.vue
```

---

## 3. 接口调用

| 任务 | 接口 | 场景 |
|-----|------|------|
| 获取模板列表 | useTemplate.getTemplates() | 列表页加载 |
| 获取分类模板 | useTemplate.getTemplatesByCategory() | 分类筛选 |
| 创建模板 | useTemplate.createTemplate() | 新建保存 |
| 更新模板 | useTemplate.updateTemplate() | 编辑保存 |
| 删除模板 | useTemplate.deleteTemplate() | 删除操作 |
| 复制模板 | useTemplate.duplicateTemplate() | 复制操作 |

---

## 4. 开发任务拆分

### 任务约束
- **代码变更**: ≤ 200行/任务
- **涉及文件**: ≤ 5个/任务

### 任务清单

| 任务编号 | 任务名称 | 涉及文件 | 代码行数 | 依赖 |
|---------|---------|---------|---------|------|
| T-01 | 类型定义 | 1 | ~50 | - |
| T-02 | 模板服务 | 2 | ~100 | T-01 |
| T-03 | 状态管理 | 2 | ~80 | T-02 |
| T-04 | 模板列表组件 | 3 | ~150 | T-03 |
| T-05 | 模板编辑组件 | 3 | ~180 | T-02 |
| T-06 | 页面路由 | 2 | ~50 | T-04,T-05 |
| T-07 | 单元测试 | 3 | ~150 | T-01~06 |
| T-08 | 集成测试 | 2 | ~100 | T-01~07 |

---

## 5. 详细任务定义

### T-01: 类型定义

**任务概述**: 定义模板相关TypeScript类型

**对应架构**:
- 数据结构规约: PresentationTemplate, TemplateCategory

**输出**:
- `src/types/template.ts`

**实现要求**:

```typescript
// src/types/template.ts

export enum TemplateCategory {
  TECH = 'tech',
  BUSINESS = 'business',
  EDUCATION = 'education',
  GENERAL = 'general'
}

export interface PresentationTemplate {
  id: string;
  name: string;
  description?: string;
  category: TemplateCategory;
  content: string;
  thumbnail?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTemplateDto {
  name: string;
  description?: string;
  category: TemplateCategory;
  content: string;
}

export interface UpdateTemplateDto {
  name?: string;
  description?: string;
  category?: TemplateCategory;
  content?: string;
}
```

**验收标准**:
- [ ] 类型定义与架构数据结构规约一致
- [ ] 包含所有必需字段

**预估工时**: 0.25天

---

### T-02: 模板服务

**任务概述**: 实现模板CRUD服务

**对应架构**:
- 接口规约: ITemplateService

**输出**:
- `src/services/TemplateService.ts`

**实现要求**:

```typescript
// src/services/TemplateService.ts

import type { PresentationTemplate, CreateTemplateDto, UpdateTemplateDto, TemplateCategory } from '@/types/template';

const STORAGE_KEY = 'web-ppt-templates';

export class TemplateService {
  private getTemplates(): PresentationTemplate[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  private saveTemplates(templates: PresentationTemplate[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
  }

  async getTemplates(): Promise<PresentationTemplate[]> {
    return this.getTemplates();
  }

  async getTemplatesByCategory(category: TemplateCategory): Promise<PresentationTemplate[]> {
    const templates = this.getTemplates();
    return templates.filter(t => t.category === category);
  }

  async getTemplate(id: string): Promise<PresentationTemplate | null> {
    const templates = this.getTemplates();
    return templates.find(t => t.id === id) || null;
  }

  async createTemplate(dto: CreateTemplateDto): Promise<PresentationTemplate> {
    const template: PresentationTemplate = {
      id: crypto.randomUUID(),
      ...dto,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const templates = this.getTemplates();
    templates.push(template);
    this.saveTemplates(templates);
    return template;
  }

  async updateTemplate(id: string, dto: UpdateTemplateDto): Promise<PresentationTemplate> {
    const templates = this.getTemplates();
    const index = templates.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Template not found');

    templates[index] = {
      ...templates[index],
      ...dto,
      updatedAt: new Date().toISOString()
    };
    this.saveTemplates(templates);
    return templates[index];
  }

  async deleteTemplate(id: string): Promise<void> {
    const templates = this.getTemplates().filter(t => t.id !== id);
    this.saveTemplates(templates);
  }

  async duplicateTemplate(id: string, newName: string): Promise<PresentationTemplate> {
    const template = await this.getTemplate(id);
    if (!template) throw new Error('Template not found');

    return this.createTemplate({
      name: newName,
      description: template.description,
      category: template.category,
      content: template.content
    });
  }
}

export const templateService = new TemplateService();
```

**验收标准**:
- [ ] 实现所有CRUD操作
- [ ] 使用localStorage持久化

**预估工时**: 0.25天

**依赖**: T-01

---

### T-03: 状态管理

**任务概述**: 实现Pinia状态管理

**输出**:
- `src/stores/template.ts`

**实现要求**:

```typescript
// src/stores/template.ts

import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { templateService } from '@/services/TemplateService';
import type { PresentationTemplate, CreateTemplateDto, UpdateTemplateDto, TemplateCategory } from '@/types/template';

export const useTemplateStore = defineStore('template', () => {
  const templates = ref<PresentationTemplate[]>([]);
  const currentTemplate = ref<PresentationTemplate | null>(null);
  const isLoading = ref(false);
  const selectedCategory = ref<TemplateCategory | null>(null);

  const filteredTemplates = computed(() => {
    if (!selectedCategory.value) return templates.value;
    return templates.value.filter(t => t.category === selectedCategory.value);
  });

  async function loadTemplates() {
    isLoading.value = true;
    try {
      templates.value = await templateService.getTemplates();
    } finally {
      isLoading.value = false;
    }
  }

  async function createTemplate(dto: CreateTemplateDto) {
    const template = await templateService.createTemplate(dto);
    templates.value.push(template);
    return template;
  }

  async function updateTemplate(id: string, dto: UpdateTemplateDto) {
    const template = await templateService.updateTemplate(id, dto);
    const index = templates.value.findIndex(t => t.id === id);
    if (index !== -1) templates.value[index] = template;
    return template;
  }

  async function deleteTemplate(id: string) {
    await templateService.deleteTemplate(id);
    templates.value = templates.value.filter(t => t.id !== id);
  }

  async function duplicateTemplate(id: string, newName: string) {
    const template = await templateService.duplicateTemplate(id, newName);
    templates.value.push(template);
    return template;
  }

  function setCategory(category: TemplateCategory | null) {
    selectedCategory.value = category;
  }

  return {
    templates,
    currentTemplate,
    isLoading,
    selectedCategory,
    filteredTemplates,
    loadTemplates,
    createTemplate,
    updateTemplate,
    deleteTemplate,
    duplicateTemplate,
    setCategory
  };
});
```

**验收标准**:
- [ ] 状态管理完整
- [ ] 计算属性正确

**预估工时**: 0.25天

**依赖**: T-02

---

### T-04: 模板列表组件

**任务概述**: 实现模板列表展示组件

**输出**:
- `src/components/template/TemplateList.vue`
- `src/components/template/TemplateCard.vue`
- `src/components/template/CategoryFilter.vue`

**实现要求**:
- TemplateList: 列表容器，管理模板网格
- TemplateCard: 单个模板卡片，展示缩略图、名称、操作按钮
- CategoryFilter: 分类筛选标签

**验收标准**:
- [ ] 分类筛选功能正常
- [ ] 卡片展示完整信息
- [ ] 操作按钮功能正常

**预估工时**: 0.5天

**依赖**: T-03

---

### T-05: 模板编辑组件

**任务概述**: 实现模板内容编辑器

**输出**:
- `src/components/template/TemplateEditor.vue`

**实现要求**:
- 元信息编辑：名称、描述、分类
- 内容编辑器：Markdown编辑区
- 预览按钮：实时预览效果

**验收标准**:
- [ ] 元信息编辑保存正常
- [ ] 内容编辑保存正常

**预估工时**: 0.5天

**依赖**: T-02

---

### T-06: 页面路由

**任务概述**: 配置页面路由

**输出**:
- `src/router/index.ts`
- `src/views/TemplateListView.vue`
- `src/views/TemplateEditView.vue`

**路由配置**:
```typescript
{
  path: '/templates',
  name: 'TemplateList',
  component: () => import('@/views/TemplateListView.vue')
},
{
  path: '/templates/new',
  name: 'TemplateNew',
  component: () => import('@/views/TemplateEditView.vue')
},
{
  path: '/templates/:id/edit',
  name: 'TemplateEdit',
  component: () => import('@/views/TemplateEditView.vue')
}
```

**预估工时**: 0.25天

**依赖**: T-04, T-05

---

### T-07: 单元测试

**任务概述**: 编写组件和服务的单元测试

**输出**:
- `src/services/__tests__/TemplateService.test.ts`
- `src/stores/__tests__/template.test.ts`
- `src/components/__tests__/TemplateCard.test.vue`

**测试要求**:
- 服务方法测试
- Pinia store测试
- 组件渲染测试

**预估工时**: 0.5天

**依赖**: T-01~T-06

---

### T-08: 集成测试

**任务概述**: 端到端功能测试

**输出**:
- `tests/e2e/template.spec.ts`

**测试场景**:
- 创建模板流程
- 编辑模板流程
- 删除模板流程
- 复制模板流程

**预估工时**: 0.25天

**依赖**: T-07

---

## 6. 验收清单

- [ ] 所有页面实现完成
- [ ] 分类筛选功能正常
- [ ] CRUD操作正常
- [ ] 单元测试通过
- [ ] E2E测试通过

---

## 7. 覆盖映射

| 架构元素 | 任务 | 覆盖状态 |
|---------|------|---------|
| ITemplateService | T-02 | ✅ |
| PresentationTemplate | T-01 | ✅ |
| BOUND-001~003 | T-02 | ✅ |
| 组件 | T-04~T-05 | ✅ |

---

## 变更历史

| 版本 | 日期 | 变更内容 |
|-----|------|---------|
| 1.0 | 2026-03-06 | 初始版本 |
