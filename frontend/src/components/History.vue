<script lang="ts" setup>

const props = defineProps<{
  data: Array<number>
}>()

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function clip(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function computeSize(d: number): number {
  const minSize = 3;
  const maxSize = 10;
  const size = minSize + (maxSize - minSize) * (clip(d, 5000, 25000) - 5000)/(20000);
  return size;
}

</script>

<template>
<div class="history">
  <span v-for="(item, key) in props.data" :key="key" class="dot" :style="`height: ${computeSize(item)}px; width: ${computeSize(item)}px;`"></span>
</div>
</template>

<style lang="scss" scoped>
.history {
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--height-input);
  gap: 5px;
}

.dot {
  display: inline-flex;
  background-color: currentColor;
  border-radius: 50%;
  display: inline-flex;
}
</style>
