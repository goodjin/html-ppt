<template>
  <div class="template-list-view">
    <div class="toolbar">
      <h2>模板列表</h2>
      <router-link to="/templates/new">
        <button>+ 新建模板</button>
      </router-link>
    </div>

    <div class="category-filter">
      <button
        :class="{ active: !selectedCategory }"
        @click="setCategory(null)"
      >
        全部
      </button>
      <button
        v-for="category in categories"
        :key="category.value"
        :class="{ active: selectedCategory === category.value }"
        @click="setCategory(category.value)"
      >
        {{ category.label }}
      </button>
    </div>

    <div class="template-grid" v-if="templates.length">
      <div
        v-for="template in templates"
        :key="template.id"
        class="template-card"
      >
        <div class="card-preview" @click="previewTemplate(template.id)">
          <div class="preview-content" v-html="getPreviewHtml(template.content)"></div>
          <div class="preview-overlay">预览</div>
        </div>
        <div class="card-content">
          <h3>{{ template.name }}</h3>
          <p>{{ template.description || '暂无描述' }}</p>
          <span class="category-tag">{{ getCategoryLabel(template.category) }}</span>
        </div>
        <div class="card-actions">
          <router-link :to="`/templates/${template.id}/preview`">
            <button>预览</button>
          </router-link>
          <router-link :to="`/templates/${template.id}/edit`">
            <button class="secondary">编辑</button>
          </router-link>
          <button class="danger" @click="remove(template.id)">删除</button>
        </div>
      </div>
    </div>

    <div class="empty" v-else>
      <p>暂无模板</p>
      <router-link to="/templates/new">
        <button>创建第一个模板</button>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTemplateStore } from '@/stores/template'
import { storeToRefs } from 'pinia'
import { TemplateCategory, CategoryLabels } from '@/types/template'
import { renderMarkdown } from '@/utils/markdown'

const router = useRouter()
const store = useTemplateStore()
const { templates, selectedCategory } = storeToRefs(store)

const categories = Object.values(TemplateCategory).map(cat => ({
  value: cat,
  label: CategoryLabels[cat]
}))

function setCategory(category: TemplateCategory | null) {
  store.setCategory(category)
}

function getCategoryLabel(category: TemplateCategory) {
  return CategoryLabels[category]
}

function getPreviewHtml(content: string): string {
  // Extract first slide content
  const slides = content.split(/^---$/m)
  const firstSlide = slides[1] || slides[0] || ''
  // Simple render for preview
  return renderMarkdown(firstSlide).replace(/<h1>/g, '<h4>').replace(/<\/h1>/g, '</h4>')
}

function previewTemplate(id: string) {
  router.push(`/templates/${id}/preview`)
}

async function remove(id: string) {
  if (confirm('确定要删除这个模板吗？')) {
    await store.deleteTemplate(id)
  }
}

onMounted(() => {
  store.loadTemplates()
})
</script>

<style scoped>
.template-list-view {
  max-width: 1200px;
  margin: 0 auto;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.toolbar h2 {
  margin: 0;
}

.category-filter {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.category-filter button {
  background: #fff;
  color: #666;
  border: 1px solid #ddd;
}

.category-filter button.active {
  background: #4a90d9;
  color: #fff;
  border-color: #4a90d9;
}

.template-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.template-card {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.card-preview {
  position: relative;
  height: 140px;
  background: #1a1a1a;
  overflow: hidden;
  cursor: pointer;
}

.preview-content {
  padding: 0.75rem;
  color: #fff;
  font-size: 0.6rem;
  line-height: 1.4;
  overflow: hidden;
}

.preview-content :deep(h4) {
  margin: 0 0 0.25rem;
  font-size: 0.75rem;
  color: #4a90d9;
}

.preview-content :deep(p) {
  margin: 0;
  color: #aaa;
  font-size: 0.55rem;
}

.preview-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1.2rem;
  opacity: 0;
  transition: opacity 0.2s;
}

.card-preview:hover .preview-overlay {
  opacity: 1;
}

.card-content {
  padding: 1rem 1.5rem;
}

.card-content h3 {
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
}

.card-content p {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.category-tag {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  background: #f0f0f0;
  border-radius: 4px;
  font-size: 0.8rem;
  color: #666;
}

.card-actions {
  display: flex;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem 1rem;
}

.card-actions button {
  flex: 1;
  font-size: 0.75rem;
  padding: 0.4rem 0.5rem;
}

.card-actions a {
  flex: 1;
}

.empty {
  text-align: center;
  padding: 4rem;
  background: #fff;
  border-radius: 8px;
}

.empty p {
  color: #999;
  margin-bottom: 1rem;
}
</style>
