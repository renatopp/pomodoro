<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';

import store, { SoundSources } from '../store';
import History from '../components/History.vue';
import InputCheckbox from '../components/InputCheckbox.vue';
import InputRange from '../components/InputRange.vue';
import InputSelect from '../components/InputSelect.vue';
import InputColor from '../components/InputColor.vue';
import InputText from '../components/InputText.vue';
import FeedbackButton from '../components/FeedbackButton.vue';
import ProfileCard from '../components/ProfileCard.vue';
import formatTime from 'format-duration'

const historyMockPool = [25000, 5000, 25000, 5000, 25000, 5000, 25000, 15000];
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

function handleProfilesReset() {
  store.resetProfiles();
}

function handleResetAll() {
  store.resetAll();
}

function handleSaveAndBack() {
  store.setPage("timer");
}

onMounted(() => {
  store.setColors("#E65454")
})

onUnmounted(() => {
  store.setColors()
  store.saveState();
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
              <feedback-button feedback="Done!" @click="handleNotificationTest">Test a notification</feedback-button>
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
              <input-range :min="0" :max="16" :step="1" v-model="store.state.settings.historyMax" @update:model-value="handleHistoryMaxChange" />
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
              <feedback-button feedback="Cleared!" @click="handleHistoryClear">Clear the history</feedback-button>
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
              <small>We will pick the color that will best fit into the profile background.</small>
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
              <feedback-button feedback="Done!" @click="handleColorReset">Reset colors</feedback-button>
            </div>
          </div>
          
        </div>

        <div class="form__group">
          <hgroup>
            <h2>Profiles</h2>
          </hgroup>
          
          <div class="form__item" style="margin: 0; padding: 0;">
            <hgroup class="label">
              <h3>Profiles</h3>
            </hgroup>
          </div>
          
          <div class="profile-list">            
            <profile-card
              v-for="(_, key) in store.state.settings.profiles"
              :key="key"
              v-model="store.state.settings.profiles[key]"
              class="profile-list__item"/>
          </div>
          
          <div class="form__item">
            <hgroup class="label">
              <h3>Reset Profiles</h3>
              <small>Reset the profile settings to default.</small>
            </hgroup>
            <div class="input">
              <feedback-button feedback="Done!" @click="handleProfilesReset">Reset profile</feedback-button>
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
              <feedback-button feedback="Done!" @click="handleResetAll">Reset all settings</feedback-button>
            </div>
          </div>
  
          <div class="form__item">
            <hgroup class="label">
              <h3>Back</h3>
              <small>You can also click on ∴ symbol on the top bar.</small>
            </hgroup>
            <div class="input">
              <button @click="handleSaveAndBack">Save and back</button>
            </div>
          </div>
  
        </div>
      </div>

    </div>
  </main>
</template>

<style lang="scss" scoped>
@use "sass:color";

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
  
  .profile-list {
    display: flex;
    gap: var(--spacing-sm);

    &__item {
      flex: 1 1 0;
      min-width: 0;
    }
 }
}
</style>
