<template>
  <div class="r2p-history">
    <span v-for="(item, key) in history" :key="key" class="dot" :class="item"></span>
  </div>
</template>

<script>
export default {
  props: {
    history: Array
  },
}
</script>

<style lang="scss" scoped>
.r2p-history {
  display: flex;
  align-items: center;
}

.dot {
  margin: 5px;
  height: 10px;
  width: 10px;
  background-color: #FFF;
  border-radius: 50%;
  display: inline-flex;

  &.short {
    height: 5px;
    width: 5px;
  }

  &.long {
    height: 7px;
    width: 7px;
  }
}
</style>