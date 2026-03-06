<template>
  <div class="template-edit-view">
    <div class="toolbar">
      <router-link to="/templates">
        <button class="secondary">← 返回</button>
      </router-link>
      <h2>{{ isNew ? '新建模板' : '编辑模板' }}</h2>
      <button @click="save">保存</button>
    </div>

    <div class="form">
      <div class="form-group">
        <label>模板名称</label>
        <input v-model="form.name" placeholder="请输入模板名称" />
      </div>

      <div class="form-group">
        <label>描述</label>
        <textarea v-model="form.description" placeholder="请输入模板描述" rows="2" />
      </div>

      <div class="form-group">
        <label>分类</label>
        <select v-model="form.category">
          <option v-for="cat in categories" :key="cat.value" :value="cat.value">
            {{ cat.label }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label>内容 (Markdown)</label>
        <textarea
          v-model="form.content"
          placeholder="# 标题&#10;&#10;内容..."
          rows="20"
          class="content-editor"
        />
      </div>

      <div class="preview-section" v-if="form.content">
        <h3>预览</h3>
        <div class="preview-content" v-html="previewHtml"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTemplateStore } from '@/stores/template'
import { TemplateCategory, CategoryLabels, type CreateTemplateDto, type UpdateTemplateDto } from '@/types/template'
import { renderMarkdown } from '@/utils/markdown'

const route = useRoute()
const router = useRouter()
const store = useTemplateStore()

const isNew = route.path === '/templates/new'
const templateId = route.params.id as string

const form = ref<CreateTemplateDto>({
  name: '',
  description: '',
  category: TemplateCategory.GENERAL,
  content: '# 标题\n\n开始编写您的演示文稿...'
})

const categories = Object.values(TemplateCategory).map(cat => ({
  value: cat,
  label: CategoryLabels[cat]
}))

const previewHtml = computed(() => {
  try {
    return renderMarkdown(form.value.content)
  } catch {
    return form.value.content
  }
})

async function save() {
  if (!form.value.name) {
    alert('请输入模板名称')
    return
  }

  try {
    if (isNew) {
      await store.createTemplate(form.value)
    } else {
      const updateData: UpdateTemplateDto = {
        name: form.value.name,
        description: form.value.description,
        category: form.value.category,
        content: form.value.content
      }
      await store.updateTemplate(templateId, updateData)
    }
    router.push('/templates')
  } catch (e) {
    alert('保存失败: ' + (e as Error).message)
  }
}

onMounted(async () => {
  await store.loadTemplates()
  if (!isNew) {
    const template = store.templates.find(t => t.id === templateId)
    if (template) {
      form.value = {
        name: template.name,
        description: template.description || '',
        category: template.category,
        content: template.content
      }
    } else {
      router.push('/templates')
    }
  }
})
</script>

<style scoped>
.template-edit-view {
  max-width: 900px;
  margin: 0 auto;
}

.toolbar {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.toolbar h2 {
  flex: 1;
  margin: 0;
}

.form {
  background: #fff;
  padding: 1.5rem;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
}

.content-editor {
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 14px;
  line-height: 1.5;
}

.preview-section {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #eee;
}

.preview-section h3 {
  margin-bottom: 1rem;
}

.preview-content {
  padding: 1.5rem;
  background: #f9f9f9;
  border-radius: 4px;
  min-height: 200px;
}

.preview-content :deep(h1) { font-size: 2em; margin: 0.5em 0; }
.preview-content :deep(h2) { font-size: 1.5em; margin: 0.5em 0; }
.preview-content :deep(p) { margin: 0.5em 0; }
</style>
