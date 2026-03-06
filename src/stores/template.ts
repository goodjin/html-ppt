import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { templateService } from '@/services/TemplateService'
import type { PresentationTemplate, CreateTemplateDto, UpdateTemplateDto, TemplateCategory } from '@/types/template'

export const useTemplateStore = defineStore('template', () => {
  const templates = ref<PresentationTemplate[]>([])
  const currentTemplate = ref<PresentationTemplate | null>(null)
  const isLoading = ref(false)
  const selectedCategory = ref<TemplateCategory | null>(null)

  const filteredTemplates = computed(() => {
    if (!selectedCategory.value) return templates.value
    return templates.value.filter(t => t.category === selectedCategory.value)
  })

  async function loadTemplates() {
    isLoading.value = true
    try {
      templates.value = await templateService.getTemplates()
    } finally {
      isLoading.value = false
    }
  }

  async function createTemplate(dto: CreateTemplateDto) {
    const template = await templateService.createTemplate(dto)
    templates.value.push(template)
    return template
  }

  async function updateTemplate(id: string, dto: UpdateTemplateDto) {
    const template = await templateService.updateTemplate(id, dto)
    const index = templates.value.findIndex(t => t.id === id)
    if (index !== -1) templates.value[index] = template
    return template
  }

  async function deleteTemplate(id: string) {
    await templateService.deleteTemplate(id)
    templates.value = templates.value.filter(t => t.id !== id)
  }

  async function duplicateTemplate(id: string, newName: string) {
    const template = await templateService.duplicateTemplate(id, newName)
    templates.value.push(template)
    return template
  }

  function setCategory(category: TemplateCategory | null) {
    selectedCategory.value = category
  }

  return {
    templates,
    currentTemplate,
    isLoading,
    selectedCategory,
    filteredTemplates,
    loadTemplates,
    createTemplate,
    updateTemplate,
    deleteTemplate,
    duplicateTemplate,
    setCategory
  }
})
