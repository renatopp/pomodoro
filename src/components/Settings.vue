<script setup>
import lodash from 'lodash'
import { inject, computed, onMounted, onUnmounted } from 'vue'
import { RouterView } from 'vue-router'
import FormCheckbox from './forms/FormCheckbox.vue'
import FormSelect from './forms/FormSelect.vue'
import FormNumber from './forms/FormNumber.vue'
import FormButton from './forms/FormButton.vue'
import FormColor from './forms/FormColor.vue'
import IconClose from './icons/IconClose.vue'
import NotificationSounds from '@/types/NotificationSounds'

const emit = defineEmits(['close'])

const store = inject('store')
const notification = inject('notification')
const settings = computed(() => store.state.settings)
const sounds = computed(() => lodash.map(NotificationSounds, (v, k) => ({ key: k, value: v.name})))

const onChange = lodash.throttle(function () {
  store.save()
}, 500)

function onChangeColor(e) {
  store.state.application.settingsColor = e.target.value
  onChange()
}

function onTestNotification() {
  notification.show('test')
}

function onClearHistory() {
  const history = store.state.application.history
  history.splice(0, history.length)
}

function onReset() {
  store.resetState()
}

function onClose() {
  emit('close')
}

onMounted(() => {
  store.state.application.settingsColor = store.getMode().accent
})

onUnmounted(() => {
  store.state.application.settingsColor = null
})
</script>

<template>
  <div class="settings-overlay" @click="onClose">
    <div class="settings-view" @click.stop="">
      <div class="close-button">
        <a @click="onClose"><icon-close></icon-close></a>
      </div>

      <div class="card">
        <h2>Notifications</h2>
        <div class="row">
          <label for="">Show Toast</label>
          <form-checkbox
            v-model="settings.showNotification"
            @change="onChange"
          />
        </div>
        <div class="row">
          <label for="">Sound</label>
          <form-select
            v-model="settings.notificationSound"
            :options="sounds"
            @change="onChange"
          />
        </div>
        <div class="row">
          <label for="">Volume</label>
          <form-number
            v-model="settings.notificationVolume"
            :min="0"
            :max="1"
            :step="0.1"
            @change="onChange"
          ></form-number>
        </div>
        <div class="row">
          <label for=""></label>
          <form-button @click="onTestNotification">Test Notification</form-button>
        </div>
      </div>

      
      <div class="card">
        <h2>Background</h2>
        <div class="row">
          <label for="">Use gradient</label>
          <form-checkbox
            v-model="settings.backgroundGradient"
            @change="onChange"
          />
        </div>
        <div class="row">
          <label for="">Animated</label>
          <form-checkbox
            v-model="settings.backgroundAnimated"
            @change="onChange"
          />
        </div>
      </div>

      
      <div class="card">
        <h2>History</h2>
        <div class="row">
          <label for="">Max history</label>
          <form-number
            v-model="settings.maxHistory"
            :min="0"
            :max="25"
            :step="1"
            @change="onChange"
          ></form-number>
        </div>
        <div class="row">
          <label for=""></label>
          <form-button @click="onClearHistory">Clear history</form-button>
        </div>
      </div>

      
      <div class="card">
        <h2>Modes</h2>

        <div class="subcard">
          <h3>Work</h3>
          <div class="row">
            <label for="">Minutes</label>
            <form-number
              v-model="settings.modes.work.minutes"
              :min="1"
              :max="60"
              :step="1"
              @change="onChange"
            ></form-number>
          </div>
          <div class="row">
            <label for="">Color</label>
            <form-color
              v-model="settings.modes.work.accent"
              @input="onChangeColor"
            ></form-color>
          </div>
        </div>

        <div class="subcard">
          <h3>Short Pause</h3>
          <div class="row">
            <label for="">Minutes</label>
            <form-number
              v-model="settings.modes.short.minutes"
              :min="1"
              :max="60"
              :step="1"
              @change="onChange"
            ></form-number>
          </div>
          <div class="row">
            <label for="">Color</label>
            <form-color
              v-model="settings.modes.short.accent"
              @input="onChangeColor"
            ></form-color>
          </div>
        </div>

        <div class="subcard">
          <h3>Long Pause</h3>
          <div class="row">
            <label for="">Minutes</label>
            <form-number
              v-model="settings.modes.long.minutes"
              :min="1"
              :max="60"
              :step="1"
              @change="onChange"
            ></form-number>
          </div>
          <div class="row">
            <label for="">Color</label>
            <form-color
              v-model="settings.modes.long.accent"
              @input="onChangeColor"
            ></form-color>
          </div>
        </div>
      </div>


      <div class="card">
        <h2>Settings</h2>
        <div class="row">
          <label for=""></label>
          <form-button @click="onReset">Reset</form-button>
        </div>
      </div>

    </div>
  </div>
</template>


<style lang="scss" scoped>
.settings-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  // background: red;
}

.settings-view {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 500px;
  height: 100vh;
  backdrop-filter: blur(100px);
  background: fade-out(white, .9);
  padding: 10px 20px;
  overflow: auto;
  box-shadow: 0 0 1px 0 fade-out(white, 0.7);
}

.card {
  margin: 40px 0 20px;
}

h2 {
  border-bottom: 1px solid fade-out(white, .9);
  padding-bottom: 4px;
  margin-bottom: 10px;
  font-size: .7em;
  opacity: .85;
  text-transform: uppercase;
}

h3 {
  padding-top: 10px;
  padding-bottom: 5px;
  font-size: .7em;
  opacity: .7;
}

.row {
  display: flex;
  padding: 5px 0;
  align-items: center;
  
  label {
    width: 180px;
  }
}

.close-button {
  // padding-top: 30px;
  text-align: right;
  // padding-left: -5px;
}
</style>