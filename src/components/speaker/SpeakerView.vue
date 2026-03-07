<template>
  <div class="speaker-view">
    <div class="speaker-header">
      <div class="timer">
        <span class="time">{{ formattedTime }}</span>
        <div class="timer-controls">
          <button @click="start" :disabled="isRunning">开始</button>
          <button @click="pause" :disabled="!isRunning">暂停</button>
          <button @click="reset" class="secondary">重置</button>
        </div>
      </div>
    </div>

    <div class="speaker-content">
      <div class="current-slide">
        <h4>当前页</h4>
        <div class="slide-preview" v-html="currentSlideHtml"></div>
      </div>

      <div class="next-slide">
        <h4>下一页</h4>
        <div class="slide-preview" v-html="nextSlideHtml"></div>
      </div>
    </div>

    <div class="speaker-notes" v-if="notes">
      <h4>备注</h4>
      <p>{{ notes }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTimer } from '@/composables/useTimer'

const props = defineProps<{
  currentSlideHtml: string
  nextSlideHtml: string
  notes?: string
}>()

const { elapsed, isRunning, isPaused, formattedTime, start, pause, reset } = useTimer()
</script>

<style scoped>
.speaker-view {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #1a1a1a;
  color: #fff;
  padding: 1rem;
}

.speaker-header {
  margin-bottom: 1rem;
}

.timer {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.time {
  font-size: 2rem;
  font-family: monospace;
}

.timer-controls {
  display: flex;
  gap: 0.5rem;
}

.timer-controls button {
  padding: 0.5rem 1rem;
}

.speaker-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  flex: 1;
}

.current-slide, .next-slide {
  background: #333;
  border-radius: 8px;
  padding: 1rem;
  overflow: auto;
}

.current-slide h4, .next-slide h4, .speaker-notes h4 {
  margin: 0 0 0.5rem;
  color: #888;
}

.slide-preview {
  min-height: 200px;
}

.speaker-notes {
  margin-top: 1rem;
  padding: 1rem;
  background: #333;
  border-radius: 8px;
}
</style>
