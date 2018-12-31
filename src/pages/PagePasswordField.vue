<template>
  <div>
    <h2>Password Field</h2>
    <p>
      Provides single or double password field for creating or entering a password.
      If confirm option is set the v-model is not updated until both passwords match.
    </p>
    <div class="columns">
      <div class="column is-one-third">
        <password v-model="password" confirm show-lock reveal></password>
      </div>
      <div class="column is-one-third">
        {{password}}
      </div>
    </div>
  </div>
</template>

<script>
import { Password } from '../components'

export default {
  components: { Password },
  data() {
    return {
      password: ''
    }
  }
}
</script>

<style>

</style>
