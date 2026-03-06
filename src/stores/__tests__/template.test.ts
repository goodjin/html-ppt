import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTemplateStore } from '../template'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => { store[key] = value }),
    clear: () => { store = {} }
  }
})()

Object.defineProperty(global, 'localStorage', { value: localStorageMock })

describe('useTemplateStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorageMock.clear()
  })

  it('should load templates on mount', async () => {
    const store = useTemplateStore()
    await store.loadTemplates()

    expect(store.templates.length).toBeGreaterThan(0)
  })

  it('should create template', async () => {
    const store = useTemplateStore()

    const template = await store.createTemplate({
      name: 'Test Template',
      category: 'tech' as any,
      content: '# Test'
    })

    expect(template.name).toBe('Test Template')
    expect(store.templates.length).toBeGreaterThan(0)
  })

  it('should update template', async () => {
    const store = useTemplateStore()
    await store.loadTemplates()

    const template = store.templates[0]
    await store.updateTemplate(template.id, { name: 'Updated Name' })

    expect(store.templates[0].name).toBe('Updated Name')
  })

  it('should delete template', async () => {
    const store = useTemplateStore()
    await store.loadTemplates()

    const initialCount = store.templates.length
    const template = store.templates[0]

    await store.deleteTemplate(template.id)

    expect(store.templates.length).toBe(initialCount - 1)
  })

  it('should duplicate template', async () => {
    const store = useTemplateStore()
    await store.loadTemplates()

    const template = store.templates[0]
    const initialCount = store.templates.length

    await store.duplicateTemplate(template.id, 'Duplicated')

    expect(store.templates.length).toBe(initialCount + 1)
  })

  it('should filter by category', async () => {
    const store = useTemplateStore()
    await store.loadTemplates()

    store.setCategory('tech')
    expect(store.filteredTemplates.every(t => t.category === 'tech')).toBe(true)

    store.setCategory(null)
    expect(store.filteredTemplates.length).toBe(store.templates.length)
  })
})
