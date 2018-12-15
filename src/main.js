import Vue from 'vue'
import App from './App.vue'
import * as components from './components'

Vue.config.productionTip = false

new Vue({
  components,
  render: h => h(App)
}).$mount('#app')
