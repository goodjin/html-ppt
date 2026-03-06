# MOD-04-主题系统

## 文档信息
- **项目名称**: Web PPT
- **文档编号**: MOD-04
- **版本**: v1.0
- **对应PRD**: FR-007, US-004

---

## 1. 系统定位

### 在整体架构中的位置

**所属层次**: L3-L5（业务逻辑层 + 展示层）

**架构定位图**:
```
┌─────────────────────────────────────────────────────┐
│                   展示层 (L5)                        │
│           ThemeSelector | ThemePreview              │
└───────────────────────┬─────────────────────────────┘
                        │ ▼ 调用
┌─────────────────────────────────────────────────────┐
│              ★ 主题系统模块 (MOD-04) ★             │
│            ThemeService | useTheme composable       │
└───────────────────────┬─────────────────────────────┘
                        │ ▼ 依赖
┌─────────────────────────────────────────────────────┐
│                   基础设施层 (L1)                    │
│              CSS Variables | Reveal.js              │
└─────────────────────────────────────────────────────┘
```

### 核心职责

- **主题切换**: 切换预置主题
- **主题自定义**: 自定义颜色、字体、背景

---

## 2. 对应PRD

| PRD章节 | 编号 | 内容 |
|---------|-----|------|
| 功能需求 | FR-007 | 主题系统 |
| 用户故事 | US-004 | 主题系统 |
| 验收标准 | AC-004-01 ~ AC-004-03 | 主题验收标准 |

---

## 3. 核心设计

### 3.1 主题结构

```typescript
interface Theme {
  id: string;
  name: string;
  type: 'preset' | 'custom';
  styles: ThemeStyles;
}

interface ThemeStyles {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    accent: string;
  };
  fonts: {
    heading: string;
    body: string;
    code: string;
  };
  background?: {
    type: 'solid' | 'gradient' | 'image';
    value: string;
  };
}
```

### 3.2 预置主题

| 主题ID | 名称 | 风格 | 适用场景 |
|-------|------|------|---------|
| black | 经典黑 | 深色背景 | 技术大会 |
| white | 简约白 | 浅色背景 | 商务演示 |
| league | 商务蓝 | 蓝灰配色 | 企业汇报 |
| night | 夜间模式 | 深色高对比 | 暗光环境 |
| dracula |  Dracula | 紫色主题 | 开发者 |

---

## 4. 接口定义

### 4.1 主题服务接口

```typescript
interface IThemeService {
  // 获取所有主题
  getThemes(): Theme[];

  // 获取当前主题
  getCurrentTheme(): Theme;

  // 切换主题
  setTheme(themeId: string): void;

  // 自定义主题
  customizeTheme(styles: Partial<ThemeStyles>): Theme;

  // 保存自定义主题
  saveCustomTheme(theme: Theme): void;

  // 导出主题
  exportTheme(theme: Theme): string;
}
```

---

## 5. 边界条件

### BOUND-010: 主题配置冲突

| 条件 | 处理方式 |
|-----|---------|
| 触发条件 | 自定义颜色与背景对比度不足 |
| 处理方式 | 使用默认值，并提示"对比度不足，已使用默认值" |
| 错误码 | THEME_CONTRAST_ERROR |

### BOUND-011: 主题加载失败

| 条件 | 处理方式 |
|-----|---------|
| 触发条件 | 主题文件加载失败 |
| 处理方式 | 回退到默认主题，显示提示 |
| 错误码 | THEME_LOAD_FAILED |

---

## 6. 验收标准

| 标准 | 要求 | 验证方法 |
|-----|------|---------|
| AC-004-01 | 提供至少5种预置主题 | 枚举验证 |
| AC-004-02 | 用户可自定义主题颜色 | 功能测试 |
| AC-004-03 | 主题切换即时生效 | 性能测试 |

---

## 7. 覆盖映射

| PRD类型 | PRD编号 | 架构元素 | 覆盖状态 |
|---------|---------|---------|---------|
| 功能需求 | FR-007 | ThemeService | ✅ |
| 用户故事 | US-004 | ThemeSelector | ✅ |
| 验收标准 | AC-004-01~03 | BOUND-010~011 | ✅ |

---

## 变更历史

| 版本 | 日期 | 变更内容 |
|-----|------|---------|
| 1.0 | 2026-03-06 | 初始版本 |
