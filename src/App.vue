<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <button-longpress>Delete</button-longpress>
  </div>
</template>

<script>
import ButtonLongpress from './components/ButtonLongpress'

export default {
  name: 'app',
  components: {
    ButtonLongpress
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
