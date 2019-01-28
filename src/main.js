import Vue from 'vue'
import App from './App.vue'
import VeeValidate from 'vee-validate';
import router from './router';
import {library} from '@fortawesome/fontawesome-svg-core'
import {faCoffee, faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import BootstrapVue from 'bootstrap-vue'

library.add([faCoffee, faTrashAlt])

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.use(VeeValidate,{
  validity: true
});

Vue.use(BootstrapVue);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
