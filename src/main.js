import Vue from 'vue'
import Buefy from 'buefy'
import App from './App.vue'
import * as components from './components'
import './assets/scss/app.scss'
import '@fortawesome/fontawesome-free/css/all.css'

Vue.config.productionTip = false

Vue.use(Buefy)

for (let componentKey in components) {
  Vue.use(components[componentKey])
}
new Vue({
  render: h => h(App)
}).$mount('#app')
