<template>
  <div id="app" class="container content">
    <div class="logo">
      <img alt="Vue logo" src="./assets/logo.png">
    </div>
    <div class="">
      <hr/>
      <h2>Hold Buttons</h2>
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
      <br/>
      <br/>

    </div>
    <div>
      <hr/>
      <h2>Hold Icons</h2>
      <div style="font-size: 1.5em;" class="columns is-multiline">
        <div class="column is-one-quarter">
          Normal Button:
          <hold-icon class="is-link">
            <i class="fas fa-plus"></i>
          </hold-icon>
        </div>
        <div class="column is-one-quarter">Default: <hold-icon><i class="fas fa-trash-alt"></i></hold-icon></div>
        <div class="column is-one-quarter">Primary: <hold-icon class="is-primary"><i class="fas fa-trash-alt"></i></hold-icon></div>
        <div class="column is-one-quarter">Link: <hold-icon class="is-link"><i class="fas fa-trash-alt"></i></hold-icon></div>
        <div class="column is-one-quarter">Info: <hold-icon class="is-info"><i class="fas fa-trash-alt"></i></hold-icon></div>
        <div class="column is-one-quarter">Success: <hold-icon class="is-success"><i class="fas fa-trash-alt"></i></hold-icon></div>
        <div class="column is-one-quarter">Warning: <hold-icon class="is-warning"><i class="fas fa-trash-alt"></i></hold-icon></div>
        <div class="column is-one-quarter">Danger: <hold-icon class="is-danger"><i class="fas fa-trash-alt"></i></hold-icon></div>
      </div>
    </div>
    <div>
      <hr/>
      <h2>ClockPicker</h2>
      <div class="columns is-multiline">
        <div class="column is-one-quarter">
          Standard Dropdown:<br/>
          <b-clockpicker v-model="timevalue"></b-clockpicker>
        </div>
        <div class="column is-one-quarter">
          Standard Inline:<br/>
          <b-clockpicker v-model="timevalue" inline></b-clockpicker>
        </div>
        <div class="column is-one-quarter">
          Link Inline:<br/>
          <b-clockpicker v-model="timevalue" inline class="is-link"></b-clockpicker>
        </div>
        <div class="column is-one-quarter">
          Info Inline:<br/>
          <b-clockpicker v-model="timevalue" inline class="is-info"></b-clockpicker>
        </div>
        <div class="column is-one-quarter">
          Success Inline:<br/>
          <b-clockpicker v-model="timevalue" inline class="is-success"></b-clockpicker>
        </div>
        <div class="column is-one-quarter">
          Warning Inline:<br/>
          <b-clockpicker v-model="timevalue" inline class="is-warning"></b-clockpicker>
        </div>
        <div class="column is-one-quarter">
          Danger Inline:<br/>
          <b-clockpicker v-model="timevalue" inline class="is-danger"></b-clockpicker>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { HoldButton, HoldIcon, Clockpicker as BClockpicker } from './components'

export default {
  name: 'app',
  components: {
    HoldButton, HoldIcon, BClockpicker
  },
  data() {
    return {
      timevalue: new Date()
    }
  }
  // created() {
  //   this.timevalue = new Date()
  // }
}
</script>

<style lang="scss">

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.logo {
  text-align: center;
}

</style>
