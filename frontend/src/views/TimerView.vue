<script lang="ts" setup>
</script>

<template>
  <main class="view">
    <span class="countdown">25:00</span>
    <div class="controls">
      <a href="">Work</a>
      <a href="">Short</a>
      <a href="">Long</a>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.view {

}

.content {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
}

.countdown {
  margin: auto;
  text-align: center;
  justify-content: center;
  font-size: 8rem;
  font-family: 'Anton', sans-serif;
  font-weight: 400;
}

.controls {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;

  a {
    text-decoration: none;
    color: inherit;
    font-size: 1rem;
    font-family: 'Work Sans', sans-serif;
    text-transform: uppercase;
    // font-weight: 600;
    padding: 0.5rem 1rem;
    // border: 2px solid currentColor;
    // border-radius: 8px;
    cursor: pointer;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
}
</style>
