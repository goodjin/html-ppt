import { ref, watch, shallowRef } from 'vue'
import { renderMarkdown } from '@/utils/markdown'

export function usePreview() {
  const content = ref('')
  const html = ref('')
  const isRendering = ref(false)
  const error = ref<string | null>(null)
  const revealInstance = shallowRef<any>(null)

  // Debounced render
  let renderTimer: ReturnType<typeof setTimeout> | null = null

  function render(markdown: string) {
    if (renderTimer) clearTimeout(renderTimer)

    renderTimer = setTimeout(() => {
      isRendering.value = true
      error.value = null

      try {
        html.value = renderMarkdown(markdown)
      } catch (e: any) {
        error.value = e.message
        html.value = markdown // Fallback to raw content
      } finally {
        isRendering.value = false
      }
    }, 300)
  }

  // Watch content changes
  watch(content, (newContent) => {
    render(newContent)
  })

  function initReveal(container: HTMLElement) {
    // Dynamic import to avoid SSR issues
    import('reveal.js').then((RevealModule) => {
      const Reveal = RevealModule.default
      revealInstance.value = new Reveal(container, {
        hash: true,
        slideNumber: 'c/t',
        progress: true,
        center: true,
        transition: 'slide'
      })
      revealInstance.value.initialize()
    })
  }

  function sync() {
    if (revealInstance.value) {
      revealInstance.value.sync()
    }
  }

  function slide(index: number) {
    if (revealInstance.value) {
      revealInstance.value.slide(index)
    }
  }

  function fullscreen() {
    if (revealInstance.value) {
      revealInstance.value.toggleFullscreen()
    }
  }

  // Initialize with content
  if (content.value) {
    render(content.value)
  }

  return {
    content,
    html,
    isRendering,
    error,
    revealInstance,
    render,
    initReveal,
    sync,
    slide,
    fullscreen
  }
}
