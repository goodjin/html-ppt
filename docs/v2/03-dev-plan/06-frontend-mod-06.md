# 前端开发计划 - 导出功能

## 文档信息

- **模块编号**: MOD-06
- **模块名称**: 导出功能
- **对应架构**: docs/v2/02-architecture/03-mod-06-export.md
- **优先级**: P1
- **预估工时**: 1天

---

## 1. 模块概述

### 1.1 模块职责

导出功能负责：
- 导出为PDF
- 导出为独立HTML
- 导出为PNG图片集

### 1.2 组件清单

| 组件 | 功能 |
|-----|------|
| ExportDialog | 导出对话框 |
| ExportProgress | 导出进度条 |

---

## 2. 开发任务拆分

| 任务编号 | 任务名称 | 涉及文件 | 代码行数 | 依赖 |
|---------|---------|---------|---------|------|
| T-01 | 导出服务 | 2 | ~120 | - |
| T-02 | 导出对话框 | 2 | ~100 | T-01 |
| T-03 | PDF导出 | 2 | ~80 | T-01 |
| T-04 | 测试 | 1 | ~50 | T-01~03 |

---

## 3. 详细任务定义

### T-01: 导出服务

**输出**: `src/services/ExportService.ts`

```typescript
export interface ExportOptions {
  format: 'pdf' | 'html' | 'png';
  range: 'all' | 'current';
  quality?: number;
}

export class ExportService {
  // 导出PDF
  async exportPdf(content: string, options: ExportOptions): Promise<Blob> {
    // 使用window.print() + 打印样式
    return new Promise((resolve) => {
      // 实现逻辑
    });
  }

  // 导出HTML
  async exportHtml(content: string, options: ExportOptions): Promise<Blob> {
    // 打包Reveal.js + 内容为单HTML文件
    return new Promise((resolve) => {
      // 实现逻辑
    });
  }

  // 导出PNG
  async exportPng(content: string, options: ExportOptions): Promise<Blob[]> {
    // 使用html2canvas逐页截图
    return new Promise((resolve) => {
      // 实现逻辑
    });
  }
}
```

---

### T-02: 导出对话框

**输出**: `src/components/export/ExportDialog.vue`

**功能**:
- 格式选择
- 选项配置
- 导出按钮
- 进度显示

---

### T-03: PDF导出

**输出**: `src/styles/print.css`

**功能**:
- 打印样式优化
- 页面分页
- 隐藏非打印元素

---

## 4. 验收清单

- [ ] PDF导出功能正常
- [ ] HTML导出功能正常
- [ ] PNG导出功能正常
- [ ] 进度显示正常

---

## 5. 覆盖映射

| 架构元素 | 任务 | 覆盖状态 |
|---------|------|---------|
| IExportService | T-01 | ✅ |
| BOUND-012~013 | T-01 | ✅ |

---

## 变更历史

| 版本 | 日期 | 变更内容 |
|-----|------|---------|
| 1.0 | 2026-03-06 | 初始版本 |
