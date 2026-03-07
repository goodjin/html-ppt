<template>
  <div class="export-view">
    <div class="toolbar">
      <router-link to="/templates">
        <button class="secondary">← 返回</button>
      </router-link>
      <h2>导出</h2>
    </div>

    <div class="content">
      <div class="export-options">
        <div class="option-card" @click="exportAs('pdf')">
          <div class="option-icon">📄</div>
          <h4>导出PDF</h4>
          <p>适合打印和分享</p>
        </div>

        <div class="option-card" @click="exportAs('html')">
          <div class="option-icon">🌐</div>
          <h4>导出HTML</h4>
          <p>独立HTML文件，可离线播放</p>
        </div>

        <div class="option-card" @click="exportAs('png')">
          <div class="option-icon">🖼️</div>
          <h4>导出PNG</h4>
          <p>导出为图片格式</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useTemplateStore } from '@/stores/template'
import { exportService, type ExportOptions } from '@/services/ExportService'

const route = useRoute()
const store = useTemplateStore()
const templateId = route.params.id as string
const content = ref('')

async function exportAs(format: ExportOptions['format']) {
  const options: ExportOptions = { format, range: 'all' }

  switch (format) {
    case 'pdf':
      await exportService.exportPdf(content.value, options)
      break
    case 'html':
      await exportService.exportHtml(content.value, options)
      break
    case 'png':
      await exportService.exportPng(content.value, options)
      break
  }
}

onMounted(async () => {
  await store.loadTemplates()
  const template = store.templates.find(t => t.id === templateId)
  if (template) {
    content.value = template.content
  }
})
</script>

<style scoped>
.export-view {
  max-width: 800px;
  margin: 0 auto;
}

.toolbar {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.toolbar h2 {
  margin: 0;
}

.export-options {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.option-card {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  border: 2px solid transparent;
}

.option-card:hover {
  border-color: #4a90d9;
  transform: translateY(-2px);
}

.option-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.option-card h4 {
  margin: 0 0 0.5rem;
}

.option-card p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}
</style>
