<template>
  <ion-page @click="pageClick">
    <ion-content :fullscreen="true">
      <div class="home-page">
        <Transition>
          <r2p-button @click.stop="buttonSettings" class="container-settings" v-if="!playing">
            <ion-icon :icon="apps"></ion-icon>
          </r2p-button>
        </Transition>

        <r2p-countdown
          :playing="playing"
          ref="countdown"
          class="container-countdown"
          @timeout="onFinished"
          :class="{ stopped: !playing }"
        ></r2p-countdown>

        <Transition>
          <div class="container-buttons" v-if="!playing">
            <r2p-button @click.stop="buttonWork">work</r2p-button>
            <r2p-button @click.stop="buttonShort">short</r2p-button>
            <r2p-button @click.stop="buttonLong">long</r2p-button>
          </div>
        </Transition>

        <Transition>
          <div class="container-history" v-if="!playing">
            <r2p-history :history="$store.state.application.history"></r2p-history>
          </div>
        </Transition>

      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonPage, IonIcon } from '@ionic/vue';
import { defineComponent } from 'vue';
import R2pCountdown from '@/components/R2pCountdown.vue';
import R2pButton from '@/components/R2pButton.vue';
import R2pHistory from '@/components/R2pHistory.vue';
import { apps } from 'ionicons/icons'
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'HomePage',
  components: {
    IonContent,
    IonPage,
    IonIcon,
    R2pCountdown,
    R2pButton,
    R2pHistory,
  },
  data() {
    return {
      playing: false,
    }
  },
  setup() {
    const router = useRouter();
    return {
      apps,
      router,
    }
  },
  methods: {
    pageClick() {
      if (this.$store.state.application.countdownTime <= 0) return
      this.playing = !this.playing
    },
    buttonWork() {
      this.$store.setMode('work')
      const data = this.$store.getModeData()
      this.$store.state.application.countdownTime = data.minutes*60
      this.playing = true
    },
    buttonShort() {
      this.$store.setMode('short')
      const data = this.$store.getModeData()
      this.$store.state.application.countdownTime = data.minutes*60
      this.playing = true
    },
    buttonLong() {
      this.$store.setMode('long')
      const data = this.$store.getModeData()
      this.$store.state.application.countdownTime = data.minutes*60
      this.playing = true
    },
    buttonSettings() {
      this.router.push('/settings')
    },
    onFinished() {
      this.$store.addHistory(this.$store.state.application.currentMode)
      this.playing = false
      this.$notification.show(this.$store.state.application.currentMode)
    }
  }
});
</script>

<style lang="scss" scoped>
@import '../theme/index.scss';

.home-page {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
}

.stopped {
  // color: gray;
  animation: blink-animation 2s ease-in-out 0s infinite;
}
@keyframes blink-animation {
  15% { opacity: 1; }
  50% { opacity: 0.35; }
  75% { opacity: 1; }
}

.container-countdown,
.container-buttons,
.container-history {
  position: absolute;
  left: 50%;

  display: flex;
  align-items: center;
  justify-content: center;
}

.container-countdown {
  top: 50%;
  transform: translate(-50%, -50%);
}

.container-buttons {
  position: absolute;
  bottom: 50px;
  height: 60px;
  width: 100%;
  max-width: 400px;
  transform: translate(-50%, -50%);
  align-items: stretch;
  padding: 0 15px;
  
  & > button {
    flex-grow: 1;
  }
}

.container-history {
  position: absolute;
  bottom: 0;
  height: 40px;
  transform: translate(-50%, -50%);
}

.container-settings {
  position: absolute;
  right: 10px;
  top: 10px;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
