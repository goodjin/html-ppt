<template>
  <div class="theme-view">
    <div class="toolbar">
      <router-link to="/templates">
        <button class="secondary">← 返回</button>
      </router-link>
      <h2>主题设置</h2>
    </div>

    <div class="content">
      <ThemeSelector />
    </div>
  </div>
</template>

<script setup lang="ts">
import ThemeSelector from '@/components/theme/ThemeSelector.vue'
</script>

<style scoped>
.theme-view {
  max-width: 800px;
  margin: 0 auto;
}

.toolbar {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.toolbar h2 {
  margin: 0;
}

.content {
  background: #fff;
  padding: 1.5rem;
  border-radius: 8px;
}
</style>
