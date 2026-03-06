import { describe, it, expect, beforeEach, vi } from 'vitest'
import { TemplateService } from '../TemplateService'

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

describe('TemplateService', () => {
  let service: TemplateService

  beforeEach(() => {
    localStorageMock.clear()
    service = new TemplateService()
  })

  describe('getTemplates', () => {
    it('should return default templates on first load', async () => {
      const templates = await service.getTemplates()
      expect(templates.length).toBeGreaterThan(0)
    })

    it('should return stored templates', async () => {
      const mockTemplates = [{ id: '1', name: 'Test' }] as any
      localStorage.setItem('web-ppt-templates', JSON.stringify(mockTemplates))

      const templates = await service.getTemplates()
      expect(templates).toEqual(mockTemplates)
    })
  })

  describe('createTemplate', () => {
    it('should create a new template', async () => {
      const dto = {
        name: 'New Template',
        description: 'Test description',
        category: 'tech' as any,
        content: '# Hello'
      }

      const template = await service.createTemplate(dto)

      expect(template.name).toBe('New Template')
      expect(template.id).toBeDefined()
      expect(template.createdAt).toBeDefined()
    })
  })

  describe('updateTemplate', () => {
    it('should update existing template', async () => {
      const created = await service.createTemplate({
        name: 'Original',
        category: 'tech' as any,
        content: '# Original'
      })

      const updated = await service.updateTemplate(created.id, {
        name: 'Updated'
      })

      expect(updated.name).toBe('Updated')
      expect(updated.id).toBe(created.id)
    })

    it('should throw error for non-existent template', async () => {
      await expect(
        service.updateTemplate('non-existent', { name: 'Test' })
      ).rejects.toThrow('Template not found')
    })
  })

  describe('deleteTemplate', () => {
    it('should delete template', async () => {
      const created = await service.createTemplate({
        name: 'To Delete',
        category: 'tech' as any,
        content: '# Delete'
      })

      await service.deleteTemplate(created.id)

      const templates = await service.getTemplates()
      expect(templates.find(t => t.id === created.id)).toBeUndefined()
    })
  })

  describe('duplicateTemplate', () => {
    it('should duplicate template with new name', async () => {
      const original = await service.createTemplate({
        name: 'Original',
        category: 'tech' as any,
        content: '# Content'
      })

      const duplicate = await service.duplicateTemplate(original.id, 'Duplicate')

      expect(duplicate.name).toBe('Duplicate')
      expect(duplicate.id).not.toBe(original.id)
      expect(duplicate.content).toBe(original.content)
    })
  })

  describe('getTemplate', () => {
    it('should return template by id', async () => {
      const created = await service.createTemplate({
        name: 'Test',
        category: 'tech' as any,
        content: '# Test'
      })

      const found = await service.getTemplate(created.id)
      expect(found?.name).toBe('Test')
    })

    it('should return null for non-existent id', async () => {
      const found = await service.getTemplate('non-existent')
      expect(found).toBeNull()
    })
  })
})
