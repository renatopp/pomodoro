<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';

import store, { SoundSources } from '../store';
import History from '../components/History.vue';
import InputCheckbox from '../components/InputCheckbox.vue';
import InputRange from '../components/InputRange.vue';
import InputSelect from '../components/InputSelect.vue';
import InputColor from '../components/InputColor.vue';
import formatTime from 'format-duration'

const historyMockPool = [25, 5, 25, 5, 25, 5, 25, 15];
const historyMock = ref([] as number[]);

function isDesktop() {
  return (window as any).runtime !== undefined
}

function handleNotificationEnabled(value: boolean) {
  if (value) store.requestBrowserNotification();
}

function handleNotificationSound(value: string) {
  const source = SoundSources.find(s => s.id === value)?.path;
  const volume = store.state.settings.notificationVolume;
  store.playSound(source!, volume);
}

function handleNotificationTest() {
  store.showNotification()
}

function handleHistoryMaxChange(value: number) {
  historyMock.value = [];
  for (let i = 0; i < value; i++) {
    const idx = i % historyMockPool.length;
    historyMock.value.push(historyMockPool[idx]);
  }
}
handleHistoryMaxChange(store.state.settings.historyMax);

function handleHistoryClear() {
  store.clearHistory();
}

function handleColorChange() {
  store.setColors();
}

function handleColorReset() {
  store.resetTextColors();
}

onMounted(() => {
  store.setColors("#E65454")
})

onUnmounted(() => {
  store.setColors()
})

</script>

<template>
  <main class="view">
    <div class="view__content">

      <div class="form">
        <hgroup>
          <h1>Settings</h1>
        </hgroup>
          
        <div class="form__group">
          <hgroup>
            <h2>Notifications</h2>
          </hgroup>

          <div class="form__item">
            <hgroup class="label">
              <h3>Enable Toast</h3>
              <small>Will show a notification after each session if enabled.</small>
            </hgroup>
            <div class="input">
              <input-checkbox v-model="store.state.settings.notificationEnabled" @update:model-value="handleNotificationEnabled" />
            </div>
          </div>
          
          <div class="form__item">
            <hgroup class="label">
              <h3>Alarm Sound</h3>
              <small>The sound that will play when the timer ends.</small>
            </hgroup>
            <div class="input">
              <input-select
                v-model="store.state.settings.notificationSound"
                :options="SoundSources"
                @update:model-value="handleNotificationSound"
              />
            </div>
          </div>

          <div class="form__item">
            <hgroup class="label">
              <h3>Alarm volume</h3>
              <small>Volume level of the alarm sound.</small>
            </hgroup>
            <div class="input">
              <input-range :min="0" :max="100" :step="1" v-model="store.state.settings.notificationVolume" />
            </div>
          </div>

          <div class="form__item">
            <hgroup class="label">
              <h3>Example</h3>
              <small>Show a notification example.</small>
            </hgroup>
            <div class="input">
              <button @click="handleNotificationTest">Test a notification</button>
            </div>
          </div>
        </div>


        <div class="form__group">
          <hgroup>
            <h2>History</h2>
          </hgroup>

          <div class="form__item">
            <hgroup class="label">
              <h3>Enable History</h3>
              <small>Show the indicators of completed sessions.</small>
            </hgroup>
            <div class="input">
              <input-checkbox v-model="store.state.settings.historyEnabled" />
            </div>
          </div>

          <div class="form__item">
            <hgroup class="label">
              <h3>Maximum Indicators</h3>
              <small>Maximum number of completed session indicators to show.</small>
            </hgroup>
            <div class="input" style="flex-direction: column;">
              <input-range :min="0" :max="15" :step="1" v-model="store.state.settings.historyMax" @update:model-value="handleHistoryMaxChange" />
            </div>
          </div>

          <div class="form__item">
            <hgroup class="label">
              <h3>Example</h3>
              <small>This is how the history will look like.</small>
            </hgroup>
            <div class="input" style="flex-direction: column;">
              <history :data="historyMock"/>
            </div>
          </div>
          
          
          <div class="form__item">
            <hgroup class="label">
              <h3>Clear</h3>
              <small>Clear the history.</small>
            </hgroup>
            <div class="input">
              <button @click="handleHistoryClear">Clear the history</button>
            </div>
          </div>
          
        </div>

        <div class="form__group">
          <h2>Appearance</h2>

          <div class="form__item" v-if="!isDesktop()">
            <hgroup class="label">
              <h3>Change Title</h3>
              <small>Update the title of the tab with the current session time.</small>
            </hgroup>
            <div class="input">
              <input-checkbox v-model="store.state.settings.displayChangeTitle" />
            </div>
          </div>

          <div class="form__item">
            <hgroup class="label">
              <h3>Text Colors</h3>
              <small>Text colors are selected based on best profile colors.</small>
            </hgroup>
            <div class="input">
              <div class="display-colors">
                <div class="display-colors__light">
                  <span :style="`color: ${store.state.settings.displayLightColor}`">Light Color</span>
                  <input-color v-model="store.state.settings.displayLightColor" @change="handleColorChange" />
                </div>
                <div class="display-colors__dark">
                  <span :style="`color: ${store.state.settings.displayDarkColor}`">Dark Color</span>
                  <input-color v-model="store.state.settings.displayDarkColor" @change="handleColorChange" />
                </div>
              </div>
            </div>
          </div>
          
          <div class="form__item">
            <hgroup class="label">
              <h3>Reset Color</h3>
              <small>Reset the color settings to default.</small>
            </hgroup>
            <div class="input">
              <button @click="handleColorReset">Reset Colors</button>
            </div>
          </div>
          
        </div>

        <div class="form__group">
          <hgroup>
            <h2>Profiles</h2>
            <!-- <small><input type="button" class="operation" value="Reset"/></small> -->
          </hgroup>
          
          <div class="form__item" style="margin: 0; padding: 0;">
            <hgroup class="label">
              <h3>Profiles</h3>
              <!-- <small>Reset the profile settings to default.</small> -->
            </hgroup>
          </div>
          
          <div class="profiles">
            <div
              v-for="profile in store.state.settings.profiles"
              :key="profile.id"
              class="profiles__item"
              :style="`background-color: ${profile.color}`">

              <div class="profiles__header">
                <input type="text" :value="profile.name" class="profiles__name"/>
                <input-color v-model="profile.color" style="border: 1px solid white"/>
              </div>
              <div class="profiles__content">
                <input-range :min="60*1000" :max="60*60*1000" :step="60*1000" :show-input="false" v-model="profile.duration" />
                <span class="duration">{{ formatTime(profile.duration, { leading: true }) }}</span>
              </div>
            </div>
            <div class="profiles__item--add">+</div>
          </div>
          
          <div class="form__item">
            <hgroup class="label">
              <h3>Reset Profiles</h3>
              <small>Reset the profile settings to default.</small>
            </hgroup>
            <div class="input">
              <button>Reset Profiles</button>
            </div>
          </div>
  
        </div>
        
        <div class="form__group">
          <hgroup>
            <h2>General</h2>
            <!-- <small><input type="button" class="operation" value="Back"/></small> -->
          </hgroup>
          
          <div class="form__item">
            <hgroup class="label">
              <h3>Reset Configs</h3>
              <small>Reset all configuration.</small>
            </hgroup>
            <div class="input">
              <button>Reset Configs</button>
            </div>
          </div>
  
          <div class="form__item">
            <hgroup class="label">
              <h3>Back</h3>
              <small>You can also click on ∴ symbol on the top bar.</small>
            </hgroup>
            <div class="input">
              <button>Save and Back</button>
            </div>
          </div>
  
        </div>
      </div>

    </div>
  </main>
</template>

<style lang="scss" scoped>
.view {
  // background-color: fade-out(#2A2D34, 0.8);

  &__content {
    max-width: 600px;
    margin: 0 auto; 
    padding: 10px;
  }

  .display-colors {
    display: flex;
    width: 100%;
    gap: 10px;

    &__light, &__dark {
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;
      gap: 5px;
      justify-content: center;
      align-items: center;
      // flex-direction: row-reverse
    }
  }
  
  .profiles {
    display: flex;
    gap: 10px;
    // padding: 12px 0;
    flex-wrap: wrap;

    &__item {
      flex: 1 1 auto;
      width: 30%;
      padding: 10px;
      padding-bottom: 15px;
      background: red;
      border-radius: 5px;
      height: 150px;

      &--add {
        display: inline-flex;
        height: 150px;
        width: 33%;
        border-radius: 5px;
        justify-content: center;
        align-items: center;
        font-size: 2rem;
        font-weight: bold;
        background: fade-out(white, 0.8);
        color: white;
        cursor: pointer;
      }
    }

    &__header {
      display: flex;
      gap: 10px;
      align-items: center;
      margin-bottom: 10px;
    }
    &__content {
      
    }

    &__name {
      width: 100%;
      border: none;
      border-radius: 5px;
      height: 2rem;
      font-size: 1rem;
      text-align: left;
      outline: none;
      background: transparent;
      color: white;
      font-weight: bold;
      
      &:focus {
        outline: 1px solid white;
      }
    }

    .duration {
      font-family: 'Anton', sans-serif;
      font-size: 2rem;
      display: inline-flex;
      width: 100%;
      justify-content: center;
    }
  }
}
</style>
