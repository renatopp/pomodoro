<template>
  <div class="r2p-gradient-background">
    <canvas id="canvas" ref="container" class="r2p-gradient-background-canvas" width="100%" height="100%"></canvas>
    <div class="r2p-gradient-background-content"><slot></slot></div>
  </div>
</template>

<script>
import randomColor from 'randomcolor'
import chroma from 'chroma-js'
import lodash from 'lodash'

export default {
  data() {
    return {
      toColors: [],
      fromColors: [],
      tick: 0,
      duration: 10000,
      initialized: false,
    }
  },
  
  _tickTimeout: null,
  _canvas: null,
  _ctx: null,

  mounted() {
    this._canvas = this.$refs.container
    this._ctx = this._canvas.getContext('2d')
    this._tickTimeout = setInterval(() => this._tick(), 32)
    window.addEventListener('resize', this.onResize.bind(this))
    this.updateAccent()
  },

  unmounted() {
    window.removeEventListener('resize', this.onResize)
    clearTimeout(this._tickTimeout)
  },

  computed: {
    accent() {
      return this.$store.getModeData().accent
    },
    playing() {
      return this.$store.state.settings.backgroundAnimated
    }
  },

  watch: {
    accent() {
      this.updateAccent()
    }
  },

  methods: {
    _tick() {
      if (!this.playing) return

      this.tick += 32/this.duration
      this.setGradient(...this.currentColors())

      if (this.tick >= 1) {
        this.renewColors()
        this.tick = 0
      }
    },

    updateAccent: lodash.throttle(function() {
      if (this.initialized) {
        this.fromColors = this.currentColors()
      } else {
        this.initialized = true
        this.fromColors = [
          chroma(randomColor({ hue: this.accent, luminosity: 'light' })),
          chroma(randomColor({ hue: this.accent, luminosity: 'dark' })),
        ]
      }

      this.tick = 0
      this.toColors = [
        chroma(randomColor({ hue: this.accent, luminosity: 'light' })),
        chroma(randomColor({ hue: this.accent, luminosity: 'dark' })),
      ],
      this.duration = 1000
      
      this.setGradient(...this.currentColors())
    }, 500),

    currentColors() {
      if (!this.playing) return this.toColors
      return lodash.map(this.toColors, (_, i) => {
        return chroma.mix(this.fromColors[i], this.toColors[i], this.tick, 'lab')
      })
    },
    
    renewColors() {
      this.fromColors = this.toColors
      this.toColors = [
        chroma(randomColor({ hue: this.accent, luminosity: 'light' })),
        chroma(randomColor({ hue: this.accent, luminosity: 'dark' })),
      ]
      this.duration = 30000
    },

    setGradient(color1, color2) {
      const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
      const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
      this._canvas.width = vw;
      this._canvas.height = vh;

      if (this.$store.state.settings.backgroundGradient) {
        const gradient = this._ctx.createLinearGradient(-vw/2, -vh/2, 3*vw/2, 3*vh/2)
        // const gradient = this._ctx.createLinearGradient(0, 0, vw, vh)
        gradient.addColorStop(0, color1)
        gradient.addColorStop(1, color2)
        this._ctx.fillStyle = gradient
        this._ctx.fillRect(0, 0, vw, vh)
      } else {
        this._ctx.clearRect(0, 0, vw, vh);
      }

      if (this.playing) {
        this._canvas.style.transition = 'all ease 1s';
      } else {
        this._canvas.style.transition = 'none';
      }
      this._canvas.style.backgroundColor = this.accent
    },

    onResize() {
        this._canvas.style.transition = 'none';
      this.setGradient(...this.currentColors())
    }
  }
}
</script>

<style lang="scss" scoped>
.r2p-gradient-background {

  &-canvas {
    width: 100vw;
    height: 100vh;
    // filter: sepia(50)
  }
}
</style>