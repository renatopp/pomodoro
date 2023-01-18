<script setup>
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: String,
})

function emitValue(e) {
  let value = e.target.value
  emit('update:modelValue', value)
}
</script>


<template>
  <span class="form-element">
    <input class="form-element__color" type="color" :value="modelValue" @input="emitValue" />
  </span>
</template>


<style lang="scss" scoped>
.form-element__color {
  width: 80px;
  height: 2rem;
  border: 0;
  border-radius: 5px;
  background: fade-out($color: white, $amount: .8);
}
</style>