<template>
  <div class="slide-preview" ref="containerRef">
    <div v-if="isRendering" class="loading">
      渲染中...
    </div>
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    <div v-else class="reveal-wrapper" v-html="renderedHtml"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, nextTick, computed } from 'vue'
import { renderMarkdown } from '@/utils/markdown'

const props = defineProps<{
  content: string
}>()

const containerRef = ref<HTMLElement | null>(null)
const isRendering = ref(false)
const error = ref<string | null>(null)
const revealInstance = ref<any>(null)

const renderedHtml = computed(() => {
  try {
    return renderMarkdown(props.content || '')
  } catch (e: any) {
    return `<pre>${props.content}</pre>`
  }
})

onMounted(() => {
  nextTick(() => {
    if (containerRef.value) {
      import('reveal.js').then((RevealModule) => {
        const Reveal = RevealModule.default
        revealInstance.value = new Reveal(containerRef.value!, {
          hash: true,
          slideNumber: 'c/t',
          progress: true,
          center: true,
          transition: 'slide'
        })
        revealInstance.value.initialize()
      }).catch(() => {
        // Reveal.js not available
      })
    }
  })
})

onUnmounted(() => {
  if (revealInstance.value) {
    revealInstance.value.destroy()
  }
})
</script>

<style scoped>
.slide-preview {
  width: 100%;
  height: 100%;
  min-height: 400px;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
}

.loading, .error {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
  color: #999;
}

.error {
  color: #dc3545;
}

.reveal-wrapper {
  width: 100%;
  height: 100%;
}
</style>
