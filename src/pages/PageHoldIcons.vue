<template>
  <div>
    <h2>Hold Icons</h2>
    <div style="font-size: 1.5em;" class="columns is-multiline">
      <div class="column is-one-quarter">Default: <hold-icon><i class="fas fa-trash-alt"></i></hold-icon></div>
      <div class="column is-one-quarter">Primary: <hold-icon class="is-primary"><i class="fas fa-trash-alt"></i></hold-icon></div>
      <div class="column is-one-quarter">Link: <hold-icon class="is-link"><i class="fas fa-trash-alt"></i></hold-icon></div>
      <div class="column is-one-quarter">Info: <hold-icon class="is-info"><i class="fas fa-trash-alt"></i></hold-icon></div>
      <div class="column is-one-quarter">Success: <hold-icon class="is-success"><i class="fas fa-trash-alt"></i></hold-icon></div>
      <div class="column is-one-quarter">Warning: <hold-icon class="is-warning"><i class="fas fa-trash-alt"></i></hold-icon></div>
      <div class="column is-one-quarter">Danger: <hold-icon class="is-danger"><i class="fas fa-trash-alt"></i></hold-icon></div>
    </div>
  </div>
</template>

<script>
import { HoldIcon } from '../components'

export default {
  components: { HoldIcon }
}
</script>

<style>

</style>
