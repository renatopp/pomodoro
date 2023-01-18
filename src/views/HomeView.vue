<script setup>
import { ref, inject, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import Countdown from '@/components/Countdown.vue'
import History from '@/components/History.vue'
import Settings from '@/components/Settings.vue'
import IconSettings from '@/components/icons/IconSettings.vue'

const router = useRouter();
const store = inject('store')
const notification = inject('notification')
const countdown = ref(null)
let playing = ref(false)
let settings = ref(false)

function clickPage() {
  playing.value = countdown.value.toggle()
  settings.value = false
}

function clickMode(mode) {
  store.setMode(mode)
  const data = store.getMode()
  countdown.value.start(data.minutes*60)
  playing.value = true
}

function clickSettings() {
  settings.value = true
}

function closeSettings() {
  settings.value = false
}


function onFinished() {
  playing.value = false
  store.addHistory(store.getMode().name)
  notification.show()
}

function onTick() {
  document.title = `${countdown.value.value} - R2Pomodoro`
}

onMounted(() => {
  countdown.value.start(store.state.application.countdownTime)
  countdown.value.pause()
  document.title = `${countdown.value.value} - R2Pomodoro`
  store.state.application.settingsColor = null
})

onBeforeUnmount(() => {
  store.state.application.countdownTime = countdown.value.remainingTime
})
</script>

<template>
  <main class="home-view expand">
    <Transition>
      <div class="navbar show-fade" v-show="!playing">
        <a @click.stop="clickSettings" v-if="!settings">
          <icon-settings></icon-settings>
        </a>
      </div>
    </Transition>

    <div class="countdown" @click="clickPage">
      <countdown
        ref="countdown"
        :class="{ 'anim-blink': !playing }"
        @tick="onTick"
        @finished="onFinished"
      ></countdown>
    </div>

    <Transition>
      <div class="buttons show-fade" v-show="!playing">
        <a @click.stop="clickMode('work')">Work</a>
        <a @click.stop="clickMode('short')">Short</a>
        <a @click.stop="clickMode('long')">Long</a>
      </div>
    </Transition>
    
    <Transition>
      <div class="history show-fade" v-show="!playing">
        <history :history="store.state.application.history"></history>
      </div>
    </Transition>

    <div class="settings show-fade" v-show="settings">
      <settings @close="closeSettings"></settings>
    </div>

  </main>
</template>

<style lang="scss" scoped>
.home-view {
  display: flex;
  flex-direction: column;
}

.navbar {
  height: 100px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 10px 10px;
}

.countdown {
  display: flex;
  flex-grow: 1;
  font-family: 'Anton', sans-serif;
  font-size: 6rem;

  align-items: center;
  justify-content: center;
  letter-spacing: .3rem;

  cursor: default;
}

.buttons {
  height: 60px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  column-gap: 20px;
  font-size: 1.3rem;
  // text-transform: uppercase;

  a {
    padding: 10px;
  }
}

.history {
  height: 40px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  column-gap: 10px;
}
</style>