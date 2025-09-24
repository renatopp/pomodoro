<script lang="ts" setup>
import store from '../store';
</script>

<template>
  <main class="view">
    <div class="view__content">
      <h1>Settings</h1>
      <p>This is the settings view.</p>


      <div class="profiles">
        <div class="profiles__item">asdf</div>
        <div class="profiles__item">asdf</div>
        <div class="profiles__item">asdf</div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.view {
  &__content {
    max-width: 600px;
    margin: 0 auto; 
    padding: 10px;
  }

  .profiles {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;

    &__item {
      flex: 1 1 auto;
      height: 100px;
      width: 30%;
      padding: 10px;
      background: red;
      border-radius: 8px;
    }
  }
}
</style>
