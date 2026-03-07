import { ref, computed, onUnmounted } from 'vue'

export function useTimer() {
  const elapsed = ref(0)
  const isRunning = ref(false)
  const isPaused = ref(false)

  let intervalId: ReturnType<typeof setInterval> | null = null

  function start() {
    if (isRunning.value) return
    isRunning.value = true
    isPaused.value = false

    intervalId = setInterval(() => {
      elapsed.value++
    }, 1000)
  }

  function pause() {
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
    isRunning.value = false
    isPaused.value = true
  }

  function reset() {
    pause()
    elapsed.value = 0
  }

  function formatTime(seconds: number): string {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const formattedTime = computed(() => formatTime(elapsed.value))

  onUnmounted(() => {
    if (intervalId) {
      clearInterval(intervalId)
    }
  })

  return {
    elapsed,
    isRunning,
    isPaused,
    formattedTime,
    start,
    pause,
    reset,
    formatTime
  }
}
