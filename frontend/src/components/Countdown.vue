<script lang="ts" setup>
import { ref, watch, computed } from 'vue';
import formatTime from 'format-duration'

const props = defineProps<{
  time: number
  running: boolean
}>()

const formattedTime = computed(() => {
  return formatTime(props.time, { leading: true })
})
</script>

<template>
  <span
    :class="['countdown', { 'countdown--stopped': !props.running }]"
  >{{ formattedTime }}</span>
</template>

<style lang="scss" scoped>
.countdown {
  margin: auto;
  text-align: center;
  justify-content: center;
  font-size: 8rem;
  font-family: 'Anton', sans-serif;
  font-weight: 400;
  line-height: 1;
}
.countdown--stopped {
  animation: blink-animation 3s ease-out 0s infinite;
}

@keyframes blink-animation {
  1% { opacity: 1; }
  40% { opacity: 0.65; }
  50% { opacity: 0.65; }
  90% { opacity: 1; }
}
</style>
