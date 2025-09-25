<script setup>
import { computed} from 'vue'
import { Vue3ColorPicker } from '@cyhnkckali/vue3-color-picker';
import '@cyhnkckali/vue3-color-picker/dist/style.css'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
})

function emitValue(e) {
  emit('update:modelValue', value)
}
</script>


<template>
  <div class="form-element" :style="`background-color: ${props.modelValue}`">
    <!-- <Vue3ColorPicker
      v-model="props.modelValue"
      mode="solid"
      :showColorList="false"
      :showEyeDrop="false"
      type="HEX"
    /> -->
  </div>
  <!-- div -->
  <!-- <Vue3ColorPicker
    v-model="props.modelValue"
    mode="solid"
    :showColorList="false"
    :showEyeDrop="false"
    type="HEX"
  /> -->
</template>


<style lang="scss" scoped>
.form-element {
  display: inline-flex;
  min-width: 2rem;
  min-height: 2rem;
  border-radius: 100%;
}

</style>