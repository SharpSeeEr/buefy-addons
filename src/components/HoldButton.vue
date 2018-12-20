<template>
  <button
    class="button b-hold-button"
    :class="{'pressed': status !== 'default'}"
    @touchend="cancel"
    @touchstart.prevent="start"
    @mouseup="cancel"
    @mousedown.prevent="start"
    :style="{ transitionDuration: `${transitionDuration}ms` }">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'HoldButton',
  data() {
    return {
      status: 'default',
      timeout: null
    }
  },
  props: {
    duration: { type: Number, default: 1000 },
    resetOnComplete: { type: Boolean, default: true }
  },
  created() {
    document.addEventListener('mouseup', () => this.cancel())
  },
  destroyed() {
    document.removeEventListener('mouseup', () => this.cancel())
  },
  computed: {
    transitionDuration() {
      return this.status === 'pressed' ? this.duration : 0
    }
  },
  methods: {
    start() {
      if (this.status === 'default' || this.status) {
        this.status = 'pressed'
        this.$emit('pressed')
        this.timeout = setTimeout(() => {
          this.complete()
        }, this.duration)
      }
    },
    complete() {
      this.$emit('completed')
      this.status = 'completed'
    },
    cancel () {
      clearTimeout(this.timeout)
      if (this.status === 'pressed') {
        this.status = 'default'
        this.$emit('cancel')
      } else if (this.status === 'completed' && this.resetOnComplete) {
        this.status = 'default'
      }
    }
  }
}
</script>

<style lang="scss">
  @import "../assets/scss/buefy-addons-lib";

  .b-hold-button {
    position: relative;
    background: linear-gradient(to right, $grey-light 50%, transparent 50%);
    background-size: 206% 100%;
    background-position: right bottom;
    background-repeat: no-repeat;
    transition: background 1s linear;

    &.pressed {
      background-position: left bottom;
    }

    $change-amount: 20%;

    @each $name, $pair in $colors {
      $color: nth($pair, 1);
      $color-invert: nth($pair, 2);
      $color-hover: darken($color, 2.5%);
      $color-pressed: lighten($color, $change-amount);

      @if colorLuminance($color) > 0.25 {
        $color-pressed: darken($color, $change-amount);
      }
      &.is-#{$name} {
        background: linear-gradient(to right, $color-pressed 50%, transparent 50%);
        background-size: 206% 100%;
        background-position: right bottom;
        background-repeat: no-repeat;

        &.pressed {
          background-position: left bottom;
        }
      }
    }
  }
</style>
