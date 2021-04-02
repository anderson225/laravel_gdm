import Ls from '@/services/ls'
import router from '@/router.js'


const state = {
    status: '',
    token: Ls.get('auth.token'),
    userInfo: null,
    isLoggedOut: false
}

// Getter functions
const getters = {
    isAuthenticated(state) {
        return !!state.token
    },
    isLoggedOut(state) {
        return state.isLoggedOut
    },
    getUserInfo(state) {
        return state.userInfo
    },
    authStatus(state) {
        return state.status
    }
}


// Actions
const actions = {
    login({commit}, data) {
        return new Promise((resolve, reject) => {
            window.axios
                .post('/api/auth/login', data)
                .then((response) => {
                    /* set token */
                    let token = response.data.access_token
                    Ls.set('auth.token', token)
                    /* commits */
                    commit('AUTH_SUCCESS', token)
                    resolve(response)

                })
                .catch((err) => {
                    if (err) {
                        window.Ls.remove('auth.token')
                    }
                    reject(err)
                })
        })
    },
    userInfo({commit}) {
        return new Promise((resolve, reject) => {
            window.axios
                .get('/api/auth/me')
                .then((response) => {
                    let data = response.data
                    /* commits */
                    commit('SET_USERINFO', data)
                    resolve(response)

                })
                .catch((err) => {
                    reject(err)
                })
        })
    },
    logout({state, commit}) {
        return new Promise((resolve, reject) => {
            if (state.isLoggedOut) {
                resolve()
                return true
            }

            Ls.remove('auth.token')
            commit('AUTH_LOGOUT', true)

            window.axios
                .get('/api/auth/logout')
                .then(() => {
                    window.location.reload()
                })
                .catch((err) => {
                    router.push('/login')
                    reject(err)
                })
        })
    }
}
// Mutations
const mutations = {
    ['AUTH_SUCCESS'](state, token) {
        state.token = token
        state.status = 'success'
    },

    ['AUTH_LOGOUT'](state, data) {
        state.isLoggedOut = data
    },

    ['AUTH_ERROR'](state, errorResponse) {
        state.token = null
        state.status = 'error'
    },

    ['SET_LOGOUT'](state, token) {
        state.token = token
        state.status = 'success'
    },
    ['SET_USERINFO'](state, data) {
        state.userInfo = data
    },
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
