import { type PresentationTemplate, type CreateTemplateDto, type UpdateTemplateDto, TemplateCategory } from '@/types/template'

const STORAGE_KEY = 'web-ppt-templates'

// Default templates
const defaultTemplates: PresentationTemplate[] = [
  {
    id: 'default-tech',
    name: '技术演讲',
    description: '适合技术分享、代码演示，包含代码高亮、多页布局',
    category: TemplateCategory.TECH,
    content: `---
theme: black
transition: slide
---

# 技术分享

## 讲者简介

- 高级工程师
- 5年开发经验
- 专注于前端架构

---

## 目录

1. 背景介绍
2. 技术方案
3. 核心代码
4. 性能优化
5. 总结与展望

---

## 背景介绍

### 为什么选择这个技术？

- 提升开发效率
- 更好的用户体验
- 社区活跃度高

---

## 技术方案

### 架构图

\`\`\`
┌─────────────┐
│   前端      │
├─────────────┤
│  Vue 3     │
├─────────────┤
│  Vite      │
└─────────────┘
\`\`\`

---

## 核心代码

### 示例代码

\`\`\`typescript
// 数据响应式
const state = reactive({
  count: 0,
  message: 'Hello'
})

// 计算属性
const doubled = computed(() => state.count * 2)

// 方法
function increment() {
  state.count++
}
\`\`\`

---

## 性能优化

### 关键指标

| 指标 | 优化前 | 优化后 | 提升 |
|-----|-------|-------|-----|
| 首屏加载 | 2.5s | 0.8s | 68% |
| 交互响应 | 200ms | 50ms | 75% |
| 内存占用 | 150MB | 80MB | 47% |

---

## 总结与展望

### 主要收获

- 掌握了核心技术
- 提升了开发效率
- 优化了用户体验

### Q&A

欢迎提问！

---

## 谢谢大家

联系方式: example@email.com
`,
    createdAt: '2026-03-06T00:00:00Z',
    updatedAt: '2026-03-06T00:00:00Z'
  },
  {
    id: 'default-business',
    name: '商务演示',
    description: '适合商业提案、项目汇报，专业简洁',
    category: TemplateCategory.BUSINESS,
    content: `---
theme: white
transition: fade
---

# 项目名称

## 2026年度规划

**汇报人：** 姓名
**日期：** 2026年3月

---

## 目录

1. 项目背景
2. 市场分析
3. 产品方案
4. 实施计划
5. 投资回报

---

## 项目背景

### 市场需求

> "用户需要一个更高效的解决方案"

- 市场规模：100亿+
- 年增长率：20%
- 用户痛点：效率低、体验差

---

## 市场分析

### 竞争格局

| 竞争对手 | 市场份额 | 优势 | 劣势 |
|---------|---------|-----|-----|
| A公司 | 35% | 品牌强 | 价格高 |
| B公司 | 25% | 技术好 | 服务差 |
| **我们** | - | 性价比 | 知名度低 |

---

## 产品方案

### 核心功能

1. **智能分析** - AI驱动的数据分析
2. **实时协作** - 多端同步
3. **自动化** - 工作流自动化

---

## 实施计划

### 时间表

- **Q1**: 产品研发
- **Q2**: 内测优化
- **Q3**: 公开发布
- **Q4**: 市场推广

---

## 投资回报

### 预期收益

- 第一年收入：500万
- 第三年收入：2000万
- 投资回报率：300%

---

## 谢谢

**联系我们**
- 电话：400-XXX-XXXX
- 邮箱：business@example.com
`,
    createdAt: '2026-03-06T00:00:00Z',
    updatedAt: '2026-03-06T00:00:00Z'
  },
  {
    id: 'default-education',
    name: '教育培训',
    description: '适合课程教学、培训演示，结构清晰',
    category: TemplateCategory.EDUCATION,
    content: `---
theme: white
transition: slide
---

# 第一课：Vue3基础

## 从入门到实践

**授课教师：** 讲师姓名
**课时：** 2小时

---

## 课程大纲

### 本节课内容

1. Vue3新特性
2. 组合式API
3. 响应式系统
4. 实战练习

---

## Vue3新特性

### 六大亮点

- **性能提升** - 重写了响应式系统
- **Tree-shaking** - 按需加载
- - **TypeScript** - 完整类型支持
- - **组合式API** - 更好的逻辑复用
- - **Fragment** - 多根节点
- - **Teleport** - 传送门

---

## 组合式API

### 什么是组合式API？

\`\`\`vue
<script setup>
import { ref, computed } from 'vue'

// 响应式状态
const count = ref(0)

// 计算属性
const doubled = computed(() => count.value * 2)

// 方法
function increment() {
  count.value++
}
</script>

<template>
  <button @click="increment">
    {{ doubled }}
  </button>
</template>
\`\`\`

---

## 响应式系统

### 工作原理

\`\`\`
用户操作 → 触发更新 → 收集依赖 → 触发响应
\`\`\`

### 核心API

| API | 用途 |
|-----|------|
| ref | 基础类型响应式 |
| reactive | 对象响应式 |
| computed | 计算属性 |
| watch | 监听器 |

---

## 实战练习

### 练习1：计数器

要求：
1. 显示当前计数
2. 加减按钮
3. 重置按钮

### 练习2：待办事项

要求：
1. 添加待办
2. 标记完成
3. 删除待办

---

## 下节预告

### 下一课内容

- 组件化开发
- 路由管理
- 状态管理

### 课前准备

- 安装Node.js 18+
- 安装VS Code

---

## 作业

1. 完成课堂练习
2. 搭建Vue3开发环境
3. 预习官方文档

---

## 谢谢大家

**有问题请发邮件：**
teacher@example.com
`,
    createdAt: '2026-03-06T00:00:00Z',
    updatedAt: '2026-03-06T00:00:00Z'
  }
]

export class TemplateService {
  private loadTemplates(): PresentationTemplate[] {
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) {
      // Initialize with default templates
      this.saveTemplates(defaultTemplates)
      return defaultTemplates
    }
    return JSON.parse(data)
  }

  private saveTemplates(templates: PresentationTemplate[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(templates))
  }

  async getTemplates(): Promise<PresentationTemplate[]> {
    return this.loadTemplates()
  }

  async getTemplatesByCategory(category: TemplateCategory): Promise<PresentationTemplate[]> {
    const templates = this.loadTemplates()
    return templates.filter(t => t.category === category)
  }

  async getTemplate(id: string): Promise<PresentationTemplate | null> {
    const templates = this.loadTemplates()
    return templates.find(t => t.id === id) || null
  }

  async createTemplate(dto: CreateTemplateDto): Promise<PresentationTemplate> {
    const template: PresentationTemplate = {
      id: crypto.randomUUID(),
      name: dto.name,
      description: dto.description,
      category: dto.category,
      content: dto.content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    const templates = this.loadTemplates()
    templates.push(template)
    this.saveTemplates(templates)
    return template
  }

  async updateTemplate(id: string, dto: UpdateTemplateDto): Promise<PresentationTemplate> {
    const templates = this.loadTemplates()
    const index = templates.findIndex(t => t.id === id)
    if (index === -1) throw new Error('Template not found')

    templates[index] = {
      ...templates[index],
      ...dto,
      updatedAt: new Date().toISOString()
    }
    this.saveTemplates(templates)
    return templates[index]
  }

  async deleteTemplate(id: string): Promise<void> {
    const templates = this.loadTemplates().filter(t => t.id !== id)
    this.saveTemplates(templates)
  }

  async duplicateTemplate(id: string, newName: string): Promise<PresentationTemplate> {
    const template = await this.getTemplate(id)
    if (!template) throw new Error('Template not found')

    return this.createTemplate({
      name: newName,
      description: template.description,
      category: template.category,
      content: template.content
    })
  }
}

export const templateService = new TemplateService()
