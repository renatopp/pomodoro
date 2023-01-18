<script setup>
import { inject, computed } from 'vue'
import { RouterView } from 'vue-router'
import GradientBackground from './components/GradientBackground.vue';

const store = inject('store')

const accent = computed(() => store.state.application.settingsColor || store.getMode().accent)
const down =  store.state.application.active

</script>

<template>
  <GradientBackground :accent="accent"></GradientBackground>
  <RouterView />
</template>

<style lang="scss">
@import "@/assets/style/index.scss";
</style>