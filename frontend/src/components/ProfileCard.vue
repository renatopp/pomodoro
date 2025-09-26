<script lang="ts" setup>
import store, { Profile } from '../store';
import InputRange from '../components/InputRange.vue';
import InputColor from '../components/InputColor.vue';
import InputText from '../components/InputText.vue';
import formatTime from 'format-duration'
import { ref, watch } from 'vue';

const model = defineModel({
  type: Profile,
  required: true
})

const bg = ref(model.value.color)
const fg = ref(store.getTextColor(bg.value)[0])

watch(() => model.value.color, () => {
  bg.value = model.value.color
  fg.value = store.getTextColor(bg.value)[0]
}, { immediate: true })
watch(() => store.state.settings.displayLightColor, () => {
  fg.value = store.getTextColor(bg.value)[0]
}, { immediate: true })
watch(() => store.state.settings.displayDarkColor, () => {
  fg.value = store.getTextColor(bg.value)[0]
}, { immediate: true })

</script>

<template>
  <div class="component" :style="`background-color: ${bg}; color: ${fg}`">
    <input-color v-model="model.color" class="component__color"/>
    <input-text v-model="model.name" class="component__name"/>
    <span class="component__duration-label">{{ formatTime(model.duration, { leading: true }) }}</span>
    <input-range
      :min="60*1000"
      :max="60*60*1000"
      :step="60*1000"
      :show-input="false"
      v-model="model.duration"
      class="component__duration-range" />

  </div>
</template>


<style lang="scss" scoped>
@use "sass:color";

.component {
  border-radius: var(--radius-md);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: var(--spacing-md);

  &__color {
    transform: translateX(5px);
  }

  &__name {
    text-align: center;
    color: currentColor;
    background-color: transparent;
  }

  &__duration-label {
    font-size: var(--font-size-xl);
    font-family: var(--font-family-display);
    user-select: none;
  }
}
</style>