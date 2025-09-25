<script setup>
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: null,
  options: Array,
  optionId: {
    type: Function,
    default: (option) => option?.id
  },
  optionLabel: {
    type: Function,
    default: (option) => option?.name
  },
})

function emitValue(e) {
  let value = e.target.value
  emit('update:modelValue', value)
}
</script>


<template>
  <span class="form-element">
    <select :value="modelValue" @input="emitValue" class="form-element__select">
      <option
        class="form-element__select__option"
        v-for="(obj, key) in props.options"
        :value="props.optionId(obj)"
        :key="key">
        {{ props.optionLabel(obj) }}
      </option>
    </select>
  </span>
</template>


<style lang="scss" scoped>

.form-element {
  position: relative;
  width: 100%;
}

.form-element__select {
  appearance: none;
  outline: 0;
  border: 0;
  border-radius: 5px;
  width: 100%;
  height: 2rem;
  position: relative;
  background-color: fade-out($color: white, $amount: .8);
  color: white;
  padding: 0 1rem;

  &::-ms-expand {
    display: none;
  }
}
.form-element::after {
  content: '\25BC';
  position: absolute;
  border-radius: 0 5px 5px 0;
  top: 0;
  right: 0;
  width: 2rem;
  height: 2rem;
  background-color: fade-out($color: white, $amount: .8);
  transition: .25s all ease;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
}
.form-element:focus {
  outline: 1px solid  white;
  text-shadow: 0 0 10px  #ffffff;
}
/* Transition */
.form-element:hover::after {
  color: white;
  text-shadow: 0 0 10px  #ffffff;
}

.form-element__select__option {
  background-color: fade-out($color: white, $amount: .8);
  color: fade-out($color: black, $amount: .2);
  padding: 10px;
}



// .form-element__select {
//   /* Reset Select */
//   appearance: none;
//   outline: 0;
//   border: 0;
//   box-shadow: none;
//   /* Personalize */
//   flex: 1;
//   // padding: 0 1em;
//   color: #FFF;
//   background-color: fade-out($color: white, $amount: 0.8);
//   background-image: none;
//   cursor: pointer;
// }
/* Remove IE arrow */
// .form-element__select::-ms-expand {
//   display: none;
// }
/* Custom Select wrapper */
// .form-element {
//   // position: relative;
//   // display: flex;
//   width: 100%;
//   // height: 2rem;
//   // border-radius: .25em;
//   overflow: hidden;
// }
// /* Arrow */
// .form-element::after {
//   content: '\25BC';
//   position: absolute;
//   top: 0;
//   right: 0;
//   padding: 1em;
//   background-color: #34495e;
//   transition: .25s all ease;
//   pointer-events: none;
// }
// /* Transition */
// .form-element:hover::after {
//   color: #f39c12;
// }

</style>