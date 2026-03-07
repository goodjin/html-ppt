<template>
  <div class="theme-selector">
    <h3>选择主题</h3>
    <div class="theme-grid">
      <div
        v-for="theme in themes"
        :key="theme.id"
        class="theme-card"
        :class="{ active: currentThemeId === theme.id }"
        @click="selectTheme(theme.id)"
      >
        <div
          class="theme-preview"
          :style="{
            background: theme.styles.colors.background,
            borderColor: theme.styles.colors.accent
          }"
        >
          <span
            :style="{
              color: theme.styles.colors.text,
              fontFamily: theme.styles.fonts.heading
            }"
          >
            Aa
          </span>
        </div>
        <div class="theme-name">{{ theme.name }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useThemeService } from '@/services/ThemeService'
import { presetThemes } from '@/types/theme'

const { getThemes, getCurrentTheme, setTheme, initTheme } = useThemeService()

const themes = presetThemes
const currentThemeId = computed(() => getCurrentTheme().id)

function selectTheme(themeId: string) {
  setTheme(themeId)
}

onMounted(() => {
  initTheme()
})
</script>

<style scoped>
.theme-selector {
  padding: 1rem;
}

.theme-selector h3 {
  margin: 0 0 1rem;
}

.theme-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 1rem;
}

.theme-card {
  cursor: pointer;
  border: 2px solid transparent;
  border-radius: 8px;
  padding: 0.5rem;
  transition: all 0.2s;
}

.theme-card:hover {
  border-color: #ddd;
}

.theme-card.active {
  border-color: #4a90d9;
}

.theme-preview {
  height: 60px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  border: 2px solid transparent;
}

.theme-name {
  margin-top: 0.5rem;
  text-align: center;
  font-size: 0.85rem;
}
</style>
