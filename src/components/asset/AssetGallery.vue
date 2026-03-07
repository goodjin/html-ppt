<template>
  <div class="asset-gallery">
    <div class="gallery-grid">
      <div
        v-for="asset in assets"
        :key="asset.id"
        class="asset-item"
        :class="{ selected: selectedIds.includes(asset.id) }"
        @click="selectAsset(asset)"
      >
        <img v-if="asset.thumbnail" :src="asset.thumbnail" :alt="asset.name" />
        <div v-else class="asset-placeholder">📄</div>
        <div class="asset-name">{{ asset.name }}</div>
        <button class="delete-btn" @click.stop="deleteAsset(asset.id)">×</button>
      </div>
    </div>

    <div v-if="assets.length === 0" class="empty">
      暂无素材
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { assetService } from '@/services/AssetService'
import type { Asset } from '@/types/asset'

const props = defineProps<{
  multiple?: boolean
}>()

const emit = defineEmits<{
  select: [asset: Asset | Asset[]]
}>()

const assets = ref<Asset[]>([])
const selectedIds = ref<string[]>([])

async function loadAssets() {
  assets.value = await assetService.getAssets()
}

function selectAsset(asset: Asset) {
  if (props.multiple) {
    const index = selectedIds.value.indexOf(asset.id)
    if (index > -1) {
      selectedIds.value.splice(index, 1)
    } else {
      selectedIds.value.push(asset.id)
    }
    emit('select', assets.value.filter(a => selectedIds.value.includes(a.id)))
  } else {
    emit('select', asset)
  }
}

async function deleteAsset(id: string) {
  if (confirm('确定删除此素材?')) {
    await assetService.delete(id)
    await loadAssets()
  }
}

onMounted(() => {
  loadAssets()
})
</script>

<style scoped>
.asset-gallery {
  padding: 1rem;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
}

.asset-item {
  position: relative;
  border: 2px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s;
}

.asset-item:hover {
  border-color: #4a90d9;
}

.asset-item.selected {
  border-color: #4a90d9;
  background: #f0f7ff;
}

.asset-item img {
  width: 100%;
  height: 80px;
  object-fit: cover;
}

.asset-placeholder {
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  font-size: 2rem;
}

.asset-name {
  padding: 0.5rem;
  font-size: 0.8rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.delete-btn {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 20px;
  height: 20px;
  padding: 0;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 14px;
  line-height: 1;
  opacity: 0;
  transition: opacity 0.2s;
}

.asset-item:hover .delete-btn {
  opacity: 1;
}

.empty {
  text-align: center;
  padding: 2rem;
  color: #999;
}
</style>
