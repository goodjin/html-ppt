<template>
  <div class="preview-view">
    <div class="toolbar">
      <router-link to="/templates">
        <button class="secondary">← 返回</button>
      </router-link>
      <h2>预览: {{ templateName }}</h2>
      <div class="actions">
        <button @click="toggleFullscreen" class="secondary">全屏</button>
      </div>
    </div>

    <SplitView :mode="viewMode">
      <template #editor>
        <div class="editor-container">
          <MarkdownEditor v-model="content" />
        </div>
      </template>
      <template #preview>
        <div class="preview-container">
          <SlidePreview :content="content" />
        </div>
      </template>
    </SplitView>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useTemplateStore } from '@/stores/template'
import SplitView from '@/components/preview/SplitView.vue'
import MarkdownEditor from '@/components/editor/MarkdownEditor.vue'
import SlidePreview from '@/components/preview/SlidePreview.vue'

const route = useRoute()
const store = useTemplateStore()

const templateId = route.params.id as string
const content = ref('')
const viewMode = ref<'split' | 'editor' | 'preview'>('split')

const templateName = computed(() => {
  const template = store.templates.find(t => t.id === templateId)
  return template?.name || '未命名'
})

function toggleFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen()
  } else {
    document.documentElement.requestFullscreen()
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
}

.toolbar h2 {
  flex: 1;
  margin: 0;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.editor-container, .preview-container {
  padding: 1rem;
  height: 100%;
}
</style>
