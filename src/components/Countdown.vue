<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import formatTime from 'format-duration'

const emit = defineEmits(['finished', 'tick'])

let _elapsed = ref(0)
let _startedTimer = 0
let _playing = false
let _timeout = null
let _totalTime = ref(0)

const elapsedTime = computed(() => _elapsed.value)
const remainingTime = computed(() => _totalTime.value - elapsedTime.value)
const totalTime = computed(() => _totalTime.value)
const playing = computed(() => _playing)
const value = computed(() => formatTime(remainingTime.value*1000, { leading: true }))

function start(time) {
  if (_playing) stop()

  _totalTime.value = time ?? _totalTime.value

  _startedTimer = Date.now()
  _playing = true
  _elapsed.value = 0
  _timeout = setInterval(_tick, 500)
}
function stop() {
  _playing = false
  _elapsed.value = _totalTime.value
  clearInterval(_timeout)
  _timeout = null
}
function pause() {
  if (!_timeout) return

  _playing = false
}
function resume() {
  if (!_timeout) return

  _playing = true
  _startedTimer = Date.now() - _elapsed.value*1000
}
function toggle() {
  _playing
    ? pause()
    : resume()
  return _playing
}

function _tick() {
  if (!_playing) return
  _elapsed.value = parseInt((Date.now() - _startedTimer)/1000.0)
    emit('tick', _totalTime.value)

  if (_elapsed.value > _totalTime.value) {
    stop()
    emit('finished', _totalTime.value)
  }
}

onMounted(() => {
  start()
  pause()
})

onUnmounted(() => {
  stop()
})

defineExpose({
  start,
  stop,
  pause,
  resume,
  toggle,
  remainingTime,
  elapsedTime,
  totalTime,
  playing,
  value,
})
</script>

<template>
  <span class="countdown">{{value}}</span>
</template>

<style lang="scss" scoped>

</style>