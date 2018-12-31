<template>
  <div>
    <h2>ClockPicker</h2>
    <div class="columns is-multiline">
      <div class="column is-one-quarter-xxx">
        Standard Dropdown:<br/>
        <b-clockpicker v-model="timevalue"></b-clockpicker>
      </div>
      <div class="column is-one-quarter-xxx">
        Standard Inline:<br/>
        <b-clockpicker v-model="timevalue" inline></b-clockpicker>
      </div>
      <div class="column is-one-quarter-xxx">
        Link Inline:<br/>
        <b-clockpicker v-model="timevalue" inline class="is-link"></b-clockpicker>
      </div>
      <div class="column is-one-quarter-xxx">
        Info Inline:<br/>
        <b-clockpicker v-model="timevalue" inline class="is-info"></b-clockpicker>
      </div>
      <div class="column is-one-quarter-xxx">
        Success Inline:<br/>
        <b-clockpicker v-model="timevalue" inline class="is-success"></b-clockpicker>
      </div>
      <div class="column is-one-quarter-xxx">
        Warning Inline:<br/>
        <b-clockpicker v-model="timevalue" inline class="is-warning"></b-clockpicker>
      </div>
      <div class="column is-one-quarter-xxx">
        Danger Inline:<br/>
        <b-clockpicker v-model="timevalue" inline class="is-danger"></b-clockpicker>
      </div>
    </div>
  </div>
</template>

<script>
import { Clockpicker as BClockpicker } from '../components'

export default {
  name: 'PageClockpicker',
  components: {
    BClockpicker // eslint-disable-line
  },
  data() {
    return {
      timevalue: new Date(),
      password: ''
    }
  }
}
</script>

<style>

</style>
