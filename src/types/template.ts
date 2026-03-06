// Template category enum
export enum TemplateCategory {
  TECH = 'tech',
  BUSINESS = 'business',
  EDUCATION = 'education',
  GENERAL = 'general'
}

// Template entity
export interface PresentationTemplate {
  id: string
  name: string
  description?: string
  category: TemplateCategory
  content: string
  thumbnail?: string
  createdAt: string
  updatedAt: string
}

// DTOs
export interface CreateTemplateDto {
  name: string
  description?: string
  category: TemplateCategory
  content: string
}

export interface UpdateTemplateDto {
  name?: string
  description?: string
  category?: TemplateCategory
  content?: string
}

// Category labels for display
export const CategoryLabels: Record<TemplateCategory, string> = {
  [TemplateCategory.TECH]: '技术演讲',
  [TemplateCategory.BUSINESS]: '商务演示',
  [TemplateCategory.EDUCATION]: '教育培训',
  [TemplateCategory.GENERAL]: '通用'
}
