<script lang="ts" setup>

import { useTemplateRef } from 'vue';
const span = useTemplateRef('feedback');

const props = defineProps({
  'feedback': {
    type: String,
    required: true
  }
})

function handleFeedback() {
  const comp = span.value! as HTMLElement;
  comp.classList.remove('animate');
  void comp.offsetWidth; // trigger reflow
  comp.classList.add('animate');
}
</script>

<template>
  <button @click="handleFeedback" class="button">
    <slot></slot>
    <span ref="feedback" class="feedback">{{ props.feedback }}</span>
  </button>
</template>

<style lang="scss" scoped>
.button {
  position: relative;
}
.feedback {
  position: absolute;
  top: -1.5em;
  right: 0;
  left: 50%;
  font-size: 0.75em;
  color: var(--color-accent);
  pointer-events: none;
  user-select: none;
  transform: translateX(-50%);
  opacity: 0;
}

.animate {
  animation: popup 0.5s;
}

@keyframes popup {
  0% { opacity: 1; transform: translateX(-50%) translateY(100%); }
  50% { opacity: 1; transform: translateX(-50%) translateY(0%);  }
  100% { opacity: 0; transform: translateX(-50%) translateY(-50%);  }
}
</style>
