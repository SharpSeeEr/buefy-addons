import Vue from 'vue'
import Buefy from 'buefy'
import App from './App.vue'
import components from './components'
import './assets/scss/app.scss'

Vue.config.productionTip = false

Vue.use(Buefy)

new Vue({
  components,
  render: h => h(App)
}).$mount('#app')
