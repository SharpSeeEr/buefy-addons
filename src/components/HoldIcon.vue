<template>
  <div class="hold-icon"
    :style="{width: `${outerDiameter + 2}px`, height: `${outerDiameter + 2}px`}"

  >
    <div class="button-icon"
      :style="iconStyle"
      @mouseup="cancel"
      @mousedown.prevent="start"
    >
      <b-icon pack="fas" icon="trash-alt"></b-icon>
      <!-- <i class="fas fa-trash-alt"></i> -->
    </div>
    <svg class="ring-container"
      width="100%"
      height="100%"
    >
      <circle
        class="background-ring"
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
</template>

<script>
export default {
  name: 'HoldIcon',
  data() {
    return {
      status: 'default',
      timeout: null
    }
  },
  props: {
    duration: { type: Number, default: 1500 },
    resetOnComplete: Boolean,
    size: { type: String, default: 'normal' },
    thickness: { type: Number, default: 8 }
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
    ringClass() {
      return 'ring-' + this.status
    },
    outerDiameter() {
      return this.thickness * 2 + 120 //this.size
    },
    radius() {
      // return this.size / 2
      return 120 / 2
    },
    circumference() {
      return 2 * this.radius * Math.PI
    },
    center() {
      return this.radius + this.thickness
    },
    ring2Style() {
      return { 'stroke-width': this.thickness }
    },
    ringStyle() {
      return {
        'stroke-dasharray': `${this.circumference}, ${this.circumference}`,
        'stroke-dashoffset': this.circumference,
        'stroke-width': this.thickness
      }
    },
    iconStyle() {
      let center = 24
      if (this.size === 'large') {
        center = 48
      }
      center = this.outerDiameter / 2 - 12 // center / 2
      return {
        // top: `${center}px`,
        // left: `${center}px`
      }
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
  display: inline-block;
  position: relative;
  border: 1px solid silver;

  .button-icon {
    height: 1.5rem;
    width: 1.5rem;
    .fas {
      font-size: 1em;
    }
  }

  &.is-small {
    .button-icon {
      height: 1rem;
      width: 1rem;
      .fas {
        font-size: .8em;
      }
    }
  }
  &.is-medium {
    .button-icon {
      height: 2rem;
      width: 2rem;
      .fas {
        font-size: 1.33em;
      }
    }
  }
  &.is-large {
    .button-icon {
      height: 3rem;
      width: 3rem;
      top: 1.5rem;
      left: 1.5rem;
      .fas {
        font-size: 2em;
      }
    }
  }
  &.is-xlarge {
    .button-icon {
      height: 3.5rem;
      width: 3.5rem;
      .fas {
        font-size: 3em;
      }
    }
  }
  //font-size: 2em;

  .ring-container {
    position: absolute;
    top: 0;
    left: 0;
  }
  .progress-ring {
    stroke: #00F;
    transition: 2s stroke-dashoffset linear;
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
  }

  .button-icon {
    position: absolute;
    left: .5rem;
    top: .5rem;
  }

  @each $name, $pair in $colors {
    $color: nth($pair, 1);
    $bgcolor: silver;

    // @if colorLuminance($color) > 0.25 {
    //   $bgcolor: darken($color, $change-amount);
    // }
    &.is-#{$name} {
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
