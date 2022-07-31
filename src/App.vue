<template>
  <ion-app>
    <r2p-gradient-background>
      <ion-router-outlet />
    </r2p-gradient-background>
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';
import R2pGradientBackground from './components/R2pGradientBackground.vue';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
    R2pGradientBackground
  },
});
</script>

<style>
html, body {
  font-family: 'Roboto', sans-serif;
  overflow: hidden;
}

ion-input.color input {
  height: 100%;
}

ion-content {
  --background: none;
}
</style>