<script setup>
import { onMounted, onUnmounted, computed, ref, watch } from 'vue'
import chroma from 'chroma-js'

const bgBase = ref(null)
const bg = ref(null)
const props = defineProps(['accent'])
const accent = computed(() => props.accent)

const GLOBAL_SPEED_MOD = .5
const INTERVAL = 100

class Particle {
  constructor(color) {
    this.color = color
    this.targetColor = color
    this.x = Math.random()*100
    this.y = Math.random()*100
    this.speed = [Math.random()*2 - 1, Math.random()*2 - 1]
  }
}

let _interval = null
let _particles = [
  new Particle('red'),
  new Particle('blue'),
  new Particle('yellow'),
  new Particle('green'),
  new Particle('purple'),
  new Particle('red'),
  new Particle('blue'),
  new Particle('yellow'),
  new Particle('green'),
  new Particle('purple')
]

watch(accent, (newValue) => {
  const base = chroma(newValue)
  _setupColor(base)
})

function _tick() {
  _particles.forEach(p => {
    p.x += p.speed[0]*GLOBAL_SPEED_MOD
    p.y += p.speed[1]*GLOBAL_SPEED_MOD

    if (p.x < 0 || p.x > 100) {
      p.x = Math.min(Math.max(p.x, 0), 100)
      p.speed[0] *= -1
    }
    
    if (p.y < 0 || p.y > 100) {
      p.y = Math.min(Math.max(p.y, 0), 100)
      p.speed[1] *= -1
    }

    p.color = chroma.mix(p.color, p.targetColor, INTERVAL/500)
  })

  bgBase.value.style.backgroundColor = accent.value
  let colors = _particles.map(p => `radial-gradient(at ${p.x}% ${p.y}%, ${p.color}, transparent 50%) repeat scroll 0% 0%`)
  bg.value.style.background = colors.join(',')
}

function _randomColor({ hue, luminosity }) {
  return chroma.mix(hue, chroma.random(), .3)
}

function _setupColor(base, n=false) {
  _particles[0].targetColor = base.hex()
  if (n) _particles[0].color = _particles[0].targetColor
  _particles[0].speed = [Math.random()*2 - 1, Math.random()*2 - 1]
  
  for (let i=1; i<_particles.length; i++) {
    _particles[i].targetColor = _randomColor({ hue: base }).hex()
    _particles[i].speed = [Math.random()*2 - 1, Math.random()*2 - 1]
    if (n) _particles[i].color = _particles[i].targetColor
  }
  
}

onMounted(() => {
  const base = chroma(accent.value)
  _setupColor(base, true)
  _interval = setInterval(_tick, INTERVAL)
})
onUnmounted(() => clearInterval(_interval))

</script>


<template>
  <div class="gradient-background-base" ref="bgBase"></div>
  <div class="gradient-background" ref="bg"></div>
</template>


<style lang="scss" scoped>
.gradient-background-base,
.gradient-background {
  position : absolute;
  top      : 0;
  left     : 0;
  right    : 0;
  bottom   : 0;
  width    : 100%;
  height   : 100%;
  z-index  : -1;
}

.gradient-background-base {
  z-index: -2;
}
</style>