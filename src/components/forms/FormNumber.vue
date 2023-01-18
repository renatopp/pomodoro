<script setup>
import { computed} from 'vue'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  min: Number,
  max: Number,
  step: Number,
  modelValue: Number,
})


const min = computed(() => props.min ?? 0)
const max = computed(() => props.max ?? 100)
const step = computed(() => props.step ?? 1)

function emitValue(e) {
  let value = parseFloat(e.target.value) || 0
  emit('update:modelValue', value)
}
</script>


<template>
  <span class="form-element">
    <input :min="min" :max="max" :step="step" class="form-element__range" type="range" :value="modelValue" @input="emitValue"/>
    <input :min="min" :max="max" :step="step" class="form-element__number" type="number" :value="modelValue" @input="emitValue"/>
  </span>
</template>


<style lang="scss" scoped>
.form-element {
  justify-content: center;
  align-items: center;
}

.form-element__range {
  appearance: none;
  margin-right: 15px;
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 5px;
  // background-image: linear-gradient(white, white);
  background-size: 70% 100%;
  background-repeat: no-repeat;
}

.form-element__range::-webkit-slider-thumb {
  appearance: none;
  height: 15px;
  width: 15px;
  border-radius: 50%;
  background: white;
  cursor: ew-resize;
  box-shadow: 0 0 2px 0 #555;
  transition: background .3s ease-in-out;
}

.form-element__range::-webkit-slider-runnable-track  {
  appearance: none;
  box-shadow: none;
  border: none;
  background: transparent;
}

.form-element__number {
  appearance: none;
  width: 80px;
  height: 2rem;
  background: fade-out($color: white, $amount: .8);
  outline: 0;
  border: 0;
  border-radius: 5px;
  padding: 0 1rem;
  color: white;
  text-align: center;
}
.form-element__number::-webkit-outer-spin-button,
.form-element__number::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
.form-element__number[type=number] {
  -moz-appearance: textfield;
}
</style>