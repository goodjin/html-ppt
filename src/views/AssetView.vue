<template>
  <div class="asset-view">
    <div class="toolbar">
      <router-link to="/templates">
        <button class="secondary">← 返回</button>
      </router-link>
      <h2>素材管理</h2>
    </div>

    <div class="content">
      <div class="upload-section">
        <AssetUploader @uploaded="onUploaded" @error="onError" />
      </div>

      <div class="gallery-section">
        <h3>素材库</h3>
        <AssetGallery />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AssetUploader from '@/components/asset/AssetUploader.vue'
import AssetGallery from '@/components/asset/AssetGallery.vue'

function onUploaded(assets: any[]) {
  console.log('上传成功:', assets)
}

function onError(message: string) {
  alert(message)
}
</script>

<style scoped>
.asset-view {
  max-width: 1200px;
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
  display: grid;
  gap: 2rem;
}

.upload-section {
  background: #fff;
  padding: 1.5rem;
  border-radius: 8px;
}

.gallery-section {
  background: #fff;
  padding: 1.5rem;
  border-radius: 8px;
}

.gallery-section h3 {
  margin: 0 0 1rem;
}
</style>
