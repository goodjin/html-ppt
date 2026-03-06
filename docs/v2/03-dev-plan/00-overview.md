# 开发计划总览

## 文档信息
- **项目名称**: Web PPT（网页版PPT开发平台）
- **版本**: v1.0
- **对应架构**: docs/v2/02-architecture/
- **创建日期**: 2026-03-06

---

## 1. 项目概述

Web PPT是一个基于Web技术的演示文稿开发平台，采用Vue 3 + Vite技术栈，核心依赖Reveal.js框架。项目为**纯前端应用**，无需后端服务。

---

## 2. 模块开发计划

| 批次 | 模块 | 开发计划 | 任务数 | 预估工时 | 状态 |
|-----|------|---------|-------|---------|------|
| 1 | MOD-01 模板管理 | 01-frontend-mod-01.md | 8 | 2天 | 待开发 |
| 1 | MOD-02 实时预览 | 02-frontend-mod-02.md | 6 | 1.5天 | 待开发 |
| 2 | MOD-03 素材管理 | 03-frontend-mod-03.md | 5 | 1天 | 待开发 |
| 2 | MOD-04 主题系统 | 04-frontend-mod-04.md | 4 | 1天 | 待开发 |
| 3 | MOD-05 讲者模式 | 05-frontend-mod-05.md | 4 | 1天 | 待开发 |
| 3 | MOD-06 导出功能 | 06-frontend-mod-06.md | 4 | 1天 | 待开发 |
| 4 | 集成与优化 | 07-integration.md | 3 | 0.5天 | 待开发 |

---

## 3. 开发顺序

### 第1批（基础模块）
1. **MOD-01 模板管理** - 核心功能，其他模块依赖
2. **MOD-02 实时预览** - 核心功能，依赖模板管理

### 第2批（增强模块）
1. **MOD-03 素材管理** - 独立模块
2. **MOD-04 主题系统** - 独立模块

### 第3批（高级功能）
1. **MOD-05 讲者模式** - 高级功能
2. **MOD-06 导出功能** - 高级功能

### 第4批（集成优化）
1. **集成测试与优化**

---

## 4. 技术栈

| 类型 | 技术 | 版本 |
|-----|------|------|
| 核心框架 | Vue 3 | 3.4+ |
| 构建工具 | Vite | 5.0+ |
| 演示框架 | Reveal.js | 4.6+ |
| Markdown | markdown-it | 14.0+ |
| 代码高亮 | Shiki | 1.0+ |
| 状态管理 | Pinia | 2.0+ |
| 路由 | Vue Router | 4.0+ |
| UI框架 | - | (原生实现) |

---

## 5. 开发规范

### 5.1 代码规范
- 使用TypeScript进行类型检查
- Vue组件使用`<script setup>`语法
- CSS使用Scoped CSS或CSS Modules
- 组件名使用PascalCase

### 5.2 提交规范
- 提交信息格式: `type(scope): message`
- type: feat/fix/docs/style/refactor/test
- 示例: `feat(template): 添加模板复制功能`

### 5.3 测试规范
- 组件使用Vue Test Utils测试
- 组合式函数使用Vitest测试
- 覆盖率目标: ≥ 70%

---

## 6. 目录结构

```
web-ppt/
├── src/
│   ├── components/          # Vue组件
│   │   ├── editor/         # 编辑器组件
│   │   ├── preview/        # 预览组件
│   │   ├── template/       # 模板组件
│   │   ├── asset/          # 素材组件
│   │   ├── theme/          # 主题组件
│   │   └── speaker/        # 讲者组件
│   ├── composables/         # 组合式函数
│   ├── services/           # 业务服务
│   ├── stores/             # Pinia状态
│   ├── utils/              # 工具函数
│   ├── styles/             # 样式
│   └── router/             # 路由配置
├── templates/               # PPT模板
├── presentations/           # 成品PPT
└── package.json
```

---

## 7. 覆盖映射

| 架构模块 | 开发计划 | 任务数 | 覆盖状态 |
|---------|---------|-------|---------|
| MOD-01 | 01-frontend-mod-01.md | 8 | ✅ |
| MOD-02 | 02-frontend-mod-02.md | 6 | ✅ |
| MOD-03 | 03-frontend-mod-03.md | 5 | ✅ |
| MOD-04 | 04-frontend-mod-04.md | 4 | ✅ |
| MOD-05 | 05-frontend-mod-05.md | 4 | ✅ |
| MOD-06 | 06-frontend-mod-06.md | 4 | ✅ |
| 集成 | 07-integration.md | 3 | ✅ |

---

## 变更历史

| 版本 | 日期 | 变更内容 |
|-----|------|---------|
| 1.0 | 2026-03-06 | 初始版本 |
