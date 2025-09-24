<script lang="ts" setup>

const props = defineProps<{
  history: Array<number>
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
  const size = minSize + (maxSize - minSize) * (clip(d, 5, 25) - 5)/20;
  return size;
}
</script>

<template>
<div class="history">
  <span v-for="(item, key) in props.history" :key="key" class="dot" :data-size="computeSize(item)"></span>
</div>
</template>

<style lang="scss" scoped>
.history {
  display: flex;
  align-items: center;
  justify-content: center;
}

.dot {
  margin: 5px;
  height: attr(data-size px);
  width: attr(data-size px);
  background-color: #FFF;
  border-radius: 50%;
  display: inline-flex;
}
</style>
