<template>
  <div class="hold-icon"

  >
    <div class="ring-container">
      <svg :viewBox="`0 0 ${outerDiameter} ${outerDiameter}`">
        <circle
          class="background-ring"
          :class="[backgroundRingClass]"
          fill="transparent"
          :stroke-width="thickness"
          :r="radius"
          :cx="center"
          :cy="center"/>
        <circle
          class="progress-ring"
          fill="transparent"
          :stroke-width="thickness"
          :r="radius"
          :cx="center"
          :cy="center"
          :stroke-dasharray="`${circumference} ${circumference}`"
          :stroke-dashoffset="dashOffset"
          :style="{ 'transition-duration': `${transitionDuration}ms` }"
        />
      </svg>
    </div>
    <div class="button-icon"
      @mouseup="cancel"
      @mousedown.prevent="start"
    >
      <i class="fas fa-trash-alt"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HoldIcon',
  data() {
    return {
      status: 'default',
      timeout: null,
      outerDiameter: 120
    }
  },
  props: {
    duration: { type: Number, default: 1500 },
    resetOnComplete: Boolean,
    thickness: { type: Number, default: 9 },
    hideRing: { type: Boolean, default: true }
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
    },
    radius() {
      return (this.outerDiameter / 2) - this.thickness / 2
    },
    circumference() {
      return 2 * this.radius * Math.PI
    },
    center() {
      return this.outerDiameter / 2
    },
    backgroundRingClass() {
      if (this.hideRing && this.status === 'default') {
        return 'hidden'
      }
      return false
    },
    dashOffset() {
      return this.status === 'default' ? this.circumference : 0
      // return this.circumference - this.progress / 100 * this.circumference
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
      if (this.resetOnComplete) {
        this.status = 'default'
      } else {
        this.status = 'completed'
      }
    },
    cancel () {
      if (this.status === 'pressed') {
        clearTimeout(this.timeout)
        this.status = 'default'
        this.$emit('cancel')
      }
    }
  }
}
</script>

<style lang="scss">
@import "../assets/scss/buefy-addons-lib";

.hold-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: left;
  font-size: 1.0em;
  vertical-align: middle;

  .button-icon {
    position: absolute;
  }

  .ring-container {
    width: 2.0em;
    height: 2.0em;

    .hidden {
      display:none;
    }
  }

  .progress-ring {
    stroke: black;
    transition: 2s stroke-dashoffset linear;
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
  }

  @each $name, $pair in $colors {
    $color: nth($pair, 1);
    $bgcolor: silver;

    // @if colorLuminance($color) > 0.25 {
    //   $bgcolor: darken($color, $change-amount);
    // }
    &.is-#{$name} {
      color: $color;
      .progress-ring {
        stroke: $color;
      }
      .background-ring{
        stroke: $bgcolor;
      }
    }
  }
}
</style>
