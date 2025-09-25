<script setup>
import { computed, ref} from 'vue'
import { Vue3ColorPicker } from '@cyhnkckali/vue3-color-picker';
import '@cyhnkckali/vue3-color-picker/dist/style.css'

const model = defineModel({
  type: String,
  required: true
})

const emit = defineEmits(['change'])

const open = ref(false)
function toggle() {
  open.value = !open.value
}
</script>


<template>
  <div class="form-element">
    <div v-if="open" class="overlay" @click="toggle"></div>
    <div class="toggle" :style="`background-color: ${model}`" @click="toggle"></div>
    <Vue3ColorPicker
      v-if="open"  
      v-model="model"
      mode="solid"
      :show-alpha="false"
      :show-buttons="false"
      :show-picker-mode="false"
      :showColorList="false"
      :showEyeDrop="false"
      class="color-picker"
      type="HEX"
      @on-change="() => emit('change')"
    />
  </div>
</template>


<style lang="scss" scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 5;
}

.form-element {
  position: relative;
  
  .toggle {
    cursor: pointer;
    display: inline-flex;   
    min-width: var(--height-input);
    min-height: var(--height-input);
    border-radius: 100%;
    border: 1px solid #FFFFFF66;
  }

}

.color-picker {
  position: absolute;
  z-index: 10;
  margin-top: 5px;
}

</style>