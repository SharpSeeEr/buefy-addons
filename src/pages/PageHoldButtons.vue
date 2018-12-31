<template>
  <div>
    <h2>Hold Buttons</h2>
    <p>Hold buttons require the user to long press the button to activate</p>
    <div class="buttons">
      <button class="button is-red" type="button">Normal Button</button>
      <hold-button>Hold Button</hold-button>
    </div>

    <h3>Black and White</h3>
    <div class="buttons">
      <hold-button>Default Button</hold-button>&nbsp;
      <hold-button class="is-white">White Button</hold-button>&nbsp;
      <hold-button class="is-light">Light Button</hold-button>&nbsp;
      <hold-button class="is-dark">Dark Button</hold-button>&nbsp;
      <hold-button class="is-black">Black Button</hold-button>&nbsp;
      <hold-button class="is-text">Text Button</hold-button>
    </div>

    <h3>Regular Colors</h3>
    <div class="buttons">
      <hold-button class="is-primary">Primary Button</hold-button>&nbsp;
      <hold-button class="is-link">Link Button</hold-button>&nbsp;
      <hold-button class="is-info">Info Button</hold-button>&nbsp;
      <hold-button class="is-success">Success Button</hold-button>&nbsp;
      <hold-button class="is-warning">Warning Button</hold-button>&nbsp;
      <hold-button class="is-danger">Danger Button</hold-button>
    </div>

    <h3>Inverted Colors</h3>
    <div class="buttons">
      <hold-button class="is-primary is-inverted">Primary Button</hold-button>&nbsp;
      <hold-button class="is-link is-inverted">Link Button</hold-button>&nbsp;
      <hold-button class="is-info is-inverted">Info Button</hold-button>&nbsp;
      <hold-button class="is-success is-inverted">Success Button</hold-button>&nbsp;
      <hold-button class="is-warning is-inverted">Warning Button</hold-button>&nbsp;
      <hold-button class="is-danger is-inverted">Danger Button</hold-button>
    </div>
  </div>
</template>

<script>
import { HoldButton } from '../components'

export default {
  components: { HoldButton }
}
</script>

<style>

</style>
