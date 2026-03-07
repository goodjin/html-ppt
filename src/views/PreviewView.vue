<template>
  <div class="preview-view">
    <div class="toolbar">
      <router-link to="/templates">
        <button class="secondary">← 返回</button>
      </router-link>
      <h2>预览: {{ templateName }}</h2>
      <div class="actions">
        <button @click="toggleView" class="secondary">{{ viewMode === 'split' ? '全屏预览' : '分屏模式' }}</button>
        <button @click="toggleFullscreen" class="secondary">全屏</button>
      </div>
    </div>

    <div class="preview-content" :class="{ 'fullscreen-mode': viewMode === 'preview' }">
      <div v-if="viewMode === 'preview'" class="fullscreen-preview">
        <RevealPreview :content="content" />
      </div>
      <SplitView v-else :mode="viewMode">
        <template #editor>
          <div class="editor-container">
            <MarkdownEditor v-model="content" />
          </div>
        </template>
        <template #preview>
          <div class="preview-container">
            <RevealPreview :content="content" />
          </div>
        </template>
      </SplitView>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useTemplateStore } from '@/stores/template'
import SplitView from '@/components/preview/SplitView.vue'
import MarkdownEditor from '@/components/editor/MarkdownEditor.vue'
import RevealPreview from '@/components/preview/RevealPreview.vue'

const route = useRoute()
const store = useTemplateStore()

const templateId = route.params.id as string
const content = ref('')
const viewMode = ref<'split' | 'editor' | 'preview'>('split')

const templateName = computed(() => {
  const template = store.templates.find(t => t.id === templateId)
  return template?.name || '未命名'
})

function toggleView() {
  viewMode.value = viewMode.value === 'split' ? 'preview' : 'split'
}

function toggleFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen()
  } else {
    document.documentElement.requestFullscreen()
  }
}

// Watch for content changes and update localStorage
watch(content, (newContent) => {
  const template = store.templates.find(t => t.id === templateId)
  if (template && newContent !== template.content) {
    store.updateTemplate(templateId, { content: newContent })
  }
})

onMounted(async () => {
  await store.loadTemplates()
  const template = store.templates.find(t => t.id === templateId)
  if (template) {
    content.value = template.content
  }
})
</script>

<style scoped>
.preview-view {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 120px);
}

.toolbar {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-shrink: 0;
}

.toolbar h2 {
  flex: 1;
  margin: 0;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.preview-content {
  flex: 1;
  min-height: 0;
}

.preview-content.fullscreen-mode {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background: #000;
}

.fullscreen-preview {
  width: 100%;
  height: 100vh;
}

.editor-container, .preview-container {
  padding: 1rem;
  height: 100%;
  overflow: auto;
}
</style>
