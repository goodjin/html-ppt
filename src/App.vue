<template>
  <div id="app">
    <header class="app-header">
      <h1>Web PPT</h1>
      <nav>
        <router-link to="/templates">模板</router-link>
        <router-link to="/presentations">演示</router-link>
        <router-link to="/assets">素材</router-link>
        <router-link to="/theme">主题</router-link>
      </nav>
    </header>
    <main class="app-main">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  background: #fff;
  border-bottom: 1px solid #eee;
}

.app-header h1 {
  margin: 0;
  font-size: 1.5rem;
}

.app-header nav {
  margin-left: 2rem;
}

.app-header nav a {
  margin-right: 1rem;
  text-decoration: none;
  color: #666;
}

.app-header nav a.router-link-active {
  color: #333;
  font-weight: bold;
}

.app-main {
  padding: 2rem;
}
</style>
