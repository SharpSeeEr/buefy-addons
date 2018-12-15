<template>
  <button
    class="button longpress-button"
    :class="{'pressed': status !== 'default'}"
    @touchend="cancel"
    @touchstart.prevent="start"
    @mouseup="cancel"
    @mousedown.prevent="start"
    :style="{ transitionDuration: transitionDuration + 'ms' }">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'button-longpress',
  data() {
    return {
      status: 'default',
      timeout: null
    }
  },
  props: {
    duration: { type: Number, default: 3000 },
    resetOnComplete: Boolean
  },
  created() {
    document.addEventListener('mouseup', () => this.cancel())
  },
  destroyed() {
    document.removeEventListener('mouseup', () => this.cancel())
  },
  computed: {
    transitionDuration() {
      return this.status === 'pressing' ? this.duration : 0
    }
  },
  methods: {
    start() {
      if (this.status === 'default' || this.status) {
        this.status = 'pressing'
        this.$emit('pressing')
        this.timeout = setTimeout(() => {
          this.complete()
        }, this.duration)
      }
    },
    complete() {
      this.$emit('completed')
      if (this.resetOnComplete) {
        this.status = 'default'
      } else {
        this.status = 'completed'
      }
    },
    cancel () {
      if (this.status === 'pressing') {
        clearTimeout(this.timeout)
        this.status = 'default'
        this.$emit('cancel')
      }
    }
  }
}
</script>

<style lang="scss">
  @import "../assets/scss/v-bulma-lib";

  .longpress-button {
    position: relative;
    background: linear-gradient(to right, $grey-light 50%, $white 50%);
    background-size: 200% 100%;
    background-position: right bottom;
    transition: background 1s linear;

    &.pressed {
      background: linear-gradient(to right, $grey-light 50%, $white 50%);
      background-size: 200% 100%;
      background-position: left bottom;
    }

    $change-amount: 20%;

    @each $name, $pair in $colors {
      $color: nth($pair, 1);
      $color-invert: nth($pair, 2);
      $color-pressing: lighten($color, $change-amount);

      @if colorLuminance($color) > 0.25 {
        $color-pressing: darken($color, $change-amount);
      }
      &.is-#{$name} {
        background: linear-gradient(to right, $color-pressing 50%, $color 50%);
        background-size: 200% 100%;
        background-position: right bottom;
        transition: background 1s linear;
        &.pressed {
          background: linear-gradient(to right, $color-pressing 50%, $color 50%);
          background-size: 200% 100%;
          background-position: left bottom;
        }
      }
    }
  }
</style>
