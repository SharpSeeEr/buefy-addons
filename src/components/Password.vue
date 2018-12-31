<template>
  <div>
    <div class="field">
      <p class="control" v-bind="$attrs" :class="[controlClasses, hasRevealClass]">
        <input v-model="passwordValue"
          @input="passwordChange"
          ref="input"
          class="input"
          :type="currentInputType"
          placeholder="Password">
        <span v-if="showLock" class="icon is-small is-left">
          <i class="fas fa-lock"></i>
        </span>
        <span v-if="reveal" class="icon is-small is-right is-clickable"
          @click="toggleRevealPassword">
          <i class="fas" :class="revealClass"></i>
        </span>
      </p>
    </div>
    <div v-if="confirm" v-bind="$attrs" class="field">
      <p class="control" :class="controlClasses">
        <input v-model="confirmValue"
          @input="passwordChange"
          :disabled="showingPassword"
          class="input"
          type="password"
          placeholder="Confirm Password">  <!-- Set a touched and dirty flag -->
        <span v-if="showLock" class="icon is-small is-left">
          <i class="fas fa-lock"></i>
        </span>
        <span v-if="!isValid" class="help">
          {{validationMessage}}
        </span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Password',
  inheritAttrs: false,
  data() {
    return {
      passwordValue: '',
      confirmValue: '',
      showingPassword: false,
      inputType: 'password',
      isValid: false,
      validationMessage: ''
    }
  },
  props: {
    value: String,
    confirm: Boolean,
    reveal: Boolean,
    showLock: Boolean
  },
  computed: {
    controlClasses() {
      return {
        'has-icons-left': this.showLock
      }
    },
    hasRevealClass() {
      return {
        'has-icons-right': this.reveal
      }
    },
    revealClass() {
      return this.showingPassword ? 'fa-eye-slash' : 'fa-eye'
    },
    currentInputType() {
      return this.showingPassword ? 'text' : 'password'
    }
  },
  methods: {
    passwordChange(event) {
      if (this.passwordValue && this.passwordValue === this.confirmValue) {
        this.$emit('input', this.passwordValue)
      }
    },
    toggleRevealPassword(event) {
      this.showingPassword = !this.showingPassword
      // this.$refs.input.focus()
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    }
  }
}
</script>

<style>

</style>
