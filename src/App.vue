<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div>
      <hold-button>Default Button</hold-button>&nbsp;
      <hold-button class="is-white">White Button</hold-button>&nbsp;
      <hold-button class="is-light">Light Button</hold-button>&nbsp;
      <hold-button class="is-dark">Dark Button</hold-button>&nbsp;
      <hold-button class="is-black">Black Button</hold-button>&nbsp;
      <hold-button class="is-text">Text Button</hold-button>
      <br/>
      <br/>
      <hold-button class="is-primary">Primary Button</hold-button>&nbsp;
      <hold-button class="is-link">Link Button</hold-button>&nbsp;
      <hold-button class="is-info">Info Button</hold-button>&nbsp;
      <hold-button class="is-success">Success Button</hold-button>&nbsp;
      <hold-button class="is-warning">Warning Button</hold-button>&nbsp;
      <hold-button class="is-danger">Danger Button</hold-button>
      <br/>
      <br/>
      <button class="button is-red" type="button">Normal Button</button>
    </div>
  </div>
</template>

<script>
import { HoldButton } from './components'

export default {
  name: 'app',
  components: {
    HoldButton
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
