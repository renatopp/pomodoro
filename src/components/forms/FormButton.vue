<script setup>
const emit = defineEmits('click')

function emitValue() {
  emit('click')
}
</script>


<template>
  <span class="form-element">
    <button class="form-element__button" @input="emitValue"><slot></slot></button>
  </span>
</template>


<style lang="scss" scoped>
.form-element__button {
  padding: 0 1rem;
  height: 2rem;
  border: 0;
  border-radius: 5px;
  color: fade-out($color: #000000, $amount: .2);
  width: 160px;

  &:hover {
    box-shadow: 0 0 3px 0px white;
  }
  &:active {
    box-shadow: 0 0 3px -1px black;
  }
}
</style>