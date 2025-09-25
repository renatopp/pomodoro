<script lang="ts" setup>
import store from './store';
import TitleBar from './components/TitleBar.vue';
import TimerView from './views/TimerView.vue';
import SettingsView from './views/SettingsView.vue';
import { computed, ref, watch } from 'vue';
import chroma from 'chroma-js';

const backgroundColor = ref('red')
const textColor = ref('white');

function updateColors() {
  const profile = store.getCurrentProfile();
  backgroundColor.value = profile.color;

  
  const light = store.state.settings.displayLightColor;
  const dark = store.state.settings.displayDarkColor;
  const lightContrast = chroma.contrast(backgroundColor.value, light);
  const darkContrast = chroma.contrast(backgroundColor.value, dark);
  
  console.log('Background color updated to:', backgroundColor.value, lightContrast, darkContrast);
  if (lightContrast >= 2) {
    textColor.value = light;
  } else {
    textColor.value = lightContrast >= darkContrast ? light : dark;
  }
}

watch(() => store.getCurrentProfile().color, updateColors, { immediate: true });
watch(() => store.state.settings.displayLightColor, updateColors, { immediate: true });
watch(() => store.state.settings.displayDarkColor, updateColors, { immediate: true });
</script>

<template>
  <main class="app" :style="`
    --bg: ${backgroundColor};
    --fg: ${textColor};
  `">
    <TitleBar />
    <Transition class="views" name="fadescale" mode="out-in">
      <TimerView v-if="store.state.page === 'timer'" />
      <SettingsView v-else-if="store.state.page === 'settings'" />
      <div v-else>Invalid Value!</div>
    </Transition>
  </main>
</template>

<style lang="scss" scoped>
.app {
  display: flex;
  flex-direction: column;
  height: 100%;
  // background-color: var(--bg, red);
  // color: var(--fg, #FFFCEA);

  transition:
    background-color 0.5s ease,
    color 0.5s ease;

  .views {
    flex: 1;
    position: relative;
    overflow-x: hidden;
    overflow-y: auto;
  }
}
</style>