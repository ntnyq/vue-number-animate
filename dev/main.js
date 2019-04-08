import Vue from 'vue'
import App from './App'

import 'number-animate/dist/style.css'
import NumberAnimate from 'number-animate'

Vue.use(NumberAnimate)

Vue.config.productionTip = false

new Vue({
  ...App
}).$mount('#app')
