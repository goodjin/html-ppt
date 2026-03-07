import { type PresentationTemplate, type CreateTemplateDto, type UpdateTemplateDto, TemplateCategory } from '@/types/template'

const STORAGE_KEY = 'web-ppt-templates'

// Default templates
const defaultTemplates: PresentationTemplate[] = [
  {
    id: 'default-tech',
    name: '技术演讲',
    description: '适合技术分享、代码演示',
    category: TemplateCategory.TECH,
    content: `# 技术分享

## 引言

这是一个技术演讲的模板

## 代码示例

\`\`\`javascript
function hello() {
  console.log('Hello World!');
}
\`\`\`

## 总结

谢谢大家
`,
    createdAt: '2026-03-06T00:00:00Z',
    updatedAt: '2026-03-06T00:00:00Z'
  },
  {
    id: 'default-business',
    name: '商务演示',
    description: '适合商业提案、项目汇报',
    category: TemplateCategory.BUSINESS,
    content: `# 商务演示

## 项目概述

介绍您的项目

## 目标

- 目标1
- 目标2
- 目标3

## 总结

感谢聆听
`,
    createdAt: '2026-03-06T00:00:00Z',
    updatedAt: '2026-03-06T00:00:00Z'
  },
  {
    id: 'default-education',
    name: '教育培训',
    description: '适合课程教学、培训演示',
    category: TemplateCategory.EDUCATION,
    content: `# 课程标题

## 本节课要点

1. 要点1
2. 要点2
3. 要点3

## 练习

请大家动手实践

## 下节预告

下节课将介绍...
`,
    createdAt: '2026-03-06T00:00:00Z',
    updatedAt: '2026-03-06T00:00:00Z'
  }
]

export class TemplateService {
  private loadTemplates(): PresentationTemplate[] {
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) {
      // Initialize with default templates
      this.saveTemplates(defaultTemplates)
      return defaultTemplates
    }
    return JSON.parse(data)
  }

  private saveTemplates(templates: PresentationTemplate[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(templates))
  }

  async getTemplates(): Promise<PresentationTemplate[]> {
    return this.loadTemplates()
  }

  async getTemplatesByCategory(category: TemplateCategory): Promise<PresentationTemplate[]> {
    const templates = this.loadTemplates()
    return templates.filter(t => t.category === category)
  }

  async getTemplate(id: string): Promise<PresentationTemplate | null> {
    const templates = this.loadTemplates()
    return templates.find(t => t.id === id) || null
  }

  async createTemplate(dto: CreateTemplateDto): Promise<PresentationTemplate> {
    const template: PresentationTemplate = {
      id: crypto.randomUUID(),
      name: dto.name,
      description: dto.description,
      category: dto.category,
      content: dto.content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    const templates = this.loadTemplates()
    templates.push(template)
    this.saveTemplates(templates)
    return template
  }

  async updateTemplate(id: string, dto: UpdateTemplateDto): Promise<PresentationTemplate> {
    const templates = this.loadTemplates()
    const index = templates.findIndex(t => t.id === id)
    if (index === -1) throw new Error('Template not found')

    templates[index] = {
      ...templates[index],
      ...dto,
      updatedAt: new Date().toISOString()
    }
    this.saveTemplates(templates)
    return templates[index]
  }

  async deleteTemplate(id: string): Promise<void> {
    const templates = this.loadTemplates().filter(t => t.id !== id)
    this.saveTemplates(templates)
  }

  async duplicateTemplate(id: string, newName: string): Promise<PresentationTemplate> {
    const template = await this.getTemplate(id)
    if (!template) throw new Error('Template not found')

    return this.createTemplate({
      name: newName,
      description: template.description,
      category: template.category,
      content: template.content
    })
  }
}

export const templateService = new TemplateService()
