<template>
  <div id="app" class="container content">
    <div class="logo">
      <img alt="Vue logo" src="./assets/logo.png">
    </div>
    <page-password-field></page-password-field>
    <hr/>
    <page-hold-buttons></page-hold-buttons>
    <hr/>
    <page-hold-icons></page-hold-icons>
    <hr/>
    <page-clockpicker></page-clockpicker>
  </div>
</template>

<script>
import { PageClockpicker, PageHoldButtons, PageHoldIcons, PagePasswordField } from './pages'

export default {
  name: 'app',
  components: {
    PageClockpicker, PageHoldButtons, PageHoldIcons, PagePasswordField // eslint-disable-line
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
