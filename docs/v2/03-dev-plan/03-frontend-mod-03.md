# 前端开发计划 - 素材管理

## 文档信息

- **模块编号**: MOD-03
- **模块名称**: 素材管理
- **对应架构**: docs/v2/02-architecture/03-mod-03-asset.md
- **优先级**: P1
- **预估工时**: 1天

---

## 1. 模块概述

### 1.1 模块职责

素材管理模块负责：
- 素材上传（拖拽/批量）
- 素材存储（localStorage/IndexedDB）
- 素材引用（生成引用路径）

### 1.2 组件清单

| 组件 | 功能 |
|-----|------|
| AssetUploader | 素材上传组件 |
| AssetGallery | 素材库展示 |
| AssetPicker | 素材选择器 |

---

## 2. 技术设计

### 2.1 技术选型

| 类型 | 技术 | 说明 |
|-----|------|------|
| 存储 | IndexedDB | 存储大容量二进制数据 |
| 图片处理 | 浏览器原生API | 缩略图生成 |

### 2.2 目录结构

```
src/
├── components/
│   └── asset/
│       ├── AssetUploader.vue
│       ├── AssetGallery.vue
│       └── AssetPicker.vue
├── composables/
│   └── useAsset.ts
├── services/
│   └── AssetService.ts
└── types/
    └── asset.ts
```

---

## 3. 开发任务拆分

| 任务编号 | 任务名称 | 涉及文件 | 代码行数 | 依赖 |
|---------|---------|---------|---------|------|
| T-01 | 类型定义 | 1 | ~30 | - |
| T-02 | 素材服务 | 2 | ~120 | T-01 |
| T-03 | 上传组件 | 2 | ~100 | T-02 |
| T-04 | 素材库组件 | 2 | ~80 | T-02 |
| T-05 | 测试 | 2 | ~100 | T-01~04 |

---

## 4. 详细任务定义

### T-01: 类型定义

**输出**: `src/types/asset.ts`

```typescript
export enum AssetType {
  IMAGE = 'image',
  FONT = 'font'
}

export interface Asset {
  id: string;
  name: string;
  type: AssetType;
  size: number;
  path: string;
  url: string;
  thumbnail?: string;
  uploadedAt: string;
}
```

---

### T-02: 素材服务

**任务概述**: 实现素材上传、存储、删除服务

**输出**: `src/services/AssetService.ts`

**核心功能**:
- 上传文件到IndexedDB
- 生成缩略图
- 列出素材
- 删除素材

**验收标准**:
- [ ] 支持拖拽上传
- [ ] 支持批量上传
- [ ] 文件大小限制

**预估工时**: 0.3天

---

### T-03: 上传组件

**输出**: `src/components/asset/AssetUploader.vue`

**功能**:
- 拖拽区域
- 文件选择
- 上传进度
- 错误提示

**预估工时**: 0.3天

---

### T-04: 素材库组件

**输出**:
- `src/components/asset/AssetGallery.vue`
- `src/components/asset/AssetPicker.vue`

**功能**:
- 缩略图网格展示
- 素材选择插入

**预估工时**: 0.3天

---

### T-05: 测试

**输出**: `src/services/__tests__/AssetService.test.ts`

**预估工时**: 0.1天

---

## 5. 验收清单

- [ ] 拖拽上传功能正常
- [ ] 批量上传功能正常
- [ ] 缩略图展示正常
- [ ] 素材插入功能正常

---

## 6. 覆盖映射

| 架构元素 | 任务 | 覆盖状态 |
|---------|------|---------|
| IAssetService | T-02 | ✅ |
| BOUND-007~009 | T-02 | ✅ |

---

## 变更历史

| 版本 | 日期 | 变更内容 |
|-----|------|---------|
| 1.0 | 2026-03-06 | 初始版本 |
