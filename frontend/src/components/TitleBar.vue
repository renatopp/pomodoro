<script lang="ts" setup>
import store from '../store';
const rt = (window as any).runtime
function isDesktop() {
  return (window as any).runtime !== undefined
}
function viewSettings() {
  if (store.state.page === 'settings') {
    store.setPage('timer')
    return
  }
  store.setPage('settings')
}
function winMinimize() {
  rt.WindowMinimise();
}
function winMaximize() {
  rt.WindowToggleMaximise()
}
function winClose() {
  rt.Quit();
}
</script>

<template>
  <nav class="titlebar" @dblclick="winMaximize">
    <span class="titlebar__spacer"></span>
    <div class="titlebar__window-controls">
      <!-- <wa-tooltip for="titlebar__settings" placement="bottom-left" showDelay="1000">Settings</wa-tooltip> -->
      <a id="titlebar__settings" @click="viewSettings">∴</a>
      <!-- <wa-tooltip for="titlebar__minimize" placement="bottom-left" showDelay="1000">Minimize</wa-tooltip> -->
      <a v-if="isDesktop()" id="titlebar__minimize" @click="winMinimize">-</a>
      <!-- <wa-tooltip for="titlebar__maximize" placement="bottom-left" showDelay="1000">Maximize</wa-tooltip> -->
      <a v-if="isDesktop()" id="titlebar__maximize" @click="winMaximize">•</a>
      <!-- <wa-tooltip for="titlebar__close" placement="bottom-left" showDelay="1000">Close</wa-tooltip> -->
      <a v-if="isDesktop()" id="titlebar__close" @click="winClose">×</a>
    </div>
  </nav>
</template>

<style lang="scss" scoped>

.titlebar {
  --wails-draggable: drag;

  flex: 0 0 auto;
  display: flex;
  align-items: center;
  height: var(--height-titlebar);
  padding: 0;
  user-select: none;

  &__spacer {
    flex: 1 1 auto;
  }
  &__window-controls {
    display: flex;
    gap: 0;
    a {
      --wails-draggable: no-drag;
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--height-titlebar);
      height: var(--height-titlebar);
      text-decoration: none;
      font-size: var(--font-size-lg);

      &:hover {
        background-color: var(--color-input-idle);
      }
    }
  }
}
</style>
