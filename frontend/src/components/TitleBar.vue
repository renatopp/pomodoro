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
      <button id="titlebar__settings" type="button" aria-label="Open settings" @click="viewSettings">∴</button>
      <!-- <wa-tooltip for="titlebar__minimize" placement="bottom-left" showDelay="1000">Minimize</wa-tooltip> -->
      <button v-if="isDesktop()" id="titlebar__minimize" type="button" aria-label="Minimize window" @click="winMinimize">-</button>
      <!-- <wa-tooltip for="titlebar__maximize" placement="bottom-left" showDelay="1000">Maximize</wa-tooltip> -->
      <button v-if="isDesktop()" id="titlebar__maximize" type="button" aria-label="Toggle maximize window" @click="winMaximize">•</button>
      <!-- <wa-tooltip for="titlebar__close" placement="bottom-left" showDelay="1000">Close</wa-tooltip> -->
      <button v-if="isDesktop()" id="titlebar__close" type="button" aria-label="Close app" @click="winClose">×</button>
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
    button {
      --wails-draggable: no-drag;
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--height-titlebar);
      height: var(--height-titlebar);
      border: 0;
      padding: 0;
      background-color: transparent;
      color: inherit;
      text-decoration: none;
      font-size: var(--font-size-lg);
      cursor: pointer;

      &:hover {
        background-color: var(--color-input-idle);
      }

      &:focus-visible {
        outline: 1px solid currentColor;
      }
    }
  }
}
</style>
