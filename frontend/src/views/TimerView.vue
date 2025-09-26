<script lang="ts" setup>
import Countdown from '../components/Countdown.vue';
import History from '../components/History.vue';
import store from '../store';

function handlePageClick() {
  store.toggleTimer();
}

function handleProfileSelection(profileId: string) {
  store.startTimer(profileId);
  store.setColors()
}

function getClassState() {
  return store.state.isRunning ? 'hidden' : 'show';
}
</script>

<template>
  <main class="view" @click="handlePageClick">
    <div class="view__container">
      
      <div class="spacer">
        <p>&nbsp;</p>
      </div>
      
      <Countdown :time="store.state.timer" :running="store.state.isRunning" />

      <div :class="['spacer vertical', getClassState()]">
        <div class="controls">
          <a v-for="profile in store.state.settings.profiles"
            :key="profile.id"
            @click.stop="handleProfileSelection(profile.id)">
            {{ profile.name }}
          </a>
        </div>

        <div class="spacer"></div>
        
        <history v-if="store.state.settings.historyEnabled" :data="store.state.history" />
      </div>

    </div>
  </main>
</template>

<style lang="scss" scoped>
.view {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

  &__container {
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    max-width: 600px;
    padding: 10px;
    margin: auto;
  }
}

.show {
  opacity: 1;
  pointer-events: auto;
  transition: opacity 0.3s ease-out;
}
.hidden {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease-in;
}

.controls {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  z-index: 1;

  a {
    text-decoration: none;
    color: inherit;
    font-size: 1rem;
    font-family: 'Work Sans', sans-serif;
    text-transform: uppercase;
    // font-weight: 600;
    padding: 0.5rem 1rem;
    // border: 2px solid currentColor;
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: all 0.05s ease;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
}
</style>
