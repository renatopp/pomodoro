<script setup>
const { history } = defineProps(['history'])
</script>

<template>
  <div class="r2p-history">
    <span v-for="(item, key) in history" :key="key" class="dot" :class="item"></span>
  </div>
</template>

<style lang="scss" scoped>
.r2p-history {
  display: flex;
  align-items: center;
  justify-content: center;
}
.dot {
  margin: 5px;
  height: 10px;
  width: 10px;
  background-color: #FFF;
  border-radius: 50%;
  display: inline-flex;
  &.short {
    height: 3px;
    width: 3px;
  }
  &.long {
    height: 6px;
    width: 6px;
  }
}
</style>