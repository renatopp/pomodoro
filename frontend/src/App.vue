<script lang="ts" setup>
import store from './store';
import TitleBar from './components/TitleBar.vue';
import TimerView from './views/TimerView.vue';
import SettingsView from './views/SettingsView.vue';
</script>

<template>
  <main class="app">
    <TitleBar />
    <Transition class="views" name="fadescale" mode="out-in">
      <TimerView v-if="store.data.page === 'timer'" />
      <SettingsView v-else-if="store.data.page === 'settings'" />
      <div v-else>Invalid Value!</div>
    </Transition>
  </main>
</template>

<style lang="scss" scoped>
.app {
  display: flex;
  flex-direction: column;
  height: 100%;

  .views {
    flex: 1;
    position: relative;
    overflow: hidden;
  }
}
</style>