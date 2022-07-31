<template>
  <ion-page>
    <ion-header collapse="fade" :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="$router.back()">
            <ion-icon slot="start" :icon="chevronBackOutline"></ion-icon>
            BACK
          </ion-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button @click="onReset">
            RESET
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div class="settings-page">
        <form action="no-action">
          <ion-list>
            <ion-list-header>
              <ion-label>Notifications</ion-label>
            </ion-list-header>
            <ion-item>
              <ion-label>Show Notification</ion-label>
              <ion-toggle @ion-change="onChange" v-model="settings.showNotification"></ion-toggle>
            </ion-item>
            <ion-item>
              <ion-label>Notification Sound</ion-label>
              <ion-select @ion-change="onChange" v-model="settings.notificationSound">
                <ion-select-option
                  v-for="(obj, key) in sounds"
                  :value="key"
                  :key="key"
                >{{obj.name}}</ion-select-option>
              </ion-select>
            </ion-item>
            <ion-item>
              <ion-label>Notification Volume</ion-label>
              <ion-range @ion-change="onChange" v-model="settings.notificationVolume" min="0" max="1" step="0.1"></ion-range>
              <ion-input v-model.number="settings.notificationVolume"></ion-input>
            </ion-item>
            <ion-item>
              <ion-button slot="end" @click="onTestNotification">Test Notification</ion-button>
            </ion-item>
          </ion-list>
          
          <ion-list>
            <ion-list-header>
              <ion-label>Background</ion-label>
            </ion-list-header>
            <ion-item>
              <ion-label>Use Gradient Background</ion-label>
              <ion-toggle @ion-change="onChange" v-model="settings.backgroundGradient"></ion-toggle>
            </ion-item>
            <ion-item>
              <ion-label>Animate Background</ion-label>
              <ion-toggle @ion-change="onChange" v-model="settings.backgroundAnimated"></ion-toggle>
            </ion-item>
          </ion-list>
          
          <ion-list>
            <ion-list-header>
              <ion-label>History</ion-label>
            </ion-list-header>
            <ion-item>
              <ion-label>Max History</ion-label>
              <ion-range @ion-change="onChange" v-model="settings.maxHistory"></ion-range>
              <ion-input v-model.number="settings.maxHistory" class="note"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label></ion-label>
              <ion-button @click="onClearHistory">Clear History</ion-button>
            </ion-item>
          </ion-list>
          
          <ion-list>
            <ion-list-header>
              <ion-label>Modes</ion-label>
            </ion-list-header>
            <ion-item>
              <ion-label>Work Time</ion-label>
              <ion-range @ion-change="onChange" v-model="settings.modes.work.minutes"></ion-range>
              <ion-input class="note" v-model="settings.modes.work.minutes"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label>Work Accent</ion-label>
              <ion-input @ion-change="onChange" class="color" type="color" v-model="settings.modes.work.accent"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label>Short Pause Time</ion-label>
              <ion-range @ion-change="onChange" v-model="settings.modes.short.minutes"></ion-range>
              <ion-input class="note" v-model.number="settings.modes.short.minutes"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label>Short Accent</ion-label>
              <ion-input @ion-change="onChange" class="color" type="color" v-model="settings.modes.short.accent"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label>Long Pause Time</ion-label>
              <ion-range @ion-change="onChange" v-model="settings.modes.long.minutes"></ion-range>
              <ion-input class="note" v-model.number="settings.modes.long.minutes"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label>Long Accent</ion-label>
              <ion-input @ion-change="onChange" class="color" type="color" v-model="settings.modes.long.accent"></ion-input>
            </ion-item>
          </ion-list>
          
        </form>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonPage, IonItem, IonLabel, IonInput } from '@ionic/vue';
import { 
  IonBackButton, 
  IonButtons, 
  IonButton, 
  IonHeader, 
  IonTitle, 
  IonList, 
  IonToolbar,
  IonToggle,
  IonListHeader,
  IonRange,
  IonSelect,
  IonSelectOption,
  IonIcon,
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { chevronBackOutline } from 'ionicons/icons';
import NotificationSounds from '../types/NotificationSounds'
import lodash from 'lodash'

export default defineComponent({
  name: 'SettingsPage',
  components: {
    IonIcon,
    IonContent,
    IonPage,
    IonItem,
    IonLabel,
    IonInput,
    IonList,
    IonBackButton, 
    IonButtons, 
    IonButton, 
    IonHeader, 
    IonTitle, 
    IonToolbar,
    IonToggle,
    IonListHeader,
    IonRange,
    IonSelect,
    IonSelectOption,
  },
  data() {
    return {
      settings: this.$store.state.settings,
      sounds: NotificationSounds
    }
  },
  setup() {
    return {
      chevronBackOutline
    }
  },
  methods: {
    onClearHistory() {
      const history = this.$store.state.application.history
      history.splice(0, history.length)
    },
    onReset() {
      this.$store.resetState()
    },
    onTestNotification: lodash.throttle(function () {
      this.$notification.show('test')
    }, 1000),
    onChange: lodash.throttle(function () {
      this.$store.save()
    }, 500),
  }
});
</script>

<style lang="scss" scoped>
@import '../theme/index.scss';

.settings-page {
  width: 100%;
  height: 100%;
  padding: 25px;
}

form {
  margin: 0 auto;
  max-width: 800px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.9);

  ion-list {
    background-color: rgba(255, 255, 255, 0);
    margin-bottom: 12px;
  }
  ion-item {
    --background: rgba(255, 255, 255, 0);
  }

  ion-label {
    min-width: 50%;
  }

  .note {
    // text-align: right;
    // display: inline-block;
    // width: 50px;
  }

  .color {
    height: 50px;

    & input {
      height: 50px;
    }
  }
}

</style>
