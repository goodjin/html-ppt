# MOD-01-模板管理

## 文档信息
- **项目名称**: Web PPT
- **文档编号**: MOD-01
- **版本**: v1.0
- **对应PRD**: FR-001, FR-002, US-001

---

## 1. 系统定位

### 在整体架构中的位置

**所属层次**: L3-L5（业务逻辑层 + 展示层）

**架构定位图**:
```
┌─────────────────────────────────────────────────────┐
│                   展示层 (L5)                        │
│              TemplateList / TemplateCard            │
└───────────────────────┬─────────────────────────────┘
                        │ ▼ 调用
┌─────────────────────────────────────────────────────┐
│              ★ 模板管理模块 (MOD-01) ★              │
│   TemplateService | useTemplate composable         │
└───────────────────────┬─────────────────────────────┘
                        │ ▼ 依赖
┌─────────────────────────────────────────────────────┐
│                   数据访问层 (L2)                    │
│              FileStorage | LocalStorage            │
└─────────────────────────────────────────────────────┘
```

### 核心职责

- **模板CRUD**: 创建、读取、更新、删除模板
- **模板分类**: 按场景分类管理（技术/商务/教育）
- **模板复制**: 基于现有模板创建新模板

### 边界说明

- **负责**: 模板的持久化、模板列表管理、模板元数据
- **不负责**: 模板内容的渲染（由MOD-02负责）

---

## 2. 对应PRD

| PRD章节 | 编号 | 内容 |
|---------|-----|------|
| 功能需求 | FR-001 | 模板管理 |
| 功能需求 | FR-002 | 模板分类 |
| 用户故事 | US-001 | 模板创建与管理 |
| 验收标准 | AC-001-01 ~ AC-001-04 | 模板CRUD验收标准 |

---

## 3. 核心设计

### 3.1 模板结构

```typescript
interface PresentationTemplate {
  id: string;                    // 模板唯一标识 (UUID)
  name: string;                  // 模板名称
  description: string;           // 模板描述
  category: TemplateCategory;    // 模板分类
  content: string;               // 模板内容 (Markdown/HTML)
  thumbnail?: string;           // 缩略图路径
  createdAt: string;            // 创建时间 (ISO)
  updatedAt: string;             // 更新时间 (ISO)
}

enum TemplateCategory {
  TECH = 'tech',       // 技术演讲
  BUSINESS = 'business', // 商务演示
  EDUCATION = 'education', // 教育培训
  GENERAL = 'general'    // 通用
}
```

### 3.2 模板分类

| 分类 | 标识 | 场景 | 预置模板 |
|-----|------|------|---------|
| 技术演讲 | tech | 开发者大会、技术分享 | tech.html |
| 商务演示 | business | 商业提案、汇报 | business.html |
| 教育培训 | education | 课程演示、培训 | education.html |
| 通用 | general | 通用场景 | basic.html |

---

## 4. 接口定义

### 4.1 模板服务接口

```typescript
interface ITemplateService {
  // 获取模板列表
  getTemplates(): Promise<PresentationTemplate[]>;

  // 获取模板列表（按分类）
  getTemplatesByCategory(category: TemplateCategory): Promise<PresentationTemplate[]>;

  // 获取单个模板
  getTemplate(id: string): Promise<PresentationTemplate | null>;

  // 创建模板
  createTemplate(template: CreateTemplateDto): Promise<PresentationTemplate>;

  // 更新模板
  updateTemplate(id: string, data: UpdateTemplateDto): Promise<PresentationTemplate>;

  // 删除模板
  deleteTemplate(id: string): Promise<void>;

  // 复制模板
  duplicateTemplate(id: string, newName: string): Promise<PresentationTemplate>;
}

interface CreateTemplateDto {
  name: string;
  description?: string;
  category: TemplateCategory;
  content: string;
}

interface UpdateTemplateDto {
  name?: string;
  description?: string;
  category?: TemplateCategory;
  content?: string;
}
```

---

## 5. 组件设计

### 5.1 TemplateList 组件

```vue
<template>
  <div class="template-list">
    <!-- 分类筛选 -->
    <CategoryFilter v-model="selectedCategory" />

    <!-- 模板网格 -->
    <div class="template-grid">
      <TemplateCard
        v-for="template in filteredTemplates"
        :key="template.id"
        :template="template"
        @click="openTemplate(template.id)"
        @duplicate="duplicateTemplate(template.id)"
        @delete="deleteTemplate(template.id)"
      />
    </div>

    <!-- 新建模板按钮 -->
    <button class="btn-create" @click="createNew">
      + 新建模板
    </button>
  </div>
</template>
```

### 5.2 TemplateEditor 组件

```vue
<template>
  <div class="template-editor">
    <!-- 元信息编辑 -->
    <div class="meta-section">
      <input v-model="form.name" placeholder="模板名称" />
      <textarea v-model="form.description" placeholder="描述" />
      <select v-model="form.category">
        <option value="tech">技术演讲</option>
        <option value="business">商务演示</option>
        <option value="education">教育培训</option>
        <option value="general">通用</option>
      </select>
    </div>

    <!-- 内容编辑 -->
    <MarkdownEditor v-model="form.content" />

    <!-- 操作按钮 -->
    <div class="actions">
      <button @click="save">保存</button>
      <button @click="preview">预览</button>
    </div>
  </div>
</template>
```

---

## 6. 边界条件

### BOUND-001: 模板名称重复

| 条件 | 处理方式 |
|-----|---------|
| 触发条件 | 创建模板时，名称与已有模板重复 |
| 处理方式 | 提示用户"名称已存在，请使用其他名称" |
| 错误码 | TEMPLATE_NAME_DUPLICATE |

### BOUND-002: 模板内容为空

| 条件 | 处理方式 |
|-----|---------|
| 触发条件 | 保存模板时，内容为空 |
| 处理方式 | 提示用户"模板内容不能为空" |
| 错误码 | TEMPLATE_CONTENT_EMPTY |

### BOUND-003: 模板文件不存在

| 条件 | 处理方式 |
|-----|---------|
| 触发条件 | 读取模板时，文件不存在 |
| 处理方式 | 返回null，显示"模板不存在" |
| 错误码 | TEMPLATE_NOT_FOUND |

---

## 7. 验收标准

| 标准 | 要求 | 验证方法 |
|-----|------|---------|
| AC-001-01 | 用户可以创建新模板并保存 | 调用createTemplate，验证文件保存 |
| AC-001-02 | 用户可以编辑已有模板内容 | 调用updateTemplate，验证更新成功 |
| AC-001-03 | 用户可以复制现有模板 | 调用duplicateTemplate，验证复制成功 |
| AC-001-04 | 用户可以删除模板 | 调用deleteTemplate，验证文件删除 |

---

## 8. 覆盖映射

| PRD类型 | PRD编号 | 架构元素 | 覆盖状态 |
|---------|---------|---------|---------|
| 功能需求 | FR-001 | TemplateService | ✅ |
| 功能需求 | FR-002 | TemplateCategory | ✅ |
| 用户故事 | US-001 | TemplateService + TemplateEditor | ✅ |
| 验收标准 | AC-001-01~04 | BOUND-001~003 | ✅ |

---

## 变更历史

| 版本 | 日期 | 变更内容 |
|-----|------|---------|
| 1.0 | 2026-03-06 | 初始版本 |
