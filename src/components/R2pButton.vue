<template>
  <button class="r2p-button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
@import '../theme/index.scss';

.r2p-button {
  @extend .font-secondary;
  position: relative;
  padding: 10px;
  text-transform: uppercase;
  background: transparent;
  color: $color-white;

  &:hover {
    transition: all .3s ease;
    transform: translateY(-2px);
    text-shadow: 0px 0px 2px $color-white;
  }
}
</style>
