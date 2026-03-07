<template>
  <div class="reveal-preview" ref="revealRef">
    <div class="reveal" v-if="slides.length > 0">
      <div class="slides">
        <section v-for="(slide, index) in slides" :key="index" v-html="slide"></section>
      </div>
    </div>
    <div v-else class="empty-preview">
      <p>暂无内容</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, nextTick, onUnmounted } from 'vue'

const props = defineProps<{
  content: string
}>()

const revealRef = ref<HTMLElement | null>(null)
const slides = ref<string[]>([])
let revealInstance: any = null

// Parse slides from markdown content
function parseSlides(content: string): string[] {
  if (!content) return []

  // Split by --- separator
  const parts = content.split(/^---$/m)

  return parts.map(part => {
    // Basic markdown to HTML conversion
    let html = part
      // Headers
      .replace(/^### (.+)$/gm, '<h3>$1</h3>')
      .replace(/^## (.+)$/gm, '<h2>$1</h2>')
      .replace(/^# (.+)$/gm, '<h1>$1</h1>')
      // Bold and italic
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      // Code blocks
      .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>')
      // Inline code
      .replace(/`(.+?)`/g, '<code>$1</code>')
      // Lists
      .replace(/^- (.+)$/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
      // Numbered lists
      .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
      // Blockquotes
      .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
      // Line breaks
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>')

    // Wrap in paragraph if needed
    if (!html.startsWith('<')) {
      html = `<p>${html}</p>`
    }

    return html
  })
}

function initReveal() {
  if (!revealRef.value || slides.value.length === 0) return

  // Import Reveal.js dynamically
  import('reveal.js').then((RevealModule) => {
    const Reveal = RevealModule.default

    // Destroy existing instance
    if (revealInstance) {
      revealInstance.destroy()
    }

    // Create new instance
    revealInstance = new Reveal(revealRef.value!, {
      hash: true,
      slideNumber: 'c/t',
      progress: true,
      center: true,
      transition: 'slide',
      backgroundTransition: 'zoom'
    })

    revealInstance.initialize()
  }).catch(err => {
    console.error('Failed to load Reveal.js:', err)
  })
}

watch(() => props.content, (newContent) => {
  slides.value = parseSlides(newContent)
  nextTick(() => {
    if (revealInstance) {
      revealInstance.sync()
    } else {
      initReveal()
    }
  })
}, { immediate: true })

onMounted(() => {
  nextTick(() => {
    initReveal()
  })
})

onUnmounted(() => {
  if (revealInstance) {
    revealInstance.destroy()
  }
})
</script>

<style>
@import 'reveal.js/dist/reveal.css';
@import 'reveal.js/dist/theme/black.css';

.reveal-preview {
  width: 100%;
  height: 100%;
  min-height: 500px;
}

.reveal-preview .reveal {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

.reveal-preview .reveal h1 {
  font-size: 2.5em;
  color: #4a90d9;
}

.reveal-preview .reveal h2 {
  font-size: 1.8em;
}

.reveal-preview .reveal h3 {
  font-size: 1.3em;
}

.reveal-preview .reveal ul {
  list-style-type: disc;
}

.reveal-preview .reveal li {
  margin: 0.5em 0;
}

.reveal-preview .reveal pre {
  font-size: 0.6em;
  padding: 1em;
}

.reveal-preview .reveal code {
  font-family: 'Monaco', 'Menlo', monospace;
}

.reveal-preview .reveal blockquote {
  border-left: 4px solid #4a90d9;
  padding-left: 1em;
  font-style: italic;
}

.empty-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
  background: #1a1a1a;
  color: #fff;
}
</style>
