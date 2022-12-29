import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/css/styles.css'
import axios from "axios";


Vue.config.productionTip = false
axios.defaults.withCredentials = true

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
