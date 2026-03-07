<template>
  <div class="markdown-editor">
    <div class="editor-toolbar">
      <button @click="insertHeading" title="标题">H</button>
      <button @click="insertBold" title="粗体"><strong>B</strong></button>
      <button @click="insertItalic" title="斜体"><em>I</em></button>
      <button @click="insertCode" title="代码">&lt;/&gt;</button>
      <button @click="insertList" title="列表">•</button>
      <button @click="insertLink" title="链接">🔗</button>
    </div>
    <textarea
      ref="textareaRef"
      :value="modelValue"
      @input="onInput"
      :placeholder="placeholder"
      class="editor-textarea"
    ></textarea>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(defineProps<{
  modelValue: string
  placeholder?: string
}>(), {
  placeholder: '使用 Markdown 编写内容...'
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const textareaRef = ref<HTMLTextAreaElement | null>(null)

function onInput(e: Event) {
  const target = e.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
}

function insertText(before: string, after: string = '') {
  const textarea = textareaRef.value
  if (!textarea) return

  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const text = props.modelValue
  const selected = text.substring(start, end)

  const newText = text.substring(0, start) + before + selected + after + text.substring(end)
  emit('update:modelValue', newText)

  // Restore cursor position
  setTimeout(() => {
    textarea.focus()
    textarea.setSelectionRange(start + before.length, start + before.length + selected.length)
  }, 0)
}

function insertHeading() {
  insertText('## ')
}

function insertBold() {
  insertText('**', '**')
}

function insertItalic() {
  insertText('*', '*')
}

function insertCode() {
  insertText('`', '`')
}

function insertList() {
  insertText('- ')
}

function insertLink() {
  insertText('[', '](url)')
}
</script>

<style scoped>
.markdown-editor {
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
}

.editor-toolbar {
  display: flex;
  gap: 4px;
  padding: 8px;
  background: #f5f5f5;
  border-bottom: 1px solid #ddd;
}

.editor-toolbar button {
  padding: 4px 8px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 3px;
  font-size: 12px;
  min-width: 28px;
}

.editor-toolbar button:hover {
  background: #e9ecef;
}

.editor-textarea {
  width: 100%;
  min-height: 300px;
  padding: 12px;
  border: none;
  resize: vertical;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 14px;
  line-height: 1.6;
}

.editor-textarea:focus {
  outline: none;
}
</style>
