<script lang="ts" setup>
import { computed, ref} from 'vue'
// import { Vue3ColorPicker } from '@cyhnkckali/vue3-color-picker';
// import '@cyhnkckali/vue3-color-picker/dist/style.css'
import { ColorPicker } from "vue3-colorpicker";
import "vue3-colorpicker/style.css";

const model = defineModel({
  type: String,
  required: true
})

const emit = defineEmits(['change'])
</script>


<template>
  <div class="form-element">
    <color-picker
      shape="circle"
      format="hex"
      picker-type="chrome"
      use-type="pure"
      :disable-history="true"
      :disable-alpha="true"
      :debounce="10"
      v-model:pure-color="model"
      @update:pure-color="() => emit('change')"
    />
  </div>
</template>


<style lang="scss" scoped>
</style>