<template>
  <span class="r2p-countdown">{{timer}}</span>
</template>

<script>
import formatTime from 'format-duration'

export default {
  props: {
    playing: Boolean
  },
  _timeout: null,
  computed: {
    timer() {
      return formatTime(this.remainingTime*1000, { leading: true })
    },
    remainingTime() {
      return this.$store.state.application.countdownTime;
    }
  },
  watch: {
    playing() {
      if (this.playing) {
        clearTimeout(this._timeout)
        this._timeout = setInterval(() => this._tick(), 1000)
      } else {
        clearTimeout(this._timeout)
      }
    }
  },

  mounted() {
    this._timeout = setInterval(() => this._tick(), 1000)
    // this._setRemainingTime(this.remainingTime)
  },
  unmounted() {
    clearTimeout(this._timeout)
  },

  methods: {
    _tick() {
      if (!this.playing || this.remainingTime <= 0) return

      this._setRemainingTime(this.remainingTime - 1)
      if (this.remainingTime > 0) {
        return
      }

      this._setRemainingTime(0)
      this.$emit('timeout')
    },

    _setRemainingTime(v) {
      this.$store.state.application.countdownTime = v
    },
  }
}
</script>

<style lang="scss" scoped>
@import '../theme/index.scss';

.r2p-countdown {
  @extend .font-primary;
  font-size: 5rem;
  color: $color-white;
  pointer-events: none;
  cursor: pointer;
}
</style>
