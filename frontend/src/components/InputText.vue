<script setup>

const model = defineModel({
  type: String,
  required: true
})
const props = defineProps({

})
</script>


<template>
  <span class="form-element">
    <input
      class="form-element__text"
      type="text"
      v-model="model"/>
  </span>
</template>


<style lang="scss" scoped>
.form-element {
  justify-content: center;
  align-items: center;
  display: flex;
  width: 100%;
  height: 2rem;
  gap: 10px;
}

.form-element__text {
  appearance: none;
  font-size: 1rem;
  width: 50px;
  height: 2rem;
  background: fade-out($color: white, $amount: .8);
  outline: 0;
  border: 0;
  border-radius: 5px;
  padding: 0;
  color: white;
  text-align: center;
}
.form-element__text::-webkit-outer-spin-button,
.form-element__text::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
.form-element__text[type=text] {
  -moz-appearance: textfield;
}
</style>