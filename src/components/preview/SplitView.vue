<template>
  <div class="split-view" :class="{ 'preview-only': mode === 'preview' }">
    <div class="editor-pane" v-show="mode !== 'preview'">
      <slot name="editor"></slot>
    </div>

    <div
      class="divider"
      v-show="mode !== 'preview'"
      @mousedown="startResize"
    ></div>

    <div class="preview-pane">
      <slot name="preview"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  mode?: 'split' | 'editor' | 'preview'
}>()

const dividerRef = ref<HTMLElement | null>(null)
const isResizing = ref(false)

function startResize(e: MouseEvent) {
  isResizing.value = true
  document.addEventListener('mousemove', doResize)
  document.addEventListener('mouseup', stopResize)
  e.preventDefault()
}

function doResize(e: MouseEvent) {
  if (!isResizing.value) return
  // Could implement resize logic here
}

function stopResize() {
  isResizing.value = false
  document.removeEventListener('mousemove', doResize)
  document.removeEventListener('mouseup', stopResize)
}
</script>

<style scoped>
.split-view {
  display: flex;
  height: 100%;
  min-height: 500px;
}

.editor-pane {
  flex: 1;
  min-width: 300px;
  overflow: auto;
}

.divider {
  width: 8px;
  background: #f0f0f0;
  cursor: col-resize;
  transition: background 0.2s;
}

.divider:hover {
  background: #ddd;
}

.preview-pane {
  flex: 1;
  min-width: 300px;
  overflow: auto;
  background: #f9f9f9;
}

.split-view.preview-only .editor-pane {
  display: none;
}

.split-view.preview-only .divider {
  display: none;
}
</style>
