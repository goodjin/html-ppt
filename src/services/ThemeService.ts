import { ref, computed } from 'vue'
import { presetThemes, type Theme, type ThemeStyles } from '@/types/theme'

const STORAGE_KEY = 'web-ppt-current-theme'
const CUSTOM_THEMES_KEY = 'web-ppt-custom-themes'

export function useThemeService() {
  const currentThemeId = ref<string>(
    localStorage.getItem(STORAGE_KEY) || 'black'
  )
  const customThemes = ref<Theme[]>([])

  const allThemes = computed(() => [...presetThemes, ...customThemes.value])

  const currentTheme = computed(() =>
    allThemes.value.find(t => t.id === currentThemeId.value) || presetThemes[0]
  )

  function getThemes(): Theme[] {
    return allThemes.value
  }

  function getCurrentTheme(): Theme {
    return currentTheme.value
  }

  function setTheme(themeId: string): void {
    const theme = allThemes.value.find(t => t.id === themeId)
    if (theme) {
      currentThemeId.value = themeId
      localStorage.setItem(STORAGE_KEY, themeId)
      applyTheme(theme)
    }
  }

  function customizeTheme(styles: Partial<ThemeStyles>): Theme {
    const customTheme: Theme = {
      id: `custom-${Date.now()}`,
      name: '自定义主题',
      type: 'custom',
      styles: {
        colors: styles.colors || currentTheme.value.styles.colors,
        fonts: styles.fonts || currentTheme.value.styles.fonts
      }
    }
    return customTheme
  }

  function saveCustomTheme(theme: Theme): void {
    const existing = customThemes.value.find(t => t.id === theme.id)
    if (existing) {
      Object.assign(existing, theme)
    } else {
      customThemes.value.push(theme)
    }
    localStorage.setItem(CUSTOM_THEMES_KEY, JSON.stringify(customThemes.value))
  }

  function exportTheme(theme: Theme): string {
    return JSON.stringify(theme, null, 2)
  }

  function applyTheme(theme: Theme): void {
    const root = document.documentElement
    const { colors, fonts } = theme.styles

    root.style.setProperty('--theme-primary', colors.primary)
    root.style.setProperty('--theme-secondary', colors.secondary)
    root.style.setProperty('--theme-background', colors.background)
    root.style.setProperty('--theme-text', colors.text)
    root.style.setProperty('--theme-accent', colors.accent)

    root.style.setProperty('--font-heading', fonts.heading)
    root.style.setProperty('--font-body', fonts.body)
    root.style.setProperty('--font-code', fonts.code)
  }

  // Load custom themes from storage
  function loadCustomThemes(): void {
    const stored = localStorage.getItem(CUSTOM_THEMES_KEY)
    if (stored) {
      try {
        customThemes.value = JSON.parse(stored)
      } catch {
        customThemes.value = []
      }
    }
  }

  // Initialize theme on load
  function initTheme(): void {
    loadCustomThemes()
    applyTheme(currentTheme.value)
  }

  return {
    themes: allThemes,
    currentTheme,
    getThemes,
    getCurrentTheme,
    setTheme,
    customizeTheme,
    saveCustomTheme,
    exportTheme,
    initTheme
  }
}
