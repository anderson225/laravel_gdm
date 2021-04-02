import Vue from 'vue'
import router from './router.js'
import store from './store/index'
import utils from './helpers/utilities'
import VueSweetalert2 from 'vue-sweetalert2';
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/fr'

require('./bootstrap')

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import 'element-ui/lib/theme-chalk/index.css'
import 'sweetalert2/dist/sweetalert2.min.css';

import 'bootstrap'

Vue.prototype.$utils = utils
Vue.use(ElementUI,{locale});
Vue.use(VueSweetalert2);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
window.hub = new Vue()


new Vue({
  router,
  store,
}).$mount('#app')
