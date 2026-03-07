<template>
  <div class="export-dialog">
    <div class="dialog-content">
      <h3>导出演示文稿</h3>

      <div class="form-group">
        <label>导出格式</label>
        <select v-model="format">
          <option value="pdf">PDF文档</option>
          <option value="html">HTML文件</option>
          <option value="png">PNG图片</option>
        </select>
      </div>

      <div class="form-group">
        <label>导出范围</label>
        <select v-model="range">
          <option value="all">全部幻灯片</option>
          <option value="current">当前幻灯片</option>
        </select>
      </div>

      <div class="actions">
        <button @click="handleExport" :disabled="isExporting">
          {{ isExporting ? '导出中...' : '导出' }}
        </button>
        <button @click="close" class="secondary">取消</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { exportService, type ExportOptions } from '@/services/ExportService'

const props = defineProps<{
  content: string
}>()

const emit = defineEmits<{
  close: []
}>()

const format = ref<ExportOptions['format']>('pdf')
const range = ref<ExportOptions['range']>('all')
const isExporting = ref(false)

async function handleExport() {
  isExporting.value = true
  try {
    const options: ExportOptions = { format: format.value, range: range.value }

    switch (format.value) {
      case 'pdf':
        await exportService.exportPdf(props.content, options)
        break
      case 'html':
        await exportService.exportHtml(props.content, options)
        break
      case 'png':
        await exportService.exportPng(props.content, options)
        break
    }

    emit('close')
  } catch (e) {
    alert('导出失败: ' + (e as Error).message)
  } finally {
    isExporting.value = false
  }
}

function close() {
  emit('close')
}
</script>

<style scoped>
.export-dialog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.dialog-content {
  background: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  width: 400px;
}

.dialog-content h3 {
  margin: 0 0 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.form-group select {
  width: 100%;
}

.actions {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
}

.actions button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
