# MOD-06-导出功能

## 文档信息
- **项目名称**: Web PPT
- **文档编号**: MOD-06
- **版本**: v1.0
- **对应PRD**: FR-009, US-006

---

## 1. 系统定位

### 在整体架构中的位置

**所属层次**: L3-L4（业务逻辑层 + 接口层）

**架构定位图**:
```
┌─────────────────────────────────────────────────────┐
│              ★ 导出功能模块 (MOD-06) ★             │
│              ExportService | ExportDialog           │
└─────────────────────────────────────────────────────┘
                        │ ▼ 依赖
┌─────────────────────────────────────────────────────┐
│                   基础设施层 (L1)                    │
│         html2canvas | jspdf | JSZip               │
└─────────────────────────────────────────────────────┘
```

### 核心职责

- **PDF导出**: 导出为打印优化的PDF
- **HTML导出**: 导出为独立HTML文件
- **图片导出**: 导出为PNG图片集

---

## 2. 对应PRD

| PRD章节 | 编号 | 内容 |
|---------|-----|------|
| 功能需求 | FR-009 | 导出功能 |
| 用户故事 | US-006 | 导出功能 |
| 验收标准 | AC-006-01 ~ AC-006-03 | 导出验收标准 |

---

## 3. 核心设计

### 3.1 导出格式

| 格式 | 实现方案 | 特点 |
|-----|---------|------|
| PDF | window.print() + CSS打印优化 | 跨平台，原生支持 |
| HTML | 打包Reveal.js+内容为单文件 | 可离线播放 |
| PNG | html2canvas逐页截图 | 图片质量高 |

### 3.2 导出配置

```typescript
interface ExportOptions {
  format: 'pdf' | 'html' | 'png';
  range: 'all' | 'current' | 'range';
  quality: number;        // 图片质量 0-1
  includeNotes: boolean;  // 包含备注
}

interface ExportProgress {
  current: number;
  total: number;
  status: 'pending' | 'processing' | 'done' | 'error';
}
```

---

## 4. 接口定义

### 4.1 导出服务接口

```typescript
interface IExportService {
  // 导出为PDF
  exportPdf(options: ExportOptions): Promise<Blob>;

  // 导出为HTML
  exportHtml(options: ExportOptions): Promise<Blob>;

  // 导出为PNG
  exportPng(options: ExportOptions): Promise<Blob[]>;

  // 导出进度回调
  onProgress(callback: (progress: ExportProgress) => void): void;
}
```

---

## 5. 边界条件

### BOUND-012: 导出超时

| 条件 | 处理方式 |
|-----|---------|
| 触发条件 | 导出超过30秒 |
| 处理方式 | 显示进度，允许取消 |
| 错误码 | EXPORT_TIMEOUT |

### BOUND-013: 内存不足

| 条件 | 处理方式 |
|-----|---------|
| 触发条件 | 导出大文件时内存不足 |
| 处理方式 | 分批导出，显示进度 |
| 错误码 | EXPORT_MEMORY_ERROR |

---

## 6. 验收标准

| 标准 | 要求 | 验证方法 |
|-----|------|---------|
| AC-006-01 | 一键导出为PDF | 功能测试 |
| AC-006-02 | 导出为独立HTML | 功能测试 |
| AC-006-03 | 导出为PNG图片集 | 功能测试 |

---

## 7. 覆盖映射

| PRD类型 | PRD编号 | 架构元素 | 覆盖状态 |
|---------|---------|---------|---------|
| 功能需求 | FR-009 | ExportService | ✅ |
| 用户故事 | US-006 | ExportDialog | ✅ |
| 验收标准 | AC-006-01~03 | BOUND-012~013 | ✅ |

---

## 变更历史

| 版本 | 日期 | 变更内容 |
|-----|------|---------|
| 1.0 | 2026-03-06 | 初始版本 |
