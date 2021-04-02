import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Ls from './services/ls'
import store from './store/index.js'
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import VTooltip from 'v-tooltip'
import Transitions from 'vue2-transitions'


/**
 * Global css plugins
 */


Vue.use(Vuelidate)

Vue.use(Transitions)

window._ = require('lodash')

/**
 * Custom Directives
 */
require('./helpers/directives')

/**
 * We'll register a HTTP interceptor to attach the "CSRF" header to each of
 * the outgoing requests issued by this application. The CSRF middleware
 * included with Laravel will automatically verify the header's value.
 */

window.axios = require('axios')
window.axios.defaults.withCredentials = true
window.Ls = Ls
global.$ = global.jQuery = require('jquery')

window.axios.defaults.headers.common = {
    'X-Requested-With': 'XMLHttpRequest',
}

/**
 * Interceptors
 */

window.axios.interceptors.request.use(function (config) {
        const AUTH_TOKEN = Ls.get('auth.token')
        if (AUTH_TOKEN) {
            config.headers.common['Authorization'] = `Bearer ${AUTH_TOKEN}`
        }
        return config
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error)
    }
)

/**
 * Global Axios Response Interceptor
 */
global.axios.interceptors.response.use(undefined, function (err) {
    // Do something with request error
    if (store.getters['Auth/isLoggedOut']) {
        return true
    }
    if (!err.response) {
        console.log('Please check your internet connection or wait until servers are back online Network Error')
    } else {
        if (err.response.data && (err.response.statusText === 'Unauthorized' || err.response.data === ' Unauthorized.')) {
            store.dispatch('Auth/logout', true)
        } else if (err.response.data.errors) {
            // Show a notification per error
            const errors = JSON.parse(JSON.stringify(err.response.data.errors))
            for (const i in errors) {
                console.log(errors[i])
            }
        } else {
            // Unknown error
            window.toastr['error'](
                err.response.data.message
                    ? err.response.data.message
                    : err.response.data || 'Unknown error occurred',
                'Error'
            )
        }
    }
    return Promise.reject(err)
})

/**
 * Global plugins
 */
window.toastr = require('toastr')

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VTooltip)

