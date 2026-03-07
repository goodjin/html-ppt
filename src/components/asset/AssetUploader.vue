<template>
  <div
    class="asset-uploader"
    :class="{ 'drag-over': isDragOver }"
    @dragover.prevent="onDragOver"
    @dragleave="onDragLeave"
    @drop.prevent="onDrop"
    @click="openFileDialog"
  >
    <input
      ref="fileInput"
      type="file"
      multiple
      accept="image/*"
      @change="onFileSelect"
      style="display: none"
    />
    <div class="upload-content">
      <div class="upload-icon">📁</div>
      <p>拖拽文件到此处，或点击选择</p>
      <small>支持: jpg, png, gif, svg (最大10MB)</small>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { assetService } from '@/services/AssetService'

const emit = defineEmits<{
  uploaded: [assets: any[]]
  error: [message: string]
}>()

const fileInput = ref<HTMLInputElement | null>(null)
const isDragOver = ref(false)

function openFileDialog() {
  fileInput.value?.click()
}

function onDragOver() {
  isDragOver.value = true
}

function onDragLeave() {
  isDragOver.value = false
}

async function onDrop(e: DragEvent) {
  isDragOver.value = false
  const files = e.dataTransfer?.files
  if (files) {
    await uploadFiles(Array.from(files))
  }
}

async function onFileSelect(e: Event) {
  const target = e.target as HTMLInputElement
  const files = target.files
  if (files) {
    await uploadFiles(Array.from(files))
    target.value = ''
  }
}

async function uploadFiles(files: File[]) {
  try {
    const assets = await assetService.uploadMultiple(files)
    emit('uploaded', assets)
  } catch (e: any) {
    emit('error', e.message)
  }
}
</script>

<style scoped>
.asset-uploader {
  border: 2px dashed #ddd;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
}

.asset-uploader:hover,
.asset-uploader.drag-over {
  border-color: #4a90d9;
  background: #f8f9fa;
}

.upload-content {
  pointer-events: none;
}

.upload-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.upload-content p {
  margin: 0;
  color: #666;
}

.upload-content small {
  color: #999;
}
</style>
