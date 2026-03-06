# 前端开发计划 - 讲者模式

## 文档信息

- **模块编号**: MOD-05
- **模块名称**: 讲者模式
- **对应架构**: docs/v2/02-architecture/03-mod-05-speaker.md
- **优先级**: P1
- **预估工时**: 1天

---

## 1. 模块概述

### 1.1 模块职责

讲者模式负责：
- 演讲者视图（当前页+下一页）
- 演讲计时器
- 演讲者备注

### 1.2 组件清单

| 组件 | 功能 |
|-----|------|
| SpeakerView | 讲者视图主组件 |
| Timer | 计时器组件 |
| NotesView | 备注展示组件 |

---

## 2. 开发任务拆分

| 任务编号 | 任务名称 | 涉及文件 | 代码行数 | 依赖 |
|---------|---------|---------|---------|------|
| T-01 | 计时器逻辑 | 2 | ~80 | - |
| T-02 | 讲者视图 | 3 | ~150 | T-01 |
| T-03 | 备注展示 | 2 | ~80 | - |
| T-04 | 测试 | 1 | ~50 | T-01~03 |

---

## 3. 详细任务定义

### T-01: 计时器逻辑

**输出**: `src/composables/useTimer.ts`

```typescript
export function useTimer() {
  const elapsed = ref(0);
  const isRunning = ref(false);
  const isPaused = ref(false);

  let intervalId: ReturnType<typeof setInterval> | null = null;

  function start() {
    if (isRunning.value) return;
    isRunning.value = true;
    isPaused.value = false;
    intervalId = setInterval(() => {
      elapsed.value++;
    }, 1000);
  }

  function pause() {
    if (intervalId) clearInterval(intervalId);
    isRunning.value = false;
    isPaused.value = true;
  }

  function reset() {
    pause();
    elapsed.value = 0;
  }

  function formatTime(seconds: number): string {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  return { elapsed, isRunning, isPaused, start, pause, reset, formatTime };
}
```

---

### T-02: 讲者视图

**输出**: `src/components/speaker/SpeakerView.vue`

**功能**:
- 当前页预览
- 下一页预览
- 计时器控制
- 备注显示

---

### T-03: 备注展示

**输出**: `src/components/speaker/NotesView.vue`

**功能**:
- 解析幻灯片备注
- 富文本展示

---

## 4. 验收清单

- [ ] 讲者视图正常显示
- [ ] 当前页+下一页预览正常
- [ ] 计时器功能正常
- [ ] 备注显示正常

---

## 5. 覆盖映射

| 架构元素 | 任务 | 覆盖状态 |
|---------|------|---------|
| AC-005-01~04 | T-01~T-03 | ✅ |

---

## 变更历史

| 版本 | 日期 | 变更内容 |
|-----|------|---------|
| 1.0 | 2026-03-06 | 初始版本 |
